(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.css","mstrmojo.TextArea");mstrmojo.TextAreaWithLabel=mstrmojo.declare(mstrmojo.TextArea,null,{scriptClass:"mstrmojo.TextAreaWithLabel",label:"",rightLabel:"",cssDisplay:"inline",markupString:'<div class="mstrmojo-TextAreaWithLabel {@cssClass}" style="{@cssText}"><span class="mstrmojo-TextArea-label">{@label}</span><textarea id="{@id}" class="mstrmojo-TextArea {@inputNodeCssClass}"  style="{@inputNodeCssText}" title="{@tooltip}" rows="{@rows}" cols="{@cols}" maxlength="{@maxLength}" index="{@tabIndex}" mstrAttach:focus,keydown,keyup,blur ></textarea><span class="mstrmojo-TextArea-label-right">{@rightLabel}</span></div>',markupSlots:{inputNode:function(){return this.domNode.firstChild.nextSibling;}},preBuildRendering:function(){this.markupMethods=mstrmojo.hash.copy({onvisibleChange:function(){this.domNode.style.display=this.visible?this.cssDisplay:"none";},oncssClassChange:function(){this.domNode.className="mstrmojo-TextAreaWithLabel "+(this.cssClass||"");}},mstrmojo.hash.copy(this.markupMethods));}});}());