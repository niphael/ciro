(function(){mstrmojo.requiresCls("mstrmojo.num","mstrmojo.hash","mstrmojo.Label","mstrmojo.Pulldown","mstrmojo.Button","mstrmojo.TristateCheckBox","mstrmojo.FieldSet","mstrmojo.Table","mstrmojo.txEditor.CommonComponent","mstrmojo.txEditor.ControlPropsPanel");var _TC=mstrmojo.txEditor.CommonComponent,_N=mstrmojo.num,_H=mstrmojo.hash;var _onValChgTscObj=function _onValChgTscObj(){mstrmojo.all.teModel.updateTxMapping(this.txInput,this.value);if(this.value===null){this.set("selectedIndex",-1);}if(this.txInput.editing){mstrmojo.all.ctrlPropPanel.set("show",false);}},_postCreateTscObj=function _postCreateTscObj(){this.popupRef.children[0].itemMarkupFunction=function(item,idx,w){var opener=w.parent.opener;return'<div class="mstrmojo-Pulldown-listItem'+(opener.itemCssClass?" "+opener.itemCssClass:"")+(item.mapped?" mapped":"")+'"><div class="mstrmojo-text">'+item.n+"</div></div>";};},_onChkChgEdt=function _onChkChgEdt(){if(this.txInput.editing){mstrmojo.all.ctrlPropPanel.set("show",false);}this.txInput.set("edt",this.checked?1:0);},_onEnbChgCtlStl=function _onEnbCtlStl(){this.set("value",this.enabled?this.items[0].t:null);},_onValChgCtlStl=function _onValChgCtlStl(){if(this.value){var idx=mstrmojo.array.find(this.items,"t",this.value),pr=_H.make(_H.clone(this.items[idx]),mstrmojo.Obj),ctl=_H.make({pr:pr,dirty:-1},mstrmojo.Obj);pr.dtp=this.txInput.dtp;this.txInput.set("ctl",ctl);}else{this.txInput.ctl=null;}if(this.txInput.editing){mstrmojo.all.ctrlPropPanel.set("panelIdx",this.value);}},_onClkExpndBtn=function _onClkExpndBtn(){var model=mstrmojo.all.teModel,me=this,show=!this.txInput.editing,panel=mstrmojo.all.ctrlPropPanel;if(model.isPropertiesValid()){if(panel.show&&!this.txInput.editing){model.currentTxInput.editing=false;panel.show=false;panel.playEffect("close",function(){me.onclick();});}else{if(show){model.set("currentTxInput",this.txInput);panel.set("panelIdx",this.txInput.ctl.pr.t);panel.targetDOM=this.parent[this.row+1+",0"];}panel.set("show",show);}}};var _bindingsEdt={enabled:function(){var toi=this.txInput.toi;return(toi>=0)&&!mstrmojo.all.teModel.rwTxs.tscObjs[toi].mo;},checked:"this.enabled && this.txInput.edt == 1"};function getLayout(inputs){var lyt=[],i,len,rw={cssClass:"row-relative",cells:[{cssClass:"c1"},{cssClass:"c2"},{cssClass:"c3"},{cssClass:"c4"},{}]},rs={cells:[{colSpan:5,cssClass:"top-align"}]},rc=inputs.length;lyt.push(rw);for(i=0,len=rc;i<len;i++){lyt.push(rw);lyt.push(rs);}return lyt.concat(rs);}function getChildren(inputs){var as=[],i,j,len,rc=inputs.length,tix;as.push({slot:"0,0",scriptClass:"mstrmojo.Label",text:mstrmojo.desc(8244)},{slot:"0,1",scriptClass:"mstrmojo.Label",text:(mstrmojo.all.teModel.rwTxs.tp===_TC.RW_UNIT_TYPE.RW_UNIT_FIELDGROUP)?mstrmojo.desc(8246):mstrmojo.desc(8245)},{slot:"0,2",scriptClass:"mstrmojo.Label",text:mstrmojo.desc(4694)},{slot:"0,3",scriptClass:"mstrmojo.Label",text:mstrmojo.desc(8247)},{slot:"0,4",scriptClass:"mstrmojo.Label"});for(i=0,len=rc;i<len;i++){j=i*2+1;tix=inputs[i].tix;as.push({slot:j+",0",scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-TransactionEditor-TransactionInput",text:inputs[i].n},{slot:j+",1",txInput:inputs[i],scriptClass:"mstrmojo.Pulldown",cssClass:"mstrmojo-Pulldown",popupToBody:true,popupZIndex:112,itemIdField:"idx",itemField:"n",items:mstrmojo.all.teModel.rwTxs.tscObjs,itemCssClass:"Transactable-Object",value:inputs[i].toi,bindings:{value:"this.txInput.toi"},defaultText:" ",defaultSelection:-1,onvalueChange:_onValChgTscObj,postCreate:_postCreateTscObj},{slot:j+",2",txInput:inputs[i],scriptClass:"mstrmojo.TristateCheckBox",grayed:false,checked:inputs[i].edt===1,bindings:_bindingsEdt,oncheckedChange:_onChkChgEdt},{slot:j+",3",txInput:inputs[i],scriptClass:"mstrmojo.Pulldown",popupToBody:true,popupZIndex:112,itemIdField:"t",items:mstrmojo.all.teModel.getControls(inputs[i].dtp),defaultText:" ",defaultSelection:-1,enabled:_N.isInt(inputs[i].toi)&&inputs[i].edt===1,value:inputs[i].ctl&&inputs[i].ctl.pr.t,bindings:{enabled:"this.txInput.edt == 1",value:"this.txInput.ctl.pr.t"},onenabledChange:_onEnbChgCtlStl,onvalueChange:_onValChgCtlStl},{slot:j+",4",row:j,tix:tix,txInput:inputs[i],scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-TransactionEditor-ExpandButton",title:mstrmojo.desc(8250),bindings:{enabled:"this.txInput.edt == 1"},onclick:_onClkExpndBtn});}return as;}mstrmojo.txEditor.FieldsMapTable=mstrmojo.declare(mstrmojo.FieldSet,null,{scriptClass:"mstrmojo.txEditor.FieldsMapTable",cssClass:"mstrmojo-TransactionEditor-InputPropertiesField",legend:mstrmojo.desc(8243),bindings:{visible:"mstrmojo.all.teModel.txRpt != null"},children:[_TC.createPanel({cssClass:"mstrmojo-TransactionEditor-scrollableInputPanel",children:[{scriptClass:"mstrmojo.Table",cellPadding:1,bindings:{items:"mstrmojo.all.teModel.txRpt.inputs"},onitemsChange:function(){this.destroyChildren();var items=this.items;if(items&&items.length>0){this.layout=getLayout(items);this.set("children",getChildren(items));this.refresh();mstrmojo.dom.center(mstrmojo.all.mstrTE.editorNode);}}}]})]});}());