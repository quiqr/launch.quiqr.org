/*
Theme Name: Laluna
Description: Responsive Coming Soon Template
Author: Bluminethemes
Theme URI: http://bluminethemes.com/preview/themeforest/html/laluna/
Author URI: http://themeforest.net/user/Bluminethemes
Version: 2.1.1
*/

(function($) {
	"use strict";

	/* ------------------------------------------------------------------------ */
	/*	BOOTSTRAP FIX FOR WINPHONE 8 AND IE10
	/* ------------------------------------------------------------------------ */
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style")
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
			)
		)
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
	}

	function detectIE() {
		if ($.browser.msie && $.browser.version == 9) {
			return true;
		}
		if ($.browser.msie && $.browser.version == 8) {
			return true;
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}

	function getNavHeight() {
		return Math.max( $('.navigation ul').outerHeight(true) );
	}

	function getNavSpaceHeight() {
		return Math.max( (getWindowHeight() - getNavHeight()) / 2 );
	}


	// BEGIN WINDOW.LOAD FUNCTION
	$(window).load(function() {

		/* ------------------------------------------------------------------------ */
		/*	PRELOADER
		/* ------------------------------------------------------------------------ */
		var preloaderDelay = 350,
			preloaderFadeOutTime = 800;

		function hidePreloader() {
			var loadingAnimation = $('#loading-animation'),
				preloader = $('#preloader');

			loadingAnimation.fadeOut();
			preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		}

		hidePreloader();

	});

	//BEGIN DOCUMENT.READY FUNCTION
	jQuery(document).ready(function($) {

		$.browser.chrome = $.browser.webkit && !!window.chrome;
		$.browser.safari = $.browser.webkit && !window.chrome;

		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('body').addClass('mobile');
		}

		if ($.browser.chrome) {
			$('body').addClass('chrome');
		}

		if ($.browser.safari) {
			$('body').addClass('safari');
		}


		/* ------------------------------------------------------------------------ */
		/*	REFRESH WAYPOINTS
		/* ------------------------------------------------------------------------ */
		function refreshWaypoints() {
			setTimeout(function() {
				$.waypoints('refresh');
			}, 1000);
		}


		/* ------------------------------------------------------------------------ */
		/*	ANIMATED ELEMENTS
		/* ------------------------------------------------------------------------ */
		if( !$('body').hasClass('mobile') ) {

			$('.animated').appear();

			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility': 'visible'
				});
			} else {
				$('.animated').on('appear', function() {
					var elem = $(this);
					var animation = elem.data('animation');
					if ( !elem.hasClass('visible') ) {
						var animationDelay = elem.data('animation-delay');
						if ( animationDelay ) {
							setTimeout(function(){
								elem.addClass( animation + " visible" );
							}, animationDelay);
						} else {
							elem.addClass( animation + " visible" );
						}
					}
				});

				/* Starting Animation on Load */
				$(window).load(function() {
					$('.onstart').each( function() {
						var elem = $(this);
						if ( !elem.hasClass('visible') ) {
							var animationDelay = elem.data('animation-delay');
							var animation = elem.data('animation');
							if ( animationDelay ) {
								setTimeout(function(){
									elem.addClass( animation + " visible" );
								}, animationDelay);
							} else {
								elem.addClass( animation + " visible" );
							}
						}
					});
				});

			}

		}


		/* ------------------------------------------------------------------------ */
		/*	PAGE
		/* ------------------------------------------------------------------------ */
		function setSectionHeight() {
			var section = $('section');

			if( section.hasClass('fullscreen') ) {
				section.css( 'min-height', getWindowHeight() );
			}
		}

		setSectionHeight();

		$(window).on('resize', function () {
			setSectionHeight();
		});


    window.initPageBackground();


		/* ------------------------------------------------------------------------ */
		/*	IOS
		/* ------------------------------------------------------------------------ */
		function iosdetect() {
			var deviceAgent = navigator.userAgent.toLowerCase();
			var $iOS = deviceAgent.match(/(iphone|ipod|ipad)/);

			if ($('body').hasClass('video-background')) {
				if ($iOS) {
					var divs = $('#home');
					var vid = $('#video_background');
					var h = window.innerHeight;
					var divh = $("#home").height();
					divs.css({ "position": "relative", "top": (h-divh)/2, "margin-top": "0" });
					vid.css({ "display": "none"});
					$(window).resize(function() {
						var divs = $('#home');
						var h = window.innerHeight;
						var divh = $("#home").height();
						divs.css({ "position": "relative", "top": (h-divh)/2, "margin-top": "0" });
					});

					// use fancy CSS3 for hardware acceleration
				}
			}
		}

		iosdetect();


		/* ------------------------------------------------------------------------ */
		/*	NAV
		/* ------------------------------------------------------------------------ */
		function initNav() {
			var navSpaceHeight = getNavSpaceHeight();
			$('.top-line').css('height', navSpaceHeight);
			$('.bottom-line').css('height', navSpaceHeight);
		}
		initNav();

		$(window).on('resize', function () {
			initNav();
		});

		$('.navigation a').click(function(){
			var target = $(this).data('target');
			$.scrollTo( target, 1300, {easing:'swing'} );
			$('.navigation a').removeClass('current');
			$('.navigation li').removeClass('current');
			$(this).addClass('current');
			$(this).parent('li').addClass('current');
		});

		// Window scroll
		$(window).scroll(function() {
			var windscroll = $(window).scrollTop();
			if (windscroll >= 100) {
				$('body section').each(function(i) {
					if ($(this).position().top <= windscroll - 0) {
						$('.navigation a.current').parent('li').removeClass('current');
						$('.navigation a.current').removeClass('current');
						$('.navigation a').eq(i).addClass('current');
						$('.navigation a.current').parent('li').addClass('current');
					}
				});
			} else {
				$('.navigation a.current').removeClass('current');
				$('.navigation a.current').parent('li').removeClass('current');
				$('.navigation a:first').parent('li').addClass('current');
				$('.navigation a:first').addClass('current');
			}
		}).scroll();

		$(document).keydown(function(e) {
			var code = e.keyCode || e.which;
			if(code == 38) { // Up

				var $next = $( '.navigation' ).find( '.current' ).prev( 'li' ).find('a');

				// If there isn't one, go to the beginning
				if ( ! $next.length ) {
					$next = $( '.navigation' ).find( 'li' ).last().find('a')
				}

				// Trigger the click
				$next.trigger( 'click' );

			} else if(code == 40) { // Down

				var $next = $( '.navigation' ).find( '.current' ).next( 'li' ).find('a');

				// If there isn't one, go to the beginning
				if ( ! $next.length ) {
					$next = $( '.navigation' ).find( 'li' ).first().find('a')
				}

				// Trigger the click
				$next.trigger( 'click' );

			}
		});


		/* ------------------------------------------------------------------------ */
		/*	COUNTDOWN
		/* ------------------------------------------------------------------------ */
		if ($('.countdown[data-countdown]').length) {
			$('.countdown[data-countdown]').each(function() {
				var $countdown = $(this),
					finalDate = $countdown.data('countdown');
				$countdown.countdown(finalDate, function(event) {
					$countdown.html(event.strftime(
						'<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div><div class="counter-box"><div class="number">%H</div><span>Hours</span></div><div class="counter-box"><div class="number">%M</div><span>Minutes</span></div><div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
					));
				});
			});
		}


		/* ------------------------------------------------------------------------ */
		/*	PLACEHOLDER
		/* ------------------------------------------------------------------------ */
		$('input, textarea').placeholder();


		/* ------------------------------------------------------------------------ */
		/*	MAILCHIMP
		/* ------------------------------------------------------------------------ */
		$('.mailchimp').ajaxChimp({
			callback: mailchimpCallback,
			url: "mailchimp-post-url" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
		});

		function mailchimpCallback(resp) {
			 if (resp.result === 'success') {
				$('.success-message').html(resp.msg).fadeIn(1000);
				$('.error-message').fadeOut(500);

			} else if(resp.result === 'error') {
				$('.error-message').html(resp.msg).fadeIn(1000);
			}
		}

		$('#email').focus(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$('#email').keydown(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$("#email").click(function() {
			$("#email").val('');
		});


		/* ------------------------------------------------------------------------ */
		/*	CONTACT FORM
		/* ------------------------------------------------------------------------ */
		function initContactForm() {

			var scrollElement = $('html,body'),
				contactForm = $('.contact-form'),
				form_msg_timeout;

			contactForm.on( 'submit', function() {

				var requiredFields = $(this).find('.required'),
					formData = contactForm.serialize(),
					formAction = $(this).attr('action'),
					formSubmitMessage = $('.response-message');

				requiredFields.each(function() {

					if( $(this).val() == "" ) {

						$(this).addClass('input-error');

					} else {

						$(this).removeClass('input-error');
					}

				});

				function validateEmail(email) {
					var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return exp.test(email);
				}

				var emailField = $('.contact-form-email');

				if( !validateEmail(emailField.val()) ) {

					emailField.addClass("input-error");

				}

				if ($(".contact-form :input").hasClass("input-error")) {
					return false;
				} else {

					clearTimeout(form_msg_timeout);

					$.post(formAction, formData, function(data) {
						formSubmitMessage.text(data);

						requiredFields.val("");

						form_msg_timeout = setTimeout(function() {
							formSubmitMessage.slideUp();
						}, 5000);
					});

				}

				return false;

			});

		}
		initContactForm();

	});
	//END DOCUMENT.READY FUNCTION

})(jQuery);
