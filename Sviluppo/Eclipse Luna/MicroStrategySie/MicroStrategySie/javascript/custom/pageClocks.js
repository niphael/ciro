var mstr=null;var mstrPageClocks={STATUS_LOADING:"Loading log...",STATUS_WIN_NOT_FOUND:"Window opener not found.",STATUS_LOG_NOT_FOUND:"Log not found.",STATUS_LOG_ERR:"Error retrieving log.",STATUS_LOG_CLEAR_ERR:"Error accessing log clear method.",STATUS_LOG_EMPTY:"Log is empty.",STATUS_SELECTION_ERR:"Error processing selection.",viewerId:"logViewer",winOpener:window.opener};mstrPageClocks.onload=function(e){this.loadLog();};mstrPageClocks.loadLog=function(){this.showStatusMessage(this.STATUS_LOADING);if(!this.winOpener){this.showStatusMessage(this.STATUS_WIN_NOT_FOUND);return false;}mstr=this.winOpener&&this.winOpener.mstr;var logEntries=mstr&&mstr.getApp()&&mstr.getApp().timers&&mstr.getApp().timers.getTimers&&mstr.getApp().timers.getTimers();if(!logEntries){this.showStatusMessage(this.STATUS_LOG_NOT_FOUND);return false;}this.showStatusMessage(this.getLogHTML(logEntries));return true;};mstrPageClocks.getLogHTML=function(logEntries){if(!logEntries){return this.STATUS_LOG_ERR;}var logString="";for(var clockID in logEntries){var clock=logEntries[clockID];var logEntryString='<tr><td class="id"><div class="propName">Clock ID</div><div class="propValue">'+clockID+'</div></td><td class="totalTime"><div class="propName">Total Time (ms)</div><div class="propValue">'+clock.totalTime+'</div></td><td class="lastStartTime"><div class="propName">Last Start Time</div><div class="propValue">'+clock.lastStartTime+"<BR>"+(clock.lastStartTime&&clock.lastStartTime.getTime())+'</div></td><td class="lastStopTime"><div class="propName">Last Stop Time</div><div class="propValue">'+clock.lastStopTime+"<BR>"+(clock.lastStopTime&&clock.lastStopTime.getTime())+"</div></td></tr>";logString+=logEntryString;}return'<table cellspacing="0" class="logEntries"><tbody>'+logString+"</tbody></table>";};mstrPageClocks.showStatusMessage=function(message){var viewer=document.getElementById(this.viewerId);viewer.innerHTML=message;return true;};mstrPageClocks.onclickClear=function(){var log=mstr&&mstr.getApp()&&mstr.getApp().timers;log&&log.resetTimers&&log.resetTimers();return this.loadLog();};