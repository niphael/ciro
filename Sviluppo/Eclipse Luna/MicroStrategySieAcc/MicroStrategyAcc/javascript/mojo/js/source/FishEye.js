(function(){mstrmojo.requiresCls("mstrmojo.ListHoriz","mstrmojo.fx");mstrmojo.FishEye=mstrmojo.declare(mstrmojo.ListHoriz,null,{scriptClass:"mstrmojo.FishEye",alias:"fishEyeList",width:16,size:10,step:16,speed:2,cssClass:"mstrmojo-FishEye",cssClassItem:"mstrmojo-dot",itemMarkupFunction:function(item,index,widget){return'<div class="mstrmojo-fisheye-item '+widget.cssClassItem+'" title="'+item.n+'" idx="'+index+'" did="'+item.did+'">&nbsp;</div>';},onchange:function(){this.scroll2();this.parent.set("selectedIndex",this.selectedIndex);},as:new mstrmojo.fx.AnimateProp(),onitemsChange:function(){if(this._super){this._super();}this.last=this.items.length-1;this.first=Math.max(0,this.last-this.size);if(this.items.length>this.size){this.scroll("left",this.width);}},scroll2:function(){var cnt=this.selectedIndex-this.last;if(this.selectedIndex==this.first&&this.first>0){this.scroll("right",this.width);}else{if(this.selectedIndex==this.last&&this.last<this.items.length-1){this.scroll("left",this.width);}else{if(this.selectedIndex>this.last){cnt=this.selectedIndex-this.last;this.scroll("left",this.width*cnt,cnt);this.last=Math.min(this.items.length-1,this.last+cnt);}else{if(this.selectedIndex<this.first){cnt=this.first-this.selectedIndex;this.scroll("right",this.width*cnt,cnt);this.first=Math.max(0,this.first-cnt);}}}}},scroll:function(dir,dist,count){var n=this.itemsContainerNode,b=n&&n.style;var as=this.as,pos=parseInt(mstrmojo.css.getStyleValue(n,{left:"right",right:"left"}[dir]),10),pos=isNaN(pos)?0:pos,start=parseInt(b.left,10)||0,stop=start+(dir=="left"?-1:1)*(dist||(Math.min(this.step,(-1)*pos)));as.target=n;as.props={left:{start:start,stop:stop,duration:100,interval:10,suffix:"px"}};as.play();count=count===undefined?1:count;this.first+=(dir=="left"?1:-1)*count;this.last=this.first+this.size-1;this.parent.set("scrollable",this.last<this.items.length-1);this.parent.set("rightScrollable",this.first>0);return stop;},srcId:null,postBuildRendering:function(){if(this._super){this._super();}this.hasRendered=!!this.domNode;var n=this.itemsContainerNode,tb=n&&n.firstChild,r=tb&&tb.rows&&tb.rows[0],c=r&&r.cells&&r.cells[0];this.first=0;this.last=this.size-1;var id=this.srcId;if(id&&mstrmojo.all[id]&&mstrmojo.all[id].attachEventListener){mstrmojo.all[id].attachEventListener("change",this.id,function(evt){if(this.items[this.items.length-1]!=evt.src.selectedItem){this.items.add([mstrmojo.hash.copy(evt.src.selectedItem)]);this.set("selectedIndex",this.items.length-1);}if(this.items.length>this.size){this.set("rightScrollable",this.items.length>this.size);this.scroll("left",this.width*(this.selectedIndex-this.last),(this.selectedIndex-this.last));}});}this.itemsContainerNode.style.left=Math.min(0,(this.size-this.items.length+1))*this.width+"px";}});})();