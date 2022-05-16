<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.AGGIUNGI_STAMPE%>"
	modelAttribute="inserisciStampaForm" method="post">
	<table class="w100">
		<tr>
			<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%>
				</td>

		</tr>
		<tr>
			<td>Le stampe contrassegnate con (Rs) sono Report Services
				<table class="w100 riepilogo">
					<tr>
						<td class="w25"><strong>Codice:</strong>
							${profilo.codi_pk_profilo}</td>
					</tr>
					<tr>
						<td class="w25"><strong>Descrizione</strong>
							${profilo.desc_profilo}</td>
					</tr>
					
				</table>
			</td>
		</tr>
			<tr>
		<td >
			<table border="0" width="100%">
				<tr>
					<td>
						<table width="100%" class="cornice" >
							
							<tr>
								<td valign="top">
									<table width="100%"  border="1" summary="Elenco delle stampe abilitate">
										<tr>
										<th class="left w55">Percorso</th>
											<th class="left w85">Nome Stampa</th>
											<th class="w15">Seleziona</th>
										</tr>
										<c:if test="${ not empty ( listaStampeTotale ) }">
							
								<c:forEach items="${ listaStampeTotale }"  var="dAnagraficheStampeVO" varStatus="contatore">
								<tr> <td class="w50 description">${dAnagraficheStampeVO.object_path}</td>  	 <td class="w35 description">${dAnagraficheStampeVO.text_object_name}</td>  	
								<td class="checkbox w15">
								<c:if test="${dAnagraficheStampeVO.selected ne null}">
								<f:checkbox path="indexSelezionati" value="${contatore.index}" id="check_${contatore.index}" disabled="true" />
								</c:if>
								<c:if test="${dAnagraficheStampeVO.selected eq null}">
								<f:checkbox path="indexSelezionati" value="${contatore.index}" id="check_${contatore.index}"/>
								</c:if>
								</td>
								</tr>
								</c:forEach></c:if>
										
										</table></td></tr>
										
							</table>
							</td></tr>
							
							</table></td></tr>

		
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td ><input type="submit" value="Inserisci"
							class="puls" name="metodo"/><input type="submit" value="Inserisci Tutti"
							class="puls" name="metodo"/></td>
							<td align="right">
							<input type="submit" value="Pulisci"
							class="puls" name="metodo"/>
							<input type="submit" value="Annulla"
							class="puls" name="metodo"/></td>
					</tr>
				</table> <br />
			</td>
		</tr>
		<%@ include file="/jsp/include/footer.jsp"%>

	</table>
</f:form>
</body>
</html>