mstrBurstImplScript=true;mstrBurstImpl.prototype=new mstrBoneImpl();mstrBurstImpl.prototype.useAnimate=true;mstrBurstImpl.prototype.minHeight=30;mstrBurstImpl.prototype.maxHeight=220;mstrBurstImpl.prototype.steps=5;mstrBurstImpl.prototype.valueField="id";mstrBurstImpl.prototype.nameField="n";mstrBurstImpl.prototype.itemSep=ITEM_SEPARATOR;mstrBurstImpl.prototype.unitSep=UNIT_SEPARATOR;mstrBurstImpl.prototype.simpleSep=",";mstrBurstImpl.prototype.visible=false;mstrBurstImpl.prototype.onload=function(){try{this.initBone();this.dataLoaded=false;this.hiddenArgName=this.burstEvtArgName;this.elCriteria=microstrategy.findChildWithAtt(this.elem,"span","id","burstCriteria");this.useBurst=!mstr.utils.String.isEmpty(this.burstEvtArgValue);this.updateExpandPageByCheckbox();}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.initCartComponents=function(){try{var elem=this.elem;this.elFieldset=microstrategy.findChildWithAtt(elem,"fieldset","id","fsBurst");this.elCriteria=microstrategy.findChildWithAtt(elem,"span","id","burstCriteria");this.availableCart=microstrategy.findChildWithAtt(elem,"select","id","availableBurstList");this.selectedCart=microstrategy.findChildWithAtt(elem,"select","id","selectedBurstList");this.addButton=microstrategy.findChildWithAtt(elem,"div","id","addUnitsButton");this.removeButton=microstrategy.findChildWithAtt(elem,"div","id","removeUnitsButton");this.addAllButton=microstrategy.findChildWithAtt(elem,"div","id","addAllUnitsButton");this.removeAllButton=microstrategy.findChildWithAtt(elem,"div","id","removeAllUnitsButton");this.upButton=microstrategy.findChildWithAtt(elem,"div","id","upUnitsButton");this.downButton=microstrategy.findChildWithAtt(elem,"div","id","downUnitsButton");this.addButton.onclick=new Function("e","return microstrategy.bone('"+this.id+"').add(e);");this.removeButton.onclick=new Function("e","return microstrategy.bone('"+this.id+"').remove(e);");this.addAllButton.onclick=new Function("e","return microstrategy.bone('"+this.id+"').addAll(e);");this.removeAllButton.onclick=new Function("e","return microstrategy.bone('"+this.id+"').removeAll(e);");this.upButton.onclick=new Function("e","return microstrategy.bone('"+this.id+"').up(e);");this.downButton.onclick=new Function("e","return microstrategy.bone('"+this.id+"').down(e);");}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.buildCart=function(){var html='<fieldset id="fsBurst"><legend>'+microstrategy.descriptors.getDescriptor(9030)+'</legend><input type="hidden" class="mstrHiddenInput" value="'+this.burstEvtArgValue+'" id="'+this.hiddenArgName+'" name="'+this.hiddenArgName+'"><div class="mstrBurstCartDiv"><table cellspacing="0" cellpadding="0" border="0" class="mstrCart"><tbody><tr><td class="mstrCartAvailable"><div class="listHeader">'+microstrategy.descriptors.getDescriptor(9031)+'</div></td><td class="mstrCartButtons"></td><td class="mstrCartSelected"><div class="listHeader">'+microstrategy.descriptors.getDescriptor(9032)+'</div></td><td class="mstrCartButtons"></td></tr><tr><td class="mstrCartAvailable"><select class="cartAvailable" id="availableBurstList" size="8" multiple="1"></select></td><td class="mstrCartButtons"><div align="center" id="addUnitsButton"><img src="../images/1ptrans.gif" class="mstrIcon-btn mstrIcon-btnArrowRight" title="'+microstrategy.descriptors.getDescriptor(537)+'"></div><div align="center" id="addAllUnitsButton"><img src="../images/1ptrans.gif" class="mstrIcon-btn mstrIcon-btnAddAll"  title="'+microstrategy.descriptors.getDescriptor(3170)+'"></div><div align="center" id="removeUnitsButton"><img src="../images/1ptrans.gif" class="mstrIcon-btn mstrIcon-btnArrowLeft" title="'+microstrategy.descriptors.getDescriptor(875)+'"></div><div align="center" id="removeAllUnitsButton"><img src="../images/1ptrans.gif" class="mstrIcon-btn mstrIcon-btnRemoveAll" title="'+microstrategy.descriptors.getDescriptor(3168)+'"></div></td><td class="mstrCartSelected"><select class="cartSelected" id="selectedBurstList" size="8" multiple="1"></select></td><td class="mstrCartButtons"><div align="center" id="upUnitsButton"><img src="../images/1ptrans.gif" class="mstrIcon-btn mstrIcon-btnArrowUp" title="'+microstrategy.descriptors.getDescriptor(7978)+'"></div><div align="center" id="downUnitsButton"><img src="../images/1ptrans.gif" class="mstrIcon-btn mstrIcon-btnArrowDown" title="'+microstrategy.descriptors.getDescriptor(7979)+'"></div></td></tr></tbody></table></div></div></fieldset>';var span=document.createElement("span");span.innerHTML=html;this.elem.appendChild(span.firstChild);delete span;};mstrBurstImpl.prototype.prepareSelectedItems=function(){this.selectedItems=[];if(this.burstEvtArgValue.length==0){return ;}var items=this.burstEvtArgValue.split(this.unitSep);for(var i=0,len=items.length;i<len;i++){var item=items[i].split(this.itemSep);var obj={};obj[this.valueField]=item[0];obj[this.nameField]=item[1];this.selectedItems.push(obj);}mstr.$A.removeItemsByForm(this.availableItems,this.selectedItems,this.valueField);};mstrBurstImpl.prototype.loadData=function(){try{iframe.showWaitPage();var params=this.isReport?{taskId:"reportExecute",styleName:"SubscriptionsPageByAttributesStyle",execFlags:524288,resultFlags:41943072}:{taskId:"RWExecute",styleName:"SubscriptionsPageByAttributesStyle"};var msgId=this.getMsgId();if(msgId){if(this.isReport){params.msgID=msgId;}else{params.messageID=msgId;}}else{if(this.isReport){params.reportID=this.objectId;}else{params.objectID=this.objectId;}}var me=this;mstr.$XHR.request(mstrApp.taskURL||mstrConfig.taskURL,params,{success:function(res){me.dataLoaded=true;me.availableItems=res.atts||[];me.canBurst=me.availableItems.length>0;me.prepareSelectedItems();}},false);iframe.hideWaitPage();}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.getMsgId=function(){try{var bone;if(microstrategy.EXECUTION_SCOPE==microstrategy.REPORT_EXECUTION){bone=microstrategy.bone("UniqueReportID");}else{if(microstrategy.EXECUTION_SCOPE==microstrategy.RWD_EXECUTION){bone=microstrategy.bone("rwb_viewer");}}return bone?bone.messageID:"";}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.openBurstEditor=function(burstBtn){try{var v=this.visible;if(!v&&!this.dataLoaded){this.loadData();if(this.canBurst){this.buildCart();this.initCartComponents();this.updateCart(this.availableCart,this.availableItems);this.updateCart(this.selectedCart,this.selectedItems);if(this.availableItems.length==0){ClearSelectedItems(this.availableCart);}if(this.selectedItems.length==0){ClearSelectedItems(this.selectedCart);}}else{this.elCriteria.innerHTML='<label style="color:red">'+microstrategy.descriptors.getDescriptor(9174)+"</label>";}}if(!this.canBurst){return ;}if(this.useAnimate){mstr.utils.Animations.resize(this.elem,null,v?this.minHeight:this.maxHeight,this.step,null);}else{this.elFieldset.style.display=v?"none":"block";}burstBtn.title=microstrategy.descriptors.getDescriptor(v?9034:9035);burstBtn.style.border=!v?"2px solid #ccc":"";this.visible=!v;}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.updateCart=function(cart,items){try{if(items&&items.length>0){cart.options.length=0;for(var i=0,len=items.length;i<len;i++){var option=new Option(items[i][this.nameField],items[i][this.valueField]+this.itemSep+items[i][this.nameField],false,false);option.className="mstrCartOption mstrBurstCartOption";option.title=items[i][this.nameField];cart.options.add(option);}}}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.updateExpandPageByCheckbox=function(){try{var elExpandPageBy=document.getElementById("fModeExAll");if(elExpandPageBy){elExpandPageBy.disabled=this.useBurst;elExpandPageBy.useBurst=1;}}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.updateFilenameDiv=function(){try{if(this.isEmailSub){var zip=document.getElementById("fstate");if(zip){zip.onchange();}}}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.updateBurstCriteria=function(){try{var el=this.elCriteria;var options=this.selectedCart.options;if(options&&options.length>0){this.useBurst=false;var html="";for(var i=0,len=options.length;i<len;i++){if(options[i].value=="-none-"){continue;}var separator=i==len-1?"":this.simpleSep;html+='<span class="mstrBurstItem"><span class="mstrIcon-lv mstrIcon-lv-a"></span><span>'+options[i].innerHTML+separator+"</span></span>";this.useBurst=true;}el.innerHTML=html;}this.updateExpandPageByCheckbox();this.updateFilenameDiv();}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.add=function(){try{AddItemsToList(this.availableCart.id,this.selectedCart.id,this.hiddenArgName);this.updateBurstCriteria();}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.addAll=function(){try{AddAllItemsToList(this.availableCart.id,this.selectedCart.id,this.hiddenArgName);this.updateBurstCriteria();}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.remove=function(){try{RemoveItemsFromList(this.availableCart.id,this.selectedCart.id,this.hiddenArgName);this.updateBurstCriteria();}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.removeAll=function(){try{RemoveAllItemsToList(this.availableCart.id,this.selectedCart.id,this.hiddenArgName);this.updateBurstCriteria();}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.up=function(){try{MoveItemsInListUp(this.selectedCart.id,this.hiddenArgName);UpdateHiddenSelectedValue(this.selectedCart.id,this.hiddenArgName);this.updateBurstCriteria();}catch(err){microstrategy.errors.log(err);}};mstrBurstImpl.prototype.down=function(){try{MoveItemsInListDown(this.selectedCart.id,this.hiddenArgName);UpdateHiddenSelectedValue(this.selectedCart.id,this.hiddenArgName);this.updateBurstCriteria();}catch(err){microstrategy.errors.log(err);}};function mstrBurstImpl(id){this.inherits=mstrBoneImpl;this.inherits(id);delete this.inherits;return this;}