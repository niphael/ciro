(function(){mstrmojo.requiresCls("mstrmojo.css");var _C=mstrmojo.css;mstrmojo.XmlQual=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.XmlQual",data:null,markupString:'<div class="mstrmojo-cond mstrmojo-XmlQual"><span class="mstrmojo-cond-text"></span><span class="mstrmojo-onhover mstrmojo-topright mstrmojo-cond-tools"><img class="mstrmojo-del" src="../images/1ptrans.gif" /></span></div>',markupSlots:{textNode:function(){return this.domNode.firstChild;}},markupMethods:{ondataChange:function(){var d=this.data;this.textNode.innerHTML=d?d.n||(d.xml&&d.xml.replace(/\</gm,"&lt;").replace(/\>/gm,"&gt;"))||"":"";},onselectedChange:function(){_C.toggleClass(this.domNode,["selected"],this.selected);}}});})();