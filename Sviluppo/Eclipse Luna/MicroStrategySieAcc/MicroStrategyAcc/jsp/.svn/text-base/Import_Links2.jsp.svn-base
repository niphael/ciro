<%
 /****
  * version: 1.2
  * xhtml: true
  ****/
%><%@ page errorPage="Error_Links.jsp"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ page import="com.microstrategy.web.app.beans.PageComponent"
%><%PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");%>
<%
 /****
 * Display the "links" section of the template as specified in pageConfig.xml (i.e. Admin_Links.jsp)
 * <jsp:include page="[a page section]" />
  ****/
%>

<link rel="shortcut icon" href="../style/mstr/images/favicon.ico" type="image/x-icon" />

<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("links")%>' flush="true" />

<script type="text/javascript">

    //Set up the config object first.
    mstrConfig.mstrDescs = <web:bundleDescriptor name="mojo-bootstrap,mojo-di,mojo-qb,mojo-wh"/>;

    <web:ifFeature type="systemPreference" name="validateRandNum"><web:then>
    mstrConfig.validateRandNum = '<web:value type="httpSession" name="validateRandNum"/>';
    </web:then></web:ifFeature>

    //Set application object.
    var mstrApp = {
    		Privs : '<web:connectionValue property="privsXML"/>',
    		appPath: '<web:connectionValue property="applicationPath" />',
    		serverName: '<web:connectionValue property="serverName"/>',
        	projectName: '<web:connectionValue property="projectName"/>',
       	 	serverPort: '<web:connectionValue property="serverPort"/>',
    		cubeID: '<web:value type="requestKey" name="cubeID"/>',
    		cubeName: '<web:value type="requestKey" name="cubeName"/>',
            	folderID: '<web:value type="requestKey" name="folderId"/>',
            	isEdit: '<web:value type="requestKey" name="isEdit"/>', 
            	isNewAnalysis: '<web:value type="requestKey" name="isNewAnalysis"/>',
           	messageID: '<web:beanValue bean="wiz" property="messageID"/>',                
            	sfID: '<web:value type="systemPreference" name="sfClientID" />',
            	sfSecret: '<web:value type="systemPreference" name="sfClientSecret" />',
            	sfURL: '<web:value type="systemPreference" name="sfRedirectURL" />',
    		FlashResBundleURL : '<web:value name="resBundles/DashboardViewerBundle_" type="flashResURL"/>',    
    		name: '<web:value type="config" name="servletDeploymentName"/>',
    		pageName: '<web:beanValue property="name"/>',		
    		helpUrl: '<web:value type="systemPreference" name="helpUrl" />',	
    		userHelpPage: '<web:value type="systemPreference" name="userHelpPage" />',
    		helpTopic: 'import_data_page.htm',
    		//_JSP[    
    		<%-- no need to add jsession id for asp --%>
    		<web:ifFeature type="systemPreference" name="useCookies" value="1"><web:then><%-- add jsessionid only cookie is not disabled --%>
    		 sessionId: '<web:connectionValue property="containerSessionId" />',
    		</web:then></web:ifFeature>
    		 //_JSP]  
    		sessionState:'<web:connectionValue property="sessionState"/>',
    		servletState: '<web:connectionValue property="servletState"/>',
    		localeId: '<web:connectionValue property="locale"/>',
    		displayLocaleId: '<web:connectionValue property="displayLocaleID"/>',
    		thousandsSep: '<web:value type="misc" name="thousandSeparator"/>',
    		decimalSep: '<web:value type="misc" name="decimalSeparator"/>',
    		listSep: '<web:value type="misc" name="listSeparator"/>',
    		taskURL: '<web:taskProcessorName />',
    		jsRoot: '../javascript/',   <%-- TODO: Need to send down actual value --%>
    		jsMojoRoot: '../javascript/mojo/js/source/',
    		mstrDescs : <web:bundleDescriptor name="mojo-bootstrap,mojo-di"/>,
    		persistTaskParams: <web:value type="persistParameters" name=""/>,
    		getPersistParams: function () {return this.persistTaskParams;},
    		<web:ifFeature name="web-import-database"><web:then>
    			allowImportDB: 1,
    		</web:then></web:ifFeature>
    		diParams: <web:displayBean beanName="wiz" />,
    		<%--
    		<web:ifBeanValue name="wiz" property="getXMLStatus" value="4"> <!-- WebBeanRequestEndsInError -->
    	        <web:then>
    	            error: <web:displayBean beanName="wiz" />,  
    	        </web:then>
    	        <web:else>
    	            diParams: <web:displayBean beanName="wiz" />,
    	        </web:else>
    	    </web:ifBeanValue>
    	    --%>
    		isOIVM: function() {return true;}
	};
	
</script>


<web:resource type="js-style" name="mojo/css/core.css"/>
<web:resource type="js-style" name="mojo/css/architect.css"/>
<web:resource type="javascript" name="updateManager.js"/>
<web:resource type="javascript" name="serializer.js"/>
<web:resource type="jsbundle" bundleName="mojo-bootstrap" />
<web:resource type="jsbundle" bundleName="mojo-di" />

<web:updateManager scope="com.microstrategy.web.app.beans.EnumExecutionScope.IMPORT_SCOPE"/>
