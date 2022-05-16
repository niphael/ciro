(function(){mstrmojo.requiresCls("mstrmojo.Vis");var DEFAULT_DARK_THEME=1;var DEFAULT_LIGHT_THEME=2;var CUSTOM_DARK_THEME=3;var CUSTOM_LIGHT_THEME=4;mstrmojo.VisMicroChartBullet=mstrmojo.declare(mstrmojo.Vis,null,{scriptClass:"mstrmojo.VisMicroChartBullet",isDrawAxis:false,margin:{t:0,r:5,b:0,l:5},showHighlightLine:false,themeColor:"#FFFFFF",noBackground:true,isAnimateLines:false,toolTipMain:null,mainWidth:0,mainLeftPos:0,showMinLabel:false,markupString:'<div id="{@id}" class="mstrmojo-Chart {@cssClass}" style="width:{@width};height:{@height};top:{@top};left:{@left};position:relative;"  mstrAttach:mousedown,mouseup,mousemove,click ><canvas width="{@width}" height="{@height}"></canvas><div style="position:absolute;left:0px;bottom:0px;display:none;font:7px Arial;text-align:left;line-height:7px;"></div><div style="width:100%;height:{@height};top:0px;left:0px;position:absolute;display:none;font:10pt Arial;overflow: hidden; text-overflow: ellipsis; white-space:nowrap"></div></div>',markupSlots:{canvas:function(){return this.domNode.firstChild;},minLabel:function(){return this.domNode.childNodes[1];},errorMsg:function(){return this.domNode.childNodes[2];}},postBuildRendering:function postBR(){if(this._super){this._super();}this.browserSupportsHtml5=this.canvas.getContext;if(!this.browserSupportsHtml5){this.renderErrorMessage(mstrmojo.desc(8126,"Your browser does not support HTML5"));return ;}if(!this.model){this.renderErrorMessage(mstrmojo.desc(8426,"No model provided"));return ;}if(this.model.err||this.model.eg){this.renderErrorMessage(this.model.err||this.model.eg);return ;}this.context=this.canvas.getContext("2d");this.setColorByTheme();this.drawChart();},setColorByTheme:function setColorByTheme(){var bulletProps=this.config;var dpi=mstrMobileApp&&mstrMobileApp.getDeviceDPI()||160;if(this.theme==DEFAULT_DARK_THEME){this.bandColor1="#494949";this.bandColor2="#595959";this.bandColor3="#727272";this.refLinePosColor="#FF781D";this.refLineNegColor="#FF781D";this.refLineWidth=dpi>=160?2:1;this.blueBarPosColor="#00BDFF";this.blueBarNegColor=bulletProps.mwNegCol;}else{if(this.theme==DEFAULT_LIGHT_THEME){this.bandColor1="#A5A5A5";this.bandColor2="#B3B3B3";this.bandColor3="#C4C4C4";this.refLinePosColor="#FF781D";this.refLineNegColor="#FF781D";this.refLineWidth=dpi>=160?2:1;this.blueBarPosColor="#00BDFF";this.blueBarNegColor=bulletProps.mwNegCol;}else{this.bandColor1=bulletProps.mwBand1||"#999999";this.bandColor2=bulletProps.mwBand2||"#BBBBBB";this.bandColor3=bulletProps.mwBand3||"#DEDEDE";this.refLinePosColor=bulletProps.mwRefLineCol;this.refLineNegColor=bulletProps.mwRefLineCol;this.blueBarPosColor=bulletProps.mwPosCol;this.blueBarNegColor=bulletProps.mwNegCol;}}},showTooltip:function shwttp(touchX,touchY){if(!this.config.mbShowTooltip){return false;}var minValue=this.config.mfMinValue;var refV=this.refv;var mc3=refV[2].rv-minValue;var mc4=refV[3].rv-minValue;var ttp=this.toolTipMain;var model=this.model;var metrics=model.mtrcs.items;var bulletProps=this.config;var ofht=17;var line1;if(
/*this.widget.isKPI &&*/
this.widget.bulletProps.mstrAssMetric){line1=this.widget.bulletProps.mstrAssMetric+": "+refV[2].v;}else{line1=metrics[2]+": "+refV[2].v;}var maxWidth=this.widget.getTextWidthByCanvas(line1,ttp);if(bulletProps.mbRefLine){line1='<div style="margin-left:5px;margin-top:5px;"><div style="float:left;margin-right:5px;margin-top:2px;width:12px;height:10px;background-color:'+this.targetColor+';"></div><div style="float:left;text-align:top;">'+line1+"</div></div>";}else{line1='<div style="margin-left:5px;margin-top:5px;margin-bottom:5px;"><div style="float:left;margin-right:5px;margin-top:2px;width:12px;height:10px;background-color:'+this.targetColor+';"></div><div style="float:left;text-align:top;">'+line1+"</div></div>";}if(bulletProps.mbRefLine){ofht+=17;var line2=metrics[6]+": "+refV[6].v;var line2Width=this.widget.getTextWidthByCanvas(line2,ttp);if(line2Width>maxWidth){maxWidth=line2Width;}line2='<div style="margin-left:5px;margin-bottom:5px;"><div style="float:left;margin-left:5px;margin-top:2px;margin-right:10px;width:2px;height:10px;background-color:'+this.refLineColor+';"></div><div style="float:left;">'+line2+"</div></div>";line1+="<br/>"+line2;}ofht+=10;if(this.tooltipErrMsg){ttp.innerHTML=this.tooltipErrMsg;}else{ttp.innerHTML=line1;}var pos=mstrmojo.dom.position(this.domNode,true);var posWdt=mstrmojo.dom.position(this.widget._leftChart.domNode,true);maxWidth+=28;ttp.style.display="block";ttp.style.borderColor=this.targetColor;ttp.style.width=maxWidth+"px";var tpof=0;if((this.getHeight()-ofht)%2==0){tpof=(pos.y-posWdt.y+(this.getHeight()-ofht)/2);}else{tpof=(pos.y-posWdt.y+(this.getHeight()-ofht-1)/2);}if(tpof<0){tpof=0;}if(tpof+ofht>this.widget.getHeight()){tpof=this.widget.getHeight()-ofht-5;}ttp.style.top=tpof+"px";var ttpLeft=0;if(pos.x+pos.w/2>(posWdt.x+posWdt.w/2)){ttpLeft=pos.x-posWdt.x-maxWidth-10;}else{ttpLeft=pos.x-posWdt.x+pos.w+10;}if(ttpLeft<0){ttpLeft=0;}ttp.style.left=ttpLeft+"px";return true;},drawChart:function drwchrt(){var bulletProps=this.config;var minValue=bulletProps.mfMinValue;var refV=this.refv;var mc3,mc4,mc5,mc6,mc7;var mMc3,mMc4,mMc5,mMc6,mMc7;mMc3=parseFloat(refV[2].rv);mMc4=parseFloat(refV[3].rv);mMc5=parseFloat(refV[4].rv);mMc6=parseFloat(refV[5].rv);mMc7=parseFloat(refV[6].rv);mc3=mMc3-minValue;mc4=mMc4-minValue;mc5=mMc5-minValue;mc6=mMc6-minValue;mc7=mMc7-minValue;var isInverted=bulletProps.mbInvertAxis;var hasRefLine=bulletProps.mbRefLine;var hasRefBands=bulletProps.mbRefBands;var mShowTooltip=bulletProps.mbShowTooltip;var ctx=this.context;var ratioBetweenMetricViewWidth;var bulletHeight;var minLabelHeight=7,minLabelWidth;var xPadding=0,yPadding=5;if(isNaN(mc3)||isNaN(mc4)||isNaN(mc5)||isNaN(mc6)){var err=mstrmojo.desc(10860,"Insufficient data to plot the graph");this.errorMsg.innerHTML=err;this.errorMsg.style.display="block";this.minLabel.style.display="none";this.tooltipErrMsg=err;return ;}else{if(mc3*mc4>0&&Math.abs(mc3)>Math.abs(mc4)){var err=mstrmojo.desc(10381,"Metric of Butllet is out of the max graph range");this.errorMsg.innerHTML=err;this.errorMsg.style.display="block";this.minLabel.style.display="none";this.tooltipErrMsg=err;return ;}else{this.errorMsg.style.display="none";this.tooltipErrMsg=null;}}var xOri;var redComp,greenComp,blueComp;var mcOriX,mcOriY;var mcHeight,mcWidth;if(mc3<0&&mc4>0){ratioBetweenMetricViewWidth=(this.getWidth()-2*xPadding)/(mc4-mc3);xOri=xPadding-mc3*ratioBetweenMetricViewWidth;bulletHeight=this.getHeight()-minLabelHeight-2*yPadding-2;if(hasRefBands){mcHeight=bulletHeight;mcWidth=this.getWidth()-2*xPadding;mcOriX=xPadding;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;ctx.fillStyle=this.bandColor3;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);if(mc6>mc3&&mc6<mc4){mcWidth=(mc6-mc3)*ratioBetweenMetricViewWidth;mcOriX=xPadding;ctx.fillStyle=this.bandColor2;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}if(mc5>mc3&&mc5<mc4){mcWidth=(mc5-mc3)*ratioBetweenMetricViewWidth;mcOriX=xPadding;ctx.fillStyle=this.bandColor1;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}}mcHeight=bulletHeight/2;mcWidth=Math.abs(mc3)*ratioBetweenMetricViewWidth;mcOriX=xPadding;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;ctx.fillStyle=this.targetColor=mMc3>=0?this.blueBarPosColor:this.blueBarNegColor;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);if(hasRefLine&&mc7>mc3&&mc7<mc4){mcHeight=bulletHeight;mcWidth=2;mcOriX=xOri+mc7*ratioBetweenMetricViewWidth;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;ctx.fillStyle=this.refLineColor=mMc3>=0?this.refLinePosColor:this.refLineNegColor;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}}else{if(mc3<0&&mc4<0){ratioBetweenMetricViewWidth=(this.getWidth()-2*xPadding)/(Math.abs(mc4));xOri=xPadding;bulletHeight=this.getHeight()-minLabelHeight-2*yPadding-2;isInverted=!isInverted;if(hasRefBands){mcHeight=bulletHeight;mcWidth=this.getWidth()-2*xPadding;mcOriX=xPadding;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;ctx.fillStyle=this.bandColor3;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);if(mc6<0&&mc6>mc4){mcWidth=Math.abs(mc6)*ratioBetweenMetricViewWidth;mcOriX=xPadding;ctx.fillStyle=this.bandColor2;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}if(mc5<0&&mc5>mc4){mcWidth=Math.abs(mc5)*ratioBetweenMetricViewWidth;mcOriX=xPadding;ctx.fillStyle=this.bandColor1;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}}mcHeight=bulletHeight/2;mcWidth=Math.abs(mc3)*ratioBetweenMetricViewWidth;mcOriX=xPadding;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;ctx.fillStyle=this.targetColor=mMc3>=0?this.blueBarPosColor:this.blueBarNegColor;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);if(hasRefLine&&mc7<0&&mc7>mc4){mcHeight=bulletHeight;mcWidth=2;mcOriX=xOri+Math.abs(mc7)*ratioBetweenMetricViewWidth;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;mcOriX=this.getWidth()-mcOriX-mcWidth;ctx.fillStyle=this.refLineColor=mMc3>=0?this.refLinePosColor:this.refLineNegColor;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}}else{if(mc3>0&&mc4>0){if(this.showMinLabel){yPadding=9.5;}else{yPadding=5;}ratioBetweenMetricViewWidth=(this.getWidth()-2*xPadding)/mc4;xOri=xPadding;bulletHeight=this.getHeight()-2*yPadding;if(hasRefBands){mcHeight=bulletHeight;mcWidth=this.getWidth()-2*xPadding;mcOriX=xPadding;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;ctx.fillStyle=this.bandColor3;this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);if(mc6>0&&mc6<mc4){mcWidth=mc6*ratioBetweenMetricViewWidth;mcOriX=xOri;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}ctx.fillStyle=this.bandColor2;this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}if(mc5>0&&mc5<mc4){mcWidth=mc5*ratioBetweenMetricViewWidth;mcOriX=xOri;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}ctx.fillStyle=this.bandColor1;this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}}mcHeight=bulletHeight/2;mcWidth=mc3*ratioBetweenMetricViewWidth;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;mcOriX=xOri;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}ctx.fillStyle=this.targetColor=mMc3>=0?this.blueBarPosColor:this.blueBarNegColor;this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);if(hasRefLine&&mc7>0&&mc7<mc4){mcHeight=bulletHeight;mcWidth=2;mcOriX=xOri+mc7*ratioBetweenMetricViewWidth;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;ctx.fillStyle=this.refLineColor=mMc3>=0?this.refLinePosColor:this.refLineNegColor;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}}else{ratioBetweenMetricViewWidth=(this.getWidth()-2*xPadding)/(mc3-mc4);bulletHeight=this.getHeight()-minLabelHeight-2*yPadding-2;xOri=xPadding-mc4*ratioBetweenMetricViewWidth;isInverted=!isInverted;if(hasRefBands){mcHeight=bulletHeight;mcWidth=this.getWidth()-2*xPadding;mcOriX=xPadding;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;ctx.fillStyle=this.bandColor3;this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);if(mc6<mc3&&mc6>mc4){mcWidth=(mc3-mc6)*ratioBetweenMetricViewWidth;mcOriX=xPadding;mcOriX=this.getWidth()-mcOriX-mcWidth;ctx.fillStyle=this.bandColor2;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}if(mc5<mc3&&mc5>mc4){mcWidth=(mc3-mc5)*ratioBetweenMetricViewWidth;mcOriX=xPadding;mcOriX=this.getWidth()-mcOriX-mcWidth;ctx.fillStyle=this.bandColor1;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}}mcHeight=bulletHeight/2;mcWidth=Math.abs(mc3)*ratioBetweenMetricViewWidth;mcOriX=xOri;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;ctx.fillStyle=this.targetColor=mMc3>=0?this.blueBarPosColor:this.blueBarNegColor;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);if(hasRefLine&&mc7<mc3&&mc7>mc4){mcHeight=bulletHeight;mcWidth=2;mcOriX=xOri+mc7*ratioBetweenMetricViewWidth;mcOriY=(bulletHeight)/2-mcHeight/2+yPadding;ctx.fillStyle=this.refLineColor=mMc3>=0?this.refLinePosColor:this.refLineNegColor;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);}}}}if(mc3<0){mcHeight=bulletHeight;mcWidth=2;mcOriX=xOri;mcOriY=yPadding;redComp=0;greenComp=0;blueComp=0;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}ctx.fillStyle="#000000";this.drawRect(ctx,mcOriX,mcOriY,mcWidth,mcHeight);minValue=minValue+"";var disPlayValue=(minValue=="0")?"":"$";var mlen=0;for(var i=0;i<minValue.length;i++){if(minValue[i]=="."){break;}mlen++;}for(var i=0;i<minValue.length;i++){disPlayValue+=minValue[i];mlen--;if(mlen%3==0&&mlen>0){disPlayValue+=",";}}minValue=disPlayValue;var textWidth=this.widget.getTextWidthByCanvas(minValue,this.minLabel);minLabelWidth=textWidth-1;mcOriX=xOri;if(isInverted){mcOriX=this.getWidth()-mcOriX-mcWidth;}if(mcOriX-minLabelWidth/2<=xPadding){this.minLabel.style.paddingLeft=xPadding;}else{if(mcOriX+minLabelWidth/2<=this.getWidth()-xPadding){this.minLabel.style.paddingLeft=Math.round(mcOriX-minLabelWidth/2)+"px";}else{this.minLabel.style.paddingLeft=Math.round((this.getWidth()-xPadding-minLabelWidth))+"px";}}this.minLabel.style.bottom=yPadding+"px";this.minLabel.style.fontSize="7pt";if(this.labelColorRGB){this.minLabel.style.color="rgb("+this.labelColorRGB[0]+","+this.labelColorRGB[1]+","+this.labelColorRGB[2]+")";}else{this.minLabel.style.color="";}this.minLabel.innerHTML=minValue;this.minLabel.style.display="block";}else{this.minLabel.style.display="none";}},convertColor:function convrtClr(ngv){var ret="#";var base=parseInt("0xff");var blueComp=ngv&base;base=parseInt("0xff00");var greenComp=((ngv&base)>>8);base=parseInt("0xff0000");var redComp=((ngv&base)>>16);var redP=redComp.toString(16);if(redP.length<2){redP="0"+redP;}var greenP=greenComp.toString(16);if(greenP.length<2){greenP="0"+greenP;}var blueP=blueComp.toString(16);if(blueP.length<2){blueP="0"+blueP;}ret+=redP;ret+=greenP;ret+=blueP;return ret;},drawRect:function(ctx,x,y,width,height){x=Math.round(x);y=Math.round(y);width=Math.round(width);height=Math.round(height);ctx.fillRect(x,y,width,height);},reDrawChart:function reDrwchart(){var context=this.context,canvas=this.canvas,wd=canvas.width,ht=canvas.height;context.clearRect(0,0,wd,ht);this.postBuildRendering();}});})();