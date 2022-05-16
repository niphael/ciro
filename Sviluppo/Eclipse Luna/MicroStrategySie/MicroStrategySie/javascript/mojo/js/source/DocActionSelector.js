(function(){mstrmojo.requiresCls("mstrmojo.DocSelector","mstrmojo.Button","mstrmojo.base64","mstrmojo.Dialog");mstrmojo.requiresDescs(1442,2140,5369,8233,8232,8313,8322);var SUBMIT=8,RECALCULATE=16,DISCARD=4,DISPLAY_MSG=1,REEXECUTE_DOCUMENT=8,EXECUTE_OBJECT=16,FORCE_LIVE_EXECUTION=268435456,INVALID_CLIENT_CACHE=536870912,AUTO_ANSWER_PROMPT=1073741824,useMojoDialog=window.mstrConfig&&!window.mstrConfig.simpleDialog,SUBMIT_ERROR_VALIDATION_FAILURE=2147755235,SUBMIT_ERROR_NO_CHANGE=2147755236;var $NIB=mstrmojo.Button.newInteractiveButton;function confirmMsg(msg,okFn,cancelFn,okText,cancelText){if(useMojoDialog){var buttons=[$NIB(okText||mstrmojo.desc(1442),okFn||null,null),$NIB(cancelText||mstrmojo.desc(2140),cancelFn||null,null)];mstrmojo.confirm(msg,mstrApp.useBinaryFormat?buttons.reverse():buttons);}else{if(mstrmojo.confirm(msg)){if(okFn){okFn();}}else{if(cancelFn){cancelFn();}}}}function alertMsg(msg,okFn){if(useMojoDialog){mstrmojo.alert(msg,okFn);}else{mstrmojo.alert(msg);if(okFn){okFn();}}}mstrmojo.DocActionSelector=mstrmojo.declare(mstrmojo.DocSelector,null,{scriptClass:"mstrmojo.DocActionSelector",extCls:"mstrmojo-ActionSelector",type:SUBMIT,targets:null,initControlInfo:function initControlInfo(){var defn=this.node.defn;this.aa=parseInt(defn.aa,10);this.dpTxt=defn.dpTxt||{8:mstrmojo.desc(5369),4:mstrmojo.desc(8233),16:mstrmojo.desc(8232)}[this.aa]||"";this.dpCfm=defn.dpCfm;this.sac=parseInt(defn.sac,10);this.msg=defn.msg;this.rsid=defn.rsid;this.rst=defn.rst;this.node.data.elms=[{n:this.dpTxt,v:this.dpTxt}];this._super();},selectorControlChange:function selectorControlChange(w){if(w.selectedIndex!==0){return ;}this.executeAction();w.select([]);},executeAction:function executeAction(){var aa=this.aa,me=this;if(aa===SUBMIT){if(this.dpCfm){confirmMsg(mstrmojo.desc(8313),function(){me.onControllerCheck();});}else{me.onControllerCheck();}}else{if(aa===DISCARD){if(this.dpCfm){confirmMsg(mstrmojo.desc(8322),function(){me.onDiscard();});}else{me.onDiscard();}}else{this.onRecalculate();}}},onControllerCheck:function onControllerCheck(){this.onCommit();},onCommit:function onCommit(){var me=this,md=this.model,ctl=me.controller,useBinaryMode=mstrApp.useBinaryFormat;if(!useBinaryMode&&!this.validateRequiredObjects()){alertMsg(mstrmojo.desc(9200));return ;}var executeActions=function(res){if((me.sac&INVALID_CLIENT_CACHE)>0){ctl.invalidClientCache();}if((me.sac&EXECUTE_OBJECT)>0){var params={did:me.rsid,objType:me.rst,forceExec:(me.sac&FORCE_LIVE_EXECUTION)>0};if((me.sac&AUTO_ANSWER_PROMPT)>0){params.linkAnswers='<hl mid="'+md.mid+'" srct="2" aopam="1"><prms></prms></hl>';}ctl.onExecuteNewObject(me,params);}else{if((me.sac&REEXECUTE_DOCUMENT)>0){ctl.onReExecute(me);}else{if(mstrApp.isMobile){ctl.generateActionToolbar();}md.transactionUpdate(res);}}};mstrmojo.mask.show("Running");md.sendTransactionActions(this.ck,SUBMIT,md.newCallback({success:function(res){mstrmojo.mask.hide();if(md.txrcd||res.offln){ctl.offlineTransactionsSubmitted(me.ck);}if(res.offln){if(useBinaryMode&&!me.networkToastShowed){me.networkToastShowed=true;mstrmojo.toast(mstrmojo.desc(9258,"No Network Connectivity")+". "+mstrmojo.desc(9259,"Transaction will be submitted when connectivity is resumed."));}md.transactionUpdate(res);}else{if((me.sac&DISPLAY_MSG)>0&&me.msg){if(useBinaryMode){mstrmojo.toast(me.msg);window.setTimeout(function(){executeActions(res);},100);}else{alertMsg(me.msg,function(){executeActions(res);});}}else{executeActions(res);}}},failure:function(res){var alertDialog=mstrmojo.all.mojoAlertx9;if(alertDialog){alertDialog.destroy();}mstrmojo.mask.hide();if(md.txrcd){ctl.offlineTransactionsSubmitted(me.ck);}var errCode=4294967296+parseInt(res.code,10);if(errCode===SUBMIT_ERROR_VALIDATION_FAILURE){if(useBinaryMode){me.validateRequiredObjects();}alertMsg(mstrmojo.desc(9200,"You have some required inputs that are not modified."));}else{if(errCode===SUBMIT_ERROR_NO_CHANGE){var msg=mstrmojo.desc(9201,"You haven't made any changes to submit.");if(useBinaryMode){mstrmojo.toast(msg);}else{alertMsg(msg);}}else{alertMsg(mstrmojo.base64.decodeHttpHeader(res.message),function(){if(!useBinaryMode){me.controller.onReExecute(me,true);}});}}}}));},onDiscard:function onDiscard(){var me=this,md=this.model,ctl=me.controller;md.txDiscardTargets=this.getTxTargets();md.sendTransactionActions(this.ck,DISCARD,{success:function(res){md.transactionUpdate(res);ctl.transactionDiscarded(me.ck);},complete:function(){delete md.txDiscardTargets;if(mstrApp.isMobile){ctl.generateActionToolbar();}}});},onRecalculate:function onRecalculate(){this.model.sendTransactionActions(this.ck,RECALCULATE);},getTxTargets:function getTxTargets(){var keys=this.tks.split("\u001E"),i,len,key,wid,w,j,res={};for(i=0,len=keys.length;i<len;i++){key=keys[i];wid=1;do{w=this.model.getUnitInstance(key,wid++);if(w&&w.checkRequiredObjects){if(w.isPanelStack){for(j in w.txWidgets){res[w.txWidgets[j].id]=1;}}else{res[w.id]=1;}}else{break;}}while(true);}return res;},validateRequiredObjects:function validateRequiredObjects(){var flag=true,id;for(id in this.getTxTargets()){flag=mstrmojo.all[id].checkRequiredObjects()&&flag;}return flag;}});}());