<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.CONFERMA_MOD_PROFILO_STAMPE%>"
	modelAttribute="modificaProfiloStampaForm" method="post">
	<table class="w100">
		<tr>
			<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%>
				</td>

		</tr>
		<c:if test="${ok ne null }">
<tr>
						<td>
							<table  class="cornice w100">
							<tr>
								<td><b>Operazione correttamente eseguita</b></td>
							</tr>
							</table>
						</td>
					</tr>
</c:if>
<%=  WebApplicationConstants.START_CRONOLOGICO %>
		<tr>
			<td>Le stampe contrassegnate con (Rs) sono Report Services
				<table class="w100 cornice">
				
					

					<tr>
						<td class="w15 nowrap"><b>Codice</b></td>
						<td>${profiloDaModificare.codi_pk_profilo}</td>
						
					</tr>
					<tr>
						<td class="w15 nowrap"><b>Descrizione</b></td>
						<td>>${profiloDaModificare.desc_profilo}</td>
					</tr>
					<tr>
						<td colspan="2"></td>
					</tr>
					<tr>
						<td colspan="2"></td>
					</tr>
					<tr>
					<td class="w15 nowrap" valign="top"><b>Stampe Abilitate</b></td>
					<td>
					<c:if test="${ not empty ( listaStampeModificaProdilo ) }">
					<table>
					<c:forEach items="${ listaStampeModificaProdilo }"  var="dAnagraficheStampeVO" varStatus="contatore">
								<tr> <td class="w50 description">${dAnagraficheStampeVO.object_path}</td>  	 <td class="w35 description">${dAnagraficheStampeVO.text_object_name}</td>  	
								</tr>
								</c:forEach>	
					</table>
					</c:if>
					
					</td>
					</tr>
				</table>
			</td>
		</tr>
			
		<%=  WebApplicationConstants.STOP_CRONOLOGICO %>
		<tr>
			<td>
				<table class="w100">
					<tr>
						<c:if test="${ok eq null }">
						<td class="w87"><input type="submit" value="Conferma"
							class="puls" name="metodo"/> <input type="submit" value="Indietro"
							class="puls" name="metodo" /></td>
							</c:if>
							<c:if test="${ok ne null }">
						<td class="w87"><input type="submit" value="Ok"
							class="puls" name="metodo"/></td>
							</c:if>
					
					</tr>
				</table> <br />
			</td>
		</tr>
		<%@ include file="/jsp/include/footer.jsp"%>

	</table>
</f:form>
</body>
</html>