(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.ListHoriz","mstrmojo.Label","mstrmojo.Image");mstrmojo.requiresDescs(8042,5,2918,9950);var $DESC=mstrmojo.desc;var pageRedirect={exit:0,report:1,doc:2,analysis:3};function getRedirectParams(redirect,cubeID){var params={};switch(redirect){case pageRedirect.analysis:params={evt:"3104",src:microstrategy.servletName+".3104",executionMode:"1",rwDesignMode:"0",objectType:"3",objectID:cubeID,rwCreateFlags:"16",rwViewMode:"2048"};break;case pageRedirect.doc:params={evt:"3104",src:microstrategy.servletName+".3104",executionMode:"2",rwDesignMode:"1",objectType:"3",objectID:cubeID};break;case pageRedirect.report:params={iframe:"true",evt:["5005","17004"],src:[microstrategy.servletName+".create.5005",microstrategy.servletName+".create.ObjectExplorer.17004"],selectedObjectID:cubeID,defaultevtlist:"17004"};break;case pageRedirect.exit:params={evt:"3010"};break;}return params;}function getListItems(){var items=[],privileges=this.privileges;if(privileges.CreateAnalysis===1){items.push({icon:"newvi",n:$DESC(8042,"Create Analysis"),desc:$DESC(9948,"Explore data visually and discover trends, patterns, relationships and outliers"),redirect:pageRedirect.analysis});}if(privileges.CreateViewReport===1){items.push({icon:"newreport",n:$DESC(5,"Create Report"),desc:$DESC(49),redirect:pageRedirect.report});}if(privileges.CreateReportServices===1){items.push({icon:"newdoc",n:$DESC(2918,"Create Document"),desc:$DESC(3289,"Create an enterprise report, scorecard, or dashboard from scratch or from a template"),redirect:pageRedirect.doc});}return items;}mstrmojo.DI.DIExitOptions=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.DI.DIExitOptions",markupString:'<div id="{@id}" class="mstrmojo-di-exitoptions {@cssClass}" ><div class="cf green-background"></div><div></div></div>',markupSlots:{headerNode:function(){return this.domNode.firstChild;},listNode:function(){return this.domNode.children[1];}},privileges:mstrApp.diParams,redirectToPage:function redirectToPage(selection){mstrApp.redirectToPage(getRedirectParams.call(this,selection,this.model.cubeID));},children:[{scriptClass:"mstrmojo.Image",cssClass:"di-exit-options mstrmojo-di-check-icon checkcircle",slot:"headerNode"},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-di-exit-title",alias:"exitTitle",text:"",onRender:function onRender(){this.set("text",$DESC(9950,"Your data was imported successfully as ##.").replace("##",this.parent.model.path)+"<br>"+$DESC(11185,"Please select what you would like to do with the data now."));},slot:"headerNode"},{scriptClass:"mstrmojo.ListHoriz",cssClass:"mstrmojo-di-exitList",slot:"listNode",alias:"exitOptions",itemMarkup:'<div class="mstrmojo-di-option-lnk" title="{@title}" ><div class="mstrmojo-di-option-icn {@icon}"></div><div class="mstrmojo-di-option-nm">{@n}</div><div class="mstrmojo-di-option-dsc">{@desc}</div></div>',onchange:function(){this.parent.redirectToPage(this.selectedItem.redirect);}}],preBuildRendering:function preBuildRendering(){if(this._super){this._super();}this.exitOptions.set("items",getListItems.call(this));}});})();