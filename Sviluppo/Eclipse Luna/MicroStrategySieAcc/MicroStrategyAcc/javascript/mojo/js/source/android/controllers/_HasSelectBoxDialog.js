(function(){mstrmojo.requiresCls("mstrmojo.android.ui.SelectBoxList","mstrmojo.array");mstrmojo.android.controllers._HasSelectBoxDialog=mstrmojo.provide("mstrmojo.android.controllers._HasSelectBoxDialog",{_mixinName:"mstrmojo.android.controllers._HasSelectBoxDialog",showSelectBoxDialog:function showSelectBoxDialog(items,fnSelect,dialogConfig){var dialogChild=dialogConfig.children=[{scriptClass:"mstrmojo.android.ui.SelectBoxList",isElastic:true,items:items,selectListChange:function(idx,item){if(!fnSelect.call(this,idx,item)){mstrApp.closeDialog();}}}][0];if(items.length===1){var item=items[0];items=item.items;dialogConfig.title=item.n;dialogChild.scriptClass="mstrmojo.ui.MobileCheckList";dialogChild.items=items;dialogChild.multiSelect=false;dialogChild.selectedIndex=mstrmojo.array.find(items,"on",true);dialogChild.postselectionChange=function(evt){this.selectListChange(0,items[evt.added[0]]);};}mstrApp.showDialog(dialogConfig);}});}());