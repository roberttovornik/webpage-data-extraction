// Isl Online
function startChat() {
	var islOnline = "<script type='text/javascript' src='//islpronto.islonline.net/live/islpronto/public/chat_info.js?d=bolha&amp;lang=sl&amp;c=bolha-com&amp;chat_width=450&amp;chat_height=370&amp;nocookies=1'></script>";
	$('body').append($(islOnline));

	setTimeout( function() {
		if (ISLProntoInfo.supporters > 0) {
			var chat = ISLProntoInfo.onchat;
			chat();
		} else {
			window.location.href = "mailto:podpora@bolha.com?subject=Pogovor v živo&body=Pozdravljeni,%0D%0A%0D%0Aveseli nas, da ste želeli uporabiti našo storitev Pogovor v živo.%0D%0AKer naša marljiva ekipa, ki skrbi za podporo uporabnikom, trenutno ni dosegljiva, vas prosimo, da nam svoje vprašanje sporočite kar po elektronski pošti. Potrudili se bomo, da vam bomo čim prej odgovorili.%0D%0A%0D%0AMimogrede: prijazna ekipa, ki na bolha.com nudi podporo uporabnikom, je dosegljiva od pon. do pet. med 8.00 in 21.00.%0D%0AVaša bolha.com%0D%0A%0D%0AVaše vprašanje napišite tukaj:";
		}
	}, 500);
}
