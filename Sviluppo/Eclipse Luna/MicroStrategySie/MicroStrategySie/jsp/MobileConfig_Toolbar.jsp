<%
    /*
     * PurgeCaches_Toolbar.jsp
     * Copyright 2002 MicroStrategy Incorporated. All rights reserved.
     */
%>

<%@ page errorPage="Error_Toolbar.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web" %>

<%--
Render a toolbar with links to different pages.
 Intelligence Servers
  Servers
  Default properties
 Narrowcast Server
 Diagnostics
  Configuration
  View logs
  Statistics
 Security
 MicroStrategy Office
--%>
<TABLE WIDTH="158" BORDER="0" CELLSPACING="0" CELLPADDING="0">
    <TR><TD><IMG <web:resource attribute="SRC" name="1ptrans.gif"/> WIDTH="1" HEIGHT="8" ALT="" BORDER="0" /></TD></TR>
    <TR>
        <TD>
            <TABLE ID="webserver_Table" NAME="webserver_Table" BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">
                <TR>
                    <TD ALIGN="left" VALIGN="top" COLSPAN="2">&nbsp;&nbsp;&nbsp;<span class="mstrHighlighted">
                    	<web:ifFeature name="mobile-server">
                    		<web:then>
                    			<web:descriptor key="mstrWeb.7879" desc="MOBILE SERVER" />                    		
                    		</web:then>
                    		<web:else>
                    			<web:descriptor key="mstrWeb.2747" desc="WEB SERVER" />
                    	    </web:else>
                    	</web:ifFeature>
                    </span></TD>
                </TR>
                <TR>
                    <TD WIDTH="15"><IMG <web:resource attribute="SRC" name="1ptrans.gif"/> WIDTH="15" HEIGHT="1" ALT="" /></TD>
                    <TD>
                        <TABLE BORDER="0" CELLSPACING="0" CELLPADDING="2">
                            <TR>
                                <TD VALIGN="TOP">
                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventAdminOpenHome" cssClass="mstrLink">
                                        <web:descriptor key="mstrWeb.2350" desc="Intelligence Servers" />
                                    </web:urlEvent>
                                </TD>
                            </TR>
                            <TR>
                                <TD>
                                    <IMG <web:resource attribute="SRC" name="1ptrans.gif"/> WIDTH="5" HEIGHT="3" ALT="" BORDER="0" />
                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventAdminOpenHome" cssClass="mstrLink">
                                        <web:descriptor key="mstrWeb.2694" desc="Servers" />
                                    </web:urlEvent>
                                </TD>
                            </TR>
                            <TR>
                                <TD>
                                    <IMG <web:resource attribute="SRC" name="1ptrans.gif"/> WIDTH="5" HEIGHT="3" ALT="" BORDER="0" />
                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventAdminOpenHome" cssClass="mstrLink">
                                        <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentShowDefault" value="true" />
                                        <web:descriptor key="mstrWeb.2695" desc="Defaults"/>
                                    </web:urlEvent>
                                </TD>
                            </TR>
                            <TR>
                                <TD VALIGN="TOP">
                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenDiagnostics" cssClass="mstrLink">
                                        <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentShow" value="0" />
                                        <web:descriptor key="mstrWeb.2703" desc="Diagnostics" />
                                    </web:urlEvent>
                                </TD>
                            </TR>
                            <TR>
                                <TD>
                                    <IMG <web:resource attribute="SRC" name="1ptrans.gif"/> WIDTH="5" HEIGHT="3" ALT="" BORDER="0" />
                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenDiagnostics" cssClass="mstrLink">
                                        <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentShow" value="0" />
                                        <web:descriptor key="mstrWeb.2697" desc="Configuration" />
                                    </web:urlEvent>
                                </TD>
                            </TR>
                            <TR>
                                <TD>
                                    <IMG <web:resource attribute="SRC" name="1ptrans.gif"/> WIDTH="5" HEIGHT="3" ALT="" BORDER="0" />
                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenDiagnostics" cssClass="mstrLink">
                                        <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentShow" value="1" />
                                        <web:descriptor key="mstrWeb.2698" desc="View logs" />
                                    </web:urlEvent>
                                </TD>
                            </TR>                            
                            <TR>
                                <TD><IMG <web:resource attribute="SRC" name="1ptrans.gif"/> WIDTH="5" HEIGHT="3" ALT="" BORDER="0" />
                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenDiagnostics" cssClass="mstrLink">
                                        <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentShow" value="2" />
                                        <web:descriptor key="mstrWeb.2706" desc="Statistics" />
                                    </web:urlEvent>
                                </TD>
                            </TR>
                            <TR>
                                <TD VALIGN="TOP">
                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenSecuritySetup" cssClass="mstrLink">
                                        <web:descriptor key="mstrWeb.2696" desc="Security" />
                                    </web:urlEvent>
                                </TD>
                            </TR>
                            <TR>
                                <TD VALIGN="TOP">
                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenHelpSetup" cssClass="mstrLink">
                                        <web:descriptor key="mstrWeb.9757" desc="Help Configuration" />
                                    </web:urlEvent>
                                </TD>
                            </TR>
							<web:ifFeature name="!mobile-server"><web:then>                             
	                            <%-- Display "MicroStrategy Office" as a hyperlink or a highlighted element --%>
	                            <TR>
	                                <TD VALIGN="TOP">
	                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
	                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenOfficeSetup" cssClass="mstrLink">
	                                        MicroStrategy Office
	                                    </web:urlEvent>
	                                </TD>
	                            </TR>
	                            <%-- Display "Widget Deployment" as a hyperlink or a highlighted element --%>
	                            <TR>
	                                <TD VALIGN="TOP">
	                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
	                                    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenPage" cssClass="mstrLink">
	                                        <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentTarget" value="widgetDeployer" />
	                                        <web:descriptor key="mstrWeb.5085" desc="Widget Deployment" />
	                                    </web:urlEvent>
	                                </TD>
	                            </TR> 
	                        </web:then></web:ifFeature>
	                        <web:ifFeature name="!web-server"><web:then>
                            <TR>
                                <TD VALIGN="TOP">
                                    <IMG <web:resource attribute="SRC" name="bullet_arrow_right.gif"/> WIDTH="3" HEIGHT="8" ALT="" BORDER="0" />
                                    <span class="mstrStandardHighlighted"><web:descriptor key="mstrWeb.7764" desc="Mobile Configuration" /></span>
                                </TD>
                            </TR>           
                            </web:then></web:ifFeature>                  
                        </TABLE>
                    </TD>
                </TR>
            </TABLE>
        </TD>
    </TR>
</TABLE>

