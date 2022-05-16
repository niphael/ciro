mstrPromptDefTabManImplScript=true;mstrPromptDefTabManImpl.prototype=new mstrFormatImpl();mstrPromptDefTabManImpl.prototype.attributeFieldID="ep_att_name";mstrPromptDefTabManImpl.prototype.filterCheckBoxID="ep_elem_restriction_filter";mstrPromptDefTabManImpl.prototype.filterTextFieldID="ep_filter_name";mstrPromptDefTabManImpl.prototype.processValidation=true;mstrPromptDefTabManImpl.prototype.confirmMessage=null;mstrPromptDefTabManImpl.prototype.isChanged=false;mstrPromptDefTabManImpl.prototype.isSaved=false;mstrPromptDefTabManImpl.prototype.validateInputs=function(validateChildren){var at=this.getAppliesTo();var promptType=at.webPromptType;var succeed=true;if(microstrategy.bone("tabPromptQId")!=null){succeed=microstrategy.bone("tabPromptQId").validateInputs();if(!succeed){return succeed;}}succeed=microstrategy.bone("tabPromptDispId").validateInputs();if(!succeed){return succeed;}var errorMessage="";var inputs=this.elem.getElementsByTagName("SELECT");for(var i=0;i<inputs.length;i++){errorMessage=this.validateField(inputs[i],errorMessage);}if(errorMessage!=null&&errorMessage.length>0){showMessage({contents:errorMessage,elements:microstrategy.OK_BUTTON,type:mstrMsgBoxImpl.MSG_ERROR});return false;}this.validateChildren=validateChildren;return mstrFormatImpl.prototype.validateInputs.call(this,validateChildren);};mstrPromptDefTabManImpl.prototype.validateAttributeForAEPrompt=function(field,message){if(field.value==null||trim(field.value)==""){message=message+microstrategy.descriptors.getDescriptor("5721");}return message;};mstrPromptDefTabManImpl.prototype.validateField=function(field,message){var at=this.getAppliesTo();var promptType=at.webPromptType;if(promptType==mstrPromptDefImpl.ELEMENTS_PROMPT&&this.processValidation){if(field.id==this.attributeFieldID){message=this.validateAttributeForAEPrompt(field,message);if(message!=null&&message.length>0){return message;}}}if(field.type.substr(0,6)=="select"){var fieldId=field.getAttribute(mstrHTMLAttributes.ATTR_FLDID);var fieldName=null;if(typeof (fieldId)!="undefined"&&fieldId!=null){fieldName=microstrategy.descriptors.getDescriptor(fieldId);}if(fieldName==null){fieldName=field.getAttribute(mstrHTMLAttributes.ATTR_FLD);}var bCheck=true;if(field.getAttribute(microstrategy.HTMLATTR_CMD_ID)!=null){if(field.getAttribute(mstrHTMLAttributes.ATTR_DPN)){var oDepRadio=getObj(field.getAttribute(mstrHTMLAttributes.ATTR_DPN));if(oDepRadio){bCheck=(oDepRadio.length)?oDepRadio[field.getAttribute(mstrHTMLAttributes.ATTR_DPNND)].checked:oDepRadio.checked;}}if(bCheck){if(field.getAttribute(mstrHTMLAttributes.ATTR_NOZEROSTR)!=null&&field.options.length==0){message+=microstrategy.descriptors.getDescriptor("5721")+"<br />";}}}return message;}else{var tab=field.getAttribute("tab");if(this.validateChildren||(tab&&(tab==this.currentTab))){return mstrEditorImpl.validateField(field,message);}else{return message;}}};mstrPromptDefTabManImpl.prototype.okFilterEditorChanges=function(cmdID){try{var bValid=true;bValid=this.validateInputs(true);if(bValid){this.close();this.applyPropertyChanges(cmdID,false);var at=this.getAppliesTo();if(at.commands.filterBeanPath&&microstrategy.bone("fexb_pane")&&this.hasChanged()){microstrategy.bone("fexb_pane").filterExpChanged=true;}at.commands.exec("processCommandsInFilterEditor");for(var counter=0;counter<this.childrenTabs.length;counter++){this.childrenTabs[counter].cleanup();}this.actionId=null;microstrategy.unRegisterBone(this.id);}}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabManImpl.prototype.closeEditor=function(){try{mstrEditorImpl.prototype.closeEditor.call(this);microstrategy.updateManager.flushAndSubmitChanges();}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabManImpl.prototype.hasChanged=function(){try{if(this.isChanged==true){return true;}var at=this.getAppliesTo();if(!this.isSaved&&(at.isNew==true||at.isDirty==true)){this.isChanged=true;return true;}for(var i=0;i<this.childrenTabs.length;i++){var aChildTab=this.childrenTabs[i];if(aChildTab.hasChanged()){this.isChanged=true;break;}}return this.isChanged;}catch(err){microstrategy.errors.log(err);return false;}};mstrPromptDefTabManImpl.prototype.onClose=function(){if(this.hasChanged()){var applyJS="if(microstrategy.bone('promptTabMgr_PromptDialogStyle').applyPropertyChanges('processCommands')) {var um = microstrategy.updateManager;um.setUseIFrame(false);um.add([um.createActionObject(null, mstrUpdateManager.SAVE_OBJECT,\""+this.targetBeanPath+'", ["89001"], ["1"], [], null)]);um.flushAndSubmitChanges();}';var okJS='var um = microstrategy.updateManager; um.setUseIFrame(false);um.add([um.createActionObject(null, mstrUpdateManager.RETURN_TO, "'+this.beanPath+'", ["3140"], ["-1"], [], null)]);um.flushAndSubmitChanges();';var buttonLabels={Ok:microstrategy.descriptors.getDescriptor("218"),Cancel:null,Apply:microstrategy.descriptors.getDescriptor("219")};showMessage({contents:this.confirmMessage,elements:microstrategy.OK_BUTTON+microstrategy.CANCEL_BUTTON+microstrategy.APPLY_BUTTON,okEval:okJS,title:microstrategy.descriptors.getDescriptor("5728"),applyEval:applyJS,buttonLabels:buttonLabels});}else{var um=microstrategy.updateManager;um.setUseIFrame(false);um.add([um.createActionObject(null,mstrUpdateManager.RETURN_TO,this.beanPath,["3140"],["-1"],[],null)]);um.flushAndSubmitChanges();}};mstrPromptDefTabManImpl.prototype.onSave=function(){if(this.applyPropertyChanges("processCommands")){var um=microstrategy.updateManager;um.add([um.createActionObject(null,mstrUpdateManager.SET_CURRENT_TAB,this.beanPath,["49001","49002"],[this.currentTab,false])]);um.add([um.createActionObject(null,mstrUpdateManager.SAVE_OBJECT,this.targetBeanPath,["89001"],["0"],[],null)]);um.flushAndSubmitChanges();}};mstrPromptDefTabManImpl.prototype.onSaveAs=function(){if(this.applyPropertyChanges("processCommands")){var um=microstrategy.updateManager;um.add([um.createActionObject(null,mstrUpdateManager.SET_CURRENT_TAB,this.beanPath,["49001","49002"],[this.currentTab,false])]);um.add([um.createActionObject(null,mstrUpdateManager.SAVEAS_OBJECT,this.targetBeanPath,[],[],[],null)]);um.flushAndSubmitChanges();}};mstrPromptDefTabManImpl.prototype.addSetTabEvent=function(renderTabContentOnly){};function mstrPromptDefTabManImpl(id){this.inherits=mstrFormatImpl;this.inherits(id);this.inherits=null;return this;}