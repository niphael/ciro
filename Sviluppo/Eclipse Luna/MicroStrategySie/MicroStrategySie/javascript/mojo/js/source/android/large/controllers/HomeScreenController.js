(function(){mstrmojo.requiresCls("mstrmojo.android.controllers.HomeScreenController","mstrmojo.android.controllers._HasFolderView","mstrmojo.hash");mstrmojo.android.large.controllers.HomeScreenController=mstrmojo.declare(mstrmojo.android.controllers.HomeScreenController,[mstrmojo.android.controllers._HasFolderView],{scriptClass:"mstrmojo.android.large.controllers.HomeScreenController",start:function start(params){this._super(params);var view=this.initFolderView(),hs=mstrApp.getConfiguration().getHomeScreen(true);view.set("items",hs.btns);this.rootCtrl.updateFolder(view);this.updatePropertiesMsg();},openFolder:function openFolder(folder){this.openItem(folder);},makeCurrent:function makeCurrent(isBack){this._super(isBack);this.view.clearSelect();var rootCtrl=this.rootCtrl;rootCtrl.updateFolder(this.view);rootCtrl.restoreNavigation();this.updatePropertiesMsg();},goUp:function goUp(){if(!this._super()){this.rootCtrl.goBack();}return true;}});}());