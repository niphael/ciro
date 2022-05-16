mstrGraphToolbarImplScript=true;mstrGraphToolbarImpl.prototype=new mstrToolbarImpl();mstrGraphToolbarImpl.prototype.onload=function(e){try{this.initToolbar();this.setTimeout("this.getAppliesTo() && this.getAppliesTo().commands","this.onselectionchange()",500);var seriesBox=this.getControlFromCmdId("series");if(seriesBox){seriesBox.onkeydown=new Function("e","return microstrategy.bone('"+this.id+"').checkForSubmit(e);");}var categoriesBox=this.getControlFromCmdId("categories");if(categoriesBox){categoriesBox.onkeydown=new Function("e","return microstrategy.bone('"+this.id+"').checkForSubmit(e);");}var at=this.getAppliesTo();var gridBone=null;if(microstrategy.pageName=="rwd"){gridBone=at.commands.queryState("selectedGrid");}else{gridBone=at;}if(gridBone){var graphBone=microstrategy.bone(gridBone.id+"_gb");if(graphBone){var autoArrangeCtr=document.getElementById("tbAutoArrange");if(autoArrangeCtr){this.disableTool(graphBone.autoArrange,autoArrangeCtr);}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrGraphToolbarImpl.prototype.checkForSubmit=function(e){try{if(!e){e=window.event;}if(e.keyCode==13){if(this.exec){this.exec("categories,series");}}}catch(err){microstrategy.errors.log(err);return false;}};mstrGraphToolbarImpl.prototype.onselectionchange=function(){try{var at=this.getAppliesTo();if(!at){return false;}if((microstrategy.EXECUTION_SCOPE!=microstrategy.REPORT_EXECUTION&&((at.commands==null)||!at.commands.queryEnabled()))){this.disableTools(true);}else{var isGrid=at.commands.queryEnabled("onegrid");if(isGrid){var grid=at.commands.queryState("selectedGrid");var gridBone=null;if(grid){gridBone=microstrategy.findBone(grid);}if(gridBone&&gridBone.isGraph){this.disableTools(false);for(var ctrl in this.controls){var btn=this.controls[ctrl];var cmdId=btn.getAttribute(microstrategy.HTMLATTR_CMD_ID);if(cmdId){if(at.commands.queryEnabled(cmdId)){var value=at.commands.queryState(cmdId);this.fixControlValue(btn,cmdId,value);}else{this.disableTool(true,btn);}}}}else{this.disableTools(true);}}else{this.disableTools(true);}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrGraphToolbarImpl.prototype.exec=function(cmdId,cmdVal){try{if(cmdId==null){return ;}var at=this.getAppliesTo();if((at.commands)&&at.commands.queryEnabled(cmdId)){var grid=at.commands.queryState("selectedGrid");var gridBone=null;if(grid){gridBone=microstrategy.findBone(grid);}var auxIds=cmdId.split(",");for(var i=0;i<auxIds.length;i++){var newCmdId=auxIds[i];switch(newCmdId){case"categories":case"series":if(this.validateInputs()){var control=this.getControlFromCmdId(newCmdId);var newCmdVal=control.value;if(gridBone){gridBone.exec(newCmdId,newCmdVal,(i+1<auxIds.length));}}break;case"legend":case"dValues":var control=this.getControlFromCmdId(newCmdId);var isSelected=(control.className=="selected");cmdVal=(isSelected)?"true":"false";this.getAppliesTo().commands.exec(cmdId,cmdVal);break;case"autoArrange":var control=this.getControlFromCmdId(newCmdId);if(gridBone){var graphBone=microstrategy.bone(gridBone.id+"_gb");if(graphBone){graphBone.submitAutoArrange(gridBone.id);}}break;default:this.getAppliesTo().commands.exec(cmdId,cmdVal);break;}}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrGraphToolbarImpl.prototype.selectPickerElement=function(picker){try{var cmdId=picker.commandId;var at=this.getAppliesTo();var tempCmdId=(cmdId=="minor")?"major":"allowedGraphTypes";var value=at.commands.queryState(tempCmdId);var selected=this.getAppliesTo().commands.queryState(cmdId);var filterValue=value?value:null;mstrPickerImpl.setPickerValues(selected,picker,filterValue);return true;}catch(err){microstrategy.errors.log(err);}};mstrGraphToolbarImpl.prototype.execPicker=function(picker,obj){try{var bClose=mstrToolbarImpl.prototype.execPicker.call(this,picker,obj);if(bClose){this.onselectionchange();}return bClose;}catch(err){microstrategy.errors.log(err);return false;}};mstrGraphToolbarImpl.prototype.fixControlValue=function(control,cmdId,value){try{switch(cmdId){case"legend":case"dValues":control.className=(value==1)||(value==true)?"selected":"";break;case"seriesLayout":control.className=(value==control.getAttribute(microstrategy.HTMLATTR_CMD_VALUE))?control.className.replace("selected","")+" selected":control.className;break;case"categories":case"series":control.value=value;break;case"minor":var majorValue=this.getAppliesTo().commands.queryState("major");if(majorValue==null||majorValue=="0"){control.className="mstrPulldowndisabled";break;}control.className="mstrPulldown";case"major":var tempCmdId=(cmdId=="minor")?"major":"allowedGraphTypes";var filterValue=this.getAppliesTo().commands.queryState(tempCmdId);filterValue=filterValue?filterValue:null;var selected=this.getAppliesTo().commands.queryState(cmdId);if(selected!=null){selected="pkr"+selected;}var picker=document.getElementById(control.getAttribute(microstrategy.HTMLATTR_CMD_PICKER));var childNodes=picker.getElementsByTagName("span");for(var i=0;i<childNodes.length;i++){var child=childNodes[i];var visible=true;if(filterValue){var filter=child.getAttribute(microstrategy.HTMLATTR_FILTER_VALUE);var filterType=child.getAttribute(microstrategy.HTMLATTR_FILTER_TYPE);var filterComparison=child.getAttribute(microstrategy.HTMLATTR_FILTER_COMPARISON);visible=microstrategy.isValueInFilter(filterValue,filter,filterComparison);}if(visible&&child.getAttribute("id")==selected){this.updatePulldownDisplayValue(control,child.displayName||child.innerHTML);break;}}break;case"autoArrange":this.disableTool(value,control);}}catch(err){microstrategy.errors.log(err);return false;}};mstrGraphToolbarImpl.prototype.disableTools=function(disabled){try{for(var ctrl in this.controls){var btn=this.controls[ctrl];this.disableTool(disabled,btn);}}catch(err){microstrategy.errors.log(err);return false;}};mstrGraphToolbarImpl.prototype.disableTool=function(disabled,btn){try{if(btn!=null){var cmdId=btn.getAttribute(microstrategy.HTMLATTR_CMD_ID);switch(String(cmdId)){case"major":case"minor":btn.className=(disabled)?mstrToolbarImpl.PULLDOWN_DISABLED:mstrToolbarImpl.PULLDOWN_ENABLED;this.updatePulldownDisplayValue(btn,btn.origName);break;case"categories":case"series":btn.className=(!disabled)?"mstrInputText":"mstrInputTextdisabled";btn.disabled=disabled;btn.parentNode.className=(!disabled)?"mstrToolbarGroup":"mstrToolbarGroup mstrToolbarGroupDisabled";break;default:btn.className=(disabled)?mstrToolbarImpl.DISABLED:mstrToolbarImpl.ICON;}}}catch(err){microstrategy.errors.log(err);return false;}};function mstrGraphToolbarImpl(id){this.inherits=mstrToolbarImpl;this.inherits(id);delete this.inherits;return this;}