(function(){mstrmojo.requiresCls("mstrmojo.WH.TableTree");mstrmojo.requiresDescs(9142,773,9143);var _useCache=true,_cachedRow,$D=mstrmojo.dom,$H=mstrmojo.hash,_dnd=mstrmojo.dnd,model=mstrmojo.all.ArchModel;function _setPosition(av,t,l){av.style.left=l;av.style.top=t;}var _renameTableName=function(tid,n,cb){if(mstrmojo.string.isEmpty(n)){mstrmojo.alert("name can't be empty",null,"Table Rename");return false;}var callback={success:function(res){cb.success(res);},failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));cb.failure(res);}};mstrmojo.all.ArchModel.renameObject(tid,15,n,callback);};mstrmojo.Architect.ProjectTableTree=mstrmojo.declare(mstrmojo.WH.TableTree,null,{scriptClass:"mstrmojo.Architect.ProjectTableTree",multiSelect:false,draggable:true,dropZone:true,noCheckBox:false,tp:1,allowDrop:function allowDrop(c){return c.src.widget.parent&&c.src.widget.parent.parent&&c.src.widget.parent.parent.alias==="elemBox";},itemFunction:function ifn(item,idx,w){var tree=w.tree||w,iw=new mstrmojo.TreeBrowserNode({markupString:'<li id="{@id}" class="mstrmojo-TreeNode {@cssClass}" style="{@cssText}" mstrAttach:mousedown,click,dblclick><div class="mstrmojo-TreeNode-div {@tp}"><img class="mstrmojo-TreeNode-state" src="../images/1ptrans.gif" /><img class="mstrmojo-TreeNode-checkBox" src="../images/1ptrans.gif" /><span class="mstrmojo-TreeNode-text {@textCssClass}"></span><span class="mstrmojo-Architect-tabletree-cxtmenu"></span></div><ul class="mstrmojo-TreeNode-itemsContainer">{@itemsHtml}</ul></li>',markupSlots:{checkBoxNode:function(){return this.domNode.firstChild.childNodes[1];},stateNode:function(){return this.domNode.firstChild.firstChild;},textNode:function(){return this.domNode.firstChild.childNodes[2];},itemsContainerNode:function(){return this.domNode.lastChild;}},tp:"Proj t"+item.t,data:item,parent:w,tree:tree,draggable:true,text:item[w.itemDisplayField],multiSelect:true,selectionPolicy:item.t===29?"toggle":null,textCssClass:tree.item2textCss(item),items:item[w.itemChildrenField],itemDisplayField:w.itemDisplayField,itemChildrenField:w.itemChildrenField,itemFunction:w.itemFunction,isSpecialNode:function(){return item.t!==15&&item.t!==30;},getDragData:function(c){var w=c.src.widget;if(w&&w.data&&w.data.t===26){w.data.html='<span class="mstrmojo-ArchitectListIcon t'+26+'" style="width:80px;background-color:white;padding:2px 0px 0px 20px;">'+w.data.n+"</span>";return w.data;}},onmousedown:function omd(evt){if(this.selectedIndex>-1){_dnd.startDragCheck(evt.hWin,evt.e);}},dropZone:true,allowDrop:function allowDrop(c){return item.t===26&&c.src.data&&c.src.data.AL;},ondrop:function(c){var mdl=mstrmojo.all.ArchModel;w.domNode.style["background-color"]="white";mdl.addHeterogenousExpr(c.tgt.widget,c.src.widget);},ondragenter:function(c){var w=c.tgt.widget,tp=w.data.t;w.domNode.style["background-color"]="#d4e7f9";},ondragover:function(c){},ondragleave:function(c){this.domNode.style["background-color"]="white";},predblclick:function predblclick(evt){var w=evt.src;if(w.data&&w.data.t===26&&w.parent.data.did===mstrmojo.all.ArchModel.SelTableID){mstrmojo.all.aflist.processAction({name:"AddAttribute",cln:w.data.cln,cmid:w.data.cmid});}$D.stopPropogation(evt.hWin,evt.e);$D.clearBrowserHighlights(evt.hWin);return false;},toggleState:function toggleState(){if(this.state!==2){this.set("state",this.state===1?0:1);w.items[idx].state=this.state;}},onRender:function(){if(item.t===29||item.state===1){this.set("state",1);}},preclick:function(evt){var target=mstrmojo.dom.eventTarget(window,evt.e);if(target){if(target.className.indexOf("mstrmojo-Architect-tabletree-cxtmenu")>=0){tree&&tree.oncxtmenuPopup&&tree.oncxtmenuPopup(target,this);}}mstrmojo.TreeNode.prototype.preclick(evt);}});return iw;},getContentThroughTaskCall:function getContentThroughTaskCall(params,callbacks){var m=mstrmojo.all.ArchModel,me=this,d=params.data;if(params.isRoot){callbacks.success(me.items);}else{if(d.items&&d.t===29){callbacks.success(d);}else{m.getAttributesFactsInTable(d,me.viewtp,callbacks);}}},item2textCss:function item2textCss(data){if(data.tp==="-2"){return"mstrmojo-ArchitectListIcon refreshOption";}return"mstrmojo-ArchitectListIcon t"+data.t+" st"+data.st;},ondrop:function(c){mstrmojo.all.ArchModel.handleDropfromRelation(c);},onnodechange:function onNdChng(evt){if(this._super){this._super(evt);}var it=evt.src.selectedItem,rmv=evt.removed,add=evt.added,me=this,$C=mstrmojo.css,mdl=mstrmojo.all.ArchModel;if(add&&(it.t===15||it.t===30)){mdl.set("PrjTblDbr",it.prid);var cb={success:function(res){mdl.raiseEvent({name:"SelTableIDChange",tbl:mdl.getTable(it.did)});},failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}};mdl.getAttributesFactsInTable(it,me.viewtp,cb);}else{if(rmv){var tbl=evt.src.items[rmv[0]];mdl.removeTableFromLayer(tbl);}}},onviewtpChange:function(){var items=this.items,ws=this.ctxtBuilder.itemWidgets;for(var i=0,len=items.length;i<len;i++){var it=items[i];if(it.t===29){var its=it.items;for(var j=0,len2=its.length;j<len2;j++){var t_its=tbls[j].items,w=ws[i].ctxtBuilder.itemWidgets[j];if(w.contentRetrieved){its=[];w.contentRetrieved=false;w.set("state",0);}}}else{if(it.t===15&&ws[i].contentRetrieved){it.items=[];ws[i].contentRetrieved=false;ws[i].set("state",0);}}}},displayMenu:function(w){if(w.data){return w.data.t===15||w.data.t===30||(w.data.t===26&&w.parent.data.did===mstrmojo.all.ArchModel.SelTableID);}},load:function(){if(this.p_tables){this.set("items",p_tables);return ;}var mdl=mstrmojo.all.ArchModel,me=this;var cb={success:function(res){me.set("items",res);me.p_tables=res;},failure:function(res){}};mdl.loadProjectTables(cb);}});}());