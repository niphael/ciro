<%
    /*
     * Search_Links.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */
%>

<%@ page errorPage="Error_Links.jsp"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.microstrategy.web.app.beans.PageComponent"%>

<%PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");%>

<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("links")%>' flush="true" />

<!-- Base Mojo CSS file -->
<web:resource type="js-style" name="mojo/css/core.css" />
<!-- Mojo Custom Group Editor CSS file -->
<web:resource type="js-style" name="mojo/css/cge.css" />

<web:resource type="style" name="mstr/pageSearch.css"/>

<%-- Render the JavaScript functions if necessary --%>
<web:ifFeature name="dhtml">
    <web:then>
        <web:resource type="javascript" name="Calendar.js"/>

        <%-- Search Suggestion support --%>
        <web:clientSideDescriptor IDs = "134,221,2107,3829,3833" />
        <web:resource type="javascript" name="Menu.js"/>
        <web:resource type="javascript" name="contextMenu.js"/>
        <web:resource type="javascript" name="contextMenuManager.js"/>
		<web:resource type="javascript" name="serializer.js"/>
		<web:resource type="javascript" name="ObjectManipulation.js"/>
		<web:resource type="javascript" name="updateManager.js"/>
		<web:resource type="javascript" name="mstrInlineRename.js"/>
		<web:resource type="javascript" name="mstrFolder.js"/>
		<web:resource type="javascript" name="mstrFolderActions.js"/>
		<web:resource type="javascript" name="mstrMsgBoxExportLink.js"/>

        <web:resource type="javascript" name="mstrSearchTabsImpl.js"/>
		<web:resource type="javascript" name="mstrFolderSearch.js"/>


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
    serverName: '<web:connectionValue property="serverName"/>',
    projectName: '<web:connectionValue property="projectName"/>',
    serverPort: '<web:connectionValue property="serverPort"/>',

    objectsBlockCount: '<web:value type="preference" name="objectsBlockCount" />',
    elementsBlockCount: '<web:value type="preference" name="elementsBlockCount" />',
    useQuickSearch: function() {return microstrategy.useQuickSearch();},
    searchAutoComplete: function(){return microstrategy.enableSearchAutoComplete;},
    searchAutoCompleteDelay: function(){return microstrategy.searchAutoCompleteDelay;},

    jsRoot: '../javascript/',   <%-- TODO: Need to send down actual value --%>
    jsMojoRoot: '../javascript/mojo/js/source/',
    mstrDescs : <web:bundleDescriptor name="mojo-bootstrap,mojo-cge,mojo-metric"/>,
    onSessionExpired: window.mstrAppOnSessionExpired
};
</web:scriptlet>

<web:updateManager scope="com.microstrategy.web.app.beans.EnumExecutionScope.REPORT_SCOPE" bean="OMD" />
<web:updateManager scope="com.microstrategy.web.app.beans.EnumExecutionScope.FOLDER_BROWSER_SCOPE" bean="OMD" />

    </web:then>
</web:ifFeature>

