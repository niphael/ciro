(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.func","mstrmojo.array","mstrmojo.Button","mstrmojo.HBox","mstrmojo.dom","mstrmojo.Box");var $FNC=mstrmojo.func.composite,$D=mstrmojo.dom;mstrmojo.Dialog=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.Dialog",title:"",buttons:null,alignment:"center",btnAlignment:"right",zIndex:10,modal:true,markupString:'<div id="{@id}" class="mstrmojo-Dialog {@cssClass}" tabindex="0" mstrAttach:click><div class="win mstrmojo-Editor" style="{@cssText}"><div class="mstrmojo-Editor-titlebar"><div class="mstrmojo-Editor-title">{@title}</div></div><div class="mstrmojo-Editor-content"></div><div class="mstrmojo-Editor-buttons"></div></div><div class="mstrmojo-Editor-curtain"></div><div class="mstrmojo-Editor-tip"></div></div>',markupSlots:{editorNode:function(){return this.domNode.firstChild;},curtainNode:function(){return this.domNode.childNodes[1];},titleNode:function(){return this.domNode.firstChild.firstChild;},containerNode:function(){return this.domNode.firstChild.childNodes[1];},buttonNode:function(){return this.domNode.firstChild.lastChild;},tipNode:function(){return this.domNode.lastChild;}},markupMethods:{onzIndexChange:function(){this.editorNode.style.zIndex=this.zIndex;this.curtainNode.style.zIndex=this.zIndex-1;},onwidthChange:function(){this.editorNode.style.width=this.width||"auto";},onvisibleChange:function(init){if(init){return ;}var v=this.visible,d=v?"block":"none";this.editorNode.style.display=d;if(this.modal){this.curtainNode.style.display=d;}},onleftChange:function(){this.editorNode.style.left=this.left||"";},ontopChange:function(){this.editorNode.style.top=this.top||"";},ontitleChange:function(){this.titleNode.firstChild.innerHTML=this.title||"";}},preBuildRendering:function preBuildRendering(){var b;var buttons=this.buttons;if(buttons&&!this.btnHbox){for(b in buttons){buttons[b].cssClass="mstrmojo-Editor-button";}this.addChildren([{scriptClass:"mstrmojo.HBox",cssText:"float:"+this.btnAlignment,slot:"buttonNode",alias:"btnHbox",children:buttons},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-clearMe",slot:"buttonNode"}]);}if(this.modal){this.cssClass+=" modal";}return this._super();},buildRendering:function buildRendering(){var ph=this.placeholder;if(this._super()){if(!this.parent&&!ph){document.body.appendChild(this.domNode);}return true;}return false;},getResizeHandler:function getResizeHandler(){var id=this.id;return function(){var dialog=mstrmojo.all[id];dialog.resizeDialog();dialog.positionDialog();};},postBuildRendering:function postBuildRendering(){this._super();if(this.modal&&this.visible){this.curtainNode.style.display="block";}if(!this._resizeHandler){var fn=this._resizeHandler=this.getResizeHandler();$D.attachEvent(window,"resize",fn);}this.resizeDialog();this.positionDialog();this.domNode.focus();return true;},resizeDialog:function resizeDialog(){if(this.modal){this.resizeCurtain();}},resizeCurtain:function resizeCurtain(){var w=this,curtainNode=w.curtainNode,body=document.body,docElement=document.documentElement,cs=curtainNode.style,curtainPosition=w.curtainPosition;cs.width=Math.max(body.clientWidth,docElement.scrollWidth)+"px";if(curtainPosition&&curtainPosition.h){cs.height=curtainPosition.h+"px";}else{cs.height=Math.max(body.clientHeight,docElement.scrollHeight)+"px";}if(curtainPosition&&curtainPosition.y){cs.top=curtainPosition.y+"px";}w.raiseEvent({name:"resizeCurtain"});},positionDialog:function positionDialog(){if(!this.left||!this.top){var editor=this.editorNode;$D.center(editor);if(this.alignment==="top"){editor.style.top="10px";}}},destroy:function(ignoreDom){var fn=this._resizeHandler;if(fn){$D.detachEvent(window,"resize",fn);}this._super(ignoreDom);}});if(window.mstrConfig&&!window.mstrConfig.simpleDialog){mstrmojo.confirm=function confirm(msg,buttons,title){var id="mojoConfirmx9",fnDestroy=function(){mstrmojo.all[id].destroy();};mstrmojo.array.forEach(buttons,function(btn){var fn=btn.onclick;btn.onclick=fn?$FNC([fnDestroy,fn]):fnDestroy;});mstrmojo.insert({scriptClass:"mstrmojo.Dialog",id:id,title:title||mstrmojo.desc(3610),width:"475px",buttons:buttons,children:[{scriptClass:"mstrmojo.Label",text:msg}]}).render();};mstrmojo.alert=function alrt(msg,fn,title){var id="mojoAlertx9";try{mstrmojo.all[id].destroy();}catch(e){}mstrmojo.insert({scriptClass:"mstrmojo.Dialog",id:id,title:title||mstrmojo.desc(3610),width:"475px",buttons:[mstrmojo.Button.newInteractiveButton(mstrmojo.desc(1442),function(){mstrmojo.all.mojoAlertx9.destroy();if(fn){fn();}},"#666666")],children:[{scriptClass:"mstrmojo.Label",text:msg}]}).render();};mstrmojo.toast=function toast(msg,duration){var id="mojoToast9",dom,time=duration||3000;try{mstrmojo.all[id].destroy();}catch(e){}mstrmojo.insert({id:id,scriptClass:"mstrmojo.Label",cssClass:"toastCss",text:msg}).render();dom=mstrmojo.all[id].domNode;document.body.appendChild(dom);$D.bottomCenter(dom);window.setTimeout(function(){mstrmojo.all[id].destroy();},time);};mstrmojo.mask={};mstrmojo.mask.show=function(){mstrmojo.mask.win=mstrmojo.insert({scriptClass:"mstrmojo.Box",cssClass:"fullscreen-mask"});mstrmojo.mask.win.render();document.body.appendChild(mstrmojo.mask.win.domNode);};mstrmojo.mask.hide=function(){mstrmojo.mask.win.destroy();};}}());