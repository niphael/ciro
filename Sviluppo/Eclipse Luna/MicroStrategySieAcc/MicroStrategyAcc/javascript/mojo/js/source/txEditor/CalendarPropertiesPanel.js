(function(){mstrmojo.requiresCls("mstrmojo._CanValidate","mstrmojo.DateTextBox","mstrmojo.txEditor.CommonComponent","mstrmojo.txEditor.Container","mstrmojo.txEditor.Table");var _TC=mstrmojo.txEditor.CommonComponent,_V=mstrmojo.validation,_TR=_V.TRIGGER;mstrmojo.txEditor.CalendarPropertiesPanel=mstrmojo.declare(mstrmojo.txEditor.Container,null,{scriptClass:"mstrmojo.txEditor.CalendarPropertiesPanel",children:[{scriptClass:"mstrmojo.txEditor.Table",layout:[{cells:[{colSpan:2}]},{cells:[{},{}]},{cells:[{},{}]},{cells:[{colSpan:2}]}],children:[_TC.createRequiredCheckBox({slot:"0,0"}),_TC.createLabel({slot:"1,0"},mstrmojo.desc(2100)),{slot:"1,1",scriptClass:"mstrmojo.DateTextBox",cssClass:"mstrmojo-TransactionEditor-DateTextBox",width:120,autoFormat:false,getVisibility:function(){var txInput=mstrmojo.all.teModel.currentTxInput;this.set("dtp",txInput.dtp);this.set("value",txInput.ctl.pr.min);return true;},required:false,constraints:{trigger:_TR.ALL},onValid:_TC.onValChg,onInvalid:_TC.onValChg,updateModel:function(v){mstrmojo.all.teModel.currentTxInput.ctl.pr.min=v;},calendarToBody:true,calendarZIndex:112},_TC.createLabel({slot:"2,0"},mstrmojo.desc(2099)),{slot:"2,1",scriptClass:"mstrmojo.DateTextBox",cssClass:"mstrmojo-TransactionEditor-DateTextBox",width:120,autoFormat:false,getVisibility:function(){var txInput=mstrmojo.all.teModel.currentTxInput;this.set("dtp",txInput.dtp);this.set("value",txInput.ctl.pr.max);return true;},required:false,constraints:{trigger:_TR.ALL},onValid:_TC.onValChg,onInvalid:_TC.onValChg,updateModel:function(v){mstrmojo.all.teModel.currentTxInput.ctl.pr.max=v;},calendarToBody:true,calendarZIndex:112},_TC.createCheckBox({slot:"3,0",text:mstrmojo.desc(8253)},"ict")]}]});}());