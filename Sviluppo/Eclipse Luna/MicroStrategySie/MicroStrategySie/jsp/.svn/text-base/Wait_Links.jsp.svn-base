<%
    /*
     * Wait_Links.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */
%>
<%@ page errorPage="Error_Links.jsp"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<%@ page contentType="text/html; charset=UTF-8"%>

<web:resource type="style" name="mstr/fsm.css"/>
<web:resource type="style" name="mstr/mstr.css"/>
<%-- Load theme style --%>
 <web:ifFeature name="only-load-theme-specific-css"><web:then>
    <web:resource type="theme-specific-style"/>
</web:then><web:else>
    <web:resource type="all-themes-style"/>
</web:else></web:ifFeature> 

<%-- if document domain is defined, set the domain, regardless the dhtml feature. --%>
<web:ifFeature type="config" name="jsDocumentDomain">
<web:then><web:javascript type="domain" /></web:then>
</web:ifFeature>

<web:ifFeature name="dhtml"><web:then>
<web:resource type="javascript" name="mstr/core.js" location="head"/>
<web:resource type="javascript" name="DHTML.js" location="head"/>
<web:resource type="javascript" name="IFRAME.js" location="head"/>
<web:resource type="javascript" name="microstrategy.js" location="head"/>
<web:resource type="javascript" name="errors.js"/>
<web:resource type="javascript" name="HTMLAttributes.js"/>
<web:resource type="javascript" name="bone.js"/>
<web:resource type="javascript" name="dialog.js"/>
<web:resource type="javascript" name="editor.js"/>
<web:resource type="javascript" name="mstrEventManager.js"/>
<web:resource type="javascript" name="clientSideDescriptor.js"/>
<web:resource type="javascript" name="dropdown.js"/>
</web:then></web:ifFeature>

<web:resource type="style" name="mstr/pageWait.css"/>
