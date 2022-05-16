(function(){mstrmojo.requiresCls("mstrmojo.GraphBase","mstrmojo._TouchGestures","mstrmojo.graph._MobileGraphAreaHelper");mstrmojo.MobileGraph=mstrmojo.declare(mstrmojo.GraphBase,[mstrmojo._TouchGestures,mstrmojo.graph._MobileGraphAreaHelper],{scriptClass:"mstrmojo.MobileGraph",areaMarkup:'<area shape="{@shape}" coords="{@coords}" ttl="{@tooltip}" aid="{@aid}" {@extra}/>',cssImageClass:"mstrmojo-ReportGraph",setDimensions:function setDimensions(h,w){if(this.height===h&&this.width===w){return ;}this.height=h;this.width=w;if(this.hasRendered){this.controller.refresh(this);}},preBuildRendering:function preBuildRendering(){var graphData=this.graphData.gd.g;this.as=graphData&&graphData.as;return this._super?this._super():true;},refresh:function refresh(){this.graphData=this.model.data;this._super();},retrieveGraphSrc:function retrieveGraphSrc(h,w){var src="data:image/png;base64,"+this.graphData.ib.eb,imgNode=this.imgNode;if(imgNode.src!==src){imgNode.src=src;}},getFormats:function getFormats(){return{height:this.height,width:this.width,top:0,left:0};},touchTap:function touchTap(){this.displayTooltips([],0,0);var ctrl=this.controller;if(ctrl&&ctrl.viewTap){ctrl.viewTap();}},touchSelectBegin:function touchSelectBegin(touch){this.syncTooltips(touch.pageX,touch.pageY);},touchSelectMove:function touchSelectMove(touch){this.syncTooltips(touch.pageX,touch.pageY);},setModel:function setModel(model){this._super(model);this.setGraphData(model.data);},syncTooltips:function syncTooltips(x,y){var me=this,pos=mstrmojo.dom.position(me.domNode,true);x-=pos.x;y-=pos.y;me.model.getDataService().handleUserSingleTap(-1,"",x,y,false,{success:function(res){me.displayTooltips(res.Areas,pos.x,pos.y);}});},setGraphData:function setGraphData(graphData){this.graphData=graphData;this.controller.getPageByTree(false);}});}());