mstrThresholdEditor.prototype=new mstrEditorImpl();mstrThresholdEditor.prototype.commands=null;mstrThresholdEditor.prototype.containers=null;mstrThresholdEditor.prototype.currentContainerKey=-1;mstrThresholdEditor.prototype.selectedType=-1;mstrThresholdEditor.prototype.isCondFormat=false;mstrThresholdEditor.prototype.propSeparator="";mstrThresholdEditor.prototype.valueSeparator="";mstrThresholdEditor.TEXT=3;mstrThresholdEditor.IMAGE=4;mstrThresholdEditor.QUICK_SYMBOL=10;mstrThresholdEditor.HIDE=-1;mstrThresholdEditor.FORMAT_PROP_CONVERSION={font:"ff",fsize:"fsz",color:"fc",DecimalPlaces:"ndp",NegativeNumbers:"nnn",CurrencySymbol:"ncs",CurrencyPosition:"ncp",Format:"nf",ThousandSeparator:"nts",Category:"nc",Horizontal:"aln",Vertical:"alv",bgcolor:"bc",gradientcolor:"gc",FillStyle:"pfs",GradientAngle:"pga",GradientXOffset:"pgxo",GradientYOffset:"pgyo",LeftStyle:"bls",LeftColor:"blc",TopStyle:"bts",TopColor:"btc",RightStyle:"brs",RightColor:"brc",BottomStyle:"bbs",BottomColor:"bbc",replaceOption:"type",replaceValue:"src",LineSettingColor:"lc",LineSettingStyle:"ls",LineSettingWeight:"lw",TextWrap:"atw",TextDirection:"atd",LeftPadding:"flp",RightPadding:"frp",TopPadding:"ftp",BottomPadding:"fbp",LineSpacing:"fls"};mstrThresholdEditor.PROPERTY_CONVERSION={ff:{ps:"FormattingFont",p:"Name"},fsz:{ps:"FormattingFont",p:"Size"},fw:{ps:"FormattingFont",p:"Bold"},fit:{ps:"FormattingFont",p:"Italic"},fun:{ps:"FormattingFont",p:"Underline"},fst:{ps:"FormattingFont",p:"Strikeout"},fc:{ps:"FormattingFont",p:"Color"},bc:{ps:"FormattingPatterns",p:"FillColor"},gc:{ps:"FormattingPatterns",p:"GradientColor"},pfs:{ps:"FormattingPatterns",p:"FillStyle"},pga:{ps:"FormattingPatterns",p:"GradientAngle"},pgxo:{ps:"FormattingPatterns",p:"GradientXOffset"},pgyo:{ps:"FormattingPatterns",p:"GradientYOffset"},aln:{ps:"FormattingAlignment",p:"Horizontal"},alv:{ps:"FormattingAlignment",p:"Vertical"},atw:{ps:"FormattingAlignment",p:"TextWrap"},atd:{ps:"FormattingAlignment",p:"TextDirection"},bts:{ps:"FormattingBorder",p:"TopStyle"},btc:{ps:"FormattingBorder",p:"TopColor"},brs:{ps:"FormattingBorder",p:"RightStyle"},brc:{ps:"FormattingBorder",p:"RightColor"},bbs:{ps:"FormattingBorder",p:"BottomStyle"},bbc:{ps:"FormattingBorder",p:"BottomColor"},bls:{ps:"FormattingBorder",p:"LeftStyle"},blc:{ps:"FormattingBorder",p:"LeftColor"},ndp:{ps:"FormattingNumber",p:"DecimalPlaces"},nnn:{ps:"FormattingNumber",p:"NegativeNumbers"},ncs:{ps:"FormattingNumber",p:"CurrencySymbol"},ncp:{ps:"FormattingNumber",p:"CurrencyPosition"},nf:{ps:"FormattingNumber",p:"Format"},nts:{ps:"FormattingNumber",p:"ThousandSeparator"},nc:{ps:"FormattingNumber",p:"Category"},lc:{ps:"FormattingLine",p:"LineColor"},ls:{ps:"FormattingLine",p:"LineStyle"},lw:{ps:"FormattingLine",p:"LineWeight"},ag:{ps:"FormattingPatterns",p:"ApplyToGraphThreshold"},flp:{ps:"FormattingPadding",p:"LeftPadding"},frp:{ps:"FormattingPadding",p:"RightPadding"},ftp:{ps:"FormattingPadding",p:"TopPadding"},fbp:{ps:"FormattingPadding",p:"BottomPadding"},fls:{ps:"FormattingPadding",p:"LineSpacing"}};mstrThresholdEditor.prototype.getSelectedThreshold=function(){microstrategy.errors.log("This method is abstract.  It must be implemented in the child class.");};mstrThresholdEditor.prototype.changeThresholdFormatProp=function(fName,fValue){microstrategy.errors.log("This method is abstract.  It must be implemented in the child class.");};mstrThresholdEditor.prototype.getThresholdFormatValue=function(format,propName){microstrategy.errors.log("This method is abstract.  It must be implemented in the child class.");};mstrThresholdEditor.prototype.changeThresholdName=function(tName){microstrategy.errors.log("This method is abstract.  It must be implemented in the child class.");};function mstrThresholdEditor(id){this.inherits=mstrEditorImpl;this.inherits(id);delete this.inherits;this.primaryBone=true;return this;}mstrTECommandsImpl.prototype=new Object();mstrTECommandsImpl.prototype.item=null;mstrTECommandsImpl.prototype.formatObject=null;mstrTECommandsImpl.prototype.notEnabled="|onegrid|";mstrTECommandsImpl.prototype.exec=function(cmdId,cmdValue){try{switch(cmdId){case"edtColorPicker":var params=cmdValue.split("|");microstrategy.openDialog("edtColorPicker",null,null,microstrategy.servletName+"."+microstrategy.pageName,{activeBoneID:params[0],activeControlID:params[1],currentColor:params[2]});microstrategy.updateManager.replaceURL("selectedTabOptions",params[3]);microstrategy.updateManager.flushAndSubmitChanges();break;case"edtColorGradient":var dialogName=(microstrategy.EXECUTION_SCOPE==microstrategy.REPORT_EXECUTION)?"gridEdtColorGradient":"rwdEdtColorGradient";var params=cmdValue.split("|");var url,selectedTabOptions;if(params.length>6){url="parentBoneID="+params[0]+"&controlID="+params[1]+"&activeViewKey="+params[2]+"startFromSolid="+false+"&retrieveGradient="+false+"&color1="+params[4]+"&color2="+params[5]+"&angle="+params[6]+"&xOffset="+params[7]+"&yOffset="+params[8]+"&formatType="+microstrategy.formatType;selectedTabOptions=params[9];}else{if(params.length==6){var startColor=(params[4]=="transparent")?"#FFFFFF":params[4];url="parentBoneID="+params[0]+"&controlID="+params[1]+"&activeViewKey="+params[2]+"&retrieveGradient="+false+"&color1="+startColor+"&startFromSolid="+true+"&formatType="+microstrategy.formatType;selectedTabOptions=params[5];}}microstrategy.openDialog(dialogName,url,null,microstrategy.servletName+"."+microstrategy.pageName);microstrategy.updateManager.replaceURL("selectedTabOptions",selectedTabOptions);microstrategy.updateManager.flushAndSubmitChanges();break;case"formatBulk":var skipNumberFormat=false;for(var i=0;i<cmdValue.length;i++){var values=cmdValue[i].split("|");if(this.notEnabled.indexOf("|"+values[0]+"|")>-1){continue;}switch(values[0]){case"Name":this.parentBone.changeThresholdFormatProp("ff",values[1]);break;case"fstyle":var fs=(values[1].indexOf(",")!=-1)?values[1].split(","):[values[1]];for(var j=0;j<fs.length;j++){var n=parseInt(fs[j]);if(n&1){this.parentBone.changeThresholdFormatProp("fw",(n>0)?-1:0);}else{if(n&2){this.parentBone.changeThresholdFormatProp("fit",(n>0)?-1:0);}else{if(n&4){this.parentBone.changeThresholdFormatProp("fun",(n>0)?-1:0);}else{if(n&8){this.parentBone.changeThresholdFormatProp("fst",(n>0)?-1:0);}}}}}break;case"Size":this.parentBone.changeThresholdFormatProp("fsz",parseInt(values[1]));break;case"Color":case"FillColor":if(!values[1]||values[1].length==0){this.parentBone.changeThresholdFormatProp("pfs",1);}else{if(values[1].indexOf(",")<0){this.parentBone.changeThresholdFormatProp((values[0]=="Color")?"fc":"bc",this.getFormatObject().encodeValue("color",values[1]));if(values[0]=="FillColor"){this.parentBone.changeThresholdFormatProp("pfs",0);}}else{var gradientValues=values[1].split(",");this.parentBone.changeThresholdFormatProp("bc",this.getFormatObject().encodeValue("backgroundColor",values[1]));this.parentBone.changeThresholdFormatProp("gc",this.getFormatObject().encodeValue("gradientColor",values[1]));this.parentBone.changeThresholdFormatProp("pga",gradientValues[gradientUtil.GRADIENT_ANGLE_INDEX]);this.parentBone.changeThresholdFormatProp("pgxo",gradientValues[gradientUtil.GRADIENT_XOFFSET_INDEX]);this.parentBone.changeThresholdFormatProp("pgyo",gradientValues[gradientUtil.GRADIENT_YOFFSET_INDEX]);this.parentBone.changeThresholdFormatProp("pfs",2);}}break;case"LineSettingColor":this.parentBone.changeThresholdFormatProp(mstrThresholdEditor.FORMAT_PROP_CONVERSION[values[0]],this.getFormatObject().encodeValue("color",values[1]));break;case"borderTop":case"borderRight":case"borderBottom":case"borderLeft":var bValues=values[1].split(",");var propName=values[0].substr(6);if(bValues[0].length==0){bValues[0]=this.queryState(propName+"Color");}if(bValues[1].length==0){var tempValue=mstrFormatObject.decodeValue("borderLeftStyle",this.queryState(propName+"Style")).split(" ");bValues[1]=tempValue[0];bValues[2]=tempValue[1];}this.parentBone.changeThresholdFormatProp(mstrThresholdEditor.FORMAT_PROP_CONVERSION[propName+"Color"],this.getFormatObject().encodeValue(values[0]+"Color",bValues[0]));this.parentBone.changeThresholdFormatProp(mstrThresholdEditor.FORMAT_PROP_CONVERSION[propName+"Style"],this.getFormatObject().encodeValue(values[0]+"Style",bValues[1]+" "+bValues[2]));break;case"LineSettingStyle":this.parentBone.changeThresholdFormatProp(mstrThresholdEditor.FORMAT_PROP_CONVERSION[values[0]],this.getFormatObject().encodeValue("lineStyle",values[1]));break;case"LineSettingWeight":this.parentBone.changeThresholdFormatProp(mstrThresholdEditor.FORMAT_PROP_CONVERSION[values[0]],parseInt(values[1]));break;case"replaceOption":case"replaceValue":case"Horizontal":case"Vertical":this.parentBone.changeThresholdFormatProp(mstrThresholdEditor.FORMAT_PROP_CONVERSION[values[0]],values[1]);break;case"Category":this.parentBone.changeThresholdFormatProp(mstrThresholdEditor.FORMAT_PROP_CONVERSION[values[0]],values[1]);if(values[1]=="-2"){skipNumberFormat=true;}else{skipNumberFormat=false;}break;case"DecimalPlaces":case"CurrencySymbol":case"ThousandSeparator":case"CurrencyPosition":case"NegativeNumbers":case"Format":if(!skipNumberFormat){this.parentBone.changeThresholdFormatProp(mstrThresholdEditor.FORMAT_PROP_CONVERSION[values[0]],values[1]);}break;case"tName":this.parentBone.changeThresholdName(values[1]);break;case"TextWrap":case"TextDirection":this.parentBone.changeThresholdFormatProp(mstrThresholdEditor.FORMAT_PROP_CONVERSION[values[0]],values[1]);break;case"LeftPadding":case"TopPadding":case"RightPadding":case"BottomPadding":this.parentBone.changeThresholdFormatProp(mstrThresholdEditor.FORMAT_PROP_CONVERSION[values[0]],parseInt(values[1]));break;default:microstrategy.errors.log(values[0]+" property not found.");break;}}return true;break;default:microstrategy.errors.log("Command Id: "+cmdId+" not implemented.");return false;}}catch(err){microstrategy.errors.log(err);}};mstrTECommandsImpl.prototype.queryEnabled=function(cmdId){try{if(!cmdId||cmdId=="isSelectionsPresent"){return true;}if(this.parentBone.isCondFormat){if(this.parentBone.selectedType==microstrategy.SUBOBJTYPE_DOC_SHAPE){return(cmdId=="bgcolor"||cmdId=="gradientcolor"||cmdId.indexOf("Line")>-1);}else{if(this.parentBone.selectedType==microstrategy.SUBOBJTYPE_DOC_LINE){return(cmdId.indexOf("Line")>-1);}else{if(this.parentBone.selectedType==microstrategy.SUBOBJTYPE_DOC_TEXT){return(cmdId=="bgcolor"||cmdId=="gradientcolor"||cmdId=="textfieldselected"||cmdId=="Category"||cmdId=="TextDirection");}}}}return(this.notEnabled.indexOf("|"+cmdId+"|")==-1);}catch(err){microstrategy.errors.log(err);}};mstrTECommandsImpl.prototype.queryState=function(cmdId){try{var t=this.parentBone.getSelectedThreshold();switch(cmdId){case"selectedItems":return this.item;break;case"font":case"fsize":case"Horizontal":case"Vertical":case"LeftStyle":case"TopStyle":case"RightStyle":case"BottomStyle":case"replaceOption":case"replaceValue":case"Category":case"DecimalPlaces":case"CurrencySymbol":case"ThousandSeparator":case"CurrencyPosition":case"NegativeNumbers":case"Format":case"LineSettingStyle":case"LineSettingWeight":case"FillStyle":case"GradientAngle":case"GradientXOffset":case"GradientYOffset":return this.parentBone.getThresholdFormatValue(t.formatting,mstrThresholdEditor.FORMAT_PROP_CONVERSION[cmdId]);case"fstyle":var f=t.formatting;var s=(this.parentBone.getThresholdFormatValue(f,"fw")==-1)?1:0;s+=(this.parentBone.getThresholdFormatValue(f,"fit")==-1)?2:0;s+=(this.parentBone.getThresholdFormatValue(f,"fun")==-1)?4:0;s+=(this.parentBone.getThresholdFormatValue(f,"fst")==-1)?8:0;return s;case"bgcolor":if(this.queryState("FillStyle")==1){return"transparent";}case"gradientcolor":case"color":case"LeftColor":case"TopColor":case"RightColor":case"BottomColor":case"LineSettingColor":return this.getFormatObject().decodeValue("color",this.parentBone.getThresholdFormatValue(t.formatting,mstrThresholdEditor.FORMAT_PROP_CONVERSION[cmdId]));case"replace":var r=this.parentBone.getThresholdFormatValue(t.formatting,"type");return(r==mstrThresholdEditor.TEXT||r==mstrThresholdEditor.IMAGE||r==mstrThresholdEditor.QUICK_SYMBOL||r==mstrThresholdEditor.HIDE);case"name":return t[cmdId];case"gradient":if(this.parentBone.getThresholdFormatValue(t.formatting,"pfs")==2){return this.getFormatObject().decodeValue("color",this.parentBone.getThresholdFormatValue(t.formatting,"bc"))+","+this.getFormatObject().decodeValue("color",this.parentBone.getThresholdFormatValue(t.formatting,"gc"))+",14,"+this.parentBone.getThresholdFormatValue(t.formatting,"pga")+","+this.parentBone.getThresholdFormatValue(t.formatting,"pgxo")+","+this.parentBone.getThresholdFormatValue(t.formatting,"pgyo");}else{return false;}case"b3dstyle":return false;case"TextWrap":case"TextDirection":return this.parentBone.getThresholdFormatValue(t.formatting,mstrThresholdEditor.FORMAT_PROP_CONVERSION[cmdId]);case"LeftPadding":case"TopPadding":case"RightPadding":case"BottomPadding":var paddingVal=this.parentBone.getThresholdFormatValue(t.formatting,mstrThresholdEditor.FORMAT_PROP_CONVERSION[cmdId]);return microstrategy.number.toUserUnits((paddingVal/72).toFixed(4));default:microstrategy.errors.log("Command Id: "+cmdId+" not implemented.");}}catch(err){microstrategy.errors.log(err);}return null;};mstrTECommandsImpl.prototype.getFormatObject=function(){try{this.formatObject=this.formatObject||mstrFormatObject;return this.formatObject;}catch(err){microstrategy.errors.log(err);}return null;};function mstrTECommandsImpl(p){if(p){this.parentBone=p;var s=document.createElement("span");s.setAttribute(microstrategy.HTMLATTR_OBJTYPE,(p.isCondFormat)?p.selectedType:microstrategy.FORMATTING_PROP_THRESHOLD);this.item={"1":s};}return this;}mstrThresholdEditorScript=true;