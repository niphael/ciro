(function(){mstrmojo.requiresCls("mstrmojo.boxmodel","mstrmojo.array","mstrmojo.hash","mstrmojo.dom","mstrmojo.css","mstrmojo.Widget","mstrmojo.Arr","mstrmojo._HasLayout","mstrmojo._ListBase2Selections","mstrmojo.ListSelector","mstrmojo._TouchScrolling","mstrmojo._PagingList");var _H=mstrmojo.hash,_A=mstrmojo.array,_B=mstrmojo.boxmodel,_D=mstrmojo.dom;function _callSelector(w,fn,evt){var s=w.listSelector;if(s){s[fn](w,w.itemsContainerNode,evt);}}function _lastPagePos(me,dragId){var lpp=me.lastPagePos;if(!lpp||lpp.dragId!==dragId){lpp=_B.offset(me.itemsContainerNode);lpp.dragId=dragId;me.lastPagePos=lpp;var sbn=me.scrollboxNode;me.lastScrollPos={left:sbn.scrollLeft,top:sbn.scrollTop,width:sbn.clientWidth,height:sbn.clientHeight};}}function _whereDrop(me,c,cache){var el=c&&c.node;if(el===me.dropCueNode||el===me.dropCueNode.firstChild){return me.dropCuePos;}var lm=me.listMapper;var at=lm&&lm.whereDrop(me,me.itemsContainerNode,el,c.pos,{left:me.lastPagePos.left-me.lastScrollPos.left,top:me.lastPagePos.top-me.lastScrollPos.top,width:me.lastScrollPos.width,height:me.lastScrollPos.height});var atWas=me.dropCuePos;return((cache!==false)&&atWas&&at&&(atWas.idx===at.idx)&&(atWas.left===at.left)&&(atWas.top===at.top))?atWas:at;}var _AEL="attachEventListener";function _initItems(me,its){if(me.makeObservable){its=its||[];if(!its[_AEL]){mstrmojo.hash.make(its,me.itemsScriptClass||mstrmojo.Arr);}}return its;}function _attItems(me,its){if(its&&its[_AEL]){me._sub_its=its;me._sub_add=its[_AEL]("add",me.id,"preadd");me._sub_rmv=its[_AEL]("remove",me.id,"preremove");}}function _detItems(me){if(me._sub_its){var p=mstrmojo.publisher;p.unsubscribe(me._sub_add);p.unsubscribe(me._sub_rmv);delete me._sub_add;delete me._sub_rmv;delete me._sub_its;}}mstrmojo.ListBase2=mstrmojo.declare(mstrmojo.Widget,[mstrmojo._ListBase2Selections,mstrmojo._TouchScrolling,mstrmojo._PagingList,mstrmojo._HasLayout],{scriptClass:"mstrmojo.ListBase2",items:null,markupString:'<div id="{@id}" class="mstrmojo-ListBase2 {@cssClass}" style="position:relative;{@cssText}" mstrAttach:mousedown,mouseup,dblclick><div class="mstrmojo-ListBase2-itemsContainer" style="position:relative;{@itemsContainerCssText}">{@itemsHtml}</div><div class="mstrmojo-ListBase2-dropCue {@cssClass}"><div class="mstrmojo-ListBase2-dropCue-inner"></div></div></div>',markupSlots:{scrollboxNode:function(){return this.domNode;},itemsContainerNode:function(){return this.domNode.firstChild;},dropCueNode:function(){return this.domNode.lastChild;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?this.cssDisplay:"none";},ondropCuePosChange:function(){var dcn=this.dropCueNode,s=dcn&&dcn.style;if(!s){return ;}var pos=this.dropCuePos,vis=!!pos;if(vis){s.left=pos.left+"px";s.top=pos.top+"px";}s.display=vis?"block":"none";},onpageChange:function(){if(this.usePaging&&!this._inScroll){this._inPaging=true;this.listMapper.toPage(this,this.page);this._inPaging=false;}}},autoHide:false,renderOnScroll:false,firstRenderBlockSize:50,renderBlockSize:50,listMapper:null,listBuilder:null,listSelector:mstrmojo.ListSelector,animate:false,itemsEffect:null,containerResizable:true,init:function init(props){this._super(props);this.items=this.initItems(this.items);var h=this.selectedIndices,a=this.selectedIndicesList,i=this.selectedIndex,o=this.selectedItem;this.selectedIndices={};this.selectedIndex=-1;delete this.selectedIndicesList;delete this.selectedItem;if(h||a||(i>-1)||o){this.initSelections(h,a,i,o);}if(this.postInitItems){this.postInitItems();}},initItems:function initItems(its){return _initItems(this,its);},preBuildRendering:function preBR(){var lb=this.listBuilder,c=lb.newContext(this);this.ctxtBuilder=c;var ms=this.markupSlots,eros=!!(this.renderOnScroll&&this.renderBlockSize&&ms&&ms.scrollboxNode),its=this.items,len=(its&&its.length)||0,top=eros?this.firstRenderBlockSize:len,bot=eros?this.firstRenderBlockSize:0;this._eros=eros;this.paused=false;this.itemsHtml=this.listMapper.buildItemWrappers(its,lb,this,c,top,bot).join("");this.itemsContainerCssText="visibility: hidden";if(this._super){this._super();}},postBuildRendering:function pstBR(){delete this.itemsHtml;var lm=this.listMapper;if(lm&&lm.postBuildRendering){lm.postBuildRendering(this.itemsContainerNode,this.items,this.listBuilder,this,this.ctxtBuilder);}_attItems(this,this.items);if(this._eros||this.usePaging){if(!this._cb_scroll){var id=this.id;this._cb_scroll=function(){var me=mstrmojo.all[id];me.onscroll();};}mstrmojo.dom.attachEvent(this.scrollboxNode,"scroll",this._cb_scroll);this.onscroll();}if(this.animate){for(var i=0,fxs=["itemsEffect","scrollEffect"],len=fxs.length;i<len;i++){var n=fxs[i],fx=this[n];if(fx&&fx.constructor===Object){fx=mstrmojo.insert(mstrmojo.hash.clone(fx));fx.widget=this;this[n]=fx;}}if(this.itemsEffect){this.itemsEffect.play();}}this.itemsContainerNode.style.visibility="inherit";if(this.containerResizable&&this.itemsContainerNode.scrollWidth<this.domNode.scrollWidth){this.itemsContainerNode.style.width=this.domNode.scrollWidth+"px";}if(this._super){this._super();}},unrender:function unrn(ignoreDom){_detItems(this);if(this._eros){mstrmojo.dom.detachEvent(this.scrollboxNode,"scroll",this._cb_scroll);delete this._cb_scroll;}for(var i=0,ns=["itemsEffect","scrollEffect"],len=ns.length;i<len;i++){var fx=this[ns[i]];if(fx&&fx.isPlaying){fx.cancel();}}this._super(ignoreDom);},pauseScrollRendering:function pau(pause,onInterval,onComplete){if(pause!==false){pause=true;}if(this.paused===!!pause){return ;}this.paused=!!pause;if(pause){if(this._fillTmr){window.clearTimeout(this._fillTmr);delete this._fillTmr;}}else{this.fill(onInterval,onComplete);}},onscroll:function scll(){if(this.paused){return ;}if(this._eros){if(!this._fillTmr){var me=this;this._fillTmr=self.setTimeout(function(){me.fill();me=null;},50);}}if(this._super){this._super();}},fill:function fll(onInterval,onComplete){if(this._fillTmr){window.clearTimeout(this._fillTmr);delete this._fillTmr;}var len=(this.items&&this.items.length)||0;if(!len){if(onComplete){onComplete();}}else{var sbn=this.scrollboxNode,icn=this.itemsContainerNode,off=mstrmojo.boxmodel.offset(icn,sbn),im=this.listMapper,idxs=im.findScrollRange(icn,len,(this.usesTouches&&this.pos&&parseInt(this.pos.y,10))||sbn.scrollTop,sbn.clientHeight,(this.usesTouches&&this.pos&&parseInt(this.pos.x,10))||sbn.scrollLeft,sbn.clientWidth,off.left,off.top);if(this.fillAt(idxs.start,idxs.end)){if(onInterval){onInterval();}var id=this.id;this._fillTmr=window.setTimeout(function(){mstrmojo.all[id].fill(onInterval,onComplete);},100);}else{if(onComplete){onComplete();}}}},fillAt:function fllAt(start,end){var im=this.listMapper;if(im){return im.fillItemWrappers(this.itemsContainerNode,this.items,this.listBuilder,this,this.ctxtBuilder,start,end,this.renderBlockSize);}else{return false;}},add:function add(arr,at){if(!arr||!arr.length){return -1;}var its=this.items;if(at==null){at=_H.min(this.selectedIndices,false,true);if(at!==null&&at!==undefined){at++;}}if(at==null||at===-1){at=(its&&its.length)||0;}if(its&&its.add){its.add(arr,at);}else{this.set("items",its?_A.insert(its.concat(),at,arr):arr);}return at;},preadd:function pa(evt){if(this.hasRendered){var lm=this.listMapper;if(lm){lm.onadd(this,this.itemsContainerNode,this.ctxtBuilder,evt);}var lb=this.listBuilder;if(lb){lb.onadd(this,this.ctxtBuilder,evt);}var ls=this.listSelector;if(ls){ls.onadd(this,evt);}if(this._eros){this.onscroll();}else{var i=evt.index,len=evt.value.length;this.fillAt(i,i+len-1);}}if(this.onadd){this.onadd(evt);}if(this._super){this._super(evt);}},remove:function rmv(arr){if(arr==null){return -1;}if(arr.constructor!==Array){return this._remove(arr);}var its=this.items;if(its){var i;if(its.remove){for(i=arr.length-1;i>-1;i--){its.remove(arr[i],1);}}else{its=its.concat();for(i=arr.length-1;i>-1;i--){its.splice(arr[i],1);}this.set("items",its);}return arr[0];}return -1;},_remove:function rmv(item){var its=this.items;if(!its||(item==null)){return -1;}var idx;if(!isNaN(item)){idx=item;}else{idx=this.itemIndex(item);}if(idx>-1){if(its.remove){its.remove(idx,1);}else{its=its.concat();its.splice(idx,1);this.set("items",its);}}return idx;},duplicate:function dup(item,at,config){var its=this.items,idx=-1;if(!its||(item==null)){return -1;}if(!isNaN(item)){if(at===null||at===undefined){at=item+1;}item=its[item];}else{if(at===null||at===undefined){at=this.itemIndex(item)+1;}}if(item){var it;it=_H.copy(config,_H.clone(item));idx=this.add([it],at);}return idx;},preremove:function prm(evt){if(this.hasRendered){var lm=this.listMapper;if(lm){lm.onremove(this,this.itemsContainerNode,this.ctxtBuilder,evt);}var lb=this.listBuilder;if(lb){lb.onremove(this,this.ctxtBuilder,evt);}var ls=this.listSelector;if(ls){ls.onremove(this,evt);}if(this._eros){this.onscroll();}}if(this.onremove){this.onremove(evt);}if(this._super){this._super(evt);}},move:function mv(arr,idx){function noMove(from,count){return(idx>=from)&&(idx<=from+count);}var max=(this.items&&this.items.length)||0;if(idx===-1||idx==null||isNaN(idx)){idx=max;}else{idx=Math.min(idx,max);}var its,at,idxs,len;if(arr.constructor===Array){at=arr;idxs=arr;len=(at&&at.length)||0;if(noMove(arr[0],arr.length)){return false;}its=_A.get(this.items,arr);}else{if(typeof (arr)==="object"){its=[arr];len=1;at=this.itemIndex(its[0]);idxs=[at];if(noMove(at,1)){return false;}}else{at=arr;idxs=[arr];len=1;if(noMove(at,1)){return false;}its=[this.items[at]];}}for(var i=0;i<len;i++){if(idxs[i]<=idx){idx--;}}if(its[0]!=null){this.remove(at);this.add(its,idx);}return true;},itemIndex:function ix(item){if(item==null){return -1;}var f=this.itemIdField;return f?_A.find(this.items,f,item[f]):_A.indexOf(this.items,item);},prechange:function pchg(evt){if(this.hasRendered){var arr=[this.listBuilder,this.listMapper];for(var i=0,len=arr.length;i<len;i++){var o=arr[i];if(o&&o.onchange){o.onchange(this,this.itemsContainerNode,this.ctxtBuilder,evt);}}}},makeObservable:false,_set_items:function stits(n,v){var was=this.items;v=this.initItems(v);this.items=v;if(was!==v){var me=this,fn=function(){if(me.autoHide){me.set("visible",!!(v&&v.length));}me=null;},hr=this.hasRendered;if(hr){this.refresh(fn);}else{fn();}}return was!==v;},premousedown:function pmd(evt){_callSelector(this,"premousedown",evt);},premouseup:function pmu(evt){_callSelector(this,"premouseup",evt);},scrollTo:function st(item){var idx,lm=this.listMapper;if(lm&&lm.toItem){if(!isNaN(item)){idx=item;}else{idx=this.itemIndex(item);}if(idx>=0){lm.toItem(this,idx);}}},draggable:false,getDragData:function(c){_lastPagePos(this,c.id);var at=_whereDrop(this,c.src),idx=at&&at.idxActual;if((idx>-1)&&this.selectedIndices[idx]){var idxs=this.sortSelectedIndices(),arr=_A.get(this.items,idxs)||[];switch(arr.length){case 1:return _H.copy(arr[0],{html:arr[0][this.itemDisplayField],index:idxs[0]});case 0:return null;default:return _H.copy({html:arr.length+" selections",indices:idxs},arr);}}},dropZone:false,ondragenter:function(c){_lastPagePos(this,c.id);this.set("dropCuePos",_whereDrop(this,c.tgt));},ondragover:function(c){this.set("dropCuePos",_whereDrop(this,c.tgt));},ondragleave:function(c){this.set("dropCuePos",null);},ondragstart:function(c){if(!(c&&c.src&&c.src.data)){return false;}},allowCopy:false,ondragend:function(c){var t=c&&c.tgt,w=t&&t.widget;if(w===this){}else{if(this.tree&&w&&w.tree===this.tree){if(!this.allowCopy||!_D.ctrlKey(t.hWin,t.e)){var d=c.src&&c.src.data;if(d&&(d.indices||(d.index!==null))){this.remove(d.indices||d.index);}}}}},ondrop:function(c){var s=c&&c.src,d=s&&s.data;if(d){var at=_whereDrop(this,c.tgt,false),idx=at&&at.idx,isArr=(d&&d.constructor===Array);var its=this.items;idx=Math.min(idx,(its&&its.length)||0);var chg=true;if(s.widget===this){chg=this.move(this.sortSelectedIndices(),idx);}else{this.add(isArr?d:[d],idx);}if(chg){var len=isArr?d.length:1,sel={};for(var i=0;i<len;i++){sel[idx+i]=true;}this.set("selectedIndices",sel);}}this.set("dropCuePos",null);}});})();