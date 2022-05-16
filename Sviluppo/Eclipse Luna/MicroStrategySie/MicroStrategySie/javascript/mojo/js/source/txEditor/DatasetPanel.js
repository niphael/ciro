(function(){mstrmojo.requiresCls("mstrmojo.Table","mstrmojo.Pulldown","mstrmojo.txEditor.CommonComponent","mstrmojo.txEditor.Container","mstrmojo.txEditor.Table");var _TC=mstrmojo.txEditor.CommonComponent,_TCCT=_TC.CTRL_TYPES,_TCIV=_TC.INPUT_VALUES;function _isBarcode(){return mstrmojo.all.teModel.currentTxInput.ctl.pr.t===_TCCT.CTRL_BARCODE;}mstrmojo.txEditor.DatasetPanel=mstrmojo.declare(mstrmojo.txEditor.Container,null,{scriptClass:"mstrmojo.txEditor.DatasetPanel",cssClass:"mstrmojo-TransactionEditor-Panel dataset",onvisibleChange:function(){var m=mstrmojo.all.teModel;if(this.visible){m.updateDDICSetting(m.currentTxInput);}else{if(this.parent.visible){m.currentTxInput.ctl.ddic=null;}}},getVisibility:function(){return mstrmojo.all.teModel.currentTxInput.ctl.pr.ipt===_TCIV.INPUT_VALUES_DATASET;},children:[{scriptClass:"mstrmojo.txEditor.Table",layout:[{cells:[{},{}]},{cells:[{},{}]},{cells:[{},{}]},{cells:[{},{}]},{cells:[{colSpan:2}]},{cells:[{},{}]}],children:[_TC.createLabel({slot:"0,0"},mstrmojo.desc(4190)),{slot:"0,1",alias:"dstPicker",scriptClass:"mstrmojo.Pulldown",popupToBody:true,popupZIndex:112,itemIdField:"dsid",defaultText:" ",defaultSelection:-1,getVisibility:function(){var model=mstrmojo.all.teModel;this.set("items",model.rwTxs.ds);this.set("value",model.currentTxInput.ctl.ddic.dsid);return true;},onvalueChange:function(){if(this.visible){var ddic=mstrmojo.all.teModel.currentTxInput.ctl.ddic;ddic.dsid=this.value;ddic.dst=this.selectedItem&&this.selectedItem.dst;ddic.cst=null;this.parent.attPicker.set("items",this.selectedItem&&this.selectedItem.attrs);this.parent.attPicker.set("value",null);this.parent.wfrmPicker.set("value",null);if(_isBarcode()){this.parent.mfrmPicker.set("value",null);this.parent.wmEqualCheck.set("checked",false);}}}},_TC.createLabel({slot:"1,0"},mstrmojo.desc(2149)),{slot:"1,1",alias:"attPicker",scriptClass:"mstrmojo.Pulldown",popupToBody:true,popupZIndex:112,itemIdField:"did",defaultText:" ",defaultSelection:-1,items:[],getVisibility:function(){var selectedItem=this.parent.dstPicker.selectedItem;this.set("items",selectedItem&&selectedItem.attrs);this.set("value",mstrmojo.all.teModel.currentTxInput.ctl.ddic.csid);return true;},onvalueChange:function(){if(this.visible){var ddic=mstrmojo.all.teModel.currentTxInput.ctl.ddic;ddic.csid=this.value;ddic.cst=this.selectedItem&&this.selectedItem.tp;this.parent.dfrmPicker.set("items",this.selectedItem&&[{fid:"1",n:"Automatic"}].concat(this.selectedItem.frms));this.parent.dfrmPicker.set("value",this.selectedItem?"1":null);this.parent.wfrmPicker.set("items",this.selectedItem&&this.selectedItem.frms);this.parent.wfrmPicker.set("value",null);if(_isBarcode()){this.parent.mfrmPicker.set("items",this.selectedItem&&this.selectedItem.frms);this.parent.mfrmPicker.set("value",null);this.parent.wmEqualCheck.set("checked",false);}}}},_TC.createLabel({slot:"2,0"},mstrmojo.desc(5247)),{slot:"2,1",alias:"dfrmPicker",scriptClass:"mstrmojo.Pulldown",popupToBody:true,popupZIndex:112,itemIdField:"fid",defaultText:" ",defaultSelection:-1,items:[],getVisibility:function(){var selectedItem=this.parent.attPicker.selectedItem;this.set("items",selectedItem&&[{fid:"1",n:"Automatic"}].concat(selectedItem.frms));this.set("value",mstrmojo.all.teModel.currentTxInput.ctl.ddic.dfid);return true;},onvalueChange:function(){if(this.visible){mstrmojo.all.teModel.currentTxInput.ctl.ddic.dfid=this.value;}}},_TC.createLabel({slot:"3,0",getVisibility:_isBarcode},mstrmojo.desc(9899)),{slot:"3,1",alias:"mfrmPicker",scriptClass:"mstrmojo.Pulldown",popupToBody:true,popupZIndex:112,itemIdField:"fid",defaultText:" ",defaultSelection:-1,items:[],getVisibility:function(){var isBarcodeType=_isBarcode(),selectedItem=this.parent.attPicker.selectedItem;if(isBarcodeType){this.set("items",selectedItem&&selectedItem.frms);this.set("value",mstrmojo.all.teModel.currentTxInput.ctl.ddic.mfid);}return isBarcodeType;},onvalueChange:function(){if(this.visible){var ddic=mstrmojo.all.teModel.currentTxInput.ctl.ddic;ddic.mfid=this.value;if(this.parent.wmEqualCheck.checked===false){this.parent.wfrmPicker.set("value",this.value);}}}},{slot:"4,0",alias:"wmEqualCheck",scriptClass:"mstrmojo.TristateCheckBox",cssClass:"tristate mstrmojo-TransactionEditor-CheckBox",grayed:false,text:mstrmojo.desc(9900),getVisibility:function(){var ddic=mstrmojo.all.teModel.currentTxInput.ctl.ddic,isBarcodeType=_isBarcode();if(isBarcodeType){this.set("checked",ddic.wfid!==ddic.mfid);}return isBarcodeType;},oncheckedChange:function(){if(this.visible){var ddic=mstrmojo.all.teModel.currentTxInput.ctl.ddic;if(!this.checked){this.parent.wfrmPicker.set("value",ddic.mfid);}}}},_TC.createLabel({slot:"5,0",getVisibility:function(){return(mstrmojo.all.teModel.currentTxInput.ctl.pr.t!==_TCCT.CTRL_BARCODE)||this.parent.wmEqualCheck.checked;},bindings:{visible:"this.parent.wmEqualCheck.checked"}},mstrmojo.desc(8501)),{slot:"5,1",alias:"wfrmPicker",scriptClass:"mstrmojo.Pulldown",popupToBody:true,popupZIndex:112,itemIdField:"fid",defaultText:" ",defaultSelection:-1,items:[],getVisibility:function(){return !_isBarcode()||this.parent.wmEqualCheck.checked;},onvisibleChange:function(){if(this.visible){var selectedItem=this.parent.attPicker.selectedItem;this.set("items",selectedItem&&selectedItem.frms);this.set("value",mstrmojo.all.teModel.currentTxInput.ctl.ddic.wfid);}},bindings:{visible:"this.parent.wmEqualCheck.checked"},onvalueChange:function(){mstrmojo.all.teModel.currentTxInput.ctl.ddic.wfid=this.value;}}]}]});}());