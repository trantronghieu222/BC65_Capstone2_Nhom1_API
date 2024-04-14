/*$(document).ready(function($) {
	// Declare the body variable
	var $body = $("body");

	// Function that shows and hides the sidebar cart
	$(".cart-button, .close-button, #sidebar-cart-curtain").click(function(e) {
		e.preventDefault();

		// Add the show-sidebar-cart class to the body tag
		$body.toggleClass("show-sidebar-cart");

		// Check if the sidebar curtain is visible
		if ($("#sidebar-cart-curtain").is(":visible")) {
			// Hide the curtain
			$("#sidebar-cart-curtain").fadeOut(500);
		} else {
			// Show the curtain
			$("#sidebar-cart-curtain").fadeIn(500);
		}
	});

	// Function that adds or subtracts quantity when a 
	// plus or minus button is clicked
	$body.on('click', '.plus-button, .minus-button', function () {
		// Get quanitity input values
		var qty = $(this).closest('.qty').find('.qty-input');
		var val = parseFloat(qty.val());
		var max = parseFloat(qty.attr('max'));
		var min = parseFloat(qty.attr('min'));
		var step = parseFloat(qty.attr('step'));

		// Check which button is clicked
		if ($(this).is('.plus-button')) {
			// Increase the value
			qty.val(val + step);
		} else {
			// Check if minimum button is clicked and that value is 
			// >= to the minimum required
			if (min && min >= val) {
				// Do nothing because value is the minimum required
				qty.val(min);
			} else if (val > 0) {
				// Subtract the value
				qty.val(val - step);
			}
		}
	});
});*/

document.addEventListener("DOMContentLoaded", function () {
    // Declare the body variable
    var body = document.body;

    // Function that shows and hides the sidebar cart
    var cartButton = document.querySelector(".cart-button");
    var closeButton = document.querySelector(".close-button");
    var sidebarCurtain = document.getElementById("sidebar-cart-curtain");

    function toggleSidebarCart(e) {
        e.preventDefault();

        // Add or remove the show-sidebar-cart class from the body tag
        body.classList.toggle("show-sidebar-cart");

        // Check if the sidebar curtain is visible
        if (window.getComputedStyle(sidebarCurtain).display === "block") {
            // Hide the curtain
            sidebarCurtain.style.display = "none";
        } else {
            // Show the curtain
            sidebarCurtain.style.display = "block";
        }
    }

    cartButton.addEventListener("click", toggleSidebarCart);
    closeButton.addEventListener("click", toggleSidebarCart);

    // Function that adds or subtracts quantity when a plus or minus button is clicked
    var plusButtons = document.querySelectorAll(".plus-button");
    var minusButtons = document.querySelectorAll(".minus-button");

    function updateQuantity(e) {
        var qtyInput = e.target.closest(".qty").querySelector(".qty-input");
        var val = parseFloat(qtyInput.value);
        var max = parseFloat(qtyInput.getAttribute("max"));
        var min = parseFloat(qtyInput.getAttribute("min"));
        var step = parseFloat(qtyInput.getAttribute("step"));

        if (e.target.classList.contains("plus-button")) {
            // Increase the value
            qtyInput.value = val + step;
        } else {
            // Check if minimum button is clicked and that value is >= to the minimum required
            if (min && min >= val) {
                // Do nothing because value is the minimum required
                qtyInput.value = min;
            } else if (val > 0) {
                // Subtract the value
                qtyInput.value = val - step;
            }
        }
    }

    plusButtons.forEach(function (button) {
        button.addEventListener("click", updateQuantity);
    });

    minusButtons.forEach(function (button) {
        button.addEventListener("click", updateQuantity);
    });
});