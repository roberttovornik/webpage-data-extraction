// Similar Ads slider
$(function () {
	var slideWidth = 308;
	var NumOfSlides = parseInt(($("#similarProducts .slider div.slide").size()));
	
	$('#similarAds_numSlides').html(NumOfSlides);
	$("#similarPrevious").addClass('blur'); 

	$("#similarNext").click(function(e) {
		e.preventDefault();
		if($('#similarAds_currentSlide').html() < NumOfSlides) {
			$("#similarProducts .slider").animate({left: '-='+slideWidth },500);
			current = parseInt($('#similarAds_currentSlide').html())+1;
			$('#similarAds_currentSlide').html(current);
			$("#similarPrevious").removeClass('blur'); 
			if ($('#similarAds_currentSlide').html() == NumOfSlides) {
				$("#similarNext").addClass('blur'); 
			}
		}
	});

	$("#similarPrevious").click(function(e) {
		e.preventDefault();
		if($('#similarAds_currentSlide').html() > 1) {
			$("#similarProducts .slider").animate({left: '+='+slideWidth },500);
			current = parseInt($('#similarAds_currentSlide').html())-1;
			$('#similarAds_currentSlide').html(current);
			if ($('#similarAds_currentSlide').html() == '1') {
				$("#similarPrevious").addClass('blur'); 
			}
			if ($('#similarAds_currentSlide').html() < NumOfSlides) {
				$("#similarNext").removeClass('blur'); 
			}
		}
	});
	
});