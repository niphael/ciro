(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._Formattable");mstrmojo.DocImage=mstrmojo.declare(mstrmojo.Container,[mstrmojo._Formattable],{scriptClass:"mstrmojo.DocImage",markupString:'<div id="{@id}" class="mstrmojo-DocImage" title="{@tooltip}" style="{@domNodeCssText}"><div style="{@shadowNodeCssText}"><img src="{@v}" style="{@imgNodeCssText}" mstrAttach:click></div>{@buttonNodeMarkup}</div>',markupSlots:{imgNode:function(){return this.domNode.firstChild;}},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},update:function update(node){var ds=this.model.getDataService(),v=node.data.v;this.v=(ds&&ds.getDocImage&&ds.getDocImage(v))||v;if(this.thresholdId||node.data.tid){delete this.fmts;}this.thresholdId=node.data.tid;this.set("visible",!node.data.hidden);if(this._super){this._super(node);}},formatHandlers:{domNode:["left","top","z-index"],shadowNode:["width","height","B","fx"],imgNode:["height","width"]},preBuildRendering:function preBuildRendering(){if(this._super){this._super();}if(!mstrmojo.dom.isIE7){var fmt=this.getFormats(),ds=(fmt.fx&&fmt.fx.ds)||0,border=mstrmojo._Formattable.getBorderWidths(this);this.domNodeCssText+="width:"+((parseInt(fmt.width,10)||0)+ds+border.w)+"px; height: "+((parseInt(fmt.height,10)||0)+ds+border.h)+"px;";}},getAnchor:function getAnchor(){return this.imgNode;}});}());