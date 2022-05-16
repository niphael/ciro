(function(){mstrmojo.requiresCls("mstrmojo.Table","mstrmojo.Label","mstrmojo.Box","mstrmojo.List");mstrmojo.requiresDescs(9924);var _D=mstrmojo.dom,_C=mstrmojo.css,$DESC=mstrmojo.desc;var _GEOROLE={NONE:0,CITY:1,STATE:2,COUNTRY:3,LOCATION:4,LATITUDE:5,LONGTITUDE:6,OTHER:7,ZIPCODE:8,COUNTY:9};var _data=[{n:mstrmojo.desc(2057,"None"),did:_GEOROLE.NONE,geo:true},{n:mstrmojo.desc(7674,"Country"),did:_GEOROLE.COUNTRY,geo:true},{n:mstrmojo.desc(7676,"State"),did:_GEOROLE.STATE,geo:true,items:[{n:mstrmojo.desc(7674,"Country"),did:268435456}]},{n:"County",did:_GEOROLE.COUNTY,geo:true,items:[{n:mstrmojo.desc(7674,"Country"),did:268435456},{n:mstrmojo.desc(7676,"State"),did:536870912}]},{n:mstrmojo.desc(7675,"City"),did:_GEOROLE.CITY,geo:true,items:[{n:mstrmojo.desc(7674,"Country"),did:268435456},{n:mstrmojo.desc(7676,"State"),did:536870912}]},{n:mstrmojo.desc(7677,"Zip Code"),did:_GEOROLE.ZIPCODE,geo:true,items:[{n:mstrmojo.desc(7674,"Country"),did:268435456},{n:mstrmojo.desc(7676,"State"),did:536870912},{n:mstrmojo.desc(7675,"City"),did:1073741824}]},{n:mstrmojo.desc(7696,"Latitude"),did:_GEOROLE.LATITUDE,geo:true},{n:mstrmojo.desc(7697,"Longtitude"),did:_GEOROLE.LONGTITUDE,geo:true},{n:"City, State",did:_GEOROLE.LOCATION,geo:true},{n:mstrmojo.desc(9923,"Others..."),did:_GEOROLE.OTHER,geo:true}];if(mstrApp.isCloudPro){_data.splice(-1);}mstrmojo.qb.GeoRole=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.qb.GeoRole",markupString:'<div id="{@id}"  class="{@cssClass}" style="top:{@top};left:{@left};width:155px;height:{@height};"><div style="z-index:{@zIndex};{@cssText}" mstrAttach:mousedown,click><div class="mstrmojo-qb-mapping-title">{@title}</div><div class="mstrmojo-qb-mapping-georole"></div><div class="mstrmojo-qb-mapping-buttons"></div></div></div>',markupSlots:{contentNode:function(){return this.domNode.firstChild.childNodes[1];},titleNode:function(){return this.domNode.firstChild.childNodes[0];},buttonNode:function(){return this.domNode.firstChild.childNodes[2];}},top:"0px",left:"0px",height:"320px",title:"Please select a geography role for this attribute and any additional attributes that you want to create.",georole:0,shapeKeys:[],der:0,_close:function(){var p=this.parent;if(p&&p._cmSource){p._cmSource.closeMenuTree();}},onOK:function(){var p=this.parent,cms=p._cmSource;if(cms.executeCommand){this.data.geo=true;if(this.geolist.selectedItem.geo){var geo=this.geolist.selectedItem.did;this.data.georole=geo;var der={2:268435456,1:805306368,9:805306368,8:1879048192}[geo]||0;this.data.der=this.der=this.der&der;}else{this.data.georole=7;this.data.shapeKey=this.geolist.selectedItem.did;}cms.executeCommand(this.data);}this._close();},onCancel:function(){this._close();},children:[{scriptClass:"mstrmojo.List",slot:"contentNode",alias:"geolist",cssClass:"mstrmojo-qb-geolist",itemIdField:"did",cssClassItem:"",onclick:function(evt){var tgt=_D.eventTarget(evt.hWin,evt.e).parentNode;if(tgt.className.indexOf("mstrmojo-qb-georole-attribute")>-1){var der=parseInt(tgt.getAttribute("did"),10);var els=[],p=this.domNode.children[0].children;switch(der){case 268435456:els.push(p[5].children[0].children[1].children[0].children[1]);els.push(p[4].children[0].children[1].children[0].children[1]);els.push(p[3].children[0].children[1].children[0].children[1]);els.push(p[2].children[0].children[1].children[0].children[1]);break;case 536870912:els.push(p[5].children[0].children[1].children[0].children[2]);els.push(p[4].children[0].children[1].children[0].children[2]);els.push(p[3].children[0].children[1].children[0].children[2]);break;case 1073741824:els.push(tgt);break;default:break;}if(this.parent.der&der){for(var i=0,len=els.length;i<len;i++){_C.removeClass(els[i],"selected");}}else{for(var i=0,len=els.length;i<len;i++){_C.addClass(els[i],"selected");}}this.parent.der=this.parent.der^der;}},adjustMenu:function(){var p=this.parent.parent;if(p){p=p.parent.parent;if(p&&p.adjustMenuPosition){p.adjustMenuPosition();}}},expandShapeKeyNode:function(){_C.addClass(this.domNode,"showShapeKey");this.adjustMenu();},onmouseup:function(e){switch(this.selectedItem.did){case _GEOROLE.OTHER:this.expandShapeKeyNode();this.set("selectedItem",{did:this.parent.shapeKey});break;}},onchange:function(e){var added=e.added;if(added){switch(this.selectedItem.did){case _GEOROLE.COUNTY:case _GEOROLE.CITY:case _GEOROLE.STATE:case _GEOROLE.ZIPCODE:this.adjustMenu();break;case _GEOROLE.OTHER:var prev=e.removed;if(prev&&prev.length){this.set("selectedIndex",prev[0]);this.expandShapeKeyNode();}break;}}},bindings:{items:function(){return(this.parent.shapeKeys)?_data.concat(this.parent.shapeKeys):_data;}},itemMarkupFunction:function(item,index,widget){var cont=[],p=widget.parent;if(item.items){var its=item.items,act="onclick=\"mstrmojo.dom.captureDomEvent('"+widget.id+"','click', self, event)\"";cont.push('<div class="mstrmojo-qb-georole-attribute-box"><span>');cont.push($DESC(9924,"Create attributes for:"));cont.push("</span>");for(var i=0,len=its.length;i<len;i++){cont.push('<div class="mstrmojo-qb-georole-attribute '+((p.der&its[i].did)?"selected":"")+'" did="'+its[i].did+'"'+act+'><img class="mstrmojo-qb-georole-checkbox" src="../images/1ptrans.gif"><span style="padding-left:5px;">');cont.push(its[i].n);cont.push("</span></div>");}cont.push("</div>");}return'<div class="mstrmojo-qb-georole '+((item.did==_GEOROLE.OTHER)?"other":"")+(item.geo?"":"shapeKey ")+widget.cssClassItem+'" idx="'+index+'" did="'+item.did+'"><div class="mstrmojo-qb-georole-itemtext"><img class="mstrmojo-qb-georole-img" src="../images/1ptrans.gif"><span class="mstrmojo-qb-georole-text">'+item.n+'</span></div><div class="mstrmojo-qb-georole-itemcontent">'+cont.join("")+"</div></div>";},onRender:function(){this.set("selectedItem",{did:this.parent.georole});}},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBox cf",slot:"buttonNode",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-qb-georole-button",text:mstrmojo.desc(1442,"OK"),onclick:function(evt){var e=this.parent.parent;if(e.onOK){e.onOK();}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-qb-georole-button",text:mstrmojo.desc(221,"Cancel"),onclick:function(evt){var e=this.parent.parent;if(e.onCancel){e.onCancel();}}}]}]});})();