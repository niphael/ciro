(function(){mstrmojo.requiresCls("mstrmojo.base64","mstrmojo.func","mstrmojo.hash");function decodeHeader(value){var rEncoded=/\=\?UTF-8\?B\?(.+?)\?\=/g;if(value&&value.indexOf("=?UTF-8?B?")===0){var decMsg="",result;while((result=rEncoded.exec(value))!==null){decMsg+=mstrmojo.base64.decode(result[1]);}return decMsg;}return value;}function encodeParams(params){var x=-1;var url=[];if(params){for(var p in params){url[++x]=p+"="+encodeURIComponent(params[p]);}}return url.join("&");}function appendUrlParams(method,baseUrl,params){if(method!=="GET"||!params){return baseUrl;}return baseUrl+"?"+encodeParams(params);}function sendXhr(xhr,method,baseUrl,params){method=method.toUpperCase();var app=mstrApp;m=null;if(typeof (microstrategy)!="undefined"&&microstrategy){m=microstrategy;}if(this.isTask){params=mstrmojo.addCSRFTokenToTaskParams(params);params.taskContentType=params.taskContentType||"json";params.taskEnv=params.taskEnv||"xhr";params.xts=new Date().getTime();baseUrl=baseUrl||mstrConfig.taskURL;}if(params&&!params.sessionState&&app&&app.sessionState){params.sessionState=app.sessionState;}var ptp=app.persistTaskParams||m&&m.persistParams;if(ptp){mstrmojo.requiresCls("mstrmojo.hash");mstrmojo.hash.copy(ptp,params);}xhr.open(method,appendUrlParams(method,baseUrl,params),this.async);if(method!=="POST"){params=null;}else{params=encodeParams(params);xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");}xhr.send(params);if(this.async===false){xhr.onreadystatechange();}}function createXhr(){var methods=[function(){return new XMLHttpRequest();},function(){return new ActiveXObject("Msxml2.XMLHTTP");},function(){return new ActiveXObject("Microsoft.XMLHTTP");}];for(var i=0,cnt=methods.length;i<cnt;i++){var xhr;try{xhr=methods[i]();}catch(e){continue;}createXhr=methods[i];return xhr;}throw new Error("mstrmojo.SimpleXHR: Could not create an XHR object.");}function evalResponse(rt){var _rtn=null;try{_rtn=eval("("+rt+")");}catch(ex){_rtn=rt&&mstrmojo.string.trim(rt);}return _rtn;}var MSI_SERVER_NAME_NOT_INITIALIZED=2147760371,MSI_INVALID_SESSION_ID=2147760372,E_MSI_USERMGR_USER_NOTFOUND=2147758245,E_MSI_CONNECT_FAILED=2147759877;function isSessionExpiredError(res){var c=res&&res.getResponseHeader("X-MSTR-TaskErrorCode");c=(c<0)?(4294967296+parseInt(c,10)):c;switch(c){case MSI_SERVER_NAME_NOT_INITIALIZED:case MSI_INVALID_SESSION_ID:case E_MSI_USERMGR_USER_NOTFOUND:case E_MSI_CONNECT_FAILED:return true;}return false;}function xhrSupportsProgress(xhr){return !!(xhr&&("upload" in xhr)&&("onprogress" in xhr.upload));}mstrmojo.SimpleXHR=mstrmojo.declare(null,null,{scriptClass:"mstrmojo.SimpleXHR",isTask:true,async:true,init:function init(props){mstrmojo.hash.copy(props,this);},onreadystatechange:function onreadystatechange(xhr,callback){if(xhr.readyState!==4){return ;}if(typeof callback!=="object"){return ;}try{if((xhr.status===200)||(xhr.status===304)){this.response=callback.textResponse?xhr.responseText:evalResponse(xhr.responseText);if(typeof callback.success==="function"){callback.success(this.response);}}else{if(xhr.status==0){}else{var app=mstrApp,sessionExp=app&&app.onSessionExpired;if(sessionExp&&isSessionExpiredError(xhr)){sessionExp();}else{var _orig=xhr.getResponseHeader;xhr.getResponseHeader=function(name){return decodeHeader(_orig.apply?_orig.apply(xhr,[name]):_orig(name));};if(typeof callback.failure=="function"){callback.failure(xhr);}}}}}catch(ex){mstrmojo.err(ex);}finally{if(typeof callback.complete==="function"){callback.complete();}}},cancel:function(){var didCancel=false;var xhr=this.xhr;if(xhr){delete xhr.onreadystatechange;xhr.isAborted=true;if(xhr.readyState<4){xhr.abort();didCancel=true;}this.xhr=null;}return didCancel;},request:function request(method,baseUrl,callback,params,webSvrUrl,useResFeed,webSrvParams){if(webSvrUrl){if(useResFeed===true){if(!params){params={};}params.srcURL=appendUrlParams("GET",webSvrUrl,webSrvParams);this.request(method,baseUrl,callback,params);}else{mstrmojo.jsonp.request(webSvrUrl,params,callback);}}else{var xhr=createXhr();xhr.onreadystatechange=function(me,x,c){return function(){me.onreadystatechange.call(me,x,c);};}(this,xhr,callback);if(xhrSupportsProgress(xhr)&&callback.progress){xhr.onprogress=function(me,x,c){return function(evt){c.progress.call(me,evt);};}(this,xhr,callback);}this.xhr=xhr;sendXhr.call(this,xhr,method,baseUrl,params);}}});mstrmojo.QueuedXHR=mstrmojo.declare(mstrmojo.SimpleXHR,null,{scriptClass:"mstrmojo.QueuedXHR",queue:null,requestInProgress:false,retryDelay:1,lookup:null,cancel:function(){var didCancel=this._super();while(this.queue.length){var x=this.queue.pop();var cb=x.callback;if(cb&&cb.complete){cb.complete();}}this.queue=[];this.requestInProgress--;return didCancel;},init:function init(){this.queue=[];this.lookup=[];},request:function request(method,baseUrl,callback,params,override,webSvrUrl,useResFeed,webSrvParams,useCache){if(webSvrUrl){if(useResFeed===true){if(!params){params={};}params.srcURL=appendUrlParams("GET",webSvrUrl,webSrvParams);this.request(method,baseUrl,callback,params);}else{mstrmojo.jsonp.request(webSvrUrl,params,callback);}}else{if(this.requestInProgress&&!override){this.queue.push({method:method,baseUrl:baseUrl,callback:callback,params:params});}else{if(this.requestInProgress){this.cancel();}this.requestInProgress++;var lu=null,oriParams=null;if(useCache){lu=this._searchForCacheRequest(params);oriParams=mstrmojo.hash.copy(params);}if(lu){try{if(callback.success){window.setTimeout(function(){callback.success(lu.res);},10);}}catch(ex){mstrmojo.err(ex);}finally{if(callback.complete){callback.complete();}this.advanceQueue();}}else{var xhr=this.xhr=createXhr();callback=mstrmojo.func.wrapMethods(callback,{complete:function(ths){return function(){ths.advanceQueue.call(ths);};}(this),success:function(ths){return function(){if(useCache){ths.lookup.push({params:oriParams,res:ths.response});}};}(this)});xhr.onreadystatechange=function(me,x,c){return function(){me.onreadystatechange.call(me,x,c);};}(this,xhr,callback);if(xhrSupportsProgress(xhr)&&callback.progress){xhr.onprogress=function(me,x,c){return function(evt){c.progress.call(me,evt);};}(this,xhr,callback);}sendXhr.call(this,xhr,method,baseUrl,params);}}}},advanceQueue:function advanceQueue(){this.requestInProgress--;if(this.queue.length===0){return ;}var req=this.queue.shift();this.request(req.method,req.baseUrl,req.callback,req.params,true);},_searchForCacheRequest:function _searchForCacheRequest(params){for(var i in this.lookup){if(mstrmojo.hash.equals(params,this.lookup[i]["params"])){return this.lookup[i];}}return null;}});mstrmojo.xhr=new mstrmojo.QueuedXHR();mstrmojo.jsonp={jsc:new Date().getTime(),timeToWait:20000,request:function(url,params,callback){var head=document.getElementsByTagName("head")[0]||document.documentElement,jsonp="jsonp"+(this.jsc++),script=document.createElement("script");params.jsonp=jsonp+"(@R@);";params.taskContentType="jsonp";params.taskEnv="jsonp";params.xts=new Date().getTime();window[jsonp]=function(response){if(!response){if(callback.timeout){callback.timeout();}}else{if(response.status===200){callback.success(response.content);}else{var res={status:response.status,getResponseHeader:function(name){switch(name){case"X-MSTR-TaskFailureMsg":return response.errorMsg;case"X-MSTR-TaskErrorCode":return response.errorCode;}}};if(mstrApp.onSessionExpired&&isSessionExpiredError(res)){mstrApp.onSessionExpired();}else{callback.failure(res);}}}if(window[jsonp]){if(callback.complete){callback.complete();}window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}head.removeChild(script);}};head.insertBefore(script,head.firstChild);script.src=appendUrlParams("GET",url,params);setTimeout(function(){window[jsonp]&&window[jsonp]();},this.timeToWait);}};})();