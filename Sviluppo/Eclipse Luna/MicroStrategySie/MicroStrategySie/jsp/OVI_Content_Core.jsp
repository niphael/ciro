<%@ taglib uri="/webUtilTL.tld" prefix="web" %>
<%@ page import="com.microstrategy.web.app.beans.PageComponent" %>

<span id="pagePlaceholder"></span>

<style type="text/css">
#dhtml_statistics {
    position: absolute;
    bottom: 21px;
    right: 21px;
    background-color: #EFEFEF;
    border: 1px solid #000;
    z-index: 1000;
    padding: 6px;
}
</style>
<script type="text/javascript"> 
    //Set application config.
    mstrConfig = {
        thousandsSep: '<web:value type="misc" name="thousandSeparator"/>',
        decimalSep: '<web:value type="misc" name="decimalSeparator"/>',
        listSep: '<web:value type="misc" name="listSeparator"/>',
        taskURL: '<web:taskProcessorName />',
        <web:ifFeature type="systemPreference" name="validateRandNum"><web:then>
 			validateRandNum: '<web:value type="httpSession" name="validateRandNum"/>',
 		</web:then></web:ifFeature>
        onMobileDevice: false,
        mstrDescs: <web:bundleDescriptor name="mojo-ovi"/>
    };
</script>

<web:resource type="jsbundle" bundleName="mojo-ovi"  />

<script type="text/javascript">
	//Set application globals.
    mstrApp = new mstrmojo.OVIApp({
    	placeholder: 'pagePlaceholder',
		Privs : '<web:connectionValue property="privsXML"/>',
		FlashResBundleURL : '<web:value name="resBundles/DashboardViewerBundle_" type="flashResURL"/>',    
		name: '<web:value type="config" name="servletDeploymentName"/>',
		pageName: '<web:beanValue property="name"/>',
		serverName: '<web:connectionValue property="serverName"/>',
    	projectName: '<web:connectionValue property="projectName"/>',
   	 	serverPort: '<web:connectionValue property="serverPort"/>',
   	 	pendingMojoEditor: '<web:value type="requestKey" name="oe"/>',
   	 	features: {<web:value type="features" name="web-use-sharing-editor"/>},
		//_JSP[    
		<%-- no need to add jsession id for asp --%>
		<web:ifFeature type="systemPreference" name="useCookies" value="1"><web:then><%-- add jsessionid only cookie is not disabled --%>
		 sessionId: '<web:connectionValue property="containerSessionId" />',
		</web:then></web:ifFeature>
		 //_JSP]
		sessionState:'<web:connectionValue property="sessionState"/>',
		servletState: '<web:connectionValue property="servletState"/>',
		localeId: '<web:connectionValue property="locale"/>',
		helpUrl: '<web:value type="systemPreference" name="helpUrl" />',
		displayLocaleId: '<web:connectionValue property="displayLocaleID"/>',
		jsRoot: '../javascript/',   <%-- TODO: Need to send down actual value --%>
		jsMojoRoot: '../javascript/mojo/js/source/',
		//viewFactory: new mstrmojo.OIVMViewFactory(),
		persistTaskParams: <web:value type="persistParameters" name=""/>,
		getPersistParams: function () {return this.persistTaskParams;},
		prevViewMedia: <web:beanValue property="previousViewMedia" encode="true"/>,
	    <web:ifBeanValue name="rwb" property="getXMLStatus" value="4"> 
		    <web:then>
		    <!-- WebBeanRequestEndsInError -->
		        error: <web:displayBean beanName="rwb" />,  
		    </web:then>
		    <web:else>
			    <web:ifFeature type="requestKey" name="hiddensections" value="contains:dockTop"><web:then>
			        tbModelData: '',
			        hasHiddenSections: true,
		        </web:then><web:else>
		            tbModelData: <web:displayBean beanName="ribbonBean" />,
		        </web:else></web:ifFeature>
		        docModelData: <web:displayBean beanName="rwb" styleName="MojoOVIStyle" />,
		    </web:else>
	    </web:ifBeanValue>
		<web:ifFeature name="guest-mode-enabled" >
			<web:then>
			    guestModeEnabled: true,
			</web:then>
			<web:else>
			    guestModeEnabled: false,
			</web:else>
		</web:ifFeature>		
		isOIVM: function() {return false;}
		
	});
	mstrmojo.App = mstrApp;
	mstrApp.start();
</script>

