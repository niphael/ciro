(function(){mstrmojo.requiresCls("mstrmojo.dom");var _D=mstrmojo.dom,_DND,_doc=mstrmojo.global.document;function _onMouseDown(e){_DND.startDragCheck(self,e);}var _av,_avin,_avCSS="mstrmojo-dnd-avatar",_avs;function _updateAvatar(pos,allowDrop,html){if(html!=null){_avin.innerHTML=html;}_avs.left=pos.x+"px";_avs.top=pos.y+"px";}function _showAvatar(html,pos){if(!_av){_av=_doc.createElement("div");_avs=_av.style;_av.className=_avCSS;_av.innerHTML='<div class="'+_avCSS+'-inner"></div>';_avin=_av.firstChild;_doc.body.appendChild(_av);}_updateAvatar(pos,true,html);_avs.display="block";}function _hideAvatar(){if(_av){_avs.display="none";}}function _onMoveDuringCheck(e){var c=++_DND.ctxt.moveCount;if(c>=_DND.minMoves){_DND.stopDragCheck(self,e);_DND.startDrag(self,e);}}function _onUpDuringCheck(e){_DND.stopDragCheck(self,e);}function _onMoveDuringDrag(e){_DND.onDragMove(self,e);}function _onUpDuringDrag(e){_DND.stopDrag(self,e);}function _capEvtInf(h){if(!h){return ;}if(!h.hWin){h.hWin=window;}if(!h.e){h.e=h.hWin.event;}h.node=_D.eventTarget(h.hWin,h.e);h.pos=_D.getMousePosition(h.e,h.hWin);return h;}function _findDraggable(nd){var w=_D.findWidget(nd);while(w){if(w.draggable){return w;}w=w.parent;}return null;}function _findDroppable(nd,c){var w=_D.findWidget(nd);while(w){if(w.dropZone){if(w.allowDrop&&w.allowDrop(c)){return w;}}w=w.parent;}return null;}function _ondragenterDefault(c){if(this.set){this.set("allowingDrop",true);}}function _ondragleaveDefault(c){if(this.set){this.set("allowingDrop",false);}}var _ondropDefault=_ondragleaveDefault;mstrmojo.dnd=mstrmojo.provide("mstrmojo.dnd",{minMoves:3,enable:function(){if(!mstrmojo.dndEnabled){_D.attachEvent(_doc,"mousedown",_onMouseDown);mstrmojo.dndEnabled=true;}},disable:function(){_D.detachEvent(_doc,"mousedown",_onMouseDown);},startDragCheck:function(hWin,e){delete this.ctxt;var src=_capEvtInf({hWin:hWin,e:e});this.ctxt={src:src,moveCount:0};if(this.minMoves){_D.attachEvent(_doc,"mousemove",_onMoveDuringCheck);_D.attachEvent(_doc,"mouseup",_onUpDuringCheck);}else{this.startDrag(hWin,e);}},stopDragCheck:function(hWin,e){_D.detachEvent(_doc,"mousemove",_onMoveDuringCheck);_D.detachEvent(_doc,"mouseup",_onUpDuringCheck);},startDrag:function(hWin,e){var c=this.ctxt;c.id=new Date();var src=c.src,w=_findDraggable(src.node);if(!w){return ;}src.widget=w;src.data=w.getDragData&&w.getDragData(c);if(w.ondragstart){if(w.ondragstart(c)===false){return ;}}_D.clearBrowserHighlights();_D.preventDefault(self,e);_D.attachEvent(_doc,"mousemove",_onMoveDuringDrag);_D.attachEvent(_doc,"mouseup",_onUpDuringDrag);if(w&&!w.ownAvatar){_showAvatar(src.data&&src.data.html,src.pos);}},stopDrag:function(hWin,e){_D.detachEvent(_doc,"mousemove",_onMoveDuringDrag);_D.detachEvent(_doc,"mouseup",_onUpDuringDrag);var c=this.ctxt,ct=_capEvtInf({hWin:hWin,e:e}),w=_findDroppable(ct.node,c);ct.widget=w;c.tgt=ct;if(w){if(w.ondrop){w.ondrop(c);}else{_ondropDefault.apply(w,[c]);}}var s=c.src.widget;if(s&&s.ondragend){s.ondragend(c);}if(s&&!s.ownAvatar){_hideAvatar();}},onDragMove:function(hWin,e){if(_D.isSafari){_D.clearBrowserHighlights();}var c=this.ctxt,ct=_capEvtInf({hWin:hWin,e:e}),w=_findDroppable(ct.node,c);ct.widget=w;var tWas=c&&c.tgt&&c.tgt.widget;c.tgt=ct;if(tWas!==w){if(tWas){if(tWas.ondragleave){tWas.ondragleave(c);}else{_ondragleaveDefault.apply(tWas,[c]);}}if(w){if(w.ondragenter){w.ondragenter(c);}else{_ondragenterDefault.apply(w,[c]);}}}else{if(w){if(w.ondragover){w.ondragover(c);}}}var s=c.src.widget;if(s&&s.ondragmove){s.ondragmove(c);}if(s&&!s.ownAvatar){_updateAvatar(ct.pos,!!w);}}});_DND=mstrmojo.dnd;_DND.enable();})();