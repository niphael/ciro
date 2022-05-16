(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.Container","mstrmojo._FormatDefinition","mstrmojo.CheckBox");var _H=mstrmojo.hash,_FD=mstrmojo._FormatDefinition;var createDecimalBox=function(ps){return mstrmojo.hash.copy(ps,{scriptClass:"mstrmojo.TextBox",alias:"decimalPlaces",bindings:{m:ps.modelBinding,value:function(){return this.m.DecimalPlaces||"2";},category:function(){var category=this.m.Category;this.onkeyup();}},onkeyup:function(evt){if(/^\d{1,2}$/.test(this.value)){var was=this.m.DecimalPlaces,v=this.value;this.m.DecimalPlaces=v;if(was!=v&&this.negative){var negative=this.parent[this.negative],itms;if(negative&&negative.refreshFormatList){negative.refreshFormatList();}else{itms=mstrmojo.hash.clone(_FD[this.negative]);if(itms){var digits=v>0?".":"",zeros=digits;for(var i=0;i<Math.min(v,_FD.MaxNegativeDidigts);i++){digits+=i%9;zeros+="0";}for(i=0;i<itms.length;i++){itms[i].n=itms[i].n.replace(/\.\d{2}/g,digits);itms[i].f=itms[i].f.replace(/\.\d{2}/g,zeros);}negative.set("items",itms);}}}}}});},createNegativeList=function(ps){return mstrmojo.hash.copy(ps,{scriptClass:"mstrmojo.List",cssClass:"mstrmojo-FormatEditor-numberFormatList",itemMarkupFunction:function(item,idx,widget){var color=item.r?"color: red":"";return'<div class="mstrmojo-FormatEditor-bullet"><div class="mstrmojo-text" style="'+color+'">'+item.n+"</div></div>";},selectionPolicy:"reselect",bindings:{m:ps.modelBinding,selectedIndex:function(){var idx=mstrmojo.array.find(this.items,"v",this.m.NegativeNumbers);if(idx===-1){idx=mstrmojo.array.find(this.items,"f",this.m.Format);}this.singleSelect(idx);return idx==-1?3:idx;},category:function(){var category=this.m.Category;this.onchange();}},onchange:function(evt){if(this.parent.idx==mstrmojo.array.find(_FD.Category,"v",this.m.Category)&&this.selectedItem){this.m.NegativeNumbers=this.selectedItem.v;this.m.set("Format",this.selectedItem.f||this.selectedItem.v);}},onmChange:function(evt){if(this.m){var d=this.m.DecimalPlaces;if(d!=2){var itms=mstrmojo.hash.clone(_FD[this.alias]);if(itms){var digits=d>0?".":"",zeros=digits;for(var i=0;i<Math.min(d,_FD.MaxNegativeDidigts);i++){digits+=i%9;zeros+="0";}for(var i=0;i<itms.length;i++){itms[i].n=itms[i].n.replace(/\.\d{2}/g,digits);itms[i].f=itms[i].f.replace(/\.\d{2}/g,zeros);}this.set("items",itms);}}}},postCreate:function(){this.onmChange();}});},createNumberFormatList=function(ps){return mstrmojo.hash.copy(ps,{scriptClass:"mstrmojo.List",cssClass:"mstrmojo-FormatEditor-numberFormatList "+ps.alias,itemMarkupFunction:function(item,idx,widget){return'<div class="mstrmojo-FormatEditor-bullet"><div class="mstrmojo-text">'+item.n+"</div></div>";},selectedIndex:0,bindings:{m:ps.modelBinding,selectedIndex:function(evt){var idx=mstrmojo.array.find(this.items,"v",this.m.Format);return idx===-1?0:idx;},category:function(){var category=this.m.Category;this.onchange();}},onchange:function(evt){if(this.parent.idx==mstrmojo.array.find(_FD.Category,"v",this.m.Category)){this.m.set("Format",this.selectedItem.f||this.selectedItem.v);}}});};mstrmojo.NumberFormatter=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.NumberFormatter",cssClass:"mstrmojo-NumberFormatter",markupString:'<div id={@id} class="{@cssClass}" style="{@cssText}"></div>',markupSlots:{containerNode:function(){return this.domNode;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},postCreate:function(){this.onmodelChange();},onmodelChange:function(){if(this.model&&!this.model.scriptClass){_H.make(this.model,mstrmojo.Obj);}},children:[{scriptClass:"mstrmojo.Table",layout:[{cells:[{colSpan:2}]},{cells:[{},{}]}],children:[{slot:"0,0",scriptClass:"mstrmojo.Label",text:mstrmojo.desc(7940),cssClass:"category",cssText:"font-weight: bold"},{slot:"1,0",scriptClass:"mstrmojo.List",alias:"numberCategory",cssClass:"mstrmojo-FormatEditor-numberCategory",items:_FD.Category,selectionPolicy:"reselect",bindings:{m:"this.parent.parent.model",selectedIndex:function(){var cat=this.m.Category,idx=mstrmojo.array.find(this.items,"v",(cat==="pru"?-2:cat));return(idx==-1)?0:idx;}},onchange:function(evt){if(this.m){this.m.set("Category",this.selectedIndex===0?"pru":this.selectedItem.v);}}},{slot:"1,1",scriptClass:"mstrmojo.Container",alias:"numberSubpanelContainer",width:"300px",markupString:'<div id={@id} class="mstrmojo-FormatEditor-numberPanel-subpanel {@cssClass}"><div class="mstrmojo-FormatEditor-numberPanel-subpanel-container"></div></div>',markupSlots:{containerNode:function(){return this.domNode.firstChild;}},postBuildRendering:function(){var ret=mstrmojo.Container.prototype.postBuildRendering.apply(this);this.parent.numberCategory.singleSelect(this.parent.numberCategory.selectedIndex);return ret;},children:[{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-FormatEditor-numberPanel-subpanel-item",idx:0,rows:1,cols:1,children:[{scriptClass:"mstrmojo.Label",text:"&nbsp;",slot:"0,0"}],bindings:{visible:'this.parent.parent.parent.model.Category=="pru"',category:function(){var m=this.parent.parent.parent.model,cat=this.parent.parent.parent.model.Category;if(m&&this.idx==mstrmojo.array.find(_FD.Category,"v",cat)){m.set("Format","");}}}},{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-FormatEditor-numberPanel-subpanel-item",idx:1,rows:1,cols:1,children:[{scriptClass:"mstrmojo.Label",text:"&nbsp;",slot:"0,0"}],bindings:{visible:"this.parent.parent.parent.model.Category==9",category:function(){var m=this.parent.parent.parent.model,cat=this.parent.parent.parent.model.Category;if(m&&this.idx==mstrmojo.array.find(_FD.Category,"v",cat)){m.set("Format","");}}}},{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-FormatEditor-numberPanel-subpanel-item fixed",idx:2,rows:3,cols:2,layout:[{cells:[{},{}]},{cells:[{},{}]},{cells:[{colSpan:2}]}],bindings:{visible:"this.parent.parent.parent.model.Category==0"},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2046),slot:"0,0"},createDecimalBox({modelBinding:"this.parent.parent.parent.parent.model",negative:"FixedNegative",alias:"FixedDecimalPlaces",slot:"0,1"}),{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2044),slot:"1,0"},createNegativeList({modelBinding:"this.parent.parent.parent.parent.model",items:_FD.FixedNegative,refreshFormatList:function(){var p=this.parent,fdp=p&&p.FixedDecimalPlaces,ts=p&&p.ThousandSeparator;if(!fdp||!ts){return ;}var cd=fdp.value||0,itms=mstrmojo.hash.clone(_FD.FixedNegative),uts=ts.checked,dgs=cd>0?".":"",zrs=dgs,ns;for(var d=0,len=Math.min(cd,_FD.MaxNegativeDidigts);d<len;d++){dgs+=d%9;zrs+="0";}for(var i=0;i<itms.length;i++){ns=itms[i].n.replace(/\.\d{2}/g,dgs);if(!uts){ns=ns.replace("1,234","1234");}itms[i].n=ns;ns=itms[i].f.replace(/\.\d{2}/g,zrs);if(!uts){ns=ns.replace(/#,##/g,"###");}itms[i].f=ns;}this.set("items",itms);},alias:"FixedNegative",slot:"1,1"}),{scriptClass:"mstrmojo.ImageCheckBox",alias:"ThousandSeparator",label:mstrmojo.desc(2049),cssText:"width:auto;",bindings:{m:"this.parent.parent.parent.parent.model",checked:function(){var ts=this.m.ThousandSeparator;if(ts==null){ts=-1;}return parseInt(ts,10)!==0;}},oncheckedChange:function(){if(this.m&&this.parent.idx==mstrmojo.array.find(_FD.Category,"v",this.m.Category)){this.m.ThousandSeparator=this.checked?-1:0;this.parent.FixedNegative.refreshFormatList();}},slot:"2,0"}]},{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-FormatEditor-numberPanel-subpanel-item currency",idx:3,rows:4,cols:2,bindings:{visible:"this.parent.parent.parent.model.Category==1"},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2046),slot:"0,0"},createDecimalBox({modelBinding:"this.parent.parent.parent.parent.model",negative:"CurrencyNegative",alias:"currencyDecimal",slot:"0,1"}),{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2047),slot:"1,0"},{scriptClass:"mstrmojo.TextBox",alias:"currencySymbol",maxLength:5,bindings:{m:"this.parent.parent.parent.parent.model",value:function(){return this.m.CurrencySymbol||mstrmojo.desc("2369");},category:function(){var category=this.m.Category;this.onkeyup();}},onkeyup:function(evt){this._update();},onvalueChange:function(){this._update();},_update:function(){if(this.m){var was=this.m.CurrencySymbol;this.m.CurrencySymbol=this.value;var negative=this.parent.CurrencyNegative;if(negative&&(was!=this.value)){negative.refreshFormatList();}}},slot:"1,1"},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2048),slot:"2,0"},{scriptClass:"mstrmojo.List",cssClass:"mstrmojo-FormatEditor-numberFormatList",alias:"CurrencyPosition",items:_FD.CurrencyPosition,itemMarkupFunction:function(item,idx,widget){return'<div class="mstrmojo-FormatEditor-bullet"><div class="mstrmojo-text">'+item.n+"</div></div>";},bindings:{m:"this.parent.parent.parent.parent.model",selectedIndex:function(){var idx=mstrmojo.array.find(_FD.CurrencyPosition,"v",this.m.CurrencyPosition);return(idx==-1?0:idx);},category:function(){var category=this.m.Category;this.onchange();}},onchange:function(evt){if(this.m){this.m.CurrencyPosition=this.selectedItem.v;var negative=this.parent.CurrencyNegative;if(negative){negative.refreshFormatList();}}},slot:"2,1"},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2044),slot:"3,0"},createNegativeList({modelBinding:"this.parent.parent.parent.parent.model",items:_FD.CurrencyNegative,refreshFormatList:function(){var p=this.parent,cdt=p&&p.currencyDecimal,cpl=p&&p.CurrencyPosition,cst=p&&p.currencySymbol;if(!cdt||!cpl||!cst){return ;}var cd=cdt.value||0,cp=cpl.selectedIndex||0,cs=cst.value||"",cs=(cp==2?cs+" ":(cp==3?" "+cs:cs)),itms=mstrmojo.hash.clone(_FD.CurrencyNegative),dgs=cd>0?".":"",zrs=dgs,fa;for(var d=0,len=Math.min(cd,_FD.MaxNegativeDidigts);d<len;d++){dgs+=d%9;zrs+="0";}var dp=mstrConfig.decimalSep,ts=mstrConfig.thousandsSep;for(var i=0;i<itms.length;i++){var n=itms[i].n,f=itms[i].f;if(cp==1||cp==3){fa=f.split(";");for(var j=0,len=fa.length;j<len;j++){fa[j]=fa[j].replace(/(\"\$\")(.*)/g,"$2$1");}n=n.replace(/(\$)(.*)/g,"$2$1");f=fa.join(";");}n=n.replace(/\$/g,cs).replace(/\.\d{2}/g,dgs);f=f.replace(/\$/g,cs).replace(/\.\d{2}/g,zrs);itms[i].n=n.replace(/,/,ts).replace(/(\d{2,3})\./,"$1"+dp);itms[i].f=f.replace(/,/,ts).replace(/(\d{2,3})\./,"$1"+dp);}this.set("items",itms);},alias:"CurrencyNegative",slot:"3,1"})]},{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-FormatEditor-numberPanel-subpanel-item Date",idx:4,rows:1,cols:2,bindings:{visible:"this.parent.parent.parent.model.Category==2"},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2869),slot:"0,0"},createNumberFormatList({modelBinding:"this.parent.parent.parent.parent.model",items:_FD.Date,alias:"Date",slot:"0,1"})]},{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-FormatEditor-numberPanel-subpanel-item Time",idx:5,rows:1,cols:2,bindings:{visible:"this.parent.parent.parent.model.Category==3"},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2869),slot:"0,0"},createNumberFormatList({modelBinding:"this.parent.parent.parent.parent.model",items:_FD.Time,alias:"Time",slot:"0,1"})]},{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-FormatEditor-numberPanel-subpanel-item percentage",idx:6,rows:2,cols:2,bindings:{visible:"this.parent.parent.parent.model.Category==4"},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2046),slot:"0,0"},createDecimalBox({modelBinding:"this.parent.parent.parent.parent.model",negative:"PercentNegative",slot:"0,1"}),{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2044),slot:"1,0"},createNegativeList({modelBinding:"this.parent.parent.parent.parent.model",items:_FD.PercentNegative,alias:"PercentNegative",slot:"1,1"})]},{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-FormatEditor-numberPanel-subpanel-item Fraction",idx:7,rows:1,cols:2,bindings:{visible:"this.parent.parent.parent.model.Category==5"},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2869),slot:"0,0"},createNumberFormatList({modelBinding:"this.parent.parent.parent.parent.model",items:_FD.Fraction,alias:"Fraction",slot:"0,1"})]},{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-FormatEditor-numberPanel-subpanel-item scientific",idx:8,rows:1,cols:2,children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2046),slot:"0,0"},createDecimalBox({slot:"0,1",modelBinding:"this.parent.parent.parent.parent.model"})],bindings:{m:"this.parent.parent.parent.model",visible:"this.m.Category==6",category:function(){if(this.m&&this.idx==mstrmojo.array.find(_FD.Category,"v",this.m.Category)){this.m.set("Format","0.00E+00");}}}},{scriptClass:"mstrmojo.Table",cssClass:"mstrmojo-FormatEditor-numberPanel-subpanel-item custom",idx:9,rows:1,cols:2,bindings:{visible:"this.parent.parent.parent.model.Category==7"},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(2133),slot:"0,0"},{scriptClass:"mstrmojo.TextBox",alias:"custom",value:"",bindings:{m:"this.parent.parent.parent.parent.model",value:function(){return this.m.Format;}},onvalueChange:function(){if(this.m&&this.parent.idx==mstrmojo.array.find(_FD.Category,"v",this.m.Category)){this.m.Format=this.value;}},slot:"0,1"}]}]}]}]});})();