mstrmojo.requiresCls("mstrmojo.Popup");(function(){function getPopupDelegate(xtab){var w=xtab;while(w){if(w.openXtabCellMenu){return w;}w=w.parent;}return null;}mstrmojo.XtabCellHoverPopup={cssClass:"mstrXtabCellHoverPopup",scriptClass:"mstrmojo.Popup",slot:"overlayNode",autoCloses:true,children:[{scriptClass:"mstrmojo.Button",alias:"btn",onclick:function(){this.openPopup();},openPopup:function(){var dl=getPopupDelegate(this.xtab);if(dl){dl.openXtabCellMenu({xtab:this.xtab,td:this.td,btn:this,cmPos:this.cmPos});}},closePopup:function(){var dl=getPopupDelegate(this.xtab);if(dl){dl.closeXtabCellMenu();}}}],updatePopupConfig:function updPopCfg(config){var td=config&&config.td,xtab=config&&config.xtab,btn=this.btn;var lastTd=this._lastTd;if(lastTd!=td){btn.closePopup();this._lastTd=td;}btn.xtab=xtab;btn.td=td;btn.cmPos=config&&config.cmPos;if(!td||!xtab){return ;}var tbl=mstrmojo.dom.findAncestorByName(td.parentNode,"table",false,xtab.viewport),zs=xtab.zones,slot="";if(tbl){for(var n in zs){var z=zs[n];if(z&&z.tableNode==tbl){slot=z.slot;break;}}}var diff=mstrmojo.boxmodel.offset(td,xtab.overlayNode);this.set("location",{left:0,top:diff.top,width:Math.min(td.offsetWidth+diff.left,xtab._pl),height:td.offsetHeight});},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";},onlocationChange:function(){var l=this.location;if(!l){return ;}var ds=this.domNode.style;ds.left=(l.left+Math.max(l.width-16,0))+"px";ds.top=l.top+"px";}}};})();