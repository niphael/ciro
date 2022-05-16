<%
 /****
  * Global_Links.jsp
  * This file is used to include all css and js files required in
  * all pages.
  *
  * Copyright 2004 MicroStrategy Incorporated. All rights reserved.
  * version: 1.2
  * xhtml: true
  ****/
%><%@ page errorPage="Error_Links.jsp"
%><%@ page contentType="text/html"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%><%--These includes should eventually be removed. They're currently kept for backwards compatibility: --%>


<script type='text/javascript'> 
mstrConfig = {
    simpleDialog: false,
    
    <web:ifFeature type="systemPreference" name="validateRandNum"><web:then>
        validateRandNum: '<web:value type="httpSession" name="validateRandNum"/>',
    </web:then></web:ifFeature>
    
    taskURL: '<web:taskProcessorName />',
    thousandsSep: '<web:value type="misc" name="thousandSeparator"/>',
    decimalSep: '<web:value type="misc" name="decimalSeparator"/>',
    listSep: '<web:value type="misc" name="listSeparator"/>',
    jsLibs: '../javascript-libraries/'
};

window.mstrAppOnSessionExpired = function() {
    var f = document.getElementById('formRefresh');
    if (f) {
        submitForm(f);
    }
};    

window.mstrApp = {
        taskURL: '<web:taskProcessorName />',
        <web:ifFeature type="systemPreference" name="validateRandNum"><web:then>
            validateRandNum: '<web:value type="httpSession" name="validateRandNum"/>',
        </web:then></web:ifFeature>
        mstrDescs: <web:bundleDescriptor name="mojo-bootstrap,mojo-coreui"/>,
        onSessionExpired: window.mstrAppOnSessionExpired
};
    
</script>

<web:resource type="style" name="mstr/fsm.css"/>
<web:ifFeature name="not-flash-full-screen-mode"><web:then>
<web:resource type="style" name="mstr/mstr.css"/>
</web:then></web:ifFeature>
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

<%--
 Check if the user has the DHTML preference turned on to determine whether
  the page should load some JavaScript functions.

 <web:ifFeature name="dhtml">
     [JavaScript code]
 </web:ifFeature>
--%>
<web:ifFeature name="dhtml"><web:then>
<!-- JUIL javascript files (required) -->
<web:resource type="javascript" name="mstr/core.js" location="head"/>
 
<web:resource type="javascript" name="DHTML.js" location="head"/>
<web:resource type="javascript" name="IFRAME.js" location="head"/>
<web:resource type="javascript" name="microstrategy.js" location="head"/>
<web:resource type="javascript" name="errors.js"/>
<web:resource type="javascript" name="bone.js"/>

<web:resource type="javascript" name="dialog.js"/>
<web:resource type="javascript" name="HTMLAttributes.js"/>
<web:resource type="javascript" name="editor.js"/>
<web:resource type="javascript" name="mstrEventManager.js"/>
<web:resource type="javascript" name="clientSideDescriptor.js"/>

<%--
    Search Suggesttion - Header ShortcutsBar QuickSearch in all pages 
 --%>
<web:ifFeature name="object-search"><web:then>
	<web:resource type="javascript" name="mstrSearch.js"/>
	<web:resource type="javascript" name="mstrSearchCommands.js"/>
</web:then></web:ifFeature>

<script language="JavaScript">
try { document.execCommand("BackgroundImageCache", false, true); } catch(err) {} 
</script>

<web:ifFeature type="systemPreference" name="includeSessionUrl">
    <web:then>
        <web:scriptlet> 
             if (typeof(microstrategy) != 'undefined') {
                 microstrategy.sessionState = '<web:connectionValue property="sessionState"/>';
             }
        </web:scriptlet>
    </web:then>
</web:ifFeature>

<web:ifFeature name="ddMenu" type="preference" value="0"><web:then>
	<web:scriptlet> 
	     if (typeof(microstrategy) != 'undefined') {
	         microstrategy.menuHover = true;
	     }
	</web:scriptlet>
</web:then></web:ifFeature>

</web:then></web:ifFeature>