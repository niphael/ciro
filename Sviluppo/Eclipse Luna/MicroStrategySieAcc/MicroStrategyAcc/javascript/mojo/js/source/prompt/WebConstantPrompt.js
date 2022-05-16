(function(){mstrmojo.requiresCls("mstrmojo.prompt.WebPrompt","mstrmojo.locales","mstrmojo.num","mstrmojo.date","mstrmojo.mstr.EnumDataType");mstrmojo.requiresDescs(8398,8399,8400,8401,8402,8403,8404,8405,8406);var promptStyles=mstrmojo.prompt.WebPrompt.STYLES,_DT=function(){return mstrmojo.locales.datetime;},$DT=mstrmojo.mstr.EnumDataType,$NUM=mstrmojo.num,$DATE=mstrmojo.date,$M=Math;function inRange(v){var min=parseFloat(this.min,10),max=parseFloat(this.max,10),hasMin=!isNaN(min),hasMax=!isNaN(max);if(hasMin&&v<min){return -1;}else{if(hasMax&&v>max){return 1;}else{return 0;}}}var validateFns={};validateFns[$DT.DataTypeBool]=function(ans){if("0"!==ans||"1"!==ans){throw new Error(mstrmojo.desc(8398,"Invalid answer: #. Boolean values required.").replace("#",ans));}};validateFns[$DT.DataTypeBigDecimal]=validateFns[$DT.DataTypeLong]=validateFns[$DT.DataTypeDouble]=validateFns[$DT.DataTypeDecimal]=validateFns[$DT.DataTypeReal]=validateFns[$DT.DataTypeInteger]=validateFns[$DT.DataTypeFloat]=validateFns[$DT.DataTypeNumeric]=function(ans){if(!isNaN(ans)){var num=parseFloat(ans,10);switch(inRange.call(this,num)){case -1:throw new Error(mstrmojo.desc(8399,"Invalid answer: #. Answer is smaller than the minimum limit: ##.").replace("##",this.min).replace("#",$NUM.toLocaleString(ans)));case 1:throw new Error(mstrmojo.desc(8400,"Invalid answer: #. Answer is bigger than the maximum limit: ##.").replace("##",this.max).replace("#",$NUM.toLocaleString(ans)));}}else{if(ans){throw new Error(mstrmojo.desc(8401,"Not a number"));}}};validateFns[$DT.DataTypeChar]=function(ans){if(ans){switch(inRange.call(this,(ans&&ans.length)||0)){case -1:throw new Error(mstrmojo.desc(8402,"Invalid answer: #. The length of the answer is smaller than the minimum limit: ##.").replace("##",this.min).replace("#",ans));case 1:throw new Error(mstrmojo.desc(8403,"Invalid answer: #. The length of the answer is bigger than the maximum limit: ##.").replace("##",this.max).replace("#",ans));}}};validateFns[$DT.DataTypeDate]=function(ans){switch(mstrmojo.date.inDateTimeRange(ans,this.min,this.max)){case -1:throw new Error(mstrmojo.desc(8404,"Invalid answer: #. The date/time is earlier than the earliest limit: ##.").replace("##",this.min).replace("#",ans));case 1:throw new Error(mstrmojo.desc(8405,"Invalid answer: #. The date/time is later than the latest limit: ##.").replace("##",this.max).replace("#",ans));}};function getNumberOfDecimals(myNumber){myNumber=String(myNumber);var pointIndex=myNumber.indexOf(".");return(pointIndex==-1)?0:myNumber.length-pointIndex-1;}function canStep(isUp){var interval=this.prs.Interval||1;if(!isUp){interval=-interval;}var displayValue=parseFloat(this.getDisplayValue(true,true),10),intervalValue=parseFloat(interval,10),multFactor=$M.pow(10,$M.max(getNumberOfDecimals(displayValue),getNumberOfDecimals(intervalValue)));var v=parseInt(($M.round(displayValue*multFactor)+$M.round(intervalValue*multFactor)),10)/multFactor,status={v:v,s:true};try{this.validate(v);}catch(ex){status.s=false;}return status;}function step(isUp){var status=canStep.call(this,isUp);if(status.s){this.answer=String(status.v);}}mstrmojo.prompt.WebConstantPrompt=mstrmojo.declare(mstrmojo.prompt.WebPrompt,null,{scriptClass:"mstrmojo.prompt.WebConstantPrompt",answer:"",preAnswer:"",defAnswer:"",dataType:8,isNumericDataType:function isNumericDataType(){switch(this.dataType){case $DT.DataTypeInteger:case $DT.DataTypeUnsigned:case $DT.DataTypeNumeric:case $DT.DataTypeDecimal:case $DT.DataTypeReal:case $DT.DataTypeDouble:case $DT.DataTypeFloat:case $DT.DataTypeShort:case $DT.DataTypeLong:case $DT.DataTypeBigDecimal:return true;default:return false;}},getStyle:function getStyle(){var style=this._style;if(!this._style){var promptProperties=this.prs;switch(promptProperties.DisplayStyle){case"Stepper":style=promptStyles.STEPPER;break;case"Switch":style=promptStyles.SWITCH;break;case"Slider":style=promptStyles.SLIDER;break;case"Text box":if(this.dataType===14){style=promptStyles[(promptProperties.ShowTime==="-1")?"TIME":"CALENDAR"];break;}style=promptStyles.TEXT;break;case"Barcode":style=promptStyles.BARCODE;break;}if(!style){throw new Error(mstrmojo.desc(8406,"WebConstantPrompt::getStyle - Unknown prompt style."));}this._style=style;}return style;},getDisplayValue:function getDisplayValue(calculateDefault,replaceAnswerWithDefault){var displayValue=this.answer||this.defAnswer,isEmpty=(displayValue===undefined||displayValue===null),style=this.getStyle();switch(style){case promptStyles.STEPPER:if(calculateDefault&&(isEmpty||(this.dataType===6&&isNaN(parseFloat(displayValue,10))))){var min=parseFloat(this.min,10),max=parseFloat(this.max,10);if(isNaN(min)||isNaN(max)){displayValue=0;}else{if(0>min&&max>0){displayValue=0;}else{displayValue=(Math.abs(min-0)>Math.abs(max-0))?max:min;}}if(replaceAnswerWithDefault){this.setAnswerValue(String(displayValue));}}break;case promptStyles.SWITCH:var prs=this.prs,onValue=prs.OnValue,offValue=prs.OffValue;if(calculateDefault&&(displayValue!==onValue&&displayValue!==offValue)){displayValue=offValue;if(replaceAnswerWithDefault){this.answer=offValue;}}displayValue=(displayValue===onValue);break;case promptStyles.SLIDER:if(calculateDefault&&(isEmpty||displayValue==="")){displayValue=this.min;if(replaceAnswerWithDefault){this.setAnswerValue(String(displayValue));}}break;}return(style==promptStyles.SWITCH)?displayValue:this.isNumericDataType()?mstrmojo.num.toLocaleString(String(displayValue)):displayValue;},validate:function validate(v){v=(v===undefined||v===null)?this.answer:v;this._super(v);this._validateFn(v);},isAnswerEmpty:function isAnswerEmpty(v){v=(v===undefined||v===null)?this.answer:v;return(v===undefined||v===null||v==="");},populate:function populate(props){this.answer=props&&props.ans&&props.ans.text;this.dataType=props&&props.datatp;this._validateFn=validateFns[this.dataType];this._super(props);var prs=this.prs;if(prs.DisplayStyle==="Wheel"){prs.DisplayStyle="Stepper";}switch(prs.DisplayStyle){case"Switch":if(prs.OnValue===undefined||prs.OnValue===null){prs.OnValue="1";}if(prs.OffValue===undefined||prs.OffValue===null){prs.OffValue="0";}break;case"Slider":case"Stepper":this.interval=parseFloat(this.prs.Interval)||1;this.min=$NUM.parseNumeric(this.min);this.max=$NUM.parseNumeric(this.max);if(!this.min){this.min=0;}if(this.answer===undefined||this.answer===null||this.answer<this.min){this.answer=this.min;}if(this.answer>this.max){this.answer=this.max;}break;case"Text box":if(this.dataType===14&&prs.ShowTime==="-1"){this.interval=parseFloat(this.prs.Interval)||1;var answer=$DATE.parseDateAndOrTime((this.answer||""));var min=$DATE.parseDateAndOrTime((this.min||""));var max=$DATE.parseDateAndOrTime((this.max||""));defaultTimeInfo={match:"12:00:00 AM",hour:0,min:0,sec:0};var defaultTime=$DATE.formatTimeInfo(defaultTimeInfo,_DT().TIMEOUTPUTFORMAT);if(answer&&!answer.time){this.answer=this.answer+" "+defaultTime;}if(min&&!min.time){this.min=this.min+" "+defaultTime;}if(max&&!max.time){this.max=this.max+" "+defaultTime;}}break;}},populateAnswer:function populateAnswer(answer){if(answer&&answer.text){this.answer=answer.text;}},buildAnswerObject:function buildAnswerObject(){var ob=this._super();ob.ans={text:this.answer};return ob;},setAnswerValue:function setAnswerValue(v){if(this.isNumericDataType()){v=mstrmojo.num.toString(v,false);}this.validate(v);this.answer=v;},getAnswerXML:function getAnswerXML(){return this.answer;},buildShortAnswerXML:function buildShortAnswerXML(builder){builder.addText(this.isNumericDataType()?mstrmojo.num.toLocaleString(this.answer||""):(this.answer||""));},stepUp:function stepUp(){if(this.getStyle()===promptStyles.STEPPER){step.call(this,true);}},canStepUp:function canStepUp(){return(this.getStyle()===promptStyles.STEPPER&&canStep.call(this,true).s);},stepDown:function stepDown(){if(this.getStyle()===promptStyles.STEPPER){step.call(this,false);}},canStepDown:function canStepDown(){return(this.getStyle()===promptStyles.STEPPER&&canStep.call(this,false).s);},toggleSwitch:function toggleSwitch(){if(this.getStyle()===promptStyles.SWITCH){var promptProperties=this.prs,answer=(this.getDisplayValue(true,false))?promptProperties.OffValue:promptProperties.OnValue;this.set("answer",answer);}}});}());