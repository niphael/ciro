<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<%@ taglib uri="/WEB-INF/display-tag.tld" prefix="display"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.GEST_LISTA_PROFILO_STAMPE%>"
	modelAttribute="ricercaPerCodiceDescrizioneForm" method="post">

	<table class="w100">
		<tr>
			<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%>
<table class="w100 riepilogo">
					
					<tr>
						<td class="w25"><strong>Profilo da</strong>
							${parametriRicercaProfilo.codiProfiloDa}</td>
							<td class="w25"><strong>Profilo a</strong>
							${parametriRicercaProfilo.codiProfiloA}</td>
					</tr>
				
				</table>
			</td>

		</tr>
		<tr>
			<%
   						 boolean clear1Attribute = false;
   					if(request.getAttribute("clear1Status") != null) {
     				 clear1Attribute = true;
   						}
					%>
			<td><display:table
					requestURI="/gestProfiloStampe.html?metodo=scorriLista" id="item"
					name="${ listaProfiliStampe }" class="tableRicerca w100" pagesize="8"
					excludedParams="*" keepStatus="true" clearStatus="<%=clear1Attribute%>">
					<display:column property="codice" title="Codice Profilo"></display:column>
					<display:column property="descrizione" title="Descrizione Profilo"></display:column>
					<display:column title="Seleziona" class="alignCenter">
						<f:radiobutton path="indexSelezionato" value="${item_rowNum-1}" />
					</display:column>
				</display:table>
				<table class="w100">
					<tr>
						<td><input type="submit" value="Modifica"
							class="puls" name="metodo" /></td>
							<td class="alignRight"><input type="submit" value="Ritorna"
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