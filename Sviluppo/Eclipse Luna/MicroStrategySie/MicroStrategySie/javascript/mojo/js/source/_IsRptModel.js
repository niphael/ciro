(function(){mstrmojo.requiresCls("mstrmojo.func","mstrmojo.hash");var $FWM=mstrmojo.func.wrapMethods,$HSH=mstrmojo.hash;function getHandlerFunction(methodName){return function(){var model=this,args=[].slice.call(arguments),callback=args.pop();args.push(mstrmojo.func.wrapMethods({success:function(res){model.setData(res);},prompts:function(res){model.setPrompts(model.getDataService().getPrompts());}},callback));this.submitToDataService(methodName,args);};}function executeHandler(model,data){if(data){model.data=data;}model.setPrompts(model.getDataService().getPrompts());}mstrmojo._IsRptModel={_mixinName:"mstrmojo._IsRptModel",setPrompts:function setPrompts(prompts){this.prompts=prompts;if(prompts){prompts.host=this;}},getDataService:function getDataService(){return this.dataService;},execute:function execute(params,callback){var model=this,p=$HSH.copy(params,{dssId:params.did});if(params.forceExec){p.execFlags=1;p.doNotUpdateCaches=true;}this.getDataService().execute(p,$FWM({success:function(res){executeHandler(model,res);},prompts:function(){executeHandler(model);}},callback));},refresh:function refresh(params,callback){var model=this;this.getDataService().getResults(null,$FWM({success:function(res){executeHandler(model,res);}},callback));},answerPrompts:function answerPrompts(callback){var model=this;this.getDataService().answerPrompts(this.prompts,$FWM({success:function(res){model.data=res;}},callback));},submitToDataService:function submitToDataService(methodName,args){var dataService=this.getDataService();dataService[methodName].apply(dataService,args);},getPageByTree:function getPageByTree(callback){this.submitToDataService.call(this,"getPageByTree",[callback]);},sort:getHandlerFunction("sort"),pivot:getHandlerFunction("pivot"),drillGrid:getHandlerFunction("drillGrid"),drill2Grid:getHandlerFunction("drill2Grid"),linkToObject:getHandlerFunction("linkToObject"),pageBy:getHandlerFunction("pageBy"),setData:function setData(res){this.data=res;if(!this.prompts){this.setPrompts(this.dataService.getPrompts());}}};}());