(function(){mstrmojo.requiresCls("mstrmojo.DocLayout");function resizeForSharedHeight(me){var mh=-1,c=me.children,sec,six,ssix,subsec,subsecArr=[],resizeSection=function(){var ci;for(ci in subsecArr){var subsec=subsecArr[ci];if(subsec._fixedHeight!==mh){subsec._fixedHeight=mh;if(subsec.domNode){subsec.domNode.style.height=mh+"px";}}}mh=-1;subsecArr=[];};for(six in c){sec=c[six];if(sec.node.data.bh&&mh>-1){resizeSection();}if(sec.defn.horiz){for(ssix in sec.children){subsec=sec.children[ssix];mh=Math.max(subsec._fixedHeight||0,mh);subsecArr[subsecArr.length]=subsec;}}}resizeSection();}mstrmojo.DocLayoutHoriz=mstrmojo.declare(mstrmojo.DocLayout,null,{scriptClass:"mstrmojo.DocLayoutHoriz",markupString:'<div id="{@id}"><div class="mstrmojo-DocLayout {@cssClass}" style="{@domNodeCssText}"></div></div>',markupSlots:{containerNode:function(){return this.domNode.firstChild;}},getWidth:function getWidth(){return this.containerNode.offsetWidth;},getHeight:function getHeight(){return this.containerNode.offsetHeight;},_renderSection:function _renderSection(sec,index){if(sec.node.data.bh){var d=document.createElement("div");d.className="mstrmojo-DocLayout-HBox";var t=document.createElement("table");t.className="mstrmojo-DocLayout-HBox-HorizContainerTable";this._hRow=t.insertRow(-1);d.appendChild(t);this.containerNode.appendChild(d);}if(sec.defn.horiz){var slotName="hi"+index;sec.slot=slotName;var td=this._hRow.insertCell(-1);td.vAlign="top";var slots={};slots[slotName]=td;this.addSlots(slots);}this._super(sec,index);},getLayoutMinWidth:function getLayoutMinWidth(){var minWidth=0,currentMinWidth=0,children=this.children,len=children.length,i,k;for(i=0;i<len;i++){var sec=children[i],secNode=sec&&sec.node,secNodeData=secNode&&secNode.data,begin=secNodeData&&(String(secNodeData.bh)==="true"||String(secNodeData.bv)==="true");if(begin){minWidth=Math.max(minWidth,currentMinWidth);currentMinWidth=0;}if(sec.children){for(k in sec.children){currentMinWidth+=sec.children[k].width();}}else{currentMinWidth+=10;break;}}return Math.max(minWidth,currentMinWidth);},resizeOrReposition:function resizeOrReposition(){if(this._super){this._super();}resizeForSharedHeight(this);},renderCtrlsInViewport:function renderCtrlsInViewport(){this._super();resizeForSharedHeight(this);}});}());