(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._IsPopup","mstrmojo._CanAutoClose");mstrmojo.Popup=mstrmojo.declare(mstrmojo.Container,[mstrmojo._IsPopup,mstrmojo._CanAutoClose],{scriptClass:"mstrmojo.Popup",shadowNodeCssClass:"mstrmojo-popup-shadow",contentNodeCssClass:"mstrmojo-popup-content",cssDisplay:"block",markupString:'<div id="{@id}" class="mstrmojo-Popup {@cssClass}" style="{@cssText}" ><div class="mstrmojo-Popup-shadow {@shadowNodeCssClass}"></div><div class="mstrmojo-Popup-content {@contentNodeCssClass}"></div>',markupSlots:{containerNode:function(){return this.domNode.lastChild;},shadowNode:function(){return this.domNode.firstChild;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=(this.visible)?this.cssDisplay:"none";},onleftChange:function(){this.domNode.style.left=(this.left!=null)?this.left:"";},ontopChange:function(){this.domNode.style.top=(this.top!=null)?this.top:"";}},buildRendering:function buildRendering(){var ph=this.placeholder;if(this._super()){if(!this.parent&&!ph){var node=this.placeNode||document.body;node.appendChild(this.domNode);}return true;}return false;}});}());