mstrTabStripImplScript=true;mstrTabStripImpl.prototype=new mstrToolbarImpl();mstrTabStripImpl.prototype.path="";mstrTabStripImpl.prototype.tabContainer=null;mstrTabStripImpl.prototype.backBtn=null;mstrTabStripImpl.prototype.nextBtn=null;mstrTabStripImpl.prototype.tabInfo=null;mstrTabStripImpl.prototype.currentTabId=null;mstrTabStripImpl.prototype.timer=null;mstrTabStripImpl.prototype.interval=5;mstrTabStripImpl.prototype.increment=20;mstrTabStripImpl.prototype.newLeft=0;mstrTabStripImpl.prototype.target=0;mstrTabStripImpl.prototype.tcWidth=0;mstrTabStripImpl.prototype.tcpWidth=0;mstrTabStripImpl.prototype.mask=null;mstrTabStripImpl.prototype.dragSource=null;mstrTabStripImpl.prototype.maskFor=null;mstrTabStripImpl.prototype.maskArea=null;mstrTabStripImpl.prototype.mousedownX=0;mstrTabStripImpl.prototype.mousedownY=0;mstrTabStripImpl.prototype.dragTab=null;mstrTabStripImpl.prototype.dragDisplay=null;mstrTabStripImpl.prototype.doDrag=false;mstrTabStripImpl.prototype.controlLength=0;mstrTabStripImpl.prototype.addTab=null;mstrTabStripImpl.prototype.onload=function(){try{mstrToolbarImpl.prototype.onload.call(this);this.path="microstrategy.bone('"+this.id+"')";this.backBtn=document.getElementById(this.id+"_backBtn");this.nextBtn=document.getElementById(this.id+"_nextBtn");this.tabContainer=document.getElementById(this.id+"_container");this.elem.onmousedown=new Function("e","if ("+this.path+" != null) { return "+this.path+".onmousedown(e); }");this.elem.ondblclick=new Function("e","if ("+this.path+" != null) { return "+this.path+".ondblclick(e); }");this.initTabs();var table=this.elem.getElementsByTagName("table");if(table.length>0){table[0].style.visibility="visible";}}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.isBoneInPage=function(){try{var b=mstrBoneImpl.prototype.isBoneInPage.apply(this,arguments);if(b){var src=getElementById(this.id);b=(src&&src.childNodes.length>0);}return b;}catch(err){microstrategy.errors.log(err);return true;}};mstrTabStripImpl.prototype.getLayoutByIndex=function(index){try{if(!this.controls||index<0||index>=this.controlLength){return ;}for(var iterator in this.controls){var ctrl=this.controls[iterator];if(ctrl.getAttribute("i")==index){return ctrl;}}}catch(err){microstrategy.errors.log(err);}return null;};mstrTabStripImpl.prototype.initTabs=function(){try{if(!this.tabContainer){return ;}this.controls=new Object();var ctrls=this.tabContainer.getElementsByTagName("span");if(ctrls.length==0){microstrategy.unRegisterBone(this.id);return ;}this.controlLength=0;this.addTab=null;for(var i=0;i<ctrls.length;i++){if(ctrls[i].getAttribute(microstrategy.HTMLATTR_SUBOBJTYPE)==microstrategy.SUBOBJTYPE_BTN){if(this.isAddTab(ctrls[i])){this.addTab=ctrls[i];}else{this.controls[ctrls[i].getAttribute("id")]=ctrls[i];ctrls[i].setAttribute("i",this.controlLength);this.controlLength++;}}}var tabWidth=getObjWidth(this.tabContainer);var parentWidth=getObjWidth(this.body);if(tabWidth<parentWidth){this.backBtn.style.display="none";this.nextBtn.style.display="none";}else{this.backBtn.style.display="block";this.nextBtn.style.display="block";var vp=microstrategy.getEventHandlerString(this.path);this.backBtn.firstChild.onmousedown=new Function(vp+" { "+this.path+".startScroll(-1); }");this.nextBtn.firstChild.onmousedown=new Function(vp+" { "+this.path+".startScroll(1); }");var base=getObjSumLeft(this.tabContainer);this.tabInfo=new Object();for(var c in this.controls){this.tabInfo[c]={l:getObjSumLeft(this.controls[c])-base,w:getObjWidth(this.controls[c])};if(this.controls[c].className.indexOf("current")!=-1){this.currentTabId=c;}}this.newLeft=getObjLeft(this.tabContainer);this.tcpWidth=getObjWidth(this.tabContainer.parentNode);this.shiftMaskArea();this.tcWidth=getObjWidth(this.tabContainer);this.restoreMaskArea();if(this.tabInfo[this.currentTabId].l+this.tabInfo[this.currentTabId].w>this.tcpWidth){this.newLeft=-(this.tabInfo[this.currentTabId].l+this.tabInfo[this.currentTabId].w-this.tcpWidth);this.tabContainer.style.left=this.newLeft+"px";}if(!this.canScrollBack()){this.setButtonClass(this.backBtn.firstChild,true);}if(!this.canScrollNext()){this.setButtonClass(this.nextBtn.firstChild,true);}}this.setupMask();}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.onunload=function(e){try{this.elem.style.display="none";mstrToolbarImpl.prototype.onunload.call(this,e);}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.isAddTab=function(tab){try{return(tab&&tab.getAttribute(microstrategy.HTMLATTR_CMD_ID)==="addTab");}catch(err){microstrategy.errors.log(err);return false;}};mstrTabStripImpl.prototype.shiftMaskArea=function(){try{if(bIsW3C){this.tabContainer.style.left="-100000px";}}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.restoreMaskArea=function(){try{if(bIsW3C){this.tabContainer.style.left=this.newLeft+"px";}}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.setupMask=function(){try{var vb=microstrategy.getViewerBone();if(vb&&vb.isEditableViewModeEplus()){if(!this.mask){this.maskFor=microstrategy.OBJTYPE_ANY;this.maskArea=this.tabContainer;this.mask=new mstrTabStripMask();this.mapper=new mstrTabStripMapperImpl();this.mask.onload(this);}else{this.mask.onmaskedobjectresize();}}}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.onwinresize=function(){try{this.ondialogresize();}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.ondialogresize=function(){try{this.initTabs();}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.startScroll=function(direction){try{if(this.timer){return ;}this.direction=direction;if(this.doDrag){this.backBtn.firstChild.onmouseout=new Function(this.path+".stopScroll();");this.nextBtn.firstChild.onmouseout=new Function(this.path+".stopScroll();");}else{if(typeof (mstr)!="undefined"){this.attachWinListener(this,"mouseup","stopScroll");}else{document.onmouseup=new Function(this.path+".stopScroll();");}}if(direction>0){this.setButtonClass(this.backBtn.firstChild,false);this.scrollNext();}else{this.setButtonClass(this.nextBtn.firstChild,false);this.scrollBack();}}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.scrollBack=function(){try{this.newLeft+=this.increment;if(!this.canScrollBack()){this.tabContainer.style.left=0;this.setButtonClass(this.backBtn.firstChild,true);this.cancelScroll();return ;}else{if(this.target&&Math.abs(this.newLeft)<=this.target){this.tabContainer.style.left=-this.target+"px";this.cancelScroll();return ;}}this.tabContainer.style.left=this.newLeft+"px";this.timer=window.setTimeout(this.path+".scrollBack();",this.interval);}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.scrollNext=function(){try{this.newLeft-=this.increment;if(!this.canScrollNext()){this.tabContainer.style.left=(this.tcpWidth-this.tcWidth)+"px";this.setButtonClass(this.nextBtn.firstChild,true);this.cancelScroll();return ;}else{if(this.target&&Math.abs(this.newLeft)>=this.target){this.tabContainer.style.left=-this.target+"px";this.cancelScroll();return ;}}this.tabContainer.style.left=this.newLeft+"px";this.timer=window.setTimeout(this.path+".scrollNext();",this.interval);}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.stopScroll=function(){try{if(this.direction<0){var p=null;var t;for(t in this.tabInfo){if(this.tabInfo[t].l>Math.abs(this.newLeft)){this.target=(p)?p.l:0;break;}p=this.tabInfo[t];}}else{if(this.direction>0){for(t in this.tabInfo){if(this.tabInfo[t].l+this.tabInfo[t].w+this.newLeft>this.tcpWidth){this.target=this.tabInfo[t].l+this.tabInfo[t].w-this.tcpWidth;break;}}}}}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.cancelScroll=function(){try{if(this.doDrag){this.backBtn.firstChild.onmouseout=null;this.nextBtn.firstChild.onmouseout=null;}else{if(typeof (mstr)!="undefined"){this.detachWinListener(this,"mouseup");}else{document.onmouseup=null;}}this.newLeft=getObjLeft(this.tabContainer);this.target=null;this.timer=null;}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.canScrollBack=function(){try{return(this.newLeft<0);}catch(err){microstrategy.errors.log(err);return false;}};mstrTabStripImpl.prototype.canScrollNext=function(){try{return(this.tcWidth+this.newLeft>=this.tcpWidth);}catch(err){microstrategy.errors.log(err);return false;}};mstrTabStripImpl.prototype.setButtonClass=function(btn,disable){try{if(disable){btn.className+=" disabled";}else{btn.className=btn.className.replace(" disabled","");}}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.checkShowContextMenuOption=function(option){try{if(this.activeTab==null||this.isAddTab(this.activeTab)){return false;}var index=parseInt(this.activeTab.getAttribute("i"),10);switch(option){case"rn":return true;case"del":return(this.controlLength>1);case"ml":return(index>0);case"mr":return(index!==this.controlLength-1);case"lv":return microstrategy.getViewerBone().currentLayout==this.activeTab.getAttribute("cmdvl")&&this.isFeatureAvailable("documents-design-mode;visualizations-supported;visualizations-available-for-rw-layout;enable-vis-editor;rw-editable-view-mode-eplus");default:return false;}}catch(err){microstrategy.errors.log(err);return false;}};mstrTabStripImpl.prototype.onDeleteLayoutTab=function(){try{if(!this.activeTab){return ;}this.tabContainer.removeChild(this.activeTab);this.initTabs();}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.pivotLeft=function(pivotTab,tabToMove){if(pivotTab&&tabToMove){this.exec("moveTab",[tabToMove.getAttribute(microstrategy.HTMLATTR_CMD_VALUE),pivotTab.getAttribute(microstrategy.HTMLATTR_CMD_VALUE)]);this.tabContainer.removeChild(tabToMove);this.tabContainer.insertBefore(tabToMove,pivotTab);this.initTabs();}};mstrTabStripImpl.prototype.processContextMenu=function(option){try{if(!this.activeTab){return false;}var beforeLayout;switch(option){case"del":this.openDeleteMsgBox();break;case"ml":var indexActiveTab=parseInt(this.activeTab.getAttribute("i"));var pivotTab=this.getLayoutByIndex(indexActiveTab-1);var tabToMove=this.activeTab;this.pivotLeft(pivotTab,tabToMove);break;case"mr":var indexActiveTab=parseInt(this.activeTab.getAttribute("i"));var pivotTab=this.activeTab;var tabToMove=this.getLayoutByIndex(indexActiveTab+1);this.pivotLeft(pivotTab,tabToMove);break;case"rn":this.openRenameMsgBox();break;case"lv":toggleShowBean("visualizationsEditor",true,"activeViewID=&activeTabID="+this.activeTab.getAttribute("i"));break;default:break;}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrTabStripImpl.prototype.renameLayout=function(){try{var msgBone=microstrategy.bones.msgBox;var newName=msgBone.getInputValue();if(newName){var index=parseInt(this.activeTab.getAttribute("i"));var activeLayout=this.getLayoutByIndex(index);var cmdValue=[{cmdId:"TabName",memo:{},obj:null,performFormatChange:true,submitUpdateManager:false,value:newName,id:activeLayout.getAttribute("cmdvl")}];microstrategy.getViewerBone().commands.exec("DocPropertyChanges",cmdValue);activeLayout.textContent=newName;activeLayout.innerHTML=newName;}}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.openDeleteMsgBox=function(){try{var index=parseInt(this.activeTab.getAttribute("i"));var activeLayout=this.getLayoutByIndex(index);var layoutName=activeLayout.innerHTML;var cmdValue=this.activeTab.getAttribute(microstrategy.HTMLATTR_CMD_VALUE);showMessage({contents:microstrategy.descriptors.getDescriptor("4360"),elements:microstrategy.OK_BUTTON+microstrategy.CANCEL_BUTTON,okEval:"microstrategy.getViewerBone().commands.exec('confirmRemoveTab', "+((cmdValue)?"'"+cmdValue+"'":"null")+");",type:mstrMsgBoxImpl.MSG_WARNING,title:microstrategy.descriptors.getDescriptor("5678")+": "+layoutName});}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.openRenameMsgBox=function(){try{if(this.isAddTab(this.activeTab)){return ;}var index=parseInt(this.activeTab.getAttribute("i"));var activeLayout=this.getLayoutByIndex(index);var bone=microstrategy.bones.msgBox;if(bone){var label=microstrategy.descriptors.getDescriptor("2211");var layoutName=decode(activeLayout.innerHTML);var func="microstrategy.bones['"+this.id+"'].renameLayout()";bone.initInput(label,layoutName,60,256);bone.setButtons(microstrategy.OK_BUTTON+microstrategy.CANCEL_BUTTON,func,"");bone.setTitle(microstrategy.descriptors.getDescriptor("3371").replace("##",microstrategy.descriptors.getDescriptor("3437"))+" "+layoutName);bone.show();}}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.ondblclick=function(e){try{this.activeTab=null;if(!e){e=window.event;}var src=findTarget(getEventTarget(e),microstrategy.HTMLATTR_SUBOBJTYPE);if(!src||src.getAttribute(microstrategy.HTMLATTR_SUBOBJTYPE)!=microstrategy.SUBOBJTYPE_BTN){return ;}var mstrSrc=microstrategy.eventManager.getSource(e);if(mstrSrc){this.activeTab=src;this.openRenameMsgBox();}}catch(err){microstrategy.errors.log(err);}};mstrTabStripImpl.prototype.onmousedown=function(e){try{this.activeTab=null;if(!e){e=window.event;}var src=findTarget(getEventTarget(e),microstrategy.HTMLATTR_SUBOBJTYPE);if(!src||src.getAttribute(microstrategy.HTMLATTR_SUBOBJTYPE)!=microstrategy.SUBOBJTYPE_BTN){return false;}var mstrSrc=microstrategy.eventManager.getSource(e);this.dragTab=src;if(!microstrategy.getViewerBone().isEditableViewModeEplus()){this.selectTab(e);}else{if(mstrSrc&&mstrSrc.button>1){this.activeTab=src;}else{getMouse(e);this.mousedownX=lMouseX;this.mousedownY=lMouseY;var verifiedPath=microstrategy.getEventHandlerString(this.path);if(typeof (mstr)!="undefined"){this.attachWinListener(this,"mousemove","ondragstart");this.attachWinListener(this,"mouseup","onmouseup");}else{document.onmousemove=new Function("e",verifiedPath+" { return "+this.path+".ondragstart(e); }");document.onmouseup=new Function("e",verifiedPath+" { return "+this.path+".onmouseup(e); }");}}}}catch(err){microstrategy.errors.log(err);}e.cancelBubble=true;stopEventBubbling(e);mstr.controllers.EventManager.notifyWindowListeners({name:"mousedown",target:function(){return src;}});return false;};mstrTabStripImpl.prototype.ondragstart=function(e){try{if(!microstrategy.getViewerBone().isEditableViewModeEplus()){return ;}if(!e){e=window.event;}if(e.e){e=e.e;}getMouse(e);if(Math.abs(lMouseX-this.mousedownX)>=3||Math.abs(lMouseY-this.mousedownY)>=3){this.doDrag=true;if(this.dragDisplay==null){this.dragDisplay=document.createElement("div");this.dragDisplay.className="mstrDnDReportDragItem";document.body.appendChild(this.dragDisplay);}this.dragDisplay.innerHTML=this.dragTab.innerHTML;this.mask.toggle(true,microstrategy.OBJTYPE_ANY);var verifiedPath=microstrategy.getEventHandlerString(this.path);this.backBtn.firstChild.onmouseover=new Function(this.path+".startScroll(-1);");this.nextBtn.firstChild.onmouseover=new Function(this.path+".startScroll(1);");if(typeof (mstr)!="undefined"){this.attachWinListener(this,"mousemove","ondrag");this.attachWinListener(this,"mouseup","ondragend");}else{document.onmousemove=new Function("e",verifiedPath+" { return "+this.path+".ondrag(e); }");document.onmouseup=new Function("e",verifiedPath+" { return "+this.path+".ondragend(e); }");}this.ondrag(e);}}catch(err){microstrategy.errors.log(err);}return false;};mstrTabStripImpl.prototype.ondrag=function(e){try{if(!e){e=window.event;}if(e.e){e=e.e;}getMouse(e);this.dragDisplay.style.left=lMouseX-getObjWidth(this.dragDisplay)-6+"px";this.dragDisplay.style.top=lMouseY-getObjHeight(this.dragDisplay)-6+"px";}catch(err){microstrategy.errors.log(err);}return false;};mstrTabStripImpl.prototype.ondragend=function(e){try{if(!e){e=window.event;}if(e.e){e=e.e;}var trg=getEventTarget(e);if(trg.getAttribute&&trg.getAttribute(microstrategy.HTMLATTR_OBJTYPE)==microstrategy.OBJTYPE_MASK_MAP_AREA&&trg.getAttribute(microstrategy.HTMLATTR_POINTS_TO)!=this.dragTab.getAttribute(microstrategy.HTMLATTR_CMD_VALUE)){var pt=trg.getAttribute(microstrategy.HTMLATTR_POINTS_TO);if(pt==this.id){if(parseInt(this.dragTab.getAttribute("i"))<this.controlLength-1){this.exec("moveTab",[this.dragTab.getAttribute(microstrategy.HTMLATTR_CMD_VALUE),null]);this.tabContainer.removeChild(this.dragTab);if(this.addTab){this.tabContainer.insertBefore(this.dragTab,this.addTab);}else{this.tabContainer.appendChild(this.dragTab);}this.initTabs();}}else{var targetTab=null;for(var id in this.controls){if(this.controls[id].getAttribute(microstrategy.HTMLATTR_CMD_VALUE)==pt){targetTab=this.controls[id];break;}}var targetIndex=parseInt(targetTab.getAttribute("i"));if((targetIndex-1)!=parseInt(this.dragTab.getAttribute("i"))){this.exec("moveTab",[this.dragTab.getAttribute(microstrategy.HTMLATTR_CMD_VALUE),pt]);this.tabContainer.removeChild(this.dragTab);this.tabContainer.insertBefore(this.dragTab,targetTab);this.initTabs();}}}this.onmouseup(e);}catch(err){microstrategy.errors.log(err);}return false;};mstrTabStripImpl.prototype.onmouseup=function(e){try{if(microstrategy.bones.rwb_viewer){microstrategy.bones.rwb_viewer.doc.ondocumentclick(e);}if(typeof (mstr)!="undefined"){this.detachWinListener(this,"mousemove");this.detachWinListener(this,"mouseup");}else{document.onmousemove=null;document.onmouseup=null;}this.nextBtn.firstChild.onmouseover=null;this.backBtn.firstChild.onmouseover=null;if(this.doDrag){this.mask.toggle(false,null);this.mousedownX=0;this.mousedownY=0;this.dragTab=null;if(this.dragDisplay){this.dragDisplay.style.left="-10000px";this.dragDisplay.style.top="-10000px";}this.doDrag=false;}else{this.selectTab();}}catch(err){microstrategy.errors.log(err);}return false;};mstrTabStripImpl.prototype.onmouseover=function(e){return ;};mstrTabStripImpl.prototype.onmouseout=function(e){return ;};mstrTabStripImpl.prototype.selectTab=function(){try{if(this.getAppliesTo()==null){return true;}var obj=this.dragTab;if(obj&&obj.className.indexOf("current")==-1){var cmdId=obj.getAttribute(microstrategy.HTMLATTR_CMD_ID);if(cmdId==null){return false;}this.exec(cmdId,obj.getAttribute(microstrategy.HTMLATTR_CMD_VALUE));}}catch(err){microstrategy.errors.log(err);}return false;};mstrTabStripImpl.prototype.onselectionchange=function(e){return ;};function mstrTabStripImpl(id){this.inherits=mstrToolbarImpl;this.inherits(id);delete this.inherits;return this;}