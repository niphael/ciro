(function(){mstrmojo.requiresCls("mstrmojo.android.controllers.ViewController","mstrmojo.android.controllers._SupportsQueuedTransactions","mstrmojo.android.controllers._HasFolderView","mstrmojo.hash");mstrmojo.requiresDescs(8385);function openProject(project,controller,isHomeScreen){mstrApp.setCurrentProjectId(project.did);var params=mstrmojo.hash.copy(project),props={};if(isHomeScreen){props.hsc=true;}var rtf=project.rtf;if(rtf){params.did=params.folderID=rtf.did;}else{params.systemFolder=7;}params.st=2048;controller.spawn(mstrApp.controllerFactory.newController("Folder",props),params);}function displayNoProjectsView(projectsList){if(projectsList.length<1){var noPrjView=this._noPrjView;if(!noPrjView){noPrjView=this._noPrjView=new mstrmojo.android.ui.NoProjectsView({controller:this});}this.rootCtrl.updateDisplayMessage(noPrjView);}}var $PROJ=mstrmojo.android.controllers.ProjectsController=mstrmojo.declare(mstrmojo.android.controllers.ViewController,[mstrmojo.android.controllers._SupportsQueuedTransactions,mstrmojo.android.controllers._HasFolderView],{scriptClass:"mstrmojo.android.controllers.ProjectsController",start:function start(params){this._super(params);var projectsList=mstrApp.getConfiguration().getProjectList(),rootCtrl=this.rootCtrl,view=this.initFolderView();view.set("items",projectsList);rootCtrl.updateFolder(view);this.updatePropertiesMsg();displayNoProjectsView.call(this,projectsList);},openFolder:function openFolder(folder){openProject(folder,this);},getDefaultMessage:function getDefaultMessage(){return mstrmojo.desc(8385,"Select a project to view contents");},makeCurrent:function makeCurrent(isBack){this._super(isBack);this.view.clearSelect();var rootCtrl=this.rootCtrl;rootCtrl.updateFolder(this.view);rootCtrl.restoreNavigation();this.updatePropertiesMsg();displayNoProjectsView.call(this,mstrApp.getConfiguration().getProjectList());},goUp:function goUp(){if(!this._super()){this.rootCtrl.goBack();}return true;},destroy:function destroy(){var noPrjView=this._noPrjView;if(noPrjView){noPrjView.destroy();}this._super();},updateActionToolbar:function updateActionToolbar(tbCfg){this.getTxnToolbarButton(tbCfg);return this._super(tbCfg);}});$PROJ.spawnFolderController=openProject;}());