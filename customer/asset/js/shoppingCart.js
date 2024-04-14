$(document).ready(function($) {
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
});


// document.addEventListener("DOMContentLoaded", function() {
//     // Declare the body variable
//     var body = document.querySelector("body");

//     // Function that shows and hides the sidebar cart
//     function toggleSidebarCart() {
//         // Add the show-sidebar-cart class to the body tag
//         body.classList.toggle("show-sidebar-cart");

//         // Check if the sidebar curtain is visible
//         var sidebarCartCurtain = document.getElementById("sidebar-cart-curtain");
//         if (sidebarCartCurtain.style.display === "block") {
//             // Hide the curtain
//             sidebarCartCurtain.style.display = "none";
//         } else {
//             // Show the curtain
//             sidebarCartCurtain.style.display = "block";
//         }
//     }

//     // Event listener for cart button, close button, and sidebar-cart-curtain
//     var cartButton = document.querySelectorAll(".cart-button, .close-button, #sidebar-cart-curtain");
//     cartButton.forEach(function(element) {
//         element.addEventListener("click", function(event) {
//             event.preventDefault();
//             toggleSidebarCart();
//         });
//     });

//     // Function that adds or subtracts quantity when a 
//     // plus or minus button is clicked
//     var plusMinusButtons = document.querySelectorAll('.plus-button, .minus-button');
//     plusMinusButtons.forEach(function(button) {
//         button.addEventListener("click", function() {
//             // Get quantity input values
//             var qty = button.closest('.qty').querySelector('.qty-input');
//             var val = parseFloat(qty.value);
//             var max = parseFloat(qty.getAttribute('max'));
//             var min = parseFloat(qty.getAttribute('min'));
//             var step = parseFloat(qty.getAttribute('step'));

//             // Check which button is clicked
//             if (button.classList.contains('plus-button')) {
//                 // Increase the value
//                 qty.value = val + step;
//             } else {
//                 // Check if minimum button is clicked and that value is 
//                 // >= to the minimum required
//                 if (min && min >= val) {
//                     // Do nothing because value is the minimum required
//                     qty.value = min;
//                 } else if (val > 0) {
//                     // Subtract the value
//                     qty.value = val - step;
//                 }
//             }
//         });
//     });
// });