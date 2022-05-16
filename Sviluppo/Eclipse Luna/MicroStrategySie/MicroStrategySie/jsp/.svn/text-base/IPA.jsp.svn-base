<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=100" > <!-- IE9 mode -->
<%@ page errorPage="JSP_Error.jsp"%><%@ page
	contentType="text/html; charset=UTF-8"%><%@ page
	import="com.microstrategy.web.app.utils.JavaScriptBundles"%><%@ taglib
	uri="/webUtilTL.tld" prefix="web"%>
<%@ page import="com.microstrategy.web.app.beans.PageComponent"%><%@ taglib
	uri="/webUtilTL.tld" prefix="web"%>
<%PageComponent mstrPage = (PageComponent) request.getAttribute("mstrPage");
%>

<%-- Start up the Web Statistics... --%>
<web:performanceTimer action="initialize" />
<web:performanceTimer action="start" />
<!--  favicon -->
<html>
<head>
 <meta http-equiv="X-UA-Compatible" content="IE=9" >
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="shortcut icon" href="../style/mstr/images/favicon.ico"
	type="image/x-icon" />
<web:resource type="style" name="mstr/mstr.css" />
<web:resource type="style" name="mstr/mstrTheme.css" />


<web:resource type="custom-style" />

<!-- Base Mojo CSS file -->
<link rel="stylesheet" type="text/css" href="../javascript/mojo/css/core.css" />

<link rel="stylesheet" type="text/css" href="../javascript/mojo/css/IPA/IPA-jsp.css" />
<link rel="stylesheet" type="text/css" href="../javascript/mojo/css/IPA.css" />
<link rel="stylesheet" type="text/css" href="../javascript/mojo/css/IPACharts.css" />
<link rel="stylesheet" type="text/css" href="../javascript/mojo/css/mstrCloudOM.css" />
<link rel="stylesheet" type="text/css" href="../javascript/mojo/css/emCloudOM.css" />

<title>Cloud OM Environments</title>

</head>
<body style="width:960px; margin:0 auto;overflow-x:auto"
	class="mstrWeb <web:ifConnectionValue><web:then>
	<web:value type='preference' name='colorTheme' />
	</web:then><web:else><web:value type='browserSetting' name='colorTheme' />
	</web:else></web:ifConnectionValue> 
	<web:ifFeature name='page-full-screen-mode'>
	<web:then> mstrFullScreen</web:then>
	</web:ifFeature><web:ifFeature name='dhtml'>
	<web:else> mstrHTML</web:else></web:ifFeature>
    <web:ifFeature name='doubleByte'><web:then> mstrDB</web:then></web:ifFeature>">
	
	<table width="100%" cellspacing="0" cellpadding="0"	class="mstrToolbarWrapper">
	<tr>
		<td>
		<div class="mstrHeader" id="mstrWeb_shortcutsBar" style="z-index:1"
			name="mstrWeb_shortcutsBar" iframe="true"><%--
		 Display the "shortcutsBar" section of the template as specified in pageConfig.xml (i.e. About_ShortcutsBar.jsp)
		 <jsp:include page="[a page section]" />
		--%> <jsp:include
			page='<%=mstrPage.getTemplateInfo().getSection("header")%>'
			flush="true" /></div>
		<div class="mstrPath" id="mstrWeb_path" name="mstrWeb_path"
			iframe="true">
		<%--
	 	Display the "path" section of the template as specified in pageConfig.xml (i.e. Change_Password_Path.jsp)
	 	<jsp:include page="[a page section]" />
		--%> 
		<jsp:include page='<%=mstrPage.getTemplateInfo().getSection("path")%>' flush="true" /></div>			
			
		<web:ifFeature name="IE6">
			<web:then>
				<web:descriptor key="mstrWeb.7912" />
			</web:then>
			<web:else>
				<div id="IPALandingPage" class="IPALandingPage">
					<div id="IPALandingPageView"></div>
					<div class="mstrmojo-transparentBox" id="transparentBox"></div>
				</div>
				<style>
					.IPALandingPage {overflow: hidden;top: 44px;position: absolute;bottom: 40px;overflow-y: visible;margin: 0 auto;width: 960px;}
				</style>
			</web:else>
		</web:ifFeature>
		<jsp:include page='<%=mstrPage.getTemplateInfo().getSection("footer")%>' flush="true" />

		</td>
	</tr>
	</table>
	

<script type="text/javascript">	
    mstrConfig = {
        taskURL: '<web:taskProcessorName/>',
        admintaskURL: '<web:taskProcessorName type="admin"/>'//'taskAdmin'
    };
	
    var mstrApp = {
        name: '<web:value type="config" name="servletDeploymentName"/>',
        jsRoot: '../javascript/',
        jsMojoRoot: '../javascript/mojo/js/source/',
        localeId: '<web:connectionValue property="locale"/>',
        helpUrl: '<web:value type="systemPreference" name="helpUrl" />',
        displayLocaleId: '<web:connectionValue property="displayLocaleID"/>'  ,    
        showManagerLink: '<web:value type="config" name="showManagerLink"/>', 
        <%-- Comment the following line to fix TQMS 773376, we will add it back after 940
        privileges: <web:IPAValue type="privileges"/>,
        --%> 
    };

 </script>
 
<script src="../javascript/mojo/js/source/mstrmojo.js"></script>
<script src="../javascript/mojo/js/source/Xhr.js"></script>
<script src="../javascript/mojo/js/source/EditableLabel.js"></script>
<script src="../javascript/mojo/js/source/IPA/IPACounterLabel.js"></script>
<script src="../javascript/mojo/js/source/IPA/IPACounterAggLabel.js"></script>
<script src="../javascript/mojo/js/source/IPA/IPACounterAggDivLabel.js"></script>
<script src="../javascript/mojo/js/source/IPA/IPACounterController.js"></script>
<script src="../javascript/mojo/js/source/VisChartLine.js"></script>
<script src="../javascript/mojo/js/source/VisChart.js"></script>
<script src="../javascript/mojo/js/source/VisChartData.js"></script>
<script src="../javascript/mojo/js/source/CollapsiblePanel.js"></script>
<script src="../javascript/mojo/js/source/TabContainer.js"></script>
<script src="../javascript/mojo/js/source/TabStrip.js"></script>
<script src="../javascript/mojo/js/source/IPA/IPAChartCounter.js"></script>
<script src="../javascript/mojo/js/source/IPA/IPAChartLine.js"></script>
<script src="../javascript/mojo/js/source/IPA/AlertController.js"></script>
<script src="../javascript/mojo/js/source/IPA/AlertModel.js"></script>
<script src="../javascript/mojo/js/source/IPA/AlertView.js"></script>
<script src="../javascript/mojo/js/source/IPA/EnvironmentBox.js"></script>
<script src="../javascript/mojo/js/source/IPA/WarningDialog.js"></script>


<script>

	function _getParameter( name )
	{		
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
	    return "";
	  else
	    return results[1];
	}

 	mstrmojo.requiresCls("mstrmojo.Model","mstrmojo.Obj","mstrmojo.TabContainer","mstrmojo.Table", 
			"mstrmojo.Box", "mstrmojo.HBox", "mstrmojo.Label", "mstrmojo.Button", 
			"mstrmojo.HBox", "mstrmojo.IPA.IPACounterController", "mstrmojo.IPA.EMStatusController",
			"mstrmojo.CollapsiblePanel", "mstrmojo.IPA.IPAView","mstrmojo.WidgetList",
			 "mstrmojo.IPA.EnvironmentList",
			"mstrmojo.IPA.AlertModel", "mstrmojo.IPA.AlertController", "mstrmojo.IPA.IPAView",
			"mstrmojo.IPA.EnvironmentController","mstrmojo.IPA.EnvironmentModel","mstrmojo.IPA.LoginPopup",
			"mstrmojo.IPA.TopNavigation","mstrmojo.IPA.MainNavigation",
			"mstrmojo.IPA.EMServerStatusModel", "mstrmojo.IPA.EMServerStatusView", "mstrmojo.Editor");

 
 	var CONFIGPAGE_URL=mstrmojo.insert({	  	
	  	scriptClass:"mstrmojo.Label",
	  	id:'cfgurl',	  	
  		text: 'href="mstrIPAAdmin"'
	 });
 
	var WAITINGBOX = new mstrmojo.Editor({
        cssClass: "mstrmojo-ProgressBox",
        draggable: false,
        showTitle: false,
        children: [{
            scriptClass: "mstrmojo.Box",
            cssClass: "mstrmojo-ProgressBox-Wait"
        }, {
            scriptClass: "mstrmojo.Label",
            cssClass: "mstrmojo-ProgressBox-Message",
            alias:"message",
            text: 'Please wait...'
        }],
        openMessage:function(msg){
        	if(this.message){
        		this.message.set('text',msg);
        	}
        	
        	this.open();
        }
    });
 
 	var local = {};

	var countercontroller = {};
	
	document.getElementById('IPALandingPage').style.height = window.innerHeight-88 + "px";

 	countercontroller  = new mstrmojo.IPA.IPACounterController({
 		id: "countercontroller",
 		refreshRate: 5000
 	});
 
 	var controller = mstrmojo.insert({
  		id: "alertController",
  		scriptClass: "mstrmojo.IPA.AlertController",
 	});

 	controller.model = mstrmojo.insert({
   		id: "alertModel",
   		scriptClass: "mstrmojo.IPA.AlertModel"
 	});
 	
 	emStatusController  = new mstrmojo.IPA.EMStatusController({
 		id: "emStatusController"
 	});
 	 
	mstrmojo.insert({
		scriptClass: "mstrmojo.Box",
		id: "IPAOverlayBox",
		cssClass: "mstrmojo-overlayBox",
	        placeholder: "transparentBox",
	        children: [
		   {
		       scriptClass: "mstrmojo.Label",
		       cssClass: "mstrmojo-OverlayLoading",
		       text: ""
		   }],         
	        visible: false
	}).render();

	//environment container
	 mstrmojo.insert({
	   	id: "environmentlist",
	   	scriptClass: "mstrmojo.IPA.EnvironmentList", 
	   	isTrimmed:0,
	   	cssClass:"ipa-EnviList-landingPage",  	 
	});

 	local.view = new mstrmojo.IPA.IPAView({
 		placeholder: 'IPALandingPageView',
 		id: "IPALandingPageView",
 		children: [
 	          mstrmojo.all.loginPopup,
 	          mstrmojo.all.environmentlist
 		]
 	});
 	local.view.render();
	debugger;
 	var alertCallback = {
			success : function(res){
				debugger;
				if (res.status == "CONNECTED") {
 					//Now add the actual data.
 					//refresh the alert table periodically
 					var alertRefreshRate = 30000;
 					setInterval("mstrmojo.all.alertController.refreshAlertsCount()", alertRefreshRate); 
 					/*
 					Get Alert Count
 					*/
 					mstrmojo.all.alertController.getAlertsCount();
 	 				}
			},
			failure : function(res){
					// do nothing
					debugger;
				},
 		 	};
	

	mstrmojo.xhr.request('POST', mstrConfig.admintaskURL,
			alertCallback, {
				taskId : 'getMHAStatusTask'
			});

	var environmentController = mstrmojo.insert({
		id: "environmentController",
		scriptClass: "mstrmojo.IPA.EnvironmentController"
 	});

	environmentController.model = mstrmojo.insert({
		id: "environmentModel",
		scriptClass: "mstrmojo.IPA.EnvironmentModel"
 	});
 

	var emController = mstrmojo.insert({
		id : "emController",
		scriptClass : "mstrmojo.IPA.EnterpriseMgrController"
	});

	emController.model = mstrmojo.insert({
		id : "emModel",
		scriptClass : "mstrmojo.IPA.EnterpriseMgrModel",
	});

	mstrmojo.all.IPAOverlayBox.set("visible", true);

	
	environmentController.getEnvironmentListForLandingPage(
					null,
					function(res) {
						if (!mstrmojo.all.environmentModel.model.environments
								|| mstrmojo.all.environmentModel.model.environments.length == 0) {
							window.location = mstrmojo.all.cfgurl.text.split('=')[1].split('"')[1];
							return;
						}
						mstrmojo.all.IPAOverlayBox.set("visible", false);
						
						/* Set EM Servers */
						mstrmojo.all.emModel.set('model', res.elementList);
						
						mstrmojo.all.CloudOMMainNavigationLinks
								.navigateWithURLParams();

	local = null;

},function(res){window.location = mstrmojo.all.cfgurl.text.split('=')[1].split('"')[1];});
	
	
 </script>

</body>

</html>