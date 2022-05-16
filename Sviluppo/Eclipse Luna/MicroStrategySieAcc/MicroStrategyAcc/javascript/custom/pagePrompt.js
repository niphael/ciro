mstr.models.ReportInstance.prototype.execApplyPromptAnswers=function(){if(!this.checkFormatAndValidation()){this._selectFirstInvalidPrompt();return ;}this._submitAnswersToUpdateManager();var eps=this.props.extendedProperties;var messageNameModel=this.props.messageName;var historyListMsgName=messageNameModel&&messageNameModel.getValueString();microstrategy.updateManager.add([microstrategy.updateManager.createActionObject(null,mstrUpdateManager.PROMPTS_EVENT_ANSWER_ALL_PROMPTS,eps&&eps.beanPath,["8254","8255"],[historyListMsgName,true])]);var htmlForm=eps.updateManagerFormId?document.getElementById(eps.updateManagerFormId):null;if(htmlForm){var target=eps.updateManagerFormTarget;if(target!=null){htmlForm.target=target;}var names=eps.updateManagerFormRemoveInputNames;if(names){mstr.utils.Dom.removeFormInputNames(htmlForm,names);}}mstr.utils.UpdateManagerHelper.submitFormToUpdateManager(htmlForm);};mstr.models.ReportInstance.prototype.queryEnabledApplyPromptAnswers=function(){return true;};mstr.models.ReportInstance.prototype.execSavePromptAnswers=function(){if(!this.checkFormatAndValidation()){this._selectFirstInvalidPrompt();return ;}this._submitAnswersToUpdateManager();var eps=this.props.extendedProperties;var messageNameModel=this.props.messageName;var historyListMsgName=messageNameModel&&messageNameModel.getValueString();microstrategy.updateManager.add([microstrategy.updateManager.createActionObject(null,mstrUpdateManager.PROMPTS_EVENT_ANSWER_ALL_PROMPTS,eps&&eps.beanPath,["8254","8255"],[historyListMsgName,true])]);var evtCode=mstr.utils.UpdateManagerHelper.getSaveEventCodeForBeanType(eps&&eps.beanType);if(evtCode!=null){var fromDesignMode=(microstrategy.DISPLAY_MODE==microstrategy.DESIGN_MODE)?"true":"false";microstrategy.updateManager.add([microstrategy.updateManager.createActionObject(null,evtCode,microstrategy.servletName,["3013","3109","3017","3159","3160"],["true","false",fromDesignMode,eps&&eps.ownerBeanPath,"true"])]);}mstr.utils.UpdateManagerHelper.submitFormToUpdateManager();};mstr.models.ReportInstance.prototype.checkFormatAndValidation=function RI_ckFmtValid(){if(mstr.Settings.Prompts.VALIDATIONLEVEL>=mstr.Enum.Prompts.VALIDATIONLEVEL.ATRUNREPORT){var validation;if(mstr.Settings.Prompts.AUTOFORMATLEVEL>=mstr.Enum.Prompts.AUTOFORMATLEVEL.BEFORERUNREPORT){validation=this.format&&this.format();}else{validation=this.validate&&this.validate();}if(validation&&validation.statusCode!=mstr.Enum.Validation.STATUSCODE.VALID){return false;}}return true;};mstr.models.ReportInstance.prototype.queryEnabledSavePromptAnswers=function(){return true;};mstr.models.ReportInstance.prototype.execCancelPrompt=function(){var eps=this.props.extendedProperties;var evtCode=mstr.utils.UpdateManagerHelper.getCancelEventCodeForBeanType(eps&&eps.beanType,!!(eps&&eps.isReprompt));if(evtCode!=null){microstrategy.updateManager.add([microstrategy.updateManager.createActionObject(null,evtCode,eps&&eps.beanPath,[],[])]);}mstr.utils.UpdateManagerHelper.submitFormToUpdateManager();};mstr.models.ReportInstance.prototype.execValidateCurrentPrompt=function(context){if(mstr.Settings.Prompts.VALIDATIONLEVEL>=mstr.Enum.Prompts.VALIDATIONLEVEL.ATRUNREPORT){var pqs=this.props.promptQuestions;if(pqs&&pqs.get("stack")){var pq=pqs.getSelectedItem();if(pq&&pq.props.answer&&pq.props.answer.validate){return(pq.props.answer.validate(context)==mstr.Enum.Validation.STATUSCODE.VALID);}}}return true;};mstr.models.ReportInstance.prototype.queryEnabledCancelPrompt=function(){return true;};mstr.models.ReportInstance.prototype._selectFirstInvalidPrompt=function(){var pqs=this.props.promptQuestions.getItems();var len=mstr.$A.len(pqs);if(!len){return ;}for(var i=0;i<len;i++){var pq=pqs[i];if(!pq){continue;}var status=pq.props.answer&&pq.props.answer.props.validationStatus&&pq.props.answer.props.validationStatus.statusCode;if(status!=mstr.Enum.Validation.STATUSCODE.VALID){this.props.promptQuestions.execCommand("SingleSelect",i);break;}}};mstr.models.ReportInstance.prototype._submitAnswersToUpdateManager=function(){var pqs=this.props.promptQuestions.getItems();var len=mstr.$A.len(pqs);if(!len){return ;}var UMH=mstr.utils.UpdateManagerHelper;for(var i=0;i<len;i++){var pq=pqs[i];if(!pq){continue;}var answerValueString=pq.props.answer&&pq.props.answer.getValueString();if(answerValueString!=null){var eps=pq.props.extendedProperties;var ansRes=pq.props.answerRestriction;var action=null;if(ansRes=="-1"){action=(pq&&pq.props.savingAnswer)?"add":null;}else{if(ansRes=="1"){action=(pq&&pq.props.savingAnswer)?"add":"del";}}var savedAnswer=(action==null)?null:pq.props.answer&&pq.props.answer.props.container;UMH.addPromptEvent(null,mstrUpdateManager.PROMPT_EVENT_ANSWER_PROMPT,eps&&eps.beanPath,["4098001","4098002","4098003","4098010","4098011","4098012","4098013","4098014","4098015"],[eps&&eps.answerOption,eps&&eps.answerFormat,answerValueString,savedAnswer?savedAnswer.n:"",savedAnswer?(savedAnswer.isDefault?"1":"0"):"0",savedAnswer?savedAnswer.dssid:"","",savedAnswer?(savedAnswer.isAutoClose?"1":"0"):"0",action],null,null,pq.props.index);}}};