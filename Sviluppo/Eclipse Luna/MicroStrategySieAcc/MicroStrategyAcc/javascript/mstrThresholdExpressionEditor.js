mstrThresholdExpressionEditorScript=true;mstrThresholdExpressionEditor.prototype=new mstrFilterEditorImpl();mstrThresholdExpressionEditor.prototype.isDndEnabled=function(){return false;};mstrThresholdExpressionEditor.prototype.editExpression=function(){try{var editor=microstrategy.findBone(this.elem.parentNode);if(editor&&"setEditorThresholdExpression" in editor){editor.setEditorThresholdExpression(this.elem);}this.appendSusbscriptionProperties();}catch(err){microstrategy.errors.log(err);return false;}};mstrThresholdExpressionEditor.prototype.appendSusbscriptionProperties=function(){var editor=microstrategy.findBone(this.elem.parentNode);if(editor&&"addSusbscriptionProperties" in editor){editor.addSusbscriptionProperties();}};mstrThresholdExpressionEditor.prototype.cancelSelectUnit=function(e){try{e=e||window.event;var um=microstrategy.updateManager;um.add([um.createActionObject(null,mstrUpdateManager.EXPRESSION_EVENT_CANCEL,this.beanPath,[],[],[],null)]);var expTbl=document.getElementById(this.id+"_area");var p=this.elem.parentNode;var editor=microstrategy.findBone(p);if(editor.selections.firstItem()&&editor.selections.firstItem().getAttribute(mstrAdvancedThresholdEditor.EXP_COUNT)>1){um.flushAndSubmitChanges();return ;}if(expTbl&&expTbl.getAttribute("emp")=="0"){var src=getEventTarget(e);var tbl=microstrategy.findParentWithTag(src,"table");if(tbl){tbl.parentNode.removeChild(tbl);}if(editor){editor.setExpViewMode();editor.onselectionchange();}}else{microstrategy.unRegisterBone(this.id);if(editor&&"onclick" in editor){editor.onclick(e);}this.postCancelSelectUnit(editor);}}catch(err){microstrategy.errors.log(err);return false;}};mstrThresholdExpressionEditor.prototype.postCancelSelectUnit=function(editorBone){try{if(!editorBone){return ;}if(editorBone&&"commands" in editorBone){editorBone.commands.exec("ateDelete");}}catch(err){microstrategy.errors.log(err);return false;}};mstrThresholdExpressionEditor.prototype.deleteSubExpression=function(key,applyNow){try{var editor=microstrategy.findBone(this.elem.parentNode);if(!editor){microstrategy.errors.log("Threshold editor not found.");return ;}var um=microstrategy.updateManager;var bp=editor.thresholdExpressionBeanPath;um.add([um.createActionObject(null,mstrUpdateManager.EXPRESSION_DELETE_SUBEXPRESSION,bp,["262144001"],[key],[],null)]);um.add([um.createActionObject(null,mstrUpdateManager.EXPRESSION_SYNCHRONIZE,bp,["262144034"],[applyNow],[],null)]);um.flushAndSubmitChanges();}catch(err){microstrategy.errors.log(err);}if(window.event){window.event.cancelBubble=true;}return false;};mstrThresholdExpressionEditor.prototype.validateThresholds=function(e){try{e=e||window.event;var editor=microstrategy.findBone(this.elem.parentNode);if(!editor){microstrategy.errors.log("Threshold editor not found.");return false;}if(!editor.validateAndShowMsg()){if(bIsIE4&&e){e.cancelBubble=true;}return false;}return true;}catch(err){microstrategy.errors.log(err);return false;}};function mstrThresholdExpressionEditor(id){this.inherits=mstrFilterEditorImpl;this.inherits(id);delete this.inherits;return this;}