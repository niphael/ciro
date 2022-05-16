mstrHorizontalContainerImpl.prototype=new mstrBoneImpl();mstrHorizontalContainerImpl.prototype.path="";mstrHorizontalContainerImpl.prototype.verifiedPath="";mstrHorizontalContainerImpl.prototype.height=-1;mstrHorizontalContainerImpl.prototype.oldHeight=-1;mstrHorizontalContainerImpl.prototype.subSections=null;mstrHorizontalContainerImpl.prototype.titles=null;mstrHorizontalContainerImpl.prototype.subHandles=null;mstrHorizontalContainerImpl.prototype.onload=function(e){try{this.initBone();this.verifiedPath=microstrategy.getEventHandlerString(this.path);this.subSections=microstrategy.findChildrenWithAtt(this.elem,"div",microstrategy.HTMLATTR_OBJTYPE,microstrategy.OBJTYPE_DOC_SUBSECTION);this.titles=microstrategy.findChildrenWithAtt(this.elem,"div",microstrategy.HTMLATTR_SUBOBJTYPE,microstrategy.SUBOBJTYPE_TITLEBAR);this.subHandles=microstrategy.findChildrenWithAtt(this.elem,"div",microstrategy.HTMLATTR_SUBOBJTYPE,microstrategy.SUBOBJTYPE_SUBSECTION_HANDLE);return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrHorizontalContainerImpl.prototype.propogateHeightToChildren=function(){try{if(this.height==-1){for(var i=0,cnt=this.subSections.length;i<cnt;i++){var h=parseInt(microstrategy.styleObj.getValue(this.subSections[i],"height"));if(h){this.height=h;break;}}}if(this.height!=-1){var subBone;var format=mstrFormatObject;this.elem.style.height=this.height+"px";if(bIsIE7){var that=this;var f=function(){var currPosition=that.elem.currentStyle.position;that.elem.style.position="absolute";that.elem.style.position=currPosition;};window.setTimeout(f,0);}var newHeightValue=format.encodeValue("height",this.height);if(this.elem&&this.elem.childNodes&&this.subSections){for(var i=0;i<this.subSections.length;i++){this.subSections[i].style.height=this.height+"px";subBone=microstrategy.findBone(this.subSections[i]);if(subBone){this.parentBone.resizeSubMaskForHorizontalContainer&&this.parentBone.resizeSubMaskForHorizontalContainer(this.id,this.height-this.oldHeight,"height");if(this.height>0){this.parentBone.hideSubMaskForHorizontalContainer&&this.parentBone.hideSubMaskForHorizontalContainer(this.id,false);}microstrategy.styleObj.setAttValue(subBone.elem,microstrategy.HTMLATTR_HEIGHT,newHeightValue);this.parentBone.parentBone.resize100HMObjects(subBone.id,this.subSections[i]);}}this.oldHeight=this.height;}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrHorizontalContainerImpl.prototype.adjustSubsectionHeight=function(fromEditor){try{var subBone;var format=mstrFormatObject;if(this.elem&&this.elem.childNodes&&this.subSections){for(var i=0;i<this.subSections.length;i++){subBone=microstrategy.findBone(this.subSections[i]);if(subBone&&subBone.adjustSubsectionHeight){subBone.adjustSubsectionHeight(fromEditor);}}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrHorizontalContainerImpl.prototype.getRightMostPos=function(){try{var rightX=0;for(var i=0;i<this.subSections.length;i++){rightX=rightX+parseInt(microstrategy.styleObj.getValue(this.subSections[i],"width"));}for(var i=0;i<this.titles.length;i++){rightX=rightX+getObjWidth(this.titles[i]);}for(var i=0;i<this.subHandles.length;i++){rightX=rightX+getObjWidth(this.subHandles[i]);}return rightX;}catch(err){microstrategy.errors.log(err);return -1;}};mstrHorizontalContainerImpl.prototype.resetHeight=function(){try{this.height=-1;}catch(err){microstrategy.errors.log(err);return -1;}};mstrHorizontalContainerImpl.prototype.onmousedown=function(e){try{if(!e){e=window.event;}var src=getEventTarget(e);var docviewer=this.parentBone.parentBone;var newSrc=microstrategy.findAncestorWithAtt(src,microstrategy.HTMLATTR_SUBOBJTYPE,microstrategy.SUBOBJTYPE_SUBSECTION_HANDLE);this.currentHCont=microstrategy.findAncestorWithAtt(src,microstrategy.HTMLATTR_OBJTYPE,microstrategy.OBJTYPE_DOC_PARENT_HORIZONTAL_CONTAINER);var mstrSrc=microstrategy.eventManager.getSource(e);if(this.currentHCont){this.prevSec=this.currentHCont.previousSibling;}if(mstrSrc&&mstrSrc.button==2){}else{if(!docviewer.isFeatureAvailable(microstrategy.FEATURE_DOCUMENTS_DESIGN_MODE)){return true;}if(newSrc&&((icon=microstrategy.subObjectFind(this.prevSec,["IMG"],"cimg"))&&icon.src.indexOf("treeCollapse.gif")>-1)||microstrategy.DISPLAY_MODE==microstrategy.VIEW_MODE){if(typeof (mstr)!="undefined"){this.attachWinListener(this,"mousemove","ondragstart");this.attachWinListener(this,"mouseup","onmouseup");}else{document.onmousemove=new Function("e",this.verifiedPath+" { return "+this.path+".ondragstart(e); }");document.onmouseup=new Function("e",this.verifiedPath+" { return "+this.path+".onmouseup(e); }");}}this.parentBone.selections.clear();}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrHorizontalContainerImpl.prototype.ondragstart=function(e){try{if(!e){e=window.event;}if(e.e){e=e.e;}getMouse(e);if(this.currentHCont){var doc=this.parentBone.elem;var conList=microstrategy.objectListFind(this.prevSec,["DIV"],microstrategy.OBJTYPE_DOC_SUBSECTION_CONTAINER);if(conList==null||conList.length==0){return true;}var con=conList[conList.length-1];this.prevSubElem=con.lastChild;this.prevRuler=con.firstChild;this.prevSubBone=microstrategy.findBone(this.prevSubElem);if(this.prevSubBone){this.prevSubBone.oldHeight=getObjHeight(this.prevSubElem);this.prevSubBone.oldCanGrow=microstrategy.styleObj.getAttValue(this.prevSubElem,microstrategy.HTMLATTR_CAN_GROW);this.prevSubBone.oldCanShrink=microstrategy.styleObj.getAttValue(this.prevSubElem,microstrategy.HTMLATTR_CAN_SHRINK);this.prevSubBone.oldHideIfEmpty=microstrategy.styleObj.getAttValue(this.prevSubElem,microstrategy.HTMLATTR_HIDE_IF_EMPTY);}if(typeof (mstr)!="undefined"){this.attachWinListener(this,"mousemove","ondrag");this.attachWinListener(this,"mouseup","ondragend");}else{document.onmousemove=new Function("e",this.verifiedPath+" { return "+this.path+".ondrag(e); }");document.onmouseup=new Function("e",this.verifiedPath+" { return "+this.path+".ondragend(e); }");}this.ondrag(e);}}catch(err){microstrategy.errors.log(err);}return false;};mstrHorizontalContainerImpl.prototype.ondrag=function(e){try{if(!e){e=window.event;}if(e.e){e=e.e;}getMouse(e);var scrollTop=this.parentBone.parentBone.elem.scrollTop;if(this.prevSubElem){var posY=lMouseY+scrollTop-getObjSumTop(this.currentHCont);var n=getObjHeight(this.prevSubElem)+posY;if(n>=0){if(this.prevRuler){this.prevRuler.style.height=n+"px";}this.prevSubElem.style.height=n+"px";}}}catch(err){microstrategy.errors.log(err);}return false;};mstrHorizontalContainerImpl.prototype.ondragend=function(e){try{if(!e){e=window.event;}if(e.e){e=e.e;}this.prevSubBone.resize(getObjHeight(this.prevSubElem),true,null);this.onmouseup(e);var fa=microstrategy.DISPLAY_MODE!=microstrategy.DESIGN_MODE&&this.parentBone.parentBone.formattingAttributes;if(fa){var id=this.prevSubBone.id;fa[id][microstrategy.HTMLATTR_CAN_SHRINK]=microstrategy.FALSE;fa[id][microstrategy.HTMLATTR_CAN_GROW]=microstrategy.FALSE;fa[id][microstrategy.HTMLATTR_HIDE_IF_EMPTY]=microstrategy.FALSE;}}catch(err){microstrategy.errors.log(err);}return false;};mstrHorizontalContainerImpl.prototype.onmouseup=function(e){try{if(typeof (mstr)!="undefined"){this.detachWinListener(this,"mousemove");this.detachWinListener(this,"mouseup");}else{document.onmousemove=null;document.onmouseup=null;}}catch(err){microstrategy.errors.log(err);}return false;};mstrHorizontalContainerImpl.prototype.getLastNonCollapsedSection=function(e){try{var sections=microstrategy.findChildrenWithAtt(this.elem,"div",microstrategy.HTMLATTR_OBJTYPE,microstrategy.OBJTYPE_DOC_SECTION);if(sections){for(var i=sections.length-1;i>=0;i--){var secBone=microstrategy.findBone(sections[i]);if(secBone.isCollapsed==false){return sections[i];}}}return null;}catch(err){microstrategy.errors.log(err);}return false;};function mstrHorizontalContainerImpl(id){this.inherits=mstrBoneImpl;this.inherits(id);this.inherits=null;return this;}