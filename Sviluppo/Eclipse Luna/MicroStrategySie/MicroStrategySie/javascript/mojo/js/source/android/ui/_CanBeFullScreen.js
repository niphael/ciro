(function(){function setFullScreenStatus(isEnter,animate,isFlash){if(!isFlash&&isEnter===!!this._inFullScreen){return ;}delete this._inFlash;var domNode=this.domNode;if(!domNode){return ;}var domNodeStyle=domNode.style,isMain=!!this.controller,me=this,styleProp=(this.fullscreenDirection==="up")?"top":"bottom",fnPosition=function(){domNodeStyle.position=isEnter?"absolute":"static";if(isMain){mstrApp.rootView.doLayout();}},fnStatusBar=function(){if(isMain){mstrMobileApp[(isEnter?"enter":"exit")+"FullScreen"]();}};if(!isFlash){this._inFullScreen=isEnter;if(isEnter||!animate){fnPosition();}}if(!isEnter){if(parseInt(domNodeStyle[styleProp],10)===0){fnPosition();fnStatusBar();return ;}if(isFlash){this._inFlash=true;}}if(animate){mstrmojo.dom.attachOneTimeEvent(domNode,"webkitTransitionEnd",function(){if(!isEnter){if(!isFlash){fnPosition();}else{me._flashHandle=window.setTimeout(function(){delete me._flashHandle;setFullScreenStatus.call(me,true,true,true);},3000);}}else{if(me.onEnterFullScreenEnd){me.onEnterFullScreenEnd();}}if(!isFlash){fnStatusBar();}});}else{fnStatusBar();}this["on"+(isEnter?"Enter":"Exit")+"FullScreen"]();domNodeStyle.webkitTransitionDuration=animate?"":0;domNodeStyle[styleProp]=isEnter?-domNode.offsetHeight+"px":0;}function clearFlashHandle(){var handle=this._flashHandle;if(handle){window.clearTimeout(handle);delete this._flashHandle;}}mstrmojo.android.ui._CanBeFullScreen=mstrmojo.provide("mstrmojo.android.ui._CanBeFullScreen",{fullscreenDirection:"up",onEnterFullScreen:mstrmojo.emptyFn,onExitFullScreen:mstrmojo.emptyFn,resetFullScreen:function resetFullScreen(){if(this._inFullScreen){delete this._inFullScreen;setFullScreenStatus.call(this,true,false);}},enterFullScreen:function enterFullScreen(){setFullScreenStatus.call(this,true,true);},flashFullScreen:function flashFullScreen(){if(this._inFullScreen&&!this._inFlash){setFullScreenStatus.call(this,false,true,true);}},exitFullScreen:function exitFullScreen(animate){clearFlashHandle.call(this);setFullScreenStatus.call(this,false,animate);},cancelFlashFullScreen:function cancelFlashFullScreen(){if(this._inFullScreen&&this._inFlash){clearFlashHandle.call(this);setFullScreenStatus.call(this,true,false,true);}}});}());