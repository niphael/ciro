mstrEditorImplScript=true;mstrEditorImpl.INPUT_TYPE_PRINTER="101";mstrEditorImpl.INPUT_TYPE_FILENAME="102";mstrEditorImpl.INPUT_TYPE_EMAILADDR="103";mstrEditorImpl.INPUT_TYPE_FOLDERPATH="104";mstrEditorImpl.INPUT_TYPE_FILENAME_SPACE_DELIMITER="105";mstrEditorImpl.INPUT_TYPE_DATE="201";mstrEditorImpl.prototype=new mstrDialogImpl();mstrEditorImpl.prototype.doSlide=false;mstrEditorImpl.prototype.maskFor=null;mstrEditorImpl.prototype.maskArea=null;mstrEditorImpl.prototype.navigateOnSubmit=null;mstrEditorImpl.prototype.okBtnId=null;mstrEditorImpl.prototype.type=microstrategy.OBJTYPE_EDITOR;mstrEditorImpl.prototype.CHECKBOX_UNSELECTED="checkOff";mstrEditorImpl.prototype.CHECKBOX_SELECTED="checkOn";mstrEditorImpl.prototype.CHECKBOX_DISABLED="checkDisabled";mstrEditorImpl.prototype.CHECKBOX_PARTIALLY_SELECTED="checkUndefined";var currentModalEditor=[];mstrEditorImpl.prototype.onload=function(){try{this.initEditor();}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.onpostload=function(){try{mstrBoneImpl.prototype.onpostload.call(this);this.initResize();if(microstrategy.eventManager){microstrategy.eventManager.notifyOrphanBones("onstatechange");}}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.onsubmit=function(e){if(!e){e=window.event;}if(this.validateInputs()){if(this.navigateOnSubmit){var oForm=this.elem.getElementsByTagName("form")[0];if(oForm){oForm.target="";}}}else{return false;}};mstrEditorImpl.prototype.onunload=function(){try{if(this.elem){this.hide();}mstrDialogImpl.prototype.onunload.call(this);this.hideCurtain();}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.onnotifydragend=function(){try{if(this.mask&&this.mask.toggle){this.mask.toggle(false);}}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.initEditor=function(){try{this.initDialog();if(this.elem.getAttribute(mstrHTMLAttributes.ATTR_DIALOG)=="true"){if(this.elem.getAttribute(mstrHTMLAttributes.ATTR_HIDDEN)!="true"){this.show();}else{this.hideCurtain();}}this.initErrorMessage();}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.disableIFrame=function(button){try{if(!button){return false;}var oForm=findTargetTag(button,"FORM");if(oForm){if(oForm.target=="frameManager"){var oInputs=oForm.getElementsByTagName("INPUT");for(var j=0;j<oInputs.length;j++){if(oInputs[j].name=="iframe"){oInputs[j].value="false";break;}}oForm.target="";}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.show=function(){if(this.elem){var modalMode=this.elem.getAttribute(mstrHTMLAttributes.ATTR_MODAL)=="true";var zIndex=this.computeZIndex();if(modalMode){this.showCurtain(zIndex);}this.elem.style.display="block";var x=parseInt(this.elem.style.left);var y=parseInt(this.elem.style.top);if((isNaN(parseInt(x)))||(x<=0)||(isNaN(parseInt(y)))||(y<=0)){this.elem.style.display="block";}if((isNaN(parseInt(x)))||(x<=0)){x=((getClientWidth()-getObjWidth(this.elem))/2+getDocumentScrollLeft());}if((isNaN(parseInt(y)))||(y<=0)){y=(((getClientHeight()-getObjHeight(this.elem))/2)+getDocumentScrollTop());}x=Math.max(x,0);y=Math.max(y,0);this.elem.style.zIndex=zIndex+1;this.moveTo(x,y);var currentPosition=this.getLayer(this.id);if(currentPosition+1<currentModalEditor.length){for(var i=currentPosition+1;i<currentModalEditor.length;i++){if(getObj(currentModalEditor[i])!=null){togglePulldowns(getObj(currentModalEditor[i]),false);enablePulldowns(getObj(currentModalEditor[i]),true);}}}else{enablePulldowns(this.elem,true);}if(!this.doSlide){displayObj(this.elem);}}return ;};mstrEditorImpl.prototype.slideOut=function(){try{if(!this.doSlide){return ;}this.doSlide=false;var o=this.elem;this.oHeight=getObjHeight(o);this.oWidth=getObjWidth(o);this.clipTop=this.oHeight-1;this.clipLeft=this.oWidth-1;this.oTop=getObjTop(o);this.oLeft=getObjLeft(o);this.top=this.oTop-this.oHeight;this.left=this.oLeft-this.oWidth;o.style.clip="rect("+this.clipTop+"px, "+this.oWidth+"px, "+this.oHeight+"px, "+this.clipLeft+"px)";o.style.top=this.top+"px";o.style.left=this.left+"px";displayObj(o);this.timer=window.setInterval("microstrategy.bone('"+this.id+"').slide();",1);}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.slide=function(){try{var inc=40;var o=this.elem;if(this.clipTop<1&&this.clipLeft<1){window.clearInterval(this.timer);o.style.clip="rect(auto, auto, auto, auto)";o.style.top=this.oTop+"px";o.style.left=this.oLeft+"px";return ;}var h=Math.max(this.clipTop-=inc,0);var w=Math.max(this.clipLeft-=inc,0);if(this.top<this.oTop){this.top=Math.min(this.oTop,this.top+=inc);o.style.top=this.top+"px";}if(this.left<this.oLeft){this.left=Math.min(this.oLeft,this.left+=inc);o.style.left=this.left+"px";}o.style.clip="rect("+this.clipTop+"px, "+this.oWidth+"px, "+this.oHeight+"px, "+this.clipLeft+"px)";}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.showCurtain=function(zindex,node){var name=this.id+"_bg"+(node?"2":"");var elCurtain=document.getElementById(name);var pn,ftn=document.getElementById("mstrWeb_footer"),fth=ftn?ftn.offsetHeight:0,offset={x:node?0:18,y:node?0:(18+fth)};if(!elCurtain){elCurtain=document.createElement("div");elCurtain.id=name;elCurtain.className="mstrCurtain";pn=(node||document.body);pn.appendChild(elCurtain);}if(elCurtain){pn=(node||document.documentElement);elCurtain.style.zIndex=zindex;elCurtain.style.visibility="visible";enablePulldowns(document.body,false);}if(ISIE7&&node){var contentsNode=document.getElementById("mstrWebContents");var lastZ=contentsNode.style.zIndex;if(zindex>=lastZ){this.lastZindex=lastZ;contentsNode.style.zIndex=zindex;}else{this.lastZindex="";}}};mstrEditorImpl.prototype.hideCurtain=function(removeBoth){var curtains=[document.getElementById(this.id+"_bg")],curtain2=document.getElementById(this.id+"_bg2"),i=0;if(curtain2){curtains.push(curtain2);}for(i=0;i<curtains.length;i++){var elCurtain=curtains[i];if(elCurtain&&elCurtain.style.visibility=="visible"){elCurtain.style.visibility="hidden";elCurtain.style.height="1px";elCurtain.style.width="1px";enablePulldowns(document.body,true);}}};mstrEditorImpl.prototype.hide=function(){try{this.elem.style.display="none";this.elem.setAttribute("hidden","1");this.hideCurtain();this.removeLayer();togglePulldowns(this.elem,true);if(ISIE7&&typeof (this.lastZindex)!="undefined"){var contentsNode=document.getElementById("mstrWebContents");if(contentsNode){contentsNode.style.zIndex=this.lastZindex;}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.close=function(){try{this.hide();if(this.id){var updateManager=microstrategy.updateManager;if(updateManager){var actionCollection=[];actionCollection.push(updateManager.createActionObject(this,mstrUpdateManager.SHOW_BEAN,microstrategy.servletName+"."+microstrategy.pageName,["5017","5018"],["false",this.getBeanName()],[]));microstrategy.updateManager.add(actionCollection,true);}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.closeEditor=function(submit,applyCookie){try{this.close();var bn=this.beanName;if(bn&&applyCookie){microstrategy.updateCookieSetting(bn,"0");}this.unregister();if(microstrategy.eventManager){microstrategy.eventManager.notifyOrphanBones("onstatechange");if(!this.isDraggable){microstrategy.eventManager.ondialogresize();}}if(microstrategy.updateManager){if(submit==true){microstrategy.updateManager.flushAndSubmitChanges();}else{if(submit!=false&&microstrategy.mstrwid!=""){microstrategy.updateManager.flushAndSubmitChanges();}else{microstrategy.eventManager.notifyOrphanBones("oneditorclose",this.id);}}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.unregister=function(){try{if(this.elem){this.elem.innerHTML="";}microstrategy.unRegisterBone(this.id);}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.getBeanName=function(){try{var sEditorName="";if(this.beanName){sEditorName=this.beanName;}else{sEditorName=this.id;if(sEditorName.indexOf("_")>0){sEditorName=sEditorName.substr(0,sEditorName.indexOf("_"));}}return sEditorName;}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.getLayer=function(){var __result=-1;if(this.isLoaded){for(var i=currentModalEditor.length-1;i>-1;i--){if(currentModalEditor[i]==this.elem.getAttribute("name")){__result=i;break;}}}return __result;};mstrEditorImpl.prototype.removeLayer=function(){try{for(var i=0;i<currentModalEditor.length;i++){if(currentModalEditor[i]==this.elem.getAttribute("name")){currentModalEditor.length=i;break;}}}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.addLayer=function(){try{var __result=currentModalEditor.length;currentModalEditor[__result]=this.elem.getAttribute("name");return __result;}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.validateField=function(field,message,enforceValidation){if(typeof (enforceValidation)=="undefined"){enforceValidation=true;}return mstrEditorImpl.validateField(field,message,enforceValidation);};mstrEditorImpl.validateField=function(field,message,enforceValidation){try{if(typeof (enforceValidation)=="undefined"){enforceValidation=true;}if(field==null||!(field.type=="text"||field.type=="password")){return message;}if(!field.getAttribute(mstrHTMLAttributes.ATTR_FLD)&&!field.getAttribute(mstrHTMLAttributes.ATTR_FLDID)){return message;}if(field.disabled){return message;}var decimalSep=mstr.Settings.Locale.DECIMALSEP;var intRegExp=/(^-?\d\d*$)/;var numRegExp=new RegExp("(^-?\\d\\d*\\"+decimalSep+"\\d*$)|(^-?\\d\\d*\\"+decimalSep+"?\\d*[eE](\\+|-)?\\d+$)|(^-?\\d\\d*$)|(^-?\\"+decimalSep+"\\d\\d*$)");var interimMessage="";var value=field.value;var fieldId=field.getAttribute(mstrHTMLAttributes.ATTR_FLDID);var fieldName=null;if(typeof (fieldId)!="undefined"&&fieldId!=null){fieldName=microstrategy.descriptors.getDescriptor(fieldId);}if(fieldName==null){fieldName=field.getAttribute(mstrHTMLAttributes.ATTR_FLD);}var zeroValid=field.getAttribute(mstrHTMLAttributes.ATTR_ZERO);var bCheck=true;var base=10;if(field.getAttribute(microstrategy.HTMLATTR_CMD_VALUE)!=null||enforceValidation){if(field.getAttribute(mstrHTMLAttributes.ATTR_DPN)){var oDepRadio=getObj(field.getAttribute(mstrHTMLAttributes.ATTR_DPN));if(oDepRadio){bCheck=(oDepRadio.length)?oDepRadio[field.getAttribute(mstrHTMLAttributes.ATTR_DPNND)].checked:oDepRadio.checked;}}if(bCheck){if(field.getAttribute(mstrHTMLAttributes.ATTR_DTY)=="1"){if((!zeroValid&&value.length==0)||(value.length>0&&intRegExp.test(value)==false)||(value.length>0&&(parseInt(value,base)!=parseFloat(value)))){message+=microstrategy.descriptors.getDescriptor("3037")+" "+fieldName+"<br />";}}else{if(field.getAttribute(mstrHTMLAttributes.ATTR_DTY)=="2"){if((!zeroValid&&value.length==0)||(value.length>0&&!numRegExp.test(value))){message+=microstrategy.descriptors.getDescriptor("3038")+" "+fieldName+"<br />";}}else{if(field.getAttribute(mstrHTMLAttributes.ATTR_DTY)=="201"){if(value.length>0&&!mstrEditorImpl.getTime(field)){message+=microstrategy.descriptors.getDescriptor("7745")+" "+fieldName+"<br />";}}else{if(field.getAttribute(mstrHTMLAttributes.ATTR_DTY)&&field.parentNode.style.visibility!="hidden"&&field.parentNode.style.display!="none"){switch(field.getAttribute(mstrHTMLAttributes.ATTR_DTY)){case mstrEditorImpl.INPUT_TYPE_PRINTER:var regExp1=new RegExp('^[^$%:*?"<>|/\\\\]*$');var regExp2=new RegExp('^((/|\\\\\\\\)[^$%:*?"<>|/\\\\]+)((/|\\\\)[^$%:*?"<>|/\\\\]+)*(/|\\\\){0,1}$');if(value.length<0||(!regExp1.test(value)&&!regExp2.test(value))){message+=microstrategy.descriptors.getDescriptor("5583").replace(/###/,"'"+fieldName+"'")+"<br />";}break;case mstrEditorImpl.INPUT_TYPE_FOLDERPATH:var regExpWin=new RegExp('^([a-zA-Z]:|\\\\\\\\[^:*?"<>|/\\\\]+|[^:*?"<>|/\\\\]*)(\\\\[^:*?"<>|/\\\\]+)*(\\\\){0,1}$');var regExpUnix=new RegExp('^(/){0,1}([^:*?"<>|/\\\\]+/)*([^:*?"<>|/\\\\]+){0,1}$');if(value.length<0||(!regExpWin.test(value)&&!regExpUnix.test(value))){message+=microstrategy.descriptors.getDescriptor("5583").replace(/###/,"'"+fieldName+"'")+"<br />";}break;case mstrEditorImpl.INPUT_TYPE_FILENAME:var regExp=new RegExp('^[^:*?"<>|/\\\\]+$');if(value.length<=0||!regExp.test(value)){var cleanFieldName=fieldName.replace(":","");message+=microstrategy.descriptors.getDescriptor("9272").replace(/##/,cleanFieldName).replace(/###/,'<b>:*?"<>|/\\</b> ')+"<br />";}break;case mstrEditorImpl.INPUT_TYPE_FILENAME_SPACE_DELIMITER:var regExp=new RegExp('^[^:*?"<>|/\\\\]?$');if(!regExp.test(value)){var cleanFieldName=fieldName.replace(":","");message+=microstrategy.descriptors.getDescriptor("9272").replace(/##/,cleanFieldName).replace(/###/,'<b>:*?"<>|/\\</b> ')+"<br />";}break;case mstrEditorImpl.INPUT_TYPE_EMAILADDR:var regExp=new RegExp("^([&a-zA-Z0-9_.-])+@(([&a-zA-Z0-9-])+[.])+([a-zA-Z0-9])+$");if(value.length<=0||!regExp.test(value)){message+=microstrategy.descriptors.getDescriptor("5583").replace(/###/,"'"+fieldName+"'")+"<br />";}break;}}}}}if(field.getAttribute(mstrHTMLAttributes.ATTR_REGEX)){var regexValidation=new RegExp(field.getAttribute(mstrHTMLAttributes.ATTR_REGEX));if(regexValidation.test(value)){message+=field.getAttribute(mstrHTMLAttributes.ATTR_REGEX_MSG);}}var minValue=null,maxValue=null,minmaxError=false;if(field.getAttribute(mstrHTMLAttributes.ATTR_MIN)!=null&&field.getAttribute(mstrHTMLAttributes.ATTR_MIN).length>0){minValue=parseFloat(eval(field.getAttribute(mstrHTMLAttributes.ATTR_MIN)));if(parseFloat(mstr.utils.LocaleParser.convertToBrowserNumber(value))<minValue){if((field.getAttribute(mstrHTMLAttributes.ATTR_ERR)!=null)&&(field.getAttribute(mstrHTMLAttributes.ATTR_ERR).length>0)){message+=field.getAttribute(mstrHTMLAttributes.ATTR_ERR)+"<br />";}else{minmaxError=true;}}}if(field.getAttribute(mstrHTMLAttributes.ATTR_MAX)!=null&&field.getAttribute(mstrHTMLAttributes.ATTR_MAX).length>0){maxValue=parseFloat(eval(field.getAttribute(mstrHTMLAttributes.ATTR_MAX)));if(parseFloat(mstr.utils.LocaleParser.convertToBrowserNumber(value))>maxValue){if((field.getAttribute(mstrHTMLAttributes.ATTR_ERR)!=null)&&(field.getAttribute(mstrHTMLAttributes.ATTR_ERR).length>0)){message+=field.getAttribute(mstrHTMLAttributes.ATTR_ERR)+"<br />";}else{minmaxError=true;}}}if(minmaxError){if(minValue!==null&&maxValue!==null){message+=((microstrategy.descriptors.getDescriptor("6117").replace(/####/,maxValue)).replace(/###/,minValue)).replace(/##/,fieldName)+"<br />";}else{if(minValue!==null){message+=(microstrategy.descriptors.getDescriptor("3039").replace(/###/,minValue)).replace(/##/,fieldName)+"<br />";}else{if(maxValue!==null){message+=(microstrategy.descriptors.getDescriptor("3041").replace(/###/,maxValue)).replace(/##/,fieldName)+"<br />";}}}}var ltInput=null;var acceptEqual;if(value.length>0&&field.getAttribute(mstrHTMLAttributes.ATTR_LT)!=null&&field.getAttribute(mstrHTMLAttributes.ATTR_LT).length>0){ltInput=getElementById(field.getAttribute(mstrHTMLAttributes.ATTR_LT));acceptEqual=false;}else{if(value.length>0&&field.getAttribute(mstrHTMLAttributes.ATTR_LE)!=null&&field.getAttribute(mstrHTMLAttributes.ATTR_LE).length>0){ltInput=getElementById(field.getAttribute(mstrHTMLAttributes.ATTR_LE));acceptEqual=true;}}if(ltInput!=null&&!ltInput.disabled){ltValue=ltInput.value;if(ltValue!=null&&ltValue.length>0){var fieldValue=value;if(field.getAttribute(mstrHTMLAttributes.ATTR_DTY)=="201"){ltValue=mstrEditorImpl.getTime(ltInput)+"";fieldValue=mstrEditorImpl.getTime(field)+"";if(ltValue==0){return message;}}if(parseFloat(mstr.utils.LocaleParser.convertToBrowserNumber(ltValue))<parseFloat(mstr.utils.LocaleParser.convertToBrowserNumber(fieldValue))||(!acceptEqual&&parseFloat(mstr.utils.LocaleParser.convertToBrowserNumber(ltValue))==parseFloat(mstr.utils.LocaleParser.convertToBrowserNumber(fieldValue)))){if((field.getAttribute(mstrHTMLAttributes.ATTR_ERR)!=null)&&(field.getAttribute(mstrHTMLAttributes.ATTR_ERR).length>0)){message+=field.getAttribute(mstrHTMLAttributes.ATTR_ERR)+"<br />";}else{message+=(microstrategy.descriptors.getDescriptor(field.getAttribute(mstrHTMLAttributes.ATTR_DTY)=="201"?"7747":"3041").replace(/###/,ltInput.value)).replace(/##/,fieldName)+"<br />";}}}}var gtInput=null;if(value.length>0&&field.getAttribute(mstrHTMLAttributes.ATTR_GT)!=null&&field.getAttribute(mstrHTMLAttributes.ATTR_GT).length>0){gtInput=getElementById(field.getAttribute(mstrHTMLAttributes.ATTR_GT));acceptEqual=false;}else{if(value.length>0&&field.getAttribute(mstrHTMLAttributes.ATTR_GE)!=null&&field.getAttribute(mstrHTMLAttributes.ATTR_GE).length>0){gtInput=getElementById(field.getAttribute(mstrHTMLAttributes.ATTR_GE));acceptEqual=true;}}if(gtInput!=null&&!gtInput.disabled){gtValue=gtInput.value;if(gtValue&&gtValue.length>0){var fieldValue=value;if(field.getAttribute(mstrHTMLAttributes.ATTR_DTY)=="201"){gtValue=mstrEditorImpl.getTime(gtInput)+"";fieldValue=mstrEditorImpl.getTime(field)+"";if(gtValue==0){return message;}}if(parseFloat(mstr.utils.LocaleParser.convertToBrowserNumber(fieldValue))<parseFloat(mstr.utils.LocaleParser.convertToBrowserNumber(gtValue))||(!acceptEqual&&parseFloat(mstr.utils.LocaleParser.convertToBrowserNumber(gtValue))==parseFloat(mstr.utils.LocaleParser.convertToBrowserNumber(fieldValue)))){if((field.getAttribute(mstrHTMLAttributes.ATTR_ERR)!=null)&&(field.getAttribute(mstrHTMLAttributes.ATTR_ERR).length>0)){message+=field.getAttribute(mstrHTMLAttributes.ATTR_ERR)+"<br />";}else{message+=(microstrategy.descriptors.getDescriptor(field.getAttribute(mstrHTMLAttributes.ATTR_DTY)=="201"?"7746":"3039").replace(/###/,gtInput.value)).replace(/##/,fieldName)+"<br />";}}}}if(field.getAttribute(mstrHTMLAttributes.ATTR_NOZEROSTR)!=null&&trim(value).length==0){message+=microstrategy.descriptors.getDescriptor("3878")+" "+fieldName+"<br />";}}}return message;}catch(err){microstrategy.errors.log(err);return message;}};mstrEditorImpl.getTime=function(field){var format=field.getAttribute(mstrHTMLAttributes.ATTR_DF);var y=getDateFromFormat(field.value,format,DATE_YEAR);var m=getDateFromFormat(field.value,format,DATE_MONTH)-1;var d=getDateFromFormat(field.value,format,DATE_DAY);if(y>0&&m>=0&&d>0){return(new Date(y,m,d)).getTime();}else{return 0;}};mstrEditorImpl.validateInputs=function(obj,enforceValidation){try{var errorMessage="";var deltaMessage="";if(obj){var inputs=obj.getElementsByTagName("INPUT");var pageRange=[];for(var i=0;i<inputs.length;i++){deltaMessage=this.validateField(inputs[i],"",enforceValidation);if(deltaMessage.length==0&&!inputs[i].disabled){if(inputs[i].name=="rangeStart"||inputs[i].name=="rangeEnd"){pageRange.push(inputs[i]);}}else{errorMessage+=deltaMessage;}}if(pageRange.length==2){var v0=parseInt(pageRange[0].value);var v1=parseInt(pageRange[1].value);if((pageRange[0].name=="rangeStart"&&v0>v1)||(pageRange[0].name=="rangeEnd"&&v0<v1)){errorMessage+=(microstrategy.descriptors.getDescriptor("5784").replace(/###/,microstrategy.descriptors.getDescriptor("6141"))).replace(/##/,microstrategy.descriptors.getDescriptor("6140"))+"<br />";}}if(errorMessage!=null&&errorMessage.length>0){showMessage({contents:errorMessage,elements:microstrategy.OK_BUTTON,type:mstrMsgBoxImpl.MSG_ERROR});return false;}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.validateSingleInput=function(oInput){try{var errorMessage=mstrEditorImpl.validateField(oInput,"");if(errorMessage!=null&&errorMessage.length>0){showMessage({contents:errorMessage,elements:microstrategy.OK_BUTTON,type:mstrMsgBoxImpl.MSG_ERROR});return false;}}catch(err){microstrategy.errors.log(err);}return true;};mstrEditorImpl.prototype.validateInputs=function(){try{return mstrEditorImpl.validateInputs.call(this,this.elem,false);}catch(err){microstrategy.errors.log(err);}};mstrEditorImpl.prototype.getCheckboxesState=function(arrayCheckboxes){try{var result=null;if(arrayCheckboxes){for(var i=0;i<arrayCheckboxes.length;i++){var chkbox=arrayCheckboxes[i];if(chkbox.checked){switch(result){case this.CHECKBOX_PARTIALLY_SELECTED:case this.CHECKBOX_UNSELECTED:result=this.CHECKBOX_PARTIALLY_SELECTED;break;case this.CHECKBOX_SELECTED:default:result=this.CHECKBOX_SELECTED;break;}}else{switch(result){case this.CHECKBOX_PARTIALLY_SELECTED:case this.CHECKBOX_SELECTED:result=this.CHECKBOX_PARTIALLY_SELECTED;break;case this.CHECKBOX_UNSELECTED:result=this.CHECKBOX_UNSELECTED;break;default:result=this.CHECKBOX_UNSELECTED;break;}}if(result==this.CHECKBOX_PARTIALLY_SELECTED){break;}}}return result;}catch(err){microstrategy.errors.log(err);return this.CHECKBOX_UNSELECTED;}};mstrEditorImpl.prototype.adjustCheckboxes=function(arrayCheckboxes,bChecked){try{if(arrayCheckboxes){for(var i=0;i<arrayCheckboxes.length;i++){var chkbox=arrayCheckboxes[i];chkbox.checked=bChecked;}}}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.updateChildrenCheckboxes=function(parentCheckbox,arrayCheckboxes){try{if(parentCheckbox&&arrayCheckboxes){this.adjustCheckboxes(arrayCheckboxes,parentCheckbox.checked);}}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.updateParentCheckboxImage=function(parentCheckbox,arrayCheckboxes){try{if(parentCheckbox&&parentCheckbox.className!=this.CHECKBOX_DISABLED&&arrayCheckboxes){parentCheckbox.className=this.getCheckboxesState(arrayCheckboxes);}}catch(err){microstrategy.errors.log(err);return false;}};mstrEditorImpl.prototype.computeZIndex=function(){var pos=this.getLayer();if(pos==-1){this.addLayer();}return microstrategy.getMaxZIndex(pos);};mstrEditorImpl.prototype.customJS=function(jsCode){try{eval(jsCode);}catch(err){microstrategy.errors.log(err);return false;}};function mstrEditorImpl(id){this.inherits=mstrDialogImpl;this.inherits(id);delete this.inherits;return this;}