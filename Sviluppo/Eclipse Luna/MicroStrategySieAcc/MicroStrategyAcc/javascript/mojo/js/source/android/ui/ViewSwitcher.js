(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasLayout","mstrmojo.array");var $ARR=mstrmojo.array,$LAYOUT={containerNode:"100%",node1:"100%",node2:"100%"};mstrmojo.android.ui.ViewSwitcher=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.android.ui.ViewSwitcher",markupString:'<div id="{@id}" class="mstrmojo-AndroidSwitcher {@cssClass}" style="{@cssText}"><div class="switch-slider"><div class="switch-page"></div><div class="switch-page"></div></div><div class="overlay"></div></div>',markupSlots:{containerNode:function(){return this.domNode;},sliderNode:function(){return this.domNode.firstChild;},node1:function(){return this.domNode.firstChild.firstChild;},node2:function(){return this.domNode.firstChild.lastChild;},overlayNode:function(){return this.domNode.lastChild;}},markupMethods:{onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod},layoutConfig:{h:$LAYOUT,w:$LAYOUT},getSlots:function getSlots(){var curVisSlot=this._curSlot||"node1",nextVisSlot=(curVisSlot==="node1")?"node2":"node1";return{current:this[curVisSlot],next:this[nextVisSlot],slot:nextVisSlot};},addChildren:function addChildren(children,idx,silent){$ARR.forEach(children,function(child){if(child.slot==="overlayNode"){child.ignoreLayout=true;}});this._super(children,idx,silent);},prepareNewView:function prepareNewView(view,slot){view.height=this.height;view.width=this.width;view.visible=true;view.slot=slot;},switchView:function switchView(view,isBackOperation){var currentChild=this.getCurrentView();if(view===currentChild){return ;}var slotInfo=this.getSlots(),newCtrl=this.getViewController(view),oldCtrl=this.getViewController(currentChild);if(currentChild){if(oldCtrl&&oldCtrl.beforeViewHidden){oldCtrl.beforeViewHidden(isBackOperation);}}this.prepareNewView(view,slotInfo.slot);if(newCtrl&&newCtrl.beforeViewVisible){newCtrl.beforeViewVisible(isBackOperation);}this.addChildren([view]);if(currentChild){this.removeChildren(currentChild);currentChild.unrender();if(oldCtrl&&oldCtrl.afterViewHidden){oldCtrl.afterViewHidden(isBackOperation);}}if(newCtrl&&newCtrl.afterViewVisible){newCtrl.afterViewVisible(isBackOperation);}this.stackViews(slotInfo.slot);this.afterSwitch(view);},replaceView:function replaceView(view,targetView,noDestroy){var idx=$ARR.indexOf(this.children,targetView);if(idx===-1){return ;}var currentSlot=targetView.slot;$ARR.forEach([view,targetView],function(v){if(v.parent===this){this.removeChildren(v,true);v.unrender();if(!noDestroy){v.destroy();}}},this);this.prepareNewView(view,currentSlot);this.addChildren([view]);return view;},stackViews:function stackViews(slotName){$ARR.forEach([1,2],function(idx){var name="node"+idx,slot=this["node"+idx];if(slot){slot.style.zIndex=(name===slotName)?3:1;}},this);},getCurrentView:function getCurrentView(){var slot=this._curSlot||"node2",view;$ARR.forEach(this.children,function(child){if(child.slot===slot){view=child;return false;}});return view;},getViewController:function getViewController(view){return view?view.controller||view:null;},afterSwitch:function afterSwitch(view){this._curSlot=view.slot;},doLayout:function doLayout(){var node1=this.node1.style,node2=this.node2.style;node1.height=node2.height=this.height;node1.width=node2.width=this.width;this._super();}});}());