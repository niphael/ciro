<%
 /****
  * Logo.jsp
  * 
  * This file includes the mstrWeb startburst logo. 
  * This file should be included in each header JSP file where the Starburst logo should display.
  *
  ****/
%>

<%@ taglib uri="/webUtilTL.tld" prefix="web"%>

<web:ifFeature name="!mobile-server">
	<web:then>
<%--mstrWeb Starburst --%>
<web:urlEvent includeState="false" eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenHome" linkAttributes ="id='mstrStarburst'" titleID="mstrWeb.37">
<web:ifFeature name="accessibility">
<web:then>
<img src='images/1ptrans.gif' id='mstrLogo' class='mstrLogo path' <web:descriptor attribute="TITLE" key="mstrWeb.37" desc="Projects" /> <web:descriptor attribute="ALT" key="mstrWeb.37" desc="Projects" />>
<img src='images/1ptrans.gif' id='mstrLogoSmall' class='mstrLogoSmall path' <web:descriptor attribute="TITLE" key="mstrWeb.37" desc="Projects" /> <web:descriptor attribute="ALT" key="mstrWeb.37" desc="Projects" />>
</web:then>
<web:else>  
    <div id='mstrLogo' class='mstrLogo path' <web:descriptor attribute="TITLE" key="mstrWeb.37" desc="Projects" /> > </div>
    <div id='mstrLogoSmall' class='mstrLogoSmall path' <web:descriptor attribute="TITLE" key="mstrWeb.37" desc="Projects" /> > </div>
</web:else>
</web:ifFeature>    
</web:urlEvent>
	</web:then>
	<web:else>  
		<%--mstrWeb Starburst --%>
		<web:urlEvent includeState="false" eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventAdminOpenHome" linkAttributes ="id='mstrStarburst'" titleID="mstrWeb.2350">
		    <div id='mstrLogo' class='mstrLogo' <web:descriptor attribute="TITLE" key="mstrWeb.2350" desc="Intelligence Servers" /> > </div>
		    <div id='mstrLogoSmall' class='mstrLogoSmall' <web:descriptor attribute="TITLE" key="mstrWeb.2350" desc="Intelligence Servers" /> > </div>
		</web:urlEvent>		
	</web:else>
</web:ifFeature>
<%--when logo shows, pathbar must show too to make room enough for logo--%>
<style type="text/css">
.path.mstrLogo {display: none;}
.mstrLogoSmall {display: none;}
.path.mstrLogoSmall {display: block;}
.mstrPathContainer {padding-left: 40px;}
.mstrHeader {padding-left: 70px;}
#mstrStarburst {top:1px;}
</style>