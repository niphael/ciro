(function(){mstrmojo.requiresCls("mstrmojo.android.ui.TxEditDoc","mstrmojo.android.medium.ui.TxActionButtons","mstrmojo.css","mstrmojo.array");mstrmojo.android.medium.ui.TxEditDoc=mstrmojo.declare(mstrmojo.android.ui.TxEditDoc,null,{scriptClass:"mstrmojo.android.medium.ui.TxEditDoc",layoutConfig:{h:{typeNode:"auto",txNode:"100%",btmNode:"auto"},w:{typeNode:"100%",txNode:"100%",btmNode:"100%"}},addChildren:function addChildren(children,idx,silent){children=children.concat([{scriptClass:"mstrmojo.android.medium.ui.TxActionButtons",alias:"btns",cssClass:"btns",slot:"btmNode"}]);this._super(children,idx,silent);},enableButtons:function enableButtons(enabled){this.btns.set("enabled",enabled);}});}());