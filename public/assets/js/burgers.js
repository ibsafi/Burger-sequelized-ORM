// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".devoure-burger").on("click", function (event) {
    var id = $(this).data("id");

    if ($("#customer" + id).val().trim().length > 0) {
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: {
          devoured: true,
          customer_name: $("#customer" + id).val().trim()
        }
      }).then(function () {
        location.reload();
      });
    } else {
      $("#error").addClass("border").text("Pleast Enter Customer Name!")
    }
  });

  $(".add-burger-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    if ($("#burger-name").val().trim().length > 0) {
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: {
          burger_name: $("#burger-name").val().trim()
        }
      }).then(function () {
        location.reload();
      });

    } else {
      $("#error").addClass("border").text("Pleast Enter Burger Name!")
    }

  });
});
