(function(){mstrmojo.requiresDescs(2140,373,172,1059,8132,3345,1279,9115);var _constants=mstrmojo.DI.DIConstants;mstrmojo.DI.DISalesforce=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.DI.DISalesforce",cssText:"background-color: 0xcc000; overflow-y: hidden",markupString:'<div id="{@id}" class="{@cssClass}" style="{@cssText}"><div></div><div style="height: 100%"></div></div>',markupSlots:{listHeaderNode:function(){return this.domNode.children[0];},listBodyNode:function(){return this.domNode.children[1];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},model:null,sfModel:null,children:[{scriptClass:"mstrmojo.List",slot:"listHeaderNode",itemMarkup:'<div><table cellpadding="0" cellspacing="0" style="width: 100%;"><tr><td class="mstrmojo-di-sf-list-header" style="width: 40%;">{@n}</td><td class="mstrmojo-di-sf-list-header" style="width: 60%;">{@desc}</td><td class="mstrmojo-di-sf-list-header-last" style="width: 16px">&nbsp;</td></tr></table></div>',items:[{n:"*Reports*",desc:"*Description*"}]},{scriptClass:"mstrmojo.List",id:"mstrDiSfList",slot:"listBodyNode",cssText:"background-color: 0xffffff; height: 500px; overflow-x: hidden; overflow-y: auto; width: 100%",itemMarkupFunction:function(item,index,widget){var c1=(item.a=="")?' class="mstrmojo-di-sf-list-folder"':' class="mstrmojo-di-sf-list-report"';var c2=(item.a=="")?"":' class="mstrmojo-di-sf-list-desc"';var id=(item.a=="")?"":' id="mstrDiSfItem'+index+'"';return"<div"+id+c1+'><table cellpadding="0" cellspacing="0" style="width: 100%;"><tr><td style="vertical-align: top; width: 40%;">'+item.n+"</td><td"+c2+' style="vertical-align: top; width: 60%;">'+item.d+"</td></tr></table></div>";},prevIndex:-1,onchange:function(evt){var elem;elem=document.getElementById("mstrDiSfItem"+this.selectedIndex);if(elem){elem.className="mstrmojo-di-sf-list-report-selected";if(this.prevIndex>-1){elem=document.getElementById("mstrDiSfItem"+this.prevIndex);elem.className="mstrmojo-di-sf-list-report";}this.prevIndex=this.selectedIndex;}else{this.selectedIndex=this.prevIndex;}}}],populate:function(res,sfModel){this.sfModel=sfModel;var items=[];for(var i=0;i<res.mi.ftree.fd.length;i++){var fd=res.mi.ftree.fd[i];items.push({n:fd.n,d:"",a:""});for(var j=0;j<fd.fl.length;j++){var fl=fd.fl[j];items.push({n:fl.n,d:fl.des,a:fl.address});}}mstrmojo.all.mstrDiSfList.set("items",items);},getSalesforceReport:function getSalesforceReport(index){var diModel=this.model;var list=mstrmojo.all.mstrDiSfList;var taskParams={taskId:"qBuilder.ImportSourceObject",accessToken:this.sfModel.oAuth.accessToken,flags:7,instanceURL:this.sfModel.instanceUrl,refreshToken:this.sfModel.refreshToken,reportAddress:list.items[index].a,reportDesc:list.items[index].d,reportName:list.items[index].n,sessionState:mstrApp.sessionState,userDisplayName:this.sfModel.userDisplayName};var cb={success:function(res){var prvFg=_constants.requestFlag.sourceInfo|_constants.requestFlag.preview|_constants.requestFlag.mapping;var cb2={success:function(res2){diModel.populate(res2,prvFg,prvFg);diModel.set("curPg",_constants.pageType.preview);},failure:function(res2){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}};diModel.set("msgid",res.xmlAPIResponse.mid);diModel.loadRptData(prvFg,-1,cb2);},failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}};mstrmojo.xhr.request("POST",mstrmojo.App.taskURL,cb,taskParams);}});})();