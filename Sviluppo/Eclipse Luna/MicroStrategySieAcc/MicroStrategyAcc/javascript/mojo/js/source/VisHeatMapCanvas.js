(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.VisHeatMapColorTheme","mstrmojo._TouchGestures","mstrmojo._HasTouchScroller","mstrmojo.dom","mstrmojo.css");var STEP_X=1200,STEP_Y=800;var LABEL={ON:0,OFF:1,PROPORTIONAL:2};var FMT={LABEL_CTNR_THRES:6,LABEL_CTNR_WIDTH_THRES:32,LGD_GUTTER:5,LABEL_PADDING:2};var CSSATTR={"heatmap-one-level-1":{},"heatmap-two-level-2":{},"heatmap-multi-level-1":{},"heatmap-multi-level-2":{},"heatmap-multi-level-3":{},init:false};function getCSSColor(rgb){var c=16777216+rgb;var str="#"+c.toString(16).substring(1).toUpperCase();return str;}function wfs(root,f){var arr=[root];while(arr.length!==0){var node=arr.shift();if(node===undefined||node.deleted){continue;}f(node);var children=node.entityChildren;if(children!==undefined){var l=children.length;for(var i=0;i<l;i++){arr.push(children[i]);}}}}function dfs(root,f,indexString){if(root.deleted){return ;}if(indexString===undefined){f(root);}else{f(root,indexString);}if(root.entityChildren===undefined){return ;}var arr=root.entityChildren,l=arr.length;for(var i=0;i<l;i++){var e=arr[i];if(indexString===undefined){dfs(e,f);}else{var param=indexString;if(!param){param=i.toString();}else{param=param+":"+i;}dfs(e,f,param);}}}function getLabelCSS(l,n){var css;if(n===1){if(l===0){css="heatmap-one-level-1";}}else{if(n===2){if(l===0){css="heatmap-multi-level-1";}else{if(l===1){css="heatmap-two-level-2";}}}else{if(n>=3){if(l===0){css="heatmap-multi-level-1";}else{if(l===1){css="heatmap-multi-level-2";}else{if(l===2){css="heatmap-multi-level-3";}}}}}}return css;}function intersect(lhs,rhs){if(!lhs||!rhs){return false;}if(rhs.x>=lhs.x+lhs.w||rhs.y>=lhs.y+lhs.h||rhs.x+rhs.w<=lhs.x||rhs.y+rhs.h<=lhs.y){return false;}else{return true;}}function rectIntersection(a,b){var x=Math.max(a.x,b.x);var y=Math.max(a.y,b.y);var w=Math.min(a.x+a.w,b.x+b.w)-x;var h=Math.min(a.y+a.h,b.y+b.h)-y;if(w<0||h<0){return{x:NaN,y:NaN,w:NaN,h:NaN};}return{x:x,y:y,w:w,h:h};}mstrmojo.VisHeatMapCanvas=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.VisHeatMapCanvas",parent:null,root:null,colorTheme:null,attributes:[],scale:1,labelSetting:0,showMetric:false,bgColor:"#333333",numImages:0,offsetX:0,offsetY:0,markupString:'<div style="position:absolute; width:{@width}px; height:{@height}px"><canvas width={@width} height={@height} style="visibility: hidden; z-index:0"></canvas><span></span></div>',markupSlots:{domCanvas:function(){return this.domNode.firstChild;},domSpan:function(){return this.domNode.childNodes[1];},domImage:function(){return this.domNode.childNodes[2];}},buildRendering:function(){var that=this;var backup=mstrmojo.string.apply;mstrmojo.string.apply=function(tmpl,obj){if(!tmpl){return"";}return tmpl.replace(/\{([^\}]+)\}/gm,function tokenRepl(token,prop){var s=token.replace(/@/g,"that.");var res=eval(s);return res===undefined?"":res;});};if(this._super){this._super();}mstrmojo.string.apply=backup;},postBuildRendering:function(){this.initCSSATTR();this.draw();if(this._super){this._super();}},removeImageAndLabels:function(){var dom=this.domNode,labels=dom.childNodes,n=labels.length;for(var i=n-1;i>1;i--){var node=labels[i];dom.removeChild(node);}this.numImages=0;},removeLabels:function(){var dom=this.domNode,labels=dom.childNodes,n=labels.length,stop=1+this.numImages;for(var i=n-1;i>stop;i--){var node=labels[i];dom.removeChild(node);}},updateOffsets:function(x,y){this.offsetX=x;this.offsetY=y;this.removeLabels();this.drawLabels();},draw:function(x,y){if(x!==undefined){this.offsetX=x;}if(y!==undefined){this.offsetY=y;}this.removeImageAndLabels();this.drawRects();this.drawLabels();},drawRects:function(){var w=this.width,h=this.height,k=this.scale,cw=Math.ceil(w*k),ch=Math.ceil(h*k),cvs=this.domCanvas,dom=this.domNode,fragment=document.createDocumentFragment(),row=Math.ceil(ch/STEP_Y),col=Math.ceil(cw/STEP_X),count=0;for(var i=0;i<row;i++){for(var j=0;j<col;j++){var window={x:j*STEP_X,y:i*STEP_Y,w:STEP_X,h:STEP_Y};if(i+1===row){window.h=ch-window.y;}if(j+1===col){window.w=cw-window.x;}cvs.setAttribute("width",window.w);cvs.setAttribute("height",window.h);var cxt=cvs.getContext("2d");cxt.fillStyle=this.bgColor;cxt.fillRect(0,0,window.w,window.h);var drawPiece=function(e,idx){var rect=e.size;if(e.entityChildren===undefined&&!e.deleted&&intersect(window,rect)){var x1=Math.max(rect.x-window.x,0),y1=Math.max(rect.y-window.y,0),x2=Math.min(rect.x+rect.w-window.x,window.w),y2=Math.min(rect.y+rect.h-window.y,window.h);cxt.fillStyle=e.color;cxt.fillRect(x1,y1,x2-x1,y2-y1);}e.idx=idx;};dfs(this.root,drawPiece,"");var res=cvs.toDataURL();var img=document.createElement("img");img.src=res;img.style.position="absolute";img.style.left=window.x+"px";img.style.top=window.y+"px";img.setAttribute("draggable","false");img.setAttribute("orgx",window.x);img.setAttribute("orgy",window.y);fragment.appendChild(img);count++;}}cvs.setAttribute("width",0);cvs.setAttribute("height",0);dom.style.width=cw+"px";dom.style.height=ch+"px";dom.appendChild(fragment);this.numImages=count;},drawLabels:function(){var l=this.attributes.length,that=this,dom=this.domNode,gut=FMT.LGD_GUTTER,padding=FMT.LABEL_PADDING,window={x:this.offsetX,y:this.offsetY,w:this.width,h:this.height};var caches=[],layout=[{},{},{}];var ext=Math.floor(Math.log(this.scale)/Math.log(2));ext=Math.min(ext,l-3);ext=Math.max(ext,0);this._ext=ext;var drawText=function(e){if(e===that.root||e.deleted){return ;}var rect=e.size,w=rect&&rect.w,h=rect&&rect.h;if(!intersect(window,rect)){return ;}if(w<FMT.LABEL_CTNR_WIDTH_THRES+2*FMT.LABEL_PADDING||h<FMT.LABEL_CTNR_THRES){return ;}var str=e.text,idx=e.idx,level=e.level-ext;if(level>=0&&level<3){var tw,th,labelCSS=getLabelCSS(level,l),font=CSSATTR[labelCSS].font,fontSize=CSSATTR[labelCSS].fontSize,o={s:{},e:e,m:0,css:labelCSS};if(that.showMetric===true&&e.entityChildren===undefined){var loc={};mstrmojo.hash.copy(rect,loc);if(l>1&&level===0){loc.w-=2*gut;loc.h-=gut;}else{loc.w-=2*padding;}var lh,txtS;if(that.labelSetting===LABEL.PROPORTIONAL){lh=9;var step=8,shrink=false,txtS=that.getTextSize(str,font,lh,true,false,loc.w);while(step>=1){if(txtS.h<loc.h){lh+=step;}else{if(lh===9){break;}if(lh>=loc.w){break;}if(!shrink){step/=2;}shrink=true;lh-=step;}txtS=that.getTextSize(str,font,lh,true,false,loc.w);if(shrink){step=step>>1;}}if(txtS.h>loc.h&&lh>9){lh--;}if(lh>loc.w){lh=loc.w;}o.fs=lh;}else{lh=fontSize;}o.lh=lh;txtS=that.getTextSize(str,font,lh,true,false,loc.w);tw=Math.min(txtS.w,loc.w);th=txtS.h;if(th>loc.h){th=Math.floor(loc.h/lh)*lh;}}else{if(caches[level]===undefined){caches[level]={};}var cache=caches[level];if(cache[str]===undefined){var txtS=that.getTextSize(str,font,fontSize,true),tw=txtS.w,th=txtS.h;if(l>1&&level===0){tw+=2*gut;th+=gut;}cache[str]={w:tw,h:th};}else{tw=cache[str].w;th=cache[str].h;}if(th>h){return ;}o.lh=th;var p;if(l>1&&level===0){p=2*gut;}else{p=2*padding;}if(tw>w-p){var trunw=tw>>1,lineCount=Math.floor(h/o.lh);if(trunw>(w-p)*lineCount){return ;}tw=w-p;if((l==1&&level==0)||(l==2&&level==1)||(l>2&&level==2)){var ts=that.getTextSize(str,font,fontSize,true,false,w-p,true);th*=Math.floor(Math.min(ts.h,h)/o.lh);o.isLowestLevel=true;}}}var x=rect.x+((w-tw)>>1),y=rect.y+((h-th)>>1);o.s={x:x,y:y,w:tw,h:th};layout[level][idx]=o;}};if(that.labelSetting!==LABEL.OFF){wfs(this.root,drawText);this.layoutLabels(layout);}},layoutLabels:function(layout){var that=this,doc=document,fragment=doc.createDocumentFragment();function generateLabel(o){var s=o.s,e=o.e,css=o.css,color=that.getLabelColor(s,e),hasM=o.fs!==undefined;var div=doc.createElement("div");if(hasM){div.setAttribute("style","font-size: "+o.fs+"px !important");div.className=css+" heatmap-showMetric-text";}else{div.className=css+" heatmap-trun-text";}div.style.position="absolute";div.style.color=color;div.style.backgroundColor="rgba(255, 255, 255, 0)";div.style.zIndex="1";div.style.left=s.x+"px";div.style.top=s.y+"px";div.style.width=s.w+"px";div.style.height=s.h+"px";div.style.lineHeight=o.lh+"px";if(o.isLowestLevel){div.style.textOverflow="ellipsis";div.style.wordBreak="normal";}div.setAttribute("idx",e.idx);div.innerHTML=e.text;fragment.appendChild(div);}var L0=layout[0],L1=layout[1],L2=layout[2],idx;for(idx in L1){var info=L1[idx],bbox=info.s,node=info.e,prt=node.parentEntity,pinfo=L0[prt.idx];if(pinfo===undefined){generateLabel(info);continue;}var pbox=pinfo.s,inter=rectIntersection(bbox,pbox);var rmIt=false;if(inter.w>5||inter.h>5){if(pbox.y<=bbox.y){var delta=((pbox.y+pbox.h-bbox.y)>>1)+1;if(pinfo.m!==2&&(pbox.y-delta>=prt.size.y)&&(bbox.y+bbox.h+delta<=node.size.y+node.size.h)){pbox.y-=delta;bbox.y+=delta;pinfo.m=1;}else{rmIt=true;}}else{var delta=((bbox.y+bbox.h-pbox.y)>>1)+1;if(pinfo.m!==1&&(pbox.y+pbox.h+delta<=prt.size.y+prt.size.h)&&(bbox.y-delta>=node.size.y)){pbox.y+=delta;bbox.y-=delta;pinfo.m=2;}else{rmIt=true;}}}if(rmIt!==true){generateLabel(info);}}for(idx in L0){generateLabel(L0[idx]);}for(idx in L2){rmIt=false;var info2=L2[idx],node2=info2.e,node1=node2.parentEntity,node0=node1.parentEntity,idx1=node1.idx,idx0=node0.idx,info1=L1[idx1],info0=L0[idx0];if(info1!==undefined){var inter12=rectIntersection(info1.s,info2.s);if(!isNaN(inter12.w)){rmIt=true;}}if(rmIt===false&&info0!==undefined){var inter02=rectIntersection(info0.s,info2.s);if(!isNaN(inter02.w)){rmIt=true;}}if(rmIt!==true){generateLabel(info2);}}this.domNode.appendChild(fragment);},getLabelColor:function(s,e){var level=e.level-this._ext;if(level===0){return"#FFFFFF";}var ct=this.colorTheme;if(e.entityChildren===undefined){return getCSSColor(ct.getContrastColor(parseInt(e.color.substring(1,e.color.length),16)));}var stack=[e],ls=0,ds=0;while(stack.length!==0){var node=stack.shift(),ch=node.entityChildren,n=node.entityChildren.length;for(var i=0;i<n;i++){var child=ch[i];if(child.deleted){continue;}var rect=rectIntersection(s,child.size);if(child.entityChildren===undefined){if(!isNaN(rect.w)){if(ct.isBrightColor(parseInt(child.color.substring(1,child.color.length),16))){ls+=rect.w*rect.h;}else{ds+=rect.w*rect.h;}}}else{if(!isNaN(rect.w)){stack.push(child);}}}}if(ls>ds){return"#000000";}else{if(level===1){return"#e6e7e8";}else{return"#d1d3d4";}}},getEntity:function(pos){var ox=pos.x,oy=pos.y,target;var hitTest=function(node){if(node.entityChildren===undefined&&!node.deleted&&node.size){var size=node.size,x1=size.x,y1=size.y,x2=x1+size.w,y2=y1+size.h;if(ox>=x1&&ox<=x2&&oy>=y1&&oy<=y2){target=node;}}};var dfsReturnOnFound=function(root,f){if(root.deleted){return ;}f(root);var arr=root.entityChildren;if(arr!==undefined){var l=arr.length;for(var i=0;i<l;i++){var e=arr[i];dfsReturnOnFound(e,f);if(target!==undefined){return ;}}}};dfsReturnOnFound(this.root,hitTest);return target;},initCSSATTR:function(){if(CSSATTR.init===false){var dom=this.domSpan;for(var css in CSSATTR){if(css==="init"){continue;}dom.setAttribute("class",css);var res=document.defaultView.getComputedStyle(dom);CSSATTR[css].fontSize=parseInt(res.fontSize);CSSATTR[css].font=res.fontFamily;}}},getTextSize:function(str,fontName,fontSize,isBold,isItalic,width,normalBreak){var dom=this.domSpan,breakMethod="break-all";if(normalBreak){breakMethod="normal";}dom.className="";dom.innerHTML=str;dom.style.cssText="position:absolute; visibility:hidden; z-index:-1; font-family:"+fontName+"; font-size:"+fontSize+"px; font-weight:"+(isBold?"bold":"normal")+"; font-style:"+(isItalic?"italic":"normal")+"; line-height:"+fontSize+"px;";var w=dom.offsetWidth;if(width!==undefined&&w>width){dom.style.cssText+="overflow:hidden; word-break:"+breakMethod+"; width:"+width+"px;";w=dom.offsetWidth;}return{w:w,h:dom.offsetHeight};}});})();