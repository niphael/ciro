(function(){mstrmojo.requiresCls("mstrmojo.HTMLButton","mstrmojo.HBox","mstrmojo.Label","mstrmojo.Table","mstrmojo.Editor","mstrmojo.WH.DBRoleSetting","mstrmojo.WH.DBRoleDSNConnection","mstrmojo.WH.DBRoleSettingPulldown","mstrmojo.WH.Password");mstrmojo.requiresDescs(221,1162,1442,1834,8512,8513,8514);function trim(st){var str=new String("");str=st.toString();if(!str){return"";}return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");}function validate(mdl,dbe){var nm=trim(dbe.txtname.text);if(nm==""){mstrmojo.alert(mstrmojo.desc(10068,"The Database Connection Name cannot be empty."));return false;}if(nm.indexOf("\\")!=-1){mstrmojo.alert("Invalid Character found in name \\");return false;}if(nm.indexOf("[")!=-1){mstrmojo.alert("Invalid Character found in name [");return false;}if(nm.indexOf("]")!=-1){mstrmojo.alert("Invalid Character found in name ]");return false;}if(trim(dbe.txtlogin.text)==""){mstrmojo.alert(mstrmojo.desc(10069,"The User field cannot be empty."));return false;}if(dbe.dsninfo.selectlist.selectedID===0){var sdsn=dbe.dsninfo.tbl.contents.dsnlist.selectedItem;if(!sdsn){mstrmojo.alert(mstrmojo.desc(10070,"Please select a DSN first"));return false;}if(sdsn.des=="0"){mstrmojo.alert(mstrmojo.desc(10070,"Please select a DSN first"));return false;}}return true;}function addContents(mdl,dbe){dbe.dsninfo.dbmslist.set("items",mdl.dbms);}function populate(dbe){var dbr=dbe.dbrole;var conn=dbr.connstr;if(!conn){if(mstrApp.isCloud){dbe.dsnSelector.WHDSNLESS.onclick();}else{dbe.dsnSelector.WHDSNLESS.onclick();}}else{var conntype=(conn.split("=")[0]).toUpperCase();if(conntype=="DSN"){dbe.dsnSelector.WHDSN.onclick();}else{dbe.dsnSelector.WHDSNLESS.onclick();}}if(parseInt(dbr.shared,10)===1){dbe.sharedConnection.checked=true;dbe.sharedConnection.refresh();}var dsn=dbe.dsninfo;if(dbr&&!dbr.des){dbr.des=dbr.n;}dbr.des=(!mstrApp.isCloud)?dbr.n:dbr.des;dbr.ln=(dbr.ln==null)?"":dbr.ln+"";dbe.txtlogin.set("text",(dbr.ln==null)?"":dbr.ln);dbr.password=(dbr.password==null)?"":dbr.password+"";dbe.txtpwd.set("text",(dbr.password==null)?"":dbr.password.replace(/&amp;/g,"&"));dbe.txtname.set("text",(dbr.n==null)?"":dbr.des);if(conn){dsn.set("info",dbr);}else{dsn.info=dbr;}dsn.dbmslistDSN.set("selectedID",dbr.dbms);}function getDBInfo(dbe,dbr){var dbms=(!dbe.useDSN)?dbe.dsninfo.dbmslist.selectedItem:dbe.dsninfo.dbmslistDSN.selectedItem;if(!dbms){dbms=dbe.dsninfo.dbmslistDSN.selectedItem;}if(mstrApp.isCloud){dbr.des=dbe.txtname.text;dbr.n=dbr.des+"___"+new Date().getTime();}else{dbr.n=dbe.txtname.text;}dbr.dbms=dbms.did;dbr.dbr_type="2";dbr.owned="1";dbr.writable="1";dbr.shared=dbe.sharedConnection.isChecked()?"1":"0";dbr.db_type=dbe.dsninfo.dbtype();dbr.connstr=dbe.dsninfo.connstr();dbe.txtlogin.text=dbe.txtlogin.text+"";dbr.ln=dbe.txtlogin.text;dbe.txtpwd.text=dbe.txtpwd.text+"";dbr.password=dbe.txtpwd.text;switch(dbr.db_ver){case dbe.dsninfo.DbVs.DbVSybaseIQ112:case dbe.dsninfo.DbVs.DbVSybaseIQ12:case dbe.dsninfo.DbVs.DbVSybaseIQ127:case dbe.dsninfo.DbVs.DbVSybaseIQ15:case dbe.dsninfo.DbVs.DbVSybaseIQ151:case dbe.dsninfo.DbVs.DbVSybaseIQ152:dbr.cefu="0";break;default:dbr.cefu="1";break;}if(dbr.db_type==dbe.dsninfo.DbTs.DbTHive){dbr.odbcv="20";}}function apply(dbe){var dbr=dbe.dbrole;getDBInfo(dbe,dbr);var params={taskId:"arch.saveDBRole",sessionState:dbe.sessionState,dbroleinfo:JSON.stringify(dbr)};mstrmojo.xhr.request("POST",mstrmojo.App.taskURL,{success:function(res){dbe.callback.success(dbe.id);dbe.close();},failure:function(res){var c=res&&res.getResponseHeader("X-MSTR-TaskErrorCode");c=(c<0)?(4294967296+parseInt(c,10)):c;switch(c){case 2147749923:mstrmojo.alert(mstrmojo.desc(10077,"The Database connection with name # is already in use. Please provide a different name").replace("#",dbr.des));break;default:mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg").replace(/com\.microstrategy\.(.*): \((.*)\)/,"$2").substring(0,500));dbe.callback.success(dbe.id);dbe.close();}}},params);}mstrmojo.WH.DBRoleEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.WH.DBRoleEditor",zIndex:100,id:"",help:mstrApp.helpTopics&&mstrApp.helpTopics.DBRole,dbrole:null,useDSN:true,cssClass:"mstrmojo-ObjectInfoEditor",sessionState:null,callback:null,postBuildRendering:function(){if(this._super){this._super();}addContents(this.model,this);},ondragend:function ondragmove(ctxt){var QBuilderPage=mstrmojo.all.QBuilderPage;if(QBuilderPage){var w=parseInt(QBuilderPage.width)-parseInt(ctxt.src.node.clientWidth);var y=parseInt(QBuilderPage.height)-parseInt(ctxt.src.node.clientHeight);var wy=ctxt.tgt.pos.y;var wx=ctxt.tgt.pos.x;if(wy<1){this.editorNode.style.top="1px";}if(wx<1){this.editorNode.style.left="1px";}if(wy>y){this.editorNode.style.top=y+"px";}if(wx>w){this.editorNode.style.left=w+"px";}}},onOpen:function(){populate(this);},onOK:function(){if(validate(this.model,this)){return apply(this);}else{return false;}},onCancel:function(){this.callback.cancel(null);},onRender:function(){if(this.containerNode){this.containerNode.style.height="100%";this.containerNode.style.padding="20px 20px 0px 20px";this.txtlogin.tbl.txt.domNode.style.width="320px";this.txtpwd.tbl.txt.domNode.style.width="320px";this.txtname.tbl.txt.domNode.style.width="320px";}},children:[{scriptClass:"mstrmojo.Table",rows:1,cols:4,cssClass:"mstrmojo-dbrole-dsnOption cf",alias:"dsnSelector",layout:[{cells:[{cssText:"width:0%;"},{cssText:"width:50%;"},{cssText:"width:40%;"},{cssText:"width:10%;"}]}],children:[{scriptClass:"mstrmojo.Label",markupString:'<div class="mstrmojo-radioButton-unselected" mstrAttach:click></div>',cssText:"padding-left:20px; font-weight:bold;",text:mstrmojo.desc(10066,"DSNless Connections"),visible:!mstrApp.isCloud,slot:"0,1",alias:"WHDSNLESS",onclick:function(){this.parent.parent.useDSN=false;mstrmojo.css.removeClass(this.domNode,"mstrmojo-radioButton-unselected");mstrmojo.css.addClass(this.domNode,"mstrmojo-radioButton-selected");mstrmojo.css.removeClass(this.parent.WHDSN.domNode,"mstrmojo-radioButton-selected");mstrmojo.css.addClass(this.parent.WHDSN.domNode,"mstrmojo-radioButton-unselected");this.parent.parent.dsninfo.addSelectList();}},{scriptClass:"mstrmojo.Label",markupString:'<div class="mstrmojo-radioButton-unselected" mstrAttach:click></div>',cssText:"padding-left:20px; font-weight:bold;",text:mstrmojo.desc(10067,"DSN Connections"),visible:!mstrApp.isCloud,slot:"0,2",alias:"WHDSN",onclick:function(){this.parent.parent.useDSN=true;mstrmojo.css.removeClass(this.domNode,"mstrmojo-radioButton-unselected");mstrmojo.css.addClass(this.domNode,"mstrmojo-radioButton-selected");mstrmojo.css.removeClass(this.parent.WHDSNLESS.domNode,"mstrmojo-radioButton-selected");mstrmojo.css.addClass(this.parent.WHDSNLESS.domNode,"mstrmojo-radioButton-unselected");this.parent.parent.dsninfo.useDSN();}}]},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-wh-dbconnection-label",alias:"conninfo",text:mstrmojo.desc(1834,"Connection Information")},{scriptClass:"mstrmojo.WH.DBRoleDSNConnection",alias:"dsninfo"},{scriptClass:"mstrmojo.WH.DBRoleSetting",alias:"txtlogin",caption:mstrmojo.desc(8513,"login:")},{scriptClass:"mstrmojo.WH.Password",alias:"txtpwd",caption:mstrmojo.desc(1162,"password:"),isPassword:true},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-wh-connectionname-label",alias:"nameinfo",text:mstrmojo.desc(8514,"name the connection")},{scriptClass:"mstrmojo.WH.DBRoleSetting",alias:"txtname",caption:mstrmojo.desc(2211,"Name:")},{scriptClass:"mstrmojo.Label",cssText:"font-weight:bold; width:100%; padding:4px 0px;",text:""},{scriptClass:"mstrmojo.CheckBox",cssText:"width:100%;",cssClass:"mstrmojo-wh-shareconnection",alias:"sharedConnection",visible:!mstrApp.isCloud,label:mstrmojo.desc(10071,"Share this connection with everybody")},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-architect-Editor-buttonBox",slot:"buttonNode",cssText:"float:right;background:transparent;height:45px;",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-architect-OKButton",text:mstrmojo.desc(1442,"OK"),onclick:function(evt){var e=this.parent.parent;var ret=true;if(e.onOK){ret=e.onOK();}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-architect-CancelButton",text:mstrmojo.desc(221,"Cancel"),onclick:function(evt){var e=this.parent.parent;if(e.onCancel){e.onCancel();}e.close();}}]}]});})();