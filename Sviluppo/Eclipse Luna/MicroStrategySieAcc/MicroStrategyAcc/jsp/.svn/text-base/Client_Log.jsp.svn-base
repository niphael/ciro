<%
 /*
  * Client_Log.jsp
  * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
  */
%>

<%@ page errorPage="Error_Content.jsp"%>
<%@ page import="com.microstrategy.web.app.platform.ServletContainerServices"%>
<%@ page import="com.microstrategy.web.app.*"%>
<%@ page import="com.microstrategy.web.app.platform.*"%>
<%@ page import="com.microstrategy.web.app.beans.*"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<%@ page contentType="text/html; charset=UTF-8"%>

<%
ServletContainerServices scs = new ServletContainerServices();
scs.setRequest(request);
scs.setResponse(response);
HttpRequestKeys rk = new HttpRequestKeys(scs);
rk.setKeySpace(HttpRequestKeys.FORM_AND_QUERY_DATA_SPACE);
%>

<HTML>
    <HEAD>
        <META http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<%--
 The script included in the "JSP" tag will be removed when this
 file gets converted into ASP.Net. Instead, the ASP section will
 be executed.
--%>

        <TITLE>Client Page Rendering Times. MicroStrategy 9.</TITLE>
		<web:resource type="style" name="mstrWeb.css" />
    </HEAD>

    <BODY BGCOLOR="#FFFFFF" TOPMARGIN="0" LEFTMARGIN="0" MARGINWIDTH="0" MARGINHEIGHT="0" CLASS="standard-text">
        <TABLE BORDER="0" WIDTH="100%" BGCOLOR="#990000" CELLSPACING="0" CELLPADDING="0" <web:resource attribute="BACKGROUND" name="photoHeader5.gif"/>>
            <TR>
                <TD WIDTH="100%" VALIGN="MIDDLE" NOWRAP="1">
                    <IMG <web:resource attribute="SRC" name="1ptrans.gif"/> WIDTH="1" HEIGHT="1" ALT="" BORDER="0" />
                </TD>
            </TR>
        </TABLE>

        <BR />
        <CENTER>
            This is a report of the rendering times collected from the page just requested.<P />
            (Times in miliseconds)
        </CENTER>
		<%-- For rendering in a table the information gathered from the page that was just executed --%>
        <web:logging action="results" url='<%=rk.getValue("url")%>' urlObjId='<%=rk.getValue("mfc_urlObjID")%>' names='<%=rk.getValue("nm")%>' times='<%=rk.getValue("tm")%>'/>

        <P /><HR />
        <TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0" >
            <TR VALIGN="TOP">
                <TD ROWSPAN="3" WIDTH="3">&nbsp;</TD>
                <TD COLSPAN="3" ALIGN="LEFT" CLASS="comment">
                    Copyright &#169; 1996-2008 <FONT COLOR="#CC0000">Micro<I>Strategy</I></FONT> Incorporated. <web:descriptor key="mstrWeb.13" desc="All rights reserved. Confidential." />
                </TD>
            </TR>
        </TABLE>
		<%-- Set the page to an empty location --%>
        <web:logging action="reset"/>


    </BODY>
</HTML>
