(function(){mstrmojo.requiresCls("mstrmojo.MenuButton");var $C=mstrmojo.css,$D=mstrmojo.dom;mstrmojo.WH.MenuButton=mstrmojo.declare(mstrmojo.MenuButton,[],{scriptClass:"mstrmojo.WH.MenuButton",cssClass:"mstrmojo-Editor-button function",cssText:"position:absolute;z-index:35; height:15px; width:12px; left:370px;visibility:hidden; border:0px solid; background-color:#FFFFFF",iconClass:"mstrmojo-ArchitectListIcon div",itemIdField:"did",itemField:"n",text:"",alias:"cxtmenu",data:null,itemChildrenField:"fns",searchItemAdded:true,dynamicUpdate:true,cachedrow:null,onContextMenuClose:function(){if(this.onexec){this._subMenu.set("visible",true);this.onexec=false;}},onRender:function(){var me=this,mouseover_handle=function(evt){if(me.cachedrow){$C.toggleClass(me.cachedrow.domNode,"architect-highlight",true);}},mouseout_handle=function(evt){if(me.cachedrow){$C.toggleClass(me.cachedrow.domNode,"architect-highlight",false);}};$D.attachEvent(this.domNode,"mousemove",mouseover_handle);$D.attachEvent(this.domNode,"mouseout",mouseout_handle);}});})();