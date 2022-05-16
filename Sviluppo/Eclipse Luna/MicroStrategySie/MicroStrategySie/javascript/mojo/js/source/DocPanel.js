(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._Formattable","mstrmojo._ContainsDocObjects","mstrmojo._HasBuilder","mstrmojo.css","mstrmojo.array");var $CSS=mstrmojo.css;var ITEM_SPA=2;function passDirtyKeyToAncestorPanel(pnl,methodName,key){var p=pnl.parent.parent;if(p&&p instanceof mstrmojo.DocPanel){p[methodName+"DirtyKey"](key);}}function setDirtyChildrenOnDescendant(key,panel,allDirty){if(key===panel.k){mstrmojo.array.forEach(panel.children,function(child){if(child.setDirtyChildren){child.setDirtyChildren(allDirty);}});}}mstrmojo.DocPanel=mstrmojo.declare(mstrmojo.Container,[mstrmojo._Formattable,mstrmojo._ContainsDocObjects,mstrmojo._HasBuilder],{scriptClass:"mstrmojo.DocPanel",visible:false,selected:false,cssDisplay:"block",topStart:ITEM_SPA,contentWidth:0,markupString:'<div id="{@id}" class="mstrmojo-DocPanel {@cssClass}" style="{@cssText}{@domNodeCssText}"><div class="mstrmojo-DocSubPanel-content" style="height:100%;width:100%;position:absolute;{@containerNodeCssText}"></div></div>',markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?this.cssDisplay:"none";}},markupSlots:{containerNode:function(){return this.domNode.firstChild;}},formatHandlers:{containerNode:["background-color","fx"]},title:"",init:function init(props){this._super(props);if(!this.title){this.title=this.node.defn.ttl||"";}},childRenderCheck:function childRenderCheck(c){return(this._super(c)&&this.selected);},postBuildRendering:function postBuildRendering(){var c=$CSS.addClass;if(!this.defn.l&&!this._forceRender){c(this.domNode,"placeholder");}return this._super();},onselectedChange:function onselectedChange(evt){this.set("visible",!!evt.value);if(evt.value){this.renderChildren();}this.model&&this.model.raiseEvent({name:"panelSelected",panelId:this.id,panelVisible:!!evt.value});},refresh:function refresh(){if(!this.hasRendered){return ;}if(!this.selected){if(!this.children){this.builtChildren=false;}this._forceRender=true;this._super();delete this._forceRender;}else{var c=this.children||[],i;for(i=c.length-1;i>=0;i--){c[i].refresh();}if(this._isFP()){this.refreshFP();}}},setDirty:function setDirty(isDirty){var mth=((isDirty)?"add":"remove")+"DirtyKey";this[mth](this.k);},addDirtyKey:function addDirtyKey(key){var d=this.defn,hash=d.dirtyKeys||{};hash[key]=true;d.dirtyKeys=hash;setDirtyChildrenOnDescendant(key,this,true);passDirtyKeyToAncestorPanel(this,"add",key);},removeDirtyKey:function removeDirtyKey(key){passDirtyKeyToAncestorPanel(this,"remove",key);setDirtyChildrenOnDescendant(key,this,false);var defn=this.defn,dk=defn.dirtyKeys;if(!dk){return ;}delete dk[key];if(!mstrmojo.hash.isEmpty(dk)){return ;}delete defn.dirtyKeys;},renderChildren:function rnCh(){var ch=this.children;if(ch&&(this._isFP()||this._isFSP())){for(var i=0,len=ch&&ch.length||0;i<len;i++){ch[i].orgPos=i;}ch.sort(function(l,r){var lz=(l.getFormats()&&l.getFormats()["z-index"])||0,rz=(r.getFormats()&&r.getFormats()["z-index"])||0;return lz-rz||l.orgPos-r.orgPos;});}if(this._isFP()){if(ch){var ocw=this.domNode.clientWidth-2*ITEM_SPA;this.topStart=ITEM_SPA+1;for(var i=0,len=ch&&ch.length||0;i<len;i++){var cw=this.domNode.clientWidth-2*ITEM_SPA;this.contentWidth=(cw>0)?cw:0;if(cw!=ocw){this.topStart=ITEM_SPA;for(var j=0;j<i;j++){var oc=ch[j];oc.refresh();if(oc.getContainerHeight){this.topStart+=oc.getContainerHeight()+ITEM_SPA;}}}var c=ch[i];if(this.childRenderCheck(c)){c.render(null);if(c.getContainerHeight){this.topStart+=c.getContainerHeight()+ITEM_SPA;}}}}}else{this._super();}},refreshFP:function(){if(!this.hasRendered){return ;}var ch=this.children;this.topStart=ITEM_SPA;var cw=this.domNode.clientWidth-2*ITEM_SPA;this.contentWidth=(cw>0)?cw:0;for(var i=0,len=ch&&ch.length||0;i<len;i++){var c=ch[i];if(c.relocate){c.relocate(this.topStart,this.contentWidth);}if(c.getContainerHeight){this.topStart+=c.getContainerHeight()+ITEM_SPA;}}},getChildren:function getChildren(){var ch=this.model.getChildren(this.node,false);if(this._isFP()||this._isFSP()){for(var i=0,len=ch&&ch.length||0;i<len;i++){var c=ch[i];if(this._isFP()&&!c.defn.iifp){c.defn.iifp=true;}if(this._isFSP()&&!c.defn.iifs){c.defn.iifs=true;}}}return ch;},_isFP:function(){return this.parent.defn.ifp;},_isFSP:function(){return this.parent.defn.ifsp;}});}());