(function(){mstrmojo.StringBuffer=mstrmojo.declare(null,null,{scriptClass:"mstrmojo.StringBuffer",append:function append(txt){if(!this.buf){this.reset();}this.buf[++this.len]=txt;return this;},reset:function reset(){this.buf=[];this.len=-1;}});mstrmojo.StringBuffer.prototype.toString=function(sep){var buf=this.buf;return(buf&&buf.join(sep||""))||"";};})();