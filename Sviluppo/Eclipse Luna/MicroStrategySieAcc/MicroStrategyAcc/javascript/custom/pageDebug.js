var mstr=null;var mstrPageDebug={STATUS_LOADING:"Loading log...",STATUS_WIN_NOT_FOUND:"Window opener not found.",STATUS_LOG_NOT_FOUND:"Log not found.",STATUS_LOG_ERR:"Error retrieving log.",STATUS_LOG_CLEAR_ERR:"Error accessing log clear method.",STATUS_LOG_SETLEVEL_ERR:"Error accessing log level property.",STATUS_LOG_EMPTY:"Log is empty.",STATUS_SELECTION_ERR:"Error processing selection.",viewerId:"logViewer",winOpener:window.opener};mstrPageDebug.onload=function(e){this.loadLog();this.repaintObjectList();this.repaintLog();};mstrPageDebug.loadLog=function(){this.showStatusMessage(this.STATUS_LOADING);if(!this.winOpener){this.showStatusMessage(this.STATUS_WIN_NOT_FOUND);return false;}mstr=this.winOpener&&this.winOpener.mstr;this.log=mstr&&mstr.getApp()&&mstr.getApp().log;this.logEntries=this.log&&this.log.items;this.objects=mstr&&mstr.getApp()&&mstr.getApp().factory&&mstr.getApp().factory.objects();};mstrPageDebug.repaintObjectList=function(){var el=document.getElementById("selObjects");this.clearObjectList(el);var opts=el&&el.options;if(!opts){return ;}for(var id in this.objects){var obj=mstr.getObject(id);var cssClass="";var renderMemo="";if(obj){cssClass=obj.getProperty("cssClass")||"";renderMemo=obj.getProperty("renderMemo")||"";}var opt=document.createElement("option");opt.text=id+" "+cssClass+"  ["+renderMemo+"]";opt.value=id;opts.add(opt);}};mstrPageDebug.clearObjectList=function(el){if(el){var opts=el.options;var len=opts.length;var x=(el.remove)?el:opts;for(var i=len-1;i>0;i--){x.remove(i);}}};mstrPageDebug.repaintLog=function(){if(!this.logEntries){this.showStatusMessage(this.STATUS_LOG_NOT_FOUND);return false;}var categories=this.getSelectBoxValues(document.getElementById("selCategories"));var levels=this.getSelectBoxValues(document.getElementById("selLevels"));var objects=this.getSelectBoxValues(document.getElementById("selObjects"));this.showStatusMessage(this.getLogHTML(this.logEntries,categories,levels,objects));return true;};mstrPageDebug.getLogHTML=function(logEntries,categories,levels,objects){if(!logEntries){return this.STATUS_LOG_ERR;}if(!logEntries.length){return this.STATUS_LOG_EMPTY;}var logString="";var entries=logEntries.length;for(var i=0;i<entries;i++){var logEntry=logEntries[i];if(this.inCategories(logEntry,categories)&&this.inLevels(logEntry,levels)&&this.inObjects(logEntry,objects)){var logEntryString='<tr class="level'+logEntry.level+'"><td class="index" nowrap="1"><div class="propValue">'+(logEntry.time&&logEntry.time.getTime())+'</div></td><td class="level"><div class="propValue">'+this.getNameForLevel(logEntry.level)+'</div></td><td class="category"><div class="propValue">'+logEntry.category+'</div></td><td class="object"><div class="propValue">'+logEntry.object+'</div></td><td class="message"><div class="propValue">'+logEntry.message+'</div></td><td class="method"><div class="propValue">'+String(logEntry.method).substring(0,100)+"...</div></td></tr>";logString+=logEntryString;}}return'<table cellspacing="0" class="logEntries"><tbody>'+logString+"</tbody></table>";};mstrPageDebug.getSelectBoxValues=function(elSelect){var arr;var opts=elSelect&&elSelect.options;if(opts&&opts.length){arr=[];var len=opts.length;for(i=0;i<len;i++){if(opts[i].selected){arr.push(opts[i].value);}}}return arr;};mstrPageDebug.inValues=function(obj,formName,formValues){if(!(obj&&formName)){return false;}if(!(formValues&&formValues.length)){return true;}if(formValues[0]=="*"){return true;}var myValue=obj[formName];for(var i=0;i<formValues.length;i++){if(myValue==formValues[i]){return true;}}return false;};mstrPageDebug.inCategories=function(logEntry,arr){return this.inValues(logEntry,"category",arr);};mstrPageDebug.inLevels=function(logEntry,arr){return this.inValues(logEntry,"level",arr);};mstrPageDebug.inObjects=function(logEntry,arr){return this.inValues(logEntry,"object",arr);};mstrPageDebug.getNameForLevel=function(level){var name="";if(mstr&&mstr.objects){switch(level){case mstr.Enum.Log.LEVEL.ERROR:name="Error";break;case mstr.Enum.Log.LEVEL.WARNING:name="Warning";break;case mstr.Enum.Log.LEVEL.INFO:name="Info";break;case mstr.Enum.Log.LEVEL.TRACE:name="Trace";break;default:name="Custom ("+level+")";}}return name;};mstrPageDebug.showStatusMessage=function(message){var viewer=document.getElementById(this.viewerId);viewer&&viewer.childNodes&&viewer.childNodes[1]&&(viewer.childNodes[1].innerHTML=message);return true;};mstrPageDebug.onclickClear=function(){if(!(this.log&&this.log.clear)){this.showStatusMessage(this.STATUS_LOG_NOT_FOUND);return false;}this.log.clear();this.loadLog();this.repaintLog();return true;};mstrPageDebug.onclickApplyLevel=function(){var levelSelect=document.getElementById("levelValue");var level=parseInt(levelSelect.options[levelSelect.selectedIndex].value);if(isNaN(level)){return false;}if(!this.log){this.showStatusMessage(this.STATUS_LOG_NOT_FOUND);return false;}this.log.level=level;return true;};