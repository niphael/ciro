(function(){mstrmojo.requiresCls("mstrmojo.CheckBoxDIC","mstrmojo._TouchGestures","mstrmojo._HasTouchScroller","mstrmojo.android._HasPreviewButton","mstrmojo.dom","mstrmojo.css");var MIN_HEIGHT_MDPI=24,MIN_HEIGHT_HDPI=36,MIN_HEIGHT_XHDPI=48,MIN_HEIGHT={160:MIN_HEIGHT_MDPI,213:MIN_HEIGHT_MDPI,240:MIN_HEIGHT_HDPI,320:MIN_HEIGHT_XHDPI},SCROLLER_OFFSET_X={160:48,213:48,240:73,320:98},SWITCH_DURATION=300,$C=mstrmojo.css,$D=mstrmojo.dom;function toggleBtn(isOn){this.btnNode.innerHTML=isOn?this.onText:this.offText;$C.toggleClass(this.btnNode,"on",isOn);$C.toggleClass(this.btnNode,"off",!isOn);}function clearAnimationTimeout(){if(this._animHandle){window.clearTimeout(this._animHandle);delete this._animHandle;}}function applyTransform(duration,value){this._scroller.origin.x=value;if(!duration){return ;}var style=this.scrollNode.style,me=this;this._isAnimating=true;style[$D.CSS3_TRANSITION_DURATION]=duration+"ms";style[$D.CSS3_TRANSFORM]=$D.createTranslateString(-value);this._animHandle=window.setTimeout(function(){if(me._isAnimating){me._isAnimating=false;}clearAnimationTimeout.call(me);},duration*3);}mstrmojo.android.inputControls.CheckBoxDIC=mstrmojo.declare(mstrmojo.CheckBoxDIC,[mstrmojo._TouchGestures,mstrmojo._HasTouchScroller,mstrmojo.android._HasPreviewButton],{scriptClass:"mstrmojo.android.inputControls.CheckBoxDIC",cssText:"cursor:pointer;",cssDisplay:"inline-block",onText:"ON",offText:"OFF",isSwitchStyle:false,markupString:'<div id="{@id}" class="mstrmojo-Label mstrmojo-CheckBoxDIC {@cssClass}" style="{@cssText}" mstrAttach:click,keydown><div class="checkBox-android-wrapper"><div class="checkBox-android-scrollable"><div class="checkBox-androidMobile-button off"></div><div class="checkBox-label-text"></div></div></div></div>',markupSlots:{scrollNode:function(){return this.domNode.firstChild.firstChild;},textNode:function(){return this.domNode.firstChild.firstChild.lastChild;},btnNode:function(){return this.domNode.firstChild.firstChild.firstChild;}},markupMethods:mstrmojo.hash.copy({ontextChange:function(){this.textNode.innerHTML=(this.text!=null)?this.text:"";}},mstrmojo.hash.copy(mstrmojo.CheckBoxDIC.prototype.markupMethods)),init:function init(props){this._super&&this._super(props);if(this.dic.stl==0){this.isSwitchStyle=true;var dpi=mstrMobileApp.getDeviceDPI();this.maxOffsetX=SCROLLER_OFFSET_X[dpi];this.scrollerConfig={showScrollbars:false,showIndicators:false,vScroll:false,hScroll:true,bounces:false,useTranslate3d:false,offset:{x:{end:this.maxOffsetX,start:0},scrollPast:false}};this.minHeight=MIN_HEIGHT[dpi]||MIN_HEIGHT_MDPI;}},updateScrollerConfig:function updateScrollerConfig(){if(!this.isSwitchStyle){return ;}var cfg=this._super(),originX=this.checked?0:(this.maxOffsetX||0);mstrmojo.hash.copy({scrollEl:this.scrollNode,origin:{x:originX,y:0}},cfg);return cfg;},updateScroller:function updateScroller(noScrollToOrigin,duration){if(!this.isSwitchStyle){return ;}this._super(noScrollToOrigin,duration);},initScroller:function initScroller(scroller){if(!this.isSwitchStyle){return ;}this._super(scroller);var me=this;scroller.attachEventListener("scrollMoved",this.id,function(evt){this._translateX=evt.x;toggleBtn.call(me,(evt.x<me.maxOffsetX/2));});},oncheckedChange:function oncheckedChange(e){if(this.isSwitchStyle){if(this.checked&&this._scroller.origin.x!==0){applyTransform.call(this,SWITCH_DURATION,0);}else{if(!this.checked&&this._scroller.origin.x!==this.maxOffsetX){applyTransform.call(this,SWITCH_DURATION,this.maxOffsetX);}}toggleBtn.call(this,this.checked);}this._super&&this._super(e);},preBuildRendering:function preBuildRendering(){this.cssClass=this.isSwitchStyle?"Android-tristate-mobile":"Android-tristate";var alignment;switch(this.owner.getFormats()["text-align"]){case"center":alignment="50%";break;case"right":alignment="100%";break;}if(alignment){this.cssText+="background-position:"+alignment+" 50%;";}return this._super();},postBuildRendering:function postBuildRendering(){this._super();if(this.isSwitchStyle){toggleBtn.call(this,this.checked);this.domNode.style.height=(this.openerStyle.ih>this.minHeight?this.openerStyle.ih:this.minHeight)+"px";}},touchTap:function touchTap(touch){this.onclick();},touchBegin:function touchBegin(touch){if(!this.isSwitchStyle){return ;}if(this._isAnimating){touch.stop();return false;}return this._super(touch);},touchSwipeEnd:function(touch){if(!this.isSwitchStyle){return ;}touch.evt.handle=true;var posX=this._translateX,isOn=(posX<this.maxOffsetX/2),value=isOn?posX:(this.maxOffsetX-posX),duration=value*SWITCH_DURATION/this.maxOffsetX;applyTransform.call(this,duration,isOn?0:this.maxOffsetX);this.set("checked",isOn);},setDirtyFlag:function setDirtyFlag(c,d){if(this.isSwitchStyle){mstrmojo.css.addClass(this.domNode.firstChild||d,"tx-active");}else{this._super(c,d);}}});}());