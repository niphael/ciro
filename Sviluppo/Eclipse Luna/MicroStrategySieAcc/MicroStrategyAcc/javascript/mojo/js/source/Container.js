(function(){mstrmojo.requiresCls("mstrmojo.publisher","mstrmojo.Widget","mstrmojo._HasChildren");var _P=mstrmojo.publisher;mstrmojo.Container=mstrmojo.declare(mstrmojo.Widget,[mstrmojo._HasChildren],{scriptClass:"mstrmojo.Container",defaultChildSlot:"containerNode",init:function init(props){this._super(props);if(this.children){this.initChildren();}var p=this.parent;if(!p||p.hasInitBindings){this.initBindings();}},destroy:function dst(skipCleanup){if(this.children){this.destroyChildren(true);}if(this.bindings){this.destroyBindings();}this._super(skipCleanup);},unrender:function unrn(ignoreDom){var c=this.children,len=(c&&c.length)||0,i;for(i=len-1;i>-1;i--){c[i].unrender(true);}this._super(ignoreDom);},postBuildRendering:function pstBR(){var ret=this._super?this._super():undefined;if(ret!==false){this.renderChildren();ret=true;}return ret;},renderChildren:function rnCh(){var ch=this.children,len=(ch&&ch.length)||0,i;for(i=0;i<len;i++){var c=ch[i];if(this.childRenderCheck(c)){c.render(null);}}},childRenderCheck:function chRnCk(c){if(c&&!c.hasRendered){var s=c.slot||this.defaultChildSlot;return !!this[s];}return false;},addChildren:function addCh(c,idx,silent){var arr=this._super(c,idx,silent);if(arr){this.childRenderOnAddCheck(arr);}return arr;},removeChildren:function rmCh(c,silent){var c2r=c?[c]:(this.children||[]),len=c2r.length,i;for(i=len-1;i>-1;i--){var w=c2r[i],dn=w&&w.domNode;if(dn){var s=this[(w.slot||this.defaultChildSlot)];if(dn.parentNode===s){s.removeChild(dn);}}}return this._super(c,silent);},childRenderOnAddCheck:function childRndrOnAddChk(ch){if(this.hasRendered&&ch){var len=ch.length,i;for(i=0;i<len;i++){var c=ch[i];if(this.childRenderCheck(c)){c.render();}else{if(c&&c.hasRendered){this.onchildRenderingChange(c);}}}}},preserveChildDomOrder:true,onchildRenderingChange:function onChldChngRndr(child){var d=child&&child.domNode;if(!d){return ;}var sdef=this.defaultChildSlot,s=child.slot||sdef,n=this[s],ch=this.children;if(!n){if(d.parentNode){d.parentNode.removeChild(d);}}else{if(d.parentNode===n){return ;}if(!this.preserveChildDomOrder){n.appendChild(d);}else{var sib,i;for(i=ch.length-1;i>=0;i--){var c=ch[i];if(c===child){break;}if(s===(c.slot||sdef)){var cNode=c.domNode;if(cNode&&cNode.parentNode===n){sib=cNode;}}}if(sib){n.insertBefore(d,sib);}else{n.appendChild(d);}}}if(_P.hasSubs(this.id,"childrenRendered")){var klen=ch.length,k;for(k=0;k<klen;k++){if(!ch[k].domNode){return ;}}this.raiseEvent({name:"childrenRendered"});}}});}());