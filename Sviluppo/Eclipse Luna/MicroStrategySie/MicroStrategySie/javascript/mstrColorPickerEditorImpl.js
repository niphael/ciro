mstrColorPickerEditorImplScript=true;mstrColorPickerEditorImpl.prototype=new mstrEditorImpl();mstrColorPickerEditorImpl.prototype.previewBox=null;mstrColorPickerEditorImpl.prototype.compBoxes=null;mstrColorPickerEditorImpl.prototype.boneId="";mstrColorPickerEditorImpl.prototype.controlId="";mstrColorPickerEditorImpl.prototype.origColor="";mstrColorPickerEditorImpl.prototype.onload=function(){try{this.initEditor();this.previewBox=microstrategy.subObjectFind(this.body,"div",microstrategy.SUBOBJTYPE_PREVIEW_PANE);this.sliderBar=document.getElementById("pkrSmoothSlider");this.body.onmousedown=new Function("e","return microstrategy.bone('"+this.id+"').onmousedown(e);");this.compBoxes=new Object();var inputs=this.body.getElementsByTagName("input");for(var i=0;i<inputs.length;i++){if(inputs[i].getAttribute("type")=="text"){inputs[i].onblur=new Function("e","return microstrategy.bone('"+this.id+"').onrgbchange(this);");this.compBoxes[inputs[i].getAttribute("id")]=inputs[i];}}}catch(err){microstrategy.errors.log(err);return false;}};mstrColorPickerEditorImpl.prototype.onmousedown=function(e){try{var src=getEventTarget(e);var obj=findTarget(src,"id");var id=obj.getAttribute("id");if(id.substr(0,3).toLowerCase()=="pkr"&&src.style.backgroundColor!=null&&src.style.backgroundColor.length>0){var color=src.style.backgroundColor;this.previewBox.style.backgroundColor=color;var hex=mstr.utils.Color.rgbStr2hex(color);var rgb=mstr.utils.Color.hex2rgb(hex);var hsv=mstr.utils.Color.rgb2hsv(rgb[0],rgb[1],rgb[2]);this.setCompBoxes(rgb,hsv);if(id!="pkrSmoothSlider"){this.rebuildSlider(hsv);}}}catch(err){microstrategy.errors.log(err);return false;}};mstrColorPickerEditorImpl.prototype.onrgbchange=function(box){try{isRGB=("rgb".indexOf(box.getAttribute("id"))!=-1);var z=parseInt(box.value);var max=parseInt(box.getAttribute("m"));if(isNaN(z)){box.value=box.getAttribute("ov");}else{if(z<0){box.value=0;}else{if(z>max){box.value=max;}}}var rgb=hsv=null;if(isRGB){rgb=new Array(parseInt(this.compBoxes.r.value),parseInt(this.compBoxes.g.value),parseInt(this.compBoxes.b.value));hsv=mstr.utils.Color.rgb2hsv(rgb[0],rgb[1],rgb[2]);}else{hsv=new Array(parseInt(this.compBoxes.h.value),parseInt(this.compBoxes.s.value),parseInt(this.compBoxes.v.value));rgb=mstr.utils.Color.hsv2rgb(hsv[0],hsv[1],hsv[2]);}this.setCompBoxes(rgb,hsv);if(rgb!=null&&hsv!=null){this.rebuildSlider(hsv);this.previewBox.style.backgroundColor="#"+mstr.utils.Color.rgb2hex(rgb[0],rgb[1],rgb[2]);}}catch(err){microstrategy.errors.log(err);return false;}};mstrColorPickerEditorImpl.prototype.applyChanges=function(){try{var um=microstrategy.updateManager;var color=this.previewBox.style.backgroundColor;color=mstr.utils.Color.rgbStr2hex(color);if(um!=null){um.add([um.createActionObject(this,mstrUpdateManager.SET_COLOR_PICKER_COLOR,this.beanPath,["74001"],[color],[],null)],true);var colors=microstrategy.adjustUserPalette(color);if(colors){um.add([um.createActionObject(this,mstrUpdateManager.SET_PREFERENCE,this.beanPath,["5003","5004"],["userPalette",colors],[],null)],true);this.adjustUserPalette();}}if(this.origColor!=color){this.origColor=color;var bone=microstrategy.bone(this.boneId);if(bone){bone.exec("advColorPicker",this.controlId+"|"+color);}}}catch(err){microstrategy.errors.log(err);return false;}};mstrColorPickerEditorImpl.prototype.adjustUserPalette=function(){try{var userPalette=microstrategy.findChildWithAtt(this.elem,"div","name","userColorPicker");if(!userPalette){var auxTag=document.createElement("span");auxTag.appendChild(document.createTextNode(microstrategy.descriptors.getDescriptor("4752")));auxTag.appendChild(document.createElement("br"));userPalette=document.createElement("div");auxTag.appendChild(userPalette);userPalette.setAttribute("sty","pkr");userPalette.setAttribute("ty","pkr");userPalette.className="mstrUserColorPicker";userPalette.id="userColorPicker";userPalette.setAttribute("name","userColorPicker");var basicColors=microstrategy.findChildWithAtt(this.elem,"div","name","advancedColorPicker");if(basicColors){basicColors.insertAdjacentElement("afterEnd",auxTag);}else{return ;}}while(userPalette.hasChildNodes()){userPalette.removeChild(userPalette.firstChild);}var userColors=microstrategy.userPalette;userColors=userColors.split(",");for(var i=(userColors.length-1);i>=0;i--){var newColor=document.createElement("span");newColor.id="pkr"+userColors[i];newColor.setAttribute("name","pkr"+userColors[i]);newColor.setAttribute("title",userColors[i]);newColor.style.backgroundColor=userColors[i];userPalette.insertAdjacentElement("afterBegin",newColor);}}catch(err){microstrategy.errors.log(err);return false;}};mstrColorPickerEditorImpl.prototype.okChanges=function(){try{this.close();this.applyChanges();microstrategy.unRegisterBone(this.id);microstrategy.updateManager.addURL('selectedTabOptions=""');}catch(err){microstrategy.errors.log(err);return false;}};mstrColorPickerEditorImpl.prototype.cancelChanges=function(){try{microstrategy.updateManager.addURL('selectedTabOptions=""');this.closeEditor();}catch(err){microstrategy.errors.log(err);return false;}};mstrColorPickerEditorImpl.prototype.setCompBoxes=function(rgb,hsv){try{if(rgb!=null){var rBoxes=new Array("r","g","b");for(var i=0;i<rBoxes.length;i++){this.compBoxes[rBoxes[i]].setAttribute("ov",rgb[i]);if(this.compBoxes[rBoxes[i]].value!=rgb[i]){this.compBoxes[rBoxes[i]].value=rgb[i];}}}if(hsv!=null){var hBoxes=new Array("h","s","v");for(var i=0;i<hBoxes.length;i++){this.compBoxes[hBoxes[i]].setAttribute("ov",hsv[i]);if(this.compBoxes[hBoxes[i]].value!=hsv[i]){this.compBoxes[hBoxes[i]].value=hsv[i];}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrColorPickerEditorImpl.prototype.rebuildSlider=function(hsv){try{var sliderLength=parseInt(this.sliderBar.getAttribute("len"));var saturation=0;var incSat=0;var brightStart=sliderLength/2;if(hsv[1]>sliderLength/2){incSat=Math.round(hsv[1]/(hsv[1]-sliderLength));for(var i=1;i<sliderLength/2;i++){this.sliderBar.childNodes[i].style.backgroundColor="#"+mstr.utils.Color.hsv2hex(hsv[0],saturation,100);if(i%incSat==0){saturation+=2;}else{saturation++;}if(saturation>hsv[1]){saturation=hsv[1];}}}else{brightStart=hsv[1];saturation=hsv[1];for(var i=1;i<hsv[1]+1;i++){this.sliderBar.childNodes[i].style.backgroundColor="#"+mstr.utils.Color.hsv2hex(hsv[0],i,100);}}var brightness=100;if(hsv[1]<sliderLength-101){var incBright=Math.ceil(100/Math.abs(100-(sliderLength-brightStart)));for(var i=brightStart;i<this.sliderBar.childNodes.length;i++){this.sliderBar.childNodes[i].style.backgroundColor="#"+mstr.utils.Color.hsv2hex(hsv[0],saturation,brightness);if(i%incBright!=0){brightness--;if(brightness<0){brightness=0;}}}}else{var incBright=Math.floor(100/Math.abs(100-(sliderLength-brightStart)));for(var i=brightStart;i<this.sliderBar.childNodes.length;i++){this.sliderBar.childNodes[i].style.backgroundColor="#"+mstr.utils.Color.hsv2hex(hsv[0],saturation,brightness);if(i%incBright==0){brightness-=2;}else{brightness--;}if(brightness<0){brightness=0;}}}this.sliderBar.childNodes[this.sliderBar.childNodes.length-1].style.backgroundColor="#"+mstr.utils.Color.hsv2hex(hsv[0],saturation,0);}catch(err){microstrategy.errors.log(err);return false;}};mstrColorPickerEditorImpl.prototype.computeZIndex=function(){var zIndex=mstrEditorImpl.prototype.computeZIndex.call(this);if(microstrategy.bones.visualizationsEditor_VisualizationsEditorStyle||microstrategy.bones.visPropsEditor_VisualizationPropertiesEditorStyle){zIndex=1002;}return zIndex;};function mstrColorPickerEditorImpl(id){this.inherits=mstrEditorImpl;this.inherits(id);delete this.inherits;return this;}