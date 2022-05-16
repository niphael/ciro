(function(){mstrmojo.requiresCls("mstrmojo.android.selectors.MobileSliderSelector","mstrmojo.hash");var $M=mstrmojo.android.selectors.MobileSliderSelector,$F=$M.FLAGS,$T=$M.TYPES;mstrmojo.android.selectors.Slider=mstrmojo.declare(mstrmojo.android.selectors.MobileSliderSelector,null,{scriptClass:"mstrmojo.android.selectors.Slider",items:$F.UNSET,initState:function initState(){if(!!this.items){this.leftStep=this.rightStep=this.singleStep=null;this.set("type",(!this.multiSelect)?$T.SINGLE:(this.include)?$T.INCLUDE:$T.EXCLUDE);this.set("steps",this.items.length);this.value=null;this.set("value",this.selectedIndices);}},onvalueChange:function onvalueChange(){var values=this.value,mn=mstrmojo.hash.any(values,true),mx=mn;if(this.type===$T.SINGLE){this.set("singleStep",parseInt(mn)||0);}else{var p;for(p in values){mn=Math.min(p,mn);mx=Math.max(p,mx);}mn=mn||"0";if(mx===undefined||mx===null){mx=String(this.steps-1);}this.set("leftStep",parseInt(mn,10));this.set("rightStep",parseInt(mx,10)+1);}},flushSelections:function flushSelections(){if(this.type===$T.SINGLE){this.select([this.singleStep]);}else{var s=[],i=this.leftStep;for(;i<this.rightStep;i++){s.push(i);}this.select(s);}},buildSummary:function buildSummary(singleStep,leftStep,rightStep){var items=this.items,s=(singleStep!==null)?singleStep:leftStep;if(s===undefined||s===null||isNaN(s)||!items.length){return ;}var summary=(singleStep===null&&leftStep!==rightStep-1)?items[leftStep].n+" - "+items[rightStep-1].n:(items[s]&&items[s].n)||"";this.summary.innerHTML=summary;return summary;}});}());