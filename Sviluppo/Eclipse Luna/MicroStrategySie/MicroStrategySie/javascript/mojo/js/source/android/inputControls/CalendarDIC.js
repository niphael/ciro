(function(){mstrmojo.requiresCls("mstrmojo.MobileCalendar","mstrmojo._IsInputControl","mstrmojo.android._HasPreviewButton");mstrmojo.android.inputControls.CalendarDIC=mstrmojo.declare(mstrmojo.MobileCalendar,[mstrmojo._IsInputControl,mstrmojo.android._HasPreviewButton],{scriptClass:"mstrmojo.android.inputControls.CalendarDIC",onpopupResized:function onpopupResized(e){var dn=this.domNode;if(dn){dn.style.zoom=parseInt((95*e.width/dn.offsetWidth),10)+"%";}}});}());