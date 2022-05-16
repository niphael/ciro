(function(){mstrmojo.requiresCls("mstrmojo.locales","mstrmojo.string");var _L=mstrmojo.locales,_S=mstrmojo.string,_G=window.mstrConfig,getThousand=function(){return mstrmojo.locales.number.THOUSANDSEPARATOR;},getDecimal=function(){return mstrmojo.locales.number.DECIMALSEPARATOR;},_unit=_G.units,UNIT={CM:1,IN:2,MM:3,PT:4,PC:5,PX:6},CAT={DEFAULT:-2,FIXED:0,CURR:1,PERCENT:4,FRACTION:5,SCIENTIFIC:6,GENERAL:9};var DPI_CONVERSION=96;String.prototype.reverse=function(){var res="";for(var i=this.length;i>0;--i){res+=this.charAt(i-1);}return res;};mstrmojo.num=mstrmojo.provide("mstrmojo.num",{isInt:function isInt(v){var thousand=getThousand(),INT_THOUSAND=new RegExp("^(-)?[0-9]{1,3}(\\"+thousand+"[0-9]{3})*$"),INT_NO_THOUSAND=new RegExp("^(-)?[0-9]+$");return(String(v).indexOf(thousand)&&INT_THOUSAND.test(v))||INT_NO_THOUSAND.test(v);},isNumeric:function isNumeric(v,noDG){var decimal=getDecimal(),thousand=getThousand(),NUMERIC_THOUSAND=new RegExp("^(-)?[0-9]{1,3}(\\"+thousand+"[0-9]{3})*(\\"+decimal+"[0-9]+)?$"),NUMERIC_NO_THOUSAND=new RegExp("^(-)?[0-9]*(\\"+decimal+")?[0-9]+$");return(String(v).indexOf(thousand)&&NUMERIC_THOUSAND.test(v))||NUMERIC_NO_THOUSAND.test(v);},parseInteger:function parseInteger(v,r){if(!this.isInt(v)){return Number.NaN;}return parseInt(String(v).replace(getThousand(),""),r);},parseNumeric:function parseNumeric(v){if(!this.isNumeric(v)){return Number.NaN;}return parseFloat(String(v).replace(getThousand(),"").replace(getDecimal(),"."));},inNumericRange:function inNumericRange(v,min,max){v=this.parseNumeric(v);max=(max!=null)?this.parseNumeric(String(max)):Number.NaN;min=(min!=null)?this.parseNumeric(String(min)):Number.NaN;if(max!=Number.NaN&&(v>max||isNaN(v))){return 1;}if(min!=Number.NaN&&(v<min||isNaN(v))){return -1;}return 0;},convertToUSUnits:function(value,unit,doNotLocalize){var __result=value;unit=unit||_unit;switch(parseInt(unit,10)){case UNIT.CM:__result=parseFloat(this.toString(value))/2.54+"";break;case UNIT.MM:__result=parseFloat(this.toString(value))/25.4+"";break;case UNIT.PT:__result=parseFloat(this.toString(value))/72+"";break;case UNIT.PC:__result=parseFloat(this.toString(value))/6+"";break;case UNIT.PX:__result=parseFloat(this.toString(value))/DPI_CONVERSION+"";break;}return doNotLocalize?__result:this.toLocaleString(__result);},convertToLocalUnits:function(value,unit,doNotLocalize){var __result;unit=unit||_unit;switch(parseInt(unit,10)){case UNIT.CM:__result=(parseFloat(this.toString(value))*2.54).toFixed(4)+"";break;case UNIT.MM:__result=(parseFloat(this.toString(value))*25.4).toFixed(4)+"";break;case UNIT.PT:__result=(parseFloat(this.toString(value))*72).toFixed(4)+"";break;case UNIT.PC:__result=(parseFloat(this.toString(value))*6).toFixed(4)+"";break;case UNIT.PX:__result=(parseFloat(this.toString(value))*DPI_CONVERSION)+"";break;default:__result=parseFloat(this.toString(value)).toFixed(4)+"";}return doNotLocalize?__result:this.toLocaleString(__result);},convertUnits:function(unitFrom,unitTo,value){return this.convertToLocalUnits(unitTo,this.convertToUSUnits(unitFrom,value,true),true);},toLocaleString:function(value){return(value+"").replace(".",getDecimal());},toString:function(value,removeThousandsSeparator){if(removeThousandsSeparator===true){var regex=this.getThousandSepRegex();if(regex){value=String(value).replace(regex,"");}}return String(value).replace(getDecimal(),".");},getThousandSepRegex:function(){if(this.thousandSeparatorRegex==null){this.thousandSeparatorRegex=new RegExp(getThousand().replace(/(\W){1}/g,"\\$1"),"g");}return this.thousandSeparatorRegex;},addSeparators:function(val,ts){var _ts=ts;if(ts=="."||ts=="*"||ts=="\\"){_ts="\\"+ts;}return val.reverse().replace(/(\d{3})/g,"$1"+ts).reverse().replace(new RegExp("^(-)?"+_ts),"$1");},format:function(category,decimalPlaces,curr,nm){var pattern="",ds=(decimalPlaces>0)?".":"",zeros=[];curr=(curr)?curr:"";for(var i=0;i<decimalPlaces;i++){zeros.push("0");}zeros=zeros.join("");switch(category){case CAT.PERCENT:pattern="0"+ds+zeros+"%";break;case CAT.SCIENTIFIC:pattern="0"+ds+zeros+"E+00";break;default:pattern='"'+curr+'"#,##0'+ds+zeros;}return this.formatByMask(pattern,nm);},formatByMask:function(formatMask,nm){var ptns=String(formatMask).split(";"),result="",pattern=ptns[0],ph="\u00A4";if(isNaN(nm)){return nm;}var ePos=pattern.indexOf("E+"),pPos=pattern.indexOf("%"),cs=pattern.match(/\".*\"/),fs=pattern.indexOf("?/?")>-1,cat=(ePos!=-1)?CAT.SCIENTIFIC:((pPos!=-1)?CAT.PERCENT:((cs)?CAT.CURR:fs?CAT.FRACTION:CAT.FIXED)),currMask="",negMask="",isNeg=false,sNm=new String(nm),nN=parseFloat(nm);if(cs){currMask=pattern.replace(/\".*\"/,cs[0].substring(1,cs[0].length-1)).replace(pattern.replace(cs[0],""),ph);}if(nN<0){sNm=sNm.substring(1,sNm.length);nN=-nN,isNeg=true;if(ptns.length>1){var _ptns1=ptns[1].replace(/\[.*\]/,"");negMask=_ptns1.replace(ptns[0],ph);}}var negativeFormat=function(sNm,negMask){return(negMask)?negMask.replace(ph,sNm):"-"+sNm;};if(cat==CAT.FRACTION){var i,j,minIndex,base=10,output,intPart=0,v,currentMin,temp,sepInt=false,stemp;if(formatMask.indexOf("# ")>-1){sepInt=true;}for(i=5;i>0;i--){stemp="/";for(j=0;j<i;j++){stemp+="?";}if(formatMask.indexOf(stemp)>-1){for(j=1;j<i;j++){base*=10;}break;}}if(sepInt){intPart=Number(Number(nN).toFixed(0));nN-=intPart;}currentMin=base/2;minIndex=-1;v=nN*base;for(i=base;i>=2;i--){temp=(v*i)/base;temp=temp-Math.floor(temp);temp=temp*base;if(Math.abs(temp-base)<temp){temp=Math.abs(temp-base);}temp=temp/i;if(temp<currentMin){currentMin=temp;minIndex=i;}else{if((temp==currentMin)&&(temp==0)){currentMin=temp;minIndex=i;}}}output=Math.round(minIndex*v/base);for(i=minIndex;i>=2;i--){if((output%i==0)&&(minIndex%i==0)){output=output/i;minIndex=minIndex/i;break;}}if(minIndex==base){minIndex=1;output=0;}if(output==0){minIndex=1;}if(output==minIndex){if(sepInt){result=""+(intPart+1);}else{result="1";}}else{if(sepInt&&intPart>0){result=intPart+" "+output+"/"+minIndex;}else{result=output+"/"+minIndex;}}}else{if(cat==CAT.SCIENTIFIC){var exp=Math.floor(Math.log(nN)/Math.LN10),m=nN/Math.pow(10,exp),beStr=pattern.substring(0,ePos),dPos=beStr.indexOf(".");result+=Number(m).toFixed((dPos!=-1)?beStr.length-dPos-1:0);result=((isNeg)?negativeFormat(result,negMask):result)+"E"+((exp>0)?"+":"")+exp;}else{if(cat==CAT.PERCENT){pattern=pattern.substring(0,pattern.length-1);sNm=String(nN*100);}var dPos=pattern.indexOf("."),dp=0;if(dPos!=-1){var dpS=pattern.substr(dPos+1,pattern.length).match(/\d+/);if(dpS&&dpS.length>0){dp=dpS[0].length;}}result=String(Number(parseFloat(sNm).toFixed(dp)));var nn=result.split(".");var tsPos=pattern.match(/#.+##/);if(tsPos!==null){nn[0]=this.addSeparators(nn[0],getThousand());}result=nn.join(getDecimal());if(cat==CAT.CURR){result=currMask.replace(ph,result);}if(cat==CAT.PERCENT){result+="%";}if(isNeg){result=negativeFormat(result,negMask);}}}return result;},generateUniqueID:function(keyLen){var chars="0123456789ABCDEF".split(""),id=[];for(var i=0;i<keyLen;i++){id[i]=chars[0|Math.random()*16];}return id.join("");},countOfDecimals:function(v,decimalSep){var sV=String(v);return sV.length-(sV.indexOf(decimalSep!==undefined?decimalSep:getDecimal())+1);}});})();