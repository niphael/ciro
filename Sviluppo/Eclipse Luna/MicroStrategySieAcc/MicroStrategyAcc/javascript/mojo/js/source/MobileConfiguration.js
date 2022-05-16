(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.array","mstrmojo.color","mstrmojo.hash","mstrmojo.num","mstrmojo.storage.DOMLocalStorage","mstrmojo.StringBuffer","mstrmojo.android.EnumMenuOptions");mstrmojo.requiresDescs(1089,1143,7830,7831,7832,7859,7860,7861,7862,8621);var $A=mstrmojo.array,$AFE=$A.forEach,$HASH=mstrmojo.hash,$MENUS=mstrmojo.android.EnumMenuOptions,_cacheKey="CacheEnabled",_verifyJsonKey="VerifyJson",_diagnosticModeKey="DiagnosticMode",EnumHSButtonType={FOLDER:1,RESULTSET:2,REPORTS:3,SETTINGS:4,SHAREDLIBRARY:5,SUBSCRIPTIONS:8,HELP:6};function isObject(o){return(typeof o==="object");}function getColor(clr){if(isObject(clr)){if(clr.tp){return"transparent";}clr=clr.clr;}return mstrmojo.color.decodeColor(clr);}function findServer(project){var servers=this.getWebServersList(),res=null;$AFE(servers,function(server){$AFE(server.pl,function(proj){if(proj===project){res=server;return false;}});return !res;});return res;}function iterateProjects(searchConfig,serversNode,projectCache){var serverCache=projectCache?projectCache.servers:[],projectFound=false;$AFE(serversNode,function(server){$AFE(server.pl,function(project){var id=project.pid;if(id!==undefined){if(projectCache){projectCache[id]=project;serverCache[id]=server;}if(project[searchConfig.n]===searchConfig.v){projectFound=true;return false;}}});if(projectFound){return false;}});return projectFound;}function reconcileHSType(hsType){var projectID=getHSProjectID.call(this,hsType),hscNode=this._cfg.hsc,projectExists;if(!projectID){return ;}projectExists=iterateProjects({n:"pid",v:projectID},this.getWebServersList());if(!projectExists){hscNode.tp=1;switch(hsType){case 3:delete hscNode.rs;break;case 4:delete hscNode.fd;break;}}}function getHSProjectID(hsType){var projectID,hscNode=this._cfg.hsc;switch(hsType){case 3:projectID=hscNode.rs.oi.pid;break;case 4:projectID=hscNode.fd.oi.pid;break;}return projectID;}function buildCustomHomeScreen(hsc,asFolder){var ths=this,cst=hsc.cst,btns=[],hscType=ths.getHomeScreenType(),devType=ths.getDeviceType();if(hscType===1&&devType!==4){var addSubsButton=true;$AFE(cst.btns,function(btn){if((btn.act===EnumHSButtonType.SUBSCRIPTIONS)||(btn.act===EnumHSButtonType.REPORTS)){addSubsButton=false;return false;}});if(addSubsButton&&(hscType===1||(devType===4&&hscType===2&&cst.fmt.vw.rpt))){btns.push({act:EnumHSButtonType.SUBSCRIPTIONS,txt:mstrmojo.desc(1089,"Subscriptions"),dsc:""});}}$AFE(cst.btns,function(btn){var xlt=ths.xlat[$A.find(ths.xlat,"act",btn.act)],txt=xlt?(btn.cap===xlt.dcp?xlt.cap:btn.cap):btn.cap,dsc=xlt?xlt.dsc:btn.dsc,b={};if(asFolder){b.n=txt;b.desc=dsc;}else{b.txt=txt;b.dsc=dsc;}var icon=btn.icn;if(isObject(icon)){b.icn=icon.img;}var action=btn.act;if(isObject(action)){var objInfo=(action.fd&&action.fd.oi)||(action.rs&&action.rs.oi)||action.rs;b.did=objInfo.did;b.t=objInfo.t;b.st=objInfo.st;b.pid=objInfo.pid;b.ab=objInfo.ab;b.csp=!!(action.fd&&action.fd.csp);}else{b.act=action;if(b.act===EnumHSButtonType.SETTINGS&&!ths.getGeneralSettings().uas){b=null;}}if(b){btns.push(b);}});var config={btns:btns,fmt:{},ttl:""},fmt=cst.btns?cst.fmt:cst;if(fmt){var bgFmt=fmt.bkg,btnFmt=fmt.btn;config.fmt={bg:{tp:bgFmt.tp,v:(bgFmt.tp===1)?getColor(bgFmt.fll.clr):bgFmt.img},btn:{bc:getColor(btnFmt.brd),bg:getColor(btnFmt.fll),c:getColor(btnFmt.fnt),sty:btnFmt.stl}};config.ttl=fmt.ttl.cap;}if(devType===4){config.hlp=fmt.vw.hlp;}return config;}function _loadConfiguration(){var cfg=mstrMobileApp.getConfiguration();return eval("("+cfg+")");}function _initializePrjCache(cfg){cfg._hostUrls={};cfg._projects={servers:{}};}function _clearCachedValues(){delete this._hsType;delete this._hsCfg;delete this._wsl;delete this._gnl;}mstrmojo.MobileConfiguration=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.MobileConfiguration",_cfg:null,xlat:null,init:function init(props){var xl=this.xlat=[],md=mstrmojo.desc;xl.push({act:5,cap:md(7832),dsc:md(7859),dcp:"Shared Library"});xl.push({act:4,cap:md(7831),dsc:md(7861),dcp:"Settings"});xl.push({act:6,cap:md(1143),dsc:md(7862),dcp:"Help"});xl.push({act:3,cap:md(7830),dsc:md(7860),dcp:"Reports"});xl.push({act:EnumHSButtonType.SUBSCRIPTIONS,cap:md(1089),dsc:md(7860),dcp:"Subscriptions"});this._super(props);this._cfg=this._cfg||_loadConfiguration();_initializePrjCache(this);this.cacheEnabled=$LS.getItem(_cacheKey)||false;this.binaryMode=mstrMobileApp.useBinaryFormat();this.verifyJson=$LS.getItem(_verifyJsonKey)===true;this.diagnosticMode=mstrMobileApp.getDiagnosticMode();},getConfiguration:function(){return this._cfg;},saveConfiguration:function(silently){_clearCachedValues.call(this);_initializePrjCache(this);mstrMobileApp.saveConfiguration(JSON.stringify(this._cfg),!!silently);},reloadDefaultConfiguration:function(){mstrMobileApp.reloadDefaultConfiguration();this._cfg=_loadConfiguration();_clearCachedValues.call(this);_initializePrjCache(this);},setWebServerList:function(wsl){this._wsl=this._cfg.cty.wsl=wsl;_initializePrjCache(this);return this;},getWebServersList:function(){if(!this._wsl){this._wsl=this._cfg.cty.wsl||[];}return this._wsl;},getGeneralSettings:function(){if(!this._gnl){this._gnl=this._cfg.gnl;}return this._gnl;},getDefaultServerCreds:function(){var cty=this._cfg.cty;cty.wsdc=cty.wsdc||{am:1,lo:"",ps:""};return cty.wsdc;},getBackgroundSyncSettings:function(){var gnl=this.getGeneralSettings();gnl.bss=gnl.bss||{ebs:false,ui:4,tod:0,wo:false,co:false};gnl.bss.wo=gnl.bss.wo||false;gnl.bss.co=gnl.bss.co||false;return gnl.bss;},setDefaultServerCreds:function(sd){var cty=this._cfg.cty;$HASH.copy(sd,cty.wsdc);return this;},getCacheEnabled:function(){return false;},setCacheEnabled:function(c){this.cacheEnabled=c;$LS.setItem(_cacheKey,c,-1);},getBinaryMode:function(){return this.binaryMode;},setBinaryMode:function(v){if(this.binaryMode!==v){this.binaryMode=v;mstrApp.serverProxy.closeAllSessions();mstrApp.useBinaryFormat=v;mstrMobileApp.setBinaryFormat(v);}},getDeviceType:function(){return this._cfg.dt;},isSubscriptionEnabled:function(){return this.getHomeScreenType()!=2?true:!!this._cfg.hsc.cst.fmt.vw.rpt;},getVerifyJson:function(){return this.verifyJson;},getDiagnosticMode:function(){return this.diagnosticMode;},setDiagnosticMode:function(v){if(this.diagnosticMode!==v){this.diagnosticMode=v;$LS.setItem(_diagnosticModeKey,v,-1);mstrApp.diagnosticMode=v;mstrMobileApp.setDiagnosticMode(v);}},getSettingsAllowed:function getSettingsAllowed(){return this.getGeneralSettings().uas;},isMenuAllowed:function isMenuAllowed(menuItem,menuMask){if((menuMask&menuItem)>0){var generalSettings=this.getGeneralSettings(),vw=this._cfg.hsc.cst?this._cfg.hsc.cst.fmt.vw:{stg:true,hlp:true};switch(menuItem){case $MENUS.SETTINGS:return !!generalSettings.uas&&!!vw.stg;case $MENUS.HELP:return !!vw.hlp;case $MENUS.SHARE:var project=this.getProject(mstrApp.getCurrentProjectId());return(!!generalSettings.es&&project&&!!project.es);case $MENUS.LEARN:return !!generalSettings.slml;default:return true;}}return false;},reconcileHomescreen:function reconcileHomescreen(){var ths=this,hsType=ths.getHomeScreenType(),hs=this._cfg.hsc;switch(hsType){case 1:break;case 2:var btns=[];$AFE(hs.cst.btns,function(btn){var action=btn.act;if(isObject(action)){var objInfo=(action.fd&&action.fd.oi)||(action.rs&&action.rs.oi)||action.rs;if(ths.getProject(objInfo.pid)!==undefined){btns.push(btn);}}else{btns.push(btn);}});if(!btns.length){btns.push({act:5,cap:mstrmojo.desc(7832),icn:1});}hs.cst.btns=btns;break;case 3:case 4:reconcileHSType.call(this,hsType);break;}},getHomeScreenType:function(){if(!this._hsType){var hscNode=this._cfg.hsc;if(hscNode){this._hsType=(typeof hscNode==="number")?hscNode:hscNode.tp;}}return this._hsType;},getHomeScreen:function(asFolder){if(!this._hsCfg){var type=this.getHomeScreenType(),hsc=this._cfg.hsc,cfg;switch(type){case 1:case 2:cfg=buildCustomHomeScreen.call(this,hsc,asFolder);break;case 3:cfg=hsc.rs;if(cfg.oi){cfg=cfg.oi;}break;case 4:cfg=hsc.fd;cfg.hlp=true;break;}this._hsCfg=cfg;}return this._hsCfg;},getProjectByRealPid:function getProjectByRealPid(realPid){var proj;$AFE(this.getWebServersList(),function(server){$AFE(server.pl,function(project){if(realPid===project.realPid){proj=project;return false;}});if(proj){return false;}});return proj;},getProjectByServerAndProjectName:function getProjectByServerAndProjectName(serverName,port,projName){var proj;$AFE(this.getWebServersList(),function(server){$AFE(server.pl,function(project){if((serverName===project.sn)&&(projName===project.pn)){if((port===undefined)||(!!port&&parseInt(port,10)===project.sp)){proj=project;return false;}}});if(proj){return false;}});return proj;},getHostUrlByRealPid:function getHostUrlByRealPid(realPid){var proj=this.getProjectByRealPid(realPid);return this.getHostUrlByProject((proj&&proj.pid)||realPid);},getWebServerUrlByProject:function getWebServerUrlByProject(projectId){var servUrl=this.getHostUrlByProject(projectId);return servUrl.replace(/(servlet\/|asp\/)$/,"");},getCurrentProjectWebServerUrl:function getCurrentProjectWebServerUrl(){return this.getWebServerUrlByProject(mstrApp.getCurrentProjectId());},getHostUrlByProject:function getHostUrlByProject(projectId){var urls=this._hostUrls;if(!urls[projectId]){var server=this.getServerByProjectId(projectId);if(server===undefined){throw new Error("Could not find server for project, pid="+projectId);}var hostUrl=new mstrmojo.StringBuffer();hostUrl.append("http");if(server.rt){hostUrl.append("s");}hostUrl.append("://"+server.nm);var port=server.po;if(port){hostUrl.append(":"+port);}hostUrl.append("/"+server.pt+"/");hostUrl.append(((server.ty===0)?"servlet":"asp")+"/");urls[projectId]=hostUrl.toString();}return urls[projectId];},getTaskUrlByProject:function getTaskUrlByProject(projectId){var server=this.getServerByProjectId(projectId);if(server===undefined){throw new Error("Could not find server for project, pid="+projectId);}return this.getHostUrlByProject(projectId)+mstrConfig.taskURL+((server.ty===1)?".aspx":"");},getProject:function getProject(projectId){var projects=this._projects;if(!projects[projectId]){iterateProjects({n:"pid",v:projectId},this.getWebServersList(),projects);}return projects[projectId];},getProjectHash:function getProjectHash(){var _result={},serverList=this.getWebServersList();if(serverList.length<1){return _result;}var projects=this._projects,dummyProjectID=mstrmojo.num.generateUniqueID(64);iterateProjects({n:"pid",v:dummyProjectID},serverList,projects);_result=$HASH.clone(projects);delete _result.servers;return _result;},getProjectList:function getProjectList(){var projectList=[];$HASH.forEach(this.getProjectHash(),function(project){projectList.push({did:project.pid,n:project.pn,desc:project.sn,st:"Project",t:8,rtf:project.rtf});});return projectList;},clearLoginInfoForProject:function clearLoginInfoForProject(pid){var cfg=this.getConfiguration(),server=this.getServerByProjectId(pid),project=this.getProject(pid),creds=project.udc?server.pdc:project.pc;creds.lo=creds.ps="";},getLoginInfo:function(projectId){var cfg=this.getConfiguration(),server=this.getServerByProjectId(projectId),serverCreds=server.wsc,wsuid=serverCreds.lo||"",wspwd=serverCreds.ps||"",wsam=serverCreds.am,project=this.getProject(projectId),projectCreds=project.pc,uid=projectCreds.lo||"",pwd=projectCreds.ps||"",am=projectCreds.am;if(server.udc){var wsdc=cfg.cty.wsdc;wsam=wsdc.am;wsuid=wsdc.lo||"";wspwd=wsdc.ps||"";}if(project.udc){var pdc=server.pdc;uid=pdc.lo;pwd=pdc.ps;am=pdc.am;}return{wsuid:wsuid,wspwd:wspwd,wsam:wsam,uid:uid,pwd:pwd,am:am};},updateLoginInfo:function updateLoginInfo(projectId,loginInfo){var server=this.getServerByProjectId(projectId),project=this.getProject(projectId),creds=project.udc?server.pdc:project.pc,serverCreds=server.udc?this.getDefaultServerCreds():server.wsc;if(loginInfo.updateCfgAfterLogin&1){serverCreds.lo=loginInfo.wsuid;serverCreds.ps=loginInfo.wspwd;}if(loginInfo.updateCfgAfterLogin&2){creds.lo=loginInfo.uid;creds.ps=loginInfo.pwd;}this.saveConfiguration(false);},getProjectCount:function(){var wsl=this.getWebServersList(),count=0,i=0;for(i=0;i<wsl.length;i++){if(wsl[i].pl){count+=wsl[i].pl.length;}}return count;},getServerByProjectId:function(projectId){var projects=this._projects,servers=projects.servers;if(!servers[projectId]){iterateProjects({n:"pid",v:projectId},this.getWebServersList(),projects);}return servers[projectId];},setPid:function setPid(project){var oldPid=project.pid,oldRealPid=project.realPid,projCache=this._projects,serverCache=projCache.servers,pid=mstrmojo.num.generateUniqueID(32),server=findServer.call(this,project);if(oldPid){delete projCache[oldPid];delete serverCache[oldPid];}if(oldRealPid){delete projCache[oldRealPid];delete serverCache[oldRealPid];}project.pid=pid;delete project.realPid;projCache[pid]=project;serverCache[pid]=server;},setRealPid:function setRealPid(project,value){if(typeof project==="string"){project=this.getProject(project);if(!project){return ;}}var oldRealPid=project.realPid,projCache=this._projects,serverCache=projCache.servers,server=findServer.call(this,project);if(oldRealPid&&oldRealPid!==project.pid){delete projCache[oldRealPid];delete serverCache[oldRealPid];}project.realPid=value;projCache[value]=project;serverCache[value]=server;this.saveConfiguration(true);}});}());