(function(){mstrmojo.url=mstrmojo.provide("mstrmojo.url",{isAbsoluteURL:function(url){return/^(http|https|ftp|file):\/\//i.test(url);},getAbsoluteURL:function(url,baseUrl){if(this.isAbsoluteURL(url)){return url;}else{if(baseUrl){return baseUrl+(/\/$/.test(baseUrl)?"":"/")+url;}else{return"http://"+url;}}}});})();