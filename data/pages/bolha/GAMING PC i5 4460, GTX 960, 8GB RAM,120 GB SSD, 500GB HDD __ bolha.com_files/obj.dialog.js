function Dialog()
{
	
	this.baseURL;
	this.controller = 'dialog';
	
	this.dialogID = '#dialogBoxWidget';
	this.dialogFormID = false;
	this.dialogContentID = '#dialogBoxWidgetContent';
	this.dialogTitle = 'Dialog box';
	this.dialogWidth = '600';
	this.dialogHeight = 'auto';
	
	// options
	this.options;
	this.openButtonID = false;
	this.openButtonClass = false;
	this.closeButtonClass = false;
	
	this.ajaxRenderAction = false;
	this.ajaxSubmitFormAction = false;
	this.sendOnRender = false;
	this.sendOnFormSubmit = false;
	this.actionSubmitForm = false;
	
	this.model = false;
	this.modelAttributes = false;
	
	this.clientPage;
	
	
	this.init = init;
	this.renderContent = renderContent;
	
	
	function init(o)
	{
		for (var key in o.options){
			o[key] = o.options[key];
		}
		
		setEvents(o);
		
	}
	
	function setEvents(o)
	{
		if (o.openButtonID){
			$(o.openButtonID).live("click",function(e){
				e.preventDefault();
				renderContent(o);
			});
		}
		
		if (o.openButtonClass){
			$(o.openButtonClass).live("click",function(e){
				e.preventDefault();
				renderContent(o);
			});
		}
		
		if (o.dialogFormID){
			$(o.dialogFormID + ' input[type=submit]').live("click",function(e){
				e.preventDefault();
				submitForm(o);
			});
		}
		
		if (o.closeButtonClass){
			$(o.closeButtonClass).live("click",function(e){
				e.preventDefault();
				$(o.dialogID).dialog("close");
				if ($(this).hasClass("offerSuccessfull")) {
					location.reload();
				}
			});
			
		}
		
	}
	
	
	
	function renderContent(o)
	{
		$(o.dialogID).dialog("option","title",o.dialogTitle);
		$(o.dialogID).dialog("option","width",o.dialogWidth);
		$(o.dialogID).dialog("option","height",o.dialogHeight);
		$(o.dialogContentID).removeAttr("style");
		$(o.dialogContentID).removeAttr("class");
		
		$(o.dialogContentID).html('<div class="loading"></div>');
		
		var sendData = new Object;
		
		if (o.sendOnRender){
			for (var i in o.sendOnRender){
				sendData[o.sendOnRender[i]] = o[o.sendOnRender[i]];
			}
		}
		
		$.ajax({
			type: 'POST',
			url: o.baseURL + '/' + o.controller + '/' + o.ajaxRenderAction + o.clientPage,
			timeout: 5000,
			dataType: 'html',
			data: sendData,
			cache: true,
			success: function(data){
				$(o.dialogContentID).html(data);
				$(o.dialogID).dialog("open");
			},
			error: function(data, textStatus, errorThrown){
			}
		});
		
	}
	
	
	function submitForm(o)
	{
		var sendData = new Object;
		
		if (o.sendOnFormSubmit){
			for (var i in o.sendOnFormSubmit){
				sendData[o.sendOnFormSubmit[i]] = o[o.sendOnFormSubmit[i]];
			}
		}
		
		if (o.modelAttributes){
			for (var i in o.modelAttributes){
				if (typeof(o.modelAttributes[i])=='string'){
					var key = o.model + '[' + o.modelAttributes[i] + ']';
					var value = $('#' + o.model + '_' + o.modelAttributes[i]).val();
					sendData[key] = value;
				}
			}
		}
		
		$.ajax({
			type: 'POST',
			url: o.baseURL + '/' + o.controller + '/' + o.ajaxSubmitFormAction,
			timeout: 5000,
			dataType: 'html',
			data: sendData,
			cache: true,
			success: function(data){
				$(o.dialogContentID).html(data);
			},
			error: function(data, textStatus, errorThrown){
			}
		});
		
	}
	

}
