function setMainSearchBox()
{
	var calcElement = $('<span id="calcElement" style="visibility: hidden;font-size: 14px;"></span>');
	var oCategory = $("#mainSearchBox .searchInCategory");
	var oInputField = $("input.input-mainSearch");

	//$("#mainSearchBox .searchInput").append(calcElement);

	oCategoryWidth = (parseInt($(oCategory).css("padding-left"))*2) + parseInt($(oCategory).css("width")) + 8;
	//oInputFieldWidthOrigin = parseInt($(oInputField).css("width"));
	oInputFieldWidthOrigin = 245;
	oInputFieldWidth = oInputFieldWidthOrigin - oCategoryWidth;


	$(oInputField).keyup(function(e){

		$(oInputField).css("width",oInputFieldWidth+"px");
		$(oInputField).css("padding-right",oCategoryWidth+"px");

		elVal = $(this).val().replace(' ','f');
		console.log(elVal);
		$("#calcElement").html(elVal);
		width = 15 + parseInt($("#calcElement").css("width"));
		calculatedWidth = width - 18;
		console.log(parseInt($("#calcElement").css("width")));
		if (calculatedWidth < oInputFieldWidth){
			$(oCategory).css("left",width+"px");
		}
	});

	$(oInputField).blur(function(e){
		if ($(oInputField).val() == ''){
			$(oInputField).css("width",oInputFieldWidthOrigin+"px");
			$(oInputField).css("padding-right","0px");
		}
	});


}

function initSearchBox()
{

		var oCategory = $("#mainSearchBox .searchInCategory");
		var oInputField = $("input.input-mainSearch");

		oCategoryWidth = (parseInt($(oCategory).css("padding-left"))*2) + parseInt($(oCategory).css("width")) + 8;
		//oInputFieldWidthOrigin = parseInt($(oInputField).css("width"));
		oInputFieldWidthOrigin = 245;
		oInputFieldWidth = oInputFieldWidthOrigin - oCategoryWidth;

		$(oInputField).css("width",oInputFieldWidth+"px");
		$(oInputField).css("padding-right",oCategoryWidth+"px");

		width = 15 + parseInt($("#calcElement").css("width"));
		calculatedWidth = width - 18;

		if (calculatedWidth < oInputFieldWidth){
			$(oCategory).css("left",width+"px");
		}
}



$(document).ready(function() {

	// Check Skyscraper position on document load

	var $document			= $(document);
	var $skyscraper			= $("div#skyscraper, div#SkyscraperLeftM");
	var documentPosition = $document.scrollTop();

	positionSkyscrapper(documentPosition);

	// Skyscraper sticky script on scroll event
	$(window).on('scroll', function(){
		var documentPosition = $document.scrollTop();
		positionSkyscrapper(documentPosition);
	});

	function positionSkyscrapper(documentPosition){
		var maxTopPos			= 39;
		if(documentPosition >= maxTopPos)
			finalPosition = documentPosition;
		else
			finalPosition = maxTopPos;

		$skyscraper.css({
			'top' : finalPosition + "px"
		});
	}


	if (isLoginBug()) {
		$('#loginBox input#username').attr('placeholder', 'Uporabniško ime');
		$('#loginBox input#password').attr('placeholder', 'Geslo');
	} else {
		$('#loginBox input#username').val('Uporabniško ime');
		$('#loginBox input#password').val('Geslo');
		$('#loginBox input#password').get(0).type = 'text';
	}


	$('#errorLoginPopUpOk').click(function(e) {
		$('#errorLoginPopUp').hide(500, 'swing');
		curtain(false);
	});

	$('#errorLoginPopUpClose').click(function(e) {
		$('#errorLoginPopUp').hide(500, 'swing');
		curtain(false);
	});


	/*
	jQuery("a.img_v0 img, a.img_v2 img").lazyload({
		placeholder : "http://s4.bolha.com/graphics/nofoto.jpg",
		effect : "fadeIn",
		img_height : 160
	});
	*/
	/* mainSearchBox *//*
	if($("#calcElement").html() != ''){
		initSearchBox();
	}

	$("input.input-mainSearch").live("focus",function(){
		setMainSearchBox();
	});
	*/
	$('input.mainSearchSubmit').live("click",function(e){
		//e.preventDefault();
		//alert($("input.input-mainSearch").val());
		if ($("input.input-mainSearch").val() == ''){
			return false;
		}
	});

	/*
	$('input.searchSubmit').live("click",function(){
		var element = $(this).parent(".input").find("input.input-main-search");
		if ($(element).val() == ''){
			return false;
		}
	});
	*/


	$('#loginBox .checkbox label').unbind("click").click(function(){
		$(this).hasClass('checked')? $(this).removeClass('checked'):$(this).addClass('checked');
		$('#loginBox #rememberMe').focus();
	});

	$('a._loginActionTrigger').live("click", function(e){
		e.preventDefault();

		cors = false;
		if(XMLHttpRequest) {
			var request = new XMLHttpRequest();
			if("withCredentials" in request) {
				cors = true;
			} else if (typeof(XDomainRequest) !== 'undefined') {				// IE8,9
				cors = false;													// We don't support cors in IE 8,9 for now
			}
		}

		if (!cors) {
			fallback = $("a#loginBoxOpen").attr('href');
			window.location.href=fallback;
			return false;
		}

		state = $('#loginBox').attr('state');
		if ((state == undefined) || (state == 'closed')) {
			manageFloater();
			$('#loginBox').attr('state','open');
			if (!isLoginBug()) {
				$('#loginBox input#username').val('Uporabniško ime');
				$('#loginBox input#password').val('Geslo');
				$('#loginBox input#password').get(0).type = 'text';
			}
			$('#authenticating').hide();
			$('form[name="loginBoxForm"]').trigger('reset');
			$('#loginBox').slideDown("800");
			$('#loginBox input#username').focus();
		} else {
			manageFloater();
			$('#loginBox').slideUp("fast");
			$('#loginBox').attr('state','closed');
		}
	});

	$('a#loginBoxClose').click(function(e) {
		e.preventDefault();
		manageFloater();
		$('#loginBox').slideUp("fast");
		$('#loginBox').attr('state','closed');
	});

	$('#loginBox input#username').focus(function(e) {
		if (!isLoginBug()) {
			if ($(this).val() == '') {
				$(this).val('Uporabniško ime');
			}
			if ($(this).val() == 'Uporabniško ime') {
				$(this).caretToStart();
			}
		}
	});

	$('#loginBox input#username').blur(function(e) {
		if (!isLoginBug()) {
			if ($(this).val() == '') {
				$(this).val('Uporabniško ime');
			}
		}
	});

	$('#loginBox input#password').focus(function(e) {
		if (!isLoginBug()) {
			if ($(this).val() == '') {
				$(this).val('Geslo');
				$(this).get(0).type = 'text';
			}
			if ($(this).val() == 'Geslo') {
				$(this).caretToStart();
			}
		}
	});

	$('#loginBox input#password').blur(function(e) {
		if (!isLoginBug()) {
			if ($(this).val() == '') {
				$(this).val('Geslo');
				$(this).get(0).type = 'text';
			}
		}
	});

	$('#loginBox input').keyup(function(e) {
		if (!isLoginBug()) {
			on_empty_message = '';
			if ($(this).attr('id') == 'username') {
				on_empty_message = 'Uporabniško ime';
			}
			if ($(this).attr('id') == 'password') {
				on_empty_message = 'Geslo';
			}

			if (($(this).val() == '') && (on_empty_message != '')) {
				$(this).val(on_empty_message);
				$(this).caretToStart();

				if ($(this).attr('id') == 'password') {
					$(this).get(0).type = 'text';
				}
			}
		}
	});

	$('#loginBox input').keydown(function(e) {
		if (!isLoginBug()) {
			on_empty_message = '';
			if ($(this).attr('id') == 'username') {
				on_empty_message = 'Uporabniško ime';
			}
			if ($(this).attr('id') == 'password') {
				on_empty_message = 'Geslo';
			}

			if ($(this).val() == on_empty_message) {
				$(this).val('');

				if ($(this).attr('id') == 'password') {
					$(this).get(0).type = 'password';
				}
			}
		}

		code = e.keyCode ? e.keyCode : e.which;

		switch (code) {
			case 9:
				return true;
				break;
			case 13:
				$('input#bolhaLogin').trigger('click',e);
				return false;
				break;
			case 27:
				manageFloater();
				$('#loginBox').slideUp("fast");
				$('#loginBox').attr('state','closed');
				return false;
				break;
			default:
				return true;
		}
	});

	$('#loginBox a').keydown(function(e) {
		code = e.keyCode ? e.keyCode : e.which;

		switch (code) {
			case 9:
				return true;
				break;
			case 13:
				if ($(this).attr('id') == 'rememberMe') {
					$('input#bolhaLogin').trigger('click',e);
					return false;
				}
				break;
			case 27:
				manageFloater();
				$('#loginBox').slideUp("fast");
				$('#loginBox').attr('state','closed');
				return false;
				break;
			case 32:
				if ($(this).attr('id') == 'rememberMe') {
					is_checked = $('#loginBox .checkbox #rememberLogin').is(':checked');
					$('#loginBox .checkbox label').focus().click();
					$('#loginBox .checkbox #rememberLogin').attr('checked',!is_checked);
					return false;
				}
				break;
			default:
				return true;
		}
	});

	$('#loginBox #rememberMe').focus(function() {
		if (!$("#rememberLabel").hasClass('focused')) {
			$("#rememberLabel").addClass('focused');
		}
	});

	$('#loginBox #rememberMe').blur(function() {
		if ($("#rememberLabel").hasClass('focused')) {
			$("#rememberLabel").removeClass('focused');
		}
	});

	$('input#bolhaLogin').click(function(e) {
		e.preventDefault();
		$('#authenticating').show();

		requestTimeout = 10000;
		url = $("a#loginBoxOpen").attr('action');
		credentialsUrl = $("a#loginBoxOpen").attr('credentials');
		fallback = $("a#loginBoxOpen").attr('href');
		username = $('#loginBox input#username').val();
		password = $('#loginBox input#password').val();
		rememberMe = $('#loginBox input#rememberLogin').is(':checked');

		$.ajax({
			type: 'POST',
			url: url,
			timeout: requestTimeout,
			data: {
				username: username,
				password: password,
				rememberMe: rememberMe
			},
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
			success: function(data) {
				answer = 'fail';
				if (data.auth) {
					answer = data.auth;
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
							$('#loginBox').slideUp("fast");
							$('#loginBox').attr('state','closed');
							$('#authenticating').hide();
							manageFloater();

							answer = 'fail';
							if (credentials.result) {
								answer = credentials.result;
							}
							if (answer == 'ok') {
								if(credentials.menu) {
									$('.top-bar .wrapper nav#topMenu').html(credentials.menu);
									$('.itemVisibility').css('display','block');
									$('#cookiesWarning').attr('rel','hidden');
									//$('#cookiesShowFloaterFlat').hide();
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
				} else {
					manageFloater();
					$('#loginBox').slideUp("fast");
					$('#loginBox').attr('state','closed');
					$('#authenticating').hide();
					window.location.href=fallback;
				}
			},
			error: function(xhr, textStatus, errorThrown){
				redirect = false;
				if (xhr.status) {
					if (xhr.status == 417) {
						if (xhr.responseText) {
							data = jQuery.parseJSON(xhr.responseText);
						}
						if (data.cookies) {
							labelTrack = $("label[for='cookieTrackLogin']");
							labelSocial = $("label[for='cookieSocialLogin']");

							if (data.cookies.cookiesSocialApproved) {
								$('#cookiesWarningLoginPopUp #cookieSelectorsLogin #cookieSocialLogin').attr('checked','checked');
							} else {
								$('#cookiesWarningLoginPopUp #cookieSelectorsLogin #cookieSocialLogin').removeAttr('checked');
							}
							if (data.cookies.cookiesTrackingApproved) {
								$('#cookiesWarningLoginPopUp #cookieSelectorsLogin #cookieTrackLogin').attr('checked','checked');
							} else {
								$('#cookiesWarningLoginPopUp #cookieSelectorsLogin #cookieTrackLogin').removeAttr('checked');
							}
						} else {
							$('#cookiesWarningLoginPopUp #cookieSelectorsLogin #cookieSocialLogin').removeAttr('checked');
							$('#cookiesWarningLoginPopUp #cookieSelectorsLogin #cookieTrackLogin').removeAttr('checked');
						}

						// Synchronize label checked status with checkbox
						if ($('#cookiesWarningLoginPopUp #cookieSelectorsLogin #cookieSocialLogin').is(':checked')) {
							if (!labelSocial.hasClass('checked')) {
								labelSocial.addClass('checked');
							}
						} else {
							if (labelSocial.hasClass('checked')) {
								labelSocial.removeClass('checked');
							}
						}
						if ($('#cookiesWarningLoginPopUp #cookieSelectorsLogin #cookieTrackLogin').is(':checked')) {
							if (!labelTrack.hasClass('checked')) {
								labelTrack.addClass('checked');
							}
						} else {
							if (labelTrack.hasClass('checked')) {
								labelTrack.removeClass('checked');
							}
						}

						// consent checkboxes
						if(data.consents) {
							var consents = data.consents;
                            $.each( consents, function( key, value ) {
                            	var elem = $("#cookiesWarningLoginPopUp input[name='" + key + "']");
                            	elem.attr('checked', value);

                            	if(value == true) {
                                	elem.next().addClass('checked');
								} else if(value == false) {
                                    elem.next().removeClass('checked');
								}
                            });
						}

						zi = curtain(true);
						$('#cookiesWarningLoginPopUp').show(300,"linear");
						$('#cookiesWarningLoginPopUp').css({'z-index':zi+1});

						return false;
					} else redirect = true;
				} else redirect = true;

				manageFloater();
				$('#loginBox').slideUp("fast");
				$('#loginBox').attr('state','closed');
				$('#authenticating').hide();

				if (redirect) {
					window.location.href=fallback;
				}
			}
		});
	});

	$('.track').live('mousedown', function() {
		track = $(this).attr('tattr');
		if (track.indexOf('?') == -1) {
			url = '/bs/t/t.json';
		} else {
			track = track.split('?');
			if (track[0]) url = track[0];
			if (track[1]) track = track[1]; else track='';
		}
		$.ajax({
			type: 'POST',
			url: url + '?ts=' + new Date().getTime(),
			data: track,
			timeout: 5000,
			dataType: 'json',
			cache: false,
			success: function(credentials){ /* if action needed on success */ },
			error: function(data, textStatus, errorThrown){ /* if action needed on error */ }
		});
	});

	/**
	 * Moved to obj.savedAds.js
	 */
	/*
	$('.save._ad').click(function() {
		adId = $(this).attr('data-id');

		$.ajax({
			type: 'POST',
			url: '/api/savead.json',
			data: {
				adId: adId,
				site: window.location.href
			},
			timeout: 15000,
			dataType: 'json',
			cache: false,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-Site', window.location.href);
			},
			success: function(data, textStatus, errorThrown){
				if (errorThrown.status) {
					switch (errorThrown.status) {
						case 200:
							if (data.ads) {
								$('section#savedAds').html(data.ads);
							}
							showDialog(
								"#savedAdDialog",
								"Oglas je shranjen",
								"Oglas ste uspešno shranili. Shranjene oglase si lahko ogledate v mojabolha.com.",
								"Ok"
							);
							break;
						case 304:
							showDialog(
									"#savedAdDialog",
									"Opozorilo",
									"Ta oglas ste že shranili.",
									"Ok"
								);
							break;
					}
				}
			},
			error: function(errorThrown, textStatus){
				if (errorThrown.status) {
					switch(errorThrown.status) {
						case 400:
							showDialog("#savedAdDialog","Opozorilo","Napaka pri komunikaciji s strežnikom. Poskusite kasneje.","Ok");
							break;
						case 401:
							showDialog("#savedAdDialog","Opozorilo","Če želite shraniti oglas se morate najprej prijaviti.","Ok");
							break;
						case 403:
							showDialog("#savedAdDialog","Opozorilo","Tega oglasa ne morete shraniti.","Ok");
							break;
						case 404:
							showDialog("#savedAdDialog","Opozorilo","Tega oglasa ne morete shraniti, ker je verjetno že potekel.","Ok");
							break;
						case 405:
							showDialog("#savedAdDialog","Opozorilo","Napaka pri komunikaciji s strežnikom. Poslana je bila napačna zagteva. Poskusite kasneje.","Ok");
							break;
						case 406:
							showDialog("#savedAdDialog","Opozorilo","Tega oglasa ne morete shraniti.","Ok");
							break;
						case 408:
							showDialog("#savedAdDialog","Opozorilo","Oglasa trenutno ne morete shraniti. Povezava s strežnikom je bila prekinjena. Prosimo poskusite kasneje.","Ok");
							break;
						case 500:
						default:
							showDialog("#savedAdDialog","Opozorilo","Neznana napaka (" + errorThrown.status + "). Prosimo poskusite kasneje.","Ok");
							break;
					}
				} else {
					if ((errorThrown == undefined) || (errorThrown.status == undefined)) {
						showDialog("#savedAdDialog","Opozorilo","Neznana napaka. Prosimo poskusite kasneje.","Ok");
					} else {
						showDialog("#savedAdDialog","Opozorilo","Oglasa trenutno ne morete shraniti. Povezava s strežnikom je bila prekinjena. Prosimo poskusite kasneje.","Ok");
					}
				}
			}
		});

	});*/
});

function manageFloater() {
	state = $('#loginBox').attr('state');
	floater = $('#cookiesWarning').attr('rel');
	if ((state == undefined) || (state == 'closed')) {
		if (floater == 'visible') {
			$('#cookiesWarning').animate({bottom: -150}, 300, function() {});
		}
	} else {
		if (floater == 'visible') {
			$('#cookiesWarning').animate({bottom: 0}, 300, function() {});
		}
	}
}

function isLoginBug() {
	// Starting with version 21 FF poses problems with our login system
	// same problem with chrome version 30+
	// To fix the problem, we need to detect FF/Chrome version
	var ua = navigator.userAgent;

	// Detect Chrome/Chromium version
	if(/chrom(e|ium)/i.test(ua)) {
		var uaArray = ua.split(' ')
		,	chromeVersion = parseInt(uaArray[uaArray.length - 2].substr(7));
	}

	// Detect Firefox version
	if(/Firefox/i.test(ua)) {
		var uaArray = ua.split(' ')
		,	ffVersion = parseInt(uaArray[uaArray.length - 1].substr(8));
	}

	// Detect Internet Explorer version
	if(/MSIE/i.test(ua)) {
		var uaArray = ua.split('MSIE')
		,	ieVersion = parseInt(uaArray[1].split(';')[0].split('.')[0]);
	}

	if ((ffVersion !== undefined) && (ffVersion > 21)) return true;
	if ((chromeVersion !== undefined) && (chromeVersion > 29)) return true;
	if ((ieVersion !== undefined) && (ieVersion < 9)) return true;

	return false;
}

//Set caret position easily in jQuery
//Written by and Copyright of Luke Morton, 2011
//Licensed under MIT
(function ($) {
	// Behind the scenes method deals with browser
	// idiosyncrasies and such
	$.caretTo = function (el, index) {
		if (el.createTextRange) {
			var range = el.createTextRange();
			range.move("character", index);
			range.select();
		} else if (el.selectionStart != null) {
			el.focus();
			el.setSelectionRange(index, index);
		}
	};

	// The following methods are queued under fx for more
	// flexibility when combining with $.fn.delay() and
	// jQuery effects.

	// Set caret to a particular index
	$.fn.caretTo = function (index, offset) {
		return this.queue(function (next) {
			if (isNaN(index)) {
				var i = $(this).val().indexOf(index);

				if (offset === true) {
					i += index.length;
				} else if (offset) {
					i += offset;
				}

				$.caretTo(this, i);
			} else {
				$.caretTo(this, index);
			}

			next();
		});
	};

	// Set caret to beginning of an element
	$.fn.caretToStart = function () {
		return this.caretTo(0);
	};

	// Set caret to the end of an element
	$.fn.caretToEnd = function () {
		return this.queue(function (next) {
			$.caretTo(this, $(this).val().length);
			next();
		});
	};
}(jQuery));