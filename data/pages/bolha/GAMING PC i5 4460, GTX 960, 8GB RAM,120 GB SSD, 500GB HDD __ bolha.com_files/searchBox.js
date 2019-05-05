


function SearchBox()
{
	this.inputField;
	this.categoryElement;
	this.calculationElement;
	
	this.inputFieldWidthOrigin = 245;
	this.inputFieldWidth;
	this.categoryElementWidth;
	
	this.init = init;
	this.setEvents = setEvents;
	
	function init(o)
	{
		o.inputField = $("input.input-mainSearch");
		o.categoryElement = $("#mainSearchBox .searchInCategory");
		o.calculationElement = $("#calcElement");
		
		o.categoryElementWidth = (parseInt($(o.categoryElement).css("padding-left"))*2) + parseInt($(o.categoryElement).css("width")) + 8;
		o.inputFieldWidth = o.inputFieldWidthOrigin - o.categoryElementWidth;
		
		if ($(o.calculationElement).html() != ''){
			setCategoryBox(o);
		}
		
		$(o.inputField).bind("keyup",function(){
			var value = $(o.inputField).val().replace(' ','x');
			$(o.calculationElement).html(value);
			setCategoryBox(o);
		});
		
		setEvents(o);
		
	}
	
	
	function setEvents(o)
	{
		$("#mainSearchBox .searchInCategory a").live("click",function(e){
			e.preventDefault();
			$("input#categoryField").val("");
			$("#mainSearchBox .searchInCategory").remove();
			if ($(o.inputField).val() != ''){
				$("form#search").submit();
			}
		});
	}
	
	
	function setCategoryBox(o)
	{
		var width = 15 + parseInt($(o.calculationElement).css("width"));
		var calculatedWidth = width - 18;
		
		if (calculatedWidth < o.inputFieldWidth){
			$(o.inputField).css("width",o.inputFieldWidthOrigin+"px");
			$(o.categoryElement).css("left",width+"px");
		} else {
			width = 15 + o.inputFieldWidth;
			$(o.inputField).css("width",o.inputFieldWidth+"px");
			$(o.categoryElement).css("left",width+"px");
		}
	}
}

$(document).ready(function(){
	sBox = new SearchBox();
	sBox.init(sBox);
});