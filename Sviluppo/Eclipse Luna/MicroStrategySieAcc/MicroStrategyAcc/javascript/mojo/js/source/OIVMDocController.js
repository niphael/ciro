(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.form","mstrmojo._IsDocController");var OBJECT_TYPE_REPORT=3;mstrmojo.OIVMDocController=mstrmojo.declare(mstrmojo.Obj,[mstrmojo._IsDocController],{scriptClass:"mstrmojo.OIVMDocController",onSort:function onSort(view,action){action.treeType=view.treeType;view.model.sort(this._addNodeKeyToAction(view,action),this._getXtabCallback.call(this,view));},onPivot:function onPivot(view,action){view.model.pivot(this._addNodeKeyToAction(view,action),this._getXtabCallback.call(this,view));},onDrill:function onDrill(view,action){if(action.isWithin){if(!this.isInRequest()){view.model.drillGrid(this._addNodeKeyToAction(view,action),this._getXtabCallback.call(this,view));}}else{var model=this.model,prefs=this.model.prefs,retainParent=prefs.rtprnt,retainThreshold=prefs.rtthld;mstrmojo.form.send({evt:3125,displayMode:-1,drillPathKey:action.drillPathKey,elementList:action.drillElements,rwMesageID:model.mid,retainParent:isNaN(retainParent)?"":retainParent,retainThresh:isNaN(retainThreshold)?"":retainThreshold,rwGroupByElements:this.getGroupByElements(view).join(","),sliceId:view.sid||0},null,null,((prefs.drillnw)?"_blank":null));}},onExecuteNewObject:function onExecuteNewObject(view,params){if(params){var m={};if(params.objType===OBJECT_TYPE_REPORT){m.evt=4001;m.reportID=params.did;m.reportViewMode=1;if(params.forceExec){m.execFlags=1;m.doNotUpdateCaches=true;}}else{m.evt=2048001;m.objectID=params.did;if(params.forceExec){m.freshExec=true;m.doNotUpdateCaches=true;}}if(params.linkAnswers){m.linkAnswers=params.linkAnswers;}mstrmojo.form.send(m,null,"POST",null);}},onReExecute:function(view,ignoreStatus){var md=view.model,params={evt:2048030,src:md.bp+".2048030",rwb:md.bs};if(ignoreStatus){params.ignoreStatus=true;mstrmojo.form.send(params,null,"POST",null);}else{mstrmojo.form.send(params,null,"POST",null);}},isAutoRefreshEnabled:function(){return this.autoRefreshHandler;},startAutoRefresh:function(){var model=this.model,rf=model.rf,me=this;this.autoRefreshHandler&&this.stopAutoRefresh();this.autoRefreshHandler=setTimeout(function(){model.getDataService().refresh({},{success:function(res){model.loadLayout(res);me.autoRefreshHandler&&me.startAutoRefresh();}});},rf*1000);},stopAutoRefresh:function(){clearTimeout(this.autoRefreshHandler);this.autoRefreshHandler=null;},offlineTransactionsSubmitted:function(ck){},transactionDiscarded:function(ck){},openOfflineTransactions:function(){},invalidClientCache:function(){},confirmMsgBeforeSubmit:function confirmMsgBeforeSubmit(){},onLink:function onLink(view,action){if(action.link){var linkXml=action.link.toXml();if(linkXml){action.linkAnswers=linkXml;}delete action.link;}if(action.linkInfo&&action.linkInfo.so>0){action.originMessageID=this.model.mid;if(!action.linkAnswers){action.promptAnswerMode="0";}action.selectorMode=action.linkInfo.so;}var target=action.target||action.linkTarget||"_self";if(action.url){if(action.url.length>2083){var form=mstrmojo.form.createDynamicForm(action.url);form.target=target;form.submit();}else{window.open(action.url,target);}}else{mstrmojo.form.send(action,null,"POST",target);}},onTransactionUpdates:function onTransactionUpdates(view,updateObject,autoRefresh){if(autoRefresh){view.autoRefresh();}},onDownloadGridData:function onDownloadGridData(view,action){this.model.downloadGridData(this._addNodeKeyToAction(view,action));},onGroupBy:function onGroupBy(view,params,fnWait){var me=this,model=view.model,groupbyKey=params.groupbyKey,unloadLayouts=false;params.flags=model.agb==2?2:0;unloadLayouts=!!params.flags;model.getDataService().changeDocGroupBy(params,{submission:function(){fnWait(true);},success:function(res){if(unloadLayouts){view.parent.parent.unloadGbLayuts(groupbyKey);}model.loadLayout(res);},complete:function(){fnWait(false);}});}});})();