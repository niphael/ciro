(function(){mstrmojo.requiresCls("mstrmojo.android.AndroidDICPopup","mstrmojo.DefaultDIC","mstrmojo.android.inputControls.SliderDIC","mstrmojo.android.inputControls.TextFieldDIC","mstrmojo.android.inputControls.CheckBoxDIC","mstrmojo.android.inputControls.PullDownDIC","mstrmojo.android.inputControls.RadioListDIC","mstrmojo.android.inputControls.LikertScaleDIC","mstrmojo.android.inputControls.CalendarDIC","mstrmojo.android.inputControls.DateTimePickerDIC","mstrmojo.android.inputControls.TextAreaDIC","mstrmojo.android.inputControls.MarkRowDIC","mstrmojo.android.inputControls.ToggleDIC","mstrmojo.android.inputControls.SignatureDIC","mstrmojo.android.inputControls.StepperDIC","mstrmojo.android.inputControls.RatingDIC","mstrmojo.android.inputControls.BarcodeDIC","mstrmojo.android.ui.Button");mstrmojo.requiresDescs(221,1442);var $BTN=mstrmojo.android.ui.Button.newButton,TEXTFIELD=1,SWITCH=2,LIST=3,SLIDER=4,CALENDAR=5,TIMEPICKER=6,TOGGLE=7,TEXTAREA=8,SIGNATURE=9,RATING=10,STEPPER=12,BARCODE=13,LIKERTSCALE=14,MARKROW=102;var $ADC=mstrmojo.android.AndroidDICConfig=mstrmojo.provide("mstrmojo.android.AndroidDICConfig",{DICList:{1:mstrmojo.android.inputControls.TextFieldDIC,2:mstrmojo.android.inputControls.CheckBoxDIC,3:{0:mstrmojo.android.inputControls.PullDownDIC,1:mstrmojo.android.inputControls.RadioListDIC},4:mstrmojo.android.inputControls.SliderDIC,5:mstrmojo.android.inputControls.DateTimePickerDIC,6:mstrmojo.android.inputControls.DateTimePickerDIC,7:mstrmojo.android.inputControls.ToggleDIC,8:mstrmojo.android.inputControls.TextAreaDIC,9:mstrmojo.android.inputControls.SignatureDIC,10:mstrmojo.android.inputControls.RatingDIC,11:mstrmojo.DefaultDIC,12:mstrmojo.android.inputControls.StepperDIC,13:mstrmojo.android.inputControls.BarcodeDIC,14:mstrmojo.android.inputControls.LikertScaleDIC,102:mstrmojo.android.inputControls.MarkRowDIC},DICPopup:{getInstance:function(opener,dic){return mstrApp.showPopup({scriptClass:"mstrmojo.android.AndroidDICPopup",widget:dic,buttons:[$BTN(mstrmojo.desc(221,"Cancel"),function(){this.parent.parent.onCancel();}),$BTN(mstrmojo.desc(1442,"OK"),function(){return this.parent.parent.onApply();})],title:dic.popupTitle||opener.parent.title});}},getDICClass:function getDICClass(dic){if(dic.t===LIST){return this.DICList[dic.t][dic.st||0];}return this.DICList[dic.t];},showDICByDefault:function showDICByDefault(dic,openerType){if(dic.sbd===undefined){switch(dic.t){case LIST:dic.sbd=(!!dic.st)?true:false;break;case CALENDAR:case TIMEPICKER:case TEXTFIELD:case BARCODE:dic.sbd=false;break;case TOGGLE:case SWITCH:case MARKROW:case RATING:case STEPPER:case LIKERTSCALE:dic.sbd=true;break;default:dic.sbd=(dic.dm===1);}}return dic.sbd;},hasDICPreview:function hasDICPreview(dic,openerType){return true;},isKeyNavigable:function isKeyNavigable(dic){if(dic.ikn===undefined){dic.ikn=false;}return dic.ikn;}});$ADC.TYPES={TEXTFIELD:TEXTFIELD,SWITCH:SWITCH,LIST:LIST,SLIDER:SLIDER,CALENDAR:CALENDAR,TIMEPICKER:TIMEPICKER,TOGGLE:TOGGLE,TEXTAREA:TEXTAREA,SIGNATURE:SIGNATURE,RATING:RATING,STEPPER:STEPPER,LIKERTSCALE:LIKERTSCALE};mstrmojo.DICConfig=$ADC;mstrmojo.DICList=$ADC.DICList;mstrmojo.DICPopup=$ADC.DICPopup;}());