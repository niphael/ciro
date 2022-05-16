(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.HTMLButton","mstrmojo.HBox","mstrmojo.List","mstrmojo.Label","mstrmojo.ListMapperHoriz","mstrmojo.WidgetList","mstrmojo.WidgetListMapper","mstrmojo.TristateCheckBox","mstrmojo.Pulldown","mstrmojo.ACL.UserTreeBrowser","mstrmojo.DataGrid","mstrmojo.DropDownButton","mstrmojo.ListBox","mstrmojo.DivItemRenderer","mstrmojo.VBox","mstrmojo.Box","mstrmojo.ACL.UserInputBox","mstrmojo.Editor","mstrmojo.ACL.UserDataService","mstrmojo.StackContainer");var Enum_RIGHT_FLAGS=[1,4,8,16,32,64,128],Enum_RIGHT_DESC=[mstrmojo.desc(1825,"Browse"),mstrmojo.desc(8078,"Read"),mstrmojo.desc(8079,"Write"),mstrmojo.desc(629,"Delete"),mstrmojo.desc(8080,"Control"),mstrmojo.desc(8081,"Use"),mstrmojo.desc(8082,"Execute")],Enum_RIGHT_DESC_SHORT=["B","R","W","D","C","U","E"];function _getACLHint(r){var h=[],d=Math.floor(r/1000),g=r%1000,rf=Enum_RIGHT_FLAGS,rd=Enum_RIGHT_DESC,len=rf.length,s,i;for(i=0;i<len;i++){h.push(rd[i]);h.push(" ");if((g&rf[i])>0){h.push(mstrmojo.desc(8083,"Granted"));}else{if((d&rf[i])>0){h.push(mstrmojo.desc(8084,"Denied"));}else{h.push(mstrmojo.desc(959,"Default"));}}h.push(",");}s=h.join("");return s.substring(s,s.length-1);}function _getACLLabel(r){var h=[],g=r%1000,rf=Enum_RIGHT_FLAGS,rd=Enum_RIGHT_DESC_SHORT,len=rf.length,s,i;for(i=0;i<len;i++){if((g&rf[i])>0){h.push(rd[i]);h.push(",");}}s=h.join("");return s.substring(s,s.length-1);}function _fixACL(v){return{"253000":255000,"253":255,"221":223,"197":199,"69":71}[v]||v;}function _fixACLTwoStates(v){return{"253000":255000,"253":255,"32221":223,"56197":199}[v]||v;}function _updatePulldown(w,v){var its=w.items,idx=mstrmojo.array.find(its,w.itemIdField,v),iWas=w.customItem,iIdx=its.length-2;if(idx===-1){var iNew={n:_getACLLabel(v),rgt:v};if(iWas){its.splice(iIdx,1);}iIdx=its.length-1;its.splice(iIdx,0,iNew);w.customItem=iNew;}else{if(iWas&&idx!==iIdx){its.splice(iIdx,1);w.customItem=null;}}w.set("title",_getACLHint(v));w.value=v;}function _getCategoriesByType(t){return{"776":[{n:mstrmojo.desc(8085,"Consume"),rgt:71},{n:mstrmojo.desc(531,"Add"),rgt:199},{n:mstrmojo.desc(8086,"Collaborate"),rgt:223},{n:mstrmojo.desc(8087,"Full Control"),rgt:255},{n:mstrmojo.desc(8088,"Denied All"),rgt:255000},{n:mstrmojo.desc(8089,"Custom ..."),rgt:-1}]}[t]||[{n:mstrmojo.desc(8090,"View"),rgt:199},{n:mstrmojo.desc(767,"Modify"),rgt:223},{n:mstrmojo.desc(8087,"Full Control"),rgt:255},{n:mstrmojo.desc(8088,"Denied All"),rgt:255000},{n:mstrmojo.desc(8089,"Custom ..."),rgt:-1}];}function _isFolder(oi){return(oi&&oi.t===8);}function _postProcessACLs(oi){var acls=oi.acls,inhs=oi.inhs,exAcls=[],acl,g,rgt,i,len;if(_isFolder(oi)){acls=acls.concat(mstrmojo.hash.valarray(inhs));}for(i=0,len=acls.length;i<len;i++){acl=acls[i];rgt=acl.rgt;if(rgt>1000){g=mstrmojo.hash.copy(acl);g.den=true;g.rgt=Math.floor(rgt/1000);exAcls.push(g);}if((rgt%1000)>0){g=mstrmojo.hash.copy(acl);g.den=false;g.rgt=rgt%1000;exAcls.push(g);}}oi.acls=exAcls;return oi;}function _getSaveXML(oi){var cfg={isSerializable:function(nodeName,jsons,idx){switch(nodeName){case"did":case"rgt":case"n":case"acls":case"t":case"st":case"inh":case"den":return true;}return false;},getArrItemName:function(n,v,i){if(n==="acls"){return"acl";}},convertBoolean:true};return mstrmojo.string.json2xml("oi",oi,cfg);}function _saveACL(e,isToClose){var oi=e&&e.oi,xml;if(oi){oi=_postProcessACLs(oi);xml=_getSaveXML(oi);var params={taskId:"saveObjectACL",objectXML:xml,sessionState:mstrApp.sessionState,objectType:oi.t,objectID:oi.did};mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(res){if(isToClose){if(e.postSaveACL){e.postSaveACL(true);}e.close();}},failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));if(isToClose){if(e.postSaveACL){e.postSaveACL(false);}e.close();}}},params);}}function _addACL(e){var acl=e.aclList,ci=e.objectInputer,pd=e.rightPulldown,its=ci.getSelectedObjects(),len=its.length,added=[],it,rgt=pd.value,i,idx,ace;if(!ci.isValid()){mstrmojo.alert(mstrmojo.desc(9048,"Some users/groups do not exist. Please remove them in order to proceed."),null,e.alertTitle);return false;}for(i=0;i<len;i++){it=its[i];idx=mstrmojo.array.find(acl.items,"did",it.did);if(idx!==-1){ace=acl.items[idx];if(e.uneditableRights[ace.rgt]){continue;}}added.push(new mstrmojo.Obj({n:it.n,did:it.did,st:it.st,rgt:rgt,newItem:true}));}if(added.length>0){var ret=mstrmojo.array.findMulti(acl.items,"did",added);if(ret.count){var idxs=ret.indices.concat().sort(mstrmojo.array.numSorter).slice(0,ret.count);for(i=idxs.length-1;i>-1;i--){acl.remove(idxs[i]);}}acl.add(added);e.set("hasChanged",true);}ci.set("items",[]);e.set("inEditMode",false);return true;}mstrmojo.ACL.ACLEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.ACL.ACLEditor",cssClass:"mstrmojo-ACLEditor",zIndex:10,help:"sharing_dialog_box.htm",inEditMode:false,hasChanged:false,showButtonText:true,showObjectNameOnTitle:true,uneditableRights:{},defaultRight:223,viewOnlyMode:false,userSelectorTitle:mstrmojo.desc(8091,"User/User Group Browser"),userSelector:{scriptClass:"mstrmojo.Editor",cssClass:"mstrmojo-UserEditor",help:"user_group_browser.htm",onClose:function(){this.userBrowser.clearTreeSelect();},children:[{scriptClass:"mstrmojo.ACL.UserTreeBrowser",alias:"userBrowser",selectionAcrossBranch:true,multiSelect:true},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBox",slot:"buttonNode",children:[{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",iconClass:"mstrmojo-Editor-button-OK",text:mstrmojo.desc(1442,"OK"),onclick:function(evt){var ue=this.parent.parent,e=ue.opener,ci=e.objectInputer,ub=ue.userBrowser,sls=ub.getTotalSelections();if(sls&&sls.length>0){ci.add(sls,ci.items.length-1);e.set("inEditMode",true);}ue.close();},preBuildRendering:function(){if(!this.parent.parent.opener.showButtonText){this.set("text","");}}},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",iconClass:"mstrmojo-Editor-button-Cancel",text:mstrmojo.desc(221,"Cancel"),onclick:function(evt){this.parent.parent.close();},preBuildRendering:function(){if(!this.parent.parent.opener.showButtonText){this.set("text","");}}}]}],onOpen:function(){this.set("title",this.opener.userSelectorTitle);}},customACL:{scriptClass:"mstrmojo.Editor",title:mstrmojo.desc(8092,"Custom Permission Level"),cssClass:"mstrmojo-CustomACLEditor",help:"Custom_Permission_Level_dialog_box.htm",onOpen:function(){var rgt=this.rgt,d=Math.floor(rgt/1000),g=rgt%1000,chs=this.children,ch,r,i,len;for(i=0,len=chs.length;i<len;i++){ch=chs[i];r=ch.right;if(this.twoStates){ch.set("grayed",false);ch.set("checked",false);}else{ch.set("grayed",true);ch.set("checked",true);}if((d&r)>0){ch.set("checked",false);ch.set("grayed",false);}if((g&r)>0){ch.set("checked",true);ch.set("grayed",false);}}},getACLValue:function(){var g=0,d=0,chs=this.children,ch,i,len;for(i=0,len=chs.length;i<len;i++){ch=chs[i];if(ch.grayed||!ch.right){continue;}if(ch.checked){g+=ch.right;}else{d+=ch.right;}}return d*1000+g;},children:[{scriptClass:"mstrmojo.TristateCheckBox",alias:"browse",right:1,text:mstrmojo.desc(1825,"Browse")},{scriptClass:"mstrmojo.TristateCheckBox",alias:"read",right:4,text:mstrmojo.desc(8078,"Read")},{scriptClass:"mstrmojo.TristateCheckBox",alias:"write",right:8,text:mstrmojo.desc(8079,"Write")},{scriptClass:"mstrmojo.TristateCheckBox",alias:"delete",right:16,text:mstrmojo.desc(629,"Delete")},{scriptClass:"mstrmojo.TristateCheckBox",alias:"control",right:32,text:mstrmojo.desc(8080,"Control")},{scriptClass:"mstrmojo.TristateCheckBox",alias:"use",right:64,text:mstrmojo.desc(8081,"Use")},{scriptClass:"mstrmojo.TristateCheckBox",alias:"execute",right:128,text:mstrmojo.desc(8082,"Execute")},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBox",slot:"buttonNode",children:[{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",iconClass:"mstrmojo-Editor-button-OK",text:mstrmojo.desc(1442,"OK"),onclick:function(evt){var e=this.parent.parent;if(e.onOK){e.onOK();}e.close();}},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",iconClass:"mstrmojo-Editor-button-Cancel",text:mstrmojo.desc(221,"Cancel"),onclick:function(evt){var e=this.parent.parent;if(e.onCancel){e.onCancel();}e.close();}}]}]},_set_oi:function(n,v){this.oi=this.preProcessACLs(v);return true;},postCreate:function(){this.oi=this.preProcessACLs(this.oi);},preProcessACLs:function(oi){var acls=oi.acls,len=acls&&acls.length,isF=_isFolder(oi),aclMap={},acl,r,inhs,i;if(isF){inhs={};oi.inhs=inhs;}for(i=0;i<len;i++){acl=new mstrmojo.Obj(acls[i]);if(isF&&acl.inh){inhs[acl.n]=mstrmojo.hash.copy(acl);continue;}r=aclMap[acl.n];if(!r){r=mstrmojo.hash.copy(acl);r.rgt=0;delete r.den;aclMap[acl.n]=r;}r.rgt+=acl.den?acl.rgt*1000:acl.rgt;}acls=mstrmojo.hash.valarray(aclMap);oi.acls=acls;return oi;},postSaveACL:function(){},getAvailableRightsForDisplay:function(){return _getCategoriesByType(this.oi.st);},getAvailableRightsForSelection:function(){return _getCategoriesByType(this.oi.st);},onOpen:function(){if(this.showObjectNameOnTitle){this.set("title",mstrmojo.desc(8093,"Share: ##").replace("##",mstrmojo.string.encodeHtmlString(this.oi.n)));}var pd=this.rightPulldown;pd.set("items",this.getAvailableRightsForSelection());pd.set("value",this.defaultRight);var ci=this.objectInputer,us=this.userSelector,ub=us&&us.userBrowser;if(ub&&ub.hasRendered){ub.set("items",[]);ub.getContent(ub);}var DS=mstrmojo.ACL.UserDataService,INITIAL_USERS_COUNT=200,success=function(candidates){ci.set("candidates",candidates);},failure=function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));},callbacks={success:success,failure:failure};DS.getUserCandidates(INITIAL_USERS_COUNT,callbacks);this.set("inEditMode",false);this.set("hasChanged",false);},onClose:function(){var ci=this.objectInputer;ci.set("items",[]);this.aclList.clearSelect();},oninEditModeChange:function(){var e=this;if(e.inEditMode){mstrmojo.css.removeClass(e.objectInputer.domNode,"small");}else{mstrmojo.css.addClass(e.objectInputer.domNode,"small");}},children:[{scriptClass:"mstrmojo.DataGrid",cssClass:"mstrmojo-ACLEditor-ACLList",alias:"aclList",renderOnScroll:false,makeObservable:true,itemDisplayField:"n",dropZone:true,bindings:{items:"this.parent.oi.acls"},sortCol:"",sortAsc:new mstrmojo.Obj({n:true,rgt:true}),sort:function(prop,asc){var sortFunc=function mySort(p,s){return function(a,b){var aProp=eval("a."+p),bProp=eval("b."+p),r=aProp>bProp;if(aProp===bProp){return 0;}if(s===r){return 1;}return -1;};};if(this.items){this.items.sort(sortFunc(prop,asc));this.render();}},onremove:function(evt){var oi=this.parent.oi;if(!_isFolder(oi)){return ;}var inhs=oi.inhs,its=evt.value,len=its&&its.length,n,i;for(i=0;i<len;i++){n=its[i].n;delete inhs[n];}},onadd:function(evt){var oi=this.parent.oi;if(!_isFolder(oi)){return ;}var inhs=oi.inhs,its=evt.value,len=its&&its.length,n,i;for(i=0;i<len;i++){n=its[i].n;inhs[n]=mstrmojo.hash.copy(its[i]);inhs[n].inh=true;}},onACLChanged:function(d){var oi=this.parent.oi;this.parent.set("hasChanged",true);if(!_isFolder(oi)){return ;}oi.inhs[d.n]=mstrmojo.hash.copy(d);oi.inhs[d.n].inh=true;},columns:[{headerWidget:{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(5657,"User/Group"),onclick:function(){var asc=!(this.dataGrid.sortAsc.n);this.dataGrid.set("sortCol","n");this.dataGrid.sortAsc.set("n",asc);this.dataGrid.sort("n",asc);},postCreate:function(){if(this.dataGrid.sortCol==="n"){this.set("cssClass",(this.dataGrid.sortAsc.n)?"mstrmojo-sortAsc":"mstrmojo-sortDesc");}}},dataFunction:function(item,idx,w){return'<div class="mstrmojo-ACLEditor-user '+(item.st===8705?"ug":"u")+'">'+mstrmojo.string.encodeHtmlString(item.n)+"</div>";},colCss:"userCol"},{headerWidget:{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(9149,"Access"),onclick:function(){var asc=!(this.dataGrid.sortAsc.rgt);this.dataGrid.set("sortCol","rgt");this.dataGrid.sortAsc.set("rgt",asc);this.dataGrid.sort("rgt",asc);},postCreate:function(){if(this.dataGrid.sortCol==="rgt"){this.set("cssClass",(this.dataGrid.sortAsc.rgt)?"mstrmojo-sortAsc":"mstrmojo-sortDesc");}}},colCss:"rgtCol",dataWidget:{scriptClass:"mstrmojo.MouseOverContainer",children:[{scriptClass:"mstrmojo.Label",bindings:{text:function(){var access=this.parent.dataGrid.parent.getAvailableRightsForDisplay(),len=access.length,i;for(i=0;i<len;i++){if(access[i].rgt===this.parent.data.rgt){return access[i].n;}}return mstrmojo.desc(2056,"Custom");}}},{scriptClass:"mstrmojo.HBox",visible:false,children:[{scriptClass:"mstrmojo.Pulldown",itemIdField:"rgt",popupToBody:true,selectionPolicy:"reselect",defaultSelection:0,postCreate:function(){this.markupMethods=mstrmojo.hash.copy({ondataChange:function(){var d=this.parent.parent.data;this.set("value",d[this.itemIdField]);},onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";if(!this.visible&&this.popupRef){this.popupRef.set("visible",false);}}},mstrmojo.hash.copy(this.markupMethods));this.items=this.parent.parent.dataGrid.parent.getAvailableRightsForSelection();},_set_value:function(n,v){var vWas=this.value,bChanged=(vWas!==v);if(bChanged){if(v===-1){var e=this.parent.parent.dataGrid.parent,me=this;e.openPopup("customACL",{zIndex:e.zIndex+10,rgt:vWas,twoStates:!!this.parent.parent.data.newItem,onOK:function(){me.set("value",this.getACLValue());},onCancel:function(){me.set("value",vWas);}});return false;}v=_fixACL(v);_updatePulldown(this,v);this.parent.parent.data.set(this.itemIdField,v);if(vWas!==null){this.parent.parent.dataGrid.onACLChanged(this.parent.parent.data);}return true;}return true;}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-ACLEditor-delete",text:"&nbsp",title:mstrmojo.desc(629,"Delete"),onclick:function(evt){this.parent.parent.dataGrid.remove(this.parent.parent.data);this.parent.parent.dataGrid.parent.set("hasChanged",true);}}]}],postCreate:function(){var doSwitch=!this.dataGrid.parent.viewOnlyMode&&!this.dataGrid.parent.uneditableRights[this.data.rgt];this.set("doSwitch",doSwitch);}}}]},{scriptClass:"mstrmojo.Box",cssClass:"mstrmojo-ACLEditor-MorePanel",bindings:{visible:"!this.parent.viewOnlyMode"},children:[{scriptClass:"mstrmojo.HBox",children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(9150,"Add Users/Groups:"),cssClass:"mstrmojo-ACLEditor-addLabel"},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",iconClass:"mstrmojo-ACLEditor-chooseLabel",onclick:function(evt){var e=this.parent.parent.parent;e.openPopup("userSelector",{zIndex:e.zIndex+10});},bindings:{text:function(){return(this.parent.parent.parent.showButtonText)?mstrmojo.desc(1825,"Browse"):"";}}}]},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-ACLEditor-CPSection",children:[{scriptClass:"mstrmojo.ACL.UserInputBox",emptyText:mstrmojo.desc(9151,"Type users or groups here."),cssClass:"mstrmojo-ObjectInputBox mstrmojo-ACLEditor-inputBox small",onRender:function(){var e=this.parent.parent.parent;if(e){e.objectInputer=this;}},postBuildDom:function(){var me=this;this._clickHandler=function(evt){me.parent.parent.parent.set("inEditMode",true);};mstrmojo.dom.attachEvent(this.domNode,"click",this._clickHandler);}},{scriptClass:"mstrmojo.Box",cssClass:"mstrmojo-ACLEditor-CPSection-RHS",children:[{scriptClass:"mstrmojo.Pulldown",itemIdField:"rgt",value:-1,defaultSelection:0,selectionPolicy:"reselect",onRender:function(){var e=this.parent.parent.parent.parent;if(e){e.rightPulldown=this;}},postCreate:function(){this.items=this.parent.parent.parent.parent.getAvailableRightsForSelection();},_set_value:function(n,v){var vWas=this.value,bChanged=(vWas!==v);if(bChanged){if(v===-1){var e=this.parent.parent.parent.parent,me=this;e.openPopup("customACL",{zIndex:e.zIndex+10,rgt:vWas,twoStates:true,onOK:function(){me.set("value",this.getACLValue());},onCancel:function(){me.set("value",vWas);}});return false;}v=_fixACLTwoStates(v);_updatePulldown(this,v);return true;}return true;},bindings:{visible:"this.parent.parent.parent.parent.inEditMode"}},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",iconClass:"mstrmojo-ACLEditor-addButton",onclick:function(evt){var e=this.parent.parent.parent.parent;_addACL(e);},bindings:{visible:"this.parent.parent.parent.parent.inEditMode",text:function(){return(this.parent.parent.parent.parent.showButtonText)?mstrmojo.desc(2156,"Add"):"";}}}]}]}]},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBox",slot:"buttonNode",children:[{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",iconClass:"mstrmojo-Editor-button-OK",text:mstrmojo.desc(1442,"OK"),bindings:{enabled:function(){var oi=this.parent.parent.oi;return(oi.acg&32)>0&&this.parent.parent.hasChanged;},visible:"!this.parent.parent.viewOnlyMode"},onclick:function(evt){var e=this.parent.parent;if(_addACL(e)){_saveACL(e,true);}},preBuildRendering:function(){if(!this.parent.parent.showButtonText){this.set("text","");}}},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",iconClass:"mstrmojo-Editor-button-Close",onclick:function(evt){if(!this.parent.parent.inEditMode){this.parent.parent.close();this.parent.parent.set("hasChanged",false);}this.parent.parent.objectInputer.set("items",[]);this.parent.parent.set("inEditMode",false);},bindings:{iconClass:function(){if(this.parent.parent.inEditMode||this.parent.parent.hasChanged){return"mstrmojo-Editor-button-Cancel";}return"mstrmojo-Editor-button-Close";},text:function(){if(!this.parent.parent.showButtonText){return"";}if(this.parent.parent.inEditMode||this.parent.parent.hasChanged){return mstrmojo.desc(2140,"Cancel");}return mstrmojo.desc(2102,"Close");}}}]}]});mstrmojo.MouseOverContainer=mstrmojo.declare(mstrmojo.StackContainer,null,{scriptClass:"mstrmojo.MouseOverContainer",markupString:'<div id="{@id}" class="mstrmojo-Box {@cssClass}" style="{@cssText}" mstrAttach:mouseover,mouseout></div>',doSwitch:true,markupSlots:{containerNode:function(){return this.domNode;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},onmouseover:function(){if(this.doSwitch){this.set("selected",this.children[1]);}},onmouseout:function(){if(this.doSwitch){this.set("selected",this.children[0]);}},preBuildRendering:function(){this.set("selected",this.children[0]);}});}());