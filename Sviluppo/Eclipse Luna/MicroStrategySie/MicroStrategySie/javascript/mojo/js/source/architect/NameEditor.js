(function(){mstrmojo.requiresCls("mstrmojo.Editor");mstrmojo.Architect.NameEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.Architect.NameEditor",cssText:"width:250px;",children:[{scriptClass:"mstrmojo.Label",alias:"name",cssText:"font-weight:bold; width:100%; padding: 5px;",text:"Please Enter Name:",cssText:"margin-top:5px;"},{scriptClass:"mstrmojo.TextBox",alias:"txtbox",cssText:"margin-top:10px;width:200px;",onkeyup:function(evt){switch(evt.e.keyCode){case 13:var ret=true;if(this.parent.onOK){this.parent.onOK();}break;case 27:this.parent.close();break;default:break;}}},{scriptClass:"mstrmojo.Label",cssText:"width:100%; padding: 5px;",alias:"error",text:""},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBox",slot:"buttonNode",children:[{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button rightfloat",text:mstrmojo.desc(1442,"OK"),onclick:function(evt){var e=this.parent.parent;var ret=true;if(e.onOK){e.onOK();}}},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",text:mstrmojo.desc(221,"Cancel"),onclick:function(evt){var e=this.parent.parent;if(e.onCancel){e.onCancel();}e.close();}}]}]});})();