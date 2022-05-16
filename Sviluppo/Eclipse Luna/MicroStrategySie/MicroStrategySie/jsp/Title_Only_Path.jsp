<%
    /*
     * Title_Only_Path.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */
%>
<%@ page errorPage="Error_Header.jsp" %>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web" %>
<div class="mstrPathContainer">
<div class="mstrPathText"><span class="mstrPathLast"><web:beanValue property="title" encode="true"/></span></div><div class="mstrSpacer"></div>
<div id="mstrStarburst" _isstatic="true">
	<div id="mstrLogo" class="mstrLogo path"> </div>
	<div id="mstrLogoSmall" class="mstrLogoSmall path" title=""> </div>
</div>
</div>
<%--when logo shows, pathbar must show too to make room enough for logo--%>
<style type="text/css">
.path.mstrLogo {display: none;}
.mstrLogoSmall {display: none;}
.path.mstrLogoSmall {display: block;}
.mstrPathContainer {padding-left: 40px;}
.mstrHeader {padding-left: 70px;}
#mstrStarburst {top:1px;}
</style>