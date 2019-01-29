var express = require("express");

var router = express.Router();

var db = require('../models');

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  db.burgers.findAll({
    include: [db.customers]
  }).then(function (data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  db.burgers.create({
    burger_name: req.body.burger_name
  }).then(function (result) {

    res.json({ id: result.insertId });
  }
  );
});

router.put("/api/burgers/:id", function (req, res) {
  db.customers.findOne({
    where: {
      customer_name: req.body.customer_name
    }
  }).then(function (result) {

    if (result !== null) {
      db.burgers.update({
        devoured: req.body.devoured,
        customerId: result.id
      }, {
          where: {
            id: req.params.id
          }
        }).then(function (result) {
          if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
        });
    } else {
      db.customers.create({
        customer_name: req.body.customer_name
      }).then(function (result) {

        db.burgers.update({
          devoured: req.body.devoured,
          customerId: result.id
        }, {
            where: {
              id: req.params.id
            }
          }).then(function (result) {

            if (result.changedRows == 0) {
              // If no rows were changed, then the ID must not exist, so 404
              return res.status(404).end();
            } else {
              res.status(200).end();
            }
          });
      });
    }

  });

});

// Export routes for server.js to use.
module.exports = router;
