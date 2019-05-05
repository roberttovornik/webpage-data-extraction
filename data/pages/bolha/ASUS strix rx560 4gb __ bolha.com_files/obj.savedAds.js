/**
 *	Saved Ads Javascript object  
 */

function SavedAds() {
	this.mojabolhaUrl;
	
	/* Variables */
	this.BASEURL;

	this.savedAdsContainer = $('section#savedAds');
	this.saveDialog = "#savedAdDialog";
	this.SaveAd = $('.save._ad');
	
	/* Messages */
	this.error400 = "Napaka pri komunikaciji s strežnikom. Poskusite kasneje.";
	this.error401 = "Če želite shraniti oglas se morate najprej prijaviti.";
	this.error403 = "Tega oglasa ne morete shraniti.";
	this.error404 = "Tega oglasa ne morete shraniti, ker je verjetno že potekel.";
	this.error405 = "Napaka pri komunikaciji s strežnikom. Poslana je bila napačna zagteva. Poskusite kasneje.";
	this.error406 = "Tega oglasa ne morete shraniti.";
	this.error408 = "Oglasa trenutno ne morete shraniti. Povezava s strežnikom je bila prekinjena. Prosimo poskusite kasneje.";
	this.error500 = "Neznana napaka. Prosimo poskusite kasneje.";
	this.errorDefault = "Oglasa trenutno ne morete shraniti. Povezava s strežnikom je bila prekinjena. Prosimo poskusite kasneje.";
	this.success;
	this.alreadySaved = "Ta oglas ste že shranili.";
	this.adSaved = "Oglas je shranjen";

	this.init = init;
	this.getData = getData;

	// Get saved ads
	function getData(o){

		$.ajax({
			type: 'POST',
			url: '/savedads/get',
			timeout: 15000,
			dataType: 'json',
			cache: false,
			success: function(data, textStatus, errorThrown){
				if(data && data.ads)
					o.savedAdsContainer.html(data.ads).show();
			},
			error: function(data){
			}
		});

	}

	// Init function
	function init(o){
		this.success = "Oglas ste uspešno shranili. Shranjene oglase si lahko ogledate v vaši <a href='"+o.mojabolhaUrl+"savedAds' style='color:#0e8eab;'>moja.bolha.com</a>.";
		o.SaveAd.click(function(e) {
			e.preventDefault();

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
								
								if(data && data.ads){
									o.savedAdsContainer.html(data.ads);
								}
							
								showDialog(
									o.saveDialog,
									o.adSaved, 
									o.success, 
									"Ok"
								);
								break;
							case 304:
								showDialog(
										o.saveDialog,
										"Opozorilo", 
										o.alreadySaved, 
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
								showDialog(o.saveDialog, "Opozorilo", o.error400, "Ok");
								break;
							case 401:
								showDialog(o.saveDialog, "Opozorilo", o.error401, "Ok");
								break;
							case 403:
								showDialog(o.saveDialog, "Opozorilo", o.error403, "Ok");
								break;
							case 404:
								showDialog(o.saveDialog, "Opozorilo", o.error404 ,"Ok");
								break;
							case 405:
								showDialog(o.saveDialog, "Opozorilo", o.error405, "Ok");
								break;
							case 406:
								showDialog(o.saveDialog, "Opozorilo", o.error406, "Ok");
								break;
							case 408:
								showDialog(o.saveDialog, "Opozorilo", o.error408, "Ok");
								break;
							case 500:
							default:
								showDialog(o.saveDialog, "Opozorilo", o.error500 + "(" + errorThrown.status + ")", "Ok");
								break;
						}
					} else {
						if ((errorThrown == undefined) || (errorThrown.status == undefined)) {
							showDialog(o.saveDialog, "Opozorilo", o.error500, "Ok");
						} else {
							showDialog(o.saveDialog, "Opozorilo", o.errorDefault, "Ok");
						}
					}
				}
			});

		});

	}

// End of SavedAds function	
}