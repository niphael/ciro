(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._SupportsEllipsisText","mstrmojo.android.ui.Label","mstrmojo.android.ui.Menu","mstrmojo.css");var $CSS=mstrmojo.css,cssOversize="oversize",cssMultiLine="multiline",cssTest=[cssOversize,cssMultiLine];mstrmojo.android.ui.TitleLabel=mstrmojo.declare(mstrmojo.Container,[mstrmojo._SupportsEllipsisText],{scriptClass:"mstrmojo.android.ui.TitleLabel",markupString:'<div id="{@id}" class="mstrmojo-AndroidTitleLabel {@cssClass}" style="{@cssText}"></div>',markupSlots:{containerNode:function(){return this.domNode;}},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},children:[{scriptClass:"mstrmojo.android.ui.Label",alias:"lbl",touchTap:function(){mstrApp.closeAllDialogs();var titleLabel=this.parent,list=titleLabel.list,items=list.items,count=items&&items.length;if(!list.visible&&count){if(titleLabel._isDropDown&&count===2){list.singleSelect((!list.selectedIndex)?1:0);}else{list.set("visible",true);if(mstrMobileApp&&mstrMobileApp.genMapPreview){mstrMobileApp.genMapPreview();}}}}},{scriptClass:"mstrmojo.android.ui.Menu",alias:"list",selectionPolicy:"reselect",visible:false,setMaxWidth:true}],addChildren:function addChildren(children,idx,silent){this._super(children,idx,silent);this.list.attachEventListener("selectionChange",this.id,function(evt){var added=evt.added,list=this.list;list.set("visible",false);if(mstrMobileApp&&mstrMobileApp.showMapView){mstrMobileApp.showMapView(0);}if(!added){return ;}var item=list.items[added[0]];if(item.isTitle){return ;}if(this._isDropDown){this.setText(item.n);}this.raiseEvent({name:"listSelectionMade",item:item});});},onRender:function onRender(){var testLbl=this._testLbl=this.lbl.domNode.cloneNode(false),domNode=this.domNode;mstrmojo.css.addClass(testLbl,"test");testLbl.removeAttribute("onclick");testLbl.removeAttribute("id");domNode.insertBefore(testLbl,domNode.lastChild);},unrender:function unrender(ignoreDom){delete this.testLbl;this._super(ignoreDom);},setText:function setText(text){this.checkTextFit(text);},checkTextFit:function checkTextFit(text){var displayLabel=this.lbl,displayLabelNode=displayLabel.domNode,testLabelNode=this._testLbl,offset=this._compOffset;text=(text===undefined)?displayLabel.text:text;if(offset===undefined){var compStyle=$CSS.getComputedStyle(displayLabelNode);offset=parseInt(compStyle.paddingLeft,10)+parseInt(compStyle.paddingRight,10);this._compOffset=offset;}testLabelNode.style.width=(displayLabelNode.parentNode.offsetWidth-offset)+"px";testLabelNode.innerHTML=text;var displayHeight=displayLabelNode.offsetHeight,isMultiLine=(testLabelNode.offsetHeight>displayHeight);$CSS.toggleClass(displayLabelNode,cssTest,isMultiLine);displayLabel.set("text",text);if(isMultiLine){if(!this.ellipsize("ttl",displayLabelNode,true)){$CSS.addClass(testLabelNode,cssOversize);testLabelNode.innerHTML=displayLabelNode.innerHTML;if(testLabelNode.offsetHeight===displayHeight){$CSS.removeClass(displayLabelNode,cssMultiLine);}$CSS.removeClass(testLabelNode,cssTest);}}},setListItems:function setListItems(items,selectedIdx){var hasItems=(items&&items.length),isDropDown=(selectedIdx!==undefined),list=this.list;$CSS.toggleClass(this.domNode,"has-items",hasItems);this._isDropDown=!!isDropDown;if(hasItems){if(!isDropDown){items=[{n:mstrmojo.desc(9850,"RECENTLY OPENED"),isTitle:true}].concat(items);}else{this.setText(items[selectedIdx].n);}}list.set("items",items);if(isDropDown){list.singleSelect(selectedIdx,true);}},clearListItems:function clearListItems(){var list=this.list,rtn={items:[].concat(list.items),idx:list.selectedIndex};mstrmojo.css.removeClass(this.domNode,"has-items");list.set("items",[]);return(rtn.idx>-1)?rtn:null;},reset:function reset(){this.list.set("visible",false);this.checkTextFit();}});}());