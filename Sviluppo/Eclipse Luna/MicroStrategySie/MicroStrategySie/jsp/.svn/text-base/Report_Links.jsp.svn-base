<%
 /****
  * Report_Links.jsp
  * This file is used to include css and js files in the documents' page.
  *
  * Copyright 2004 MicroStrategy Incorporated. All rights reserved.
  * version: 1.2
  * xhtml: true
  ****/
%><%@ page errorPage="Error_Links.jsp"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ page import="com.microstrategy.web.app.beans.PageComponent"
%><%PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");
%><jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("links")%>' flush="true" />

<link rel="stylesheet" type="text/css" href="../javascript/mojo/css/core.css" />
<%-- Is the Report Prompted? (xmlStatus is waiting for user's input [6]) --%>
<web:ifBeanValue bean="frame.rb" property="getXMLStatus" value="6">
    <web:then>
        <%-- DHTML Mode? --%>
        <web:ifFeature name="dhtml">
            <web:then>
   <%-- Prompt page dhtml mode needs this javascript --%>
   <web:resource type="javascript" name="Calendar.js"/>
   <web:resource type="javascript" name="updateManager.js"/>
   <web:resource type="javascript" name="PromptFunctions.js"/>
   <jsp:include page='/jsp/Prompt_Links.jsp' flush="true" />    
 </web:then>
 <web:else>
  <%-- DHTML.js is necessary when HTML mode is On and current report is prompted which is waiting for user's input --%>
   <web:resource type="javascript" name="DHTML.js"/>
                
                <%-- Special fix for Netscape-based Browsers to display prompts correctly --%>
                <%-- issue 234010 --%>
                <web:ifFeature name="netscape">
                    <web:then>
                        <style type="text/css">
            table.mstrVerticalDocks {
                                table-layout: fixed !important;
            }
        </style>
                    </web:then>
                </web:ifFeature>
 </web:else>
 </web:ifFeature>
 <web:resource type="style" name="mstr/pagePrompts.css"/> <%-- this css will be loaded by PromptsClassicTransform.java --%>
</web:then>
<web:else>

        <%-- For XML Status other than 6 --%>
<web:resource type="javascript" name="Drill.js"/>
        
        <%-- DHTML Mode? --%>
        <web:ifFeature name="dhtml">
            <web:then>
<web:resource type="javascript" name="GradientUtil.js"/>
<web:resource type="javascript" name="updateManager.js"/>

<web:resource type="javascript" name="mstrGridReport.js"/>
<web:resource type="javascript" name="tableUtils.js"/>

<web:resource type="javascript" name="features.js"/>

<!-- JUIL javascript files (required) -->
<web:resource type="javascript" name="mstr/toolbarsAndAnnotations.js"/>
<web:resource type="javascript" name="formatObject.js"/>
<web:resource type="javascript" name="number.js"/>
<web:resource type="javascript" name="dropdown.js"/>
<web:resource type="javascript" name="mstrQuickThresholds.js"/>
<web:resource type="javascript" name="PromptFunctions.js"/>
<web:resource type="javascript" name="mstr/trees.js"/>


<!-- Base Mojo CSS & JS file -->
<web:resource type="js-style" name="mojo/css/core.css" />
<web:resource type="js-style" name="mojo/css/dde.css" />


<script type='text/javascript'> 
window.mstrApp = {
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
        pendingMojoEditor: '<web:value type="requestKey" name="oe"/>',  
        jsRoot: '../javascript/',   <%-- TODO: Need to send down actual value --%>
        jsMojoRoot: '../javascript/mojo/js/source/',
        mstrDescs :  <web:bundleDescriptor name="mojo-bootstrap,mojo-dde,mojo-ros"/>,   
        onSessionExpired: window.mstrAppOnSessionExpired
    };
    mstrApp.oi = {
    	objId: '<web:beanValue bean="rb" property="objectID"/>',
    	objType: '<web:beanValue bean="rb" property="objectType"/>',  
    	mid: '<web:beanValue bean="rb" property="messageID"/>'
    };
</script>

<web:ifFeature name="quick-search-enabled;!is-view-report;!xda-customsql-report;!xda-mdx-report;report-template-search" type="bean" value="frame.rb">
<web:then>
        <!-- Report Template Search Resources -->
        <script type='text/javascript'>
        window.mstrApp.maxSearchResults = '<web:value type="preference" name="maxSearchResults" />';
        window.mstrApp.objectsBlockCount = '<web:value type="preference" name="objectsBlockCount" />';
        window.mstrApp.elementsBlockCount = '<web:value type="preference" name="elementsBlockCount" />';
        </script>
</web:then>
</web:ifFeature>

<!-- JUIL css files (required) -->
 <web:resource type="style" name="mstr/widgets.css"/>


<web:scriptlet> 

        self.submitLink = function submitLink(oAnchor) {
        var sTarget; sTarget = oAnchor.target;
        // #405410 if attribute iframe is present add it to the href
        if (oAnchor.getAttribute && oAnchor.getAttribute("useIframe")) oAnchor.href = replaceURLParameter(oAnchor.href, "iframe", "true");
        //submit always using a form so max state is submitted:
        var oForm = createDynamicForm(oAnchor.href);
        if (sTarget) oForm.target = sTarget;
        submitForm(oForm);
        return false;
    }
</web:scriptlet>
            </web:then>
        </web:ifFeature>
    
    <web:resource type="style" name="mstr/pageReport.css"/>

</web:else>
</web:ifBeanValue>
