(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.storage.DOMLocalStorage","mstrmojo.DebugResSetStore","mstrmojo.BarcodeReader","mstrmojo.SimpleXHR","mstrmojo.android.EnumOrientationTypes");var SIZE_PHONE=4.3,SIZE_TABLET=10.1,DPI_SIZES=[160,213,240,320,480],DPI=-1;var $D=mstrmojo.dom,$MATH=Math,_cfgKey="DefaultMobileDeviceConfig",_diagnosticModeKey="DiagnosticMode",debug=false,startProfile=0,EnumOrientationTypes=mstrmojo.android.EnumOrientationTypes,OR_PORTRAIT=EnumOrientationTypes.PORTRAIT,OR_LANDSCAPE=EnumOrientationTypes.LANDSCAPE,lockedOrientation=0,profileData;function logJsMethod(direction,when,methodName,className){if(debug){var id=className+"::"+methodName;if(direction){if(!profileData){startProfile=when;profileData={};}profileData[id]=when;console.log(id+" enter: "+(when-startProfile));}else{console.log(id+" exit: "+(when-startProfile)+"\t"+(when-profileData[id]));delete profileData[id];if(mstrmojo.hash.isEmpty(profileData)){profileData=null;}}}}function debugLog(){if(debug){console.log("Log:",arguments);}}window.mstrMobileApp={isProxy:true,setTaskServletName:mstrmojo.emptyFn,putSession:mstrmojo.emptyFn,setBinaryFormat:mstrmojo.emptyFn,setDiagnosticMode:mstrmojo.emptyFn,useBinaryFormat:function(){return false;},getDiagnosticMode:function(){return $LS.getItem(_diagnosticModeKey)===true;},enterJavaScriptMethod:function(when,methodName,className){logJsMethod(true,when,methodName,className);},exitJavaScriptMethod:function(when,methodName,className){logJsMethod(false,when,methodName,className);},reloadDefaultConfiguration:function(){return true;},takeScreenShot:function(){debugLog("take screen shot",arguments);},getScreenShot:function(){debugLog("retrieve screen shot",arguments);return"";},takeScreenShotAndSend:function(){debugLog("share",arguments);},getDeviceDPI:function getDeviceDPI(){var dpi=DPI,sizes=DPI_SIZES;if(dpi<0){var isTablet=mstrApp.isTablet(),dimensions=mstrApp.getScreenDimensions(),calculatedDPI=$MATH.round($MATH.sqrt($MATH.pow(dimensions.h,2)+$MATH.pow(dimensions.w,2))/(isTablet?SIZE_TABLET:SIZE_PHONE));calculatedDPI=$MATH.min($MATH.max(sizes[0],calculatedDPI),320);mstrmojo.array.forEach(sizes,function(d){if(!isTablet&&d===213){return ;}if(calculatedDPI<d+(d*0.05)){DPI=dpi=d;return false;}});}return dpi;},useNativeMap:function useNativeMap(){return true;},showMapView:function showMapView(forceShow){return ;},hideMapView:function hideMapView(forceShow){return ;},registerMapRendering:function registerMapRendering(id){if(this.mapId&&this.mapId!==id){return false;}this.mapId=id;return true;},deregisterMapRendering:function deregisterMapRendering(id){if(this.mapId===id){delete this.mapId;}},toast:function toast(msg){mstrmojo.alert(msg);},getGeoLocation:function getGeoLocation(callbackName){var cb=mstrmojo.hash.walk(callbackName);cb({coords:{latitude:38.916138,longitude:-77.2183157,altitude:0}});},isTablet:function isTablet(){return(mstrApp.deviceType===4);},showProgress:function showProgress(text){mstrApp.showHTMLProgress(text);},hideProgress:function hideProgress(){mstrApp.hideHTMLProgress();},setNetworkMonitoringEnabled:function(){return ;},loadURL:function(url){window.location=url;},setSysMenu:function setSysMenu(id,groups,labels,actions,checked,icons){var view=mstrmojo.all[id],dialog,items=[];mstrmojo.array.forEach(labels,function(txt,idx){items.push({n:txt,v:groups[idx]+"|"+actions[idx]});});var menuHostView;while(view){if(view.createTitleBarButton){menuHostView=view;break;}view=view.parent;}if(menuHostView){menuHostView.createTitleBarButton("hostedMenuBtn",function(){mstrApp.menuShown();dialog=mstrApp.showDialog({cssClass:"mstrmojo-SimpleOptions",buttons:[mstrmojo.Button.newInteractiveButton("Cancel")],children:[{scriptClass:"mstrmojo.android.SimpleList",isElastic:true,items:items,postselectionChange:function(evt){dialog.close();mstrmojo.all[id].handleMenuItem(this.items[evt.added[0]].v);}}]});},"Menu");}},allowLandscapeOrientation:function(){debugLog("orientation",arguments);},setWaitScreenVisibility:function(){debugLog("wait screen visibility",arguments);},resetDPC:function(){debugLog("reset device passcode",arguments);},openLink:function(uri,target){debugLog("openLink",arguments);window.open(uri,(target||"_blank"));},clearWebViewCache:function(includeDisk){debugLog("clearWebViewCache",includeDisk);},displayHelp:function(){debugLog("help");window.open("http://dev-mrkt-web/producthelp/9.4/mobile/Android/en/index.html","mstrHelp");return"";},displayLearnMore:function(){debugLog("learn more");window.open("http://www.microstrategy.com/m/","mstrLearnMore");return"";},getLocaleInfo:function(){debugLog("getLocale",arguments);var lan="en",cntry="_US";return"metadataLocale:"+lan+",displayLocale:"+lan+",messagesLocale:"+lan+",warehouseDataLocale:"+lan+",numberLocale:"+lan+cntry+",numberLocaleOverride:true";},getResourceBundleJson:function(){debugLog("getResourceBundleJson",arguments);},displaySelectBox:function(cb){debugLog("select_box",arguments);cb(1);},getScreenDimensions:function getScreenDimensions(){var body=document.body;return body.offsetHeight+"|"+body.offsetWidth;},getOrientation:function(){var body=document.body;return body.offsetWidth<body.offsetHeight?OR_PORTRAIT:OR_LANDSCAPE;},saveConfiguration:function(newCfg,silently){$LS.setItem(_cfgKey,newCfg,-1);},getConfiguration:function(){var cfg=$LS.getItemAsString(_cfgKey);if(!cfg){cfg='{"n":"Android","cid":"be4dc468-c070-429f-a8f2-f57491b99c36","v":1,"bld":"9.2.300.069J","dt":3,"cntr":0,"lnk":{"am":1,"rt":0,"nm":"","po":-1,"ipo":true},"gnl":{"ml":250,"nt":60,"ll":12,"mls":50,"uas":true,"usc":true,"usl":true,"usd":true,"fc":true,"mgc":10,"plc":2,"cc":1,"pe":-1,"uptc":-1,"cvi":600,"sci":600,"pn":2,"rar":5,"es":true,"efs":true,"art":2,"ucs":false,"cs":"","ipe":false,"dmatp":10,"dcn":4,"dd":0,"dtm":true,"drn":false,"drsc":false,"drcl":false},"cty":{"am":1,"ow":false,"wsl":[{"nm":"10.21.16.91","po":"8080","pt":"mobile","ty":0,"rt":0,"udc":false,"wsc":{"am":1,"lo":"","ps":""},"pdc":{"am":1,"lo":"","ps":""},"pl":[{"pc":{"am":1,"lo":"mhaugen","ps":""},"pn":"MicroStrategy Tutorial (for RW)","sn":"intqe64-1","sp":0,"udc":false,"pid":"51D31B4070ABC9D9A7F7C2A743352574"},{"pc":{"am":1,"lo":"mhaugen","ps":""},"pn":"MicroStrategy Tutorial (for RW)","sn":"intqe64-2","sp":0,"udc":false,"pid":"8766A305D2D235181079A1D2A5A1565D"}]}]},"hsc":{"tp":1,"cst":{"fmt":{"bkg":{"tp":1,"fll":{"tp":0,"clr":0}},"ttl":{"tp":1,"cap":"MicroStrategy Mobile"},"btn":{"fnt":16777215,"stl":2,"brd":16777215,"fll":{"tp":0,"clr":2500134}},"btnl":{"rc":3,"cc":1},"vw":{"rpt":true,"rct":true,"stg":true,"hlp":true}},"btns":[{"act":5,"cap":"Shared Library","dsc":"Navigates to the default folder of the project(s) in the deployment.","icn":1},{"act":4,"cap":"Settings","dsc":"Opens the Application Settings dialog.","icn":1},{"act":6,"cap":"Help","dsc":"Displays the application\'s Help file.","icn":1}]}}}';this.saveConfiguration(cfg);}return cfg;},goBack:mstrmojo.emptyFn,getResSetStore:function getResSetStore(projId){return new mstrmojo.DebugResSetStore(projId);},getResSetStoreMgr:function getResSetStoreMgr(){if(!this.resSetStoreMgr){this.resSetStoreMgr={getResSetStore:function getResSetStore(projId){return new mstrmojo.DebugResSetStore(projId);},removeProjectCaches:function removeProjectCaches(projId){var store=new mstrmojo.DebugResSetStore(projId);store.removeProjectCaches(projId);},clear:function clear(){var store=new mstrmojo.DebugResSetStore();store.clear();}};return this.resSetStoreMgr;}mstrMobileApp.getResSetStoreMgr();},removeProjectCaches:function removeProjectCaches(pid){if(mstrApp.getConfiguration().getCacheEnabled()){mstrApp.getResSetStoreMgr().removeProjectCaches(pid);}},loadMap:function(){debugLog("load map",arguments);},getTitleBarHeight:function(){debugLog("get title bar height",arguments);},nudgeWidget:function(){debugLog("nudge widget",arguments);},scrollerUpdated:function(){debugLog("scrollerUpdated",arguments);},sliceResponse:function(){debugLog("sliceResponse",arguments);},layoutResponse:function(){debugLog("sliceResponse",arguments);},sendCallback:function(){debugLog("send callback",arguments);},showPopupDialog:function(){debugLog("show up Dialog",arguments);},closePopupDialog:function(){debugLog("close Dialog",arguments);},navigateAway:function(){debugLog("navigate away from a document",arguments);},renderDataRow:function(){debugLog("render data row inside info window",arguments);},findAddress:function(){debugLog("find address for geo location",arguments);},hideLayoutSelector:function(){debugLog("hide Layout Selector",arguments);},getAppVersion:function(){return"9.3.000.047";},getSDKVersion:function(){return 15;},getTextAsset:function(path){var xhr=new mstrmojo.SimpleXHR({isTask:false,async:false}),results="";xhr.request("GET","../assets/"+path,{success:function(res){results=res;}});return results;},hasCertificate:function hasCertificate(){return false;},getCertificateAuthenticationFields:function getCertificateAuthenticationFields(){return'{"login_info":{"field":[{"n":"login","tp":"text","dn":"Login: "},{"n":"pwd","pass":true,"tp":"text","dn":"Password: "}],"msg":"Please enter credentials for the certificate server."}}';},getNewCertificate:function getNewCertificate(settings){return'{"prs":{"pr":[{"n":"edat","v":1345242803706},{"n":"issr_n","v":"1.2.840.113549.1.9.1=#1616686c6565406d6963726f73747261746567792e636f6d,cn=was-tzlee77.corp.microstrategy.com,o=microstrategy,l=vienna,st=virginia,c=us"}]}}';},getCertificateDetails:function getCertificateDetails(){return'{"prs":{"pr":[{"n":"edat","v":1345242803706},{"n":"issr_n","v":"1.2.840.113549.1.9.1=#1616686c6565406d6963726f73747261746567792e636f6d,cn=was-tzlee77.corp.microstrategy.com,o=microstrategy,l=vienna,st=virginia,c=us"}]}}';},readBarcodes:function readBarcodes(id,name,paramStr,selectedPrompts,displayKeypadView,callbackStr){if(!paramStr){var bv="28536598";alert("Barcode value: "+bv);mstrmojo.BarcodeReader.onBarcodeResult(id,-1,bv);return ;}var params=JSON.parse(paramStr),factory=mstrApp.modelFactory||mstrApp.viewFactory,es=factory.newElementDataService();params.searchPattern="28536598";es.getElements(params,{success:function(res){mstrmojo.BarcodeReader.onBarcodeResult(id,-1,JSON.stringify(res));},failure:function(details){alert("---Failed");}});},uploadPhotos:function(paramstr,callback){eval(callback+"('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', 'google_logo');");},captureSignature:function(paramStr,callback){eval(callback+"('http://www.modernshortstories.net/thingsonawhitebackground/images/"+(Math.floor(Math.random()*10)+1)+".jpg')");},getCachedTime:function getCachedTime(did,st){return new Date().getTime()-240000;},isDPCEnabled:function isDPCEnabled(){return false;},lockOrientation:function lockOrientation(or){debugLog("lock orientation",arguments);lockedOrientation=or;},releaseOrientation:function releaseOrientation(){debugLog("release orientation",arguments);lockedOrientation=0;},getLockedOrientation:function getLockedOrientation(){return lockedOrientation;},enterFullScreen:function enterFullScreen(){debugLog("enter fullscreen",arguments);},exitFullScreen:function exitFullScreen(){debugLog("exit fullscreen",arguments);},forceRepaint:function forceRepaint(){},restartReconciler:function restartReconciler(){},sendEmail:function sendEmail(address,subject,txtBody,cc){window.location="mailto:"+address+"?Subject="+subject.replace(/ /g,"%20")+"&body="+txtBody.replace(/\r\n/g,"%0D%0A")+"&cc="+(cc||"").replace(/ /g,"%20");},onlineFlag:true,isOnline:function isOnline(){return this.onlineFlag;},isCached:function isCached(realPid,oid,t){return false;},setOnlineMode:function setOnlineMode(isOnline){this.onlineFlag=isOnline;mstrApp.onConnectivityChanged(isOnline);}};$D.attachEvent(document.body,"keydown",function(e){e=e||window.event;var kc=e.keyCode||e.which;if((kc===8)&&!e.shiftKey){if(e.target.nodeName.match(/INPUT/i)&&!e.target.type.match(/SELECT/i)){return true;}$D.preventDefault(window,e);$D.stopPropogation(window,e);mstrmojo.all.mobileApp.goBack();return false;}return true;});}());