(function(){mstrmojo.debug={nocache:true,getStackTrace:window.printStackTrace||undefined,debug_xhr:function debug_xhr(xhrStartTime,xhrParams,xhrResponse){xhrParams=xhrParams||{};xhrResponse=xhrResponse||{};var details=[];if(xhrParams.taskId){details.push("taskID="+xhrParams.taskId);switch(xhrParams.taskId){case"iPhoneGetReportResults":details.push("msgId="+xhrParams.messageID);break;case"reportExecute":details.push("reportID="+xhrParams.reportID);if(xhrResponse.id){details.push("msgID="+xhrResponse.id);}break;}}mstrmojo.dbg_profile("xhr completed",xhrStartTime,details.join("\t"));},load_firebug:function(uri){if(typeof Firebug==="undefined"){if((typeof uri==="undefined")||document.getElementById("FirebugLite")){return ;}e=document.createElement("script");e.setAttribute("id","FirebugLite");e.setAttribute("src",uri+"firebug-lite.js#startOpened");e.setAttribute("FirebugLite","4");(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(e);}else{Firebug.chrome.toggle(true);}}};mstrmojo.dbg=function dbg(s){if(window.console){window.console.log(s);}};mstrmojo.dbg_profile=function dbg_profile(title,time,msg){mstrmojo.dbg(title+new Array(Math.max(0,25-title.length)).join(" ")+"time="+(mstrmojo.now()-time)+"ms\t"+(msg||""));};mstrmojo.dbg_stack=function dbg_stack(){mstrmojo.dbg(mstrmojo.debug.getStackTrace());};mstrmojo.dbg_xhr=function dbg_xhr(st,p,r){mstrmojo.debug.debug_xhr(st,p,r);};})();