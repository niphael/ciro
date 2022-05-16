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
				<table width="100%" height="70px" border="0" cellspacing="0" cellpadding="0">
				<tr>
					
					<td align="center" valign="top" >
						<img src="<%=request.getContextPath()%>/img/logo_sie.jpg"  />
							
						</td>
					<td class="w90" align="left" valign="bottom" class="banner">
					<c:if test="${mstrConnectionParam.simulazione ne null}">
						
			<table border="0" class="w100">
			  <tr>
				  <td class="termina_simul" align="center"><a href="${mstrConnectionParam.provenienza}/protected/terminaSimulazione.do?azione=inizializza" class="somm2" >Termina Simulazione
                  </a></td>
		      </tr>	
			</table>
		</c:if><table width="100%" border="0" cellpadding="0" >
				<tr>
					<th align="right" class="titolo">
						<c:if test="${mstrConnectionParam.provenienza ne null}">
						<a href="http://${mstrConnectionParam.ip_server_sie}:${mstrConnectionParam.porta_server_sie}/sie">Torna a SIE</a> 
						</c:if>
						<c:if test="${mstrConnectionParam.provenienza eq null }">
						<a href="<%=request.getContextPath()%>/logout.jsp">Uscita </a>
						</c:if>
						</th>
				</tr>
				</table>	
						
					</td>
				</tr>
				</table>
			</td>
		</tr>
		<tr><td width="100%">
		<table>
		<tr>
		<td class="w30">Utente connesso:<br> ${utente.userName}</td>
		</tr>
		</table>
		</td></tr>
	






</table>

