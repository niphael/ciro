(function(){mstrmojo.requiresCls("mstrmojo.hash");var $H=mstrmojo.hash,dicPopup=null;function _createDICInGroup(o){return mstrmojo.DICFactory.createDIC($H.copy({dic:this.dic,owner:this.owner,group:this},o));}mstrmojo.DICFactory=mstrmojo.provide("mstrmojo.DICFactory",{createDIC:function(o){var dic=o.dic,Cls=mstrmojo.DICConfig.getDICClass(dic),w;if(Cls){if(o.k===undefined){o.k=o.opener&&o.opener.id;}o.showByDefault=mstrmojo.DICConfig.showDICByDefault(o.dic,o.openerType);o.hasPreview=mstrmojo.DICConfig.hasDICPreview(o.dic,o.openerType);w=new Cls(o);}return w;},createDICPopup:function(opener,dic){return mstrmojo.DICPopup.getInstance(opener,dic);},createDICGroup:function(gco){var dicGroup=$H.copy(gco,{scriptClass:"mstrmojo.Widget",widgetsMap:{},dic:null,owner:null,groupMembers:{},postCreate:function(){var dic=this.dic,otp=this.openerType,DC=mstrmojo.DICConfig;this.showByDefault=DC.showDICByDefault(dic,otp);this.hasPreview=DC.hasDICPreview(dic,otp);},addDIC:function addDIC(k,o){this.groupMembers[k]=o;},showPopupDIC:function showPopupDIC(k){if(!this.showByDefault){var w=this.widgetsMap[k],o=this.groupMembers[k];if(!o){return ;}if(!w){w=this.widgetsMap[k]=_createDICInGroup.call(this,o);}w.showInPopup();}},render:function render(){if(this.showByDefault||this.hasPreview){var gms=this.groupMembers,me=this,dicWidget;$H.forEach(gms,function(go,k){if(!go.hasRendered){me.widgetsMap[k]=dicWidget=_createDICInGroup.call(me,go);if(me.showByDefault){dicWidget.render();}else{if(me.hasPreview){dicWidget.renderPreview();}}go.hasRendered=true;}});}},destroy:function destroy(){$H.forEach(this.widgetsMap,function(w){w.destroy();});this.widgetsMap={};}});return mstrmojo.insert(dicGroup);}});}());