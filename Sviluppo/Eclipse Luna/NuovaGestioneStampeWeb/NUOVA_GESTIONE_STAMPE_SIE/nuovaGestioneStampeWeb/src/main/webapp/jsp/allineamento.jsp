<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action=""
	modelAttribute="baseForm" method="post">
	<table class="w100">
		 <tr>
		  						<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%></td>
	  						</tr>
		<tr>
			<td>
				<table class="w100 cornice">
			
					<tr>
						<td colspan="2"><strong>Per proseguire e' necessario effettuare l'allineamento tra la base dati e Microstrategy</strong><br><br></td>
					</tr>

					
					<tr>
						<td class=" w10 titolo" align="center"><a href="<%=request.getContextPath()%>/allineamentoStampe.html?metodo=allineamento" class="">
						Allineamento report</a></td><td></td>
					
					</tr>
				</table>
			</td>
		</tr>
		
		<%@ include file="/jsp/include/footer.jsp"%>

	</table>
</f:form>
</body>
</html>