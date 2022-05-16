(function(){var prevWidth,prevHeight;mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.DocPortlet");var FMTS={top:"top",left:"left","z-index":"zIndex",width:"width",height:"height"};mstrmojo.Vis=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.Vis",offsetTop:0,offsetLeft:0,isAndroid:window.navigator.userAgent.indexOf("Android")!=-1,updated:false,reRenderOnDimensionChg:true,getFormats:function(){return this.fmts;},isVis:function(){return true;},setModel:function setModel(model){this.set("model",model);if(model.data){this.set("model",model.data);}this.xtabModel=model;if(typeof (this.controller.getPageByTree)!="undefined"){this.controller.getPageByTree(false);}},destroy:function destroy(){this._super();var xtab=this.xtabModel;if(xtab&&xtab.destroy){xtab.destroy();delete this.xtabModel;}},setDimensions:function setDimensions(h,w){var dimensionChanged=this._super(h,w);if(dimensionChanged&&this.hasRendered&&this.reRenderOnDimensionChg){this.reRender();}return dimensionChanged;},reRender:function reRender(){this.unrender();this.render();},getWidth:function getWidth(){return parseInt(this.width,10);},getHeight:function getHeight(){return parseInt(this.height,10);},buildRendering:function bldRn(){if(!this.updated){this.update();}if(this.parent instanceof mstrmojo.DocPortlet){delete this.left;delete this.top;this.height=this.fmts&&this.fmts.height;}this._super();},postBuildRendering:function postBR(){prevWidth=this.width;prevHeight=this.height;this.adjustWidgetOffsets();this._super();},adjustWidgetOffsets:function adjustWidgetOffsets(){var dn=this.domNode,offset={top:0,left:0};if(typeof (mstr)!="undefined"){offset.top=mstr.utils.BoxModel.getElementSumOffsetTop(dn);offset.left=mstr.utils.BoxModel.getElementSumOffsetLeft(dn);}else{if(typeof (mstrmojo)!="undefined"){offset=mstrmojo.boxmodel.offset(dn);}}this.offsetTop=offset.top;this.offsetLeft=offset.left;},initFromVisProps:function initFromVisProps(vp){},update:function update(node){node=node||this.node;if(node){if(node.data){this.set("model",node.data);if(this.xtabModel&&this.xtabModel.set){this.xtabModel.set("data",node.data);}this.model=node.data;if(this.model.layoutModel){this.layoutModel=this.model.layoutModel;}if(this.model.layoutNode){this.layoutNode=this.model.layoutNode;}mstrmojo.hash.copy(node.data.extProps,this);}this.fmts=node.defn.fmts||node.defn.units[this.model.k].fmts;var fmts=this.fmts;if(fmts){for(var k in FMTS){v=FMTS[k];if(k in fmts){this[v]=fmts[k];}}}}if(this.model){this.initFromVisProps(this.model.vp);}this.updated=true;},getModel:function getModel(k){if(k){var m=mstrmojo.Vis.getVisGrid(this.layoutModel,this.layoutNode,k);if(m){return m.data;}else{alert(mstrmojo.desc(8427,"Incorrect visualization properties encountered.  Data may be inconsistent.  Please reset your properties."));}}else{return this.model;}},getDataParser:function getDataParser(key){return new mstrmojo.Vis.DataParser(this.getModel(key));},renderErrorMessage:function renderErrorMessage(msg){this.domNode.innerHTML='<div class="mstrmojo-message">'+msg+"</div>";},getMessageID:function getMessageID(){return this.model.mid&&this.model.mid||this.xtabModel&&this.xtabModel.docModel&&this.xtabModel.docModel.mid;},hasNoninfowindowTarget:function hasNoninfowindowTarget(actionObj){var xtabModel=this.xtabModel,docModel=(xtabModel&&xtabModel.docModel);var result=false;if(docModel){var layouts=docModel.defn&&docModel.defn.layouts,layout=null;var i;if(layouts){for(i in layouts){if(layouts[i].loaded){layout=layouts[i];break;}}}var units=layout&&layout.units;this.selectorTargets={};if(units&&actionObj.scObjList){for(var i=0;i<actionObj.scObjList.length;i++){var scObj=actionObj.scObjList[i];var tksList=scObj.sc.tks.split("\x1E");for(var j=0;j<tksList.length;j++){var unit=units[tksList[j]];if(unit){this.selectorTargets[tksList[j]]=unit;if(!this.isChildOfIfw(units,unit)){result=true;}}}}}}return result;},isChildOfIfw:function isChildOfIfw(units,unit){while(unit){if(unit.ifw){return true;}unit=units[unit.pnk];}return false;},performAction:function performAction(actionObj){var action=this.xtabModel.getAction(actionObj),handler=action&&action.h;if(handler&&this.controller[handler]){this.controller[handler](this,action.a);return true;}return false;}});mstrmojo.Vis.getVisGrid=function(m,n,k){var origN=n;var chldn=m.getChildren(n,false);for(var i=0;i<chldn.length;i++){var c=chldn[i];if(c.k==k){return c;}else{var g=mstrmojo.Vis.getVisGrid(m,c,k);if(g){n=origN;return g;}}}};mstrmojo.Vis.DataParser=function(m){var ns=mstrmojo.Vis;return{getRowTitles:function(){return new ns.Titles(m,true);},getColTitles:function(){return new ns.Titles(m,false);},findMetricValue:function(rvIdx,c){var rhs=m.ghs.rhs.items;for(var e in rhs){var row=rhs[e].items;var found=true;for(var i in rvIdx){if(rvIdx[i]!=row[i].idx){found=false;break;}}if(found){return new mstrmojo.Vis.MetricValue(m.gvs.items[e].items[c]);}}},getTotalRows:function getTotalRows(){return m.eg?0:m.ghs.rhs.items.length;},getTotalColHeaderRows:function getTotalColHeaderRows(){return(!m.ghs.chs.items?0:m.ghs.chs.items.length);},getTotalCols:function getTotalCols(){return this.getColHeaders(0).size();},getRowHeaders:function getRowHeaders(pos){return new ns.Headers(m,pos,true);},getColHeaders:function getColHeaders(pos){return new ns.Headers(m,pos,false);},getMetricValue:function getMetricValue(row,col){return new ns.MetricValue(m,m.gvs.items[row].items[col]);},getColumnHeaderCount:function getColumnHeaderCount(){return m.gvs.items[0].items.length;},getCSSString:function getCSSString(){return m.cssString;}};};mstrmojo.Vis.Titles=function(m,isRow){var t=(isRow)?m.gts.row:m.gts.col;return{size:function size(){return t.length;},getTitle:function getTitle(pos){return new mstrmojo.Vis.Title(t[pos]);},getCSS:function getCSS(pos){return m.css[t[pos].cni].n;}};};mstrmojo.Vis.Headers=function(m,i,isRow){var t=(isRow)?m.gts.row:m.gts.col;var hs=(isRow)?m.ghs.rhs:m.ghs.chs;var h=hs.items&&hs.items[i].items;return{size:function size(){return(!h?0:h.length);},getHeader:function getHeader(pos){return h&&h[pos]&&new mstrmojo.Vis.Header(h[pos],isRow?t[pos]:t[i]);},getCSS:function getCSS(pos){return h&&m.css[h[pos].cni].n;},getHeaderCell:function(pos){return h&&h[pos];}};};mstrmojo.Vis.Title=function(t){return{getActionType:function(){return t.at;},getDrillPath:function(){return t.dp;},getHeaderValues:function getHeaderValues(){return t.es;},getHeaderName:function getHeaderValue(pos){return t.es[pos].n;},getHeaderId:function getHeaderValue(pos){return t.es[pos].id;},getForms:function getForms(){return t.fs;},getFormId:function(){return t.fid;},getFormType:function(){return t.ftp;},getUnitId:function(){return t.id;},getLinkMap:function(){return t.lm;},getName:function(){return t.n;},getUnitDssType:function(){return t.otp;},getSelectorControl:function(){return t.sc;}};};mstrmojo.Vis.Header=function(h,t){return{getName:function getName(){return(h.idx===-1)?"":t.es[h.idx].n;},getElementId:function getElementId(){return(h.idx===-1)?"":t.es[h.idx].id;},getObjectId:function getId(){return(h.idx===-1)?"":t.es[h.idx].oid;},getElementIndex:function getElementIndex(){return h.idx;},getActionType:function getActionType(){return h.at;},isTotal:function isTotal(){return h.otr===1;}};};mstrmojo.Vis.MetricValue=function(m,jsonObj){var v=jsonObj;return{getValue:function getValue(){return v.v;},getThresholdType:function getThresholdType(){return v.ty;},getRawValue:function getRawValue(){return v.rv;},getCSS:function getCSS(){return m.css[v.cni].n;},getThresholdValue:function getThresholdValue(defaultValue){if(v.ti==undefined){return defaultValue;}return m.th[v.ti].n;},getFillColor:function getFillColor(defaultValue){if(v.ci==undefined){return defaultValue;}return m.fc[v.ci].n;}};};})();