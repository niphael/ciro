<%
    /*
     * Change_Password_Path.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */
%>

<%@ page errorPage="Error_Path.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>

<%--
 If the user has the "change password" preference, show the "return to"
 hyperlink (allows the user to be moved back to the page where s/he was before).
--%>
<web:ifBeanValue property="getName" value="prefChPwd">
    <web:then>
        <web:displayBean bean="pathBean" styleName="PathStyle"/>
    </web:then>
</web:ifBeanValue>
