(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.dom","mstrmojo._IsAnchorable");var POS_LEFT=1,POS_RIGHT=2,POS_TOP=3,POS_BOTTOM=4;var AREA_TYPE_TITLE="title",AREA_TYPE_CONTENT="content";mstrmojo.VisTextTooltip=mstrmojo.declare(mstrmojo.Widget,[mstrmojo._IsAnchorable],{scriptClass:"mstrmojo.VisTextTooltip",left:0,top:0,zIndex:10,boundaryNodeName:"boundary",popupNodeName:"infoNode",baseTipClass:"mstrmojo-vis-tip",anchorOffset:1,anchorOrientation:"h",anchor:null,boundary:null,tipNodeColor:"#ffffff",utils:mstrmojo.VisChartUtils,touchAreaType:AREA_TYPE_CONTENT,markupString:'<div id="{@id}" class="{@cssClass}" style="top:{@top}px;left:{@left}px;z-index:{@zIndex};position:absolute;{@cssText};"><div class="timeseries-slider-tooltip" style="display: block"></div><div class="mstrmojo-vis-tip" style="display: block"></div></div>',markupSlots:{infoNode:function(){return this.domNode.firstChild;},tipNode:function(){return this.domNode.childNodes[1];}},toggle:function toggle(show){if(show){this.domNode.style.display="block";}else{this.domNode.style.display="none";}},updateContent:function(anchor,touchAreaType,text){this.fillContent(anchor,touchAreaType,text);this.positionDialog();},fillContent:function fC(anchor,touchAreaType,text){this.anchor=anchor;this.touchAreaType=touchAreaType;this.domNode.firstChild.innerHTML=text||this.anchor.innerText;this.toggle(true);}});})();