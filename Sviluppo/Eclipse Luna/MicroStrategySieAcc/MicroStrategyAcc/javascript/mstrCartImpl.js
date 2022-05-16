mstrCartImplScript=cartScript;mstrCartImpl.prototype=new mstrBoneImpl();mstrCartImpl.prototype.availableSectionId=null;mstrCartImpl.prototype.availableSection=null;mstrCartImpl.prototype.selectedSectionId=null;mstrCartImpl.prototype.selectedSection=null;mstrCartImpl.prototype.upButton=null;mstrCartImpl.prototype.downButton=null;mstrCartImpl.prototype.addButton=null;mstrCartImpl.prototype.removeButton=null;mstrCartImpl.prototype.upButtonClass="up";mstrCartImpl.prototype.downButtonClass="down";mstrCartImpl.prototype.addButtonClass="add";mstrCartImpl.prototype.removeButtonClass="remove";mstrCartImpl.prototype.onload=function(){try{this.initBone();this.availableSection=microstrategy.findChildWithAtt(this.elem,"SELECT","id",this.availableSectionId);this.selectedSection=microstrategy.findChildWithAtt(this.elem,"SELECT","id",this.selectedSectionId);var classAttName=(bIsW3C)?"class":"className";this.upButton=microstrategy.findChildWithAtt(this.elem,"IMG",classAttName,this.upButtonClass);if(this.upButton){this.upButton=this.upButton.parentNode;}else{alert("up");}this.downButton=microstrategy.findChildWithAtt(this.elem,"IMG",classAttName,this.downButtonClass);if(this.downButton){this.downButton=this.downButton.parentNode;}else{alert("down");}this.addButton=microstrategy.findChildWithAtt(this.elem,"IMG",classAttName,this.addButtonClass);if(this.addButton){this.addButton=this.addButton.parentNode;}else{alert("add");}this.removeButton=microstrategy.findChildWithAtt(this.elem,"IMG",classAttName,this.removeButtonClass);if(this.removeButton){this.removeButton=this.removeButton.parentNode;}else{alert("remove");}this.initUpDownButtons();}catch(err){microstrategy.errors.log(err);return false;}};mstrCartImpl.prototype.initUpDownButtons=function(){try{if(this.selectedSection&&this.upButton&&this.downButton){var enable=this.selectedSection.options&&this.selectedSection.options.length>1;this.setEnableButton(this.upButton,enable);this.setEnableButton(this.downButton,enable);}}catch(err){microstrategy.errors.log(err);return false;}};mstrCartImpl.prototype.setEnableButton=function(button,enable){try{if(enable){if(button.getAttribute("oldclick")){button.setAttribute("onclick",button.getAttribute("oldclick"));}}else{if(!button.getAttribute("oldclick")){button.setAttribute("oldclick",button.getAttribute("onclick"));}button.setAttribute("onclick",null);}button.disabled=!enable;}catch(err){microstrategy.errors.log(err);return false;}};mstrCartImpl.prototype.updateCartSelections=function(isRemove){try{if(this.selectedSection){if(AddItemsToList){if(isRemove==false){AddItemsToList(this.availableSection,this.selectedSection);}else{AddItemsToList(this.selectedSection,this.availableSection);}}this.elem.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,this.getSelections());this.initUpDownButtons();}}catch(err){microstrategy.errors.log(err);return false;}};mstrCartImpl.prototype.moveCartSelections=function(isUp){try{if(this.selectedSection){if(isUp==false){if(MoveItemsInListDown){MoveItemsInListDown(this.selectedSection);}}else{if(MoveItemsInListUp){MoveItemsInListUp(this.selectedSection);}}this.elem.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,this.getSelections());}}catch(err){microstrategy.errors.log(err);return false;}};mstrCartImpl.prototype.numberOfSelections=function(){try{var numOfSelected=0;for(var i=0;i<this.selectedSection.options.length;i++){if(this.selectedSection.options[i]!=null){if(this.selectedSection.options[i].value!="-none-"){numOfSelected++;}}}return numOfSelected;}catch(err){microstrategy.errors.log(err);return false;}};mstrCartImpl.prototype.getSelections=function(separator){try{if(!separator){separator=SIMPLE_SEPARATOR_COMMA;}var objValue="";for(var i=0;i<this.selectedSection.options.length;i++){if(this.selectedSection.options[i]!=null){if(this.selectedSection.options[i].value!="-none-"){if(i>0){objValue+=separator;}objValue+=this.selectedSection.options[i].value;}}}return objValue;}catch(err){microstrategy.errors.log(err);return false;}};mstrCartImpl.prototype.emptySelections=function(){try{MoveAllItemsToList(this.selectedSection,this.availableSection);this.elem.setAttribute(microstrategy.HTMLATTR_CMD_VALUE,this.getSelections());this.initUpDownButtons();}catch(err){microstrategy.errors.log(err);return false;}};mstrCartImpl.prototype.setEnable=function(enable){try{this.elem.disabled=!enable;this.selectedSection.disabled=!enable;this.availableSection.disabled=!enable;var classAttName=(bIsW3C)?"class":"className";var labelDivs=microstrategy.findChildrenWithAtt(this.elem,"DIV",classAttName,(enable)?"listHeader disabledLabel":"listHeader");for(var i=0;i<labelDivs.length;i++){labelDivs[i].className=(enable)?"listHeader":"listHeader disabledLabel";}if(this.addButton&&this.removeButton){this.setEnableButton(this.addButton,enable);this.setEnableButton(this.removeButton,enable);}if(enable){this.initUpDownButtons();}else{this.setEnableButton(this.upButton,enable);this.setEnableButton(this.downButton,enable);}}catch(err){microstrategy.errors.log(err);return false;}};function mstrCartImpl(id){this.inherits=mstrBoneImpl;this.inherits(id);delete this.inherits;return this;}