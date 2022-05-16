(function(){mstrmojo.requiresCls("mstrmojo.form","mstrmojo.hash","mstrmojo.date","mstrmojo.dom","mstrmojo.NumberFormat","mstrmojo.Button");var $DESC=mstrmojo.desc,$NIB=mstrmojo.Button.newInteractiveButton,$D=mstrmojo.date,_DT=function(){return mstrmojo.locales.datetime;};function toPage(me,params){mstrmojo.form.send(params,null,"post");}function openHistoryPage(me,relNum){var m=me.model;toPage(me,{evt:3124,src:mstrApp.name+"."+mstrApp.pageName+".3124",relativePageNumber:relNum,messageID:m.mid,rwb:m.bs});}function toMode(doc,mode){var m=doc.model;var conf={evt:2048001,messageID:m.mid,rwb:m.bs};if(mode<50||mode===2048){conf.visMode=0;conf.currentViewMedia=mode;}else{conf.visMode=mode;conf.currentViewMedia=1;}toPage(doc,conf);}function handleClose(me){var prevViewMedia=mstrApp.prevViewMedia;if((!prevViewMedia&&prevViewMedia!==0)||prevViewMedia===-1){openHistoryPage(me,-1);}else{if(prevViewMedia===0){me.designViewMode();}else{toMode(me,prevViewMedia);}}}function reload(doc,reprompt,refresh,regen){var m=doc.model;toPage(doc,{evt:2048030,src:m.bp+".2048030",rePrompt:reprompt,fresh:refresh,regenerate:regen,rwb:m.bs});}function updateZoomValue(doc,bSuppressEvt){var m=doc.model,ztp=(m&&m.ztp)||0,zf=(m&&m.zf)||1,newid=ztp+":"+zf,ops=doc.zoomOptions,newv;if(ops){var idx=mstrmojo.array.find(ops,"dssid",newid);if(idx>-1){newv=ops[idx];}}if(!newv){newv={n:parseInt(zf*100,10)+"%",dssid:newid,f:zf,tp:ztp};}if(bSuppressEvt===true){doc.zoomValue=newv;}else{doc.set("zoomValue",newv);}}function prompt2save(me,title,msg,fn,params,saveParam){var m=me.model,dty=m&&m.dty;if(!dty){fn(me,params);return ;}var btnHalo="#666";mstrmojo.confirm(msg,[$NIB($DESC(1442),function(){mstrmojo.requiresCls("mstrmojo.Serializer");me.save(saveParam);},btnHalo),$NIB($DESC(2140),null,btnHalo)],title);}function forceSaveAs(me){var m=me.model;m.showDialogBeforeSave=false;mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(){},failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}},{taskId:"setPreference",prefs:"askBeforeSaveChanges\u001E2"});}var EXP_HTML=-1,EXP_PDF=3,EXP_EXCEL=4,EXP_FLASH=7;mstrmojo._DocOIVMMethods={staticViewMode:function svm(){toMode(this,1);},interactiveViewMode:function ivm(){toMode(this,2);},editableMode:function evm(){toMode(this,4);},flashViewMode:function fvm(){toMode(this,8);},IVEMode:function ive(){toMode(this,2048);},IVEHelp:function ive(){var helpUrl=(mstrApp.helpUrl||"../help/")+"WebUser/WebHelp/Lang_"+(mstrApp.helpLocaleId?mstrApp.helpLocaleId:mstrApp.localeId)+"/MicroStrategy_Web_Help.htm#";window.open(helpUrl+"about_interactive_visual_data_exploration.htm","_blank");return true;},remainExpressViewMode:function remainExpress(){},designViewMode:function dvm(){toPage(this,{evt:3104,rwDesignMode:1,messageID:this.model.mid,rwb:this.model.bs});},convertToDoc:function ctd(){var me=this;mstrmojo.confirm($DESC(8127),[$NIB($DESC(1442),function(){me.designViewMode();},null),$NIB($DESC(2140),null,null)]);},saveAs:function(evt){this.save();},save:function save(param){var m=this.model;toPage(this,mstrmojo.hash.copy(param,{evt:3102,applyChanges:false,executionMode:2,parentFolderID:m.sfid||m.pfid,saveFromDesignMode:false,rwb:m.bs}));},dSave:function dSave(){var me=this,m=me.model,isnew=m&&m.isnew,isRWReadonly=m&&m.isRWReadonly;maxLen=60;truncateName=m.n;if(truncateName.length>maxLen){truncateName=truncateName.substr(0,maxLen-1)+"...";}if(isnew||isRWReadonly){this.save();}else{var _showDialogBeforeSave=mstrApp.features["ask-before-save-changes"],btnHalo="#666";if(_showDialogBeforeSave){var id="dialogBeforeSave",fnDestroy=function(){mstrmojo.all.dialogBeforeSave.destroy();};mstrmojo.insert({scriptClass:"mstrmojo.Dialog",id:id,title:$DESC(5728),cssText:"min-width:475px;max-width:600px;",btnAlignment:"right",buttons:[$NIB($DESC(1442),function(){var p=mstrmojo.all[id];if(p.t.ctrlChk.checked){me.setDontAskAgain();mstrApp.features["ask-before-save-changes"]=false;}me.directSave();fnDestroy();},btnHalo),$NIB($DESC(218),function(){var p=mstrmojo.all[id];if(p.t.ctrlChk.checked){forceSaveAs(me);}me.save();fnDestroy();},btnHalo),$NIB($DESC(2140),fnDestroy,btnHalo)],children:[{scriptClass:"mstrmojo.Table",alias:"t",rows:2,cols:1,children:[{scriptClass:"mstrmojo.Label",text:$DESC(11165).replace(/##/,"<b>"+truncateName+"</b>"),visible:true,cssText:"height:60px;",slot:"0,0"},{scriptClass:"mstrmojo.CheckBox",label:$DESC(211),alias:"ctrlChk",visible:true,checked:false,slot:"1,0"}]}]}).render();}else{me.directSave();}}},setDontAskAgain:function setDontAskAgain(){var me=this,m=me.model;m.showDialogBeforeSave=false;mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(){},failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}},{taskId:"setPreference",prefs:"askBeforeSaveChanges\u001E0"});},directSave:function directSave(){var me=this,m=me.model;var name=mstrmojo.string.decodeHtmlString(m.n);mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(){mstrmojo.alert($DESC(3336).replace("##",m.n));},failure:function(){mstrmojo.alert($DESC(4107));}},{taskId:"saveRW",msgID:m.mid,folderID:m.sfid||m.pfid,objName:name,objDesc:m.desc,saveAsFlags:1,taskEnv:"xhr",taskContentType:"json"});},browseParent:function pFldr(){var m=this.model,params={evt:3010};if(!m.pfh){params.evt=2001;params.folderID=m.pfid;if(m.sysFolder){params.systemFolder=m.sysFolder;}}toPage(this,params);},close:function cl(){handleClose(this);},openPage:function opPg(relNum){openHistoryPage(this,relNum);},saveToInbox:function inbox(){var me=this;mstrApp.serverRequest({taskId:"addDocToHistoryList",rwb:me.model.bs},{success:function(){var f=me.model.features;if(f){if(f.set){f.set("enable-add-history-list",false);}else{f["enable-add-history-list"]=false;}}mstrmojo.alert($DESC(8047));}});},ShowSharingEditor:function ShowSharingEditor(){var $ID="sharingEditor",sharingEditor=mstrmojo.all[$ID],me=this,m=me.model,SAVE_AS_SHARE_EDITOR=11,isBlankDoc=m.isBlankDocument,openSharingEditor=function(oi){if(sharingEditor){sharingEditor.set("oi",oi);sharingEditor.objectName=m.n;sharingEditor.href=null;sharingEditor.mid=m.n;}else{sharingEditor=new mstrmojo.SharingEditor({guestModeEnabled:mstrApp.guestModeEnabled,mid:m.mid,id:$ID,oi:oi,href:null,isLinkDirty:true,viewMode:1,lastState:0});}sharingEditor.open();},cb={success:function(res){openSharingEditor(res.objects[0]);},failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}};if(isBlankDoc){var btnHalo="#666";mstrmojo.confirm(mstrmojo.desc(9932),[$NIB($DESC(1442),function(){me.save({saveAsOrigin:SAVE_AS_SHARE_EDITOR});},btnHalo),$NIB($DESC(2140),null,btnHalo)],mstrmojo.desc(8101));}else{mstrmojo.xhr.request("POST",mstrConfig.taskURL,cb,{taskId:"getObjectInfo",objectIDs:m.oid,objectTypes:55,includeACL:!!mstrApp.features["web-use-sharing-editor"],sessionState:mstrApp.sessionState});}},createPersonalView:function ctPV(){var me=this,m=me.model,isnew=m&&m.isnew;if(isnew){var btnHalo="#666";mstrmojo.confirm(mstrmojo.desc(2510),[$NIB($DESC(1442),function(){mstrmojo.requiresCls("mstrmojo.Serializer");me.save({saveAsOrigin:10});},btnHalo),$NIB($DESC(2140),null,btnHalo)],mstrmojo.desc(9173));}else{var n=m.n,pvdid="mstrPVD",params={scriptClass:"mstrmojo.PersonalViewSaveAs",id:pvdid,objectType:55,objectSubType:14081},dlg=mstrmojo.all[pvdid]||mstrmojo.insert(params);if(n){var d=$D.getDateJson(new Date());n+=" "+$D.formatDateInfo(d,_DT().DATEOUTPUTFORMAT)+" "+$D.formatTimeInfo(d,_DT().TIMEOUTPUTFORMAT);dlg.set("name",n);}dlg.msgID=this.model.mid;dlg.open();}},reprompt:function rpmpt(){reload(this,true,false,false);},refresh:function rfsh(){reload(this,false,false,false);},rerun:function rerun(){reload(this,false,true,false);},toggleAutoRefresh:function(e){var widget=e.src,controller=this.model.controller,enabled=controller.isAutoRefreshEnabled();controller[(enabled?"stop":"start")+"AutoRefresh"]();widget.set("iconClass",(enabled?"tbStart":"tbStop")+"AutoRefresh");widget.domNode.setAttribute("title",enabled?"*Resume Auto Refresh*":"*Pause Auto Refresh*");},docVisualizationModeAJAX:function vizAjax(){toMode(this,51);},docVisualizationModeFlash:function vizFlash(){toMode(this,50);},sendNow:function sndNow(){prompt2save(this,mstrmojo.desc(2331,"Send Now"),mstrmojo.desc(2513,"You must save the report/document before you can send it."),toPage,{evt:3037,objectType:55,objectSubType:14081,messageID:this.model.mid},{saveAsOrigin:2});},scheduleHL:function scHL(){prompt2save(this,$DESC(5017,"Subscribe to History List"),$DESC(2510,"You must save the report/document before you can subscribe to it."),toPage,{evt:3128,objectType:55,objectSubType:14081,messageID:this.model.mid},{saveAsOrigin:3});},zoomValue:null,zoom:function zoom(dssid){var nf=mstrmojo.NumberFormat.getInstance(mstrConfig.decimalSep,mstrConfig.thousandsSep);var parts=(dssid!==null)?String(dssid).split(":"):[],ztp=parseInt(parts[0],10),zfStr=parts[1],zf=nf.parse(zfStr);if(isNaN(ztp)||(!ztp&&isNaN(zf))){return ;}var model=this.model;if(ztp===1||ztp===2){var lv=this.selected,l=(lv&&lv.docLayout)||null,d=l&&(l.containerNode||l.domNode),docEl=d&&d.ownerDocument.documentElement,currzf=(model&&model.zf)||1;var fnFitDimension=function(dim){var x=d&&d["offset"+dim];if(!x){return 1;}var xWin=Math.max(1,docEl["client"+dim]);return Math.min(4,Math.max(0.1,Number(currzf*xWin/x).toFixed(2)));};zf=fnFitDimension("Width");if(ztp===2){zf=Math.min(zf,fnFitDimension("Height"));}zfStr=nf.format(zf);}var newid=ztp+":"+zfStr;if(newid!==(this.zoomValue&&this.zoomValue.dssid)){var me=this;model.getDataService().setDocZoom({zoomType:ztp,zoomFactor:zfStr},{success:function(res){model.zf=res.zf;model.ztp=res.ztp;model.replaceLayout(res.currlaykey,res);model.raiseEvent({name:"rebuildLayout"});updateZoomValue(me,false);me=null;},failureName:"zoom.set"});}},exportCmd:function exportCmd(mode,gridKey){var m=this.model,exEvt=(parseInt(mode,10)===EXP_HTML)?3130:3132,exOptions=m.exopt,promptUC=m.huc&&mode===EXP_FLASH,promptUser=exOptions.s&&(mode===EXP_EXCEL||mode===EXP_PDF)&&!gridKey,bGbAll=false,bMulti=false;if(promptUser){if(!!(m.defn&&m.defn.layouts&&m.defn.layouts.length>1)){bMulti=true;}else{var lyt=this.selected,gb=lyt&&lyt.gb&&lyt.children[1];bGbAll=(!gb||gb.areUnitsSetToAll());if(bGbAll){promptUser=false;}}}var fnExport=function(){var params={evt:exEvt,src:mstrApp.name+"."+exEvt};if(exEvt===3132){params.executionMode=mode;if(gridKey!=null){params.gridKey=gridKey;}}if(!promptUser){params.rwb=m.bs;}else{var s=mstrmojo.Serializer;var evts=[[2048062,m.bp+".2048062","mode",exOptions.m,"range",exOptions.r],[]];mstrmojo.hash.forEach(params,function(v,k){if(k==="executionMode"){evts[1]=evts[1].concat([k,v]);}else{evts[1].push(v);}});params.evt=1024001;params.src=m.bp+".1024001";params.events=s.serializeValueGroup(evts);params["1024001"]=1;params.messageId=m.mid;}params.name=Date.parse(new Date());var exFn=function(){mstrmojo.form.send(params,null,null,(exOptions.n)?"_blank":"mstrExportWindow");};if(!mstrmojo.dom.isIE||mode!==EXP_FLASH){exFn();}else{mstrmojo.alert(exOptions.ds[5873],exFn);}};var ds=exOptions.ds,btnHalo="#666",fnPrompt;if(promptUser||promptUC){fnPrompt=function(){var id="mojoExOpx9",fnDestroy=function(){mstrmojo.all.mojoExOpx9.destroy();};mstrmojo.insert({scriptClass:"mstrmojo.Dialog",id:id,title:ds[971],cssText:"min-width:225px;max-width:325px;",btnAlignment:"right",buttons:[$NIB(ds[1442],function(){mstrmojo.requiresCls("mstrmojo.Serializer");var p=mstrmojo.all[id];if(bMulti){exOptions.r=p.ctrlLyt.selected;}if(!bGbAll){exOptions.m=(p.ctrlChk.checked)?0:1;}fnDestroy();fnExport();},btnHalo),$NIB(ds[2140],fnDestroy,btnHalo)],children:[{scriptClass:"mstrmojo.Label",text:ds[7482],visible:promptUC},{scriptClass:"mstrmojo.DropDownList",title:ds[246],cssClass:"field",cssDisplay:"block",alias:"ctrlLyt",visible:!!bMulti,idx:exOptions.r,options:[{n:ds[5137],v:0},{n:ds[5138],v:1}]},{scriptClass:"mstrmojo.CheckBox",label:ds[5165],cssClass:"field",cssDisplay:"block",alias:"ctrlChk",visible:!!!bGbAll&&promptUser,checked:(exOptions.m===0)}]}).render();};}if(mode===EXP_EXCEL&&ds["3809"]!==undefined&&!gridKey){mstrmojo.confirm(ds["3809"],[$NIB(ds[1442],fnPrompt||fnExport,btnHalo),$NIB(ds[2140],null,btnHalo)]);}else{if(fnPrompt){fnPrompt();}else{fnExport();}}},printPDF:function prntPDF(){this.exportCmd(EXP_PDF);},openHome:function openHome(me){toPage(me,{evt:3010,src:mstrApp.name});},updateZoom:function updateZoom(){updateZoomValue(this,false);},__onmixin__:function __onmixin__(){updateZoomValue(this,true);},resetSelections:function resetSelections(){var me=this,m=me.model;m.getDataService().resetSelections(null,false,{success:function(res){if(res.disablePU){m.loadLayout(res);return ;}if(res.pukeys){var pu=m.partialUpdate(res.data,m.getUnitDefinitions(res.pukeys)),dc=m.getLayoutDataCache(m.getCurrentLayoutKey());mstrmojo.hash.forEach(pu.upd,function(v,uid){var w=mstrmojo.all[uid];if(w&&w.defn&&w.defn.t==mstrmojo.EnumRWUnitType.PANELSTACK){var psd=dc&&dc[uid]&&dc[uid].data,selKey=psd&&psd.selKey;if(selKey&&w.selectedKey!=selKey){w.defn.set("selKey",selKey);}w.setDirtyChildren();}});}var layouts=me.getLayouts(),len=(layouts&&layouts.length)||0,curlaykey=m.getCurrentLayoutKey();for(var i=0;i<len;i++){var layout=layouts[i];if(layout.defn&&layout.defn.loaded&&curlaykey!=layout.k){layout.defn.loaded=false;}}}});}};}());