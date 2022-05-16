<%
  /*
   * AboutInfo_Content.jsp
   * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
   */
%>

<%@ page errorPage="Error_Content.jsp" %>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web" %>
<%@include file='/jsp/About_Content.jsp' %>
<web:ifFeature name="!mobile-server">
	<web:then>   
<form <web:value attribute="action" type="config" name="webServletDeploymentName"/> method="post"><input class="mstrButton" style="padding: 6px;" type="submit" <web:descriptor key="mstrWeb.37" desc="Projects" attribute="value"/>/></form>
</web:then></web:ifFeature>