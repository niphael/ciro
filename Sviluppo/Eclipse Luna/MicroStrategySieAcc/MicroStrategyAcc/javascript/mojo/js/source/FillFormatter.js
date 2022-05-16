(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.FieldSet","mstrmojo.Label","mstrmojo.ColorPicker");var _H=mstrmojo.hash,_C=mstrmojo.color;mstrmojo.FillFormatter=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.FillFormatter",cssClass:"mstrmojo-FillFormatter",isChart:false,markupString:'<div id={@id} class="{@cssClass}" style="{@cssText}"></div>',markupSlots:{containerNode:function(){return this.domNode;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},postCreate:function(){this.onmodelChange();},onmodelChange:function(){if(this.model&&!this.model.scriptClass){_H.make(this.model,mstrmojo.Obj);}},children:[{scriptClass:"mstrmojo.FieldSet",alias:"fill",cssClass:"mstrmojo-FormatEditor-fill",legend:mstrmojo.desc(2885,"Fill"),bindings:{legend:"this.parent.isChart ? mstrmojo.desc(3902, 'Series Colors') : mstrmojo.desc(2885, 'Fill')"},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2060),cssClass:"label"},mstrmojo.ColorPicker.createDropDown({bindings:{m:"this.parent.parent.model",fillStyle:function(){var fp=this.m,fillStyle=fp.FillStyle;if(fillStyle==2){var angle=parseInt(fp.GradientAngle,10),type=angle===0?1:0,fillColor=_C.decodeColor(fp.FillColor),gradientColor=_C.decodeColor(fp.GradientColor),offsetIndex=parseInt(fp["Gradient"+(angle===0?"X":"Y")+"Offset"],10)==100?1:0,gradientCss=(offsetIndex!=1)?mstrmojo.css.buildGradient(type,fillColor,gradientColor):mstrmojo.css.buildGradient(type,gradientColor,fillColor);this.set("gradientCss",gradientCss.n+":"+gradientCss.v);this._updateGradientInfo();}else{var color=this.m.FillColor;if(typeof (color)!="undefined"&&/^\d{1,8}$/.test(color)){color=_C.decodeColor(color);}else{color="transparent";}this.set("fillColor",color);}return fillStyle||0;}},_updateGradientInfo:function(){var fp=this.m;this.gradient=mstrmojo.hash.copy({FillColor:_C.decodeColor(fp.FillColor),GradientColor:_C.decodeColor(fp.GradientColor)},_H.copy(fp));},onfillColorChange:function(){this.m.FillColor=(this.fillColor=="transparent"?"pru":_C.encodeColor(this.fillColor));this.m.FillStyle=0;},ongradientChange:function(evt){var g=["FillStyle","FillColor","GradientColor","GradientXOffset","GradientYOffset","GradientAngle"];for(var i=0;i<g.length;i++){var v=evt.value[g[i]];this.m[g[i]]=/Color$/.test(g[i])?_C.encodeColor(v):v;}this.m.FillStyle=2;}},{showGradients:true})]}]});})();