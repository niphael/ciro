(function(){mstrmojo.requiresCls("mstrmojo.registry","mstrmojo.array","mstrmojo.publisher");var _R=mstrmojo.registry,_A=mstrmojo.array,_P=mstrmojo.publisher;function _preAdd(p,c){if(c){c.parent=p;return _R.ref(c);}return null;}function _postAdd(p,c){if(c&&c.alias!=null){p[c.alias]=c;}}function _postRmv(p,c){var a=c.alias;if(c.parent===p){delete c.parent;}if((a!=null)&&(p[a]===c)){delete p[a];}}function makeCh(p,refs){var len=refs&&refs.length,ch,i;if(len){ch=[];for(i=0;i<len;i++){var c=_preAdd(p,refs[i]);if(!c){continue;}ch.push(c);_postAdd(p,c);}}return ch;}mstrmojo._HasChildren=mstrmojo.provide("mstrmojo._HasChildren",{_meta_usesSuper:false,initChildren:function initChildren(){var C="children",c=this[C];if(!c){return ;}this[C]=null;this._set_children(C,c,true);if(this.postCreateChildren){this.postCreateChildren();}},_set_children:function setCh(n,v,silent){var ch=this.children;if(v!==ch){if(ch){this.removeChildren(null,silent);}this.addChildren(v,0,silent);}return false;},destroyChildren:function dstCh(meDestroying){var ch=this.children,len=(ch&&ch.length)||0,i;if(len){for(i=len-1;i>-1;i--){var c=ch[i];if(c&&c.destroy){c.destroy(meDestroying);if(!meDestroying){_postRmv(this,c);}}}if(!meDestroying){ch.length=0;}}},invalidateChildren:function invalidateChildren(){mstrmojo.array.forEach(this.children,function(child){child.invalidate();});},invalidate:function invalidate(){this.invalidateChildren();},addChildren:function addCh(c,idx,silent){if(!c){return c;}var isArr=c.constructor===Array,arr=makeCh(this,isArr?c:[c]);if(arr&&arr.length){var ch=this.children||[];if(idx==null){idx=ch.length;}this.children=_A.insert(ch,idx,arr);if(!silent&&(this.onaddChild||_P.hasSubs(this.id,"addChild"))){this.raiseEvent({name:"addChild",value:arr,index:idx});}}return isArr?arr:(arr&&arr[0]);},removeChildren:function rmCh(c,silent){var ch=this.children,c2r=c?[c]:(this.children||[]).concat(),len=c2r.length,idx=-1,i;if(len){for(i=len-1;i>-1;i--){_postRmv(this,c2r[i]);}if(c){idx=_A.removeItem(ch,c);}else{if(ch){ch.length=0;idx=0;}}if(!silent&&(this.onremoveChild||_P.hasSubs(this.id,"removeChild"))){this.raiseEvent({name:"removeChild",value:c2r,index:idx});}}return idx;}});}());