(function(){mstrmojo.requiresCls("mstrmojo.fx");mstrmojo.SwitchBox=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.SwitchBox",markupString:'<div id="{@id}" class="mstrmojo-SwitchBox {@cssClass}" style="{@cssText}" mstrAttach:click,mousedown,mouseup><img src="../images/iphone_switch_container_off.png" style="{@imgCssText}"></div>',value:false,_v:false,markupSlots:{imgNode:function(){return this.domNode.firstChild;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";},onvalueChange:function(){if(this._v!=this.value){var v=this.value,start=v?-53:0,stop=v?0:-53,duration=600,e=new mstrmojo.fx.AnimateProp({props:{left:{isStyle:true,start:start,stop:stop,suffix:"px"}},duration:duration,interval:duration/10,target:this.imgNode});e.play();this._v=this.value;}}},preBuildRendering:function preBldRnd(){if(this._super){this._super();}this._v=this.value;if(this.value){this.imgCssText="left: 0px";}else{this.imgCssText="left: -53px";}},onclick:function(){this.set("value",!this.value);}});})();