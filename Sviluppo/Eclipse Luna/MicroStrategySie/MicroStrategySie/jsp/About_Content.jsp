<%
  /*
   * About_Content.jsp
   * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
   */
%>
<BR /><BR />
<SPAN class="mstrVersionInfo">
	<web:ifFeature type="systemPreference" name="showAboutPageInfo"><web:then>
	    <SPAN>JSP version:</SPAN>&nbsp;<mstrversion>9.4.1200.0055</mstrversion><BR /><BR />
	    <SPAN><web:descriptor key="mstrWeb.792" desc="XML API version:" /></SPAN>&nbsp;<web:connectionValue property="xmlAPIVersion"/><BR /><BR />
	    <SPAN>Java Virtual Machine:</SPAN>&nbsp;(<web:connectionValue property="JVMVendor"/>&nbsp;<web:connectionValue property="JVMVersion"/>)<BR /><BR />
	<%--
	 If there is a session and the server versio can be accessed,
	 display the Intelligent Server version number.
	--%>
	    <web:ifConnectionValue property="serverVersion">
	        <web:then>
	            <SPAN><web:descriptor key="mstrWeb.795" desc="Server version:" /></SPAN>&nbsp;<web:connectionValue property="serverVersion"/><BR /><BR />
	        </web:then>
	    </web:ifConnectionValue>
    </web:then></web:ifFeature>
    <SPAN><web:descriptor key="mstrWeb.793" desc="Browser version:" /></SPAN>&nbsp;<web:value type="misc" name="userAgent"/> <BR /><BR />
</SPAN>
<!-- Locales
<web:descriptor key="mstrWeb.1341" desc="Language:"/><web:connectionValue property="displayLocale"/>
<web:descriptor key="mstrWeb.2444" desc="Number and Date Format:"/><web:connectionValue property="serverLocale"/>
<web:descriptor key="mstrWeb.5154" desc="Metadata"/>:<web:connectionValue property="metadataLocale"/>
<web:descriptor key="mstrWeb.1765" desc="Data Warehouse:"/><web:connectionValue property="warehouseLocale"/>
<web:descriptor key="mstrWeb.874" desc="Messages"/>:<web:connectionValue property="messagesLocale"/>
-->
<%--
 This tag displays all the cookies currently defined on the
 client's browser by the application.
--%>
<web:displayCookies/>