(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.array","mstrmojo.StringBuffer","mstrmojo.ResSetLink");var ROW_AXIS=1,COL_AXIS=2;var ATTRIBUTE_SORT=2,COLUMN_SORT=4;var DRILLING_ACTION=1,HYPERLINK_ACTION=4;function getTitlesAxis(gts,ax){return gts[((ax===ROW_AXIS)?"row":"col")];}function getCellLinksContainer(cell,title){var linkMap=title.lm;return linkMap&&linkMap[cell.mix||0];}function getCellDrillsContainer(cell,title){var drillList=title.dp;return drillList&&drillList[cell.mix||0];}function buildLink(linksContainer,linkInfo,cell){var link=new mstrmojo.ResSetLink({mid:this.getMessageId(),srct:2,aopam:linkInfo.daMode});var answers=linkInfo.ans,answerCnt=answers&&answers.length;if(answerCnt){var prms=link.prms=[],i=0;for(i=0;i<answerCnt;i++){var answer=answers[i];var pid=answer.pid,am=parseInt(answer.m,10),prm={id:pid,am:am,pt:answer.pt};prms.push(prm);if(answer.po){prm.orid=answer.po.did;prm.ortp=answer.po.t;}switch(am){case link.DO_NOT_ANSWER:case link.CLOSE:case link.USE_DEFAULT_ANSWER:case link.SAME_PROMPT:break;case link.STATIC:var statElems=answer.es,staticLen=(statElems&&statElems.length)||0,z;prm.pa={es:[]};for(z=staticLen-1;z>=0;--z){var statElem=statElems[z];prm.pa.es.push({ei:statElem.id,disp_n:statElem.n,emt:1});}break;case link.DYNAMIC:case link.ALL_VALID_UNITS:case link.CURRENT_UNIT:var dynUnits=answer.dunits;if(dynUnits&&dynUnits.length&&cell){var pa=prm.pa={};var pCell=cell,isMetricValue=(cell.mix!==undefined)&&(cell._lp||cell._tp);if(isMetricValue){pCell=cell._lp||cell._tp;}var axis=parseInt(pCell.axis,10);while(pCell){var pTitle=this.getPTitle(pCell,axis);if(pTitle&&mstrmojo.array.find(dynUnits,"id",pTitle.id)>=0){if(am!==link.DYNAMIC){pa.a={id:pTitle.id,n:pTitle.n,dispForms:pTitle.dfi};}if(answer.pt===1){pa.v=pCell.v;break;}else{var eid=pCell._e.id,dsn=pCell._e.n;pa.es=[];pa.es.push({ei:eid,emt:1,disp_n:dsn});}if(am===link.CURRENT_UNIT){break;}}pCell=this.getPCellParentNode(pCell,axis);if(isMetricValue&&!pCell&&axis===ROW_AXIS){axis=COL_AXIS;pCell=cell._tp;}}}break;}}}return link;}function getDrillElements(cells){var titleInfo=this.getCellTitleInfo(cells[0]),elements=[],fnAddCell=function(cell){if(cell){if(mstrApp.useBinaryFormat){if(cell._e){elements.push(cell.axis+"A"+(cell.ui+1)+"A"+cell._e.id);}fnAddCell(cell._p);}else{elements.push(cell.axis+"A"+(cell.ui+1)+"A"+cell.o);}}},i,len;if(!titleInfo.isSrcTitle){for(i=0,len=cells.length;i<len;i++){var c=cells[i];if(c.mix!==undefined&&(c._lp||c._tp)){fnAddCell(c._lp);fnAddCell(c._tp);}else{fnAddCell(c);}}}return(mstrApp.useBinaryFormat)?elements:elements.join(",");}mstrmojo.XtabModel=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.XtabModel",getMessageId:function getMessageId(){return this.data.mid;},getCellTitleInfo:function getCellTitleInfo(cell,dataBlock){var gts=dataBlock?dataBlock.gts:this.data.gts;var title=null;if(cell.mix===undefined){title=getTitlesAxis(gts,cell.axis)[cell.tui||cell.ui];}else{var findMetricTitle=function(titles){var len=(titles&&titles.length)||0,i;for(i=len-1;i>=0;--i){if(parseInt(titles[i].otp,10)===-1){return titles[i];}}return null;};title=findMetricTitle(gts.col)||findMetricTitle(gts.row);}return{isSrcTitle:(cell.o===undefined),title:title};},getCellLinksInfo:function getCellLinksInfo(cell,title){if(!title){var titleInfo=this.getCellTitleInfo(cell);title=titleInfo&&titleInfo.title;}return getCellLinksContainer(cell,title);},getCellDrillsInfo:function getCellDrillsInfo(cell,title){if(!title){var titleInfo=this.getCellTitleInfo(cell);title=titleInfo&&titleInfo.title;}return getCellDrillsContainer(cell,title);},getLinkDrillAction:function getLinkDrillAction(cells){return this.getActionObject(cells);},getAction:function getAction(cells){return this.getActionObject(cells);},getActionObject:function getActionObject(cells){var actionType=cells[0]&&cells[0].at,_rtn=null;if(actionType){if(actionType&HYPERLINK_ACTION){_rtn={h:"onLink",a:this.getLinkAction(cells[0])};}else{if(actionType&DRILLING_ACTION){_rtn={h:"onDrill",a:this.getDrillAction(cells)};}}}return _rtn;},getSortAction:function getSortAction(cell,isAsc){var titleInfo=this.getCellTitleInfo(cell),title=titleInfo.title,subTotalsPos=this.data.gts[((cell.axis===ROW_AXIS)?"row":"col")+"SubPos"],elems=[],unitAxis=title.axis,sortType,unitID,unitType,formId;isAsc=(isAsc===null||isAsc===undefined)?!(cell&&cell.so):isAsc;if(titleInfo.isSrcTitle){sortType=ATTRIBUTE_SORT;unitID=title.id;unitType=title.otp;formId=title.fid;}else{sortType=COLUMN_SORT;unitType=4;unitAxis=ROW_AXIS;subTotalsPos=this.data.gts.rowSubPos;do{var e=cell._e;if(e){if(e.oid){unitID=e.oid;}else{elems.push(e.id);}}cell=cell._p;}while(cell);}var action={sortType:sortType,axis:unitAxis,isAsc:isAsc,unitID:unitID,unitType:unitType,elementList:elems.join("\u001E"),subTotalsPos:subTotalsPos};if(unitID){action.unitID=unitID;}if(formId){action.formId=formId;}var sortKey;if(sortType===COLUMN_SORT){sortKey=["","",action.elementList||"",action.axis];}else{sortKey=[action.formId,"21"];}sortKey=[action.unitType,action.unitID].concat(sortKey);action.sortKey=sortKey.join("!");return action;},getPivotAction:function getPivotAction(cell,btn){var isForm=false,isMetric=cell.hasOwnProperty("mix"),ax=(isMetric)?null:cell.axis,pos=((isMetric)?cell.mix:cell.ui)+1,isMT=(cell.otp===-1);if(!isNaN(btn)){ax=btn;pos=1;if(isMetric){isMetric=false;isMT=true;}}else{var dec=(btn==="u"||btn==="l");if(!isMetric){var axis=getTitlesAxis(this.data.gts,ax),cnt=0,info={},bCur=false;mstrmojo.array.forEach(axis,function(u){if(info[u.id]){info[u.id].frm++;}else{cnt++;info[u.id]={pos:cnt,frm:1};if(u.id===cell.id){bCur=true;}else{if(bCur){return false;}}}});pos=info[cell.id].pos;var fix=cell.fix;if(fix){if(!dec||fix>1){if(dec||fix!==info[cell.id].frm){pos=fix;isForm=true;}}}}pos=pos+((dec)?-1:1);}var action={pos:pos};if(isForm){action.formID=cell.fid;}else{if(!isMetric){action.axis=ax;}}if(!isMT){var mSrc=(isMetric)?cell._e:cell;if(!isForm){action.objectType=mSrc.otp;}action.objectId=(isMetric)?mSrc.oid:cell.id;}return action;},isPvtButtonVisible:function isPvtButonVisible(c,btn){var ax=c.axis,axis=getTitlesAxis(this.data.gts,ax),isMetric=c.hasOwnProperty("mix");if(!isNaN(btn)){if(parseInt(btn,10)===ax){return false;}if(isMetric){return !!axis[c.ui]._hid;}return true;}var es=axis[c.ui].es,pos=c.ui,len=(isMetric)?es.length:axis.length;if(len===1){return false;}if(ax===((isMetric)?COL_AXIS:ROW_AXIS)){if(btn==="u"||btn==="d"){return false;}}else{if(btn==="l"||btn==="r"){return false;}}if((isMetric)?c._e===es[0]:pos===0){if(btn==="l"||btn==="u"){return false;}}if(isMetric?c._e===es[len-1]:pos===len-1){if(btn==="r"||btn==="d"){return false;}}return true;},getDrillAction:function getDrillAction(cells){var titleInfo=this.getCellTitleInfo(cells[0]),title=titleInfo.title,drillPath=title.dp[cells[0].mix||0];return{srcMsgId:this.data.mid,isWithin:drillPath.within,drillPathKey:drillPath.k,drillPathIndex:drillPath.dpi,drillElements:getDrillElements.call(this,cells)};},getPTitle:function getPTitle(pCell,axis){var gts=this.data.gts;return getTitlesAxis(gts,axis)[pCell.tui];},getPCellParentNode:function getPCellParentNode(pCell,axis){return pCell._p;},getLinkAction:function getLinkAction(cell,idx){var titleInfo=this.getCellTitleInfo(cell),title=titleInfo.title;return this.getLinkActionImpl(cell,title,idx);},getLinkActionImpl:function getLinkActionImpl(cell,title,idx){var linksContainer=getCellLinksContainer(cell,title),linkArray=linksContainer&&linksContainer.links,linkTarget=(linksContainer.onw)?"_blank":"";if(idx===null||idx===undefined){idx=(linksContainer&&linksContainer.di)||0;}var linkInfo=linkArray&&linkArray[idx];if(!linkInfo){return null;}var action={linkInfo:linkInfo,linkTarget:linkTarget};var url=linkInfo.url;if(url){var currentElement="&CurrentElement";if(cell&&title&&url.indexOf(currentElement)>-1){url=url.replace(currentElement,cell._e.id);}action.url=url;}else{var target=linkInfo.target,evt,idField;switch(parseInt(target&&target.t,10)){case 55:if(parseInt(target.st,10)===14081){evt=2048001;idField="objectID";}else{evt=32001;idField="documentID";}break;case 3:evt=4001;idField="reportID";action.reportViewMode=((parseInt(target.st,10)===769)?2:1);break;default:return null;}action.evt=evt;action[idField]=target.did;action.srcMsgId=this.getMessageId();var link=buildLink.call(this,linksContainer,linkInfo,cell);if(link){action.link=link;}return action;}},getDownloadAction:function getDownloadAction(rowPosition,maxRows,colPosition,maxCols,widgetID,memo){return{xtabId:widgetID,rowPosition:rowPosition,maxRows:maxRows,colPosition:colPosition,maxColumns:maxCols,memo:memo};}});}());