mstrHyperLinkObjectExplorerImplScript=true;mstrHyperLinkObjectExplorerImpl.prototype=new mstrObjectExplorerImpl();mstrHyperLinkObjectExplorerImpl.prototype.selectedObjectName=null;mstrHyperLinkObjectExplorerImpl.prototype.selectedObjectID=null;mstrHyperLinkObjectExplorerImpl.prototype.selectedObjectType=null;mstrHyperLinkObjectExplorerImpl.prototype.selectedObjectSubType=null;mstrHyperLinkObjectExplorerImpl.prototype.selectedTargetId=null;mstrHyperLinkObjectExplorerImpl.prototype.selectedTargetType=null;mstrHyperLinkObjectExplorerImpl.prototype.selectedTargetSubType=null;mstrHyperLinkObjectExplorerImpl.prototype.selectedTargetName=null;mstrHyperLinkObjectExplorerImpl.prototype.supportsMultiSelect=false;mstrHyperLinkObjectExplorerImpl.prototype.hyperLinkEditorBone="hyperLinkEditor_HyperLinkEditorStyle";mstrHyperLinkObjectExplorerImpl.prototype.closed=false;mstrHyperLinkObjectExplorerImpl.prototype.onload=function(e){mstrObjectExplorerImpl.prototype.onload.call(this);this.disableOkButton();};mstrHyperLinkObjectExplorerImpl.prototype.addSelectedObject=function(id){var obj=microstrategy.findChildWithAtt(this.elem,"span",microstrategy.HTMLATTR_DSS_ID,id);if(obj){this.selectedObjectName=obj.innerHTML;this.selectedObjectID=id;this.selectedObjectType=obj.parentNode.getAttribute("objType");this.selectedObjectSubType=obj.parentNode.getAttribute("objSubType");this.selectedTargetId=obj.getAttribute("oid");this.selectedTargetType=obj.getAttribute("otp");this.selectedTargetSubType=obj.getAttribute("ostp");this.selectedTargetName=obj.getAttribute("onm");this.enableOkButton();}};mstrHyperLinkObjectExplorerImpl.prototype.okChanges=function(){try{var bone=microstrategy.bone(this.hyperLinkEditorBone);if(bone){var targetId;var targetType;var targetSubType;var targetName;if(this.selectedObjectType=="18"){targetId=this.selectedTargetId;targetType=this.selectedTargetType;targetSubType=this.selectedTargetSubType;targetName=this.selectedTargetName;}else{targetId=this.selectedObjectID;targetType=this.selectedObjectType;targetSubType=this.selectedObjectSubType;targetName=this.selectedObjectName;}bone.exec("UpdateObjectInfo",targetId+"|"+targetName+"|"+targetType+"|"+targetSubType+"|"+this.id);}if(this&&this.closed==false){this.closeEditor();}}catch(err){microstrategy.errors.log(err);return false;}};function mstrHyperLinkObjectExplorerImpl(id){this.inherits=mstrObjectExplorerImpl;this.inherits(id);delete this.inherits;return this;}