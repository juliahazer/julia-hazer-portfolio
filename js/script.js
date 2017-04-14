$(document).ready(function(){

	var $navbarA = $('.navbar-custom a');
	var $navbarNavLi = $('.navbar-custom .navbar-nav li');

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

	/************ SKILLS EVENTS ************/
	/*on hover/mouseenter on skill div, add an orange background, 
	display the skill name, and make the skill img
	more transparent, on mouseleave toggle to remove styling*/
	$('.skillsRow div').on('mouseenter mouseleave', function(){
		$(this).toggleClass('activeSkill');
		$(this).children().eq(0).toggleClass('moreTransparent');
		$(this).children().eq(1).toggleClass('hiddenText');
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
});