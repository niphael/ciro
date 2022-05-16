<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %> 
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="display" uri="/WEB-INF/display-tag.tld"%>
<%@ taglib prefix="f" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="expires" content="now" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<title>SIE - Sistema Informativo Entrate</title>
<meta http-equiv="Content-Style-Type" content="text/css" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/style.css" type="text/css" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/displaytag-table.css"
	type="text/css" />
</head>
<body>
<table class="w100 bgcolor" cellpadding="0" cellspacing="0">	

<tr>	
			<td  width="100%" align="center">
				<table class="w100 bgcolor" cellpadding="0" cellspacing="0">
				<tr>
					
					<td class="width:196;">
						<img src="<%=request.getContextPath()%>/img/logo_sie.jpg"  />
					
		</td>
		<td class="w100">	
		<table cellpadding="0" cellspacing="0" width="100%">
		<tbody><tr>			<td>
		<table width="100%">			
<tbody><tr>
<td class="w80 alignTop" align="center">
&nbsp;	
				</td>
				<c:if test="${mstrConnectionParam.provenienza ne null}">
<td class="w20 mnulat" align="center">

<a href="${mstrConnectionParam.provenienza}" class="somm"><img src="<%=request.getContextPath()%>/img/torna_sie.png"  /></a> 

</td>
</c:if>
</tr>
</tbody>
</table>
		</td>
		</tr>
	<tr>	<td class="intestazione">					
<img src="../images/sie/spazio.gif" alt="" height="2" width="1"></td>	</tr>	
<tr>	<td class="intestazione">					
<img src="../images/sie/spazio.gif" alt="" height="2" width="1">	<br></td>	</tr>
<tr>		<td>			
<table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td class="titolo" align="right">
&nbsp;&nbsp;<c:if test="${mstrConnectionParam.provenienza eq null }">
						<a href="<%=request.getContextPath()%>/jsp/welcomePage.jsp">Home</a> |
						<a href="<%=request.getContextPath()%>/logout.jsp">Uscita </a>
						</c:if></td></tr></tbody></table></td>	
</tr>	
		</tbody>
		</table>
		</td></tr>
		
				<tr>
		<td><br>Utente connesso:<br> ${utente.userName}</td><td class="intestazione2"><br><i>${funzione.nomeFunzione}</i></td>
		</tr>
		</table>
		</td></tr>
				</table>
			</td>
		</tr>
		
	






</table>

