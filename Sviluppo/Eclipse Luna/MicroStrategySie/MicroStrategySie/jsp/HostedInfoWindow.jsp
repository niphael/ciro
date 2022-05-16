<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<%@ page errorPage="JSP_Error.jsp"%>


<html> 
    <head> 
        <meta name="viewport" id="viewportTag" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no">
        
        <!--Hide the Safari UI components-->
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <web:resource type="style" name="../javascript/mojo/css/core.css" />
        <web:resource type="style" name="../javascript/mojo/css/android.css" />
        
        <title>MicroStrategy 9 Android Info Window</title>         
    </head> 
    <body style='background-color: #CCCCCC;'> 
        <div id="mainInfoWindow"></div>   
        <div style="display:none;" id="error_msg"></div>
        
        <script type="text/javascript"> 
            //Set application config.
            mstrConfig = {
                taskURL: '../servlet/taskProc',
                simpleDialog: true,
                thousandsSep: ',',
                decimalSep: '.',
                listSep: ',',
                getURLParam: function gup(n){
					n = n.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
					var rxs = "[\\?&amp;]"+n+"=([^&amp;#]*)",
					    rx = new RegExp(rxs),
					    r = rx.exec(window.location.href);
					return r == null ? "" : r[1];
				}
            };
    
                        
                
            if ( typeof window.mapDataObj === "undefined" ) {
                            
            
                // @@@@@ DEBUG get reference to map widget that we belong to
                var   mapId = mstrConfig.getURLParam("id");
                mstrConfig.map = window.parent.mstrmojo.all[mapId];            

                window.mapDataObj = {
                    jsonData: null,
                    setJsonData: function(data) { 
                        this.jsonData = data;
                    },
                    getDocData: function() {
                        return JSON.stringify(this.jsonData.docData);
                    },
                    getConfiguration: function() {
                        return JSON.stringify(this.jsonData.cfg);
                    },    
                    getGridData: function() {
                        return JSON.stringify(this.jsonData.gridData);
                    },
                    getProjectId: function() {
                        return this.jsonData.pid;
                    },
                    getSessions: function() {
                        return this.jsonData.sessions;
                    },
                    
                                                        
                    getAttributeName: function(rowIndex) {
                        var row = this.jsonData.gridData.gts.row[0];
                        if ( rowIndex <= 0 ) rowIndex = 1;
                        return row.es[rowIndex].n;
                    },
                    getMetrics: function() {
                        return this.jsonData.gridData.gvs.items;
                    },
                    getMetricValues: function( rowIndex ) {
                        var metrics = this.getMetrics(),
                            row = metrics[rowIndex];
                        return JSON.stringify(row.items);
                    },
                    getTitles: function() {
                        if ( typeof this.titles === "undefined" ) {
                            this.titles = this.jsonData.gridData.gts;
                        }
                        return this.titles;
                    },
                    getColHeaders: function() {
                        if ( typeof this.colHeaders === "undefined" ) {
                          this.colHeaders = this.getTitles().col[0].es;
                        }
                        return this.colHeaders;
                    },
                    getMetricName: function(rowIndex) {
                        var colHeaders = this.getColHeaders();
                        return this.colHeaders[rowIndex].n;
                    },
                    useThresholds: function() {
                        return false;
                    }
                };
                
                window.mapDataObj.setJsonData( mstrConfig.map.getMapModel() );                
            }    

        </script> 
        
        <%-- Include the Mojo JavaScript bundle! --%>
        <script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script> 
        
        <web:resource type="jsbundle" bundleName="mojo-coreui" debugBundleName="mojo-coreui-debug" />
        <web:resource type="jsbundle" bundleName="mojo-mobile" debugBundleName="mojo-mobile-debug" />
        <web:resource type="jsbundle" bundleName="mojo-maps-info-hosted" />
        <script type="text/javascript">
        
        mstrmojo.dbg("URL: " + window.location.href);
        
            try {
    		        mstrApp = new mstrmojo.maps.InfoWindowApp({
                        id: 'infoWindow',
                        placeholder: 'mainInfoWindow',
                        rowIndex : mstrConfig.getURLParam('rix'),
                        isDoc: (mstrConfig.getURLParam('isDoc') === "true"),   
                        isInfoWindow: true,       
                        _currentProjId: mapDataObj.getProjectId(),          
    	                deviceType: 3,
    	                name: 'mstrWeb',
    	                pageName: 'androidApp',
    	                localeId: '1033',
    	                displayLocaleId: '1033',
    	                jsRoot: '../javascript/',   
    	                jsMojoRoot: '../javascript/mojo/js/source/',
    	                viewFactory: mstrmojo.android.AndroidViewFactory,
                        serverProxy: new mstrmojo.MobileServerProxy({
                            transport: mstrmojo.XHRServerTransport,
                            _sessions: mapDataObj.getSessions()
                        })
		        });
                
		        mstrApp.start();

            } catch(e) {
				var msg = "Application failed to start due to an irrecoverable error: "+e.message; 
				if (window.console) {
				    window.console.log(msg);
				}
				var em = document.getElementById("error_msg");
				em.innerHTML = msg;
			    em.style.display = "block";
            }
        </script> 
    </body> 
</html>