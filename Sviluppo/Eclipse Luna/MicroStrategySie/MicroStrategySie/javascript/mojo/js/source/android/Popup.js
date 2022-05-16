(function(){mstrmojo.requiresCls("mstrmojo.Dialog","mstrmojo.array","mstrmojo.dom","mstrmojo.css","mstrmojo._IsAnchorable");var $DOM=mstrmojo.dom,$ARR=mstrmojo.array;mstrmojo.android.Popup=mstrmojo.declare(mstrmojo.Dialog,[mstrmojo._IsAnchorable],{scriptClass:"mstrmojo.android.Popup",fadeOnClose:false,autoClose:true,init:function init(props){this._super(props);if(this.anchor){mstrmojo.css.addWidgetCssClass(this,"anchor");}},addChildren:function addChildren(children,idx,silent){this._super(children,idx,silent);$ARR.forEach(this.children,function(child){if(child.isElastic){this._elasticChild=child;return false;}},this);},resizeDialog:function resizeDialog(){var editorNode=this.editorNode,app=mstrApp,dimensions=app.getScreenDimensions(),mh=Math.round(dimensions.h*0.9),w=dimensions.w,contentHeight;w=w*0.85;if(app.isTablet()){var popDimensions=this.popDimensions||{},tabletDimensions=mstrApp.getScreenDimensions();mh=popDimensions.h||Math.min(Math.round(tabletDimensions.h*0.6),mh);w=popDimensions.w||Math.min(Math.round(tabletDimensions.w*(mstrApp.isLandscape()?0.43:0.65)),w);}w+="px";var elasticChild=this._elasticChild;if(elasticChild){var elasticHeight=elasticChild.elasticHeight;if(elasticHeight){contentHeight=elasticHeight;}else{if(elasticChild.getItemsContainerHeight){contentHeight=elasticChild.getItemsContainerHeight();}}}if(contentHeight===undefined){contentHeight=this.getAvailableContentSpace();mh=Math.max(mh,contentHeight+(this.titleNode.offsetHeight+this.buttonNode.offsetHeight));}else{contentHeight=Math.min(contentHeight,mh-(this.titleNode.offsetHeight+this.buttonNode.offsetHeight));}if(editorNode){editorNode.style.maxHeight=mh+"px";this.set("width",w);}else{this.width=w;this.cssText=(this.cssText||"")+"max-height:"+mh+"px;";}this.raiseEvent({name:"popupResized",maxheight:mh,height:contentHeight,width:parseInt(w,10)});if(elasticChild){var h=elasticChild.height;if(h!==undefined&&h!=="auto"){elasticChild.set("height","auto");}elasticChild.set("height",contentHeight+"px");if(elasticChild.updateScroller){elasticChild.updateScroller();}}this._super();},getAvailableContentSpace:function getAvailableContentSpace(){return Math.max(this.containerNode.offsetHeight,this.editorNode.clientHeight-this.titleNode.offsetHeight-this.buttonNode.offsetHeight);},close:function close(){if(this.onClose){this.onClose();}if(this.fadeOnClose){var domNode=this.domNode;if(domNode){var id=this.id;if(!$DOM.isWinPhone){$DOM.attachOneTimeEvent(domNode,$DOM.CSS3_TRANSITION_END,function(){mstrmojo.all[id].destroy();});domNode.style.opacity=0;}else{(new mstrmojo.fx.FadeOut({onEnd:function(){mstrmojo.all[id].destroy();},target:domNode,duration:400})).play();}}}else{this.destroy();}},onclick:function onclick(evt){if(this.autoClose&&evt.e.target===this.curtainNode){this.close();}},ontouchend:function ontouchend(evt){this.onclick(evt);}});}());