(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.date","mstrmojo.dom","mstrmojo.Calendar");var $P=mstrmojo.date,$D=mstrmojo.dom,_DT=function(){return mstrmojo.locales.datetime;},$A=mstrmojo.array;function getRangeIndexFromJson(d){return d.year+"_"+d.month+"_"+d.day;}function toggleBorderColor(evt,widget,show){var e=evt.e,t=$D.eventTarget(evt.hWin,e);if($D.contains(widget.dayView,t,false,widget.domNode)||$D.contains(widget.monthView,t,false,widget.domNode)||$D.contains(widget.yearView,t,false,widget.domNode)){t=t.tagName.toUpperCase()=="TD"?t:t.parentNode;if(t&&t.tagName.toUpperCase()=="TD"){t.style.borderColor=show?widget.rollColor:"transparent";}}}mstrmojo.VisCalendar=mstrmojo.declare(mstrmojo.Calendar,null,{scriptClass:"mstrmojo.VisCalendar",cssClass:"mstrmojo-visCalendar",availableDates:null,rollColor:"",monthNames:function(i){return _DT().MONTHNAME_FULL[i];},yearViewSize:4,isDateDisabled:function(day,month,year){var r=this._super(day,month,year),rng=this.availableDates;if(!r&&rng){r=!rng[year+"_"+month+"_"+day];}return r;},premouseover:function(evt){toggleBorderColor(evt,this,true);},premouseout:function(evt){toggleBorderColor(evt,this,false);},adjustYearStart:function(){if(!this.yearRangStart){this._super();}},updateSelectedDate:function updateSelectedDate(){var v=this.value,tv=this.timeVal,sds=this.selectedDates,r,update=function(me,r){me.set("browseYear",r.year);me.set("browseMonth",r.month);me.updateTimePart();me.updateView(me.currentView);};if(sds.length===0){r=(this.availableDates&&this.availableDates.length>0)?this.availableDates.max:$P.getDateJson(new Date());if(this.isDateDisabled(r.day,r.month,r.year,this.min,this.max)){if(this.min&&$P.compareDate(r,this.min)<0){r=parseDateAndTimeToJSON(this.min);}else{if(this.max&&$P.compareDate(r,this.max)>0){r=parseDateAndTimeToJSON(this.max);}}}update(this,r);}else{r=sds[0];$A.forEach(sds,function(d){if($P.compareDate(r,d)<=0){r=d;}});update(this,r);}},onselect:function(evt){var sd=this.selectedDates,rng=this.availableDates,cnt=this.container,dm=cnt.docModel,m=cnt.model,sc=cnt.dfm&&cnt.dfm.sc,eids=[];if(sc){$A.forEach(sd,function(d){var eid=rng[getRangeIndexFromJson(d)];if(eid){eids.push(eid);}});if(!eids.length){eids[0]="u;";}if(window.microstrategy&&window.microstrategy.findBone){var grid=microstrategy.findBone(cnt.domNode);if(grid&&grid.makeSelections){grid.makeSelections([{attId:cnt.dfm.id,values:eids}]);}}else{if(dm&&dm.slice){dm.slice({ck:sc.ck,eid:eids.join("\u001E"),src:m.k,tks:sc.tks,ctlKey:sc.ckey,include:true});}}}}});}());