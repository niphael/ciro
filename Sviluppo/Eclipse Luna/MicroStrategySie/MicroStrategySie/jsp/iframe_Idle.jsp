<%
  /*
   * iframe_Idle.jsp
   * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
   */
%>

<%@ page errorPage="Error_Content.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>

<%--

--%>

<web:javascript type="domain" />
<HTML>
    <BODY onBeforeUnload="window.parent.iframe.notifyParent();" onLoad="window.parent.reloadPreviousPage();">
        <SCRIPT LANGUAGE="Javascript">
            self.isIframe = true;
            if (window.parent.iframe && window.parent.iframe.hideWaitPage) window.parent.iframe.hideWaitPage();
        </SCRIPT>
		<web:logging action="statistics"/>
    </BODY>
</HTML>