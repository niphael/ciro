mstrMsgBoxExportLink.prototype.showAdvanced="false";mstrMsgBoxExportLink.prototype.linkText;mstrMsgBoxExportLink.prototype.initExpotLink=function(labelTexts,values,length,maxLength,cancelButton,showIframe){this.showAdvanced=false;var test=document.cookie,dsc=microstrategy.descriptors;try{if(!labelTexts||labelTexts.length==0||!values||values.length==0){return true;}var content=document.getElementById("msgContent"),label=document.getElementById("msgIcon");if(label!=null&&labelTexts[0]){label.className="";label.innerHTML="";}if(content!=null&&values[0]){content.innerHTML="";content.style.width="390px";content.style.padding="5px";if(bIsIE7&&!bIsW3C){}var label=document.createElement("span");label.innerHTML=labelTexts[0];content.appendChild(label);this.linkText=document.createElement("INPUT");this.linkText.id="srcInput";this.linkText.style.width="100%";this.linkText.maxLength=maxLength;this.linkText.size=length;this.linkText.value=values[0];content.appendChild(this.linkText);}cancelButton.value=dsc.getDescriptor("2102");if(!showIframe){return ;}var iframeDiv=document.getElementById("iframeDiv");if(iframeDiv){iframeDiv.style.display="block";return ;}var dialogBody=document.getElementById("msgTable").parentNode;iframeDiv=document.createElement("div");dialogBody.appendChild(iframeDiv);iframeDiv.setAttribute("id","iframeDiv");var iframeFieldSet=document.createElement("fieldset");iframeDiv.appendChild(iframeFieldSet);iframeFieldSet.setAttribute("style","");iframeFieldSet.style.paddingRight="0";var iframeLegend=document.createElement("legend");iframeFieldSet.appendChild(iframeLegend);if(typeof (iframeLegend.innerText)!="undefined"){iframeLegend.innerText=dsc.getDescriptor("8213");}else{iframeLegend.textContent=dsc.getDescriptor("8213");}var textTable=document.createElement("div");iframeFieldSet.appendChild(textTable);var iframeSpan=document.createElement("span");textTable.appendChild(iframeSpan);iframeSpan.setAttribute("id","iframeLabel");iframeSpan.setAttribute("name","iframeLabel");iframeSpan.setAttribute("style","");iframeSpan.innerHTML=dsc.getDescriptor("4223");var div=document.createElement("div");div.style.overflow="hidden";div.style.width="390px";textTable.appendChild(div);var iframeInfor=document.createElement("input");div.appendChild(iframeInfor);iframeInfor.style.width="100%";iframeInfor.id="iframeInput";iframeInfor.maxLength=maxLength;iframeInfor.size=length-5;iframeInfor.value=values[1];var generalDiv=document.createElement("div");iframeFieldSet.appendChild(generalDiv);var advancedAnchor=document.createElement("a");generalDiv.appendChild(advancedAnchor);advancedAnchor.setAttribute("class","mstrLink");if(!+"\v1"){advancedAnchor.onclick=function(){microstrategy.bone("msgBox").toggleAdvanced();};}else{advancedAnchor.setAttribute("onCLick","javascript:microstrategy.bone('msgBox').toggleAdvanced();");}var anchorDiv=document.createElement("div");advancedAnchor.appendChild(anchorDiv);anchorDiv.setAttribute("id","advancedLinkDiv");anchorDiv.setAttribute("name","advancedLinkDiv");anchorDiv.innerHTML=dsc.getDescriptor("3677");anchorDiv.setAttribute("style","");anchorDiv.style.paddingBottom="5px";generalDiv=document.createElement("div");iframeFieldSet.appendChild(generalDiv);generalDiv.setAttribute("id","advancedContentDiv");generalDiv.setAttribute("style","");generalDiv.style.display=(this.showAdvanced?"block":"none");var widthHightDiv=document.createElement("div");generalDiv.appendChild(widthHightDiv);widthHightDiv.setAttribute("id","widthHightDiv");widthHightDiv.setAttribute("style","");var func=function(widthHightDiv,name){var label=document.createElement("label"),dsc=microstrategy.descriptors;widthHightDiv.appendChild(label);label.setAttribute("id",name+"Label");label.setAttribute("style","");label.style.paddingLeft="15px";label.innerHTML=(name=="width"?dsc.getDescriptor("272"):dsc.getDescriptor("271"));var input=document.createElement("input");widthHightDiv.appendChild(input);input.setAttribute("id",name+"Input");input.id=name+"Input";input.size="10";input.value=(name=="width"?"640":"480");input.setAttribute(mstrHTMLAttributes.ATTR_FLDID,"8044");input.setAttribute(mstrHTMLAttributes.ATTR_DTY,"1");input.setAttribute(mstrHTMLAttributes.ATTR_MIN,"0");if(!+"\v1"){input.onchange=function(){microstrategy.bone("msgBox").resetIframeInfo();};input.onkeyup=function(){microstrategy.bone("msgBox").resetIframeInfo();};input.onblur=function(){microstrategy.bone("msgBox").resetIframeInfo();};}else{input.setAttribute("onChange","javascript:microstrategy.bone('msgBox').resetIframeInfo()");input.setAttribute("onKeyUp","javascript:microstrategy.bone('msgBox').resetIframeInfo()");input.setAttribute("onBlur","javascript:microstrategy.bone('msgBox').resetIframeInfo()");}};func(widthHightDiv,"width");func(widthHightDiv,"height");var hideSectionLabelDiv=document.createElement("div");generalDiv.appendChild(hideSectionLabelDiv);hideSectionLabelDiv.setAttribute("id","hideSectionLableDiv");var hideSectionLabel=document.createElement("label");hideSectionLabelDiv.appendChild(hideSectionLabel);hideSectionLabel.setAttribute("id","hideSectionLabel");hideSectionLabel.setAttribute("style","");hideSectionLabel.style.paddingLeft="15px";hideSectionLabel.style.paddingTop="2px";hideSectionLabel.style.display="block";hideSectionLabel.innerHTML=dsc.getDescriptor("8212");var hideSectionContentDiv=document.createElement("div");generalDiv.appendChild(hideSectionContentDiv);hideSectionContentDiv.setAttribute("id","hideSectionContentDiv");hideSectionContentDiv.setAttribute("style","");hideSectionContentDiv.style.paddingLeft="15px";hideSectionContentDiv.style.paddingTop="2px";hideSectionContentDiv.style.display="block";var i,dsc=microstrategy.descriptors,sectionName=new Array("header","path","dockTop","dockLeft","footer"),showedName=new Array(dsc.getDescriptor("2033"),dsc.getDescriptor("8145"),dsc.getDescriptor("2509"),dsc.getDescriptor("8146"),dsc.getDescriptor("8147"));for(i=0;i<5;i++){var chkContainer=document.createElement("span");chkContainer.style.display="inline-block";hideSectionContentDiv.appendChild(chkContainer);var hideContentChk;try{hideContentChk=document.createElement("<input type='checkbox'>");chkContainer.appendChild(hideContentChk);}catch(e){hideContentChk=document.createElement("input");chkContainer.appendChild(hideContentChk);hideContentChk.setAttribute("type","checkbox");}hideContentChk.setAttribute("id",sectionName[i]+"Chk");hideContentChk.setAttribute("name",sectionName[i]+"Chk");hideContentChk.setAttribute("style","");if(!+"\v1"){hideContentChk.onclick=function(){microstrategy.bone("msgBox").resetIframeInfo();};}else{hideContentChk.setAttribute("onClick","javascript:microstrategy.bone('msgBox').resetIframeInfo()");}var hideContentLabel=document.createElement("label");chkContainer.appendChild(hideContentLabel);hideContentLabel.setAttribute("id",sectionName[i]+"Label");hideContentLabel.setAttribute("name",sectionName[i]+"Label");hideContentLabel.setAttribute("style","");hideContentLabel.style.paddingRight="5px";if(typeof (hideContentLabel.innerText)!="undefined"){hideContentLabel.innerText=showedName[i];}else{hideContentLabel.textContent=showedName[i];}}}catch(err){microstrategy.errors.log(err);return false;}};mstrMsgBoxExportLink.prototype.selectLinkText=function(){this.linkText.focus();this.linkText.select();};mstrMsgBoxExportLink.prototype.toggleAdvanced=function(){this.showAdvanced=!this.showAdvanced;var elemLink=document.getElementById("advancedLinkDiv");if(elemLink){elemLink.className=this.showAdvanced?"open":"";}var elemDiv=document.getElementById("advancedContentDiv");if(elemDiv){elemDiv.style.display=(this.showAdvanced?"block":"none");}};mstrMsgBoxExportLink.prototype.resetIframeInfo=function(){var errorColor="rgb(255, 0, 0)";var normalColor="rgb(0, 0, 0)";var errorFlag=false;var width,height;var func=function(name){var input=document.getElementById(name+"Input");if(input){var em=mstrEditorImpl.validateField(input,"",true);if(input.value.length>0&&em.length>0){input.style.color=errorColor;errorFlag=true;}else{if(name=="width"){width=input.value;}else{height=input.value;}input.style.color=normalColor;}}};func("width");func("height");var src="";var srcInput=document.getElementById("srcInput");if(srcInput&&srcInput.value){src=srcInput.value;}else{errorFlag=true;}if(errorFlag){return ;}var hiddenSecStr="";var i;var sectionName=new Array("header","path","dockTop","dockLeft","footer");for(i=0;i<sectionName.length;i++){var tempStr,checkBox;checkBox=document.getElementById(sectionName[i]+"Chk");if(checkBox&&!checkBox.checked){if(hiddenSecStr==""){hiddenSecStr="&hiddensections="+sectionName[i];}else{hiddenSecStr+=","+sectionName[i];}}}var finalStr="<iframe ";finalStr+='width="'+width+'" ';finalStr+='height="'+height+'" ';finalStr+='src="';finalStr+=src;finalStr+=hiddenSecStr;finalStr+='"></iframe>';var iframeInput=document.getElementById("iframeInput");if(iframeInput){iframeInput.value=finalStr;}};function mstrMsgBoxExportLink(){return this;}