function cookie()
{
	this.domain					= '';
	this.path					= '/';
	this.name					= 'bolha:allow_cookies';
	this.expire					= 0;
	this.expireSessionTime		= 1800;
	this.secure					= false;

	this.init					= setEvents;
	this.curtain				= curtain;

	this.cookie					= {
		undecided				: 'undecided',
		allowAll				: 'all',
		allowAction				: 'action',
		allowSocial				: 'social',
		allowTracking			: 'track',
		firstPartyOnly			: 'firstparty',
		unknown					: 'null'
	};

	function setEvents(o)
	{
		$(document).ready(function() {
			cookie = readCookieValue(o.name);

			if (cookie == o.cookie.undecided) {
				createCookieValue(o.name, o.cookie.allowAction, o.expireSessionTime, o.domain, o.path, o.secure);
			}

			if ((cookie == null) || (cookie == o.cookie.unknown)) {
				createCookieValue(o.name, o.cookie.undecided, 0, o.domain, o.path, o.secure);
				setTimeout(function(){
					reloadCookie(o);
					$('#cookiesWarning').attr('rel','visible');
					$('#cookieSelectors').hide();
					$('#cookieFloaterSettings').show();
					$('#cookiesShowFloaterFancy').hide();
					$('#cookiesShowFloaterFlat').hide();
					$('#cookiesWarning').animate({opacity: 0.8, top: 0, height: 50}, 300, function() {});
				},500);
			}
		});

		/*
		$("#cookiesShowFloaterFancy" )
		.mouseenter(function() {
			$(this).animate({right: -10}, 500, function() {});
		})
		.mouseleave(function() {
			$(this).animate({right: -152}, 500, function() {});
		});
		*/

		$("#cookiesShowFloaterFlat" )
        .mouseenter(function() {
            $(this).animate({bottom: -10}, 100, function() {});
        })
		.mouseleave(function() {
			$(this).animate({bottom: -15}, 100, function() {});
		});

		$('#cookiesShowFloaterFlat').click(function(e) {
			e.preventDefault();
			reloadCookie(o);

			$('#cookiesWarning').attr('rel','visible');
			$('#cookiesWarning').animate({opacity: 0.8, top: 0, height: 50}, 300, function() {});
			$('#cookieSelectors').hide();
			$('#cookieFloaterSettings').show();
			$(this).hide();
			//$('#cookiesShowFloaterFancy').hide();
		});

		// Behaviour for cookies link in Footer

        $('#showCookies').click(function(e) {
            e.preventDefault();
            reloadCookie(o);

            $('#cookiesWarning').attr('rel','visible');
            $('#cookiesWarning').animate({opacity: 0.8, top: 0, height: 50}, 300, function() {});
            $('#cookieSelectors').hide();
			$('#showCookies').show();
            $('#cookieFloaterSettings').show();
        });



		/*
		$('#cookiesShowFloaterFancy').click(function(e) {
			e.preventDefault();

			$('#cookiesWarning').attr('rel','visible');
			$('#cookiesWarning').animate({opacity: 0.8, bottom: 0, height: 50}, 300, function() {});
			$('#cookieSelectors').hide();
			$('#cookieFloaterSettings').show();
			$(this).hide();
			$('#cookiesShowFloaterFlat').hide();
		});
		*/

		$('#triggerFloater').live("click",function(e) {
            $('#cookiesWarning').attr('rel','visible');
            $('#cookiesWarning').animate({opacity: 0.8, top: 0, height: 50}, 300, function() {});
            $('#cookieSelectors').hide();
            $('#showCookies').show();
            $('#cookieFloaterSettings').show();

			if ($('#cookiesWarning').attr('rel') == 'hidden') {
				$('#cookiesShowFloaterFlat').trigger('click',e);
				$('#cookieFloaterSettings').trigger('click',e);
			}
		});

		$('#cookieFloaterSettings').click(function(e) {
			e.preventDefault();

			$('#cookiesWarning').animate({opacity: 0.8,height: 125}, 300, function() {});
			$('#cookieSelectors').show();
			$('#cookieFloaterSettings').hide();
		});

		$('#floaterAgree').click(function(e) {
			e.preventDefault();

			cookieVal = o.cookie.firstPartyOnly;
			if (($('#cookieTrack').is(':checked')) && ($('#cookieSocial').is(':checked'))) {
				cookieVal = o.cookie.allowAll;
			} else if (($('#cookieTrack').is(':checked')) && (!$('#cookieSocial').is(':checked'))) {
				cookieVal = o.cookie.allowTracking;
			} else if ((!$('#cookieTrack').is(':checked')) && ($('#cookieSocial').is(':checked'))) {
				cookieVal = o.cookie.allowSocial;
			}

			createCookieValue(o.name, cookieVal, o.expire, o.domain, o.path, o.secure);
			$('#cookiesWarning').animate({top: -150 }, 300, function() {});
			$('#cookiesWarning').attr('rel','hidden');

			//$('#cookiesShowFloaterFancy').show();
			$('#cookiesShowFloaterFlat').show();
			window.location.reload();
		});

		$('#popup').click(function(e) {
			e.preventDefault();
			floater = $('#cookiesWarning').attr('rel');

			if (floater == 'visible') {
				$('#cookiesWarning').animate({bottom: -150 }, 300, function() {});
			}

			zi = curtain(true);

			$('#cookiesWarningLoginPopUp').show(300,"linear");
			$('#cookiesWarningLoginPopUp').css({'z-index':zi+1});
		});

		$('#DBUser_cookiesTrackingApproved').click(function(e) {
			if (!$('#DBUser_cookiesTrackingApproved').is(':checked')) {
				zi = curtain(true);

				$('#DBUser_cookiesTrackingApproved').attr('checked', 'checked');
				$('#cookiesWarningProfilePopUp').show(300,"linear");
				$('#cookiesWarningProfilePopUp').css({'z-index':zi+1});
			} else {
				$('#DBUser_cookiesTrackingApproved').attr('checked', 'checked');
			}
		});
		$('#DBGdpr_cTargetedAdvertisement').click(function(e) {
			if (!$('#DBGdpr_cTargetedAdvertisement').is(':checked')) {
				zi = curtain(true);

				$('#DBGdpr_cTargetedAdvertisement').attr('checked', 'checked');
				$('.DBGdpr_cTargetedAdvertisement_revocationAlert').show(300,"linear");
				$('.DBGdpr_cTargetedAdvertisement_revocationAlert').css({'z-index':zi+1});
			} else {
				$('.DBGdpr_cTargetedAdvertisement_revocationAlert').attr('checked', 'checked');
			}
		});
		$('#DBGdpr_cGeneralAccount').click(function(e) {
			if (!$('#DBGdpr_cGeneralAccount').is(':checked')) {
				zi = curtain(true);

				$('#DBGdpr_cGeneralAccount').attr('checked', 'checked');
				$('.DBGdpr_cGeneralAccount_revocationAlert').show(300,"linear");
				$('.DBGdpr_cGeneralAccount_revocationAlert').css({'z-index':zi+1});
			} else {
				$('.DBGdpr_cGeneralAccount_revocationAlert').attr('checked', 'checked');
			}
		});				

		$('#DBUser_cookiesSocialApproved').click(function(e) {
			if (!$('#DBUser_cookiesSocialApproved').is(':checked')) {
				zi = curtain(true);

				$('#DBUser_cookiesSocialApproved').attr('checked', 'checked');
				$('#cookiesWarningProfileSocialPopUp').show(300,"linear");
				$('#cookiesWarningProfileSocialPopUp').css({'z-index':zi+1});
			} else {
				$('#DBUser_cookiesSocialApproved').attr('checked', 'checked');
			}
		});
		$('#DBGdpr_cSocialNetworks').click(function(e) {
			if (!$('#DBGdpr_cSocialNetworks').is(':checked')) {
				zi = curtain(true);

				$('#DBGdpr_cSocialNetworks').attr('checked', 'checked');
				$('.DBGdpr_cSocialNetworks_revocationAlert').show(300,"linear");
				$('.DBGdpr_cSocialNetworks_revocationAlert').css({'z-index':zi+1});
			} else {
				$('.DBGdpr_cSocialNetworks_revocationAlert').attr('checked', 'checked');
			}
		});		

		$('#warningDisagree').click(function(e) {
			e.preventDefault();
			cookie = readCookieValue(o.name);

			$('#cookiesWarningLoginPopUp').hide(300,"linear");

			if ((floater == 'visible') && ((cookie == null) || (cookie == o.cookie.unknown))) {
				$('#cookiesWarning').animate({bottom: 0 }, 300, function() {});
			}

			curtain(false);

			$('#loginBox').slideUp("fast");
			$('#loginBox').attr('state','closed');
			$('#authenticating').hide();
		});

		$('#warningCookieCancel').click(function(e) {
			e.preventDefault();

			curtain(false);

			$('#cookiesWarningProfilePopUp').hide(300,"linear");
			$('#DBUser_cookiesTrackingApproved,#DBGdpr_cTargetedAdvertisement,#DBGdpr_cGeneralAccount').attr('checked', 'checked');
		});

		$('#warningCookieSocialCancel').click(function(e) {
			e.preventDefault();

			curtain(false);

			$('#cookiesWarningProfileSocialPopUp').hide(300,"linear");
			$('#DBUser_cookiesSocialApproved, #DBGdpr_cSocialNetworks').attr('checked', 'checked');
		});

		$('.closePopUp, .buttonCancel').click(function(e) {
			e.preventDefault();

			curtain(false);

			$('.GdprRevocationAlert').hide(300,"linear");
			// $('#DBUser_cookiesSocialApproved, #DBGdpr_cSocialNetworks').attr('checked', 'checked'); GdprRevocationAlert
		});

		$('#warningCookieDecline').click(function(e) {
			e.preventDefault();

			curtain(false);

			$('#cookiesWarningProfilePopUp').hide(300,"linear");
			$('#DBUser_cookiesTrackingApproved,#DBGdpr_cTargetedAdvertisement,#DBGdpr_cGeneralAccount').attr('checked', 'checked');
		});

		$('#warningCookieSocialDecline').click(function(e) {
			e.preventDefault();

			curtain(false);

			$('#cookiesWarningProfileSocialPopUp').hide(300,"linear");
			$('#DBUser_cookiesSocialApproved,#DBGdpr_cSocialNetworks').attr('checked', 'checked');
		});

		$('#warningCookieAgree').click(function(e) {
			e.preventDefault();

			curtain(false);

			$('#cookiesWarningProfilePopUp').hide(300,"linear");
			$('#DBUser_cookiesTrackingApproved,#DBGdpr_cTargetedAdvertisement,#DBGdpr_cGeneralAccount').attr('checked', false);

			$('#settingsData').submit();
		});

		$('.buttonAgreeLogout').click(function(e) {
			e.preventDefault();

			curtain(false);

			//$('#cookiesWarningProfilePopUp').hide(300,"linear");
			//$('#DBUser_cookiesTrackingApproved,#DBGdpr_cTargetedAdvertisement,#DBGdpr_cGeneralAccount').attr('checked', false);
			var elementName = $(this).attr("data-field");
			$('#DBGdpr_' + elementName).attr('checked', false);

			$('#settingsData').submit();
		});

		$('.buttonAgree').click(function(e) {
			e.preventDefault();

			curtain(false);

			//$('#cookiesWarningProfilePopUp').hide(300,"linear");
			//$('#DBUser_cookiesTrackingApproved,#DBGdpr_cTargetedAdvertisement,#DBGdpr_cGeneralAccount').attr('checked', false);
			var elementName = $(this).attr("data-field");
			$('#DBGdpr_' + elementName).attr('checked', false);
			$('.GdprRevocationAlert').hide(300,"linear");
			//$('#settingsData').submit();
		});		

		$('#warningCookieSocialAgree').click(function(e) {
			e.preventDefault();

			curtain(false);

			$('#cookiesWarningProfilePopUp').hide(300,"linear");
			$('#DBUser_cookiesSocialApproved').attr('checked', false);

			$('#settingsData').submit();
		});

		$(':checkbox[readonly]').click(function() {
			$(this).attr('checked', true);
			return false;
		});

		$('#warningAgree').click(function(e) {
			e.preventDefault();
			fallback = $("a#loginBoxOpen").attr('href');
			url = $("a#loginBoxOpen").attr('action');
			credentialsUrl = $("a#loginBoxOpen").attr('credentials');
			requestTimeout = 10000;
			cookieval='';

			if (
				$('#cookieSelectorsLogin #cookieSocialLogin').is(':checked') ||
                $('#cookieSelectorsLogin input[name=cSocialNetworks]').is(':checked')
			) {
				cookieval += o.cookie.allowSocial;
			}
			if (
				$('#cookieSelectorsLogin #cookieTrackLogin').is(':checked') ||
                $('#cookieSelectorsLogin input[name=cTargetedAdvertisement]').is(':checked')
			) {
				cookieval += o.cookie.allowTracking;
			}

			if (cookieval == o.cookie.allowSocial+o.cookie.allowTracking) {
				cookieval = o.cookie.allowAll;
			}
			if (cookieval == '') {
				cookieval=o.cookie.unknown;
			}
			if (cookieval !== o.cookie.unknown) {
				createCookieValue(o.name, cookieval, 0, o.domain, o.path, o.secure);
			} else {
				createCookieValue(o.name, null, -1000, o.domain, o.path, o.secure);
			}

            // Read consents
            var consents = [];
            $('#cookiesWarningLoginPopUp input:checkbox').each(function() {
                if($(this).is(':checked')) {
                    consents.push($(this).attr('name') + '.' + $(this).attr('id') + '.checked');
                } else {
                    consents.push($(this).attr('name') + '.' + $(this).attr('id') + '.unchecked');
                }
            });

            $.ajax({
				type: 'POST',
				url: url,
				data: {
					check: 'cookies',
					site: window.location.href,
					confirmed: true,
					cookieFirstParty: true,
                    cookieTrack: $('#cookieSelectorsLogin input[name=cTargetedAdvertisement]').is(':checked'),
                    cookieSocial: $('#cookieSelectorsLogin input[name=cSocialNetworks]').is(':checked'),
                    consents: consents
				},
				timeout: requestTimeout,
				dataType: 'json',
				cache: false,
				xhrFields: {
					withCredentials: true
				},
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					xhr.setRequestHeader('X-Site', window.location.href);
				},
				crossDomain: true,
				success: function(credentials) {
					$('#cookiesWarningLoginPopUp').hide(300,"linear");
					floater = $('#cookiesWarning').attr('rel');
					$('#cookiesWarning').attr('rel','hidden');

					$('#loginBox').slideUp("fast");
					$('#loginBox').attr('state','closed');
					$('#authenticating').hide();

					cookie = readCookieValue(o.name);

					if ((floater == 'visible') && ((cookie == null) || (cookie == o.cookie.unknown))) {
						$('#cookiesWarning').animate({bottom: 0 }, 300, function() {});
					}

					curtain(false);

					answer = 'fail';
					if (credentials.auth) {
						answer = credentials.auth;
					}
					if (answer == 'success') {
						$.ajax({
							type: 'POST',
							url: credentialsUrl,
							data: {
								check: 'credentials',
								site: window.location.href
							},
							timeout: requestTimeout,
							dataType: 'json',
							cache: false,
							xhrFields: {
								withCredentials: true
							},
							beforeSend: function (xhr) {
								xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
								xhr.setRequestHeader('X-Site', window.location.href);
							},
							crossDomain: true,
							success: function(credentials){
								// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
								manageFloater();
								$('#loginBox').slideUp("fast");
								$('#loginBox').attr('state','closed');
								$('#authenticating').hide();

								answer = 'fail';
								if (credentials.result) {
									answer = credentials.result;
								}
								if (answer == 'ok') {
									if(credentials.menu) {
										$('.top-bar .wrapper nav#topMenu').html(credentials.menu);
										$('.itemVisibility').css('display','block');
										if (window.location.href.indexOf('/koristno/kontakt',0) !== -1) {
											window.location.reload();
										}
										if (credentials.reload) {
											window.location.reload();
										}
									} else {
										window.location.reload();
									}
								} else {
									if(credentials.menu) {
										$('.top-bar .wrapper nav#topMenu').html(credentials.menu);
									}
									window.location.href=fallback;
								}
							},
							error: function(data, textStatus, errorThrown){
								manageFloater();
								$('#loginBox').slideUp("fast");
								$('#loginBox').attr('state','closed');
								$('#authenticating').hide();
								window.location.href=fallback;
							}
						});
					}
				},
				error: function(data, textStatus, errorThrown){
					$('#loginBox').slideUp("fast");
					$('#loginBox').attr('state','closed');
					$('#authenticating').hide();

					if (data.status) {
						switch (data.status) {
							case 417:
								msg = 'unknown';
								if (data.responseText) {
									jmsg = jQuery.parseJSON(data.responseText);
									if (jmsg.auth) msg = jmsg.auth;
								}

								if (msg == 'cookies') {								// Cookies not accepted
									$('#cookiesWarningLoginPopUp').hide();
									curtain(false);
									cookie = readCookieValue(o.name);
									if ((cookie == null) || (cookie == o.cookie.unknown) || (cookie == "") || (cookie == o.cookie.undecided)) {
										createCookieValue(o.name, o.cookie.undecided, 0, o.domain, o.path, o.secure);
										$('#cookiesShowFloaterFlat').trigger('click',e);
									} else {
										$('#loginBox').attr('state', 'closed');
										$('#cookiesWarning').attr('rel','hidden');
										manageFloater();
										$('#cookiesShowFloaterFlat').show();
									}

									zi = curtain(true);
									$('#errorLoginPopUp').css({'z-index':zi+1});
									$('#errorLoginPopUp').show(50, 'easeInCubic');
									$('#errorLoginPopUp').effect("shake", {times:10,distance:3,direction:"right"}, 5);
								} else {											// Authentication error
									window.location.href=fallback;
								}
								break;

							default:
								window.location.href=fallback;
								break;
						}
					}
				}
			});
		});
	}
}

$(document).ready(function() {
	$('#cookiesWarningLoginPopUp #cookieSelectorsLogin input').change(function(e) {
		label = $("label[for='" + $(this).attr('id') + "']");
		if ($(this).is(':checked')) {
			if (!label.hasClass('checked')) {
				label.addClass('checked');
			}
		} else {
			if (label.hasClass('checked')) {
				label.removeClass('checked');
			}
		}
	});
});

function curtain(display) {
	if (display) {
//		var maxZ = Math.max.apply(null,$.map($('body > *'), function(e,n){
//			if($(e).css('position')=='absolute') return parseInt($(e).css('z-index'))||1 ;
//		}));
//		maxZ = maxZ + 9001;
		maxZ = 100000;

		if (maxZ == (maxZ + 1)) {												// Max integer bug
			maxZ = 100000;
		}

		var h = $(document).height();
		$('body').append('<div class="curtain"></div>');
		$('.curtain').css({'height':h,'z-index':maxZ});
		$('.curtain').show();
		return maxZ;
	} else {
		$('.curtain').hide();
		$('.curtain').remove();
	}
}

function createCookieValue(name, value, expires, domain, path, secure) {
	if (expires) {
		if (expires == 0) {
			expires = '';
		} else {
			var date = new Date();
			date.setTime(date.getTime() + expires * 1000);
			var expires = '; expires=' + date.toGMTString();
		}
	} else {
		expires = '';
	}

	if (domain) {
		domain=';domain=' + domain;
	} else {
		domain = '';
	}

	if (path) {
		path=';path=' + path;
	} else {
		path = '';
	}

	if (secure) {
		secure=';secure';
	} else {
		secure = '';
	}

	document.cookie = name + '=' + value + expires + domain + path + secure;
}

function readCookieValue(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function reloadCookie(o) {
	cookie = readCookieValue(o.name);
	switch (cookie) {
		case o.cookie.allowAll:
		case o.cookie.undecided:
		case o.cookie.allowAction:
		case o.cookie.unknown:
		case null:
			$('#cookieTrack').attr('checked',true);
			$('#cookieSocial').attr('checked',true);
			break;
		case o.cookie.allowTracking:
			$('#cookieTrack').attr('checked',true);
			$('#cookieSocial').attr('checked',false);
			break;
		case o.cookie.allowSocial:
			$('#cookieTrack').attr('checked',false);
			$('#cookieSocial').attr('checked',true);
			break;
		default:
			$('#cookieTrack').attr('checked',false);
			$('#cookieSocial').attr('checked',false);
			break;
	}
}
