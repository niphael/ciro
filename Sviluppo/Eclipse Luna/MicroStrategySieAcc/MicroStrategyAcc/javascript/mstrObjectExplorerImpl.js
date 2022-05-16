mstrObjectExplorerImplScript=true;mstrObjectExplorerImpl.prototype=new mstrObjectBrowserImpl();mstrObjectExplorerImpl.prototype.contents=null;mstrObjectExplorerImpl.prototype.browseEventID=null;mstrObjectExplorerImpl.prototype.okEventID=null;mstrObjectExplorerImpl.prototype.changeFormatEventID=null;mstrObjectExplorerImpl.prototype.ancestorsID=null;mstrObjectExplorerImpl.prototype.ancestorsList=null;mstrObjectExplorerImpl.prototype.selectedObjectInputName=null;mstrObjectExplorerImpl.prototype.supportsMultiSelect=true;mstrObjectExplorerImpl.prototype.treeView=null;mstrObjectExplorerImpl.prototype.submitButton=null;mstrObjectExplorerImpl.prototype.okButton=null;mstrObjectExplorerImpl.prototype.onload=function(e){try{mstrObjectBrowserImpl.prototype.onload.call(this,e);this.selections=new mstrObjSelectionsImpl();this.selections.parentBone=this;if(this.ancestorsID){this.ancestorsList=microstrategy.findChildWithAtt(this.elem,"select","name",this.ancestorsID);if(this.ancestorsList){this.ancestorsList.onchange=new Function("e","return microstrategy.bone('"+this.id+"').openAncestor(e);");}}this.initTreeView();this.displayPickerDiv=microstrategy.findChildWithAtt(this.elem,"div","id","displayFormatPicker");if(this.displayPickerDiv){for(var i=0;i<this.displayPickerDiv.childNodes.length;i++){var oChild=this.displayPickerDiv.childNodes[i];oChild.onmousedown=new Function("e","return microstrategy.bone('"+this.id+"').changeFormat(e);");}}this.contents=microstrategy.subObjectFind(this.elem,"div",microstrategy.SUBOBJTYPE_FILE_LIST);if(this.contents){this.contents.onmousedown=new Function("e","return microstrategy.bone('"+this.id+"').onmousedown(e);");}this.submitButton=microstrategy.findChildWithAtt(this.elem,"input","type","submit");if(this.submitButton){this.submitButton.onclick=new Function("e","return microstrategy.bone('"+this.id+"').onsubmit(e);");}this.okButton=microstrategy.findChildWithAtt(this.elem,"input","id","ok");}catch(err){microstrategy.errors.log(err);return false;}};mstrObjectExplorerImpl.prototype.resize=function(){return true;};mstrObjectExplorerImpl.prototype.initTreeView=function(){try{var treeDiv=microstrategy.subObjectFind(this.elem,["DIV"],microstrategy.SUBOBJTYPE_TREE_VIEW);if(treeDiv!=null){this.treeView=new mstrTreeViewImpl(treeDiv.getAttribute("id"));this.treeView.parentBone=this;this.treeView.path="microstrategy.bone('"+this.id+"').treeView";treeDiv.onclick=new Function("e","microstrategy.bone('"+this.id+"').onClickTree(); return false;");if(this.treeView.onload){this.treeView.onload();}}return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrObjectExplorerImpl.prototype.onClickTree=function(e){try{this.treeView.onClickTree();if(this.treeView.currentlySelectedNode){var obj=this.treeView.currentlySelectedNode;if(obj.tagName.toLowerCase()=="li"){if(this.selections){if(this.selections.isSelected(obj)){}else{if(!this.supportsMultiSelect){this.selections.clear();}var objToAdd=[obj];this.selections.add(obj,objToAdd);if(objToAdd[0].getAttribute("did")){this.addSelectedObject(objToAdd[0].getAttribute("did"));}}}}else{if(this.selections){this.selections.clear();}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrObjectExplorerImpl.prototype.onmousedown=function(e){try{if(!e){e=window.event;}if(this.currentPicker){this.closePicker(e);}var obj=getEventTarget(e);obj=this.getObjSpan(obj);if(obj){if(obj.tagName.toLowerCase()=="span"){if(this.selections){if(this.selections.isSelected(obj)){if(e.ctrlKey){this.selections.remove(obj);}}else{if(!this.supportsMultiSelect||!e.ctrlKey){this.selections.clear();}var objToAdd=[obj];this.selections.add(obj,objToAdd);if(objToAdd[0].getAttribute("oid")){this.addSelectedObject(objToAdd[0].getAttribute("oid"));}}}}else{if(this.selections){this.selections.clear();}}}if(bIsIE9){return e.target.tagName.toLowerCase()=="a"?false:true;}return false;}catch(err){microstrategy.errors.log(err);return false;}};mstrObjectExplorerImpl.prototype.getObjSpan=function(obj){var objDiv=obj.parentNode;if(objDiv){objDiv=findTarget(objDiv,microstrategy.HTMLATTR_DSSTYPE);}if(objDiv){var dssTy=objDiv.getAttribute(microstrategy.HTMLATTR_DSSTYPE);switch(dssTy){case microstrategy.DSSTYPE_RPT_DEFINITION:case microstrategy.DSSTYPE_DOC_DEFINITION:case microstrategy.DSSTYPE_CONSOLIDATION_ELEMENT:case"18":return microstrategy.findChildWithAtt(objDiv,"span",microstrategy.HTMLATTR_OBJTYPE,microstrategy.OBJTYPE_FIRST_CLASS_OBJECT);break;case microstrategy.DSSTYPE_FILTER:return microstrategy.findChildWithAtt(objDiv,"span",microstrategy.HTMLATTR_OBJTYPE,"fi");break;case microstrategy.DSSTYPE_PROMPT:return microstrategy.findChildWithAtt(objDiv,"span",microstrategy.HTMLATTR_OBJTYPE,"pr");break;case microstrategy.DSSTYPE_FOLDER:var anchors=objDiv.getElementsByTagName("a");if(anchors.length>0){return anchors[0];}break;default:return obj;}}else{return obj;}};mstrObjectExplorerImpl.prototype.addSelectedObject=function(id){var oInput=document.getElementById(this.selectedObjectInputName);if(!oInput){oInput=this.createInput(this.selectedObjectInputName,"");}if(oInput){if(this.supportsMultiSelect&&oInput.value.length>0){oInput.value=oInput.value+","+id;}else{oInput.value=id;}}if(this.submitButton){this.submitButton.disabled=false;this.submitButton.className=this.submitButton.className.replace("mstrButtonDisabled","");}};mstrObjectExplorerImpl.prototype.openAncestor=function(e){submitForm(findTargetTag(this.createInput(this.browseEventID,"true"),"form"));};mstrObjectExplorerImpl.prototype.createInput=function(name,value){var pNode=this.ancestorsList.parentNode;var newNode=document.createElement("input");newNode.setAttribute("id",name);newNode.setAttribute("name",name);newNode.setAttribute("value",value);newNode.setAttribute("type","hidden");pNode.appendChild(newNode);return newNode;};function findTargetTag(oTarget,sTagName){while(oTarget.parentNode){if(oTarget.nodeName.toLowerCase()==sTagName.toLowerCase()){return oTarget;}oTarget=oTarget.parentNode;}return null;}function mstrObjectExplorerImpl(id){this.inherits=mstrObjectBrowserImpl;this.inherits(id);delete this.inherits;return this;}mstrObjectExplorerImpl.prototype.togglePicker=function(show,id,tool){if(typeof (this.dialogDiv)=="undefined"){this.dialogDiv=microstrategy.findAncestorWithAtt(this.elem,microstrategy.HTMLATTR_OBJTYPE,"dialog");}try{if(tool&&(!tool.disabled)){dropDown.togglePicker(show,id,tool,this);}}catch(err){microstrategy.errors.log(err);}return false;};mstrObjectExplorerImpl.prototype.closePicker=function(e){try{dropDown.closePicker(e,this);return true;}catch(err){microstrategy.errors.log(err);return false;}};mstrObjectExplorerImpl.prototype.ondocumentclick=function(e){try{if(this.selections&&this.selections.ondocumentclick){this.selections.ondocumentclick(e);}if(this.currentPicker){this.closePicker(e);}}catch(err){microstrategy.errors.log(err);}};mstrObjectExplorerImpl.prototype.changeFormat=function(e){if(!e){e=window.event;}var oTarget=getEventTarget(e);var actionCollection=new Array();actionCollection.push(this.updateManager.createActionObject(this.elem,mstrUpdateManager.CHANGE_DISPLAY_FORMAT,this.beanPath,["98006"],[oTarget.getAttribute("name")]));this.updateManager.add(actionCollection);this.updateManager.flushAndSubmitChanges();};mstrObjectExplorerImpl.prototype.onreload=function(){try{mstrBoneImpl.prototype.onreload.call(this);if(this.treeView&&this.treeView.onreload){this.treeView.onreload();}}catch(err){microstrategy.errors.log(err);return false;}};mstrObjectExplorerImpl.prototype.disableOkButton=function(e){if(this.okButton){this.okButton.disabled=true;this.okButton.className="mstrButtonDisabled";}};mstrObjectExplorerImpl.prototype.enableOkButton=function(e){if(this.okButton){this.okButton.disabled=false;this.okButton.className="mstrButton";}};