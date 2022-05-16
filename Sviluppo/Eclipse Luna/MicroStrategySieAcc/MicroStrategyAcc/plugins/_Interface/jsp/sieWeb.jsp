<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<%@ page contentType="text/html; charset=UTF-8"
%><%@ page import="com.microstrategy.web.app.beans.PageComponent"
%><%PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");%>
<html>
<head>
<title><web:beanValue property="title" encode="true"/>. SIE</title>
</head>
<body>
<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("links")%>' flush="true"></jsp:include>
<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("header")%>' flush="true"></jsp:include>
 <jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("path")%>' flush="true"></jsp:include>

<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("dockTop")%>' flush="true"></jsp:include>
<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("dockLeft")%>' flush="true"></jsp:include>
<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("error")%>' flush="true"></jsp:include>
<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("content")%>' flush="true"></jsp:include>
<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("dockRight")%>' flush="true"></jsp:include>
<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("dockBottom")%>' flush="true"></jsp:include>
<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("footer")%>' flush="true"></jsp:include> 

</body>
</html>