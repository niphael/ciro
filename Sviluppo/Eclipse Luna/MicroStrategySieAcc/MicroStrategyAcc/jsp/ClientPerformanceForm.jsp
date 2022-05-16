<%
    /*
     * ClientPerformanceForm.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */
%>

<%@ page errorPage="Error_Content.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>

<HTML>
    <HEAD>
        <TITLE>Client Performance</TITLE>
    </HEAD>
    <BODY>
        <%-- This page is to be used only together with the Client Performance Rendering features--%>
        <FORM ID="performanceForm" NAME="performanceForm" METHOD="POST" ACTION="/jsp/Client_Log.jsp">
            <INPUT TYPE="TEXT" ID="mfc_urlObjID" NAME="mfc_urlObjID" VALUE="urlID" />
            <INPUT TYPE="TEXT" ID="nm" NAME="nm" VALUE="componentName" />
            <INPUT TYPE="TEXT" ID="tm" NAME="tm" VALUE="componentType" />
            <INPUT TYPE="TEXT" ID="url" NAME="url" VALUE="urlRequested" />
        </FORM>
    </BODY>
</HTML>
