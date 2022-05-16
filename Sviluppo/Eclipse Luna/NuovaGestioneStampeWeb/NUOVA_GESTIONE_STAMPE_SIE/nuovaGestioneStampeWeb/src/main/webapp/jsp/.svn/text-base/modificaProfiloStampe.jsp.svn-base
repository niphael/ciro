<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.MOD_PROFILO_STAMPE%>"
	modelAttribute="modificaProfiloStampaForm" method="post">
	<table class="w100">
		<tr>
			<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%>
				</td>

		</tr>
		<tr>
			<td>Le stampe contrassegnate con (Rs) sono Report Services
				<table class="w100 cornice">
				
					

					<tr>
						<td class="w15 nowrap">Codice</td>
						<td><f:input path="codiceProfilo" readonly="true"/></td>
						
					</tr>
					<tr>
						<td class="w15 nowrap">Descrizione</td>
						<td><f:input path="descrizioneProfilo" /></td>
					</tr>
				</table>
			</td>
		</tr>
			<tr>
		<td >
			<table border="0" width="100%">
				<tr>
					<td>
						<table border="0" width="100%" class="cornice" >
							<tr>
								<td><strong>Stampe abilitate </strong></td>
							</tr>
							<tr>
								<td valign="top">
									<table width="100%" summary="Elenco delle stampe abilitate">
										<tr>
										<th class="left w55">Percorso</th>
											<th class="left w85">Nome Stampa</th>
											<th class="w15">Seleziona</th>
										</tr>
										<c:if test="${ not empty ( listaStampeModificaProdilo ) }">
							
								<c:forEach items="${ listaStampeModificaProdilo }"  var="dAnagraficheStampeVO" varStatus="contatore">
								<tr> <td class="w50 description">${dAnagraficheStampeVO.object_path}</td>  	 <td class="w35 description">${dAnagraficheStampeVO.text_object_name}</td>  	
								<td class="checkbox w15"><f:checkbox path="listaStampe" value="${contatore.index}" id="check_${contatore.index}"/></td>
								</tr>
								</c:forEach></c:if>
										
										</table></td></tr>
										<tr>
								<td class="w87" align="right"><input type="submit" value="Cancella"
							class="puls" name="metodo"/><input type="submit" value="Aggiungi"
							class="puls" name="metodo"/></td>
							</tr>
							</table>
							</td></tr>
							
							</table></td></tr>

		
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td class="w87"><input type="submit" value="Salva"
							class="puls" name="metodo"/></td>
							<td><input type="submit" value="Ritorna"
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