// Ad gallery slider
$(function () {
	var pictureWidth = 69;
	var frameWidth = 283;
	var sliderWidth = parseInt($("#gallerySlider").css("width"));
	var numberOfElements = Math.ceil(sliderWidth / pictureWidth - 1);
	
	if (($("#gal").attr('alt') <= 4) && (numberOfElements <= 4)) {
		$("#galleryPrevious").addClass('blur'); 
		$("#galleryNext").addClass('blur');
	}
	else { $("#galleryPrevious").addClass('blur'); }
	
	$("#galleryNext").click(function(e) {
		e.preventDefault();
		if (sliderWidth > frameWidth) {
			currentImgNmb = parseInt($("#gal").attr('alt'));
			if (currentImgNmb < numberOfElements) {				
				$("#gallerySlider").animate({left: '-='+pictureWidth },200);
				current = parseInt(currentImgNmb + 1);
				$("#gal").attr('alt', current);
				$("#galleryPrevious").removeClass('blur');
				if ($("#gal").attr('alt') == numberOfElements) { $("#galleryNext").addClass('blur'); }
			}
		}
	});
	
	$("#galleryPrevious").click(function(e) {
		e.preventDefault();
		if (sliderWidth > frameWidth) {
			currentImgNmb = parseInt($("#gal").attr('alt'));
			if (currentImgNmb > 4) {				
				$("#gallerySlider").animate({left: '+='+pictureWidth },200);
				current = parseInt(currentImgNmb - 1);
				$("#gal").attr('alt', current);
				$("#galleryNext").removeClass('blur');
				if ($("#gal").attr('alt') == 4) { $("#galleryPrevious").addClass('blur'); }
			}
		}
	});
});