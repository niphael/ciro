(function(){mstrmojo.requiresCls("mstrmojo.Vis","mstrmojo.color");function handleTouchBegin(widget,touchX,touchY){widget.tooltipOn=true;if(!browserSupportsHtml5){return ;}handleTouchMove(widget,touchX,touchY);}function handleTouchMove(widget,touchX,touchY){}mstrmojo.DBLinker=mstrmojo.declare(mstrmojo.Vis,null,{scriptClass:"mstrmojo.DBLinker",model:null,width:700,height:500,context:null,browserSupportsHtml5:true,links:[],markupString:'<div id="{@id}" class="mstrmojo-Chart {@cssClass}" style="width:{@width}px;height:{@height}px;position:relative;{@cssText};overflow:auto;"  mstrAttach:mouseover,mousemove ><canvas width="{@width}px" height="{@height}px"></canvas><canvas style="position:absolute;left:0;top:0" width="{@width}px" height="{@height}px"></canvas><div id="{@id}-tooltip" class="mstrmojo-Map-tooltip"></div></div>',markupSlots:{canvas:function(){return this.domNode.firstChild;},highlightCanvas:function(){return this.domNode.childNodes[1];},animationCanvas:function(){return this.domNode.childNodes[2];},tooltip:function(){return this.domNode.childNodes[3];}},postBuildRendering:function postBR(){if(this._super){this._super();}browserSupportsHtml5=this.canvas.getContext;if(!browserSupportsHtml5){this.renderErrorMessage(mstrmojo.desc(8126));return ;}this.context=this.canvas.getContext("2d");this.highlightContext=this.highlightCanvas.getContext("2d");this.animationContext=this.highlightCanvas.getContext("2d");this.drawLinks();},drawLinks:function drawLinks(){this.clearCanvas();for(i=0;i<this.links.length;i++){relationship=this.links[i];srcID=relationship[1];trgID=relationship[2];src=mstrmojo.all[srcID];trg=mstrmojo.all[trgID];srcAnchor=parseInt(src.leftAnchor());dstAnchor=parseInt(trg.leftAnchor());if(srcAnchor<dstAnchor){srcAnchor=parseInt(src.rightAnchor());}else{dstAnchor=parseInt(trg.rightAnchor());}this.drawLine(srcAnchor,parseInt(src.topAnchor()),dstAnchor,parseInt(trg.topAnchor()));}this.context.stroke();},addLinks:function addLinks(src,trg){relationship=new Array(2);relationship[1]=src.id;relationship[2]=trg.id;this.links.push(relationship);},ObsMoved:function ObsMoved(obs){this.drawLinks();},clearCanvas:function clearCanvas(){this.context.clearRect(0,0,this.width,this.height);this.context.beginPath();},drawLine:function drwLine(x1,y1,x2,y2){var offset=12;if(x2>x1){x2p=x2-offset;x1p=x1+offset;}else{x2p=x2+offset;x1p=x1-offset;}this.context.moveTo(x1,y1);this.context.lineTo(x1p,y1);this.context.lineTo(x2p,y2);this.context.lineTo(x2,y2);},getTouchValue:function gtvlindx(x,y){if(!this.model){return null;}for(var elem in this.model.coords){var coordsArray=this.model.coords[elem],l=coordsArray.length;for(var i=0;i<l;i++){if(this.inPoly(coordsArray[i],x,y)){return elem;}}}return null;},renderTooltip:function rndrttp(touchVal,touchX,touchY,hdrIndex){var gts=this.model.gts;if(hdrIndex>=0){var html=gts.row[0].n+": "+touchVal;var i;for(i=0;gts&&gts.col&&i<gts.col[0].es.length;i++){var mv=this.model.gvs.items[hdrIndex].items[i];var v=mv.v;if(mv.ty==4){v='<img src="'+v+'" >';}html+="<br>"+gts.col[0].es[i].n+": "+v;}this.tooltip.innerHTML=html;}if(touchX+this.tooltip.offsetWidth>this.width){touchX=touchX-this.tooltip.offsetWidth;}this.tooltip.style.webkitTransform="translate3d("+touchX+"px, "+touchY+"px, 0)";this.tooltip.style.MozTransform="translate("+touchX+"px, "+touchY+"px)";if(this.tooltip.className.indexOf("fadeIn")<0){this.tooltip.className=this.tooltip.className+" fadeIn";}},onmouseover:function(evt){handleTouchBegin(this,evt.e.pageX,evt.e.pageY);},onmousemove:function(evt){handleTouchBegin(this,evt.e.pageX,evt.e.pageY);}});})();