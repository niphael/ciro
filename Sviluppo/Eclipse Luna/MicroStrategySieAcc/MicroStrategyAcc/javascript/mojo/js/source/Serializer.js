(function(){mstrmojo.requiresCls("mstrmojo.array");var ESC="*";var D=".";var B="-";var K="_";var L="<";var regEx=new RegExp("[\\"+ESC+"\\"+D+"\\"+B+"\\"+K+"\\"+L+"]","g");var repText=ESC+"$&";mstrmojo.Serializer={scriptClass:"mstrmojo.Serializer",serializeValueGroup:function(av){mstrmojo.array.forEach(av,function(v,i){av[i]=mstrmojo.Serializer.serializeValues(v);});return B+this.serializeValues(av)+K;},serializeValues:function(av){var t=[];mstrmojo.array.forEach(av,function(v){if(typeof (v)==="Boolean"){v=(v)?"1":"0";}t.push(String(v).replace(regEx,repText));});return t.join(D);}};})();