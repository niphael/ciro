(function(){mstrmojo.requiresCls("mstrmojo.Popup","mstrmojo._HasBuilder","mstrmojo._IsAnchorable","mstrmojo.dom");var BASE_TIP_CLS="mstrmojo-DocInfoWindow-tip",DARK_BORDER_WIDTH=1,$D=mstrmojo.dom;function _toggleLockInfoWins(anchor,lock){var w=$D.findWidget(anchor)||(anchor&&anchor.w);while(w){if(w.autoCloseLocked!==undefined){w.autoCloseLocked=lock;}w=w.parent;}}function _getContent(me){var m=me.model;return m.getLayoutDataCache(m.getCurrentLayoutKey())[me.psId];}mstrmojo.DocInfoWindow=mstrmojo.declare(mstrmojo.Popup,[mstrmojo._HasBuilder,mstrmojo._IsAnchorable],{scriptClass:"mstrmojo.DocInfoWindow",markupString:'<div class="mstrmojo-DocInfoWindow-wrapper"><div id="{@id}" class="mstrmojo-DocInfoWindow"></div><div class="'+BASE_TIP_CLS+' top"></div><div class="mstrmojo-DocInfoWindow-curtain" mstrAttach:click></div></div>',markupSlots:{infoNode:function(){return this.domNode.firstChild;},tipNode:function(){return this.domNode.childNodes[1];},curtainNode:function(){return this.domNode.lastChild;},containerNode:function(){return this.domNode.firstChild;}},boundaryNodeName:"boundary",popupNodeName:"infoNode",baseTipClass:BASE_TIP_CLS,anchorOffset:1,anchorOrientation:"h",anchor:null,boundary:null,closeOnClick:true,autoCloseLocked:false,tipNodeColor:"",ontouchstart:function ontouchstart(){this.close();},close:function close(){if(this.autoCloseLocked){return ;}this.model.raiseEvent({name:"infoWindowClosed",psKey:this.psKey});var me=this;window.setTimeout(function(){if(me.anchor){_toggleLockInfoWins(me.anchor,false);}},0);if(this._super){this._super();}this.clearAnchorHilites();$D.detachEvent(document,$D.isFF?"DOMMouseScroll":"mousewheel",this.mw);$D.attachEvent(document,"scroll",me.mw);},clearAnchorHilites:function clearAnchorHilites(){var zn=mstrmojo.dom.findWidget(this.anchor);if(zn&&zn.clearHilites){zn.clearHilites(zn.hiliteKey);delete zn.hiliteKey;}},prepareAnchor:function prepareAnchor(){if(this.children&&this.children[0]){var infoNodeStyle=this.infoNode.style,contentChild=this.children[0],contentChildNode=contentChild.dimNode||contentChild.domNode,ifwWidth=contentChildNode.offsetWidth,ifwHeight=contentChildNode.offsetHeight;infoNodeStyle.width=(ifwWidth+2*DARK_BORDER_WIDTH)+"px";infoNodeStyle.height=(ifwHeight+2*DARK_BORDER_WIDTH)+"px";}},nudge:function nudge(){this.positionDialog();this.model.raiseEvent({name:"infoWindowRendered",id:this.id});},onRender:function onRender(){this.open(this.opener);},open:function open(opener,config){var ps=mstrmojo.all[this.psId];if(ps){var showFirstPanel=ps.defn.sfp,currentPanelIdx=ps.selectedIdx;if(showFirstPanel&&currentPanelIdx!==0){ps.switchToPanel(0,0);ps.children[currentPanelIdx].set("selected",false);}}if(this._super){this._super(opener,config);}if(this.anchor){_toggleLockInfoWins(this.anchor,true);}if(mstrApp.isTablet&&mstrApp.isTablet()){var touchManager=mstrmojo.touchManager,id=this.id,infoWindowNode=this.domNode;this._tchHandler=touchManager.attachEventListener("touchesBegin",id,function(evt){if(this.autoCloseLocked){return ;}var isTappingOnInfoWindow=mstrmojo.dom.contains(infoWindowNode,evt.touch.target,true);var infoboxes=document.getElementsByClassName("heatmap-infobox"),len=(infoboxes&&infoboxes.length)||0,i,target=evt.touch.target,isTappingOnHeatMapTooltip=false;for(i=0;i<len;i++){if(mstrmojo.dom.contains(infoboxes[i],target,true)){isTappingOnHeatMapTooltip=true;break;}}if(!isTappingOnInfoWindow&&!mstrApp.hasOpenDialog()&&!isTappingOnHeatMapTooltip){this.closeOnTablet();}});}var me=this;me.mw=me.mw||function(e){if(me.autoCloses&&!$D.contains(me.domNode,$D.eventTarget(self,e),true,document.body)){me.close();}};$D.attachEvent(document,$D.isFF?"DOMMouseScroll":"mousewheel",me.mw);$D.attachEvent(document,"scroll",me.mw);},getChildren:function getChildren(){return[_getContent(this)];},preBuildRendering:function preBuildRendering(){var c=_getContent(this),f=c.defn.fmts;f.left=DARK_BORDER_WIDTH+"px";f.top=DARK_BORDER_WIDTH+"px";if(f.border){var tmp=f.border.split(" ");if(tmp.length>=3){this.tipNodeColor=tmp[2];}}if(this._super){this._super();}},postBuildRendering:function postBuildRendering(){this.set("visible",true);if(this._super){this._super();}if(!this.closeOnClick){this.curtainNode.style.display="none";}},closeOnTablet:function closeOnTablet(){this.close();if(this._tchHandler){this._tchHandler.clear();}}});var factory=mstrmojo.DocInfoWindow;factory.PLACEMENT={AUTO:1,FIXED:2,ABOVE:3,BELOW:4,LEFT:5,RIGHT:6};}());