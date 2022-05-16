(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.QB.DBRoleSelector","mstrmojo.TreeBrowserNode","mstrmojo.TreeBrowser");mstrmojo.requiresDescs(9142,773,9143);var $C=mstrmojo.css,$D=mstrmojo.dom,_dnd=mstrmojo.dnd,_useCache=true;var _toAdd=new Object();function _setPosition(av,t,l){av.style.left=l;av.style.top=t;}function _createAvatar(k){var w=k.parent;var d=document.createElement("div"),s=d.style,dn=w.parent.parent.domNode;d.className="mstrmojo-qb-avatar";dn.appendChild(d);w.avatar=d;return d;}var _select_treeitem=function(evt){var _ctrl=$D.ctrlKey(window,evt);if(_cachedRow){var row=$D.findWidget(_cachedRow);if(!row){return ;}var tr=row.tree;var idx=mstrmojo.array.find(tr.items,"did",row.data.did);if(_ctrl){tr.addSelect(idx);}else{tr.singleSelect(idx);}}};var STR=mstrmojo.desc(9143,"Available tables cache was created at ##. Click Refresh to get the latest tables and update the cache.");mstrmojo.Architect.WHTablePanel=mstrmojo.declare(mstrmojo.QB.VSplitPanel,null,{scriptClass:"mstrmojo.Architect.WHTablePanel",markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},marginSpan:10,children:[new mstrmojo.QB.DBRoleSelector({slot:"topItem"}),new mstrmojo.Box({slot:"bottomItem",cssClass:"mstrmojo-qb-WarehouseTableSection",children:[{scriptClass:"mstrmojo.Table",rows:1,cols:2,cssClass:"mstrmojo-qb-DBRoleSelector-header",layout:[{cells:[{cssText:"padding-left: 5px; padding-right: 5px;"},{cssText:"height: 20px; padding-right: 3px;"}]}],children:[{scriptClass:"mstrmojo.Label",slot:"0,0",cssClass:"mstrmojo-qb-DBRoleSelector-header",text:mstrmojo.desc(9142,"Available Tables")},{scriptClass:"mstrmojo.Button",slot:"0,1",title:mstrmojo.desc(773,"Refresh"),iconClass:"mstrmojo-ArchitectListIcon refresh",cssText:"float:right;",onclick:function(evt){this.parent.parent.SearchBox.clearSearch();_useCache=false;this.parent.parent.DBTableTree.dbroleChange();_useCache=true;},cacheStamped:function(evt){if(evt.value){this.title=STR.replace(/##/,evt.value);this.tooltip=this.domNode.title;this.render();}}}]},{alias:"SearchBox",scriptClass:"mstrmojo.Widget",markupString:'<table id={@id} cellspacing=0 cellpadding=0 class="mstrmojo-Architect-SearchBox {@cssClass}" style="{@cssText};"><tr><td><div class="mstrmojo-SearchBox" mstrAttach:click ><input class="mstrmojo-SearchBox-input" type="text" style="width:{@width};" mstrAttach:keyup,blur/></div></td><td><div class="mstrmojo-SearchBox-bg"><div class="mstrmojo-Architect-SearchBox-search" id="{@id}sbClear" mstrAttach:click ></div></div></td></tr></table>',markupSlots:{inputNode:function(){return this.domNode.rows[0].cells[0].firstChild.firstChild;},clearNode:function(){return this.domNode.rows[0].cells[1].firstChild.firstChild;}},onclick:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event,tgt=e.target||e.srcElement,id=tgt&&tgt.id;switch(id.replace(this.id,"")){case"sbSearch":if(this.onEnter&&e.keyCode===13){this.onEnter();}this._onsearch();break;case"sbClear":this.clearSearch();break;}},clearSearch:function(){this.inputNode.value="";$C.removeClass(this.clearNode,["show"]);this._onsearch(true);},onkeyup:function onkeyup(evt){var hWin=evt.hWin,e=evt.e||hWin.event;var input=mstrmojo.string.trim(this.inputNode.value);if(this.clearNode){$C.toggleClass(this.clearNode,["show"],input.length>0);}this._onsearch();},_onsearch:function(toRoot){var mdl=mstrmojo.all.ArchModel,me=this;var callbacks={success:function(res){me.parent.DBTableTree.clearSelect();me.parent.DBTableTree.set("items",[]);var input=mstrmojo.string.trim(me.inputNode.value).toUpperCase();if(input.length>0){var filtered=[];var index=0;for(var i=0,len=res.length;i<len;i++){if(res[i].n.toUpperCase().indexOf(input)>-1){filtered[index++]=res[i];}}}else{filtered=res;}me.parent.DBTableTree.set("items",filtered);},failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}};mdl.getSelectedDBRoleTables(callbacks,_useCache);},enableMatchCase:false,onwidthChange:function(e){if(this.domNode){this.inputNode.style.width=parseInt(this.width)-71+"px";}},onRender:function(){this.inputNode.style.width=parseInt(this.width)-71+"px";}},{alias:"DBTableTree",id:"DBTableTree",scriptClass:"mstrmojo.TreeBrowser",cssClass:"mstrmojo-TreeBrowser mstrmojo-Architect-WarehouseTablesTree",items:[],draggable:true,multiSelect:true,itemDisplayField:"n",useCache:false,noCheckBox:true,ownAvatar:true,itemIdField:"did",selectionAcrossBranch:false,listSelector:mstrmojo.ListSelector,branchClickPolicy:mstrmojo.TreeBrowserEnum.BRANCH_POLICY_SELECT,itemFunction:function ifn(item,idx,w){var tree=w.tree||w,iw=new mstrmojo.TreeBrowserNode({data:item,state:0,parent:w,tree:tree,multiSelect:w.multiSelect,text:item[w.itemDisplayField],textCssClass:tree.item2textCss(item),items:item[w.itemChildrenField],itemIdField:w.itemIdField,itemDisplayField:"nt",itemIconField:w.itemIconField,itemChildrenField:w.itemChildrenField,itemFunction:w.itemFunction,listSelector:w.listSelector,draggable:true,ownAvatar:true,getDragData:function(c){var w=c.src.widget,d=w.data,p=w.parent;d.html=d.n;d.ns=new Array();for(var k in p.selectedIndices){d.ns.push(p.items[k].did);}return d;},onmousedown:function omd(evt){if(this.selectedIndex>-1){_dnd.startDragCheck(evt.hWin,evt.e);}},predblclick:function predblclick(evt){},postcreate:function(){this.scrollboxNode=new Object();this.dropCueNode=new Object();},ondragstart:function ondragstart(ctxt){var newNode=this.domNode.cloneNode(true);var qb=mstrmojo.all.ArchModel;if(!qb.FFSQLMode&&!qb.isFFSQL){if((ctxt.src.data)&&(ctxt.src.data.cln)){return false;}}this.parent.ownAvatar=true;var a=this.parent.avatar||_createAvatar(this);var newNode=this.domNode.cloneNode(true);var l=ctxt.src.pos.x+"px";var t=ctxt.src.pos.y+"px";if((ctxt.src.data)&&(ctxt.src.data.ns.length>1)){newNode.firstChild.childNodes[2].innerHTML=ctxt.src.data.ns.length;newNode.firstChild.childNodes[2].style.cssText="font-size:12px; font-weight:900;color:black;";}var fc=a.firstChild;var fs=newNode.childNodes[1];var fsc=fs.firstChild;while(fc){a.removeChild(fc);fc=a.firstChild;}while(fsc){fs.removeChild(fsc);fsc=fs.firstChild;}a.appendChild(newNode);_setPosition(a,t,l);a.style.display="block";return true;},ondragmove:function ondragmove(ctxt){var qdl=mstrmojo.all.ArchModel;var t=ctxt.tgt,w=ctxt.tgt.widget,a=this.parent.avatar;if(a){var l=t.pos.x+1+"px";var t=t.pos.y+1+"px";_setPosition(a,t,l);}if((qdl.FFSQLMode)&&w&&(w.data||w.id=="FFsql")){var x=ctxt.tgt.pos.x,y=ctxt.tgt.pos.y;if(w.id=="FFsql"){var ws=w.ctxtBuilder.itemWidgets,len=ws.length;if(len===0){return ;}var n=ws[len-1].domNode,pos=$D.position(n);if(y>pos.y+n.clientHeight){w._delaySetCaretPos(n,false);}else{for(var i=len-1;i>-1;i--){if(ws[i].data.v=="\n"||ws[i].data.v=="\t"){continue;}var node=ws[i].domNode,wy=$D.position(node).y;if(wy<y&&!(wy+14<y)){w._delaySetCaretPos(node,false);break;}}}}else{var len=w.data.v.length,width=w.domNode.offsetWidth,pos=$D.position(ctxt.tgt.widget.domNode),offset=parseInt((x-pos.x)*len/width+0.5);_R.collapseOnTextNode(ctxt.tgt.widget.domNode,offset);}}},ondragend:function ondragend(ctxt){var qdl=mstrmojo.all.ArchModel;if((ctxt.tgt.widget)&&(ctxt.tgt.widget.alias)&&(ctxt.tgt.widget.alias=="canvasbox")){}else{this.parent.avatar.style.display="none";this.parent.ownAvatar=false;}}});return iw;},getContentThroughTaskCall:function getContentThroughTaskCall(params,callbacks){var m=mstrmojo.all.ArchModel,me=this;if(params.isRoot){callbacks.success(me.items);}else{m.getColumnsForDBTable(params,callbacks);}},isBranch:function isBranch(data){return data.items;},item2textCss:function item2textCss(data){return("mstrmojo-ArchitectListIcon "+(data.items?"t15":"t26"));},onheightChange:function heightchange(evt){if(this.domNode){this.domNode.style.height=parseInt(this.height)+"px";}},dbroleChange:function clear(evt){var tr=this;tr.set("items",[]);callbacks={success:function(res){tr.set("items",res);},failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}};var m=mstrmojo.all.ArchModel;m.getSelectedDBRoleTables(callbacks,this.useCache);},onRender:function onR(){var me=this,_cxtmenu_hide=function(evt){var cxtmenu=me.parent.cxtmenu;if(cxtmenu){var w=$D.findWidget($D.isFF?evt.relatedTarget:evt.toElement);if(w&&(w.id==cxtmenu.id)){return ;}cxtmenu.cssText="position:relative;visibility:hidden;";cxtmenu.render();}},_cxtmenu_popup=function(evt){var cxtmenu=me.parent.cxtmenu;_cachedRow=null;if(cxtmenu){cxtmenu.cssText="position:relative;visibility:hidden;";var target=$D.eventTarget(window,evt);var isTableRow,isColumnRow,isPNode=(target.className.indexOf("mstrmojo-TreeNode-div")>-1),isCNode=(target.tagName.toUpperCase().indexOf("SPAN")>-1);var left,top;if(isPNode){if(target.children[2]){isColumnRow=target.children[2].className.indexOf("t26")>=0;isTableRow=target.children[2].className.indexOf("t15")>=0;left=target.offsetLeft+target.offsetWidth-27;top=target.offsetTop-me.domNode.scrollTop-me.domNode.clientHeight;_cachedRow=target;}}if(isCNode){isColumnRow=target.className.indexOf("t26")>=0;isTableRow=target.className.indexOf("t15")>=0;left=target.parentNode.offsetLeft+target.parentNode.offsetWidth-27;top=target.parentNode.offsetTop-me.domNode.scrollTop-me.domNode.clientHeight+3;_cachedRow=target.parentNode;}if(isTableRow){cxtmenu.cssText="position:relative; height:20px; width:18px; left:"+left+"px; top:"+top+"px;visibility:visible; border:0px; background-color:transparent";}cxtmenu.render();}};if(this.domNode){this.domNode.style.height=parseInt(this.height)+"px";this.domNode.style.width=parseInt(this.width)+"px";$D.attachEvent(this.domNode,"mousemove",_cxtmenu_popup);$D.attachEvent(this.domNode,"click",_select_treeitem);$D.attachEvent(this.domNode,"mouseout",_cxtmenu_hide);}}},{scriptClass:"mstrmojo.MenuButton",cssClass:"mstrmojo-Editor-button function",cssText:"position:absolute; height:20px; width:20px;visibility:hidden; border:0px solid; background-color:transparent;",iconClass:"mstrmojo-ArchitectListIcon addbtn",alias:"cxtmenu",itemIdField:"did",itemField:"n",text:"",itemChildrenField:"fns",onclick:function(evt){_select_treeitem(evt.e);var tlist=[],item,tr=this.parent.DBTableTree,h=tr.selectedIndices,mdl=mstrmojo.all.ArchModel,count=0;if(mdl){for(var index in h){item=tr.items[index];if(item.st==8405){tlist[count]=item;_toAdd[item.n]=parseInt(index);count++;}}mdl.addTables(tlist);}_cachedRow=null;this.cssText="position:relative;visibility:hidden;";this.render();},onRender:function(){var mouseover_handle=function(evt){if(_cachedRow){$C.toggleClass(_cachedRow,"architect-highlight",true);}},mouseout_handle=function(evt){if(_cachedRow){$C.toggleClass(_cachedRow,"architect-highlight",false);}};$D.attachEvent(this.domNode,"mousemove",mouseover_handle);$D.attachEvent(this.domNode,"mouseout",mouseout_handle);}}],onheightChange:function(e){this.DBTableTree.set("height",parseInt(e.value)-68+"px");},onwidthChange:function(e){this.SearchBox.set("width",parseInt(e.value)+"px");}})],load:function(){var mdl=mstrmojo.all.ArchModel;if(!mdl){mdl=new mstrmojo.Architect.ArchitectModel();}this.children[0].initModel(mdl);mdl.attachEventListener("dbrsChange",this.children[0].id,"load");mdl.loadDBRoles();var treeid=this.children[1].DBTableTree.id;mdl.attachEventListener("dbroleChange",treeid,"dbroleChange");var btnid=this.children[1].children[0].children[1].id;mdl.attachEventListener("cacheStamped",btnid,"cacheStamped");}});})();