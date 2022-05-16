<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.VIEW_DETT_REPORT%>"
	modelAttribute="profiliForm" method="post">

	<table class="w100">
		<tr>
			<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%>
				<table class="w100 cornice">
					<tr>
						<td colspan="2"><strong>Selezione Profilo</strong></td>
					</tr>

					<tr>
						<td class="w15 nowrap">Profilo</td>
						<td class="w85"><f:select path="codiProfilo" >
								<f:options items="${profiliForm.listProfili}" itemValue="value"
									itemLabel="label" />
							</f:select></td>
					</tr>
				</table></td>
		</tr>
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td class="w87"><input type="submit" value="Avanti"
							class="puls" /></td>

					</tr>
				</table> <br />
			</td>
		</tr>

		<%@ include file="/jsp/include/footer.jsp"%>
	</table>
</f:form>
</body>
</html>