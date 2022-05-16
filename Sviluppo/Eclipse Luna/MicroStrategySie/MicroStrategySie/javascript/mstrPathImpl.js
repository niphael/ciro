mstrPathImplScript=true;mstrPathImpl.prototype=new mstrBoneImpl();mstrPathImpl.prototype.commands=null;mstrPathImpl.prototype.openHistoryPageEvent="";mstrPathImpl.prototype.openHistoryPageEventID="";mstrPathImpl.prototype.openHistoryPageEventArgumentID="";mstrPathImpl.prototype.openHistoryPageEventArgumentName="";mstrPathImpl.prototype.pathSize=0;mstrPathImpl.PINNED_CLASS="pinned";mstrPathImpl.PADDING=23;mstrPathImpl.prototype.onload=function(){try{mstrBoneImpl.prototype.onload.call(this);this.commands=new mstrPathCommandsImpl(this);this.onwinresize();}catch(err){microstrategy.errors.log(err);}};mstrPathImpl.prototype.onwinresize=function(){try{if(window.mstrInterfacePlugin){if(microstrategy.pageScreenMode==microstrategy.PAGE_FULL_SCREEN_MODE){return ;}var bid=this.id;this.pathBar=microstrategy.findAncestorWithAtt(this.elem,"id","mstrWeb_path");this.footerBar=microstrategy.findAncestorWithAtt(this.elem,"id","mstrWeb_footer");if(!this.pathBar&&!this.footerBar){return ;}if(mstr.utils.ISIE8&&this.pathBar){this.pathBar.className=this.pathBar.className.replace(/ ie8/,"")+" ie8";}this.pathPin=this.findChildByCssClass(this.elem,"mstrPathPin");if(this.pathPin){this.pathPin.onclick=function(e){microstrategy.bone(bid).pinPath(e);};}this.pathText=this.findChildByCssClass(this.elem,"mstrPathText");if(this.pathText){this.pathText.onclick=function(e){microstrategy.bone(bid).pinPath(e);};this.pathAncestor=this.findChildByCssClass(this.pathText,"mstrPathTextAncestors"),this.pathCurrent=this.findChildByCssClass(this.pathText,"mstrPathTextCurrent");}this.closeIcon=this.findChildByCssClass(this.footerBar,"mstrFooterPathClose","div");if(this.closeIcon){this.closeIcon.onclick=function(e){microstrategy.bone(bid).toggleFooterPath(e);};}var me=this;window.setTimeout(function(){me.resizePathBar();},10);}}catch(err){microstrategy.errors.log(err);}};mstrPathImpl.prototype.getAvailWidth=function(){try{var BM=mstr.utils.BoxModel,dcw=document.body.clientWidth,rootNode=this.pathBar||this.footerBar,searchBox=microstrategy.findChildWithAtt(rootNode,"div","id","mstrSearchSuggest"),helpIcon=this.findChildByCssClass(rootNode,"mstrHelpShortcut","span"),closeIcon=this.findChildByCssClass(rootNode,"mstrFooterPathClose","div"),rightNode=searchBox||helpIcon||closeIcon,rightPos=Math.min(rightNode?BM.position(rightNode).left:dcw,dcw),pathIcons=this.findChildByCssClass(rootNode,"mstrPathIcons");if(pathIcons){var iconsPos=BM.position(pathIcons),leftPos=iconsPos.left+iconsPos.width,width=rightPos-leftPos-20;return Math.max(width,0);}else{return 0;}}catch(err){microstrategy.errors.log(err);return 0;}};mstrPathImpl.prototype.resizePathBar=function(){try{var pathContainer=this.elem.parentNode;if(pathContainer){var pathCurrent=this.pathCurrent,pathText=this.pathText,pathAnc=this.pathAncestor,availTextWidth=this.getAvailWidth();pathText.style.maxWidth=availTextWidth+"px";if(pathAnc){this.pathSize=availTextWidth-(this.pathBar?mstrPathImpl.PADDING:0)-15;this.curWidth=Math.min(this.pathSize/2,pathCurrent.offsetWidth);var ancWidth=this.pathSize-this.curWidth;var extra=ancWidth>pathAnc.scrollWidth?ancWidth-pathAnc.scrollWidth:0;ancWidth-=extra;this.curWidth+=extra;pathAnc.style.maxWidth=Math.max(0,ancWidth)+"px";if((bIsDXIE)&&this.pathBar){pathAnc.style.marginLeft=-ancWidth-20+"px";}if(this.pathBar){pathCurrent.style.maxWidth=Math.max(0,this.pathSize-(this.isPinned(pathText)?ancWidth:0))+"px";}else{pathCurrent.style.maxWidth=Math.max(0,this.pathSize-ancWidth)+"px";}}}}catch(err){microstrategy.errors.log(err);}};mstrPathImpl.prototype.pinPath=function(){try{var PINNED_CLASS=" "+mstrPathImpl.PINNED_CLASS,pathPin=this.pathPin,pathText=this.pathText,pathAnc=this.pathAncestor,pathCurrent=this.pathCurrent;if(pathAnc&&pathText&&pathPin&&this.pathBar){var isPinned=this.isPinned(pathPin),pathSize=this.pathSize;if(isPinned){pathText.className=pathText.className.replace(PINNED_CLASS,"");pathPin.className=pathPin.className.replace(PINNED_CLASS,"");var bones=microstrategy.bones;if(bones.leftToolbar){bones.leftToolbar.resize();}window.setTimeout(function(){pathCurrent.style.maxWidth=pathSize+"px";},(bIsDXIE?0:300));}else{pathText.className+=PINNED_CLASS;pathPin.className+=PINNED_CLASS;pathCurrent.style.maxWidth=Math.max(0,this.curWidth)+"px";}}}catch(err){microstrategy.errors.log(err);}};mstrPathImpl.prototype.findChildByCssClass=function(node,cssClass,tagName){try{if(!node){return null;}if(node.getElementsByClassName){return node.getElementsByClassName(cssClass)[0];}else{var tagName=tagName||"div",pattern=new RegExp("(^|\\s)"+cssClass+"(\\s|$)","i");if(node.tagName!=null&&node.tagName.toLowerCase()==tagName.toLowerCase()&&pattern.test(node.className)){return node;}var objs=node.getElementsByTagName(tagName),size=objs&&objs.length;if(size){for(var i=0;i<size;i++){if(pattern.test(objs[i].className)){return objs[i];}}}return null;}}catch(err){microstrategy.errors.log(err);return null;}};mstrPathImpl.prototype.hasClass=function(el,cls){try{return(" "+el.className+" ").indexOf(" "+cls+" ")>-1;}catch(err){microstrategy.errors.log(err);return null;}};mstrPathImpl.prototype.isPinned=function(el){try{return this.hasClass(el,mstrPathImpl.PINNED_CLASS);}catch(err){microstrategy.errors.log(err);return null;}};mstrPathImpl.prototype.toggleFooterPath=function(){var footerWrapper=document.getElementById("mstrWeb_footer");if(footerWrapper){footerWrapper.style.bottom="-41px";var bid=this.id;window.setTimeout(function(){footerWrapper.innerHTML="";microstrategy.unRegisterBone(bid);microstrategy.eventManager.ondialogresize();},500);}var um=microstrategy.updateManager;um.add([um.createActionObject(null,mstrUpdateManager.SET_PREFERENCE,microstrategy.servletName+"."+microstrategy.pageName,mstrUpdateManager.actions[mstrUpdateManager.SET_PREFERENCE].paramID,["showFooterPath",0])]);};function mstrPathImpl(id){this.inherits=mstrBoneImpl;this.inherits(id);this.inherits=null;return this;}mstrPathCommandsImpl.prototype=new Object();mstrPathCommandsImpl.prototype.item=null;mstrPathCommandsImpl.prototype.queryEnabled=function(cmdId){try{return true;}catch(err){microstrategy.errors.log(err);}};mstrPathCommandsImpl.prototype.queryState=function(cmdId){try{switch(cmdId){case"openPage":return this.item;default:microstrategy.errors.log(cmdId+" command id not implemented.");break;}}catch(err){microstrategy.errors.log(err);}return null;};mstrPathCommandsImpl.prototype.exec=function(cmdId,cmdValue){try{switch(cmdId){case"openPage":var um=microstrategy.updateManager;if(um){mstrUpdateManager.addEvent({OPEN_HISTORY_PAGE:{p:[this.parentBone.openHistoryPageEventArgumentID],n:[this.parentBone.openHistoryPageEventArgumentName],i:this.parentBone.openHistoryPageEventID}});um.useIframe=false;var actionCollection=new Array();actionCollection.push(um.createActionObject(this.elem,mstrUpdateManager.OPEN_HISTORY_PAGE,microstrategy.servletName+"."+microstrategy.pageName,[this.parentBone.openHistoryPageEventArgumentID],[cmdValue]));um.add(actionCollection,true);um.flushAndSubmitChanges();}else{var oNewForm=createDynamicForm(this.parentBone.openHistoryPageEvent+cmdValue);oNewForm.method="GET";oNewForm.submit();}break;default:microstrategy.errors.log(values[0]+" command id not implemented.");break;}return true;}catch(err){microstrategy.errors.log(err);}};function mstrPathCommandsImpl(p){this.parentBone=p;return this;}