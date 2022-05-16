(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasBuilder","mstrmojo._Formattable","mstrmojo._HasToolbar");var ELEM_SEP="\u001E";var GD=1;var GP=2;var ggHelper={TOP:0,BOTTOM:1,LEFT:2,RIGHT:3,vert:["height","width","top"],horiz:["width","height","left"],updateStyle:function(gg){var qsm=gg.defn.qsm;if(!qsm){return ;}if(gg.getFormats().width){return ;}var child=null;if(qsm==GD){child=gg.containerNode.firstChild;}else{child=gg.containerNode.lastChild;}if(!child){return ;}var h=child.clientHeight+"px";var w=child.clientWidth+"px";var dnStyle=gg.domNode.style;dnStyle.height=h;dnStyle.width=w;if(gg.parent.updateStyle){gg.parent.updateStyle(h,w);}},repositionChildren:function(gg){var f=gg.getFormats(),h=parseInt(f.height,10),w=parseInt(f.width,10);var ch=gg.children,gdf=ch[0].getFormats(),gpf=ch[1].getFormats();var isVert=(gg.defn.gp<this.LEFT),x=(isVert)?h:w,y=(isVert)?w:h,dd=this[((isVert)?"vert":"horiz")];var gs=Math.round(x*(gg.defn.ga/100));gdf[dd[0]]=gs+"px";gdf[dd[1]]=y+"px";gpf[dd[0]]=(x-gs)+"px";gpf[dd[1]]=y+"px";if((gg.defn.gp%2)===0){gpf[dd[2]]=gs+"px";}else{gdf[dd[2]]=(x-gs)+"px";}this.resizeChildren(ch[0],ch[1]);},stackChildren:function(gg){var ch=gg.children,f=gg.getFormats(),gf;for(var i=ch.length-1;i>=0;i--){gf=ch[i].getFormats();gf.width=f.width;gf.height=f.height;}this.resizeChildren(ch[0],ch[1]);},resizeChildren:function(gd,gp){gd.renderPortalState();var gpf=gp.getFormats();gp.resizeForDisplayState(parseInt(gpf.height,10),parseInt(gpf.width,10),true);},changeVisibility:function(gg,show){var cd=gg.children,qsm=gg.defn.qsm,gds=show&&(!qsm||gg.viewMode===GD),gps=show&&(!qsm||gg.viewMode===GP);if(cd&&cd.length>0){if(cd[0].visible!==gds){cd[0].set("visible",gds);}if(cd[1].visible!==gps){cd[1].set("visible",gps);}}gg.visible=show;},setViewMode:function setViewMode(gg){var cd=gg.children,vs=gg.visible;if(gg.defn.qsm&&cd&&cd.length>0){var ggm=gg.viewMode;cd[0].set("visible",(ggm==GD)&&vs);cd[1].set("visible",(ggm==GP)&&vs);}},clearFormatCache:function clearFormatCache(gg){var cd=gg.children;for(var i=0,len=cd&&cd.length||0;i<len;i++){cd[i].clearCache();}}};mstrmojo.DocGridGraph=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasBuilder,mstrmojo._Formattable,mstrmojo._IsSelectorTarget],{scriptClass:"mstrmojo.DocGridGraph",markupString:'<div id="{@id}" title="{@tooltip}" class="mstrmojo-DocGridGraph" style="{@domNodeCssText}"><div class="mstrmojo-DocGridGraph-msg"></div><div class="mstrmojo-DocGridGraph-container"></div></div>',markupSlots:{msgNode:function(){return this.domNode.firstChild;},containerNode:function(){return this.domNode.lastChild;}},formatHandlers:{domNode:["RW","B","background-color","fx","font"]},viewMode:null,visible:true,resize:function resize(){this.clearCache();ggHelper.clearFormatCache(this);var f=this.getFormats(),w=parseInt(f.width,10),h=parseInt(f.height,10);if(w>0&&h>0){ggHelper.changeVisibility(this,true);if(!this.defn.qsm){ggHelper.repositionChildren(this);}else{ggHelper.stackChildren(this);}}else{ggHelper.changeVisibility(this,false);}},postBuildRendering:function postBuildRendering(){this._super();var eg=this.node.data.eg;if(eg===undefined){this.msgNode.style.display="none";this.containerNode.style.display="block";}else{this.msgNode.innerHTML=eg;this.msgNode.style.display="block";this.containerNode.style.display="none";}var qsm=this.defn.qsm;if(!this.viewMode&&qsm){this.viewMode=qsm;}var d=this.node.defn;d.attachEventListener("qsmChange",this.id,function(evt){this.viewMode=evt.value;ggHelper.setViewMode(this);this.model.getDataService().setQuickSwitchViewMode(this.defn.tt+ELEM_SEP+this.k,this.viewMode);ggHelper.updateStyle(this);});ggHelper.setViewMode(this);ggHelper.updateStyle(this);if(!qsm){this.resize();}},getGridWidget:function(){return this.children[0];},getGraphWidget:function(){return this.children[1];},updateGraph:function(node){var gp=this.getGraphWidget();if(gp){gp.update(node);gp.refresh();}},quickSwitch:function quickSwitch(){var gd=this.viewMode!=GP;this.defn.set("qsm",(gd?GP:GD));return true;}});})();