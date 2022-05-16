<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.CONFERMA_ATTIVAZ_STAMPE%>"
	modelAttribute="inserisciStampaForm" method="post">
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
						<td colspan="2"></td>
					</tr>
					<tr>
						<td colspan="2"></td>
					</tr>
				
				
					<c:if test="${ not empty ( listaStampeDaAttivare ) }">
						<tr>
						<td class="w15 nowrap" valign="top"><b>Stampe Abilitate</b></td>
					<td>
					<table>
					<c:forEach items="${ listaStampeDaAttivare }"  var="dAnagraficheStampeVO" varStatus="contatore">
								<tr> <td class="w35 description">${dAnagraficheStampeVO.object_path}</td>  	 <td class="w50 description">${dAnagraficheStampeVO.text_object_name}</td>  	
								</tr>
								</c:forEach>	
					</table>
							</td>
								</tr>
					</c:if>
					
			
				
					
					<c:if test="${ not empty ( listaStampeDaDisattivare ) }">
					<tr>
					<td class="w15 nowrap" valign="top"><b>Stampe Disabilitate</b></td>
					<td>
					<table>
					<c:forEach items="${ listaStampeDaDisattivare }"  var="dAnagraficheStampeVO" varStatus="contatore">
								<tr> <td class="w35 description">${dAnagraficheStampeVO.object_path}</td>  	 <td class="w50 description">${dAnagraficheStampeVO.text_object_name}</td>  	
								</tr>
								</c:forEach>	
					</table>
						</td>
					</tr>
					</c:if>
					
				
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
							class="puls" name="metodo"/> </td><td align="right"><input type="submit" value="Annulla"
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