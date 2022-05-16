(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.MetricSlider","mstrmojo.MetricQualification","mstrmojo.SearchBoxSelector","mstrmojo.Label","mstrmojo.hash","mstrmojo.array");var $HASH=mstrmojo.hash,$ARR=mstrmojo.array,$FN=mstrmojo.emptyFn;var STYLES_PULLDOWN=0,STYLES_SCROLLER=1,STYLES_LIST=2,STYLES_RADIO=3,STYLES_CHECKBOX=4,STYLES_BUTTON=5,STYLES_LINK=6,STYLES_METRIC_SLIDER=7,STYLES_METRIC_QUAL=8,STYLES_SEARCH_BOX=9;var _ST_UC_ON_DS=2;var UNIT_CONDITION=1,SUBTOTAL=3;var ALL_ID="u;";var widgetMap={};widgetMap[STYLES_METRIC_SLIDER]="MetricSlider";widgetMap[STYLES_METRIC_QUAL]="MetricQualification";widgetMap[STYLES_SEARCH_BOX]="SearchBoxSelector";function updateSelectorControl(selectorCtrl,style,data,defn,idx,elements){switch(style){case STYLES_PULLDOWN:selectorCtrl.idx=$HASH.any(idx,true);var selectorUnset=(typeof (selectorCtrl.idx)==="undefined"||selectorCtrl.idx<0);if(selectorUnset){if($ARR.find(elements,"v","-1")<0){elements=[{v:"-1",n:""}].concat(elements);}selectorCtrl.idx="0";}selectorCtrl.unset=!!selectorUnset;selectorCtrl.options=elements;break;case STYLES_METRIC_QUAL:case STYLES_METRIC_SLIDER:if(selectorCtrl.updateData){selectorCtrl.updateData({low:data.min,high:data.max,cnt:data.cnt,nov:data.nov},{cs:data.cs,f:data.f,ft:data.ft,qua:data.qt});}selectorCtrl.items=elements;selectorCtrl.selectedIndices=idx;break;case STYLES_SEARCH_BOX:if(elements&&!defn.sos){selectorCtrl.candidates={isComplete:true,items:defn.srcid?elements:[]};}if(defn.srcid){var ca=[],ces=data.ces;if(ces&&ces.constructor===Array){if(defn.dfm==UNIT_CONDITION){for(var i=0;i<ces.length;i++){if(ces[i]["t"]!=SUBTOTAL){ca.push(ces[i]);}}}else{ca=ces.concat();}}if(!defn.sos){var $ARRAY=mstrmojo.array,new_ca=[];$ARRAY.forEach(ca,function(item){if($ARRAY.find(selectorCtrl.candidates.items,"v",item.v)>-1){new_ca.push(item);}});ca=new_ca;}selectorCtrl.items=ca;}break;default:selectorCtrl.items=elements;selectorCtrl.selectedIndices=idx;break;}}mstrmojo.DocSelectorViewFactory=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.DocSelectorViewFactory",newPulldown:$FN,attachTargetListeners:$FN,getSelectorClass:function getSelectorClass(selectorStyle,isHoriz){var scriptClass=widgetMap[selectorStyle];if(scriptClass.constructor===Array){scriptClass=scriptClass[(isHoriz)?0:1];}return scriptClass;},isSelectorSupported:function isSelectorSupported(){return true;},newSelector:function newSelector(selectorContainer){var children=selectorContainer.children,selectorCtrl=children&&children[0],selectorStyle=selectorContainer.style,selectedIdx=selectorContainer.selIdx,node=selectorContainer.node,defn=node.defn,data=node.data,elements=data.elms,elems;if(!this.isSelectorSupported(selectorContainer)){return null;}if(!selectorCtrl){if(!selectorCtrl){var cekEvtListener=selectorContainer._cekEvtListener,cekContextId=selectorContainer.id,fnCEK;if(cekEvtListener){defn.detachEventListener(cekEvtListener);delete selectorContainer._cekEvtListener;}if(selectorStyle===STYLES_PULLDOWN){selectorCtrl=this.newPulldown(selectorContainer);fnCEK=function(evt){elems=this.options;if($ARR.find(elems,"v",evt.value)<0){if($ARR.find(elems,"v","-1")<0){elems.unshift({v:"-1",n:""});}selectorCtrl.idx="0";selectorCtrl.options=elems;selectorCtrl.unset=true;selectorContainer._inSyncPhase=true;selectorCtrl.refresh();selectorContainer._inSyncPhase=false;}else{selectorCtrl.set("value",evt.value);}};cekContextId=selectorCtrl.id;}else{var cfg=this.getSelectorCtrlConfig(selectorContainer,selectorStyle,defn,elements),scriptClass=cfg.scriptClass;if(!scriptClass){selectorCtrl=new mstrmojo.Label({cssClass:"unsupported",text:"This selector is not supported."});}else{delete cfg.scriptClass;var Clazz=$HASH.walk(scriptClass,mstrmojo);selectorCtrl=new Clazz(cfg);if(selectorStyle===STYLES_METRIC_SLIDER){selectorContainer.attachEventListener("includeChange",selectorCtrl.id,function(evt){this.set("include",evt.value);this.selectRange();});}if(selectorStyle===STYLES_METRIC_SLIDER||selectorStyle===STYLES_METRIC_QUAL){selectorContainer.attachEventListener("quaChange",selectorCtrl.id,function(evt){this.set("qua",evt.value);});fnCEK=function(evt){if(selectorContainer.id!==evt.value.id){selectorContainer._inSyncPhase=true;selectorCtrl.updateExpr(evt.value);if(selectorContainer.style===STYLES_METRIC_SLIDER){selectorContainer.set("include",evt.value.include);}selectorContainer._inSyncPhase=false;}};}else{fnCEK=function(evt){var idxs=[];elems=this.node.data.elms;$ARR.forEach(evt.value,function(v){var idx=$ARR.find(elems,"v",v);if(idx>-1){idxs.push(idx);}});this._inSyncPhase=true;selectorCtrl.select(idxs);this._inSyncPhase=false;};}}}if(fnCEK){selectorContainer._cekEvtListener=defn.attachEventListener("cekChange",cekContextId,fnCEK);}}selectorContainer.addChildren(selectorCtrl);}updateSelectorControl(selectorCtrl,selectorContainer.style,data,defn,selectedIdx,elements);return selectorCtrl;},getSelectorCtrlConfig:function getSelectorCtrlConfig(selectorContainer,selectorStyle,defn,elements){var isHoriz=defn.horiz,fmts=selectorContainer.getFormats(),height=fmts&&fmts.height,copyProps=$HASH.copyProps,data=selectorContainer.node.data,cfg={scriptClass:this.getSelectorClass(selectorStyle,isHoriz),multiSelect:defn.multi,isHoriz:isHoriz,include:defn.include,itemWidthMode:defn.iwm,allIdx:$ARR.find(elements,"v",ALL_ID),noneIdx:defn.include?-1:$ARR.find(elements,"v",ALL_ID),renderAllItems:!height,onchange:function(){if(!selectorContainer._inSyncPhase){selectorContainer.selectorControlChange(this);}},makeSelection:function(evt){if(!selectorContainer._inSyncPhase){selectorContainer.showInfoWin(evt&&evt.selItem);}}};if(cfg.noneIdx!==-1){cfg.allIdx=-1;}if(selectorStyle===STYLES_SCROLLER||selectorStyle===STYLES_METRIC_SLIDER){selectorContainer.extCls="extSlider";if(defn.cek){defn.include=defn.cek.include;data.cs=defn.cek.cs;data.f=defn.cek.f;data.ft=defn.cek.ft;selectorContainer.qua=defn.cek.qua;}}if(selectorStyle===STYLES_SCROLLER){copyProps(["height","width"],fmts,cfg);}else{if(selectorStyle===STYLES_METRIC_QUAL||selectorStyle===STYLES_METRIC_SLIDER){if(selectorStyle===STYLES_METRIC_SLIDER){cfg.isHoriz=true;cfg.include=defn.include;}copyProps(["height","width","font"],fmts,cfg);copyProps(["cs","ft"],defn,cfg);cfg.fmts=defn.f;cfg.qua=selectorContainer.qua;cfg.numFmts=defn.numFmts;}else{if(selectorStyle===STYLES_SEARCH_BOX){cfg={scriptClass:cfg.scriptClass,cssText:fmts.height?"height: "+fmts.height:"",emptyText:mstrmojo.desc(4325,"Search")+" "+(defn.ttl||""),items:defn.srcid?(data.ces?data.ces.concat():[]):[],REQUEST_THRESHOLD:55,suggestCount:50,srcid:defn.srcid||"",dsrc:defn.dsrc||"",onitemsChange:function(){if(!selectorContainer._inSyncPhase){selectorContainer.showInfoWin();selectorContainer.selectorControlChange(this);}}};if(elements&&!defn.sos){cfg.candidates={isComplete:true,items:defn.srcid?elements:[]};}else{cfg.useKeyDelay=true;cfg.noCache=true;}if(!defn.multi){cfg.maxObjectCount=1;}}}}return cfg;},updateControlStyles:function updateControlStyles(selectorContainer){if(selectorContainer.isInFilterPanel()&&!selectorContainer.isHorizFP()){var style=selectorContainer.style;if(style===STYLES_SCROLLER||style===STYLES_METRIC_QUAL||STYLES_METRIC_SLIDER){selectorContainer.children[0].width=selectorContainer.parent.parent.contentWidth;}}}});var factory=mstrmojo.DocSelectorViewFactory;factory.STYLES={PULLDOWN:STYLES_PULLDOWN,SCROLLER:STYLES_SCROLLER,LIST:STYLES_LIST,RADIO:STYLES_RADIO,CHECKBOX:STYLES_CHECKBOX,BUTTON:STYLES_BUTTON,LINK:STYLES_LINK,METRIC_SLIDER:STYLES_METRIC_SLIDER,METRIC_QUAL:STYLES_METRIC_QUAL,SEARCH_BOX:STYLES_SEARCH_BOX};factory.ELEM_ALL=ALL_ID;factory.UC_ON_DS=_ST_UC_ON_DS;}());