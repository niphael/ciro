(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.android.ui.RootView","mstrmojo.android.ui.ViewSwitcher","mstrmojo.android.ui.ActionBar","mstrmojo.android.ui.FolderView","mstrmojo.android.ui.ResultSetView","mstrmojo.android.ui.DocumentView","mstrmojo.graph.MobileXtabCanvasGraph","mstrmojo.android.ui.PromptsView","mstrmojo.android.ui.PropertiesView","mstrmojo.android.ui.SettingsView","mstrmojo.AndroidXtabStandalone","mstrmojo.MobileDocBuilder","mstrmojo.MobileGraph","mstrmojo.hash","mstrmojo.android.ui.NoProjectsView");mstrmojo.android.factories.ViewFactory=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.android.factories.ViewFactory",newRootView:function newRootView(params){return new mstrmojo.android.ui.RootView(params);},newActionBarView:function newActionBarView(params){return new mstrmojo.android.ui.ActionBar(params);},newSwitcherView:function newSwitcherView(params){return new mstrmojo.android.ui.ViewSwitcher(params);},newFolderView:function newFolderView(params){return new mstrmojo.android.ui.FolderView(params);},newResultSetView:function newResultSetView(params){return new mstrmojo.android.ui.ResultSetView(params);},newXtabView:function newXtabView(params){var viz=params.viz,clazz=mstrmojo.hash.walk((viz)?viz.c:"AndroidXtabStandalone",mstrmojo);return new clazz(params);},newDocumentView:function newDocumentView(params){var doc=new mstrmojo.android.ui.DocumentView(mstrmojo.hash.copy(params,{cssClass:"mstrmojo-DocumentView"}));doc.builder=new mstrmojo.MobileDocBuilder({parent:doc});return doc;},newGraphView:function newGraphView(params){var Clazz=(mstrApp.onMobileDevice()&&mstrApp.useBinaryFormat)?mstrmojo.graph.MobileXtabCanvasGraph:mstrmojo.MobileGraph;return new Clazz(params);},newPromptsView:function newPromptsView(params){return new mstrmojo.android.ui.PromptsView(params);},newPropertiesView:function newPropertiesView(params){return new mstrmojo.android.ui.PropertiesView(params);},newSettingsView:function newSettingsView(params){return new mstrmojo.android.ui.SettingsView(params);},newCalendarDialogView:mstrmojo.emptyFn,newNoProjectsView:function newNoProjectsView(params){return new mstrmojo.android.ui.NoProjectsView(params);},newHeatMapEditorView:function(params){return new mstrmojo.VisHeatMapPopup(params);},newView:function newView(type,params){return this["new"+type+"View"](params);}});}());