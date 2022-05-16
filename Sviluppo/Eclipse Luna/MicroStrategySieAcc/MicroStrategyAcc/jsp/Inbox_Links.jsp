<%
 /****
  * Inbox_Links.jsp
  * This page includes the link definitions that should be added for the
  * history-list page to look properly
  *
  * Copyright 2004 MicroStrategy Incorporated. All rights reserved.
  * version: 1.2
  * xhtml: true
  ****/
%><%@ page errorPage="Error_Links.jsp"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ page import="com.microstrategy.web.app.beans.PageComponent"
%><%PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");%>
<%--
 Display the "links" section of the template as specified in pageConfig.xml (i.e. Admin_Links.jsp)
 <jsp:include page="[a page section]" />
--%>
<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("links")%>' flush="true" />


<web:ifFeature name="dhtml"><web:then>
<web:resource type="javascript" name="serializer.js"/>
<web:resource type="javascript" name="updateManager.js"/>
<web:resource type="javascript" name="mstrInbox.js"/>
<web:updateManager scope="com.microstrategy.web.app.beans.EnumExecutionScope.INBOX_SCOPE" bean="inbox" />

<!-- Base Mojo CSS file -->
<web:resource type="js-style" name="mojo/css/core.css"/>
<!-- Mojo Custom Group Editor CSS file -->
<web:resource type="js-style" name="mojo/css/cge.css"/>
</web:then></web:ifFeature>

<web:resource type="style" name="mstr/pageHistory.css"/>

<web:scriptlet> 
	var mstrApp = {
	    name: '<web:value type="config" name="servletDeploymentName"/>',
	    pageName: '<web:beanValue property="name"/>',
	    sessionId: '<web:connectionValue property="containerSessionId" />',
	    sessionState:'<web:connectionValue property="sessionState"/>',    
	    localeId: '<web:connectionValue property="locale"/>',
	    helpUrl: '<web:value type="systemPreference" name="helpUrl" />',
	    units: '<web:value type="misc" name="units"/>',
	    unitsLabel: '<web:value type="misc" name="unitsLabel"/>',
	    
	    objectsBlockCount: '<web:value type="preference" name="objectsBlockCount" />',
	    elementsBlockCount: '<web:value type="preference" name="elementsBlockCount" />',
	    useQuickSearch: function() {return microstrategy.useQuickSearch();},
	    searchAutoComplete: function(){return microstrategy.enableSearchAutoComplete;},
        searchAutoCompleteDelay: function(){return microstrategy.searchAutoCompleteDelay;},
     
	    jsRoot: '../javascript/',   <%-- TODO: Need to send down actual value --%>
	    jsMojoRoot: '../javascript/mojo/js/source/',
	    mstrDescs : <web:bundleDescriptor name="mojo-bootstrap,mojo-cge,mojo-metric,mojo-ive-picker"/>,    
	    onSessionExpired: window.mstrAppOnSessionExpired
	};
</web:scriptlet>