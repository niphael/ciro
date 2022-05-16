mstrUpdateManager.prototype=new Object;mstrUpdateManager.prototype.id="bonesUpdateManager";mstrUpdateManager.prototype.observer=null;mstrUpdateManager.prototype.actions={};mstrUpdateManager.prototype.redoActions=[];mstrUpdateManager.prototype.undoActions=[];mstrUpdateManager.prototype.staticActions=[];mstrUpdateManager.prototype.useIframe=false;mstrUpdateManager.prototype.newWindow=false;mstrUpdateManager.prototype.newWindowName="_blank";mstrUpdateManager.prototype.extraURL="";mstrUpdateManager.prototype.iframeTarget="frameManager";mstrUpdateManager.prototype.formAction="";mstrUpdateManager.prototype.OPTIMIZE_EVENTS=true;mstrUpdateManager.prototype.ADD_EVENT_IDS=null;mstrUpdateManager.prototype.optActions=[];mstrUpdateManager.prototype.lastPosArray=[];mstrUpdateManager.prototype.copyActions={};mstrUpdateManager.prototype.cachedActionCollection=null;mstrUpdateManager.prototype.queueActions=false;mstrUpdateManager.prototype.forceSubmitAfterQueue=false;mstrUpdateManager.prototype.ctlCurElementsPosition=null;mstrUpdateManager.prototype.currentPanelPosition=null;mstrUpdateManager.prototype.hiddenInputs=null;mstrUpdateManager.prototype.submittedForm=null;mstrUpdateManager.prototype.submittedXhr=false;mstrUpdateManager.prototype.newActions=false;mstrUpdateManager.prototype.sTimeOutID=null;mstrUpdateManager.prototype.callback=null;mstrUpdateManager.UNIT_SEPARATOR=",";mstrUpdateManager.ITEM_SEPARATOR=";";mstrUpdateManager.UPDATE_LATER="0";mstrUpdateManager.UPDATE_NOW="1";mstrUpdateManager.STATIC_ACTION=-1;mstrUpdateManager.ARG_KEY_SEPARATOR="_";mstrUpdateManager.addEvent=function(evts){if(!mstrUpdateManager.actions){mstrUpdateManager.actions={};}for(var p in evts){var id=evts[p].i;mstrUpdateManager[p]=id;mstrUpdateManager.actions[id]={eventID:id,paramName:evts[p].n,paramID:evts[p].p};}mstrUpdateManager.newActions=true;};mstrUpdateManager.prototype.addSingleAction=function(action){try{if(!this.cachedActionCollection){this.cachedActionCollection=[];}this.cachedActionCollection.push(action);this.newActions=true;}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.getUseIFrame=function(){try{return this.useIframe;}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.setUseIFrame=function(value){try{this.useIframe=value;}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.getNewWindowSetting=function(){try{return this.newWindow;}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.setNewWindowSetting=function(value){try{this.newWindow=value;}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.addActionCollection=function(ac){try{if(!this.cachedActionCollection){this.cachedActionCollection=[];}this.cachedActionCollection=this.cachedActionCollection.concat(ac);this.newActions=true;}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.hasCachedActions=function(){try{return(this.cachedActionCollection&&this.cachedActionCollection.length>0);}catch(err){microstrategy.errors.log(err);}return false;};mstrUpdateManager.prototype.addCachedActions=function(){try{if(this.cachedActionCollection){this.queueActions=false;this.add(this.cachedActionCollection,false);this.cachedActionCollection=null;if(this.forceSubmitAfterQueue){this.flushAndSubmitChanges();}}}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.killCachedActions=function(){try{if(this.cachedActionCollection){this.queueActions=false;this.cachedActionCollection=null;}}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.add=function(ac,isStatic){try{if(this.queueActions){if(ac.length){this.addActionCollection(ac);}else{this.addSingleAction(ac);}}else{if(isStatic){this.staticActions.push(ac);this.redoActions.unshift(mstrUpdateManager.STATIC_ACTION);this.newActions=true;}else{this.clearRedoActions();this.undoActions.push(ac);this.newActions=true;}microstrategy.eventManager.notifyOrphanBones("onupdatemanagerchange","add",ac);if(this.observer){this.observer.notifyAll("onupdatemanagerchange");}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.addURL=function(url){try{if(url){if(this.extraURL.length>0){this.extraURL+="&"+url;}else{this.extraURL=url;}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.replaceURL=function(name,value){try{if(this.extraURL.length>0){if(this.extraURL.indexOf(name)>-1){var first=this.extraURL.substring(0,this.extraURL.indexOf(name)-2);var secondIndex=this.extraURL.indexOf("&",this.extraURL.indexOf(name));if(first==null||first.length==0){first="";}else{first+="&";}if(secondIndex>this.extraURL.indexOf(name)){this.extraURL=first+this.extraURL.substring(secondIndex+1,this.extraURL.length)+"&"+name+"="+value;}else{this.extraURL=name+"="+value;}}else{this.extraURL+="&"+name+"="+value;}}else{this.extraURL=name+"="+value;}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.processUndoRedo=function(source,target){try{while(source.length>0){var ac=source.pop();target.push(ac);if(ac!=mstrUpdateManager.STATIC_ACTION){return ac;}}}catch(err){microstrategy.errors.log(err);}return null;};mstrUpdateManager.prototype.broadcastUpdate=function(){try{while(source.length>0){var ac=source.pop();target.push(ac);if(ac!=mstrUpdateManager.STATIC_ACTION){return ac;break;}}return null;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.undo=function(cnt){try{var broadcast=false;cnt=cnt||1;for(var j=0;j<cnt;j++){var ac=this.processUndoRedo(this.undoActions,this.redoActions);if(ac){for(var i=0;i<ac.length;i++){microstrategy.eventManager.notifyOrphanBones("onundo",new mstrUndoObj(ac[i]));}broadcast=true;}}if(broadcast){microstrategy.eventManager.notifyOrphanBones("onupdatemanagerchange","undo");}if(this.observer){this.observer.notifyAll("onupdatemanagerchange");}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.redo=function(){try{var ac=this.processUndoRedo(this.redoActions,this.undoActions);if(ac){for(var i=0;i<ac.length;i++){microstrategy.eventManager.notifyOrphanBones("onredo",new mstrRedoObj(ac[i]));}microstrategy.eventManager.notifyOrphanBones("onupdatemanagerchange","redo");if(this.observer){this.observer.notifyAll("onupdatemanagerchange");}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.getPendingEventsForTask=function(bp){var oNewItem;var actionID;var counter=0;var events=[];var beanNames=bp.split(".");var lastBeanName=beanNames[beanNames.length-1];var backupOfOptActions=this.optActions;this.optActions=[];if(this.OPTIMIZE_EVENTS){for(var i=0;i<this.undoActions.length;i++){var actionCol=this.undoActions[i];if(actionCol==mstrUpdateManager.STATIC_ACTION){actionCol=this.staticActions[counter];counter++;}for(var a=0;a<actionCol.length;a++){var obj=actionCol[a];var beanPath=obj.beanPath;if(beanPath&&beanPath.indexOf(bp)==0){obj.beanPath=beanPath.substring(beanPath.indexOf(lastBeanName));obj.beanPath=microstrategy.servletName+"."+obj.beanPath;this.createOptimizedArray(obj);actionCol.splice(a,1);a=a-1;}}}for(var i=0;i<this.optActions.length;i++){if(this.optActions[i].id!=null){events.push(this.createEventForAction(this.optActions[i]));}}this.postOptimizationCleanup();}else{for(var i=0;i<this.undoActions.length;i++){var actionCol=this.undoActions[i];if(actionCol==mstrUpdateManager.STATIC_ACTION){actionCol=this.staticActions[counter];counter++;}for(var a=0;a<actionCol.length;a++){var obj=actionCol[a];var beanPath=obj.beanPath;if(beanPath&&beanPath.indexOf(bp)==0){obj.beanPath=beanPath.substring(beanPath.indexOf(lastBeanName));obj.beanPath=microstrategy.servletName+"."+obj.beanPath;events.push(this.createEventForAction(obj));actionCol.splice(a,1);a=a-1;}}}}this.optActions=backupOfOptActions;if(events.length>0){var serializer=new mstrSerializer();serializer.addValues(events);return serializer.getState();}else{return"";}};mstrUpdateManager.prototype.flushChanges=function(oForm){try{var oNewItem;var actionID;var counter=0;var events=[];this.clearRedoActions();if(this.extraURL.length>0){addURLAsHiddenInputsToForm(oForm,this.extraURL);this.extraURL="";}if(this.OPTIMIZE_EVENTS){for(var i=0;i<this.undoActions.length;i++){var actionCol=this.undoActions[i];if(actionCol==mstrUpdateManager.STATIC_ACTION){actionCol=this.staticActions[counter];counter++;}for(var a=0;a<actionCol.length;a++){this.createOptimizedArray(actionCol[a]);}}for(var i=0;i<this.optActions.length;i++){if(this.optActions[i].id!=null){events.push(this.createEventForAction(this.optActions[i]));}}this.postOptimizationCleanup();}else{for(var i=0;i<this.undoActions.length;i++){var actionCol=this.undoActions[i];if(actionCol==mstrUpdateManager.STATIC_ACTION){actionCol=this.staticActions[counter];counter++;}for(var a=0;a<actionCol.length;a++){events.push(this.createEventForAction(actionCol[a]));}}}var serializer=new mstrSerializer();serializer.addValues(events);if(oForm.getAttribute("hasUpdateChanges")=="true"){updateDynamicInput(oForm,mstrUpdateManager.multipleEventArgName,serializer.getState());}else{this.submittedForm=oForm;this.hiddenInputs=[];this.createHiddenInput(oForm,mstrUpdateManager.multipleEventArgName,serializer.getState());this.createHiddenInput(oForm,"evt",mstrUpdateManager.multipleEventID);this.createHiddenInput(oForm,"src",mstrUpdateManager.multipleEventSrc);this.createHiddenInput(oForm,mstrUpdateManager.multipleEventID,"1");oForm.setAttribute("hasUpdateChanges","true");}if(this.newWindow){oForm.target=this.newWindowName;}this.newActions=false;return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.flushChangesAsParams=function(oParams){try{var oNewItem;var actionID;var counter=0;var events=[];this.clearRedoActions();if(this.extraURL.length>0){UpdateHelper.addURLToParams(oParams,this.extraURL);this.extraURL="";}if(this.OPTIMIZE_EVENTS){for(var i=0;i<this.undoActions.length;i++){var actionCol=this.undoActions[i];if(actionCol==mstrUpdateManager.STATIC_ACTION){actionCol=this.staticActions[counter];counter++;}for(var a=0;a<actionCol.length;a++){this.createOptimizedArray(actionCol[a]);}}for(var i=0;i<this.optActions.length;i++){if(this.optActions[i].id!=null){events.push(this.createEventForAction(this.optActions[i]));}}this.postOptimizationCleanup();}else{for(var i=0;i<this.undoActions.length;i++){var actionCol=this.undoActions[i];if(actionCol==mstrUpdateManager.STATIC_ACTION){actionCol=this.staticActions[counter];counter++;}for(var a=0;a<actionCol.length;a++){events.push(this.createEventForAction(actionCol[a]));}}}var serializer=new mstrSerializer();serializer.addValues(events);if(oParams.hasUpdateChanges=="true"){oParams[mstrUpdateManager.multipleEventArgName]=serializer.getState();}else{this.submittedXhr=true;UpdateHelper.addAdditionalParam(oParams,mstrUpdateManager.multipleEventArgName,serializer.getState());UpdateHelper.addAdditionalParam(oParams,"evt",mstrUpdateManager.multipleEventID);UpdateHelper.addAdditionalParam(oParams,"src",mstrUpdateManager.multipleEventSrc);UpdateHelper.addAdditionalParam(oParams,mstrUpdateManager.multipleEventID,"1");oParams.hasUpdateChanges=="true";}if(this.newWindow){oParams.target=this.newWindowName;}this.newActions=false;return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.createHiddenInput=function(oForm,name,value){var hi=createHiddenInput(oForm,name,value);this.hiddenInputs.push(hi);};mstrUpdateManager.prototype.postOptimizationCleanup=function(action){if(this.fullScreenModePosition){delete this.fullScreenModePosition;}if(this.lTbarBrowserSettingPosition){delete this.lTbarBrowserSettingPosition;}if(this.ctlCurElementsPosition){delete this.ctlCurElementsPosition;}if(this.currentPanelPosition){delete this.currentPanelPosition;}if(this.widgetPropEdits){delete this.widgetPropEdits;}this.optActions=[];this.lastPosArray=[];};mstrUpdateManager.prototype.createEventForAction=function(action){try{var globalActions=mstrUpdateManager.actions[action.id];var serializer=new mstrSerializer();serializer.addStr(globalActions.eventID);serializer.addStr(action.beanPath+"."+globalActions.eventID);var s="";for(var j=0;j<action.newArgs.length;j++){actionID=action.argID[j];for(var k=0;k<globalActions.paramID.length;k++){if(globalActions.paramID[k]==actionID){if(false){s+="<arg name='"+globalActions.paramName[k]+"' v='"+action.newArgs[j]+"' />";}if(action.argKey==null){serializer.addStr(globalActions.paramName[k]);}else{serializer.addStr(globalActions.paramName[k]+mstrUpdateManager.ARG_KEY_SEPARATOR+action.argKey);}serializer.addStr(action.newArgs[j]);break;}}}if(false){alert(s);}return serializer.getState();}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.flushAndSubmitChanges=function(noXHR,callback){this.callback=callback;try{if(useXHR&&!noXHR){mstrMsgBoxImpl.hideMessage(null,"controlSubmitButton");var oParams=UpdateHelper.createParamsFromURL(this.getFormAction(),this.useIframe&&!this.newWindow);this.flushing=true;UpdateHelper.submitRequest(oParams);}else{mstrMsgBoxImpl.hideMessage(null,"controlSubmitButton");var oNewForm=createDynamicForm(this.getFormAction());if(this.useIframe&&!this.newWindow){addURLAsHiddenInputsToForm(oNewForm,"iframe=true");oNewForm.target=this.iframeTarget;}this.flushing=true;submitForm(oNewForm,noXHR);}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.acknowledgeRequest=function(){try{this.undoActions=[];this.redoActions=[];this.staticActions=[];this.optActions=[];this.lastPosArray=[];this.copyActions={};this.newWindow=false;microstrategy.eventManager.notifyOrphanBones("onupdatemanagerchange");if(this.observer){this.observer.notifyAll("onupdatemanagerchange");}var hi;if(this.submittedForm!=null){for(var j=0;j<this.hiddenInputs.length;j++){hi=this.hiddenInputs[j];try{this.submittedForm.removeChild(hi);}catch(err){if((err&&err.code!=8)&&(err.number&&err.number!=-2147024809)){throw (err);}}}this.submittedForm.setAttribute("hasUpdateChanges","false");this.submittedForm=null;this.hiddenInputs=null;this.flushing=false;}if(this.submittedXhr){this.submittedXhr=false;this.flushing=false;}}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.isFlushing=function(){return !!this.flushing;};mstrUpdateManager.prototype.acknowledgeReloadEnd=function(){if(this.observer){this.observer.notifyAll("acknowledgeReloadEnd");}};mstrUpdateManager.prototype.getFixStateActions=function(){try{var fixStateActions=[];for(var i=0;i<this.staticActions.length;i++){var actionCol=this.staticActions[i];for(var a=0;a<actionCol.length;a++){fixStateActions.push(actionCol[a]);}}return fixStateActions;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.hasChangesToSubmit=function(){try{return(this.undoActions.length>0||this.isRedoStatic()||(this.extraURL!=null&&this.extraURL.length>0));}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.hasNewChanges=function(){try{var result=this.newActions;this.newActions=false;return result;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.clearRedoActions=function(){try{while(this.redoActions.length>0){var ac=this.redoActions.pop();if(ac==mstrUpdateManager.STATIC_ACTION){this.undoActions.push(ac);}}}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.getLastAction=function(){try{return this.undoActions.pop();}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.isRedoStatic=function(){try{var rtn=false;for(var i=0;i<this.redoActions.length;i++){if(this.redoActions[i]==mstrUpdateManager.STATIC_ACTION){rtn=true;break;}}return rtn;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.anyNonStatic=function(isRedo){try{var queue=(isRedo)?this.redoActions:this.undoActions;var rtn=false;for(var i=0;i<queue.length;i++){if(queue[i]!=mstrUpdateManager.STATIC_ACTION){rtn=true;break;}}return rtn;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.createActionObject=function(elem,id,beanPath,argID,newArgs,oldArgs,cachedArray,argKey){try{var Action={};Action.elem=elem;Action.id=id;Action.beanPath=beanPath;Action.argID=argID;Action.newArgs=newArgs;Action.oldArgs=oldArgs;Action.cachedArray=cachedArray;Action.argKey=argKey;if(id==mstrUpdateManager.EDIT_PROPS){Action.formatType=microstrategy.formatType;Action.argID.push("2048131");Action.newArgs.push(microstrategy.formatType);Action.oldArgs.push(microstrategy.formatType);}return Action;}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.createOptimizedArray=function(action){try{var actionID=action.id;if(!this.ADD_EVENT_IDS){this.ADD_EVENT_IDS=mstrUpdateManager.ADD_TEXT+"|"+mstrUpdateManager.ADD_LINE+"|"+mstrUpdateManager.ADD_SHAPE+"|"+mstrUpdateManager.ADD_TEMPLATE+"|"+mstrUpdateManager.ADD_DATASET_TEMPLATE+"|"+mstrUpdateManager.ADD_IMAGE+"|"+mstrUpdateManager.ADD_HTML_CONTAINER+"|"+mstrUpdateManager.ADD_PANEL_STACK+"|"+mstrUpdateManager.CTRL_ADD+"|";}var elemID=(action.elem)?action.elem.id:null;var lastPosElemID=elemID;if(actionID==mstrUpdateManager.SET_REPORT_PROPERTY_VALUES){for(var i=0;i<action.argID.length;i++){if(action.argID[i]=="4146"){lastPosElemID=elemID+action.newArgs[i].split("!")[0]+action.newArgs[i].split("!")[1]+action.newArgs[i].split("!")[2];break;}}}var newArg;if(actionID==mstrUpdateManager.EDIT_PROPS){for(var i=0,cnt=action.argID.length;i<cnt;i++){if(action.argID[i]=="2048035"){var data=action.newArgs[i].split(mstrUpdateManager.UNIT_SEPARATOR);if(data[1]=="FormattingWidget"&&data[2]=="WidgetProps"){var localWidgetEdit=this.widgetPropEdits||{};if(data[0] in localWidgetEdit){this.optActions[localWidgetEdit[data[0]]].id=null;}localWidgetEdit[data[0]]=this.optActions.length;this.widgetPropEdits=localWidgetEdit;}break;}}this.optActions.push(action);}else{if(actionID==mstrUpdateManager.COPY_TO_CLIPBOARD||actionID==mstrUpdateManager.CUT_TO_CLIPBOARD){newArg=action.newArgs[0].split(CLIPBOARD_ITEM_SEPARATOR);for(var i=0;i<newArg.length;i++){this.copyActions[newArg[i]]={};this.copyActions[newArg[i]].position=this.optActions.length;this.copyActions[newArg[i]].applied=false;}this.optActions.push(action);}else{if(actionID==mstrUpdateManager.SET_REPORT_PROPERTY_VALUES||actionID==mstrUpdateManager.EDIT_TEXT||actionID==mstrUpdateManager.SET_TOPLEFT_POSITION||actionID==mstrUpdateManager.CHANGE_BONE_PROPERTY){if(!this.lastPosArray[actionID]){this.lastPosArray[actionID]={};}if(this.copyActions[elemID]&&this.copyActions[elemID].applied==false){this.copyActions[elemID].applied=true;for(anItem in this.lastPosArray){delete this.lastPosArray[anItem][lastPosElemID];}this.lastPosArray[actionID][lastPosElemID]={};this.lastPosArray[actionID][lastPosElemID].position=this.optActions.length;this.optActions.push(action);}else{if(this.lastPosArray[actionID][lastPosElemID]){var position=this.lastPosArray[actionID][lastPosElemID].position;var optAction=this.optActions[position];var srcKey=mstr.$A.find(optAction.argID,"2048007");if(srcKey==-1){srcKey=null;}var newSrcKey=mstr.$A.find(optAction.argID,"2048007");if(newSrcKey==-1){srcKey=null;}if(newSrcKey==srcKey){optAction.newArgs=action.newArgs;}else{this.lastPosArray[actionID][lastPosElemID].position=this.optActions.length;this.optActions.push(action);}}else{this.lastPosArray[actionID][lastPosElemID]={};this.lastPosArray[actionID][lastPosElemID].position=this.optActions.length;this.optActions.push(action);}}}else{if(actionID==mstrUpdateManager.REMOVE_OBJECT){if(this.copyActions[elemID]){for(var i=this.copyActions[elemID].position;i<this.optActions.length;i++){if(this.optActions[i].elem&&this.optActions[i].elem.id==elemID){this.optActions[i].id=null;}}delete this.copyActions[elemID];for(anItem in this.lastPosArray){delete this.lastPosArray[anItem][lastPosElemID];}}else{for(var i=0;i<this.optActions.length;i++){if(this.optActions[i].elem&&this.optActions[i].elem.id==elemID&&!this.ADD_EVENT_IDS.contains(this.optActions[i].id,"|")){this.optActions[i].id=null;}}}this.optActions.push(action);}else{if(actionID==mstrUpdateManager.SWITCH_FULL_SCREEN_MODE){if(typeof (this.fullScreenModePosition)!="undefined"&&this.optActions[this.fullScreenModePosition]&&this.optActions[this.fullScreenModePosition].newArgs&&this.optActions[this.fullScreenModePosition].id==actionID){this.optActions[this.fullScreenModePosition].newArgs=action.newArgs;}else{this.fullScreenModePosition=this.optActions.length;this.optActions.push(action);}}else{if(actionID==mstrUpdateManager.SET_PERMANENT_BROWSER_SETTING){if(action.argID[0]=="5005"&&action.newArgs[0]=="lTbar"){if(typeof (this.lTbarBrowserSettingPosition)!="undefined"&&this.optActions[this.lTbarBrowserSettingPosition]&&this.optActions[this.lTbarBrowserSettingPosition].newArgs){this.optActions[this.lTbarBrowserSettingPosition].newArgs=action.newArgs;}else{this.lTbarBrowserSettingPosition=this.optActions.length;this.optActions.push(action);}}else{this.optActions.push(action);}}else{if(actionID==mstrUpdateManager.SET_CUR_CTL_ELEMENTS){for(var i=0;i<action.argID.length;i++){if(action.argID[i]=="2048130"){this.ctlCurElementsPosition=this.ctlCurElementsPosition||{};var ctlKey=action.newArgs[i];if(ctlKey in this.ctlCurElementsPosition){this.optActions[this.ctlCurElementsPosition[ctlKey]].id=null;}this.ctlCurElementsPosition[ctlKey]=this.optActions.length;this.optActions.push(action);break;}}}else{if(actionID==mstrUpdateManager.SET_CURRENT_PANEL){var panelStackKey=action.newArgs[0];if(!this.currentPanelPosition){this.currentPanelPosition={};}if(typeof (this.currentPanelPosition[panelStackKey])!="undefined"){this.optActions.splice(this.currentPanelPosition[panelStackKey],1);}this.currentPanelPosition[panelStackKey]=this.optActions.length;this.optActions.push(action);}else{this.optActions.push(action);}}}}}}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrUpdateManager.prototype.getFormAction=function(){if(!this.formAction){this.formAction=microstrategy.servletName;}return this.formAction;};mstrUpdateManager.prototype.setFormAction=function(value){this.formAction=value;};mstrUpdateManager.createPropertyEditString=function(key,htmlProp,value,skipEncoding,psName){try{var f=mstrFormatObject;if(!f){return"";}if(!skipEncoding){value=f.encodeValue(htmlProp,value);}var s=key||"";if(s){s+=mstrUpdateManager.UNIT_SEPARATOR;}return s+(psName||f.getPropertySetName(htmlProp))+mstrUpdateManager.UNIT_SEPARATOR+f.getPropertyName(htmlProp)+mstrUpdateManager.UNIT_SEPARATOR+value+mstrUpdateManager.ITEM_SEPARATOR;}catch(err){microstrategy.errors.log(err);return"";}};mstrUpdateManager.prototype.createEditPropsAction=function(obj,id,bp,p,nv,ov,now,ca,atv){try{var update=(now)?mstrUpdateManager.UPDATE_NOW:mstrUpdateManager.UPDATE_LATER;var m=mstrUpdateManager.createPropertyEditString;var applyToAllView=atv?"1":"0";var nvs="",ovs="";for(var i=0;i<p.length;i++){nvs+=m(id,p[i],nv[i]);if(ov&&(i in ov)){ovs+=m(id,p[i],ov[i]);}}var args=atv?["2048018","2048035","2048241"]:["2048018","2048035"],vals=atv?[update,nvs,applyToAllView]:[update,nvs];return this.createActionObject(obj,mstrUpdateManager.EDIT_PROPS,bp,args,vals,(ovs&&[update,ovs])||[],ca);}catch(e){microstrategy.errors.log(err);return null;}};mstrUpdateManager.prototype.getRWBState=function(){if(pageState){var ps=(pageState+"&").match(/rwb=(.*?)\&/);if(ps!=-1){return ps[1];}}return"";};mstrUpdateManager.prototype.refreshPage=function(){try{this.useIframe=false;var action=this.createActionObject(null,mstrUpdateManager.PAGE_REFRESH,microstrategy.servletName+"."+microstrategy.pageName,[],[],[],null);this.add([action],true);this.flushAndSubmitChanges();}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.submitPartialUpdate=function(params){try{microstrategy.puStatus=0;iframe.notifyParent(true);if(!this.partialUpdateModel){this.partialUpdateModel=new mstr.models.BooleanTaskModel({parent:this});mstr.controllers.Factory.add(this.partialUpdateModel);var zz=this.partialUpdateModel&&this.partialUpdateModel&&this.partialUpdateModel.init();if(!("id" in this)||!mstr.$obj(this.id)){mstr.controllers.Factory.add(this);}this.partialUpdateModel.attachEventListener(this,"set_readyState","handleStateChange");}params.processorClass=mstr.http.PUProcessor;this.partialUpdateModel.execSubmit({params:params,callback:this.callback});}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.handleStateChange=function(evt){try{switch(evt.memo.value){case mstr.Enum.Widget.READYSTATE.TIMEOUT:case mstr.Enum.Widget.READYSTATE.ERROR:break;case mstr.Enum.Widget.READYSTATE.SUCCESS:var updateResult=evt.src.get("requestContext").response.data;if(updateResult){if(updateResult.status=="2"){iframe.showWaitPage();}else{iframe.hideWaitPage();}UpdateHelper.replaceComponents(updateResult.components);document.title=updateResult.title;if(updateResult.status=="2"){this.doRedirect(updateResult.redirectURL,updateResult.waitSeconds);}microstrategy.eventManager.executeFunction("microstrategy.eventManager.onreload()");if(updateResult.script){eval(updateResult.script);}microstrategy.puStatus=1;}else{if(window.document.readyState=="complete"){var sMarkup=evt.src.get("requestContext").response.text;if(bIsIE6&&!bIsIE7){document.write(sMarkup);}else{var oNewDoc=window.document.open("text/html");if(sMarkup.indexOf("<!DOCTYPE")==-1){oNewDoc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd " >');}oNewDoc.write(sMarkup);oNewDoc.close();}}}delete this.callback;break;}}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.doRedirect=function(strURL,waitSeconds){try{this.sTimeOutID=window.setTimeout('microstrategy.updateManager.timedRedirect("'+strURL+'")',waitSeconds*1000);}catch(err){microstrategy.errors.log(err);}};mstrUpdateManager.prototype.timedRedirect=function(strURL){try{window.clearTimeout(this.sTimeOutID);var oParams=UpdateHelper.createParamsFromURL(strURL);UpdateHelper.submitRequest(oParams);}catch(err){microstrategy.errors.log(err);}};function mstrUpdateManager(){this.commands=new UpdateManagerCommands(this);if(typeof (mstrObserverImpl)!="undefined"){this.observer=new mstrObserverImpl();}return this;}if(typeof (microstrategy)!="undefined"){microstrategy.updateManager=new mstrUpdateManager();}mstrUndoObj.prototype={};function mstrUndoObj(action){this.elem=action.elem;this.id=action.id;this.args=action.oldArgs;this.cachedArray=action.cachedArray;return this;}mstrRedoObj.prototype={};function mstrRedoObj(action){this.elem=action.elem;this.id=action.id;this.args=action.newArgs;this.cachedArray=action.cachedArray;return this;}function UpdateManagerCommands(um){this.queryVisible=function(cmdId){return true;};this.queryEnabled=function(cmdId){switch(cmdId){case"redo":return um.anyNonStatic(true);case"undo":return um.anyNonStatic(false);case"apply":return um.hasChangesToSubmit();default:return false;}};this.queryState=function(cmdId){return false;};this.exec=function(cmdId,cmdValue){switch(cmdId){case"redo":return um.redo();case"undo":return um.undo();case"apply":um.add([um.createActionObject(null,mstrUpdateManager.APPLY_CHANGES,mstrUpdateManager.applyChangesBeanPath,[],[],[])]);return um.flushAndSubmitChanges();default:return false;}};return this;}var UpdateHelper=new function(){};UpdateHelper.prototype=new Object();UpdateHelper.createParamsFromURL=function(sAction,partialUpdate){var oParams={method:"post"};var hasParameters=sAction.indexOf("?")>0;var hasRelativeLink=sAction.indexOf("#")>0;var hasSessionId=(microstrategy.sessionId&&microstrategy.sessionId!=null&&microstrategy.sessionId!="");var isPU=(sAction.indexOf("iframe=true")>0||partialUpdate);var formAction=((hasParameters)?sAction.substring(0,sAction.indexOf("?")):sAction);if(hasRelativeLink){var relativeLink="";sAction=moveAnchor(sAction);relativeLink=sAction.substring(sAction.indexOf("#"));formAction=formAction.replace(relativeLink,"")+relativeLink;sAction=sAction.substring(0,sAction.indexOf("#"));}if(hasSessionId&&formAction.indexOf("jsessionid")==-1){formAction+=";jsessionid="+microstrategy.sessionId;}if(hasParameters){UpdateHelper.addURLToParams(oParams,sAction);}oParams.iframe=(isPU)?"true":"false";oParams.action=formAction;return oParams;};UpdateHelper.createParamsFromForm=function(iform,clickName,clickValue,purgeState){var oForm=getObj(iform);var aInputs=microstrategy.findChildrenWithAtt(oForm,["INPUT","SELECT","TEXTAREA"],"name");var params={action:oForm.action,method:oForm.method};if(typeof oForm.target!=undefined){params.target=oForm.target;}for(var j=0;j<aInputs.length;j++){var aI=aInputs[j];if(purgeState===true&&aI.ps===true){continue;}if(aI.type=="select-multiple"&&aI.options&&aI.options.length>0&&aI.disabled!=true){for(var i=0;i<aI.options.length;i++){if(UpdateHelper.shouldSubmit(aI.options[i])){UpdateHelper.addAdditionalParam(params,aI.name,aI.options[i].value);}}}else{if(UpdateHelper.shouldSubmit(aI)){UpdateHelper.addAdditionalParam(params,aI.name,aI.value);}}}if(clickName){params[clickName]=clickValue;}return params;};UpdateHelper.shouldSubmit=function(input){if(input.disabled==true){return false;}if(input.type=="submit"||input.type=="button"||input.type=="image"||input.value=="undefined"){return false;}if(input.type=="radio"||input.type=="checkbox"){if(!input.getAttribute("agg")){return input.checked;}else{input.value=input.checked?"true":"false";return true;}}if(input.tagName.toLowerCase()=="option"){return input.selected;}return true;};UpdateHelper.addURLToParams=function(oParams,URL,replaceInputs){URL=URL.substring(URL.indexOf("?")+1,URL.length);var URLP=URL.split("&");var temp="";var pN="";var pV="";var myRegExp=/\+/g;for(var i=0;i<URLP.length;i++){temp=URLP[i].split("=");pN=temp[0];pV=temp[1];if(pV){pV=decodeURIComponent(pV.replace(myRegExp," "));}if(replaceInputs){oParams[pN]=pV;}else{UpdateHelper.addAdditionalParam(oParams,pN,pV);}}return false;};UpdateHelper.addAdditionalParam=function(oParams,name,value){if(oParams[name]&&typeof oParams[name]!="object"){oParams[name]=[oParams[name],value];}else{if(oParams[name]&&oParams[name].push){oParams[name].push(value);}else{oParams[name]=value;}}};UpdateHelper.submitRequest=function(oParams){var stateForm=getObj("pageStateForm");var aInputs=null;var aOriginalInputs=null;var i;var j;var oNewItem;var found;UpdateHelper.appendPageStateToParams(oParams);if(typeof (microstrategy)!="undefined"&&typeof (microstrategy.bones.rwb_viewer)!="undefined"&&microstrategy.EDIT_MODE==microstrategy.ALLOW_EDIT_MODE){var docViewer=microstrategy.bones.rwb_viewer;oParams.docSelections=docViewer.commands.queryState("selectionsKey");docViewer.adjustScrollValues();oParams.viewerScroll=docViewer.dScrollTop+","+docViewer.dScrollLeft;oParams.isLocked=(docViewer.insertionControlLocked)?1:0;var st=docViewer.doc.currentControlSubtype?"|"+docViewer.doc.currentControlSubtype:"";oParams.currentControl=docViewer.doc.currentControl+st;}if(typeof (microstrategy)!="undefined"&&microstrategy.DISPLAY_MODE==microstrategy.VIEW_MODE&&microstrategy.EDIT_MODE==microstrategy.ALLOW_EDIT_MODE){for(var id in microstrategy.bones){if(microstrategy.bones[id]!=null&&microstrategy.bones[id].type==microstrategy.OBJTYPE_GRID){var gridBone=microstrategy.bones[id];if(gridBone&&gridBone.gridStructureInfo&&!gridBone.gridStructureInfo.emptyCase&&!gridBone.gridStructureInfo.isEmptyTemplate){if(gridBone.isGrid){var value=gridBone.commands.queryState("selections");if(value){oParams[gridBone.id]=value;}}if(gridBone.isGraph&&id.indexOf("_graph")==-1){oParams[gridBone.id+"_gs"]=gridBone.commands.queryState("graphSelections");}}}}}if(oParams.iframe=="true"){microstrategy.updateManager.submitPartialUpdate(oParams);}else{var oForm=UpdateHelper.createFormFromParams(oParams);if(mstr.utils.ISSAFARI&&oForm.target=="_blank"){oForm.action+=(oForm.action.indexOf("?")==-1?"?":"&");oForm.action+="t="+new Date().getTime();}try{oForm.submit();}catch(err){if(oForm.target!=""&&!window.open("","","width=1,height=1,left=0,top=0,scrollbars=no")){showMessage({contents:microstrategy.descriptors.getDescriptor("5877"),elements:microstrategy.OK_BUTTON,type:mstrMsgBoxImpl.MSG_WARNING});}else{microstrategy.errors.log(err);}}}return false;};UpdateHelper.createFormFromParams=function(oParams){var oNewForm=document.createElement("FORM");oNewForm.name="dynamic_form";oNewForm.method=oParams.method;delete oParams.method;oNewForm.action=oParams.action;delete oParams.action;if(typeof oParams.target!="undefined"){oNewForm.target=oParams.target;delete oParams.target;}oNewForm.setAttribute("hasUpdateChanges",oParams.hasUpdateChanges=="true");for(var n in oParams){if(oParams[n]){if(typeof oParams[n]=="object"){for(var j=0;j<oParams[n].length;j++){if(oParams[n][j]){createHiddenInput(oNewForm,n,oParams[n][j]);}}}else{createHiddenInput(oNewForm,n,oParams[n]);}}}document.body.insertAdjacentElement("beforeEnd",oNewForm);return oNewForm;};UpdateHelper.submitFormThroughXHR=function(clickInput,asEvent){if(asEvent){if(!clickInput){clickInput=window.event;}var clickInput=getEventTarget(clickInput);if(!clickInput){return false;}}var iform=microstrategy.findAncestorWithTag(clickInput,"FORM");var clickName=clickInput.name;var clickValue=clickInput.value;if(typeof iform=="undefined"||typeof clickName=="undefined"||typeof clickValue=="undefined"){return false;}var params=UpdateHelper.createParamsFromForm(iform,clickName,clickValue,true);UpdateHelper.appendPageStateToParams(params);microstrategy.updateManager.submitPartialUpdate(params);return false;};UpdateHelper.appendPageStateToParams=function(oParams){var stateForm=getObj("pageStateForm");var aInputs=null;var um=(typeof (microstrategy)!="undefined")?microstrategy.updateManager:null;var i;if(um&&um.hasChangesToSubmit()){um.flushChangesAsParams(oParams);UpdateHelper.addEvtOrderToParams(oParams,mstrUpdateManager.multipleEventID);}if(stateForm){if(oParams.method=="get"||oParams.method=="GET"){UpdateHelper.addURLToParams(oParams,pageState,true);}else{aInputs=stateForm.getElementsByTagName("INPUT");for(i=0;i<aInputs.length;i++){oParams[aInputs[i].name]=aInputs[i].value;}}}};UpdateHelper.submitLink=function(oAnchor){var sURL;sURL=oAnchor.href;var sTarget;sTarget=oAnchor.target;var cssAnalyzerToolbar=document.getElementById("cssAnalyzerToolbar");var isCSSAnalyzerEnabled=(getCookie(ENABLE)=="true")&&(cssAnalyzerToolbar!=null);if(isCSSAnalyzerEnabled){return false;}window.mstrSubmitLink=true;if(sTarget=="frameManager"||(typeof (microstrategy)!="undefined"&&microstrategy.updateManager&&microstrategy.updateManager.hasChangesToSubmit())){var oParams=UpdateHelper.createParamsFromURL(sURL);if(sTarget){oParams.target=sTarget;}UpdateHelper.submitRequest(oParams);return false;}if(typeof (pageState)!="undefined"){var sNewLink=updateLink(sURL);sNewLink=moveAnchor(sNewLink);var anchorText=null;if(bIsIE6&&oAnchor.childNodes&&(oAnchor.childNodes.length==1)&&oAnchor.childNodes[0].nodeType==3){anchorText=oAnchor.innerHTML;}oAnchor.href=sNewLink;if(bIsIE6&&anchorText!=null){oAnchor.innerHTML=anchorText;}return true;}else{return true;}};UpdateHelper.addEvtOrderToParams=function(oParams,eventID,isLastEvent){if(oParams.evtorder){if(oParams.evtorder.indexOf(eventID)<0){if(isLastEvent){oParams.evtorder=oParams.evtorder+","+eventID;}else{oParams.evtorder=eventID+","+oParams.evtorder;}oParams[eventID]="1";}}else{oParams.evtorder=eventID;if(oParams.evt&&oParams.evt.length<3){for(j=0;j<oParams.evt.length;j++){oParams[oParams.evt[j]]="1";}}}};UpdateHelper.replaceComponents=function(cBlocks,parentId){try{if(!parentId){iframe.consolidatedStyles={};iframe.isProcessing=true;if(!bIsW3C){iframe.togglePulldownChildren(document.body,false);}}var i;for(i=0;i<cBlocks.length;i++){var cB=cBlocks[i];if(cB&&cB.ISEMPTY!="true"){if(cB.errBox!="true"||currentModalEditor.length==0){UpdateHelper.updateComponent(cB,parentId);}else{var sHTML=cB.content;if(sHTML.length>0){showMessage({contents:sHTML,elements:microstrategy.OK_BUTTON,type:mstrMsgBoxImpl.MSG_ERROR});}}}}if(!parentId){for(var styleId in iframe.consolidatedStyles){updateStyleContainer(iframe.consolidatedStyles[styleId],styleId);}if(!bIsW3C){iframe.togglePulldownChildren(document.body,true);}iframe.targets=null;microstrategy.loadDynamicJS();microstrategy.registerNewBones();}}catch(err){microstrategy.errors.log(err);}};UpdateHelper.updateComponent=function(cB,parentId){try{var sReplaceHTML;var aScripts=null;var j;var oParentDiv;if(!cB.id){return ;}if(cB.components&&cB.components.length>1){UpdateHelper.replaceComponents(cB.components,cB.id);return ;}else{if(cB.components&&cB.components.length==1){return ;}}if(cB.slid){var slices=document.getElementsByName(cB.id);if(slices&&slices.length>0){for(var i=0,len=slices.length;i<len;i++){if(slices[i].getAttribute("slid")==cB.slid){oParentDiv=slices[i];break;}}}}if(!oParentDiv){var oParentDivs=document.getElementById(cB.id);if(!oParentDivs&&(cB.dialog||cB.css=="1")){iframe.createPlaceHolder(cB.id);oParentDivs=document.getElementById(cB.id);}if(oParentDivs){if(oParentDivs.length>1){for(var i=0;i<oParentDivs.length;i++){if(oParentDivs[i].tagName=="DIV"){oParentDiv=oParentDivs[i];break;}}}else{oParentDiv=oParentDivs;}}}if(oParentDiv){var sReplaceHTML=cB.content.replace(/'/g,"'");if(cB.message=="true"){showMessage({contents:sReplaceHTML,elements:microstrategy.OK_BUTTON,type:mstrMsgBoxImpl.MSG_WARNING});}var scriptArray=[],chartArray=[];var oDivNode=iframe.createElementFromHTML(sReplaceHTML);if(!oDivNode){return ;}iframe.extractScript(oDivNode,scriptArray);iframe.extractImage(oDivNode,chartArray);if(cB.errorInfo){var errorHolder=document.getElementById("errorInfo");if(errorHolder){errorHolder.innerHTML+=cB.errorInfo;}}if(cB.css=="1"){var styleId=oDivNode.getAttribute("styleid");if(!iframe.consolidatedStyles[styleId]){iframe.consolidatedStyles[styleId]="";}iframe.consolidatedStyles[styleId]=consolidateStyleSheets(oDivNode,iframe.consolidatedStyles[styleId],styleId);}else{if(oParentDiv.getAttribute(mstrHTMLAttributes.ATTR_MODAL)=="true"||(oParentDiv.popupMask)){togglePulldowns(oParentDiv,true);}if(cB.partialUpdate=="true"&&oParentDiv.childNodes.length>1){oParentDiv.innerHTML=oDivNode.innerHTML;}else{if(bIsW3C&&!bIsIE8&&!bIsIE9&&!bIsIE10&&!bIsSafari){iframe.setOuterHTML(oParentDiv,oDivNode);}else{if(oParentDiv&&oDivNode){if(cB.isFlashVis&&bIsIE8){var o=oParentDiv.getElementsByTagName("object");if(o&&o.length>0){for(var i=0;i<o.length;i++){o[i].parentNode.removeChild(o[i]);}}}oParentDiv.parentNode.replaceChild(oDivNode,oParentDiv);}if(chartArray.length>0){for(var j=0,cnt=chartArray.length;j<cnt;j++){chartArray[j].src=chartArray[j].getAttribute("dsrc");}}}}for(var i=0,len=scriptArray.length;i<len;i++){eval(scriptArray[i].toString());}}}}catch(err){microstrategy.errors.log(err);}};