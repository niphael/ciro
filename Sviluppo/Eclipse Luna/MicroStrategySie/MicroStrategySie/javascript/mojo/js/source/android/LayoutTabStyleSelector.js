(function(){mstrmojo.requiresCls("mstrmojo.ListBase","mstrmojo._TouchGestures","mstrmojo.android._IsLayoutSelector","mstrmojo.android._IsList","mstrmojo._HasTouchScroller","mstrmojo.array");var itemMarkup;mstrmojo.android.LayoutTabStyleSelector=mstrmojo.declare(mstrmojo.ListBase,[mstrmojo._TouchGestures,mstrmojo.android._IsLayoutSelector,mstrmojo.android._IsList,mstrmojo._HasTouchScroller],{scriptClass:"mstrmojo.android.LayoutTabStyleSelector",cssClass:"mstrmojo-MobileLayoutSelector TabStyle",allowTouchBubble:false,getItemMarkup:function getItemMarkup(item){if(!itemMarkup){itemMarkup=this._super(item).replace("{@n}","<div>{@n}</div>");}return itemMarkup;},renderSelector:function renderSelector(layouts,currentLayout){if(this._super(layouts,currentLayout)){this.set("items",layouts);this.toggleSelectorDisplay(true);this.singleSelect(mstrmojo.array.find(layouts,"k",currentLayout.k));}else{this.toggleSelectorDisplay(false);this.set("items",[]);}},postselectionChange:function postselectionChange(evt){var added=evt.added;if(added){this.target.showLayout(this.items[added[0]]);}},updateScrollerConfig:function updateScrollerConfig(){var cfg=this._super(),icn=this.itemsContainerNode,w=parseInt(this.width,10);if(isNaN(w)){w=this.domNode.clientWidth;}cfg.scrollEl=icn;cfg.bounces=false;cfg.noVScroll=true;var offsetEnd=Math.max(icn.offsetWidth-w,0),origin=cfg.origin;var enableScroll=cfg.hScroll=(offsetEnd!==0&&cfg.noHScroll!==true);if(enableScroll){cfg.offset={x:{start:0,end:offsetEnd}};if(!origin){var el=this._getItemNode(this.selectedIndex),delta=el.offsetLeft+el.offsetWidth-w;if(delta>0){origin={x:delta,y:0};}}}cfg.origin=origin||{x:0,y:0};return cfg;}});}());