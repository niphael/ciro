(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.maps.jsmap.InfoWindowController","mstrmojo.maps.jsmap.DocInfoWindowController");function startController(params){}mstrmojo.maps.jsmap.InfoWindowRootController=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.maps.jsmap.InfoWindowRootController",start:function start(params){var controllerClass=(params.isDoc)?mstrmojo.maps.jsmap.DocInfoWindowController:mstrmojo.maps.jsmap.InfoWindowController;this.spawn(new controllerClass(params),params);},spawn:function spawn(controller,startParams){this.nextController=controller;controller.prevController=this;controller.start(startParams);}});})();