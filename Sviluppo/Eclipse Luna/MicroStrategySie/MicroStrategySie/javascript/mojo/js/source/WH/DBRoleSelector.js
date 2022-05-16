(function(){mstrmojo.requiresCls("mstrmojo.Table","mstrmojo.Label","mstrmojo.Box","mstrmojo.MenuButton","mstrmojo.dom","mstrmojo.WH.DBRoleEditor","mstrmojo.WH.WHNameEditor");mstrmojo.requiresDescs(1462,8510,629,1088,8515,637,9104,219,8676);var $DOM=mstrmojo.dom;var $hidden="position:absolute; visibility:hidden;";var $visible="position:absolute; visibility:visible;";var _ti=0;var _model;var _menuItems=[{did:"Edit",n:mstrmojo.desc(9253,"Edit")},{did:"Delete",n:mstrmojo.desc(3398,"Delete")},{did:"Rename",n:mstrmojo.desc(1388,"Rename")},{did:"Duplicate",n:mstrmojo.desc(3397,"Duplicate")},{did:"Set_as_Primary",n:"Set as Primary"}];var _DBRMns,_DBRMnEdt,_DBRMnDlt,_DBRMnRn,_DBRMnDp,_DBRMnSPr;function alertErrorMsg(result){mstrmojo.alert(result.getResponseHeader("X-MSTR-TaskFailureMsg").replace(/com\.microstrategy\.(.*): \((.*)\)/,"$2").substring(0,500));}var nameEdit=new mstrmojo.WH.WHNameEditor({onOK:function(evt){var dbr=this.dbr,callback={success:function(res){_model.loadDBRoles();populateDBRoleList();edt.close();},failure:function(res){}},nn="",n="",edt=this;n=this.txtbox.value;if(!mstrApp.isCloud){nn=getUniqueName(n);if(nn!=n){mstrmojo.alert("The Database connection with name  "+n+" is already in use. Please provide a different name");}else{dbr.n=n;saveDBRole(dbr,callback);}}else{dbr.des=n;saveDBRole(dbr,callback);}},onOpen:function(){var des=(mstrApp.isCloud)?this.dbr.des:this.dbr.n;this.nn="";this.txtbox.set("value",des);this.error.set("text","");this.txtbox.domNode.focus();this.txtbox.domNode.select();this.set("title",mstrmojo.desc(11127,"Database Connection")+" "+des);}});var dblist=new mstrmojo.List({alias:"dbrlist",cssClass:"mstrmojo-dbconnectionList",itemMarkupFunction:function(evt,data,info){var name=mstrApp.isCloud?evt.des+"":evt.n+"",isShared=(parseInt(evt.shared,10)===1)?" shared":"";name=trim(name);return'<div class="mstrmojo-qb-DBRoleItem mstrmojo-DBRoleSelector-bullet" di='+data+' ><div class="DbrIcon mstrmojo-ArchitectListIconBlock t'+evt.tp+isShared+'" di='+data+'></div><div class="DbrTxt" >'+name+'</div><div class="DelDbr mstrmojo-ArchitectListIcon div" btn="delbtn"></div></div>';},onitemsChange:function ich(evt){if(dblist.selectedIndex>=0){for(var i=0;i<dblist.items.length;i++){var item=dblist.items[i];if(item.did==dblist.selectedItem.did){dblist.set("selectedIndex",i);break;}}selectRow(false);}},onRender:function onR(){var me=this;_menu_popup=function(evt){var target=$DOM.eventTarget(window,evt);if(target){if(target.attributes.di){_ti=parseInt(target.attributes.di.nodeValue,10);}}};if(this.domNode){var st=this.domNode.style;st.width="auto";$DOM.attachEvent(this.domNode,"mousemove",_menu_popup);}},onmouseup:function(evt){var target=$DOM.eventTarget(evt.hWin,evt.e),className=target.className;if(className==="DelDbr mstrmojo-ArchitectListIcon div"||className==="mstrmojo-ListBase2 mstrmojo-dbconnectionList"){return ;}selectRow(true);},onheightChange:function(){if(this.domNode){this.domNode.style.height=parseInt(this.height,10)+"px";}}});function saveDBRole(dbr,callback){var params={taskId:"arch.saveDBRole",dbroleinfo:JSON.stringify(dbr)};var cb={success:function(res){callback.success(res);},failure:function(res){var c=res&&res.getResponseHeader("X-MSTR-TaskErrorCode");c=(c<0)?(4294967296+parseInt(c,10)):c;switch(c){case 2147749923:var des=(mstrApp.isCloud)?dbr.des:dbr.n;mstrmojo.alert("The Database connection with name  "+des+" is already in use. Please provide a different name");callback.failure(res);break;default:alertErrorMsg(res);callback.failure(res);}}};if(this.mstrApp.sessionState!==undefined){params.sessionState=this.mstrApp.sessionState;}mstrmojo.xhr.request("POST",mstrmojo.App.taskURL,cb,params);}function setAsProjectPrimaryDBRole(){var dbr=_model.dbrs[_ti];var dbrparams={taskId:"arch.ProjectPrimaryDBRole",dbroleID:dbr.did};if(this.mstrApp.sessionState!==undefined){dbrparams.sessionState=this.mstrApp.sessionState;}mstrmojo.xhr.request("POST",mstrmojo.App.taskURL,{failure:alertErrorMsg},dbrparams);}function getUniqueName(Nm){var patt1=/\(\d+\)$/;var l=patt1.exec(Nm);var iN;if(l){iN=Nm.substring(0,l.index);}else{iN=Nm;}var ct=0;var tNm=iN;var Nms=new Array();for(nc=0;nc<_model.dbrs.length;nc++){if(mstrApp.isCloud){Nms[_model.dbrs[nc].des]=_model.dbrs[nc].des;}else{Nms[_model.dbrs[nc].n]=_model.dbrs[nc].n;}}while(Nms[tNm]){ct++;tNm=iN+"("+ct+")";}return tNm;}function saveDBRoleNewName(dbr){if(mstrApp.isCloud){dbr.des=getUniqueName(dbr.des);dbr.n=dbr.des+"___"+new Date().getTime();}else{dbr.n=getUniqueName(dbr.n);}dbr.did="";var params={taskId:"arch.saveDBRole",sessionState:this.mstrApp.sessionState,dbroleinfo:JSON.stringify(dbr)};var dbrcb={success:function(res){_model.loadDBRoles();populateDBRoleList();},failure:alertErrorMsg};if(this.mstrApp.sessionState!==undefined){params.sessionState=this.mstrApp.sessionState;}mstrmojo.xhr.request("POST",mstrmojo.App.taskURL,dbrcb,params);}function duplicateDBRole(){var dbr=_model.dbrs[_ti];var dbrparams={taskId:"getDBInstances",objectID:dbr.did};var dbrcb={success:function(res){saveDBRoleNewName(res.dbrs[0]);},failure:alertErrorMsg};if(this.mstrApp.sessionState!==undefined){dbrparams.sessionState=this.mstrApp.sessionState;}mstrmojo.xhr.request("POST",mstrmojo.App.taskURL,dbrcb,dbrparams);}function retrieveDBRole(selectedIndex,callback){var dbr=_model.dbrs[selectedIndex];var dbrparams={taskId:"getDBInstances",objectID:dbr.did};var cb={success:function(res){callback.success(res.dbrs[0]);},failure:function(res){alertErrorMsg(res);callback.failure(res);}};if(this.mstrApp.sessionState!==undefined){dbrparams.sessionState=this.mstrApp.sessionState;}mstrmojo.xhr.request("POST",mstrmojo.App.taskURL,cb,dbrparams);}function editUpdatedDBRole(selectedIndex){var dbrcb={success:function(res){performeditDBRole(res);},failure:function(res){}};retrieveDBRole(selectedIndex,dbrcb);}function performeditDBRole(dbr){var dbe=mstrmojo.all[dbr.did];if(dbe){dbe.destroy();}var cb={success:function(res){_model.loadDBRoles();populateDBRoleList();},cancel:function(res){}};dbe=new mstrmojo.WH.DBRoleEditor({id:dbr.did,title:mstrmojo.desc(11127,"Database Connection"),dbrole:dbr,model:_model,sessionState:this.mstrApp.sessionState,callback:cb});dbe.dbrole=dbr;dbe.open();}function newDBRole(){var dbr={n:"",des:mstrmojo.desc(8515,"new connection #").replace("#",1),did:"",tp:"29",stp:"7424"};performeditDBRole(dbr);}function existingDBRole(){editUpdatedDBRole(_ti);}function editDBRole(){_model.loadDBObjects(existingDBRole);}function deleteDBRole(){var dbr=_model.dbrs[_ti];var $NIB=mstrmojo.Button.newInteractiveButton;mstrmojo.confirm(mstrmojo.desc(10073,"Are you sure you want to delete the Database Connection")+" "+dbr.des+"?",[$NIB(mstrmojo.desc(219,"Yes"),function yes(){if(dbr){var dbrparams={taskId:"arch.deleteObject",objectid:dbr.did,objecttype:dbr.tp};var dbrcb={success:function(){_model.loadDBRoles();_model.set("SelDBRoleID",null);dblist.clearSelect();populateDBRoleList();},failure:function(){mstrmojo.alert(mstrApp.isCloud?"You are not allowed to delete the database connection.":mstrmojo.desc(10074,"The selected database connection can't be de deleted, or you do not have enough privileges to delete it."));}};if(mstrApp.sessionState!==undefined){dbrparams.sessionState=mstrApp.sessionState;}mstrmojo.xhr.request("POST",mstrmojo.App.taskURL,dbrcb,dbrparams);}},null,{iconClass:"mstrmojo-Editor-button-Yes"}),$NIB("No",null,null,{iconClass:"mstrmojo-Editor-button-No"})],"Confirm delete");}function selectRow(bForce){var mdl=_model;if(dblist.selectedIndex!=-1){var did=mdl.dbrs[dblist.selectedIndex].did;if(!(mdl.SelDBRoleID==did)){if(mdl.dbtables.length>0){var txt=mstrmojo.desc(10075,"You are switching to another Database Connection. In order to execute the tables that you have already added, they need to be present in this new connection. Do you want to proceed?");mstrmojo.confirm(txt,[mstrmojo.Button.newInteractiveButton(mstrmojo.desc(219),function(){mdl.set("SelDBRoleID",did);},null,{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-Editor-button",onRender:function(){mstrmojo.css.addClass(this.domNode,"mstrmojo-Editor-button-Yes");}}),mstrmojo.Button.newInteractiveButton(mstrmojo.desc(218),function(){var idx=mstrmojo.array.find(mdl.dbrs,"did",mdl.SelDBRoleID);dblist.set("selectedIndex",idx);},null,{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-Editor-button",onRender:function(){mstrmojo.css.addClass(this.domNode,"mstrmojo-Editor-button-No");}})],mstrmojo.desc(10076,"Switch to another Database Connection?"));}else{mdl.set("SelDBRoleID",did);}}else{if(bForce){mdl.set("SelDBRoleID",did);}}}}function populateDBRoleList(){dblist.set("items",_model.dbrs);if(_model.SelDBRoleID){var idx=mstrmojo.array.find(_model.dbrs,"did",_model.SelDBRoleID);dblist.set("selectedIndex",idx);}}var addButton=new mstrmojo.Button({slot:"0,1",title:mstrmojo.desc(8510,"new db instance"),iconClass:"mstrmojo-ArchitectListIcon addbtn",cssText:"float:right;",onclick:function(evt){_model.loadDBObjects(newDBRole);},onRender:function(evt){this.set("visible",(mstrConfig.useDataBaseInstanceManager===1));}});mstrmojo.WH.DBRoleSelector=mstrmojo.declare(mstrmojo.Box,[mstrmojo._HasContextMenu],{scriptClass:"mstrmojo.WH.DBRoleSelector",markupString:'<div id="{@id}" class="mstrmojo-qb-DBRoleSelector {@cssClass}" style="{@cssText} position:relative;" mstrAttach:click ></div>',alias:"DBRolSel",DBRMnEdt:true,DBRMnDlt:true,DBRMnRn:true,DBRMnDp:true,DBRMnSPr:false,mnuX:0,mnuY:0,load:function(){populateDBRoleList();},postCreate:function(){_DBRMnEdt=this.DBRMnEdt;_DBRMnDlt=this.DBRMnDlt;_DBRMnRn=this.DBRMnRn;_DBRMnDp=this.DBRMnDp;_DBRMnSPr=this.DBRMnSPr;_DBRMns=_DBRMnEdt||_DBRMnDlt||_DBRMnRn||_DBRMnDp||_DBRMnSPr;},children:[{scriptClass:"mstrmojo.Table",rows:1,cols:2,cssClass:"mstrmojo-qb-DBRoleSelector-header",layout:[{cells:[{cssText:"padding-left: 5px; padding-right: 5px;"},{cssText:"height: 20px; padding-right:3px;"}]}],children:[{scriptClass:"mstrmojo.Label",slot:"0,0",cssClass:"mstrmojo-qb-DBRoleSelector-header",text:mstrmojo.desc(1462,"Database Connections")},addButton,]},dblist],initModel:function(model){_model=model;model.attachEventListener("dbroleSelection",this.id,populateDBRoleList);},onheightChange:function(e){this.dbrlist.set("height",parseInt(e.value,10)-25+"px");},onwidthChange:function(e){this.dbrlist&&this.dbrlist.domNode&&(this.dbrlist.domNode.style.width="auto");},onclick:function(evt){var target=$DOM.eventTarget(evt.hWin,evt.e);if(!target){return ;}if(target.className==="DelDbr mstrmojo-ArchitectListIcon div"){_ti=parseInt(target.parentElement.attributes.di.nodeValue);var targetPosition=$DOM.position(target),basePosition=$DOM.position(this.domNode);this.mnuX=targetPosition.x-basePosition.x;this.mnuY=targetPosition.y-basePosition.y+target.clientHeight;this.showContextMenu();}},getMenuPosition:function getMenuPosition(){return{x:this.mnuX,y:this.mnuY};},executeCommand:function(item){_ti=this.dbrlist.selectedIndex;switch(item.did){case"Edit":_model.loadDBObjects(editDBRole);break;case"Delete":deleteDBRole();break;case"Rename":var dbrcb={success:function(dbr){nameEdit.dbr=dbr;nameEdit.open();},failure:function(res){}};retrieveDBRole(_ti,dbrcb);break;case"Duplicate":duplicateDBRole();break;case"Set_as_Primary":setAsProjectPrimaryDBRole();break;}},onRender:function(){var menuItems=new Array();var item;var ic=0;for(lc=0;lc<_menuItems.length;lc++){item=_menuItems[lc];switch(item.did){case"Edit":if(_DBRMnEdt){menuItems[ic]=item;ic++;}break;case"Delete":if(_DBRMnDlt){menuItems[ic]=item;ic++;}break;case"Rename":if(_DBRMnRn){menuItems[ic]=item;ic++;}break;case"Duplicate":if(_DBRMnDp){menuItems[ic]=item;ic++;}break;case"Set_as_Primary":if(_DBRMnSPr){if(ic>0){menuItems[ic]={did:-1,n:"-"};ic++;}menuItems[ic]=item;ic++;}break;}}this.cm=menuItems;}});})();