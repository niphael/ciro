<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.SCHEDUL_REPORT%>"
	modelAttribute="schedulazioneReportForm" method="post">
	<table class="w100">
		
		<tr>
			<td>
				<table class="w100 cornice">
			
					<tr>
						<td colspan="2"><strong>Filtro Stampe Schedulazione</strong></td>
					</tr>

					
					<tr>
						<td class="w15 nowrap">Titolo Report</td>
						<td><f:hidden path="codiceReport"/>
						<f:input path="descReport" size="42" cssClass="descrizione" /> <input type="submit"
							class="buttoncerca" name="metodo" value="..."></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td class="w87"><input type="submit" value="Cerca"
							class="puls" name="metodo"/> </td>
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