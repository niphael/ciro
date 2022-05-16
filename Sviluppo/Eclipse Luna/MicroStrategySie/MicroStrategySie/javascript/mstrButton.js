mstrButtonScript=true;mstrButton.prototype=new mstrBoneImpl();(function(){mstrButton.BUTTON_DEFAULT_SIZES=[,{w:96,h:50},{w:96,h:50},{w:120,h:50},{w:120,h:50},{w:96,h:70},{w:60,h:60}];var DEFAULT_FORMAT_BORDER_COLOR="#CCCCCC",DEFAULT_FORMAT_BACKGROUND_COLOR="#E3E3E3",DEFAULT_FORMAT_BACKGROUND_HIGHLIGHT_COLOR="#DEDEDE",ICON_PLACEHOLDER_URL="about:blank";var captionHighlightedButton=null;mstrButton.prototype.sibs=null;mstrButton.prototype.docViewer=null;mstrButton.prototype.onload=function(){mstrBoneImpl.prototype.onload.call(this);var id=this.id;this.docViewer=microstrategy.getViewerBone();this.sibs=document.getElementsByName(id);mstr.controllers.EventManager.attachEventListener(this,this,"Add","onAdd");this.forEachSib(function(el){el.onmousedown=function(e){return microstrategy.bone(id).onmousedown(e);};el.ondblclick=function(e){return microstrategy.bone(id).ondblclick(e);};appendIconCanvasMask(el);});};mstrButton.prototype.onAdd=function(e){var ac=e.ac,update=e.update,item=e.item,so=microstrategy.styleObj,fo=microstrategy.formatObj,doc=this.docViewer.doc;this.updateIcons();doc.formatAttribute([item],"DisplayStyle",so.getAttValue(item,microstrategy.HTMLATTR_DISPLAY_STYLE),update,microstrategy.HTMLATTR_DISPLAY_STYLE,ac);doc.formatSizeMode([item],"heightMode",microstrategy.FIX_MODE,ac,update);if(so.getAttValue(item,microstrategy.HTMLATTR_DISPLAY_STYLE)!=microstrategy.BUTTON_STYLE_CUSTOM){doc.formatItemBorders([item],["borderLeft","borderRight","borderTop","borderBottom"],"solid","1pt",DEFAULT_FORMAT_BORDER_COLOR,update,ac);doc.formatItems([item],"backgroundColor",DEFAULT_FORMAT_BACKGROUND_COLOR,update,ac);doc.formatAttribute([item],"BackgroundHighlightColor",fo.encodeValue("color",DEFAULT_FORMAT_BACKGROUND_HIGHLIGHT_COLOR),update,microstrategy.HTMLATTR_BACKGROUND_HIGHLIGHT_COLOR,ac);}doc.formatItems([item],"whiteSpace","nowrap",update,ac);};mstrButton.initHTML=function(el){addCssClass(el,"mstrDocButton");el.innerHTML='<div class="buttonCanvas"><div class="iconCanvas"><div class="iconWrapper"><img /><img class="highlightStateIcon" /></div></div><div class="textCanvas"><div class="textWrapper"><span>'+el.innerHTML+'</span></div></div></div><div class="buttonEffectOverlay"></div>';};function appendIconCanvasMask(el){var ic=getButtonIconCanvasNode(el),mask=document.createElement("div");mask.className="iconCanvasMask";ic.appendChild(mask);}mstrButton.prototype.initNewUnit=function(unit){try{bone=microstrategy.registerBone(unit.id,"mstrButtonScript",null);bone.onload();}catch(err){microstrategy.errors.log(err);return false;}};mstrButton.prototype.synchronizeSize=function(){this.forEachSib(function(obj){var fo=microstrategy.getFormatObject();var so=microstrategy.styleObj;var dispStyle=Number(so.getAttValue(obj,microstrategy.HTMLATTR_DISPLAY_STYLE));var iconCanvas=getButtonIconCanvasNode(obj);var captionCanvas=getButtonCaptionCanvasNode(obj);removeCssClass(obj,"mstrDocButton-\\S+");addCssClass(obj,"mstrDocButton-"+microstrategy.BUTTON_STYLE_CSS_SUFFIXES[dispStyle]);switch(dispStyle){case microstrategy.BUTTON_STYLE_CUSTOM:case microstrategy.BUTTON_STYLE_ICON_ONLY:iconCanvas.style.fontSize="0";iconCanvas.style.left="0";iconCanvas.style.top="0";return ;}var w=Math.round(parseFloat(so.getValue(obj,"width"),10));var h=Math.round(parseFloat(so.getValue(obj,"height"),10));var alignment=this.docViewer.btncfg[dispStyle];var minsp=alignment.minsp;var mincs=alignment.mincs;var icsize;captionCanvas.style.top="";captionCanvas.style.left="";captionCanvas.style.right="";switch(dispStyle){case microstrategy.BUTTON_STYLE_CAPTION_ONLY:icsize=0;break;case microstrategy.BUTTON_STYLE_ICON_TOP:var oh=parseInt(fo.decodeValue("height",so.getAttValue(obj,microstrategy.HTMLATTR_HEIGHT)));icsize=Math.floor(Math.max(0,Math.min(0.6*oh,w,h-minsp-mincs)));captionCanvas.style.top=Math.min(h,icsize+minsp)+"px";break;case microstrategy.BUTTON_STYLE_ICON_LEFT:case microstrategy.BUTTON_STYLE_ICON_RIGHT:icsize=Math.max(0,Math.min(h,w-minsp-mincs));var ccOffsetX=Math.min(w,icsize+minsp);captionCanvas.style[dispStyle==microstrategy.BUTTON_STYLE_ICON_LEFT?"left":"right"]=ccOffsetX+"px";break;}iconCanvas.style.fontSize=icsize+"px";iconCanvas.style.left="";iconCanvas.style.top="";});};mstrButton.syncEditHighlight=function(e){var docViewer=microstrategy.getViewerBone();if(!docViewer.isEditableViewModeEplus()){return true;}var rawSrc=getEventTarget(e||window.event);var obj=microstrategy.findAncestor(rawSrc);if(docViewer.doc.isDocButton(obj)){if(isInsideCaptionCanvas(rawSrc,obj)){setHighlightedButton(obj,"caption");return ;}else{if(isInsideIconCanvas(rawSrc,obj)){setHighlightedButton(obj,"icon");return ;}}}setHighlightedButton(null);};mstrButton.prototype.updateFillEffect=function(){this.forEachSib(function(obj){var effect=microstrategy.styleObj.getAttValue(obj,microstrategy.HTMLATTR_FILL_EFFECT);var dispStyle=microstrategy.styleObj.getAttValue(obj,microstrategy.HTMLATTR_DISPLAY_STYLE);if(effect==microstrategy.HTMLATTR_EFFECT_GLOSSY&&dispStyle!=microstrategy.BUTTON_STYLE_CUSTOM){addCssClass(obj,"gloss");}else{removeCssClass(obj,"gloss");}});};mstrButton.prototype.updateDisplayStyle=function(ac,update){var doc=this.docViewer.doc,fo=microstrategy.formatObj,elem=this.elem,value=microstrategy.styleObj.getAttValue(elem,microstrategy.HTMLATTR_DISPLAY_STYLE);if(value==microstrategy.BUTTON_STYLE_CUSTOM){doc.formatItemBorders([elem],["borderLeft","borderRight","borderTop","borderBottom"],"none","0pt","#000000",update,ac);doc.formatItems([elem],"backgroundColor","transparent",update,ac);doc.formatItems([elem],"backgroundStyle","transparent",update,ac);doc.formatAttribute([elem],"BackgroundHighlightColor",-1,update,microstrategy.HTMLATTR_BACKGROUND_HIGHLIGHT_COLOR,ac);}var alignment=this.docViewer.btncfg[value],paddingMap={Left:"pl",Right:"pr",Top:"pt",Bottom:"pb"};function fnFP(name,shortName){doc.formatPadding([elem],"padding"+name,alignment[shortName]*0.75+"pt",update,ac);}for(var paddingName in paddingMap){fnFP(paddingName,paddingMap[paddingName]);}this.synchronizeSize();this.updateFillEffect();};mstrButton.prototype.updateIcons=function(){this.forEachSib(function(obj){var icons=obj.getElementsByTagName("img");icons[0].src=microstrategy.styleObj.getAttValue(obj,microstrategy.HTMLATTR_NORMAL_URL)||ICON_PLACEHOLDER_URL;icons[1].src=microstrategy.styleObj.getAttValue(obj,microstrategy.HTMLATTR_HIGHLIGHT_URL)||icons[0].src;});};mstrButton.updateButtonCaption=function(obj,displayValue){getButtonTextNode(obj).innerHTML=displayValue;};mstrButton.prototype.onmousedown=function(e){var src=microstrategy.eventManager.getSource(e);if(src&&src.button==1&&microstrategy.DISPLAY_MODE!=microstrategy.DESIGN_MODE){this.onButtonPressed(src.elem);}var rawSrc=getEventTarget(e),te=this.docViewer.doc.textEditor;if(this.docViewer.isEditableViewModeEplus()&&te.source==src.elem&&te.onblur){te.onblur();}};mstrButton.prototype.onButtonPressed=function(btn){var so=microstrategy.styleObj,fo=microstrategy.getFormatObject();this.pressedSibs=this.pressedSibs||[];this.pressedSibs.push(btn);this.normalFontColor=so.getValue(btn,"color");this.normalBackgroundColor=so.getValue(btn,"backgroundColor");addCssClass(btn,"mstrDocButton-highlight");so.setValue(btn,"backgroundColor",fo.decodeValue("backgroundColor",so.getAttValue(btn,microstrategy.HTMLATTR_BACKGROUND_HIGHLIGHT_COLOR)));so.setValue(btn,"color",fo.decodeValue("color",so.getAttValue(btn,microstrategy.HTMLATTR_FONT_HIGHLIGHT_COLOR)));this.attachWinListener(this,"mouseup","onButtonReleased",true);};mstrButton.prototype.onButtonReleased=function(e){var so=microstrategy.styleObj,fo=microstrategy.getFormatObject();for(var i=0;i<this.pressedSibs.length;i++){var btn=this.pressedSibs[i];removeCssClass(btn,"mstrDocButton-highlight");so.setValue(btn,"backgroundColor",this.normalBackgroundColor);so.setValue(btn,"color",this.normalFontColor);}delete this.pressedSibs;this.detachWinListener(this,"mouseup");};mstrButton.prototype.ondblclick=function(e){try{e=e||window.event;if(!this.docViewer.isEditableViewModeEplus()){return true;}var src=microstrategy.findAncestor(getEventTarget(e));this.editContentsOnMouseEvent(e,src);return true;}catch(err){microstrategy.errors.log(err);return false;}finally{stopEventBubbling(e);}};mstrButton.prototype.editContents=function(e,src){if(!this.docViewer.isInteractiveViewModeEplus(e)){return true;}e=e||window.event;if(e){this.editContentsOnMouseEvent(e,src);}else{this.docViewer.doc.editText(null,src);}};mstrButton.prototype.editContentsOnMouseEvent=function(e,src){var rawSrc=getEventTarget(e);if(isInsideIconCanvas(rawSrc,src)){this.docViewer.commands.exec("edtPropsTabSelected",microstrategy.PROPERTIES_EDITOR_BUTTON_TAB);return ;}if(isInsideCaptionCanvas(rawSrc,src)){this.docViewer.doc.editText(e,src);return ;}};mstrButton.prototype.onEditText=function(te,src){setHighlightedButton(src,"caption");var dispStyle=microstrategy.styleObj.getAttValue(src,microstrategy.HTMLATTR_DISPLAY_STYLE);var captionCanvas=getButtonCaptionCanvasNode(src);te.style.padding="0";te.style.width=getObjInnerWidth(captionCanvas)+"px";te.style.height=getObjInnerHeight(captionCanvas)+"px";te.style.backgroundColor="transparent";getButtonCaptionCanvasNode(src).style.visibility="hidden";te.style.left=getObjSumLeft(captionCanvas)-this.docViewer.doc.left+1+"px";te.style.top=getObjSumTop(captionCanvas)-this.docViewer.doc.top+1+"px";te.style.textAlign=(dispStyle==microstrategy.BUTTON_STYLE_ICON_LEFT||dispStyle==microstrategy.BUTTON_STYLE_ICON_RIGHT)?"left":"center";te.style.textDecoration="none";setTextAreaAutoValign(te,dispStyle==microstrategy.BUTTON_STYLE_ICON_TOP?"bottom":"middle");};mstrButton.prototype.postEditText=function(te,src){clearTextAreaAutoValign(te);getButtonCaptionCanvasNode(src).style.visibility="";};mstrButton.prototype.forEachSib=function(fn){for(var iObj=0;iObj<this.sibs.length;iObj++){fn.call(this,this.sibs[iObj]);}};function setHighlightedButton(el,iconOrCaption){if(el&&iconOrCaption!="icon"&&iconOrCaption!="caption"){return ;}if(captionHighlightedButton){removeCssClass(captionHighlightedButton,"captionHighlight");removeCssClass(captionHighlightedButton,"iconHighlight");}if(el){addCssClass(el,iconOrCaption+"Highlight");}captionHighlightedButton=el;}function isInsideCaptionCanvas(el,elButton){return mstr.$D.containsElement(getButtonCaptionCanvasNode(elButton),el,true);}function isInsideIconCanvas(el,elButton){return mstr.$D.findAncestor(el,"className","iconCanvasMask",elButton,true);}function getButtonCaptionCanvasNode(obj){return obj.getElementsByTagName("div")[0].children[1];}function getButtonTextNode(obj){return obj.getElementsByTagName("span")[0];}function getButtonIconCanvasNode(obj){return obj.getElementsByTagName("div")[0].children[0];}function setTextAreaAutoValign(el,valign){adjustTextArea(el,valign);el.onchange=el.oninput=el.propertychange=el.onmouseup=el.onkeyup=el.onkeypress=function(e){e=e||window.event;var src=e.target||e.srcElement;setTimeout(function(){adjustTextArea(src,valign);},0);};}function clearTextAreaAutoValign(el){el.onchange=el.oninput=el.propertychange=el.onmouseup=el.onkeyup=el.onkeypress=null;}function adjustTextArea(el,valign){var fnInt=function(v){return parseInt(v,10)||0;};var borderTop=fnInt(el.style.borderTopWidth),borderBottom=fnInt(el.style.borderBottomWidth),ph=el.offsetHeight-borderTop-borderBottom,padTop=fnInt(el.style.paddingTop),padBottom=fnInt(el.style.paddingBottom),ch=ph-padTop-padBottom;var csh;if(bIsIE7){csh=Math.max(0,el.scrollHeight-padTop-padBottom);}else{el.style.paddingTop="0";el.style.paddingBottom="0";csh=el.scrollHeight;el.style.height=(ch+1)+"px";if(el.scrollHeight>csh){el.style.height="0";csh=el.scrollHeight;}}var space=Math.max(0,ph-csh);switch(valign){case"middle":padTop=Math.floor(space/2);padBottom=Math.ceil(space/2);break;case"bottom":padTop=space;padBottom=0;break;default:padTop=0;padBottom=space;}el.style.paddingTop=padTop+"px";el.style.paddingBottom=padBottom+"px";el.style.height=(ph-padTop-padBottom)+"px";redrawAndFocusTextArea(el);}function redrawAndFocusTextArea(el){var isIE8Plus=document.documentMode>=8;if(isIE8Plus){el.style.paddingLeft="0";el.offsetWidth;el.style.paddingLeft="";}}})();function mstrButton(id){mstrBoneImpl.call(this,id);}