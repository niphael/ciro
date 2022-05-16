(function(){mstrmojo.requiresCls("mstrmojo.Slider","mstrmojo.MetricQualification","mstrmojo.expr","mstrmojo.ValidationTextBox","mstrmojo.array","mstrmojo.hash");mstrmojo.requiresDescs(8153,8154,8155,8156,8157,8158,8159,8160,8161,8162,8163,8164,8165,8166,8167,8168,8169,8170,7839,587,2204,2202,2203,7576,7575,7622);var $D=mstrmojo.dom,$HASH=mstrmojo.hash,$M=mstrmojo.MCSUtil,$DESC=mstrmojo.desc,$C=mstrmojo.css,$NM=mstrmojo.num,$MATH=Math,$MATH_MAX=$MATH.max,$MATH_MIN=$MATH.min,$MATH_FLOOR=$MATH.floor,$MATH_ROUND=$MATH.round;function positionSliderElements(slider,ui,handle1,handle2){var px="px",effectiveLength=slider._length,handleSize=slider.handleSize,orCfg=slider.orCfg,position=orCfg.posCssP,length=orCfg.lenCssP;handle1=$MATH_MAX(handle1,-1);handle2=$MATH_MIN(handle2,effectiveLength);var min=$MATH_MIN(handle1,handle2),max=$MATH_MAX(handle1,handle2),thumbLength=max-min,upperLength=$MATH_MAX(parseInt(slider[length],10)-(2*slider.cssBkBW)-(max+handleSize),0);if(slider.hasRendered){ui.handle1Node.style[position]=handle1+px;ui.handle2Node.style[position]=handle2+px;var lowerStyle=ui.lowerRange.style,thumbStyle=ui.thumbNode.style,upperStyle=ui.upperRange.style;lowerStyle[position]=0;thumbStyle[position]=(min+handleSize)+px;upperStyle[position]=(max+handleSize)+px;lowerStyle[length]=$MATH_MAX(min,0)+px;thumbStyle[length]=thumbLength+px;upperStyle[length]=upperLength+px;}else{px+=";";position+=":";length+=":";slider.handle1CssText=position+handle1+px;slider.handel2CssText=position+handle2+px;slider.lowerRangeCssText=length+$MATH_MAX(min,0)+px;slider.thumbCssText=position+(min+handleSize)+px+length+thumbLength+px;slider.upperRangeCssText=position+(max+handleSize)+px+length+upperLength+px;}return{handle1:handle1,handle2:handle2};}function MetricSlider(sl){this.getUnit=function(){return sl._length/$MATH_MAX((sl.items.length-1),1);};this.calcMinMax=function(pxMin,pxMax){var unit=sl.unit;return{min:$MATH_FLOOR(pxMin/unit+0.5),max:$MATH_FLOOR(pxMax/unit+0.5)};};this.calcPxIdx=function(px){return $MATH_FLOOR(px/sl.unit+0.5);};this.getStep=function(){var rng=sl.high-sl.low,cat=parseInt(sl.numFmts.cat,10),adjust=(cat===4)?2:(cat===5)?4:0;rng=(rng===0)?1:rng;if(rng>1){return(rng>(sl._length-2))?Number(Number(rng/(sl._length-2)).toFixed(sl.numFmts.dp+adjust)):1;}return rng/(sl._length-2);};this.getIdx=function(vl){return $MATH_MIN($MATH_MAX($MATH_ROUND((vl-sl.low)/sl.step),0),sl.items.length-1);};this.initialMetricSlider=function initialMetricSlider(){var notNull=function(v){return v!==undefined&&v!==null;},validateData=function(sl){return(notNull(sl.da)&&notNull(sl.da.low)&&notNull(sl.da.high)&&notNull(sl.da.cnt)&&notNull(sl.f)&&notNull(sl.ft)&&notNull(sl.qua));},displayInvalid=function(sl){var gen=true,rp=true;if(sl.ft==$M._GENERIC){gen=sl.f!=$M.FN.ISNULL&&sl.f!=$M.FN.ISNOTNULL&&sl.f!=$M.FN.NOTIN&&sl.f!=$M.FN.IN;}else{if(sl.ft==$M._PERCENT||sl.ft==$M._RANK){rp=sl.f!=$M.MRPFN.INASCENDING&&sl.f!=$M.MRPFN.INDESCENDING&&sl.f!=$M.MRPFN.NOTINDESCENDING&&sl.f!=$M.MRPFN.NOTINASCENDING;}}return !gen||!rp;},adjust=0;sl.include=sl.parent.include;sl.clsType="scm ";sl.staticStatus=!(notNull(sl.da)&&notNull(sl.da.low)&&notNull(sl.da.high)&&notNull(sl.da.cnt)&&notNull(sl.qua));if(sl.staticStatus){sl.da.low=1;sl.da.high=7;sl.ft=$M._GENERIC;sl.f=$M.FN.BETWEEN;sl.qua=$M.Q._G;sl.cs=[{n:"",v:1},{n:"",v:7}];sl.numFmts={cat:9,dp:0,fm:""};}switch(sl.qua){case 0:var cat=sl.numFmts.cat;adjust=cat==4?2:cat==5?4:0;sl.low=Number(Number(sl.da.low).toFixed(sl.numFmts.dp+adjust));sl.high=Number(Number(sl.da.high).toFixed(sl.numFmts.dp+adjust));break;case 1:case 2:sl.low=1;sl.high=sl.da.cnt;break;case 3:case 4:sl.low=0;sl.high=100;break;}var ept=!sl.staticStatus&&!sl.da.nov&&sl.dt!=30;sl.set("lowText",ept?$M.formatNumber(sl.qua,sl.low,sl.numFmts):"");sl.set("highText",ept?$M.formatNumber(sl.qua,sl.high,sl.numFmts):"");sl.step=(sl.qua==1||sl.qua==2)?1:this.getStep();sl.low-=sl.step;sl.high+=sl.step;sl.cs1Vl=sl.low;sl.cs2Vl=sl.high;var l=sl.low,h=sl.high,itms=[],len=0;if(notNull(l)&&notNull(h)&&sl.dt!=30){for(var i=0,j=l;j<=h;i++,j+=sl.step){itms[i]={n:$M.formatNumber(sl.qua,j,sl.numFmts),v:Number(Number(j).toFixed(sl.numFmts.dp+adjust))};}len=itms.length;if(len>0&&itms[len-1].v!=h){itms[len-1]={n:$M.formatNumber(sl.qua,h,sl.numFmts),v:h};}}len=itms.length;if(len>=2){itms[0].n=itms[len-1].n=$DESC(7622);}sl.items=itms;var $O=$M.OP,cs=sl.cs,c1=(cs&&cs.length>0)?$NM.parseNumeric(String(cs[0].v).replace("%","")):l,c2=(cs&&cs.length>1)?$NM.parseNumeric(String(cs[1].v).replace("%","")):h;if(c1<sl.low){sl.frtUst=true;}if(c2>sl.high){sl.ndUst=true;}sl.opId=(sl.f!=null&&sl.ft!=null)?$M.getOpIdxByfunc(sl.f,sl.ft):$O._BETWEEN;switch(sl.opId){case $O._EQUALS:case $O._NOT_EQUALS:sl.cs1Vl=sl.cs2Vl=c1;break;case $O._LESS_EQUAL:case $O._GREATER:sl.cs1Vl=l;sl.cs2Vl=c1;break;case $O._GREATER_EQUAL:case $O._LESS:sl.cs1Vl=c1;sl.cs2Vl=h;break;case $O._IN:case $O._NOT_IN:case $O._IS_NULL:case $O._IS_NOT_NULL:break;default:sl.cs1Vl=c1;sl.cs2Vl=c2;break;}sl.cs1Idx=this.getIdx(sl.cs1Vl);sl.cs2Idx=this.getIdx(sl.cs2Vl);if(sl.dt!=30){sl.cs1Nm=notNull(sl.cs1Vl)?$M.formatNumber(sl.qua,sl.cs1Vl,sl.numFmts):sl.items[sl.cs1Idx].n;sl.cs2Nm=notNull(sl.cs2Vl)?$M.formatNumber(sl.qua,sl.cs2Vl,sl.numFmts):sl.items[sl.cs2Idx].n;}sl.unit=this.getUnit();sl.set("unSet",(sl.dt==30||!validateData(sl)||displayInvalid(sl)||(!sl.cs||sl.cs.length==0))&&!sl.staticStatus);};this.updateOpCs=function(){var i=(sl.cs1Vl>sl.cs2Vl)?sl.cs2Vl:sl.cs1Vl,a=(sl.cs1Vl>sl.cs2Vl)?sl.cs1Vl:sl.cs2Vl,l=sl.low,h=sl.high,il=sl.include,$O=$M.OP,isPercent=(sl.qua==$M.Q._PT||sl.qua==$M.Q._PB),unset,cs=[];if((i>=l&&a<=h)||i<l||a>h){sl.opId=(il)?$O._BETWEEN:$O._NOT_BETWEEN;}if(i==a){sl.opId=(il)?$O._EQUALS:$O._NOT_EQUALS;}if(i==l&&a<h){sl.opId=(il)?$O._LESS_EQUAL:$O._GREATER;}if(i>l&&a==h){sl.opId=(il)?$O._GREATER_EQUAL:$O._LESS;}unset=l==i&&a==h;if(!unset){switch(sl.opId){case $O._BETWEEN:case $O._NOT_BETWEEN:cs.push({dtp:5,v:$NM.toLocaleString(i)+(isPercent?"%":"")});case $O._EQUALS:case $O._NOT_EQUALS:cs.push({dtp:5,v:$NM.toLocaleString(a)+(isPercent?"%":"")});break;default:if(i>l){cs.push({dtp:5,v:$NM.toLocaleString(i)+(isPercent?"%":"")});}if(a<h){cs.push({dtp:5,v:$NM.toLocaleString(a)+(isPercent?"%":"")});}}}sl.cs=cs;sl.parent.node.data.cs=cs;sl.set("unSet",unset);};this.updateThumb=function(){var cs1Idx=sl.cs1Idx,cs2Idx=sl.cs2Idx;if(cs1Idx!==undefined&&cs2Idx!==undefined){var unit=sl.unit,gap=sl.gap;$HASH.copy(positionSliderElements(sl,sl,$MATH_ROUND(cs1Idx*unit-gap),$MATH_ROUND(cs2Idx*unit-gap)),sl);}};this.joinConst=function(){var cs=sl.cs;if(cs){var constValues=[],i;for(i in cs){constValues.push(cs[i].v);}return constValues.join(",");}};}var tooltipMarkup="<span {@ttpCssText}>{@content}</span>";function initGhost(){if(this.staticStatus){return null;}var ghost=this.ghost;if(!ghost){var cn=this.containerNode.cloneNode(true),cnc=cn.childNodes;$C.addClass(cn,["gh"]);ghost=this.ghost={containerNode:cn,lowerRange:cnc[0],handle1Node:cnc[1],thumbNode:cnc[2],handle2Node:cnc[3],upperRange:cnc[4]};this.sdcNode.appendChild(cn);}var orCfg=this.orCfg,position=orCfg.posCssP,length=orCfg.lenCssP,id=this.id;mstrmojo.array.forEach(["lowerRange","containerNode","thumbNode","upperRange"],function(nodeName,idx){var slider=mstrmojo.all[id],widgetNodeStyle=slider[nodeName].style,ghostNodeStyle=ghost[nodeName].style;if(idx){ghostNodeStyle[position]=widgetNodeStyle[position];}ghostNodeStyle[length]=widgetNodeStyle[length];});ghost.containerNode.style.display="block";return ghost;}mstrmojo.MetricSlider=mstrmojo.declare(mstrmojo.Slider,[mstrmojo._HasPopup],{scriptClass:"mstrmojo.MetricSlider",markupString:'<div><div class="mstrmojo-Slider-summary"></div><div class="mstrmojo-Slider {@cssClass} {@clsType} {@clsOrientation}" style="{@cssText}" ><div class="cont" style="position:absolute;"><div class="bk" style="margin-top: 2px;{@bkCssText}"></div><div class="sdc" style="position:absolute;{@sdcCssText}"><div class="sd" style="{@sdCssText}"><div class="bk" style="{@lowerRangeCssText}"></div><div class="t1" style="{@handle1CssText}" mstrAttach:mouseover,mouseout,click></div><div class="t2 bk" style="{@thumbCssText}"></div><div class="t3" style="{@handel2CssText}" mstrAttach:mouseover,mouseout,click></div><div class="bk" style="{@upperRangeCssText}"></div></div></div><div class="mstrmojo-Label" style="margin-top:5px;float:left;"></div><div class="mstrmojo-Label" style="margin-top:5px;float:right;"></div></div></div></div>',markupSlots:{summaryNode:function(){return this.domNode.childNodes[0];},dndNode:function(){return this.domNode.childNodes[1].childNodes[0];},bgNode:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[0];},sdcNode:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[1];},containerNode:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[1].childNodes[0];},lowerRange:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0];},handle1Node:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[1];},thumbNode:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[2];},handle2Node:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[3];},upperRange:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[4];},tooltipNode:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[1];},lowNode:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[2];},highNode:function(){return this.domNode.childNodes[1].childNodes[0].childNodes[3];},editValueNode:function(){return this.domNode;}},markupMethods:{onlowTextChange:function(){this.lowNode.innerHTML=this.lowText||"";},onhighTextChange:function(){this.highNode.innerHTML=this.highText||"";},onfontChange:function(){this.lowNode.style.font=this.highNode.style.font=String(this.font);},onunSetChange:function(){$C.toggleClass(this.domNode.childNodes[1],"invalid",this.unSet);}},init:function init(p){this._super(p);this.handleSize=mstrmojo.MetricSlider.METRICSLIDERTHUMBWIDTH;this.clsType="scm";this.typeHelper=new MetricSlider(this);this.useRichTooltip=false;},unSet:false,preBuildRendering:function preBuildRendering(){var orCfg=this.orCfg,isHoriz=this.isHoriz;orCfg.cPosCssP=(isHoriz)?"right":"bottom";orCfg.cLenCssP=(isHoriz)?"height":"width";var dimension=orCfg.lenCssP,rawLength=this[dimension],length=parseInt(rawLength,10),handleSize=this.handleSize;var effectiveLength=this._length=(isNaN(length))?0:(length-handleSize);if(effectiveLength<=0){effectiveLength=this._length=mstrmojo.MetricSlider.METRICSLIDERDEFAULTWIDTH-handleSize;}if(rawLength){this.bkCssText=dimension+":"+$MATH_MAX(length-(2*this.cssBkBW),0)+"px;";this.sdcCssText=orCfg.posCssP+":0px;"+dimension+":"+effectiveLength+"px;"+orCfg.opPosCssP+":0px;";}this.typeHelper.initialMetricSlider();this.typeHelper.updateThumb();},postBuildRendering:function postBuildRendering(){this._super();if(!this.staticStatus&&!this.da.nov){var ln=this.lowNode,fos=parseInt(ln.style.fontSize,10);ln.style.fontSize=this.highNode.style.fontSize=$MATH_ROUND((isNaN(fos)?8:fos)*this.parent.model.zf)+"pt";this.updateSummary();}},onmouseover:function onmouseover(evt){this.showTooltip(evt.e,self);},onmouseout:function onmouseout(evt){this.hideTooltip(evt.e,self);},summaryLabels:{db:$DESC(8153,"Between ## and ###"),dnb:$DESC(8154,"Not between ## and ###"),din:$DESC(587,"In"),dnin:$DESC(2204,"Not in"),dnull:$DESC(2202,"Is Null"),dnnull:$DESC(2203,"Is not Null"),req:$DESC(8155,"Rank ="),rneq:$DESC(8156,"Rank <>").replace("<>",String.fromCharCode(8800)),rexb:$DESC(8157,"Rank exclude bottom"),rext:$DESC(8158,"Rank exclude top"),rb:$DESC(8159,"Rank bottom"),rt:$DESC(8160,"Rank top"),rbt:$DESC(8161,"Rank between ## and ###"),rnbt:$DESC(8162,"Rank not between ## and ###"),rin:$DESC(8163,"Rank in"),rnin:$DESC(8164,"Rank not in"),peq:$DESC(8165,"Percent ="),pneq:$DESC(8166,"Percent <>").replace("<>",String.fromCharCode(8800)),pexb:$DESC(8167,"Exclude bottom"),pext:$DESC(8168,"Exclude top"),pb:$DESC(7576,"Bottom"),pt:$DESC(7575,"Top"),pbt:$DESC(8153,"Between ## and ###"),pnbt:$DESC(8154,"Not between ## and ###"),pin:$DESC(8169,"Percent in"),pnin:$DESC(8170,"Percent not in")},updateSummary:function updateSummary(){if(this.summaryNode&&!this.staticStatus){var f=this.f,ft=this.ft,fte=$M,fe=$M.FN,fmrpe=$M.MRPFN,txt="",fl=(this.cs1Vl<this.cs2Vl)?this.cs1Nm:this.cs2Nm,fr=(this.cs1Vl>this.cs2Vl)?this.cs1Nm:this.cs2Nm,th=this.typeHelper,s=this.summaryLabels,specialCase=(ft==fte._GENERIC&&(f==fe.ISNULL||f==fe.ISNOTNULL||f==fe.NOTIN||f==fe.IN))||((ft==fte._PERCENT||ft==fte._RANK)&&(f==fmrpe.INASCENDING||f==fmrpe.INDESCENDING||f==fmrpe.NOTINDESCENDING||f==fmrpe.NOTINASCENDING));if(!this.unSet||specialCase){switch(ft){case fte._GENERIC:switch(f){case fe.EQUALS:txt="= "+fl;break;case fe.NOTEQUALS:txt=String.fromCharCode(8800)+" "+fl;break;case fe.GREATERTHAN:txt="> "+fr;break;case fe.GREATERTHANEQUALS:txt=String.fromCharCode(8805)+" "+fl;break;case fe.LESSTHAN:txt="< "+fl;break;case fe.LESSTHANEQUALS:txt=String.fromCharCode(8804)+" "+fr;break;case fe.BETWEEN:txt=s.db.replace("##",fl).replace("###",fr);break;case fe.NOTBETWEEN:txt=s.dnb.replace("##",fl).replace("###",fr);break;case fe.ISNULL:txt=s.dnull;break;case fe.ISNOTNULL:txt=s.dnnull;break;case fe.IN:txt=s.din+" "+th.joinConst();break;case fe.NOTIN:txt=s.dnin+" "+th.joinConst();break;}break;case fte._PERCENT:case fte._RANK:var pr="r";if(ft==fte._PERCENT){pr="p";}switch(f){case fmrpe.EQUALSDESCENDING:case fmrpe.EQUALSASCENDING:txt=s[pr+"eq"]+" "+fl;break;case fmrpe.NOTEQUALSDESCENDING:case fmrpe.NOTEQUALSASCENDING:txt=s[pr+"neq"]+" "+fl;break;case fmrpe.GREATERTHANEQUALSASCENDING:txt=s[pr+"exb"]+" "+fl;break;case fmrpe.GREATERTHANASCENDING:txt=s[pr+"exb"]+" "+fr;break;case fmrpe.GREATERTHANEQUALSDESCENDING:txt=s[pr+"ext"]+" "+fl;break;case fmrpe.GREATERTHANDESCENDING:txt=s[pr+"ext"]+" "+fr;break;case fmrpe.LESSTHANASCENDING:txt=s[pr+"b"]+" "+fl;break;case fmrpe.LESSTHANEQUALSASCENDING:txt=s[pr+"b"]+" "+fr;break;case fmrpe.LESSTHANDESCENDING:txt=s[pr+"t"]+" "+fl;break;case fmrpe.LESSTHANEQUALSDESCENDING:txt=s[pr+"t"]+" "+fr;break;case fmrpe.BETWEENDESCENDING:case fmrpe.BETWEENASCENDING:txt=s[pr+"bt"].replace("##",fl).replace("###",fr);break;case fmrpe.NOTBETWEENASCENDING:case fmrpe.NOTBETWEENDESCENDING:txt=s[pr+"nbt"].replace("##",fl).replace("###",fr);break;case fmrpe.INASCENDING:case fmrpe.INDESCENDING:txt=s[pr+"in"]+" "+th.joinConst();break;case fmrpe.NOTINDESCENDING:case fmrpe.NOTINASCENDING:txt="";txt=s[pr+"nin"]+" "+th.joinConst();break;}break;}}var summaryNode=this.summaryNode,margin=(txt!=="")?"":0;summaryNode.innerHTML=txt;summaryNode.style.margin=margin;if(this.hasRendered&&this.height==null){this.parent.updateHeight();}}},getClientHeight:function getClientHeight(){return this.dndNode.clientHeight+this.summaryNode.clientHeight+15;},initDrag:function initDrag(e,hWin){if(!this.staticStatus&&!this.da.nov){hWin=hWin||window;var td=$D.eventTarget(hWin,this.dnd.startE);if(td===this.handle1Node||td===this.handle2Node){var ghost=initGhost.call(this),oc=this.orCfg,dnd=this.dnd;dnd.initD={handle1:parseFloat(this.handle1,10),handle2:parseFloat(this.handle2,10),length:this._length,contL:ghost.containerNode[oc.lenP],offset:$D.getMousePosition(this.dnd.startE,hWin)[oc.offsetP]};dnd.initD.td=td;$C.removeClass(this.domNode.childNodes[1],["invalid"]);}}},ondrag:function ondrag(e,hWin){if(!this.staticStatus){hWin=hWin||window;var initD=this.dnd.initD;if(initD){var ghost=this.ghost,cs1Px=initD.handle1,cs2Px=initD.handle2,cs1Idx=this.cs1Idx,cs2Idx=this.cs2Idx,unit=this.unit,gap=this.gap,length=initD.length;var diff=$D.getMousePosition(e,hWin)[this.orCfg.offsetP]-initD.offset;switch(initD.td){case this.handle1Node:cs1Px=$MATH_MAX($MATH_MIN($MATH_MAX(initD.handle1+diff,0),length)-gap,-1);cs1Idx=$MATH_MAX($MATH_FLOOR(cs1Px/unit+0.5),0);break;case this.handle2Node:cs2Px=$MATH_MAX($MATH_MIN($MATH_MAX(initD.handle2+diff,0),length)-gap,-1);cs2Idx=$MATH_MAX($MATH.ceil(cs2Px/unit+0.5),0);break;default:return ;}positionSliderElements(this,ghost,cs1Px,cs2Px);var items=this.items,itemCount=(items&&items.length)||0;if(itemCount&&cs1Idx>=0&&cs1Idx<itemCount&&cs2Idx>=0&&cs2Idx<itemCount){var _changed=false;if(cs1Idx!==this.cs1Idx){this.cs1Idx=cs1Idx;var itm=this.items[cs1Idx];this.cs1Vl=itm.v;this.cs1Nm=itm.n;_changed=true;}if(cs2Idx!==this.cs2Idx){this.cs2Idx=cs2Idx;var itm=this.items[cs2Idx];this.cs2Vl=itm.v;this.cs2Nm=itm.n;_changed=true;}if(_changed){this.typeHelper.updateThumb();this._updateTooltip(initD.td);}}}}},ondrop:function ondrop(e){if(!this.staticStatus&&!this.da.nov){this.typeHelper.updateThumb();var ghost=this.ghost;if(ghost){ghost.containerNode.style.display="none";}this.hideTooltip(e,self);if(this.items&&this.items.length){this[($D.eventTarget(self,e)===this.ghost.handle1Node)?"frtUst":"ndUst"]=false;this.selectRange();}this.dnd.initD=null;}},selectRange:function slctrng(onlyInclude,changeQual,updateUnset){var T=this.typeHelper,c1=this.cs1Vl,c2=this.cs2Vl,q=this.qua,nf=this.numFmts;this.cs1Idx=T.getIdx(c1);this.cs2Idx=T.getIdx(c2);var isEdge=function(idx,itms){var its=itms||[];return idx==0||idx==its.length-1;},unsetStr=$DESC(7622);this.cs1Nm=isEdge(this.cs1Idx,this.items)&&!this.frtUst?unsetStr:$M.formatNumber(q,c1,nf);this.cs2Nm=isEdge(this.cs2Idx,this.items)&&!this.ndUst?unsetStr:$M.formatNumber(q,c2,nf);T.updateOpCs();this.onlyInclude=!!onlyInclude;this.changeQual=!!changeQual;this.unSet=!!updateUnset||this.unSet;this.updateSummary();this.onselectionChange();},onincludeChange:function incChange(){if(!this.staticStatus){this.selectRange(true);}},showTooltip:function showTooltip(e,win){var tgt=$D.eventTarget(win,e);this._updateTooltip(tgt);mstrmojo.tooltip.open(this,e,win);},_updateTooltip:function _updateTooltip(tgt){var oc=this.orCfg,ps=oc.posCssP,txt,tt={contentNodeCssClass:"scm-tooltip",refNode:this.domNode.childNodes[1],posType:this._tooltip_pos};tt[oc.opPosCssP]=-parseInt(this.font)/2;tt[ps]=tgt.style[ps];if(this.unSet){txt=$DESC(7622);}else{txt=String((tgt===this.handle1Node)?this.cs1Nm:this.cs2Nm);}tt.content=tooltipMarkup.replace(/\{@content\}/g,txt);this.set("richTooltip",tt);},onclick:function onclick(evt){if(!this.staticStatus&&!this.da.nov){var tgt=$D.eventTarget(evt.hWin||window,evt.e);this.dnd.initD={makeMetricSilderSelectionByClick:true,td:((tgt===this.handle1Node)?this.handle1Node:((tgt===this.handle2Node)?this.handle2Node:null))};this.openEditValue({isfrt:(tgt===this.handle1Node),tgt:tgt});if(this._onThumb){this._onThumb(evt);}}},onselectionChange:function onselChg(evt){this._super(evt);if(this.dnd.initD&&this.dnd.initD.makeMetricSilderSelectionByClick){this.dnd.initD=null;}},onquaChange:function onqChg(evt){var oldf=mstrmojo.MCSUtil.getFuncInfo(this.opId,evt.valueWas),newf=mstrmojo.MCSUtil.getFuncInfo(this.opId,evt.value),u;if(oldf.ft!=newf.ft){if(!this.staticStatus){this.items=[];this.cs=[];this.f=this.ft=null;this.refresh();u=true;}}else{this.f=mstrmojo.MCSUtil.getFuncInfo(this.opId,evt.value).f;u=false;}this.selectRange(false,true,u);},updateData:function udtDt(da,props){this.da=da;this.updateExpr(props);},updateExpr:function udtEp(props){if(props){this.cs=props.cs;this.f=props.f;this.ft=props.ft;this.qua=props.qua;}this.refresh();},editValueRef:{cssClass:"edvl",slot:"editValueNode",scriptClass:"mstrmojo.Popup",locksHover:true,onOpen:function(){if(this.tgt){this.set("left",$MATH_MIN($MATH_MAX(parseInt(this.tgt.style.left,10),0),parseInt(this.opener.width,10)-90)+"px");this.set("top",this.tgt.style.top);}var op=this.opener,cld=this.children[0];if(op){var v=this.isfrt?op.cs1Vl:op.cs2Vl;if(this.isfrt){if((op.cs1Vl<=op.low||op.cs1Vl>=op.high)&&!op.frtUst){v="";}}else{if((op.cs2Vl<=op.low||op.cs2Vl>=op.high)&&!op.ndUst){v="";}}cld.edt.set("value",$NM.toLocaleString(v));}},children:[{scriptClass:"mstrmojo.Table",rows:1,cols:2,layout:[{cells:[{cssText:"width: 40px; padding: 3px;"},{cssText:"width: 16px;padding: 3px;"}]}],children:[{slot:"0,0",scriptClass:"mstrmojo.ValidationTextBox",alias:"edt",cssText:"color:black",dtp:mstrmojo.expr.DTP.NUMERIC,constraints:{trigger:mstrmojo.validation.TRIGGER.ALL},onValid:function(){if(this.parent.apply){this.parent.apply.set("enabled",String(this.value).length!=0);}},onInvalid:function(){if(this.parent.apply){this.parent.apply.set("enabled",false);}},onkeyup:function(evt){if(this.parent.apply.enabled){var hWin=evt.hWin,e=evt.e||hWin.event;if(e.keyCode===13){this.parent.apply.onclick();}}}},{slot:"0,1",scriptClass:"mstrmojo.Button",cssClass:"icn apply",alias:"apply",onclick:function(){var p=this.parent.parent,op=p.opener,v=this.parent.edt.value;if(p&&op&&String(v).length>0){op[p.isfrt?"cs1Nm":"cs2Nm"]=v;v=$NM.parseNumeric(v);op[p.isfrt?"cs1Vl":"cs2Vl"]=v;}op[p.isfrt?"frtUst":"ndUst"]=true;op.selectRange();op.typeHelper.updateThumb();p.close();}}]}]},openEditValue:function(config){this.openPopup("editValueRef",config);}});mstrmojo.MetricSlider.METRICSLIDERTHUMBWIDTH=14;mstrmojo.MetricSlider.METRICSLIDERDEFAULTWIDTH=95;}());