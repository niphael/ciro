(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.hash","mstrmojo.DocDataServiceXt","mstrmojo.ResSetCachedDataService");var delim="\u001F";function gbCacheKey(me,gbKey,eId){var gBys=me.gBys,gb,i;if(!gBys){return null;}for(i=0;i<gBys.length;i++){gb=gBys[i];if(gb.k===gbKey){return{l:me.pbLevel+i,v:"p:"+eId};}}return null;}function gbUnitsParam(me,gbKey,eId){var res=[],gBys=me.gBys,gb,i;if(!gBys){return null;}for(i=0;i<gBys.length;i++){gb=gBys[i];res.push(gb.k);if(gb.k===gbKey){res.push(eId);break;}else{res.push(gb.e.v);}}return res.join(delim);}mstrmojo.DocCachedDataService=mstrmojo.declare(mstrmojo.ResSetCachedDataService,null,{scriptClass:"mstrmojo.DocCachedDataService",init:function init(props){this._super(props);if(!this.delegate){this.delegate=new mstrmojo.DocDataServiceXt(props);}},loadDocLayout:function loadDocLayout(params,callback){var me=this,layoutKey=params.layoutKey,store=me.store,keys=["l:"+layoutKey],cachedStr=store.getData(me.layoutLevel,keys);if(cachedStr){var cachedData=JSON.parse(cachedStr);this.processData(cachedData,"layout",false);store.setAsDefault(me.layoutLevel);callback.success(cachedData);return ;}var delegate=this.delegate,doLoadLayout=function doLoadLayout(){delegate.loadDocLayout(params,{success:function(res){me.processData(res,"layout",true);me.addPbCacheKeys(keys,res);me.putData(store,me.layoutLevel,keys,res,true);callback.success(res);},failure:callback.failure});};if(delegate.msgId){doLoadLayout();}else{var p=me.reexecParams(store);delegate.execute(p,{success:function(res){doLoadLayout();},failure:callback.failure},me.STATUS_ONLY_PARAM);}},setCurrentDocLayout:function setCurrentDocLayout(layoutKey){var me=this;if(me.layoutKey!=layoutKey){me.layoutKey=layoutKey;var store=me.store,keys=["l:"+layoutKey],cachedStr=store.getData(me.layoutLevel,keys);if(cachedStr){var cachedData=JSON.parse(cachedStr);this.processData(cachedData,"layout",false);store.setAsDefault(me.layoutLevel);}}},changeDocGroupBy:function changeDocGroupBy(params,callback){var me=this,store=me.store,gbKey=params.groupbyKey,eId=params.elementId,cacheKey=gbCacheKey(me,gbKey,eId),cachedStr=store.getData(cacheKey.l,[cacheKey.v]);if(cachedStr){var cachedData=JSON.parse(cachedStr);me.processData(cachedData,"pb",false);callback.success(cachedData);return ;}var delegate=this.delegate,doChangeGroupBy=function(params){delegate.changeDocGroupBy(params,{success:function(res){me.processData(res,"pb",true);var keys=me.addPbCacheKeys([]);me.putData(store,me.pbLevel,keys,res,false);callback.success(res);},failure:callback.failure});};if(delegate.msgId){params.gbUnits=gbUnitsParam(me,gbKey,eId);delete params.groupbyKey;delete params.elementId;doChangeGroupBy(params);}else{var p=me.reexecParams(store);delegate.execute(p,{success:function(res){var layoutKey=me.layoutKey;if(layoutKey&&me.serverLayoutKey!=layoutKey){delegate.setCurrentDocLayout(layoutKey,{success:function(res){me.serverLayoutKey=layoutKey;doChangeGroupBy({gbUnits:gbUnitsParam(me,gbKey,eId)});},failure:callback.failure});}else{doChangeGroupBy({gbUnits:gbUnitsParam(me,gbKey,eId)});}},failure:callback.failure},me.STATUS_ONLY_PARAM);}},getRWGraphImage:function getRWGraphImage(params,callback){this.delegate.getRWGraphImage(params,callback);var me=this,delegate=me.delegate,store=me.store,imageKey="G:"+params.k+"_"+params.sid+"_"+params.w+"_"+params.h,dataLevel=me.levelCount-1,cachedStr=store.getValue(imageKey,dataLevel);if(cachedStr){callback.success(cachedStr);return ;}params.encodeImage=true;me.delegate.getRWGraphImage(params,{success:function(res){store.setValue(dataLevel,imageKey,res);callback.success(res);},failure:callback.failure});},getDocImage:function getDocImage(url){return this.getImage(url);},fetchDocPage:function fetchDocPage(position,callback){this.delegate.fetchDocPage(position,callback);},drillGrid:function drillGrid(params,callback){this.delegate.drillGrid(params,callback);},processData:function processData(data,command,fromServer){var me=this;me.resetLevelCount();var layouts=data.defn&&data.defn.layouts;if(layouts&&layouts.length>1){me.layoutLevel=me.levelCount++;}me.gBys=null;me.gbMap=null;var res=[],map={},d=data.data;if(!d){return ;}var curLayoutKey=data.currlaykey,layouts=d.layouts,gBys,l,i;me.layoutKey=curLayoutKey;if(fromServer){me.serverLayoutKey=curLayoutKey;}for(i=0;i<layouts.length;i++){l=layouts[i];if(l.k===curLayoutKey){gBys=l.gbys&&l.gbys.groupbys;break;}}if(gBys&&gBys.length){for(i=0;i<gBys.length;i++){var gb=gBys[i],unit=gb.unit,info={k:gb.k,target:unit.target,e:unit.elms[unit.idx]};res.push(info);map[gb.k]=info;}me.gBys=res;me.gbMap=map;me.pbLevel=me.levelCount++;}},addPbCacheKeys:function addPbCacheKeys(keys,data){var gBys=this.gBys;if(gBys){var i,gb;for(i=0;i<gBys.length;i++){gb=gBys[i];keys.push("p:"+gb.e.v);}}return keys;},addLayoutCacheKey:function addLayoutCacheKey(keys,data){if(this.layoutLevel){keys.push("l:"+data.currlaykey);}return keys;},getObjectType:function getObjectType(){return 55;},setDocSelectorElements:function setDocSelectorElements(selectorKeyContext,elemList,controlKey,includeClause,callback,zoomFactor){var delegate=this.delegate;delegate.setDocSelectorElements.apply(delegate,arguments);}});})();