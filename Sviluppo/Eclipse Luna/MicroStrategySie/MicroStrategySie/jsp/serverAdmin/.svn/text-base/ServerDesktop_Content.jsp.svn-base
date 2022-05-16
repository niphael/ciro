<%
  /****
  * Desktop_Content.jsp
  * This file displays the main contents of a welcome desktop page, showing
  * quick links to folders like Shared Reports, My Reports, etc. as well as
  * other features such Preferences, History List, etc.
  *
  * Copyright 2004 MicroStrategy Incorporated. All rights reserved.
  * version: 1.2
  * xhtml: true
  ****/
%><%@ page errorPage="JSP_Error.jsp"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"%>

<%--
 The following DIV renders the "If you are not [a user]" string so a user can logout.
 If 508 is enabled, the name of the user will be part of the hyperlink in order to be
 interpreted correctly by the 508 reader.
--%>
<div class="mstrInstruct"><web:descriptor key="mstrWeb.859" desc="Welcome" /> <web:connectionValue property="userName"
/> | <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventQuickLogout" linkAttributes="class='mi-dskt-logout'"
><web:descriptor key="mstrWeb.8338" desc="Sign Out" /></web:urlEvent></div>

<div class="mstrDesktopSection">
 <div class="mstrDesktopSectionTitle"><div class="mstrDesktopSectionIcon"><web:descriptor key="mstrWeb.3497" desc="Tools" /></div></div>

  <web:ifFeature name="object-search"><web:then>
    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenTopLevelUserGroups" linkAttributes ="class='mstr-dskt-lnk usermgr'">
       <div class="mstr-dskt-icn"></div>
       <div class="mstr-dskt-nm"><web:descriptor key="mstrWeb.4017" desc="User Manager" /></div>
       <div class="mstr-dskt-dsc"><web:descriptor key="mstrWeb.4018" desc="Create, edit and delete users and groups." /></div>
      </web:urlEvent>
  </web:then></web:ifFeature>
  <web:ifFeature name="access-to-security-role-manager"><web:then>
    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenSecurityRolesFolder" linkAttributes ="class='mstr-dskt-lnk rolemgr'">
       <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentSearchString" value="*" />
       <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentObjectType" value="44" />
       <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentSearchDomain" value="3" />
       <div class="mstr-dskt-icn"></div>
       <div class="mstr-dskt-nm"><web:descriptor key="mstrWeb.5746" desc="Security Role Manager" /></div>
       <div class="mstr-dskt-dsc"><web:descriptor key="mstrWeb.4483" desc="Create, edit and delete security roles." /></div>
      </web:urlEvent>
  </web:then></web:ifFeature>

</div>
<table class="mstrVersionInfoLink">
<tr>
<td align="right"><web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenAbout"><web:descriptor key="mstrWeb.2564" desc="Version information..."/></web:urlEvent><br /></td></tr>
</table>
