(function(){mstrmojo.requiresCls("mstrmojo.array");mstrmojo.requiresDescs(4891);var _A=mstrmojo.array,ELEM_ALL_ID="u;",ELEM_DUMMY_ID="-1";mstrmojo.elementHelper=mstrmojo.provide("mstrmojo.elementHelper",{buildElemsTerseID:function buildElemsTerseID(elems,attrId,delDN){var item;for(var i in elems){item=elems[i];if(item.v){var vs=item.v.split(";");if(vs&&vs.length>1){vs[1]=attrId;if(delDN&&vs.length>2){vs.pop();}item.v=vs.join(";");}}}return elems;},buildElemsCountStr:function buildElemsCountStr(ces,elems){if(!ces||!ces.length||!elems||!elems.length){return"";}var sc=ces.length,tc=elems.length;if(_A.find(elems,"v",ELEM_ALL_ID)>-1){tc-=1;}if(_A.find(elems,"v",ELEM_DUMMY_ID)>-1){tc-=1;}if(_A.find(ces,"v",ELEM_ALL_ID)>-1||_A.indexOf(ces,ELEM_ALL_ID)>-1){sc=tc;}if(sc>=tc){return"("+tc+")";}else{return mstrmojo.desc("4891").replace("##",sc).replace("###",tc);}}});})();