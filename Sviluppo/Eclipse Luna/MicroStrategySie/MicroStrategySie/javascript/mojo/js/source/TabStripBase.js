(function(){mstrmojo.requiresCls("mstrmojo.Container");mstrmojo.TabStripBase=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.TabStripBase",target:null,targetProps:null,isStrip:true,ontargetChange:function ontargetChange(evt){var tWas=evt&&evt.valueWas;if(tWas){var ts=this._targetSubs;if(ts){tWas.detachEventListener(ts.add);tWas.detachEventListener(ts.rem);tWas.detachEventListener(ts.sel);}this.removeChildren();}var t=this.target;if(t){var tps=this.targetProps,p=(tps&&tps.children)||"children",ch=t[p];this.addTabButtons(ch,0);var fn="attachEventListener",id=this.id,i;if(t[fn]){this._targetSubs={add:t[fn]("addChild",id,function(evt){var btns=evt&&evt.value;if(btns&&btns.length){this.addTabButtons(btns,evt.index);}}),rem:t[fn]("removeChild",id,function(evt){var arr=evt&&evt.value;for(i=((arr&&arr.length)||0)-1;i>-1;i--){this.removeTabButton(arr[i]);}}),sel:t[fn]("selectedChange",id,function(evt){this.selectionChange(evt);})};}}},addTabButtons:mstrmojo.emptyFn,removeTabButton:mstrmojo.emptyFn,selectionChange:mstrmojo.emptyFn});}());