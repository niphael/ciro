<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>

<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.RIC_STAMPE_DA_ATTIVARE%>"
	modelAttribute="stampeForm" method="post">

	

	<table class="w100">
		
		<tr>
			<td>
				<table class="w100 cornice">
				
					<tr>
						<td colspan="2"><strong>Stampa</strong></td>
					</tr>

					<tr>
						<td class="w15 nowrap">Percorso</td>
						<td><f:select path="path">
								<f:options items="${stampeForm.listaStampe}" itemValue="value"
									itemLabel="label" />
							</f:select></td>
						
					</tr>
					<tr>
						<td class="w15 nowrap">Descrizione</td>
						<td><f:hidden path="codiStampa"/>
						<f:input path="descStampa" size="42" readonly="true"
								cssClass="descrizione" /> <input type="submit"
							class="buttoncerca" name="metodo" value="..."></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td class="w87"><input type="submit" value="Cerca" class="puls" name="metodo"/> </td>
							<td><input type="submit" value="Pulisci"
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