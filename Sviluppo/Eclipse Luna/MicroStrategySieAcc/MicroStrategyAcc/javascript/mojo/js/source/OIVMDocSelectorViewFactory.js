(function(){mstrmojo.requiresCls("mstrmojo.DocSelectorViewFactory","mstrmojo.RadioList","mstrmojo.CheckList","mstrmojo.ListBoxHoriz","mstrmojo.ListBoxSelector","mstrmojo.LinkList","mstrmojo.ButtonList","mstrmojo.DropDownList","mstrmojo.Slider");var STYLES=mstrmojo.DocSelectorViewFactory.STYLES;var widgetMap={};widgetMap[STYLES.RADIO]=["RadioListHoriz","RadioList"];widgetMap[STYLES.CHECKBOX]=["CheckListHoriz","CheckList"];widgetMap[STYLES.LIST]=["ListBoxHoriz","ListBoxSelector"];widgetMap[STYLES.LINK]=["LinkListHoriz","LinkList"];widgetMap[STYLES.BUTTON]=["ButtonListHoriz","ButtonList"];widgetMap[STYLES.SCROLLER]="Slider";widgetMap[STYLES.METRIC_SLIDER]="MetricSlider";widgetMap[STYLES.METRIC_QUAL]="MetricQualification";mstrmojo.OIVMDocSelectorViewFactory=mstrmojo.declare(mstrmojo.DocSelectorViewFactory,null,{scriptClass:"mstrmojo.OIVMDocSelectorViewFactory",newPulldown:function newPulldown(selectorContainer){return new mstrmojo.DropDownList({k:selectorContainer.ck,cssDisplay:"block",cssClass:"mstrmojo-DocSelector-DropDownList",selectCssClass:"mstrmojo-DocSelector-DropDownList-select",onvalueChange:function(){if(!selectorContainer._inSyncPhase){selectorContainer.showInfoWin();selectorContainer.selectorControlChange(this);}}});},updateControlStyles:function updateControlStyles(selectorContainer){var selectorStyle=selectorContainer.style,ctrl=selectorContainer.children[0],node=selectorContainer.node,defn=node.defn,isHoriz=defn.horiz,fmts=selectorContainer.getFormats(),color,height,backgroundColor;if(selectorStyle===STYLES.SEARCH_BOX&&defn.ttl){selectorContainer.contentNodeCssText+="overflow:hidden";}else{if(defn.hm===0&&selectorStyle!==STYLES.SCROLLER&&selectorStyle!==STYLES.METRIC_SLIDER){selectorContainer.contentNodeCssText+="overflow-"+((isHoriz)?"x":"y")+":hidden;";}}if(fmts){ctrl.color=color=fmts.color;height=fmts.height;backgroundColor=fmts["background-color"]||(fmts.p_fmts&&fmts.p_fmts["background-color"]);}if(selectorStyle===STYLES.PULLDOWN){if(fmts){if(color){selectorContainer.itemCssText+="color:"+color+";";}}ctrl.cssText=selectorContainer.itemCssText;}else{ctrl.cellCssClass="";ctrl.tableCssText="table-layout:"+((defn.iwm===0)?"fixed":"auto")+";";if(selectorStyle===STYLES.METRIC_QUAL){ctrl.cssText="";}else{if(height!==undefined){if(selectorStyle===STYLES.SEARCH_BOX){ctrl.height=(parseInt(height,10)-2)+"px";}else{ctrl.cssText="height:"+height+";";}}}if(selectorStyle===STYLES.LIST&&backgroundColor){ctrl.cssText+="background-color:"+backgroundColor+";";}switch(selectorStyle){case STYLES.RADIO:case STYLES.CHECKBOX:ctrl.labelCssText=selectorContainer.itemCssText;break;case STYLES.BUTTON:case STYLES.LINK:case STYLES.LIST:if(selectorStyle===STYLES.BUTTON){if(color){selectorContainer.itemCssText+="color:"+color+";";}}if(isHoriz){selectorContainer.itemCssText+="height:"+height+";";}ctrl.itemCssText=selectorContainer.itemCssText;selectorContainer["background-color"]=backgroundColor;break;}this._super(selectorContainer);}},getSelectorClass:function getSelectorClass(selectorStyle,isHoriz){var scriptClass=widgetMap[selectorStyle];if(scriptClass){if(scriptClass.constructor===Array){scriptClass=scriptClass[(isHoriz)?0:1];}return scriptClass;}return this._super(selectorStyle,isHoriz);}});}());