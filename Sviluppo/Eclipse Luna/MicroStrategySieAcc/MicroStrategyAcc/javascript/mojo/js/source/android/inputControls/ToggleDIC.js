(function(){mstrmojo.requiresCls("mstrmojo.ToggleDIC","mstrmojo._TouchGestures","mstrmojo.android._HasPreviewButton","mstrmojo.url","mstrmojo.array");mstrmojo.android.inputControls.ToggleDIC=mstrmojo.declare(mstrmojo.ToggleDIC,[mstrmojo._TouchGestures,mstrmojo.android._HasPreviewButton],{scriptClass:"mstrmojo.android.inputControls.ToggleDIC",useAnimation:false,init:function init(props){this._super(props);mstrmojo.array.forEach(this.dic.vls,function(v){v.n=mstrmojo.url.getAbsoluteURL(v.n,mstrApp.getConfiguration().getCurrentProjectWebServerUrl());});},touchTap:function touchTap(){this.onclick();},onclick:function onclick(){this._super();this.applyChanges();},onblur:mstrmojo.emptyFn});}());