(function(){mstrmojo.requiresCls("mstrmojo.android.factories.ControllerFactory","mstrmojo.android.large.controllers.RootController","mstrmojo.android.large.controllers.BrowserController","mstrmojo.android.large.controllers.HomeScreenController");mstrmojo.android.large.factories.ControllerFactory=mstrmojo.declare(mstrmojo.android.factories.ControllerFactory,null,{scriptClass:"mstrmojo.android.large.factories.ControllerFactory",newRootController:function newRootController(params){return new mstrmojo.android.large.controllers.RootController(params);},newBrowserController:function newBrowserController(params){return new mstrmojo.android.large.controllers.BrowserController(params);},newHomeScreenController:function newHomeScreenController(params){return new mstrmojo.android.large.controllers.HomeScreenController(params);}});}());