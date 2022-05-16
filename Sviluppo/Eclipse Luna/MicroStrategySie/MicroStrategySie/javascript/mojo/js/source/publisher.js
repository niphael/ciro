(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array");var _subs={};var _listenerMap={};mstrmojo.publisher=mstrmojo.provide("mstrmojo.publisher",{publish:function pub(id,type,data){var ls=_subs[id]&&_subs[id][type],lid;if(!ls){return ;}for(lid in ls){var l=null;if(lid){l=mstrmojo.all[lid];if(!l){delete ls[lid];continue;}}var ns=ls[lid].methods;if(ns){var ctxt=l||mstrmojo.global,n;for(n in ns){if(ctxt[n]){ctxt[n](data);}}}var fs=ls[lid]&&ls[lid].functions,flen=(fs&&fs.length)||0;if(flen){var i;if(l){for(i=flen-1;i>-1;i--){if(fs[i]){fs[i].apply(l,[data]);}}}else{for(i=flen-1;i>-1;i--){if(fs[i]){fs[i](data);}}}}}},subscribe:function sub(id,type,callback,listener){var s=_subs[id];if(!s){s={};_subs[id]=s;}var e=s[type];if(!e){e={};s[type]=e;}var l=e[listener||""];if(!l){l={};e[listener||""]=l;}if(typeof callback==="function"){var fs=l.functions;if(!fs){fs=[];l.functions=fs;}fs.push(callback);}else{var ms=l.methods;if(!ms){ms={};l.methods=ms;}ms[callback]=true;}var lmap=_listenerMap,pmap=lmap[listener||""];if(!pmap){pmap={};lmap[listener||""]=pmap;}var emap=pmap[id];if(!emap){emap={};pmap[id]=emap;}emap[type]=true;return{id:id,type:type,callback:callback,listener:listener,clear:function(){mstrmojo.publisher.unsubscribe(this);}};},unsubscribe:function unsub(sub){var s=_subs[sub.id],e=s&&s[sub.type],l=e&&e[sub.listener||""];if(!l){return ;}var A=mstrmojo.array,H=mstrmojo.hash,tp=typeof sub.callback,cleanupListener=false;if(tp==="function"){var fs=l.functions;if(fs){A.removeItem(fs,sub.callback);if(!fs.length){delete l.functions;if(H.isEmpty(l.methods)){cleanupListener=true;}}}}else{var ms=l.methods;if(ms){delete ms[sub.callback];if(H.isEmpty(ms)){delete l.methods;if(!l.functions||!l.functions.length){cleanupListener=true;}}}}if(cleanupListener){delete e[sub.listener||""];if(H.isEmpty(e)){delete s[sub.type];}}},hasSubs:function hasSubs(id,type){var s=_subs[id],evt=s&&s[type];return !!evt;},clearSubscriptions:function clr(listener){if(!listener){listener="";}var sbs=_subs,_H=mstrmojo.hash,id;if(sbs[listener]){delete sbs[listener];}var pmap=_listenerMap[listener];if(pmap){for(id in pmap){var es=sbs[id],emap=pmap[id],e;if(!es){continue;}for(e in emap){var ls=es[e];if(!ls){continue;}delete ls[listener];if(_H.isEmpty(ls)){delete es[e];}}}}}});mstrmojo.publisher.NO_SRC="NO_SRC";mstrmojo.publisher.CONNECTIVITY_CHANGED_EVENT="CONNECTIVITY_CHANGED";mstrmojo.publisher.RECONCILE_END_EVENT="RECONCILE_END";}());