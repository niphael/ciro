(function(){mstrmojo.requiresCls("mstrmojo.maps.androidmap.AndroidMap","mstrmojo.maps.androidmap.AndroidDocMapInfoWindow","mstrmojo.Image","mstrmojo.DynamicClassFactory","mstrmojo.Box","mstrmojo._HasLayout","mstrmojo.DocPanel","mstrmojo.hash","mstrmojo.array","mstrmojo.dom");var $DOM=mstrmojo.dom;var REGULAR_SIZE=0,FULL_SCREEN=1,$H=mstrmojo.hash;function adjustFormat(fmt){if(!fmt||!fmt.p_fmts){return fmt;}var panel_fmt=fmt.p_fmts;var panel_top=parseInt(panel_fmt.top)||0;var panel_height=parseInt(panel_fmt.height)||0;var height=parseInt(fmt.height)||0;return{top:(panel_top+panel_height-height)+"px",left:panel_fmt.left,width:fmt.width,height:fmt.height,"z-index":panel_fmt["z-index"]};}function compareFormats(fmt1,fmt2){if(fmt1&&fmt2){if(fmt1["z-index"]>fmt2["z-index"]){return false;}var x1=parseInt(fmt1.left),y1=parseInt(fmt1.top),w1=parseInt(fmt1.width),h1=parseInt(fmt1.height),x2=parseInt(fmt2.left),y2=parseInt(fmt2.top),w2=parseInt(fmt2.width)||0,h2=parseInt(fmt2.height)||0;return((((x1<=x2)&&(x2<x1+w1))||((x2<x1)&&(x1<x2+w2)))&&(((y1<=y2)&&(y2<y1+h1))||((y2<y1)&&(y1<y2+h2))));}return false;}function registerMapRendering(){if(!mstrApp.renderingMap||(mstrApp.renderingMap===this.id)){mstrApp.renderingMap=this.id;return true;}else{return false;}}function deregisterMapRendering(){if(mstrApp.renderingMap===this.id){delete mstrApp.renderingMap;return true;}return false;}mstrmojo.maps.androidmap.AndroidDocMap=mstrmojo.declare(mstrmojo.maps.androidmap.AndroidMap,[mstrmojo._Formattable],{scriptClass:"mstrmojo.maps.androidmap.AndroidDocMap",markupString:'<div id="{@id}" class="mstrmojo-Box {@cssClass}" style="{@domNodeCssText}" mstrAttach:touchstart></div>',formatHandlers:{domNode:["left","top","z-index","height","width","border","border-color","border-style","border-width"]},sc:null,domNodeCssText:"position:relative;",lastSelectedRow:null,hasTarget:function hasTarget(){var sc=this.getInfoWindowSelectorControl(this.gridData);return !!(sc&&sc.tks);},postBuildRendering:function postBuildRendering(){this._touchListener=mstrmojo.touchManager.attachEventListener("touchesBegin",this.id,function(evt){var openInfoWindow=this.openedInfoWindow;if(openInfoWindow){if(!$DOM.contains(this.domNode,evt.touch.target,true,document.body)){openInfoWindow.close();}}});return this._super();},destroy:function destroy(ignoreDom){var listener=this._touchListener;if(listener){mstrmojo.touchManager.detachEventListener(listener);delete this._touchListener;}if(this.mapRendered){this.removeMap();}this._super(ignoreDom);},setModel:function setModel(d){this.doc=d.controller.view;this._super(d);},initFromVisProps:function initFromVisProps(vp){this._super(vp);if(!vp){return ;}this.iwDocLayout=(parseInt(vp.dl,10)===1);if(vp.lyt){this.iwLayoutKey=vp.lyt;}},findSelectorTarget:function findSelectorTarget(sc){if(sc&&sc.tks){var dm=this.xtabModel.docModel,targets=sc.tks.split("\u001E"),i=0,len=targets.length;for(i=0;i<len;++i){var d=dm.getTargetDefn(targets[i]);if(d[targets[i]].ifw){return targets[i];}}}return null;},findIntersectingComponents:function findIntersectingComponents(){var container=this,skipNode,fmt=this.getFormats();while(container.scriptClass!="mstrmojo.DocSubsection"||container.scriptClass!="mstrmojo.DocInfoWindow"){skipNode=container;container=container.parent;if(!container){break;}var children=container.children,numChild=(children&&children.length)||0,comp=null,idx;for(idx=0;idx<numChild;idx++){comp=children[idx];if(comp!=skipNode&&comp.getFormats&&compareFormats(adjustFormat(fmt),adjustFormat(comp.getFormats()))){return true;}}}return false;},getGridModel:function(){var gridModel=this._super();delete gridModel.layoutModel;delete gridModel.layoutNode;return gridModel;},dispatchMapData:function dispatchMapData(){if(!registerMapRendering.call(this)){this.domNode.innerHTML=mstrmojo.desc(9480,"Only one map visualization is supported at a time");mstrmojo.css.addClass(this.domNode,"noMapVis");return ;}var doc=this.doc,m=doc.model,viewTree=this.getViewHierarchy(),mapModel=this.getMapModel(),gridModel=this.simplifyGridData(),layouts=(doc.getSupportedLayouts&&doc.getSupportedLayouts())||doc.getLayouts(),fullScreen=!!this.isFullScreenWidget?FULL_SCREEN:REGULAR_SIZE,isActive=false,curLyt=doc.getCurrentLayout(),docData;docData=JSON.stringify({did:doc.did,ttl:doc.ttl,st:doc.st,mid:m.mid,ci:m.ci,bs:m.bs,zt:m.zt,defn:m.defn,currlaykey:m.currlaykey});delete mapModel.model;if(curLyt.setMapID){curLyt.setMapID(this.id);}if(!fullScreen){isActive=this.findIntersectingComponents();}mstrMobileApp.loadMap(JSON.stringify($H.copy({fullScreen:fullScreen,infoWindow:this.getInfoWindowConfig(),viewTree:viewTree,mapPath:this.mapPath,active:isActive,docModelId:this.xtabModel.docModel.id,hasTarget:this.hasTarget(),zt:m.zt,gdProp:gridModel.prop},mapModel)),gridModel.es,gridModel.data,docData);this.mapRendered=true;},getViewHierarchy:function(){var mapPath=[];var p=this.parent,w=[],c=$H.copy(this.fmts,{}),me=this;w.push(c);while(p){c=$H.copy(p.fmts,{});c.id=p.id;mapPath.push(c.id);if(p.scriptClass==="mstrmojo.MobileDocLayoutViewer"){delete c.width;delete c.height;}else{if(p instanceof mstrmojo.DocPanel){var left=parseInt(p.domNode.style.left,10);if(left>0){p.parent._scrollOffsetLeft=left;}}else{if(p.scriptClass==="mstrmojo.DocSection"){if(p.domNode.offsetTop){c.top=p.domNode.offsetTop+"px";}}else{if(p.scriptClass==="mstrmojo.DocInfoWindow"){if(p.containerNode){c.top=p.containerNode.offsetTop+"px";c.left=p.containerNode.offsetLeft+"px";}p.onClose=function(){mstrMobileApp.hideMapView(1);};}}}}if(p._scroller){if(!p._scroller.scrollMoveListener){var scrollerUpdate=function(e){mstrMobileApp.scrollerUpdated(JSON.stringify({id:this.id,x:e.x-(this._scrollOffsetLeft||0),y:e.y}));};p._scroller.attachEventListener("scrollMoved",p.id,scrollerUpdate);p._scroller.attachEventListener("scrollDone",p.id,scrollerUpdate);p._scroller.attachEventListener("transformAnim",p.id,scrollerUpdate);p._scroller.scrollMoveListener=true;}c.scroller=true;}w.splice(0,0,c);p=p.parent;}this.mapPath=mapPath.join("")+":"+JSON.stringify(w);return w;},getInfoWindowConfig:function useDefaultInfoWindow(){if(!this.iwConfig){if(this.iwDocLayout){this.iwConfig={dft:false};}else{var d=this.gridData,sc=this.getInfoWindowSelectorControl(d);if(sc){var dm=this.xtabModel.docModel,tgtDefs=dm.getTargetDefn(sc.tks);if(this.findSelectorTarget(sc)){this.iwConfig={dft:false};if(tgtDefs&&tgtDefs[sc.tks]){var fmt=tgtDefs[sc.tks].fmts;this.iwConfig.size={w:parseInt(fmt.width,10),h:parseInt(fmt.height,10)};return this.iwConfig;}}}this.iwConfig={dft:true};}}return this.iwConfig;},resetLayout:function resetLayout(){if(this.iwDocLayout&&this.preIWLayout){this.doc.selectLayout(this.preIWLayout,true,null,true);this.preIWLayout=null;}},closeInfoWindow:function closeInfoWindow(){do{mstrApp.closeDialog();}while(mstrmojo.all.mstrMapInfoWindow);},removeMarkerAnchor:function removeMarkerAnchor(){var anchor=mstrmojo.all.mstrMapMarkerAnchor;if(anchor){anchor.destroy();}},beforeViewHidden:function beforeViewHidden(isBackOperation){this.unrender();},handleMarkerSelection:function handleMarkerSelection(ri,ancherX,ancherY){this.removeMarkerAnchor();var anchor=mstrmojo.insert({id:"mstrMapMarkerAnchor",scriptClass:"mstrmojo.Box",cssText:"left:"+ancherX+"px;top:"+ancherY+"px;position:absolute;z-index:100",width:"1px",height:"1px"});anchor.render();document.body.appendChild(anchor.domNode);this.handleMarkerTargetSelection(ri,anchor);this.handleMarkerInfoWindowLayoutSelection(ri,anchor);},handleMarkerInfoWindowLayoutSelection:function handleMarkerInfoWindowLayoutSelection(ri,anchor){var d=this.gridData,att=d.gts.row[0],attrid=att.id,r=d.ghs.rhs.items[ri],c=r&&r.items[0].idx,ths=this,eid=(c>=0)?att.es[c].id:-1;if(this.iwDocLayout){var doc=this.doc,layouts=doc.getLayouts(),lyt=this.iwLayoutKey,layout=layouts[mstrmojo.array.find(layouts,"k",lyt)],sep="\x1F",dssXmlTypeAttribute="12",gbIDs=attrid+sep+dssXmlTypeAttribute+sep+eid;var taskParams={layoutKey:lyt,groupByIDs:gbIDs,reload:true};if(!this.preIWLayout){this.preIWLayout=layouts[mstrmojo.array.find(layouts,"k",this.defn._lkz)];}(function(params,layouts){var me=doc,model=me.model,dataService=model.getDataService(),key=params.layoutKey,layout=layouts[mstrmojo.array.find(layouts,"k",key)];if(layout.defn&&(params.reload||layout.defn.loaded===false)){dataService.loadDocLayout(params,{success:function(res){var model=ths.xtabModel.docModel,key=lyt,newLayout;res.key=key;res.isSelected=false;model.replaceLayout(key,res);newLayout=doc.rebuildLayout(key,layouts);ths.lastSelectedRow=ri;var node=newLayout.node,overlay,dimensions=mstrApp.getScreenDimensions(),mw=dimensions.w*0.85,mh=dimensions.h*0.9,dw=dimensions.w*0.6,dh=dimensions.h*0.5,w=node.defn.fmts.width||(dw+"px"),h=node.defn.fmts.height||node.data.mh||(dh+"px");ths.closeInfoWindow();overlay=new mstrmojo.Overlay({cssClass:"iwOverlay",children:[newLayout]});overlay.set("width",w);overlay.set("height",h);mstrApp.showPopup({id:"mstrMapInfoWindow",cssClass:"mapInfoWindow",scriptClass:"mstrmojo.android.Popup",anchorOffset:1,onClose:function(){window.setTimeout(function(){ths.resetLayout();},0);},resizeDialog:function(){var editorNode=this.editorNode;if(mstrApp.isTablet()){var popDimensions=this.popDimensions;if(popDimensions){mh=popDimensions.h;mw=popDimensions.w;}else{mh=Math.min(488,mh);mw=Math.min(550,parseInt(w,10));}}this.set("width",Math.min(parseInt(w,10),mw)+"px");if(editorNode){editorNode.style.height=Math.min(parseInt(h,10),mh)+"px";}mstrmojo.Dialog.prototype.resizeDialog.call(this);},children:[overlay]},anchor.domNode);var INTERVAL=300,t=0,ti=window.setInterval(function(){var n=overlay.parent.editorNode;if(n){var ow=n.clientWidth,oh=n.clientHeight;if(ow!==parseInt(w,10)||oh!==parseInt(h,10)){overlay.setDimensions(oh+"px",ow+"px");window.clearTimeout(ti);}}t+=INTERVAL;if(t>10*INTERVAL){window.clearTimeout(ti);}},INTERVAL);doc.selectLayout(layout,true);}});}else{me.selectLayout(layout,true);}})(taskParams,layouts);}},handleMarkerTargetSelection:function handleMarkerTargetSelection(ri,anchor){var d=this.gridData,att=d.gts.row[0],attrid=att.id,r=d.ghs.rhs.items[ri],c=r&&r.items[0].idx,ths=this,eid=(c>=0)?att.es[c].id:-1;var sc=this.getInfoWindowSelectorControl(d),firstInfoWinKey=this.findSelectorTarget(sc);if(sc&&sc.tks){var dataCacheUpdate=null,dm=ths.xtabModel.docModel;dm.getDataService().setDocSelectorElements(sc.ck,eid,sc.ckey,sc.include,{success:function(res){var tgtDefs=dm.getTargetDefn(sc.tks);if(res.pukeys){tgtDefs=dm.getTargetDefn(res.pukeys);}dataCacheUpdate=dm.updateDataCache(res.data,tgtDefs);var firstInfoWinKey=ths.findSelectorTarget(sc);if(firstInfoWinKey){var targetDef=dm.getTargetDefn(firstInfoWinKey),id=firstInfoWinKey+"_ifw",w=mstrmojo.all[id],psId="*l"+res.currlaykey+"*k"+firstInfoWinKey+"*x1*t"+dm.buildTime;if(w){w.destroy();}var ifw=new mstrmojo.maps.androidmap.AndroidDocMapInfoWindow({id:id,builder:ths.doc.builder,model:dm,psKey:firstInfoWinKey,psId:psId});var fmts=targetDef[firstInfoWinKey].fmts,iw=parseInt(fmts.width,10)||width,ih=parseInt((fmts.p_fmts&&fmts.p_fmts.height)||fmts.height,10)||height;ifw.set("width",iw+"px");ifw.set("height",ih+"px");mstrApp.showPopup({id:"mstrMapInfoWindow",scriptClass:"mstrmojo.android.Popup",cssClass:"mapInfoWindow",anchorOffset:1,children:[ifw],resizeDialog:function(){var editorNode=this.editorNode;this.set("width",iw+"px");if(editorNode){editorNode.style.height=ih+"px";}mstrmojo.Dialog.prototype.resizeDialog.call(this);}},anchor.domNode);}var ue={name:"partialUpdate",tree:res.data,ids:dataCacheUpdate,anchor:anchor.domNode};if(!mstrmojo.hash.isEmpty(ue.ids.ifws)){delete ue.ids.ifws[firstInfoWinKey];}dm.raiseEvent(ue);}},dm.zf,true);}},getInfoWindowSelectorControl:function getInfoWindowSelectorControl(d){if(!this.sc&&!d.eg){this.sc=d.gts.row[0].sc;}return this.sc;},afterViewVisible:function afterViewVisible(){window.setTimeout(function(){mstrMobileApp.showMapView(1);},300);},removeMap:function removeMap(){this.closeInfoWindow();this.removeMarkerAnchor();this.resetLayout();if(deregisterMapRendering.call(this)){mstrMobileApp.hideMapView(1);}},unrender:function(){this.lastSelectedRow=null;this._super();}});}());