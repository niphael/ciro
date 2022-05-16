<%
/*
 * Report_LeftToolbar.jsp
 * This page displays the left toolbar for the Report page.which will display the related reports
  *
  * Copyright 2004 MicroStrategy Incorporated. All rights reserved.
  * version: 1.2
  * xhtml: true
  ****/
%><%@ page errorPage="JSP_Error.jsp"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%>
<web:ifBeanValue bean="frame.rb" property="getXMLStatus" value="6">
<web:then>
   <web:ifFeature name="accordionReportTab" type="browserSetting" value="relatedReports">
   <web:then>
      <web:ifBeanValue property="getXMLStatus" value="4">
      <web:else>
          <web:displayGuiComponent name="accordion"/>
      </web:else>
      </web:ifBeanValue>
   </web:then>
   </web:ifFeature>
</web:then>
<web:else>
   <web:ifBeanValue bean="frame.rb" property="getXMLStatus" value="2">
      <web:then>
          <web:ifFeature name="accordionReportTab" type="browserSetting" value="relatedReports">
          <web:then>
              <web:ifBeanValue property="getXMLStatus" value="4">
                 <web:else> 
                    <web:displayBean bean="frame.accordion" styleName="AccordionTabManagerStyle"/>
                 </web:else>
              </web:ifBeanValue>
          </web:then>
          </web:ifFeature>
      </web:then>
      <web:else>
         <web:ifBeanValue property="getXMLStatus" value="4">
         <web:else> 
            <web:displayGuiComponent name="accordion"/>
         </web:else>
         </web:ifBeanValue>
      </web:else>
   </web:ifBeanValue>
</web:else>
</web:ifBeanValue>
<web:ifBeanValue bean="frame.rb" property="getXMLStatus" value="2">
   <web:then>
   <web:ifFeature name="dhtml"><web:then>
   <web:scriptlet>
        if(typeof microstrategy != 'undefined') microstrategy.showAccordionWhileWaiting('td_mstrWeb_dockLeft', 'mstrWeb_dockLeft'); 
   </web:scriptlet>
   </web:then></web:ifFeature>
   </web:then>
</web:ifBeanValue>