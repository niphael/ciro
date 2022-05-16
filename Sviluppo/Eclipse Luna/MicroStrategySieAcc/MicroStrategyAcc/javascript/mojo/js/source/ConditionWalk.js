(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array","mstrmojo.registry","mstrmojo.css","mstrmojo.Arr","mstrmojo.expr","mstrmojo.Label","mstrmojo.AjaxCall","mstrmojo.HTMLButton","mstrmojo.Container","mstrmojo._HasPopup","mstrmojo.HBox","mstrmojo.Dial","mstrmojo.WidgetDial","mstrmojo.ValidationTextBox","mstrmojo.Calendar","mstrmojo.DateTextBox","mstrmojo.Editor","mstrmojo.ObjectBrowser","mstrmojo.ElementsBrowser","mstrmojo.ConditionModel");var C=mstrmojo.css,R=mstrmojo.registry,H=mstrmojo.hash,A=mstrmojo.array,ARR=mstrmojo.Arr,E=mstrmojo.expr,ET=E.ET,DTP=E.DTP,D2FD=E.DTP2FN_DTP,ET2TGT=E.ET2TGT,ET2TP=E.ET2TP,MTP=mstrmojo.meta.TP,STP=mstrmojo.meta.STP,ENC=mstrmojo.string.encodeXMLAttribute;var ET2STEPS={};ET2STEPS[ET.AQ]={target:1,fm:1,fn:1,c0:1,c1:1};ET2STEPS[ET.AL]={target:1,fm:1,fn:1,c0:1};ET2STEPS[ET.AE]={target:1,fm:1,es:1};ET2STEPS[ET.AC]={target:1,fm:1,fm2:1,fm3:1,fn:1,c0:1,c1:1};ET2STEPS[ET.MQ]={target:1,fn:1,c0:1,c1:1,dmy:1};ET2STEPS[ET.MC]=ET2STEPS[ET.MQ];ET2STEPS["*"]={target:1};var ET2FNS={};ET2FNS[ET.MQ]={key:"metricFns",def:E.METRIC_FNS};ET2FNS[ET.MC]={key:"metricFns",def:E.METRIC_FNS};ET2FNS[ET.AQ]={key:"formFns",def:E.FORM_FNS};ET2FNS[ET.AL]={key:"formFns",def:E.FORM_FNS};ET2FNS[ET.AC]={key:"formFns",def:E.FORM_FNS};ET2FNS[ET.AE]={key:"elemFns",def:E.ELEM_FNS};var BrwsTxt={};BrwsTxt[ET.AQ]=mstrmojo.desc(7925,"Select Attribute...");BrwsTxt[ET.AL]=mstrmojo.desc(7926,"Browse...");BrwsTxt[ET.MQ]=mstrmojo.desc(7927,"Select Metric...");BrwsTxt[ET.MC]=mstrmojo.desc(7927,"Select Metric...");BrwsTxt[ET.AC]=mstrmojo.desc(7925,"Select Attribute...");function _toggleSlot(w,s,show){var sty=w[s].style;if(mstrmojo.dom.isFF){sty.overflow="hidden";sty.width=show?"auto":"0px";sty.visibility=show?"inherit":"hidden";}else{sty.display=show?"block":"none";}}function _initSteps(me){var m=me.model,et=m&&m.et,steps=ET2STEPS[et]||ET2STEPS["*"],ch=me.children;for(var i=0,len=ch.length;i<len;++i){var c=ch[i];if(!c.isStep){continue;}var a=c.alias,shw=steps[a];_toggleSlot(me,c.slot,shw);if(shw&&c&&c.update){c.update();}}if(!steps.c1){_toggleSlot(me,"btwnNode",false);}if(!steps.dmy){_toggleSlot(me,"atNode",false);}_updateOkBtn(me);}function _pc(){var p=this.parent,h=((p&&p.cssText)||"").match(/height:\s*(\d*)px/);this.cssText=h&&h[0];}var _dummyTp="dummy",_browseItem={did:"idBrowse",v:"idBrowse",n:mstrmojo.desc(6571,"Browse..."),t:_dummyTp,css:"unselectable link"},_errItem={did:"idErr",v:"idErr",n:mstrmojo.desc(7929,"Error loading data."),t:_dummyTp,css:"unselectable"},_waitItem={did:"idWait",v:"idWait",n:mstrmojo.desc(2901,"Loading..."),t:_dummyTp,css:"unselectable"};function _onchg(evt){if(this.updating){return ;}var ms=this.multiSelect,it=this.selectedItem;if(it&&it[MTP]===_dummyTp){this.updating=true;if(ms){this.removeSelect([this.selectedIndex]);}else{var idx=evt&&evt.removed&&Number(evt.removed[0]);idx=(idx==null)?-1:idx;this.set("selectedIndex",idx);}this.updating=false;if(it===_browseItem){this.parent.browse(this);}}else{var m=this.parent.model;if(ms){var its=this.items;m.edit(this.alias,{added:evt.added&&A.get(its,evt.added),removed:evt.removed&&A.get(its,evt.removed),itemIdField:this.itemIdField});}else{m.edit(this.alias,it);}}}function _replaceItem(w,item,arr){var its=w.items,idx=A.indexOf(its,item);if((idx===0)&&(its.length===1)){arr=mstrmojo.Arr.makeObservable((arr&&arr.length)?arr.concat():[]);w.set("items",arr);}else{if(idx>-1){its.remove(idx,1);}if(arr&&arr.length){its.add(arr,(idx>-1)?idx:null);}}}function _chJson(ps){return H.copy(ps,{scriptClass:"mstrmojo.Dial",slot:ps.alias+"Node",isStep:true,cssClass:"mstrmojo-walkstep mstrmojo-"+ps.alias,itemIdField:"did",itemMarkupFunction:function(item,idx,widget){var n=ENC(item.n);return'<div class="dial-item '+item.css+'" title="'+n+'">'+n+"</div>";},allowUnlistedValues:true,insertUnlistedValuesAt:0,onchange:_onchg,postCreate:_pc});}function _widgetItemFn(item,idx,widget){var c=item.cfg;if(c){c.data=item;c.parent=widget;return R.ref(c);}else{c=new mstrmojo.Label({text:item.n,cssClass:"dial-item"});c.markupMethods.onselectedChange=function(){mstrmojo.css.toggleClass(this.domNode,["selected"],this.selected);};c.data=item;c.parent=widget;return c;}}function fnItem(fn,fnt){var d=fnt+E.FN_SEP+fn;return(fn!=null)?{did:d,n:d}:null;}function _attachModel(me,m){if(m){if(!m.attachEventListener){mstrmojo.requiresCls("mstrmojo.ConditionModel");mstrmojo.hash.make(m,mstrmojo.ConditionModel,{});}m.attachEventListener("edit",me.id,"onmodeledit");}}function _initDmys(me){var AT=E.TP.ATTR,atts=me.targets?A.filter(me.targets,function(item){return item[MTP]===AT;}):[];return atts;}function _detachModel(me,m){if(m&&m.detachEventListener){m.detachEventListener("edit",me.id,"onmodeledit");}}function _updateList(w,show,items,sel){w.updating=true;_toggleSlot(w.parent,w.slot,show);if(show){if(items!=null){w.clearSelect();w.set("items",items);}var f=w.itemIdField,vWas=w.selectedItem;if((vWas&&vWas[f])!=(sel&&sel[f])){w.set("selectedItem",sel);}else{w.center();}}w.updating=false;}function _updateListMultiData(w,items,sel,idxs){w.updating=true;if(items!=null){}w.clearSelect();if(items){w.set("items",items);}if(sel&&sel.length){w.setSelectedItems(sel);}else{if(idxs&&idxs.length){w.select(idxs);}else{w.center();}}w.updating=false;}function _updateListMulti(w,show,items,sel,idxs){_toggleSlot(w.parent,w.slot,show);if(show){_updateListMultiData(w,items,sel,idxs);}}function _shouldShowCst(w,idx){var m=w.model||{},fn=m.fn;return(fn!=null)&&((m.et===ET.MQ)||(m.et===ET.MC)||(m.et===ET.AQ)||(m.et===ET.AL)||(m.et===ET.AC))&&(E.fnCstCount(fn,m.fnt)>idx);}var isDATE={};isDATE[DTP.DATE]=1;isDATE[DTP.TIME]=1;isDATE[DTP.TIMESTAMP]=1;var $f=mstrmojo.array.find;function _missed(arr1,arr2,p){var m=[],len=arr1.length;for(var i=0;i<len;i++){if($f(arr2,p,arr1[i][p])<0){m.push(arr1[i]);}}return m;}function _updateCstList(me,p,show){var lim=me.targetsLastMod,plim=p.targetsLastMod,m=p.model,ltid=me._lastTargetId,idf=p.target.itemIdField,tid=m&&m[ET2TGT[m.et]]&&m[ET2TGT[m.et]][idf],tfm=m&&m.fm,dtp=tfm&&tfm.dtp,fnc=E.fn_AC_MC(m&&m.fn),dirty=false;if(!lim||!plim||(lim!=plim)||ltid!==tid){me.targetsLastMod=p.targetsLastMod;dirty=true;}else{if(this.lastFmDtp!==dtp){this.lastFmDtp=dtp;dirty=true;}else{if(this.lastFnTp!==fnc){this.lastFnTp=fnc;dirty=true;}}}if(dirty){if(!fnc){me.clearSelect();me.set("items",me.items.slice(0,me.preLen));}else{var ok=_okCstTypes(m);var fil=p.targets?A.filter(p.targets,function(item){return ok[item[MTP]]||ok[item[STP]];}):[];var slice=me.items.slice(me.preLen),f=me.itemIdField,removed=_missed(slice,fil,f),added=_missed(fil,slice,f);for(var i=0,len=removed&&removed.length||0;i<len;i++){me.remove(removed[i]);}if(added&&added.length>0){me.add(added,-1);}}me._lastTargetId=tid;}}function _updateCst(me,idx){me.updating=true;var p=me.parent,show=_shouldShowCst(p,idx),sel;_toggleSlot(me.parent,me.slot,show);if(show){var m=p.model||{},cs=m.cs,c=cs&&cs[idx],v=c&&c.v,dtp;_updateCstList(me,p,show);switch(m.et){case ET.MQ:case ET.MC:dtp=E.METRIC_DTP;break;case ET.AQ:case ET.AC:case ET.AE:dtp=m.fm&&m.fm.dtp;break;case ET.AL:dtp=m.fm&&m.fm.dtp;v=[];for(var i=0,len=cs&&cs.length;i<len;i++){v.push(cs[i].v);}v=v.join(mstrConfig.listSep);break;}dtp=dtp||DTP.CHAR;var isLF=E.fn_List(m.fn,m.fnt),isD=isDATE[dtp],isC=isD&&!isLF;var cx=me.ctxtBuilder,iws=cx&&cx.itemWidgets,si=isD?(isC?me.calIndex:me.dtxtIndex):me.txtIndex,ib=iws&&iws[me.bwIndex],iw;for(var i=0,len=me.preLen-1;i<len;i++){iw=iws[i];if(i==si){iw.set("dtp",dtp);iw.set("isList",isLF);iw.set("value",v);iw.set("visible",true);try{iw.focus&&iw.focus();}catch(x){}if(iw.clearValidation){iw.clearValidation();}}else{iw.set("visible",false);}if(isLF){iw.set("tooltip",mstrmojo.desc(8191,"value1## value2## ...## valueN").replace(/##/g,mstrApp.listSep));}else{iw.set("tooltip","");}}if(ib){ib.set("text",BrwsTxt[m.et]);ib.set("visible",E.fn_AC_MC(m&&m.fn));}switch(m.et){case ET.AQ:case ET.AL:case ET.MQ:if(c&&c.p){me.set("selectedItem",c.p);}else{me.set("selectedIndex",si);}break;case ET.MC:case ET.AC:me.set("selectedItem",m[ET2TGT[m.et]+(2+idx)]);break;}}_toggleSlot(p,"btwnNode",show);me.refreshScroll();me.updating=false;}function _onCstChg(evt){var d=this.parent,w=d.parent,v=(this.isValid&&this.isValid())||(!this.isValid&&!mstrmojo.string.isEmpty(this.value)),m=w.model;w["invalid"+d.cstIndex]=!v;if(!this.updating&&v){this.updating=true;if(m){m.edit(d.alias,{v:this.value,dtp:this.dtp});}this.updating=false;}_updateOkBtn(w);}function _updateOkBtn(me){var valid=true,m=me.model;if(!m){return ;}switch(m.et){case ET.AQ:case ET.AL:case ET.MQ:for(var i=0,ct=E.fnCstCount(m.fn,m.fnt);i<ct;i++){valid=valid&&!me["invalid"+i];}break;}valid=valid&&!!m.completed;me.okBtn.set("enabled",valid);return ;}function _clearInvalid(){var d=this.parent,w=d.parent;w["invalid"+d.cstIndex]=false;}function _cstJson(ps){return _chJson(H.copy(ps,{scriptClass:"mstrmojo.WidgetDial",makeObservable:true,itemFunction:_widgetItemFn,selectionPolicy:"reselect",items:[{did:0,cfg:{scriptClass:"mstrmojo.ValidationTextBox",required:true,constraints:{trigger:mstrmojo.validation.TRIGGER.ALL},onValid:_onCstChg,onInvalid:_onCstChg,onClearValidation:_clearInvalid,size:6,cssText:"text-align:right",visible:false}},{did:1,cfg:{scriptClass:"mstrmojo.Calendar",onvalueChange:_onCstChg,visible:false}},{did:2,cfg:{scriptClass:"mstrmojo.DateTextBox",required:true,constraints:{trigger:mstrmojo.validation.TRIGGER.ALL},onValid:_onCstChg,onInvalid:_onCstChg,onClearValidation:_clearInvalid,calendarToBody:true,calConfig:{onmousedown:function(evt){mstrmojo.dom.stopPropogation(evt.hWin,evt.e);}},visible:false}},{did:3,t:_dummyTp,cfg:{scriptClass:"mstrmojo.Label",cssClass:"dial-item link",text:"Browse...",onclick:function(){this.parent.parent.browse(this.parent);},visible:false}}],txtIndex:0,calIndex:1,dtxtIndex:2,bwIndex:3,preLen:4,insertUnlistedValuesAt:-1,update:function(){_updateCst(this,this.cstIndex);}}));}function _fmJson(ps){return _chJson(H.copy(ps,{insertUnlistedValuesAt:-1,postCreate:function(){_pc.apply(this,[]);this.ajx=mstrmojo.insert({parent:this,scriptClass:"mstrmojo.AjaxCall",isTask:true,readCache:true,writeCache:true,params:{taskId:"getAttributeForms",attributeId:null,displayedForms:"0",styleName:"MojoAttributeStyle"},onsuccess:function(){var p=this.parent,m=p&&p.parent&&p.parent.model,rs=this.response;if((rs&&rs.did)!==p.lastAttrId){return ;}var fms=rs.fms||[],sel=p.selectedItem;fms=A.filter(fms,function(item){return(!item.icf);});if(sel){var idx=A.find(fms,p.itemIdField,sel[p.itemIdField]);if(idx>-1){fms=fms.concat();fms.splice(idx,1);}}_replaceItem(p,_waitItem,fms);var its=p.items,len=its.length;if(len===1){p.singleSelect(0);}},onerr:function(){_replaceItem(this.parent,_waitItem,[_errItem]);}});},update:function(){var pstf=this.fmPost,p=this.parent,m=p.model,t=m&&m["a"+pstf],show=!!t,fms,fm,tfm=m&&m.tfm,dtp=tfm&&tfm.dtp,ajx;if(show){switch(m.et){case ET.AQ:case ET.AL:fm=m.fm;break;case ET.AC:fm=m["fm"+pstf];break;case ET.AE:fm=fnItem(m.fn,1);break;}if(this.lastAttrId!==t.did){this.lastAttrId=t.did;fms=[];if(m.et!==ET.AC){if(!t.ilk&&(!p.ets||p.ets[ET.AE])){var lookin=ET2FNS[ET.AE],key=lookin&&lookin.key;fms=fms.concat((key&&p[key])||lookin.def||[]);}}if(fm&&(m.et!==ET.AE)){fms.push(fm);}ajx=this.ajx;ajx.params.attributeId=t.did;fms.push(_waitItem);ARR.makeObservable(fms);}}_updateList(this,show,fms,fm);if(show&&ajx){if(ajx._delayId){window.clearTimeout(ajx._delayId);delete ajx._delayId;}ajx._delayId=window.setTimeout(function(){delete ajx._delayId;ajx.send();},500);}}}));}var TGT_PPT_STP=[E.STP.PROMPT,E.STP.PROMPT_OBJECTS,E.STP.PROMPT_ELEMENTS,E.STP.PROMPT_EXPRESSION,E.STP.PROMPT_EXPRESSION_DRAFT];function _okTargetTps(ets){var l=ets&&ets.length;if(l){var ok=A.hash(TGT_PPT_STP);for(var i=0;i<l;i++){ok[ET2TP[ets[i]]]=true;}return ok;}return null;}function _okCstTypes(m){var tp=m&&ET2TP[m.et],dtp=m&&m.fm&&m.fm.dtp,stp=dtp&&E.DTP2PROMPT_STP[dtp],ok={};ok[tp]=true;if(stp){ok[stp]=true;}return ok;}function _browseEs(me,ch,p){me.openPopup("eb",{zIndex:me.parent.zIndex+10,left:Math.round(p.x)+"px",top:Math.round(p.y)+"px"});var eb=me.eb.browser,m=me.model,aid=m&&m.a&&m.a.did;if(!aid){return ;}eb.set("attributeID",aid);eb.set("selectedItems",m.es?H.clone(m.es):[]);eb.initBrowser();}function _browseObjs(me,ch,p){me.openPopup("ob",{zIndex:me.parent.zIndex+10,left:Math.round(p.x)+"px",top:Math.round(p.y)+"px"});var ob=me.ob.browser;ob.target=ch;var tps;switch(ch.alias){case"dmy":tps=[E.TP.ATTR,E.TP.DIM];break;case"c0":case"c1":var m=me.model,et=m&&m.et,fm=m&&m.fm,dtp=fm&&fm.dtp||(m.m?E.DTP.DECIMAL:E.DTP.UNKNOWN);tps=(et===ET.MQ||et===ET.MC)?[E.TP.METRIC,E.DTP2PROMPT_STP[dtp]]:[E.TP.ATTR,E.DTP2PROMPT_STP[dtp]];break;default:tps=_okTargetTps(me.ets);tps=tps?H.keyarray(tps,true):[E.TP.ATTR,E.TP.METRIC,E.STP.REPORT_GRID,E.STP.REPORT_GRAPH,E.STP.REPORT_ENGINE,E.STP.REPORT_TEXT,E.STP.REPORT_DATAMART,E.STP.REPORT_BASE,E.STP.REPORT_GRIDGRAPH,E.STP.REPORT_NONINTERACTIVE,E.STP.FILTER].concat(TGT_PPT_STP);}tps[tps.length]=E.TP.FOLDER;ob.browse({folderLinksContextId:m&&(m.et===ET.MQ||m.et===ET.MC)?27:23,onSelectCB:[me,"onOBSelect"],browsableTypes:tps.join(",")});}mstrmojo.ConditionWalk=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasPopup],{scriptClass:"mstrmojo.ConditionWalk",markupString:'<table id="{@id}" class="mstrmojo-walk mstrmojo-ConditionWalk {@cssClass}" style="{@cssText}" cellspacing="0" cellpadding="0" mstrAttach:click><tr><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-notNode"><div class="mstrmojo-walkstep-wrapper"></div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-targetNode"><div class="mstrmojo-walkstep-wrapper"><div class="mstrmojo-walkstep-browse">'+mstrmojo.desc(7926,"Browse...")+'</div></div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-fmNode"><div class="mstrmojo-walkstep-wrapper"></div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-esNode"><div class="mstrmojo-walkstep-wrapper"><div class="mstrmojo-walkstep-browse">'+mstrmojo.desc(7928,"Browse elements...")+'</div></div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-fnNode"><div class="mstrmojo-walkstep-wrapper"></div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-c0Node"><div class="mstrmojo-walkstep-wrapper"></div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-fm2Node"><div class="mstrmojo-walkstep-wrapper"></div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-btwnNode"><div class="mstrmojo-walkstep-wrapper">{@betweenText}</div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-c1Node"><div class="mstrmojo-walkstep-wrapper"></div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-fm3Node"><div class="mstrmojo-walkstep-wrapper"></div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-atNode"><div class="mstrmojo-walkstep-wrapper">{@atText}</div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-dmyNode"><div class="mstrmojo-walkstep-wrapper"><div class="mstrmojo-walkstep-browse">'+mstrmojo.desc(7925,"Select Attribute...")+'</div></div></td><td class="mstrmojo-walkcell mstrmojo-ConditionWalk-okNode"><div class="mstrmojo-walkstep-wrapper"><div></div></td></tr></table>',markupSlots:{notNode:function(){return this.domNode.rows[0].cells[0].firstChild;},targetNode:function(){return this.domNode.rows[0].cells[1].firstChild;},fmNode:function(){return this.domNode.rows[0].cells[2].firstChild;},esNode:function(){return this.domNode.rows[0].cells[3].firstChild;},fnNode:function(){return this.domNode.rows[0].cells[4].firstChild;},c0Node:function(){return this.domNode.rows[0].cells[5].firstChild;},fm2Node:function(){return this.domNode.rows[0].cells[6].firstChild;},btwnNode:function(){return this.domNode.rows[0].cells[7].firstChild;},c1Node:function(){return this.domNode.rows[0].cells[8].firstChild;},fm3Node:function(){return this.domNode.rows[0].cells[9].firstChild;},atNode:function(){return this.domNode.rows[0].cells[10].firstChild;},dmyNode:function(){return this.domNode.rows[0].cells[11].firstChild;},okNode:function(){return this.domNode.rows[0].cells[12].firstChild;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?C.DISPLAY_TABLE:"none";}},children:[_chJson({alias:"target",insertUnlistedValuesAt:0,makeObservable:true,hideIfEmpty:true,update:function(){var p=this.parent,m=p.model;if(this.lastModel!==m){this.lastModel=m;var tgs=p.targets,ets=p.ets;if(ets&&tgs&&tgs.length){var ok=_okTargetTps(p.ets);tgs=A.filter(tgs,function(item){return ok[item[MTP]];});}else{tgs=tgs?tgs.concat():[];}var et=m&&m.et,t=m&&m[ET2TGT[et]];_updateList(this,true,tgs,t);}}}),_fmJson({alias:"fm",fmPost:"",filter:false}),_chJson({alias:"es",itemIdField:"v",insertUnlistedValuesAt:0,makeObservable:true,itemMarkupFunction:function(item,idx,widget){var n=ENC(item.n);return'<div class="dial-checkitem '+item.css+'" title="'+n+'">'+n+"</div>";},multiSelect:true,selectionPolicy:"toggle",postCreate:function pces(){_pc.apply(this,[]);this.ajx=mstrmojo.insert({parent:this,scriptClass:"mstrmojo.AjaxCall",isTask:true,params:{taskId:"browseElements",attributeId:null,styleName:"MojoAttributeStyle",blockBegin:1,blockCount:mstrApp.elementsBlockCount||30},onsuccess:function(){var p=this.parent,rs=this.response;if((rs&&rs.did)!==p.lastAttrId){return ;}var its=(rs&&rs.es)?rs.es.concat():[];_updateListMultiData(p,its,p.parent.model&&p.parent.model.es,null);},onerr:function(){_replaceItem(this.parent,_waitItem,[_errItem]);}});},update:function udes(){var p=this.parent,m=p.model,a=m&&m.a,show=!!a&&!a.ilk,es,sel,idxs,ajx;if(show){if(this.lastAttrId!==a.did){this.lastAttrId=a.did;es=m.es;var len=es&&es.length;es=len?es.concat():[];es.push(_waitItem);if(len){idxs=[];for(var i=1;i<=len;i++){idxs[i]=i;}}ajx=this.ajx;ajx.params.attributeId=a.did;}else{sel=m.es;}}_updateListMulti(this,show,es,sel,idxs);if(show&&ajx){ajx.send();}}}),_chJson({alias:"fn",allowUnlistedValues:false,update:function(){var p=this.parent,m=p.model||{},et=m.et,dtp,show=false,fns,sel;switch(et){case ET.AE:show=!!m.a;break;case ET.AQ:case ET.AC:case ET.AL:show=!!(m.fm&&m.fm.did);dtp=show?m.fm.dtp:null;break;case ET.MQ:case ET.MC:show=!!m.m;dtp=show?E.METRIC_DTP:null;break;}if(show){var fndtp=D2FD[dtp];if((this.lastEt!==et)||(this.lastFnDtp!==fndtp)){this.lastEt=et;this.lastFnDtp=fndtp;var lookin=et?ET2FNS[et]:null,k=lookin&&lookin.key;fns=(k&&p[k])||lookin.def||[];if(typeof (fns)==="object"){fns=fns[fndtp]||fns["*"];}}sel=fnItem(m.fn,m.fnt||1);}_updateList(this,show,fns,sel);}}),_cstJson({alias:"c0",cstIndex:0}),_fmJson({alias:"fm2",fmPost:"2"}),_cstJson({alias:"c1",cstIndex:1}),_fmJson({alias:"fm3",fmPost:"3"}),_chJson({alias:"dmy",itemIdField:"did",hideIfEmpty:true,itemMarkupFunction:function(item,idx,widget){var n=ENC(item.n);return'<div class="dial-checkitem '+item.css+'" title="'+n+'">'+n+"</div>";},multiSelect:true,selectionPolicy:"toggle",insertUnlistedValuesAt:0,makeObservable:true,postCreate:function(){_pc.apply(this,[]);this.set("items",_initDmys(this.parent));},update:function uddmy(){var p=this.parent,m=p.model,et=m.et,t=m&&m.m,show=!!t&&(m.fn!==null)&&((et===ET.MQ)||(et===ET.MC)),its,sel;if(show){var lim=this.targetsLastMod,plim=p.targetsLastMod;if(!lim||!plim||(lim!=plim)){this.targetsLastMod=p.targetsLastMod;its=_initDmys(p);}sel=[];var uts=m.dmy&&m.dmy.uts;for(var u=0,uLen=(uts&&uts.length)||0;u<uLen;u++){var ut=uts[u];sel.push(ut.utgt?ut.utgt:ut);}}_updateListMulti(this,show,its,sel);_toggleSlot(p,"atNode",show);}}),{alias:"okBtn",slot:"okNode",scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",text:mstrmojo.desc(1442,"OK"),cssText:"width:66px;min-width:58px;",onclick:function(){var p=this.parent;if(p.onOK){p.onOK();}}},{alias:"cancelBtn",slot:"okNode",scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",cssText:"width:66px;min-width:58px;",text:mstrmojo.desc(221,"Cancel"),onclick:function(){var p=this.parent.parent;if(p&&p.close){p.close();}}}],eb:{scriptClass:"mstrmojo.Editor",cssClass:mstr.utils.ISIE7?"mstrmojo-ElementsEditorIE7":"mstrmojo-ElementsEditor",title:mstrmojo.desc(6149,"Select Elements"),help:"element_browser_dialog_box.htm",children:[{scriptClass:"mstrmojo.ElementsBrowser",alias:"browser"},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBox",slot:"buttonNode",children:[{scriptClass:"mstrmojo.HTMLButton",alias:"ok",text:mstrmojo.desc(1442,"OK"),cssClass:"mstrmojo-Editor-button",cssText:"width:72px;margin-right:2px;",onclick:function(){var editor=this.parent.parent,o=editor&&editor.opener;if(o){o.onEBSelect();o.closePopup();}}}]}]},ob:{scriptClass:"mstrmojo.Editor",title:mstrmojo.desc(5298,"Select an Object"),help:"Select_Objects_dialog_box_.htm",children:[{scriptClass:"mstrmojo.ObjectBrowser",alias:"browser",cssText:"width:200px;",fishEyeVisible:false,closeable:false,closeOnSelect:false,browsableTypes:"3,4,8,10,12,256",includeObjectDesc:true,quickSearch:true}]},betweenText:mstrmojo.desc(308,"and"),atText:mstrmojo.desc(5923,"at"),model:null,targets:null,ets:null,defaultEt:null,defaultAttrEt:null,metricFns:null,formFns:null,elemFns:null,metricLevels:null,defaultMetricLevel:null,postBuildRendering:function pstBR(){_attachModel(this,this.model);_initSteps(this);return this._super();},_set_model:function setm(n,v){var vWas=this.model,chg=(v!==vWas);if(chg){_detachModel(this,vWas);this.model=v;_attachModel(this,v);if(this.hasRendered){_initSteps(this);}}return chg;},onmodeledit:function(evt){switch(evt&&evt.prop){case"es":case"dmy":_updateOkBtn(this);return ;}_initSteps(this);},browse:function bws(ch){var prn=this.parent.editorNode,pos=function(el,pr){var pl=mstrmojo.dom.position(el,true),pt=mstrmojo.dom.position(pr,true);return{x:pl.x+pl.w,y:pt.y};};switch(ch&&ch.alias){case"target":case"dmy":_browseObjs(this,ch,pos(ch.alias=="target"?this.targetNode:this.dmyNode,prn));break;case"c0":case"c1":_browseObjs(this,ch,pos(ch.alias=="c0"?this.c0Node:this.c1Node,prn));break;case"es":_browseEs(this,ch,pos(this.esNode,prn));break;}},onOBSelect:function(item){var ob=this.ob.browser,op=ob.target;this.closePopup();var f=op.itemIdField,ts=this.targets||[],idx=A.find(this.targets,f,item[f]);if(idx===-1){ts.push(item);this.targets=ts;this.targetsLastMod=new Date();}op.setSelectedItems([item],op.multiSelect);op.refreshScroll();},onEBSelect:function(){var eb=this.eb.browser;var es=this.es;es.set("selectedIndices",{});es.setSelectedItems(eb.selectedItems,false);},onclick:function onclick(evt){var t=mstrmojo.dom.eventTarget(evt.hWin,evt.e);if(t==this.targetNode.firstChild){this.browse(this.target);}else{if(t==this.esNode.firstChild){this.browse(this.es);}else{if(t==this.dmyNode.firstChild){this.browse(this.dmy);}}}}});})();