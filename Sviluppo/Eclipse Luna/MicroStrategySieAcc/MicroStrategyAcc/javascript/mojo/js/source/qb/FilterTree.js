(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.hash","mstrmojo.expr","mstrmojo.FilterExpr");var _E=mstrmojo.expr,_ET=_E.ET,_ET2SC={},_H=mstrmojo.hash,_D=mstrmojo.dom;_ET2SC[_ET.ANDOR]=mstrmojo.AndOrNode;_ET2SC["*"]=mstrmojo.ConditionNode;function openLogicalOperatorDialog(){var parentTree=this.tree,cel=parentTree.parent,off=_D.delta(this.domNode,parentTree.domNode);if(this.data.sqltp===1){off.y+=parseInt(cel.filterExpr.domNode.offsetHeight,10)+15;}cel.parent.openPopup("andOrPopupRef",{condition:this,zIndex:this.zIndex?this.zIndex+100:100,left:off.x+40+"px",top:off.y+65-cel.domNode.scrollTop+"px"});}function _getTokensAsString(its){var sa=[],i;for(i=0,len=its.length;i<len;i++){sa[i]=its[i].v;}return sa.join(" ").replace(/<\s/g,"<").replace(/>\s/g,">");}function _CountBC(arr){if(arr.constructor!==Array){arr=[arr];}var item,r={b:0,c:0},nds,sr,b;for(var j=0,len=arr.length;j<len;j++){item=arr[j];if(!(item&&item.et)){continue;}nds=item.nds;if(nds){sr=_CountBC(nds);r.b+=sr.b;r.c+=sr.c;}else{b=(item.et===_ET.B);r[b?"b":"c"]++;}}return r;}function _syncParentExpr(f){var d=f.parent.data;if(d){var its=f.items;if(f.alias==="filterExpr"){d.expr=its&&its[0];}else{d.aggexpr=its&&its[0];}}}function _UpdateBCAdd(evt){var ct=_CountBC(evt.value),t=this.tree;t.set("bandingCount",t.bandingCount+ct.b);t.set("conditionCount",t.conditionCount+ct.c);}function _UpdateBCRemove(evt){var ct=_CountBC(evt.value),t=this.tree;t.set("bandingCount",t.bandingCount-ct.b);t.set("conditionCount",t.conditionCount-ct.c);}mstrmojo.qb.FilterTree=mstrmojo.declare(mstrmojo.FilterExpr,null,{scriptClass:"mstrmojo.qb.FilterTree",draggable:true,dropZone:true,allowCopy:false,makeObservable:true,bandingCount:0,conditionCount:0,onadd:function(evt){_syncParentExpr(this);_UpdateBCAdd.apply(this,[evt]);},onremove:function(evt){_syncParentExpr(this);_UpdateBCRemove.apply(this,[evt]);},editable:true,onRender:function(){var c=_CountBC(this.items),t=this.tree;t.set("bandingCount",c.b);t.set("conditionCount",c.c);},itemFunction:function(item,idx,widget){var andor=(item.et===_ET.ANDOR),t=widget.tree||widget,cfg={data:item,tree:t,parent:widget,itemFunction:andor?widget.itemFunction:null,draggable:andor?t.draggable:false,dropZone:andor?t.dropZone:false,allowDrop:andor&&t.dropZone?t.allowDrop:null,allowCopy:andor?t.allowCopy:false,editable:t.isEditable?t.isEditable(item):t.editable,makeObservable:andor&&widget.makeObservable,onclick:t.onnodeclick,onadd:t.onnodeadd,onremove:t.onnoderemove},Sc=_ET2SC[item.et]||_ET2SC["*"];return Sc&&(new Sc(cfg));},isEditable:function isedt(item){if(!this.editable){return false;}var _result=false;switch(item&&item.et){case _ET.AQ:case _ET.ANDOR:case"*":_result=true;break;}return _result;},onnodeclick:function ndclk(evt){if(!this.editable){return ;}if(evt&&evt.part==="andor"){openLogicalOperatorDialog.call(this);}else{var tree=this.tree;tree.onexprclick&&tree.onexprclick(this);}},onnodeadd:_UpdateBCAdd,onnoderemove:_UpdateBCRemove,allowDrop:function allowDrop(ctxt){var s=ctxt&&ctxt.src,d=s&&s.data,et=d&&d.et,banding=(et===_ET.B),t=this.tree;return et&&((banding&&(t.conditionCount===0))||(!banding&&(t.bandingCount===0)));}});})();