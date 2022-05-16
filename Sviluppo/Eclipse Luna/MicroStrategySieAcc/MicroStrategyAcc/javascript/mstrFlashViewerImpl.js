mstrFlashViewerCommands.prototype=new mstrViewerCommandsImpl();mstrFlashViewerCommands.prototype.exec=function(cmdId,cmdValue,allPanels){switch(cmdId){case"gridMode":case"graphMode":case"gridGraphMode":case"visFlashMode":case"visAjaxMode":case"visualizationMode":return mstrStaticDoc.getBone(this.parentBone.gridSpan).commands.exec(cmdId,cmdValue,allPanels);default:return mstrViewerCommandsImpl.prototype.exec.apply(this,[cmdId,cmdValue,allPanels]);}};mstrFlashViewerCommands.prototype.queryState=function(cmdId,allPanels){switch(cmdId){case"gridMode":case"graphMode":case"gridGraphMode":case"visFlashMode":case"visAjaxMode":case"visualizationMode":return mstrStaticDoc.getBone(this.parentBone.gridSpan).commands.queryState(cmdId,allPanels);case"gridType":return"flash";default:return mstrViewerCommandsImpl.prototype.queryState.apply(this,[cmdId,allPanels]);}};mstrFlashViewerCommands.prototype.queryEnabled=function(cmdId,cmdValue){switch(cmdId){case"gridMode":case"graphMode":case"gridGraphMode":case"visFlashMode":case"visAjaxMode":case"visualizationMode":return mstrStaticDoc.getBone(this.parentBone.gridSpan).commands.queryEnabled(cmdId,cmdValue);default:return mstrViewerCommandsImpl.prototype.queryEnabled.apply(this,[cmdId,cmdValue]);}};mstrFlashViewerCommands.prototype.queryVisible=function(cmdId){switch(cmdId){case"gridMode":case"graphMode":case"gridGraphMode":case"visFlashMode":case"visAjaxMode":case"visualizationMode":return mstrStaticDoc.getBone(this.parentBone.gridSpan).commands.queryVisible(cmdId);default:return mstrViewerCommandsImpl.prototype.queryVisible.apply(this,[cmdId]);}};function mstrFlashViewerCommands(bone){this.parentBone=bone;return this;}mstrFlashViewerImplScript=true;mstrFlashViewerImpl.prototype=new mstrBoneImpl();mstrFlashViewerImpl.prototype.resizeHeight=false;mstrFlashViewerImpl.prototype.titleBarObj=null;mstrFlashViewerImpl.prototype.flashID="MstrFlash";mstrFlashViewerImpl.prototype.onload=function(){try{if(microstrategy.EXECUTION_SCOPE==microstrategy.RWD_EXECUTION){this.commands=new mstrFlashViewerCommands(this);this.observer=microstrategy.viewerObserver||new mstrObserverImpl();microstrategy.viewerObserver=this.observer;}mstrBoneImpl.prototype.onload.call(this);}catch(err){microstrategy.errors.log(err);}};mstrFlashViewerImpl.prototype.onpostload=function(){try{this.onwinresize();var gridSpan=this.getGridContainerSpan();if(gridSpan){this.titleBarObj=this.titleBarObj||microstrategy.findChildWithAtt(gridSpan,"DIV",microstrategy.HTMLATTR_SUBOBJTYPE,microstrategy.SUBOBJTYPE_CONTAINER_TITLEBAR);}}catch(err){microstrategy.errors.log(err);return false;}};mstrFlashViewerImpl.prototype.getGridContainerSpan=function(){try{if(!this.gridSpan){this.gridSpan=microstrategy.findAncestorWithAtt(this.elem,microstrategy.HTMLATTR_SUBOBJTYPE,microstrategy.SUBOBJTYPE_DOC_TEMPLATE);}return this.gridSpan;}catch(err){microstrategy.errors.log(err);return false;}};mstrFlashViewerImpl.prototype.onwinresize=function(){try{if(this.resizeHeight){var id=this.id;var fid=this.flashID;var fo=document.getElementsByName(fid)[0];if(!fo||!microstrategy.bone(id)){window.setTimeout(function(){microstrategy.bone(id).onwinresize();},10);return ;}var fnResize=function(){var dockBottom=getElementById("mstrWeb_dockBottom");var dockFooter=getElementById("mstrWeb_footer");fo.height=Math.max(getClientHeight()-getObjSumTop(microstrategy.bone(id).elem)-getObjHeight(dockBottom)-getObjHeight(dockFooter)-2,300);if(bIsChrome){fo.width="100%";fo.width=mstr.utils.BoxModel.position(getElementById(id)).width;}else{if(mstr&&mstr.utils&&mstr.utils.ISIE7){var mainTable=getElementById("mstrWebContentTable");if(mainTable){mainTable.style.width="100%";}}}};if(bIsChrome){var b=microstrategy.bone("rwb_RWAnalysisSWFStyle");if(b){var c=b.commands,cssId="chrome_ive";if(c&&c.queryState("rwCurrentViewMode")==microstrategy.RW_VIEW_MODE_VIEWANALYSIS&&!document.getElementById(cssId)){var style=document.createElement("style");style.id=cssId;style.type="text/css";style.textContent="html {overflow:hidden;}";document.getElementsByTagName("head")[0].appendChild(style);}}if(this.tmr){window.clearTimeout(this.tmr);}this.tmr=window.setTimeout(function(){fnResize();},500);}else{fnResize();}}}catch(err){microstrategy.errors.log(err);return false;}};mstrFlashViewerImpl.prototype.exec=function(){return false;};function mstrFlashViewerImpl(id){this.inherits=mstrBoneImpl;this.inherits(id);this.inherits=null;this.primaryBone=true;return this;}