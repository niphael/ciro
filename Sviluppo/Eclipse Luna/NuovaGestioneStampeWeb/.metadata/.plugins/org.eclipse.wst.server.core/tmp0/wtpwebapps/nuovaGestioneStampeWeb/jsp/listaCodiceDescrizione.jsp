<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<%@ taglib uri="/WEB-INF/display-tag.tld" prefix="display"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.RICERCA_CODICE_DESCRIZIONE%>"
	modelAttribute="ricercaPerCodiceDescrizioneForm" method="post">

	<table class="w100">
		<tr>
			<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%>

			</td>

		</tr>
		
		<tr>
			<td>
				<table class="w100 cornice">
					
					<tr>
						<td class="alignTop"><table class="w100" border="0">
						<tr><td colspan="4">Ricerca ${ parametri.tipologiaRicerca }</td></tr>
								<tr>
									<td ><label for="codice">Codice</label></td>
									<td ><f:input path="codice" size="30" /></td>
									<td ><label for="descrizione">Descrizione</label></td>
									<td ><f:input path="descrizione" size="30" /></td>
								</tr>
							</table></td>
					</tr>
				</table>
				<table class="w100" border="0">
					<tr>
						<td class="alignLeft"><input type="submit" value="Cerca"
							class="puls" name="metodo" /></td>
						<td class="alignRight"><input type="submit" value="Ritorna"
							class="puls" name="metodo" /></td>
					</tr>
				</table>
			</td>
		</tr>

		<tr>
			<td><display:table
					requestURI="/ricercaCodiceDescrizione.html?metodo=scorriLista" id="item"
					name="${ listaCodiceDescrizione }" class="tableRicerca w100" pagesize="8"
					excludedParams="*">
					<display:column property="codice" title="Codice"></display:column>
					<display:column property="descrizione" title="Descrizione"></display:column>
					<display:column title="Seleziona" class="alignCenter">
						<f:radiobutton path="indexSelezionato" value="${item_rowNum-1}" />
					</display:column>
				</display:table>
				<table class="w100">
					<tr>
						<td class="alignRight"><input type="submit" value="Inserisci"
							class="puls" name="metodo" /></td>
					</tr>
				</table></td>
		</tr>
		<tr>
			<td><br /></td>
		</tr>
		<%@ include file="/jsp/include/footer.jsp"%>

	</table>
</f:form>
</body>
</html>