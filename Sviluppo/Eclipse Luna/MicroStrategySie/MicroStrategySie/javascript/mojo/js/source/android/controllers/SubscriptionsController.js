(function(){mstrmojo.requiresCls("mstrmojo.android.controllers.ViewController","mstrmojo.android.controllers._HasFolderView","mstrmojo.android.EnumMenuOptions");mstrmojo.requiresDescs(773,1089,9931);var $DESC=mstrmojo.desc;var REFRESH=mstrmojo.android.EnumMenuOptions.REFRESH;function loadSubscriptions(refresh){var me=this,callback=function(res){var view=me.view,rootCtrl=me.rootCtrl,title;view.set("items",res.items);if(rootCtrl.getCurrent()==me){if(!me.hsc){title=$DESC(1089,"Subscriptions");}rootCtrl.updateFolder(view,title);me.updatePropertiesMsg();}};mstrApp.modelFactory.newDataService("Subscriptions").getSubscriptions({success:callback,failure:function(details){if(mstrApp.isHosted()){callback({items:[{n:"Subscriptions Unavailable"}]});}else{me.viewFailed(details);}}},refresh);}mstrmojo.android.controllers.SubscriptionsController=mstrmojo.declare(mstrmojo.android.controllers.ViewController,[mstrmojo.android.controllers._HasFolderView],{scriptClass:"mstrmojo.android.controllers.SubscriptionsController",init:function init(params){this._super(params);var publisher=mstrmojo.publisher;publisher.subscribe(publisher.NO_SRC,publisher.RECONCILE_END_EVENT,function(){loadSubscriptions.call(this,true);},this.id);},start:function start(params){this._super(params);this.csp=params.csp;this.initFolderView();loadSubscriptions.call(this,false);},openItem:function openItem(item){var subtype=item.st;if(subtype){this.spawnedItem=item;this.spawn(mstrApp.controllerFactory.newController(this.getViewKey(subtype),item),item);}else{this.view.clearSelect();}},spawnFailed:function spawnFailed(details){delete this.spawnedItem;this._super(details);},itemLongPressed:function itemLongPressed(item){if(item.st){return this._super(item);}return false;},getDefaultMessage:function getDefaultMessage(){return $DESC(9931,"Select a subscription to view its content.");},makeCurrent:function makeCurrent(isBack){var spawnedItem=this.spawnedItem;if(isBack&&spawnedItem){delete spawnedItem.unread;delete this.spawnedItem;}this._super(isBack);var rootCtrl=this.rootCtrl;rootCtrl.updateFolder(this.view,this.txt,isBack);rootCtrl.restoreNavigation();this.updatePropertiesMsg();},goUp:function goUp(){if(!this._super()){this.rootCtrl.goBack();}return true;},updateActionToolbar:function updateActionToolbar(tbCfg){tbCfg.addMenuItem(REFRESH,$DESC(773,"Refresh"),REFRESH,true,5);return this._super(tbCfg);},handleMenuItem:function handleMenuItem(group,command){if(group===REFRESH){mstrMobileApp.restartReconciler();return ;}this._super(group,command);}});}());