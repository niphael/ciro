<%
 /****
  * RW_Links.jsp
  * This page includes the link definitions that should be added for the
  * page of Report Writing Documents
  *
  * Copyright 2004 MicroStrategy Incorporated. All rights reserved.
  * version: 1.2
  * xhtml: true
  ****/
%><%@ page errorPage="Error_Links.jsp"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%><%@ page import="com.microstrategy.web.app.beans.PageComponent"%><%
  PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");
%>

<%-- <web:resource type="js-style" name="mojo/css/core.css" /> --%>
<web:resource type="js-style" name="mojo/css/transactionEditor.css" />
<web:resource type="js-style" name="mojo/css/docViewsEditor.css" />
 
<web:ifFeature name="rw-analysis-view-mode" type="bean" value="rwframe">
    <web:then>
	    <style type="text/css">
		  .mstrWeb .mstrDockTop {
		    padding-bottom: 0 !important; /*reduce bottom shadow effect to make VI Doc touch the toolbar without visual gap in between, espeically in dark theme*/
		  }
		</style>
    </web:then>
</web:ifFeature>

<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("links")%>' flush="true" />

<%-- Are we in a Prompted RWD? --%>
<web:ifBeanValue bean="rwframe.rwb" property="getXMLStatus" value="6">
    <web:then>
        <%-- In DHTML Mode? --%>
        <web:ifFeature name="dhtml">
            <web:then>
                <%-- Prompt page dhtml mode needs this javascript --%>
                <web:resource type="javascript" name="Calendar.js"/>
                <web:resource type="javascript" name="updateManager.js"/>
                <web:resource type="javascript" name="PromptFunctions.js"/>
                <jsp:include page='/jsp/Prompt_Links.jsp' flush="true" />   
            </web:then>
            <web:else>
                <%-- DHTML.js is necessary when HTML mode is On and current report is prompted which is waiting for user's input --%>
                <web:resource type="javascript" name="DHTML.js"/>
            </web:else>
        </web:ifFeature>        
        <web:resource type="style" name="mstr/pagePrompts.css"/>
    </web:then>
    <web:else>
        <%-- For cases when XMLStatus != 6 --%>
        <%-- These are only necessary if editing is enabled --%>

        <%-- Files for the new look and feel --%>
        <web:resource type="style" name="mstr/pageRW.css"/> 
         <%-- #358599 - avoid narrow window wrapping menubar  --%>
        <web:ifFeature name="IE7">
            <web:then>
                 <style type="text/css">
                       .mstrDockTop {position: relative !important; z-index: 105;}
                       .mstrDockTopContainer {position: relative;}
                       
                       <web:ifFeature type="bean" name="rw-flash-view-mode;page-full-screen-mode;"  value="rwframe"><web:then>
                            .mstrToolbar2End {position: absolute;}
                       </web:then></web:ifFeature>
                 </style>
             </web:then>
        </web:ifFeature>

        <%-- Are we in DHTML mode? --%>
        <web:ifFeature name="dhtml">
            <web:then>
                <script> 
                    var mstrApp = {
                        name: '<web:value type="config" name="servletDeploymentName"/>',
                        pageName: '<web:beanValue property="name"/>',
                        sessionId: '<web:connectionValue property="containerSessionId" />',
                        sessionState:'<web:connectionValue property="sessionState"/>',    
                        localeId: '<web:connectionValue property="locale"/>',
                        helpUrl: '<web:value type="systemPreference" name="helpUrl" />',
                        units: '<web:value type="misc" name="units"/>',
                        unitsLabel: '<web:value type="misc" name="unitsLabel"/>',
                        serverName: '<web:connectionValue property="serverName"/>',
    					projectName: '<web:connectionValue property="projectName"/>',
 						serverPort: '<web:connectionValue property="serverPort"/>',
 						pendingMojoEditor: '<web:value type="requestKey" name="oe"/>',
                        
                        objectsBlockCount: '<web:value type="preference" name="objectsBlockCount" />',
                        elementsBlockCount: '<web:value type="preference" name="elementsBlockCount" />',
                        jsRoot: '../javascript/',   <%-- TODO: Need to send down actual value --%>
                        jsMojoRoot: '../javascript/mojo/js/source/',
                        mstrDescs : <web:bundleDescriptor name="mojo-bootstrap,mojo-txe,mojo-tc"/>,    
                        onSessionExpired: window.mstrAppOnSessionExpired,
                        getThousandSep: function () {
                            return mstrConfig.thousandsSep;
                        },
                        getDecimalSep: function () {
                            return mstrConfig.decimalSep;
                        }
                    };
                    mstrApp.oi = {
                    	objId: '<web:beanValue bean="rwb" property="objectID" encode="true"/>',
                    	objType: '<web:beanValue bean="rwb" property="objectType"/>',  
                    	mid: '<web:beanValue bean="rwb" property="messageID"/>'
                    };
                
                </script>
                
                <web:resource type="javascript" name="updateManager.js"/>           
                <web:resource type="javascript" name="features.js"/>            
                <web:resource type="javascript" name="formatObject.js"/>    
                <web:resource type="javascript" name="number.js" />
                
                
                <web:ifFeature type="bean" name="rw-flash-view-mode;page-full-screen-mode;"  value="rwframe"><web:else>
                    <web:resource type="javascript" name="dropdown.js" />
                    <web:resource type="javascript" name="GradientUtil.js" />
                    <web:resource type="javascript" name="tableUtils.js" />
                </web:else></web:ifFeature>
                
                <web:ifFeature type="bean" value="rwframe" name="rw-interactive-view-mode-full-screen-reporter">
                    <web:then>
                        <web:resource type="javascript" name="mstr/core.js"/>
                    </web:then>
                    <web:else>
                        <web:resource type="javascript" name="TabManager.js"/>
                        <web:resource type="javascript" name="tab.js"/>
                        <web:resource type="javascript" name="leftToolbar.js"/>
                        <web:resource type="javascript" name="mstr/toolbarsAndAnnotations.js"/>         
                    
                        <web:ifFeature type="bean" name="rw-flash-view-mode;page-full-screen-mode;"  value="rwframe"><web:else>
                            <web:resource type="style" name="mstr/widgets.css"/>
                        </web:else></web:ifFeature>
                        
                        <web:ifBeanValue bean="rwframe.rwb" property="getXMLStatus" value="2">
                        <web:else>
                            <%-- Are we in Interactive, Editable or Design Modes? --%>
                            <web:ifFeature type="bean" value="rwframe" name="rw-interactive-view-mode-eplus">
                                <web:then>
                                    <web:resource type="javascript" name="mstrQuickThresholds.js"/>
                                    <web:resource type="javascript" name="mstrGridRW.js"/>
                                </web:then>
                            </web:ifFeature>
                        </web:else>
                        </web:ifBeanValue>
                    </web:else>
                </web:ifFeature>
          
                <web:scriptlet>
                self.submitLink = function submitLink(oAnchor) {
                    
                    var sTarget; sTarget = oAnchor.target;
                    //submit always using a form so max state is submitted:
                    var oForm = createDynamicForm(oAnchor.getAttribute('hv') || oAnchor.href);
                    if (sTarget) oForm.target = sTarget;
                    submitForm(oForm);
                    if(window.event) {
                        window.event.cancelBubble  = true;
                    }
                    return false;

                }
                </web:scriptlet>
            </web:then>
        </web:ifFeature>
        
        <web:ifFeature type="bean" value="rwframe" name="rw-editable-view-mode-eplus">
             <web:then>
                 <web:resource type="javascript" name="mstr/trees.js"/>
                 
             </web:then>
        </web:ifFeature>
    </web:else>
</web:ifBeanValue>