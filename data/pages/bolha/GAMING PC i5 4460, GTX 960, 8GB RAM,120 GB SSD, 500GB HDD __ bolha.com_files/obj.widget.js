
function widget(){
	
	/* widget vars */
	this.baseURL;
	this.proxyURL;
	this.widgetID = 'bla';
	this.streamID;
	this.streamName;
	this.streamURL = false;
	this.title;
	this.moreLink = false;
	this.documents;
	this.itemTemplate;
	this.titleMaxChar = 35;
	this.titleMaxCharReducedPrice = 20;
	this.reducePricePosition;
	this.enableLogging;
	this.filterQuery = false;
	
	/* slider vars */
	this.slider;
	this.numSlides;
	this.sliderClass = '.slider';
	this.slideClass;
	this.itemClass = 'item';
	this.itemImageClass = 'image';
	this.itemTitleClass = 'title';
	this.itemPriceClass = 'price';
	this.itemReducedPriceClass = 'reducedPrice';
	this.slideTag = '<div></div>';
	this.slideWidth;
	this.itemsPerSlide;
	this.currentSlide = 1;
	this.currentPosition = 0;
	
	/* slider controls */
	this.controlsNumSlidesHolder = "_numSlides";
	this.controlsCurrentSlideHolder = "_currentSlide";
	this.controlsNextButtonClass = "next";
	this.controlsPreviousButtonClass = "previous";
	
	
	/* public functions */
	this.init = init;
	this.render = render;
	
	
	function init(obj){
		
		var noContent = $(document.createElement('div')).html('Vsebina trenutno ni na voljo. Prosim poizkusite kasneje.').addClass('widgetDataNotAvailable');
		
		if (this.baseURL != '') this.baseURL += '/';
		//alert(this.enableLogging);
		
		var sendData = {};
		if (this.filterQuery != false){
			sendData = {fq: '"'+this.filterQuery+'"'};
		}

		$.ajax({
			type: 'GET',
			url: this.proxyURL,
			timeout: 5000,
			data: sendData,
			dataType: 'json',
			cache: false,
			success: function(data){
				if(data) {
					processData(data, obj);
				}
				else {
					$(obj.widgetID).find(".slider").html(noContent);
				}
			},
			error: function(data, textStatus, errorThrown){
				if (data.status){
					$(obj.widgetID).find(".slider").html(noContent);
				}
				if (!data.Type){
					$(obj.widgetID).find(".slider").html(noContent);			
				}
				if (data.response == null){
					$(obj.widgetID).find(".slider").html(noContent);			
				}
				if (data == ''){
					$(obj.widgetID).find(".slider").html(noContent);			
				}
			}
		});
		
	}

	function processData(data, obj){
		
		if(data.response.docs === null || data.response.docs == '') {
			$(obj.widgetID).hide();
		
		} else {
			
			obj.streamName = data.response.streamName;
			if (data.response.streamUrl != null){
				obj.streamURL = obj.baseURL + data.response.streamUrl;
			}
			
			obj.documents = data.response.docs;
			obj.render(obj);
		} 
	}
	
	
	
	
	
	function render(obj){
		
		
		obj.template = setTemplate(obj);
		obj.title = setTitle(obj);
		obj.moreLink = setMoreLink(obj);
		
		$(obj.widgetID).find("h3.title").html(obj.title);
		if (obj.moreLink){
			$(obj.widgetID).find("span.more").html(obj.moreLink);
		}
		
		var slideCount = 0;
		var itemCount = 0;
		var noItems = obj.documents.length; 
		var sliderElement = $(obj.widgetID).find(obj.sliderClass);
		var counter = 0;
		
		$(obj.documents).each(function(key,doc){
			
			counter++;
			if (itemCount==0){
				slideCount++;
				slide = $(obj.slideTag).attr({'class':obj.slideClass});
			}
			
			docHTML = prepareDocHtml(doc,obj,slideCount,itemCount);
			$(slide).append(docHTML);
			
			if (itemCount==obj.itemsPerSlide-1 || counter == noItems){
				itemCount=0;
				$(sliderElement).append(slide);
			} else {
				itemCount++;
			}
		});
		
		initSlider(obj);
		
	}
	
	
	function setTemplate(obj){
		
		template = $(obj.widgetID).find("div.template").clone();
		$(obj.widgetID).find("div.template").remove();
		
		$(template).removeClass('hidden template');
		$(template).addClass(obj.itemClass);

		return template;
	}
	
	
	function setTitle(obj)
	{
		var title = obj.streamName;
		
		if (obj.streamURL){
			titleUri = $('<a></a>').attr({
				'href':obj.streamURL,
				'title':title,
				'tattr': 'dst=navi' + 
						'&source='+ obj.streamID + '|' + obj.streamName +
						'&category=firstPage' + 
						'&action=titleClk' + 
						'&target=landingPage' + 
						'&redirectFrom=' + encodeURIComponent(window.location.href) + 
						'&redirectTo=' + encodeURIComponent(obj.streamURL)
			});
			
			title = $(titleUri).append(title);
		}
		
		return title;
	}
	
	function setMoreLink(obj)
	{
		if (obj.streamURL){
			var title = obj.streamName;
			moreLink = $('<a class="more">Več<span></span></a>').attr({
				'href':obj.streamURL,
				'title':title,
				'tattr': 'dst=navi' + 
						'&source='+ obj.streamID + '|' + obj.streamName +
						'&category=firstPage' + 
						'&action=moreLinkClk' + 
						'&target=landingPage' + 
						'&redirectFrom=' + encodeURIComponent(window.location.href) + 
						'&redirectTo=' + encodeURIComponent(obj.streamURL)
			});
			
			return moreLink;
			
		} else {
			return false;
		}
		
	}
	
	
	function prepareDocHtml(doc,obj,slideNum,itemNum){
		
		var counter = slideNum+'-'+(itemNum+1);
		
		docElement = $(obj.template).clone();
		
		imgHolder = $(docElement).find('.'+obj.itemImageClass);
		titleHolder = $(docElement).find('.'+obj.itemTitleClass);
		priceHolder = $(docElement).find('.'+obj.itemPriceClass);
		reducedPriceHolder = $(docElement).find('.'+obj.itemReducedPriceClass);
		
		img = $('<img />').attr({
			'src':doc.thumb,
			'alt':resolveTitle(doc.title, 30)
		});
		
		upsellType = 'organic';
		clkType = 'organic';
		adType = (doc.shop == true) ? '20': '10';
		
		// sponsoredAdd in services
		if(obj.widgetID == '#servicesToItems') {
			$(doc).each(function(key,item){
				if(item.internalUpsellType) {
					$(item.internalUpsellType).each(function(key,upsellType){
						if(upsellType == 'sponsoredAd') {
							docElement.addClass('sponsoredService');
						}
					});
				}
			});
		}
		
		if (doc.internalUpsellType !== undefined) {
		       
            $(doc.internalUpsellType).each(function(index, value) {
                
            	switch(value.toLowerCase()) {
              
                    case "topoffer":
                    	clkType = 'commercial';
                    	upsellType = 'topOffer';
                    break;
                   
                    case "bolha.com kampanje":
                    	clkType = 'commercial';
                    	upsellType = 'campaign';
                    break;
                    
                    case "sponsoredad":
                    	clkType = 'commercial';
                    	upsellType = 'sponsoredAd';
                    break;
                    
                    case "renewconstruction":
                    	clkType = 'commercial';
                    	upsellType = 'renewConstruction';
                    break; 
                    
                    case "c2cfeatured":
                    	clkType = 'commercial';
                    	upsellType = 'c2cFeatured';
                    break; 
                    
                    case "c2csellurgently":
                    	clkType = 'commercial';
                    	upsellType = 'c2cSellUrgently';
                    break; 
                    
                    case "c2cpricereduction":
                    	clkType = 'commercial';
                    	upsellType = 'c2cPriceReduction';
                    break;                    
                }
               
            });
           
        };
		
        uri = $('<a></a>').attr({
			'href':obj.baseURL+doc.adURI+".html",
			'title':doc.title,
			'tattr': obj.baseURL +'/bs/t/t.json' + 
					'?adId=' + doc.id +
					'&adType=' + adType +
					'&clkType=' + clkType + 
					'&dst=internal' + 
					'&source=' + obj.streamID + '|' + obj.streamName +
					'&action=titleClk' + 
					'&target=adDetail' +
					'&category=firstPage' +
					'&redirectFrom=' + encodeURIComponent(window.location.href) + 
					'&redirectTo=' + encodeURIComponent(obj.baseURL + doc.adURI + '.html') + 
					'&positionInResultSet=' + counter +
					'&keyword=' + encodeURIComponent(obj.keywords) + 
					'&section=' + upsellType,
			'class':'track log'
		});
        
        uriimg = $('<a></a>').attr({
			'href':obj.baseURL+doc.adURI+".html",
			'title':doc.title,
			'tattr': obj.baseURL +'/bs/t/t.json' + 
					'?adId=' + doc.id + 
					'&adType=' + adType +
					'&clkType=' + clkType + 
					'&dst=internal' + 
					'&source=' + obj.streamID + '|' + obj.streamName +
					'&action=imgClk' + 
					'&target=adDetail' +
					'&category=firstPage' +
					'&redirectFrom=' + encodeURIComponent(window.location.href) + 
					'&redirectTo=' + encodeURIComponent(obj.baseURL + doc.adURI + '.html') + 
					'&positionInResultSet=' + counter +
					'&keyword=' + encodeURIComponent(obj.keywords) + 
					'&section=' + upsellType,
			'class':'track'
		});
		
		$(imgHolder).append(img);
		$(imgHolder).wrap(uriimg);
		
		// Reduced price
		if(doc.priceReducedDisplay) {
			priceReduced = doc.priceReducedDisplay;
			$(reducedPriceHolder).append(resolvePrice(priceReduced));
			
			$(uri).append(resolveTitle(doc.title,obj.titleMaxCharReducedPrice));
			
			// Switch class
			$(priceHolder).removeClass().addClass(obj.itemReducedPriceClass).addClass('oldPrice');
			$(reducedPriceHolder).removeClass().addClass(obj.itemPriceClass);
			
			if(obj.reducePricePosition == 'leftPosition') {
				$(priceHolder).addClass(obj.reducePricePosition);
			}
			
		}
		else {
			$(uri).append(resolveTitle(doc.title,obj.titleMaxChar));
		}
		
		$(titleHolder).append(uri);
		
		price = doc.priceDisplay;
		
		if (readCookieValue("bolha:allow_cookies") == "firstparty"
			|| readCookieValue("bolha:allow_cookies") == "social") {
			price = "";
		}
		
		$(priceHolder).append(resolvePrice(price));
		
		return docElement;
		
	}
	
	function resolveTitle(string,limit){
		
		if (string.length > limit){
			var cuttedstring = string.substring(0,limit);
			var cut = cuttedstring.lastIndexOf(' ');
		
			return string.substring(0,cut)+'...';
		} else {
			return string;
		}
	}

	
	function resolvePrice(string){
		return '<p>'+string+'</p>';
	}
	
	
	function initSlider(obj){
		
		obj.slider = $(obj.widgetID+" "+obj.sliderClass);
		obj.numSlides = $(obj.widgetID+" ."+obj.slideClass).length;
		$(obj.slider).css("width",obj.numSlides*obj.slideWidth+'px');
		$(obj.widgetID+obj.controlsNumSlidesHolder).html(obj.numSlides);
		
		$(obj.widgetID+" a."+obj.controlsPreviousButtonClass).addClass('blur');
		
		$(obj.widgetID+" a."+obj.controlsNextButtonClass).attr({
			'tattr': 'clkType=navi' + 
				'&dst=internal' + 
				'&source=' + obj.streamID + '|' + obj.streamName +
				'&action=nextPage' +
				'&category=firstPage' +
				'&redirectFrom=' + encodeURIComponent(window.location.href) 
		}).live("click", function(e){
			e.preventDefault();
			slideForward(obj);
		});
		
		$(obj.widgetID+" a."+obj.controlsPreviousButtonClass).attr({
			'tattr': 'clkType=navi' + 
				'&dst=internal' + 
				'&source=' + obj.streamID + '|' + obj.streamName +
				'&action=prevPage' + 
				'&category=firstPage' +
				'&redirectFrom=' + encodeURIComponent(window.location.href) 
		}).live("click", function(e){
			e.preventDefault();
			slideBackward(obj);
		});
		
		if (obj.streamURL){
			$(obj.widgetID+" h3.title a, "+obj.widgetID+" a.more").live("click", function(e){
				e.preventDefault();
				var href = $(this).attr('href');
				var tattr = $(this).attr('tattr');
				if (tattr !== undefined){
					logClick(obj,tattr,href);
				} else {
					window.location = href;
				}
			});
		}
		
		logItems(obj);

	}
	
	function slideForward(obj){
		if (obj.currentSlide < obj.numSlides){
			
			if ($(obj.widgetID+" a."+obj.controlsPreviousButtonClass).hasClass('blur')){
				$(obj.widgetID+" a."+obj.controlsPreviousButtonClass).removeClass('blur');
			}
			
			obj.currentSlide++;
			obj.currentPosition = obj.currentPosition - obj.slideWidth;
			$(obj.slider).animate({left: obj.currentPosition+"px"},500);
			$(obj.widgetID+obj.controlsCurrentSlideHolder).html(obj.currentSlide);
			
			if (obj.currentSlide==obj.numSlides){
				$(obj.widgetID+" a."+obj.controlsNextButtonClass).addClass('blur');
			}
			
			var tattr = $(obj.widgetID+" a."+obj.controlsNextButtonClass).attr('tattr');
			tattr += '&target='+obj.currentSlide;
			
			logClick(obj,tattr,false);
			logItems(obj);
		}
	}

	function slideBackward(obj){
		if (obj.currentSlide > 1){
			
			if ($(obj.widgetID+" a."+obj.controlsNextButtonClass).hasClass('blur')){
				$(obj.widgetID+" a."+obj.controlsNextButtonClass).removeClass('blur');
			}
			
			obj.currentSlide--;
			obj.currentPosition = obj.currentPosition + obj.slideWidth;
			$(obj.slider).animate({left: obj.currentPosition+"px"},500);
			$(obj.widgetID+obj.controlsCurrentSlideHolder).html(obj.currentSlide);
			
			if (obj.currentSlide==1){
				$(obj.widgetID+" a."+obj.controlsPreviousButtonClass).addClass('blur');
			}
			
			var tattr = $(obj.widgetID+" a."+obj.controlsPreviousButtonClass).attr('tattr');
			tattr += '&target='+obj.currentSlide;
			
			logClick(obj,tattr,false);
			logItems(obj);
		}
	}
	
	function logItems(obj)
	{
		if (obj.enableLogging == 1){
			var slide = $(obj.widgetID+" ."+obj.slideClass)[obj.currentSlide-1];
			var items = $(slide).find('a.log');
			
			var postData = new Array();
			
			$(items).each(function(){
				postData.push($(this).attr('tattr'));
			});
			
			$.ajax({
				type: 'POST',
				url: obj.baseURL + '/logging/logItemViews',
				timeout: 15000,
				dataType: 'html',
				data: {tattrs: JSON.stringify(postData)},
				cache: true,
				success: function(data){
					//$("#debugger").html(data);
				}
			});
		}
	}
	
	function logClick(obj,tattr,href)
	{
		if (obj.enableLogging == 1){
			$.ajax({
				type: 'POST',
				url: obj.baseURL + '/logging/logClick',
				timeout: 15000,
				dataType: 'html',
				data: {tattr: JSON.stringify(tattr)},
				cache: true,
				success: function(data){
					//$("#debugger").html(data);
					if (href !== false){
						window.location = href;
					}
					
				}
			});
		} else {
			if (href !== false){
				window.location = href;
			}
		}
		
	}
	
}

	
