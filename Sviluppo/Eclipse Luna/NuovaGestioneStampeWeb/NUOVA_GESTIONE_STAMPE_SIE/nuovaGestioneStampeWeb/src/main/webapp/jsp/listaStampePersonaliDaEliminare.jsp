<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.GESTIONE_STAMPE_PERSONALI%>"
	modelAttribute="stampeForm" method="post">

	<table class="w100">
		<tr>
			<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%>
				<table class="w100 riepilogo">
					<tr>
						<td class="w25"><strong>Codice:</strong>
							${profilo.codi_pk_profilo}</td>
					</tr>
					<tr>
						<td class="w25"><strong>Livello organizzativo:</strong>
							${profilo.codi_livello_org}</td>
					</tr>
					<tr>
						<td class="w25"><strong>Provincia:</strong>
							${profilo.codi_ragioneria}</td>
					</tr>
				</table></td>

		</tr>
		<tr>
			<td><br>
				<table class="w100 cornice">
					
					<tr>
								<td class="w20">&nbsp;</td>
								<td class="w80">&nbsp; </td>
							</tr>
							<tr>
								<td colspan="2"><strong>Stampe personali da eliminare:</strong></td>
							</tr>
					
						<c:if test="${ not empty ( listaStampePersonaliDaEliminare ) }">
							
								<c:forEach items="${ listaStampePersonaliDaEliminare }"  var="reportMstrTO" varStatus="contatore">
								
								 <tr>								   			
								   <td ><strong><i>${reportMstrTO.nameReport}</i></strong></td>
								   <td>${reportMstrTO.descriptionReport}</td>  	
								 </tr>
								</c:forEach>
								</c:if>
							
				
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td class="w87"><input type="submit" value="Annulla"
							class="puls" name="metodo" /> </td>
							<td align="right" >
							<input type="submit" value="Conferma"
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