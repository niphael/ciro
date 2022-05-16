(function(){mstrmojo.requiresCls("mstrmojo.XtabBase","mstrmojo.XtabZone","mstrmojo._TouchGestures","mstrmojo._HasXtabTouchScroll","mstrmojo._XtabSelections","mstrmojo.dom","mstrmojo.hash","mstrmojo.css","mstrmojo._HasMagnifier","mstrmojo.XtabMagnifierHelper");var $CSS=mstrmojo.css,$DOM=mstrmojo.dom;var LOCK_OFF=0;var LOCK_ROW=1;var LOCK_COL=2;var LOCK_BOTH=3;function flagUnit(cellNode,isDirty){$CSS.toggleClass(cellNode.firstChild,"tx-active",isDirty);}function bringMagnifierToFront(magnifier){if(magnifier){magnifier.domNode.style.pointerEvents="auto";}}function checkLinks(){if(mstrMobileApp.isOnline()){return ;}var controller=this.controller,z,zone,nodes,node,cell,action,i,lnk,linkRequests=[],linkNodes=[],req;if(!controller.getLinkRequest){return ;}for(z in this.zones){if(z==="_BL"||z==="_BR"){zone=this.zones[z];nodes=zone.getNodesByPositions(zone.posMap);for(i=0;i<nodes.length;i++){node=nodes[i];cell=this.getCellForNode(node);if(cell&&cell.at&&(cell.at&4)){action=this.model.getAction(this.getActionCells(cell),null);if(action){lnk=action.a;req=controller.getLinkRequest(lnk);if(req){linkRequests.push(req);linkNodes.push(node);}}}}}}var count=linkRequests.length;if(count){var fnSuccess=function(res){var i,node;for(i=0;i<count;i++){node=linkNodes[i];if(!res[i]){node.setAttribute("hl_d",true);$CSS.addClass(node,"hl_d");}}};if(mstrApp.isHosted()){}else{this.model.getDataService().checkCachedLinkTargets(linkRequests,{success:fnSuccess,failure:mstrmojo.emptyFn});}}}function onConnectivityChange(){if(mstrMobileApp.isOnline()){var z,zone,nodes,node,i;for(z in this.zones){if(z==="_BL"||z==="_BR"){zone=this.zones[z];nodes=zone.getNodesByPositions(zone.posMap);for(i=0;i<nodes.length;i++){node=nodes[i];node.removeAttribute("hl_d");$CSS.removeClass(node,"hl_d");}}}}else{checkLinks.call(this);}}mstrmojo.MobileXtab=mstrmojo.declare(mstrmojo.XtabBase,[mstrmojo._TouchGestures,mstrmojo._HasXtabTouchScroll,mstrmojo._XtabSelections,mstrmojo._HasMagnifier],{scriptClass:"mstrmojo.MobileXtab",frameRate:30,enableMagnifier:true,useSeamlessIncFetch:false,allowToggleSelections:true,markupMethods:{onvisibleChange:function(){this.domNode.style.display=(this.visible)?"block":"none";},onheightChange:function(){this.domNode.style.height=this.height||"";},onwidthChange:function(){this.domNode.style.width=this.width||"";}},init:function init(props){this._super(props);this.magnifierHelper=new mstrmojo.XtabMagnifierHelper({xtab:this});this.disposables.push(this.magnifierHelper);},gridPagesRendered:function gridPagesRendered(){this._super();checkLinks.call(this);},onRender:function onRender(){this._super();var interactiveCells=this.interactiveCellsArray;if(interactiveCells&&interactiveCells.length>0&&this.controller.getLinkRequest){if(!this.subscr){var publisher=mstrmojo.publisher;this.subscr=publisher.subscribe(publisher.NO_SRC,publisher.CONNECTIVITY_CHANGED_EVENT,onConnectivityChange,this.id);}if((mstrApp.useBinaryFormat||mstrApp.isHosted())&&!mstrMobileApp.isOnline()){var me=this;window.setTimeout(function(){try{checkLinks.call(me);}catch(ex){}},100);}}},unrender:function unrender(){if(this.subscr){mstrmojo.publisher.unsubscribe(this.subscr);delete this.subscr;}this._super();},getDataService:function getDataService(options){return this.model.getDataService();},setData:function setData(data){this.set("gridData",data);},createZone:function createZone(cfg){cfg=cfg||{};var ds=this.getDataService();cfg.imgCacheMap=(ds&&ds.imgCache)||this.imgCacheMap;cfg.unCachedMap={};return new mstrmojo.XtabZone(cfg);},showDownloadStatus:function showDownloadStatus(){},onclick:mstrmojo.emptyFn,setupTNs:function setupTNs(){var node=this.contentNode,scrollBox=node.rows[1].cells[1].lastChild,zIndex=0;switch(this.lockHeadersCase){case LOCK_OFF:this._TSN.x=[scrollBox.lastChild.lastChild];this._TSN.y=[scrollBox.firstChild];break;case LOCK_COL:this._TSN.x=[node];this._TSN.y=[scrollBox.firstChild];break;case LOCK_ROW:this._TSN.x=[scrollBox];this._TSN.y=[node];zIndex=-1;break;case LOCK_BOTH:this._TSN.x=[node.rows[0].cells[1].lastChild,scrollBox.firstChild];this._TSN.y=[node.rows[1]];zIndex=2;break;}if(zIndex){this._TSN.x[0].style.zIndex=zIndex;}this.setOffsets();this.attachEventListener("scrolledOut",this.id,this.scrolledOut);},useDomToCalculateOffsets:function useDomToCalculateOffsets(){return(this.lockHeadersCase===LOCK_OFF||(this._super&&this._super()));},setOffsets:function setOffsets(){var TW=0,TH=0;var lockHeadersCase=this.lockHeadersCase;if(this.useDomToCalculateOffsets()){var touchNodes=this._TSN,xScroll=touchNodes.x[0],yScroll=touchNodes.y[0];TW=xScroll.offsetLeft+xScroll.offsetWidth+(!!(lockHeadersCase&LOCK_ROW)?this._BL.offsetWidth:0);TH=yScroll.offsetTop+yScroll.offsetHeight+(!!(lockHeadersCase&LOCK_COL)?this._TR.offsetHeight:0);}else{var zones=this.zones,rh=(this.gridData.rh&&parseInt(this.gridData.rh,10))||0,cntTopRight=zones._TR?zones._TR.cp.rc:0,cntBottomRight=zones._BR.cp.rc,widthBottomLeft=zones._BL?zones._BL.totalColWidth:0,widthBottomRight=zones._BR.totalColWidth;TH=((lockHeadersCase===LOCK_ROW)?cntBottomRight:cntTopRight+cntBottomRight)*rh;TW=(lockHeadersCase===LOCK_COL)?widthBottomRight:widthBottomLeft+widthBottomRight;}var HEIGHT=1,WIDTH=2,scrollWidth=this.getGridDimension(WIDTH)||0,scrollHeight=this.getGridDimension(HEIGHT)||0;this._TMAX={x:Math.min(scrollWidth-TW,0),y:Math.min(scrollHeight-TH,0)};if(this._super){this._super();}},touchTap:function touchTap(touch){if(!this.magnifier){if(this._super){this._super();}if(this.performAction(touch)===false){var ctrl=this.controller;if(ctrl&&ctrl.viewTap){ctrl.viewTap();}}}},performAction:function performAction(touch){this.deselectCell();var td=$DOM.findAncestorByAttr(touch.target,"ei",true,this.domNode);if(!td||!td.value){return false;}var node=td.node,cell=this.getCellForNode(node),actionType=cell.at;if(this._super&&this._super(touch)){return ;}if(!actionType){return false;}if((actionType&4)&&!node.getAttribute("hl_d")){var mask=document.createElement("div"),st=mask.style;id=this.id;mask.className="activeLink on";st.left=node.offsetLeft+"px";st.top=node.offsetTop+"px";st.width=node.offsetWidth+"px";st.height=node.offsetHeight+"px";node.appendChild(mask);window.setTimeout(function(){var grid=mstrmojo.all[id];if(grid&&grid.hasRendered){$DOM.attachOneTimeEvent(mask,"webkitTransitionEnd",function(){node.removeChild(mask);});$CSS.removeClass(mask,"on");}},200);}this.defaultAction(node);},selectCell:function selectCell(cell){var highlight=document.createElement("div"),highlightStyle=highlight.style;highlight.className="overlay";highlightStyle.top=cell.offsetTop+"px";highlightStyle.left=(cell.offsetLeft+1)+"px";highlightStyle.height=(cell.clientHeight-2)+"px";highlightStyle.width=(cell.clientWidth-1)+"px";cell.appendChild(highlight);},flagDirtyUnit:function flagDirtyUnit(cellNode){flagUnit(cellNode,true);},clearDirtyUnit:function clearDirtyUnit(cellNode){flagUnit(cellNode,false);},deselectCell:function deselectCell(){var cell=this._selectedCell;if(cell){cell.removeChild(cell.lastChild);delete this._selectedCell;}},touchSelectBegin:function touchSelectBegin(touch){if(this.enableMagnifier){var controller=this.controller,magnifierConfig;if(controller.getMagnifierConfig){magnifierConfig=controller.getMagnifierConfig();}this.displayMagnifier(touch,magnifierConfig);}},touchSelectMove:function touchSelectMove(touch){if(this.enableMagnifier){var me=this;this.latestTouch=touch;if(!this._moveMagnifierTimer){this._moveMagnifierTimer=setTimeout(function(){me.displayMagnifier(me.latestTouch);me._moveMagnifierTimer=null;},50);}}},touchSelectCancel:function touchSelectCancel(touch){bringMagnifierToFront(this.magnifier);},touchSelectEnd:function touchSelectEnd(touch){bringMagnifierToFront(this.magnifier);},getCaptureDimensions:function getCaptureDimensions(){var viewport=this.viewport,position=$DOM.position(this.domNode,true);position.w=Math.min(viewport.offsetWidth,position.w);position.h=Math.min(viewport.offsetHeight,position.h);return position;}});}());