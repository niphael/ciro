<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.SCHEDUL_REPORT_MSTR%>"
	modelAttribute="schedulazioneReportForm" method="post">

	<table border="0" class="w100">
		
			
							 <tr>
		  						<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%></td>
	  						</tr>
												
	  						<tr>
	  							<td>					
									<table border="0" class="w100" cellpadding="1" cellspacing="2">
									<tr>
										<td colspan="4">Le stampe contrassegnate con (Rs) sono Report Services</td>
									</tr>	
									<tr>
										<td colspan="4">

							   
							    <table width="100%" border="1" cellspacing="3" class="cornice">	
							     <tr>							   			
								   <th class="w50"><strong>Descrizione Stampa</strong></th>  
								   <th class="w40"><strong>Percorso</strong></th>									
								 </tr>
								<c:if test="${ not empty ( listaStampeSchedulabili ) }">
							
								<c:forEach items="${ listaStampeSchedulabili }"  var="codiceDescrizioneTO" varStatus="contatore">
								
								 <tr>								   			
								   <td ><strong><i><a href="<%=request.getContextPath()%>/schedReportMstr.html?metodo=schedula&stampa=${codiceDescrizioneTO.codice}" style="color: #000080" class="linkPager">${codiceDescrizioneTO.descrizione}</a></i></strong></td>
								   <td>${codiceDescrizioneTO.path}</td>  	
								 </tr>
								</c:forEach>
								</c:if>
								
								 </table></td></tr></table>
			
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td class="w87"> </td>
							<td align="right" >
							<input type="submit" value="Indietro"
							class="puls" name="metodo" />
							
							</td>
					</tr>
					
				</table> <br />
			</td>
		</tr>
		<%@ include file="/jsp/include/footer.jsp"%>

	</table>
</f:form>
</body>
</html>