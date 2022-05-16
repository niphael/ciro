<%@ taglib uri="/webUtilTL.tld" prefix="web" %>
<%@ page import="com.microstrategy.web.app.beans.PageComponent" %>
<%PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");%>

<%-- Start up the Web Statistics... --%>
<web:performanceTimer action="initialize" />
<web:performanceTimer action="start" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd " >

<html>
<head>
<web:metaContentType/>
<title><web:beanValue property="title" encode="true"/><web:descriptor key="mstrWeb.8965" desc=". MicroStrategy 9" /></title>
<link rel="shortcut icon" href="../style/mstr/images/favicon.ico" type="image/x-icon" />
<web:resource type="js-style" name="mojo/css/core.css" />
<web:resource type="js-style" name="mojo/css/Vis.css" />
<web:ifFeature name="doubleByte"><web:then>
    <web:resource type="style" name="mstr/mstrDB.css"/>
</web:then></web:ifFeature>
<web:ifFeature type="systemPreference" name="enableFrameBreaking" value="1"><web:then>
<style type="text/css">
body { display : none;}
</style>
</web:then></web:ifFeature>

<jsp:include page='<%=mstrPage.getTemplateInfo().getSection("header_mojo")%>' flush="true" />

<%--  
  This custom tag automatically includes the "global.css" and "{PAGENAME}Page.css" files found insite the "/style" subfolder of a 
  plugin folder.
  It can be used to customize the look and feel of the application without modifying any configuration file or jsp.
--%>
<web:resource type="custom-style" />

</head>

<body class="mstrWeb <web:ifConnectionValue><web:then><web:value type='preference' name='colorTheme' /></web:then><web:else><web:value type='browserSetting' name='colorTheme' /></web:else></web:ifConnectionValue>" onload="<web:javascript eventName="onload"/>">
<web:ifFeature type="systemPreference" name="enableFrameBreaking" value="1"><web:then>
<script> 
if (self == top) {
    var theBody = document.getElementsByTagName('body')[0];
    theBody.style.display = "block";
} else { 
    top.location = self.location; 
}
</script>
</web:then>
</web:ifFeature>
    <web:ifFeature name="IE6">
        <web:then>
            <web:descriptor key="mstrWeb.7912" desc="This feature is not supported by the current browser. Refer to the MicroStrategy Mobile Readme file for a list of supported browsers." />
        </web:then>
        <web:else>
            <jsp:include page='<%=mstrPage.getTemplateInfo().getSection("content_mojo")%>' flush="true" />
        </web:else>
    </web:ifFeature>

<%--  
  This custom tag automatically includes the "global.js" and "{PAGENAME}Page.js" files found inside the "/javascript" subfolder of a 
  plugin folder.
  It can be used to include automatically some custom javascript in a given page without modifying any configuration file or jsp.
--%>
<web:resource type="custom-javascript" />
    
    <textarea id="debugInfo" style="display:none">
        <web:showDebugInfo contentType="text/xml" />
    </textarea>

    <%-- Trigger the collection of Web Statistics --%>
    <web:logging action="statistics" />
</body>
</html>