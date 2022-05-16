(function(){mstrmojo.requiresCls("mstrmojo.Vis","mstrmojo._TouchGestures","mstrmojo.TouchScroller","mstrmojo._HasTouchScroller","mstrmojo.css");var $CSS=mstrmojo.css;var FONT_SIZE=15;function getTouchedElement(touch){var item=mstrmojo.dom.findAncestorByAttr(touch.target,"clk",true,this.domNode);return item||null;}function setScrollerPosition(){var scl=this._scroller;var realWidth=this.timeSelectorListContainer.width;var realOffSetWidth=this.timeSelectorList.offsetWidth;if(realOffSetWidth>realWidth){this.scrollPast=true;}var offsetEnd=realOffSetWidth>realWidth?realOffSetWidth-realWidth:0;scl.origin={x:0,y:0};scl.showScrollbars=true;scl.noHScroll=false;scl.hScroll=(offsetEnd!==0&&scl.noHScroll!==true)||this.scrollPast;if(scl.hScroll){scl.offset={x:{start:0,end:offsetEnd},scrollPast:this.scrollPast};}var icn=this.timeSelectorList;this.widget.utils.translateCSS(0,0,false,icn);}mstrmojo.VisTimeSeriesTimeSelector=mstrmojo.declare(mstrmojo.Vis,[mstrmojo._TouchGestures,mstrmojo._HasTouchScroller],{scriptClass:"mstrmojo.VisTimeSeriesTimeSelector",scrollerConfig:{bounces:false,showScrollbars:true,useTranslate3d:true},scrollPast:false,isAndroidTab:false,offsetx:0,widget:null,markupString:'<div id="{@id}-TimeSelector-Container" class="mstrmojo-timeseries-timeselector-div" style="position:absolute; left:{@offsetx}px; overflow:hidden;"><div id="{@id}-TimeSelector-List" style="position:absolute;left:0;top:0"></div></div>',markupSlots:{timeSelectorListContainer:function(){return this.domNode;},timeSelectorList:function(){return this.domNode.firstChild;}},toggleSelected:function toggleSelected(el,selected){if(!el){return ;}var style=el.style;var ts=this.widget;var textClr=ts.utils.rgb2rgbStr(ts.formatProp.textClr);var bgClr=ts.utils.rgb2rgbStr(ts.formatProp.backgroundClr);if(selected){style.backgroundColor=textClr;style.color=bgClr;}else{style.backgroundColor="";style.color=textClr;}},toggleGlowEffect:function toggleGlowEffect(el,glow){if(!el){return ;}if(glow){$CSS.applyShadow(el,0,0,20,this.widget.glowColor);}else{$CSS.removeShadow(el);}},drawTimeSelectorLabels:function drwtslbls(){var tsl=this.widget.baseModel.vp.rl;var chartStatus=this.chartStatus;if(tsl){var ts=this.widget,mg=ts.margin,utils=ts.utils,width=ts.getWidth(),totalWidth=0;this.timeSelectorListContainer.width=width-mg.l-mg.r;this.timeSelectorListContainer.style.width=(width-mg.l-mg.r)+"px";this.timeSelectorListContainer.style.height=mg.t+"px";var d=tsl.length;var x=(width-mg.l-mg.r)/(d+1);var id=ts.id,timeSelectorList=this.timeSelectorList;if(timeSelectorList.childNodes.length==0){ts.currSelection=null;for(var i=0;i<d;i++){var lbl=document.createElement("div");lbl.id="timeseries-intervals";lbl.className="timeseries-intervals";lbl.style.fontWeight="bold";lbl.style.fontFamily="Arial";lbl.style.fontSize=FONT_SIZE+"px";lbl.innerHTML=tsl[i].n;lbl.setAttribute("clk","S");lbl.setAttribute("value",i);lbl.style.position="relative";lbl.style.whiteSpace="nowrap";lbl.style.cssFloat="left";if(i===0&&chartStatus.currSelectionIdx==-1&&!chartStatus.usingCustomInterval){this.toggleSelected(lbl,true);ts.currSelection=lbl;}else{if(!chartStatus.usingCustomInterval&&chartStatus.currSelectionIdx==i){this.toggleSelected(lbl,true);ts.currSelection=lbl;}else{this.toggleSelected(lbl,false);}}timeSelectorList.appendChild(lbl);offsetWidth=lbl.offsetWidth;totalWidth+=offsetWidth;spaceWidth=offsetWidth<x?x-offsetWidth:20;totalWidth+=spaceWidth;if(i==0){timeSelectorList.insertBefore(this.createWhiteSpace(spaceWidth),timeSelectorList.firstChild);totalWidth+=spaceWidth;}timeSelectorList.appendChild(this.createWhiteSpace(spaceWidth));}}else{var childNodes=timeSelectorList.childNodes;var childNodesLength=childNodes.length;for(var i=0;i<childNodesLength;i++){var lbl=childNodes[i];offsetWidth=lbl.offsetWidth;totalWidth+=offsetWidth;if(i==0){continue;}spaceWidth=offsetWidth<x?x-offsetWidth:20;totalWidth+=spaceWidth;if(i==1){childNodes[0].style.paddingLeft=spaceWidth+"px";}i++;childNodes[i].style.paddingLeft=spaceWidth+"px";}}this.timeSelectorList.style.width=totalWidth+"px";}},postBuildRendering:function postBR(){FONT_SIZE=Math.round(15*this.widget.utils.getScreenZoomFactor());this.scrollerConfig.scrollEl=this.timeSelectorList;if(this._super){this._super();}this.drawTimeSelectorLabels();setScrollerPosition.call(this);},reRender:function reRender(){this.drawTimeSelectorLabels();setScrollerPosition.call(this);},createWhiteSpace:function crtWhtSpc(w){var spaceDiv=document.createElement("div");spaceDiv.style.height="30px";spaceDiv.style.position="relative";spaceDiv.style.whiteSpace="nowrap";spaceDiv.style.cssFloat="left";spaceDiv.style.paddingLeft=w+"px";return spaceDiv;},initScroller:function initScroller(scroller){scroller.hScroll=true;this._super(scroller);},touchBegin:function touchBegin(touch){this.widget.hiddenTooltipAndShowTimeSelector();},touchSelectEnd:function touchEnd(touch){var currSelection=this.widget.currSelection;if(currSelection){this.toggleGlowEffect(currSelection,false);}},touchSelectBegin:function touchSelectBegin(touch){var item=getTouchedElement.call(this,touch);if(item){var value=item.value;if(value==="S"){this.widget.timeSelectorOnClick(item);}}},touchTap:function touchTap(touch){var item=getTouchedElement.call(this,touch);if(item){var value=item.value;if(value==="S"){this.widget.timeSelectorOnClick(item);}}this.toggleGlowEffect(this.widget.currSelection,false);},destroy:function destroy(){if(this._super){this._super();}}});})();