<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.INS_DESTIN_REPORT%>"
	modelAttribute="ricercaDestinatariForm" method="post">
	<table class="w100">
		<tr>
			<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%>
			</td>
		</tr>
		<tr>
			<td>
				<table class="w100 cornice">
			
					<tr>
						<td colspan="2"><strong>Filtro Stampe Schedulazione</strong></td>
					</tr>

					
					<tr>
						<td class="w15 nowrap">Titolo Report</td>
						<td><f:hidden path="codiceReport"/>
						<f:input path="descReport" size="42"
								 /> <input type="submit"
							class="buttoncerca" name="cercaTitolo" value="..."></td>
					</tr>
					<tr>
						<td class="w15 nowrap">Login Microstrategy</td>
						<td>
						<f:input path="loginMstr" size="42" 
								 /> <input type="submit"
							class="buttoncerca" name="cercaLogin" value="..."></td>
					</tr>
					<tr>
						<td class="w15 nowrap">Tipo Spedizione</td>
						<td>
						<f:select path="tipoSpedizione">
						<f:option value="N">Normale</f:option>
						<f:option value="P">PEC</f:option>
						</f:select>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td class="w87"><input type="submit" value="Avanti"
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