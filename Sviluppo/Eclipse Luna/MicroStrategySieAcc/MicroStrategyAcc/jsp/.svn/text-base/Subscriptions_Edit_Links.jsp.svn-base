<%
    /*
     * Subscriptions_Edit_Links.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */
%>

<%@ page errorPage="Error_Links.jsp"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.microstrategy.web.app.beans.PageComponent"%>

<%PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");%>

<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("links")%>' flush="true" />

<web:resource type="style" name="mstr/pagePrompts.css"/>

<%-- DHTML.js is necessary when HTML mode is on if the the report/document/rwb is prompted--%>
<web:resource type="javascript" name="DHTML.js"/>

<web:ifFeature name="dhtml"><web:then>
<web:resource type="javascript" name="dropdown.js"/>
<web:resource type="javascript" name="toolbar.js"/>
<web:resource type="javascript" name="observer.js"/>
<web:resource type="javascript" name="serializer.js"/>
<web:resource type="javascript" name="updateManager.js"/>
<web:resource type="javascript" name="bone.js"/>
<web:resource type="javascript" name="dialog.js"/>
<web:resource type="javascript" name="editor.js"/>
<web:resource type="javascript" name="contactsEditor.js"/>
<web:resource type="javascript" name="selections.js"/>
<web:resource type="javascript" name="tab.js"/>
<web:resource type="javascript" name="TabManager.js"/>
<web:resource type="javascript" name="formatObject.js"/>
<web:resource type="javascript" name="number.js"/>
   <web:resource type="javascript" name="Calendar.js"/>
   <web:resource type="javascript" name="PromptFunctions.js"/>
<jsp:include page='/jsp/Prompt_Links.jsp' flush="true" />
<web:scriptlet>

	if(microstrategy) microstrategy.cancelPromptResize = true;

</web:scriptlet> 
</web:then></web:ifFeature>

