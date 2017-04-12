$(document).ready(function(){

	var $navbarA = $('.navbar-custom a');
	var $navbarNavLi = $('.navbar-custom .navbar-nav li');

	$("#contactForm #successMessage").hide();
	$("#contactForm #errorMessage").hide();

	// Highlight the top nav as page scrolling occurs
	$('body').scrollspy({
		target: '.navbar-fixed-top',
		offset: 40
	});

	/************ NAV BAR EVENTS ************/
	/*updates the styling for the active nav link &
		animates scroll to page anchors*/
	$navbarA.on('click', function(e) {
		//Update the active nav link
		updateActiveNavLink($(e.target));

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			e.preventDefault();

			var hash;
			//store hash
			if ($(e.target).hasClass('navbar-brand')){
				hash = "#about";
			}
			else {
				hash = this.hash;
			}	

			// Using jQuery's animate() method to add smooth page scroll
			// 800 specifies the number of milliseconds it takes to 
			// scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function(){
				// Add hash (#) to URL when done scrolling
				window.location.hash = hash;
			});
		}
	});

	/************ FUNCTIONS ************/
	/*updates the active nav link styling, removing styling from the
	prior active link*/
	function updateActiveNavLink($clickedLink){
		$navbarNavLi.removeClass('active');
		/*If click the "Julia Hazer" section of navbar,
		make the "about" nav link active*/
		if ($clickedLink.hasClass('navbar-brand')){
			$navbarNavLi.eq(0).addClass('active');
		}
		else {
			$clickedLink.parent().addClass('active');
		}
	}

	/************ CONTACT FORM SUBMISSION ************/
	/*uses bootstrapValidator and php/contact-form.php
	Must have a working SMTP server to work (i.e., send the email)*/
	$('#contactForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			first_name: {
				validators: {
						stringLength: {
						min: 1,
					},
						notEmpty: {
						message: 'Please enter your first name.'
					}
				}
			},
			last_name: {
				validators: {
					 stringLength: {
						min: 2,
					},
					notEmpty: {
						message: 'Please enter your last name.'
					}
				}
			},
			email: {
				validators: {
					notEmpty: {
						message: 'Please enter your email address.'
					},
					emailAddress: {
						message: 'Please enter a valid email address.'
					}
				}
			},
			phone: {
				validators: {
					notEmpty: {
						message: 'Please enter your phone number.'
					},
					phone: {
						country: 'US',
						message: 'Please enter a vaild phone number with area code.'
					}
				}
			},
			comment: {
				validators: {
					  stringLength: {
						min: 1,
						max: 300,
						message:'Please enter no more than 300 characters.'
					},
					notEmpty: {
						message: 'Please enter a message.'
					}
					}
				}
			}
		})
		.on('success.form.bv', function(e) {
			// Prevent form submission
			e.preventDefault();

			// Get the form instance
			var $form = $(e.target);

			var formStr = $form.serialize();

			/* AJAX Post request to contact-form.php 
			to send email to me, with the contact form data. */
			$.ajax({
				url: "../php/contact-form.php",
				type: "POST",
				data: formStr
			}).then(function(data){
				/*Clears the form if the form is successfully submitted
					and shows the success message */
				$('#contactForm').bootstrapValidator('resetForm', true);
				$("#errorMessage").hide();
				$('#successMessage').show();
			}).catch(function(err){
				/*If an error occurs, saves the form field data, 
					but allows user to resubmit,
					and shows the error message */
				$('#contactForm').data('bootstrapValidator').resetForm();
				$('#successMessage').hide();
				$("#errorMessage").show();
			});
		});
});