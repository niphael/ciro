<%
    /*
     * Preferences_PrintPDFExport_Path.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */
%>

<%@ page errorPage="Error_Path.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<%--
	Render a hyperlink to the previous page unless we are in the 'headerFooter' mode
--%>
<div class="mstrPathContainer">
<web:ifBeanValue bean="preferences" property="useForHeaderFooter">
    <web:else>
		<web:displayBean bean="pathBean" styleName="PathStyle"/>
    </web:else>
</web:ifBeanValue>
<%@include file='/jsp/Logo.jsp' %>
</div>