mstrRWColorGradientEditorImplScript=true;mstrRWColorGradientEditorImpl.prototype=new mstrColorGradientEditorImpl();mstrRWColorGradientEditorImpl.prototype.startFromSolid=false;mstrRWColorGradientEditorImpl.prototype.retrieveGradient=false;mstrRWColorGradientEditorImpl.prototype.allPanels=false;mstrRWColorGradientEditorImpl.prototype.formatType=microstrategy.FORMAT_TYPE_MAIN;mstrRWColorGradientEditorImpl.prototype.initEditor=function(){try{mstrEditorImpl.prototype.initEditor.call(this);if(!this.commandObj){if(microstrategy.bones.rwb_viewer){this.commandObj=microstrategy.bones.rwb_viewer.commands;}}microstrategy.formatType=this.formatType;if(this.retrieveGradient&&this.commandObj){var gradientSettings=(this.commandObj.queryState("gradientcolor",this.allPanels))?this.commandObj.queryState("gradientcolor",this.allPanels).split(","):null;if(gradientSettings){this.color1=this.selcolor1=gradientSettings[gradientUtil.GRADIENT_START_COLOR_INDEX];this.color2=this.selcolor2=gradientSettings[gradientUtil.GRADIENT_END_COLOR_INDEX];this.angle=gradientSettings[gradientUtil.GRADIENT_ANGLE_INDEX];this.xOffset=gradientSettings[gradientUtil.GRADIENT_XOFFSET_INDEX];this.yOffset=gradientSettings[gradientUtil.GRADIENT_YOFFSET_INDEX];this.shadingStyle=this.selShadingStyle=(this.angle==0)?gradientUtil.GRADIENTSHADING_STYLE_HORIZONTAL:gradientUtil.GRADIENTSHADING_STYLE_VERTICAL;this.selPreview=((this.angle==0&&this.xOffset==0)||(this.angle==90&&this.yOffset==0))?1:(this.xOffset==50||this.yOffset==50)?3:2;this.startFromSolid=false;}else{var bgColor=this.commandObj.queryState("bgcolor",this.allPanels);this.selcolor1=(bgColor==null||bgColor=="transparent")?"ffffff":bgColor;}}microstrategy.formatType=microstrategy.FORMAT_TYPE_MAIN;}catch(err){microstrategy.errors.log(err);return false;}};mstrRWColorGradientEditorImpl.prototype.onload=function(){try{mstrColorGradientEditorImpl.prototype.onload.call(this);}catch(err){microstrategy.errors.log(err);return false;}};mstrRWColorGradientEditorImpl.prototype.shouldSubmitChanges=function(currentProperty,propertyValue){try{return(currentProperty!=propertyValue||this.startFromSolid);}catch(err){microstrategy.errors.log(err);}};mstrRWColorGradientEditorImpl.prototype.showShadingStyle=function(option){try{if(this.currentShadingOption){this.currentShadingOption.checked=false;}this.currentShadingOption=option;this.currentShadingOption.checked=true;var variantsDiv=getElementById("VariantsSection");switch(parseInt(option.value)){case gradientUtil.GRADIENTSHADING_STYLE_HORIZONTAL:case gradientUtil.GRADIENTSHADING_STYLE_VERTICAL:variantsDiv.className="show";this.renderPreviews();break;}}catch(err){microstrategy.errors.log(err);return false;}};mstrRWColorGradientEditorImpl.prototype.initTooltips=function(){try{this.presetTooltips=new Object();this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_HORIZONTAL]=new Array(this.buildTooltip(this.TRANSITIONTYPE_LINEAR,0,0,0),this.buildTooltip(this.TRANSITIONTYPE_LINEAR,0,100,0),this.buildTooltip(this.TRANSITIONTYPE_LINEAR,0,50,0));this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_VERTICAL]=new Array(this.buildTooltip(this.TRANSITIONTYPE_LINEAR,90,0,0),this.buildTooltip(this.TRANSITIONTYPE_LINEAR,90,0,100),this.buildTooltip(this.TRANSITIONTYPE_LINEAR,90,0,50));}catch(err){microstrategy.errors.log(err);return false;}};mstrRWColorGradientEditorImpl.prototype.renderPreviews=function(){try{this.applyGradient(1);this.applyGradient(2);this.applyGradient(3);var previewBox1=getElementById("previewBox1");var previewBox2=getElementById("previewBox2");var previewBox3=getElementById("previewBox3");var previewBox4=getElementById("previewBox4");switch(parseInt(this.currentShadingOption.value)){case gradientUtil.GRADIENTSHADING_STYLE_HORIZONTAL:previewBox1.setAttribute("title",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_HORIZONTAL][0][this.PRESET_TOOLTIP_TEXT_INDEX]);previewBox1.setAttribute("code",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_HORIZONTAL][0][this.PRESET_TOOLTIP_CODE_INDEX]);previewBox2.setAttribute("title",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_HORIZONTAL][1][this.PRESET_TOOLTIP_TEXT_INDEX]);previewBox2.setAttribute("code",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_HORIZONTAL][1][this.PRESET_TOOLTIP_CODE_INDEX]);previewBox4.className="hide";if(microstrategy.EXECUTION_SCOPE==microstrategy.REPORT_EXECUTION){previewBox3.className="hide";}else{previewBox3.setAttribute("title",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_HORIZONTAL][2][this.PRESET_TOOLTIP_TEXT_INDEX]);previewBox3.setAttribute("code",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_HORIZONTAL][2][this.PRESET_TOOLTIP_CODE_INDEX]);}break;case gradientUtil.GRADIENTSHADING_STYLE_VERTICAL:previewBox1.setAttribute("title",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_VERTICAL][0][this.PRESET_TOOLTIP_TEXT_INDEX]);previewBox1.setAttribute("code",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_VERTICAL][0][this.PRESET_TOOLTIP_CODE_INDEX]);previewBox2.setAttribute("title",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_VERTICAL][1][this.PRESET_TOOLTIP_TEXT_INDEX]);previewBox2.setAttribute("code",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_VERTICAL][1][this.PRESET_TOOLTIP_CODE_INDEX]);previewBox4.className="hide";if(microstrategy.EXECUTION_SCOPE==microstrategy.REPORT_EXECUTION){previewBox3.className="hide";}else{previewBox3.setAttribute("title",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_VERTICAL][2][this.PRESET_TOOLTIP_TEXT_INDEX]);previewBox3.setAttribute("code",this.presetTooltips[gradientUtil.GRADIENTSHADING_STYLE_VERTICAL][2][this.PRESET_TOOLTIP_CODE_INDEX]);}break;}if(previewBox3.className!="hide"||previewBox4.className!="hide"){var flashWarning=getElementById("previewSeparator");flashWarning.style.display="inline";flashWarning.innerHTML=microstrategy.descriptors.getDescriptor("4965");}}catch(err){microstrategy.errors.log(err);return false;}};function mstrRWColorGradientEditorImpl(id){this.inherits=mstrColorGradientEditorImpl;this.inherits(id);delete this.inherits;return this;}