// auto Complete
$(function() {
	var ACul = '#autoComplete';
	var inputHistory = '';
	var liSelected;
	var notAllowed = [37,38,39,40,13,17,18,27,112,113,114,115,116,117,118,119,120,121,122,123,145,19,114,46,20,35,36,33,34,45];
	
	function buildAutoCompleteUrl($history) {
		
		baseUrl = $('.mainSearchSubmit').attr('action');
		inputHistory = $('#q').val().toLowerCase();
		
		buildQuery = baseUrl + $history + "*";		
		buildQuery = buildQuery.replace(/ /g,"?");
		buildQuery = buildQuery.replace(/š/g,"%C5%A1");
		buildQuery = buildQuery.replace(/ž/g,"%C5%BE");
		buildQuery = buildQuery.replace(/č/g,"%C4%8D");
		buildQuery = buildQuery.replace(/đ/g,"%C4%91");
		buildQuery = buildQuery.replace(/ć/g,"%C4%87");
		//$(ACul).show(); 
		return buildQuery;	
	}
	
	function FollowArrowKeys(key) {
		li = $('#autoComplete li');
		
		if (key.which == 13) {			
			$('#q').val(liSelected.text());
			$(ACul).slideUp('fast');
			//$(ACul).find('li').remove();
		}
		
		if(key.which == 40) {
			if(liSelected){
	            liSelected.removeClass('selected');
	            next = liSelected.next();
	            if(next.length > 0){
	                liSelected = next.addClass('selected');
	            }else{
	                liSelected = li.eq(0).addClass('selected');
	            }
	        }else{
	            liSelected = li.first().addClass('selected');
	        }
	    }
		else if(key.which === 38){
	        if(liSelected){
	            liSelected.removeClass('selected');
	            next = liSelected.prev();
	            if(next.length > 0){
	                liSelected = next.addClass('selected');
	            }else{
	                liSelected = li.last().addClass('selected');
	            }
	        }else{
	            liSelected = li.last().addClass('selected');
	        }
		}
	}
	
	
	$('#q').live("keydown",function(key) {

		FollowArrowKeys(key);
		
		setTimeout(function () {

			if($("#q").val().length < 2) $(ACul).slideUp('fast'); 	
			if ($("#q").val().length >= 2) {
							
				inputHistory = $('#q').val().toLowerCase();
			
				if ((inputHistory.match(/^[a-zA-Zčšžđć123456789 ]*$/)) 
						&& ($.inArray(key.which, notAllowed) == -1)) 
				{
					buildAutoCompleteUrl(inputHistory);

					$.getJSON(buildQuery, function(data) {
						documents = data.response.docs;	

						if (data.response.numFound >= 1) {

							$.each(documents, function(key, value) {

								if(key == 0) {
									$(ACul).find('li').remove();
								}
								
								value.searchterm = value.searchterm.replace(inputHistory,"<b>" + inputHistory + "</b>");
								UlListName = value.searchterm;
								UlList = $('<li>').html(UlListName);
								UlList.appendTo(ACul);
									
								$("li").live("click", function() {
									$('#q').val($(this).text());
									$("#search").submit();
									$(ACul).slideUp('fast');	
								});
								
							});
							
							$(ACul).slideDown('fast'); 
							
						}
						else {
							$(ACul).find('li').remove();
							$(ACul).slideUp('fast');
						}
					});
					error:(function() { $(ACul).slideUp('fast'); });

				}
			}
		}, 400);
	});
	
	$("#q").live("mouseleave", function(){ setTimeout(function () {
	$(ACul).slideUp('fast'); }, 5000); });
	
	$(ACul).live("mouseleave", function(){ setTimeout(function () {
	$(ACul).slideUp('fast'); }, 2000); });

});