// CommonFunctions used on Bolha.com

function number_format(number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0
			: Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? '.'
			: thousands_sep, dec = (typeof dec_point === 'undefined') ? '.'
			: dec_point, s = '', toFixedFix = function(n, prec) {
		var k = Math.pow(10, prec);
		return '' + Math.round(n * k) / k;
	};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split(',');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}

function checkCredentials(credentialsUrl) {
	requestTimeout = 10000;

	$.ajax({
		type: 'POST',
		url: credentialsUrl,
		data: {
			check: 'userSession',
			site: window.location.href
		},
		timeout: requestTimeout,
		dataType: 'json',
		cache: false,
		beforeSend: function (xhr) {
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.setRequestHeader('X-Site', window.location.href);
		},
		success: function(credentials){
			answer = 'fail';
			if (credentials.result) {
				answer = credentials.result;
			}
			if (answer == 'ok') {
				if(credentials.menu) {
					$('.top-bar .wrapper nav#topMenu').html(credentials.menu);
				}
			} else {
				if(credentials.menu) {
					$('.top-bar .wrapper nav#topMenu').html(credentials.menu);
				}
			}
		},
		error: function(data, textStatus, errorThrown){}
	});	
}


function showDialog(id, title, text, buttonText) {
	$(id + ' .content').html(text);
	$(id).dialog({
		width: 500,
		title: title,
		resizable: false,
		modal: true,
		buttons: {
			buttonText: {
				'text' : buttonText,
				'class': 'buttonYellowDialog',
				click: function() {
					$( this ).dialog("close");
				}
			}
		}
	});
}