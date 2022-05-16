<%
 /*
  * PDF_Options_Content.jsp
  * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
  */
%><%@ page errorPage="Error_Content.jsp"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%><table width="100%" border="0" cellspacing="0" cellpadding="0" >
<tr>
<td valign="top">
<%--Render the 'PDF Options' bean. Choose the style depending on the current group: --%>
<web:ifBeanValue bean="options" property="getCurrentGroupName" value="printHeaderFooter">
  <web:then>
   <web:displayBean bean="options" styleName="HeaderFooterOptionsStyle" />
  </web:then>
  <web:else>
    <web:ifBeanValue bean="options" property="getCurrentGroupName" value="pdfReportHeaderFooter">
      <web:then>
        <web:displayBean bean="options" styleName="PDFReportHeaderFooterStyle" />
      </web:then>
      <web:else>
 		<web:displayBean bean="options" styleName="PDFOptionsStyle" />
      </web:else>
    </web:ifBeanValue>
  </web:else>
</web:ifBeanValue>
</td>
</tr>
</table>
