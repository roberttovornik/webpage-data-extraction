/* Banners in news we add additional class */
$j('#oxbanner img').addClass('img-fluid');
// if there is no ads hide small title at top of a block
if($j('.right-advert #oxbanner').children().length == 1){
	$j('.right-advert').hide();
}

/* AJAX call to display more news in sections */
$j(document).ready(function(){
	/*
	$j('button#showMoreNews').click(function(){
		var sectionId = $j(this).data('section');
		var page = $j(this).data('page');
		var pageSize = 8;
		
		var apiCallGetSectionLayout = 'https://api.rtvslo.si/news/getSectionLayout/' + sectionId + '?prepare=medium&pageNumber=' + page + '&pageSize=' + pageSize + '&client_id=a371953fec443f8eda7c63d7a7366485';  
		
		$j.get(apiCallGetSectionLayout, function (data, success) {
			if(success){
				var newNewsRow = getNewsListHTML(data.response);
				$j('div.news-block').append(newNewsRow);
				$j('button#showMoreNews').data('page',page+1);
			}
		});
	});
	
	function getNewsListHTML(newsList){
		var template = '<div class="row">';
		$j.each(newsList, function(newsIndex, newsItem){
			var imageOrig = newsItem.lead_image.image.orig;
			var imageThumb = newsItem.lead_image.image.thumb;
			template += '\
				<div class="col-lg-3 col-md-6">\
					<div class="normal-news">\
						<a href="' + newsItem.link + '" class="image-link image-container container-16-9" data-large="' + imageOrig.replace('http://','https://') + '">\
							<img src="' + imageThumb.replace('http://','https://') + '" class="image-preview loaded">\
							<img class="image-original loaded" src="' + imageOrig.replace('http://','https://') + '">\
						</a>\
						<h3>\
							<span class="news-cat">\
								<a href="' + newsItem.link + '">' + newsItem.section.title + '</a>\
							</span>\
							<a href="' + newsItem.link + '">' + newsItem.title + '</a>\
						</h3>\
						<p>' + newsItem.lead + '</p>\
					</div>\
				</div>\
			';
			if(newsIndex == newsList.leght){ template += '</div>'; }
		});
		return template;
	}
	*/
	/*SHOW EDIT BITTON, SHOW ADMIN PANNEL */
	(function checkPermisions($){
	
		function getCookie(name) {
			var value = "; " + document.cookie;
			var parts = value.split("; " + name + "=");
			if (parts.length == 2) return parts.pop().split(";").shift();
		}
		
		var classList = document.body.classList;
		if(classList.contains('user-logged-in') !== -1){
			var session = getCookie('APISESSION');
			
			if(typeof session === 'undefined')return;
			if(typeof session !== 'string')return;
			if(session.length === 0)return;
			if(session === 'undefined')return;

			var dev = '';
			if(window.location.href.indexOf('dev.rtvslo.si') > -1){
				dev = 'dev.';
			}
			var client = '82013fb3a531d5414f478747c1aca622';
			var getGroupsOfMemberWithSession = 'https://api.' + dev + 'rtvslo.si/users/getGroupsOfMemberWithSession?client_id='+client+'&session_id=' + session; 
			
			//console.log('getGroupsOfMemberWithSession',getGroupsOfMemberWithSession );
			$.get(getGroupsOfMemberWithSession, function (data, success) {
				if(success){
					if(data && data.response){
						//console.log('data', data.response);
						var isAdmin = data.response.filter(function(itm){
							return itm === 3;
						})
						if(isAdmin.length > 0){
							$('#article-edit-btn').show();
							$('#admin-admin-panel').show();
							$('#article-comments-edit-btn').show();
							return;
						}
						var isJournalist = data.response.filter(function(itm){
							return itm === 4;
						});
						if(isJournalist.length > 0){
							$('#article-edit-btn').show();
							$('#journalist-admin-panel').show();
							return;
						}
						var isModerator = data.response.filter(function(itm){
							return itm === 24;
						});
						if(isModerator.length > 0){
							$('#article-comments-edit-btn').show();
							return;
						}
					}			
				}
			})
			
		}	
	})($j);
});

