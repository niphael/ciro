(function(){mstrmojo.requiresCls("mstrmojo._HasDrillLinks","mstrmojo.registry","mstrmojo.hash","mstrmojo.dom");var $DOM=mstrmojo.dom;function getPopupDelegate(widget){var w=widget;while(w){if(w.openDrillLinkMenu){return w;}w=w.parent;}return null;}mstrmojo._HasHoverButton=mstrmojo.provide("mstrmojo._HasHoverButton",mstrmojo.hash.copy(mstrmojo._HasDrillLinks,{_mixinName:"mstrmojo._HasHoverButton",buttonNodeMarkup:'<div class="mstrmojo-LinkInfo-buttonNode"></div>',init:function init(p){this._super(p);this.markupSlots.buttonNode=function(){return this.domNode.lastChild;};},postBuildRendering:function pstBldRnd(){if(!this.hoverBtn){this.addChildren(mstrmojo.registry.ref({scriptClass:"mstrmojo.Button",slot:"buttonNode",alias:"hoverBtn",onclick:function onclick(){this.openPopup();},openPopup:function openPopup(){var dl=getPopupDelegate(this);if(dl){dl.openDrillLinkMenu({openerButton:this,drillLinkItems:this.parent.drillLinkItems,cmPos:this.cmPos});}},closePopup:function closePopup(){var dl=getPopupDelegate(this);if(dl){dl.closeDrillLinkMenu();}}}));}var ret=this._super();var id=this.id;$DOM.attachEvent(this.domNode,"contextmenu",function(e){mstrmojo.all[id].oncontextmenu(e,self);});return ret;},oncontextmenu:function(e,hWin){var btn=this.hoverBtn;btn.cmPos=$DOM.getMousePosition(e,hWin);btn.openPopup();btn.cmPos=null;$DOM.preventDefault(hWin,e);}}));}());