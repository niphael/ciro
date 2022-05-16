<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.SALVA_DESTIN_REPORT%>"
	modelAttribute="inserimentoDestinatariForm" method="post">

	<table class="w100">
		<tr>
			<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%>
				</td>

		</tr>
		<tr>
		
						<td class="riepilogo">		
							
							<table>
							<tr>
								<td class="w15 "><b>Titolo Report</b></td>
								<td class="w35 ">${utenteDestinatario.titoloReport}</td>
								<td class="w15 ">&nbsp;</td>
								<td class="w35 ">&nbsp;</td>
							</tr>
							<tr>
								<td class="w15 "><b>Login Microstrategy</b></td>
								<td class="w35 ">${utenteDestinatario.loginMicrostrategy}</td>
								<td class="w15 "><b>Tipo Spedizione</b></td>
								<td class="w35 ">${utenteDestinatario.descTipoSpedizione}</td>
							</tr>		
							</table>
		
		
		
		</td>
		</tr>
		<tr>
			<td>
				<table class="w100 cornice">
					<tr>
						<td class="w15 nowrap">Destinatario</td>
						<td><f:input path="nome" size="50" maxlength="100"/> <input type="submit" class="buttoncerca" name="cercaDestinatario" value="..."></td>
						
					</tr>
					
					<tr>
						<td class="w15 nowrap">Email</td>
						<td><f:input path="email" size="50" maxlength="100" /></td>
						
					</tr>
					<tr>
						<td class="w15 nowrap">Amministrazione</td>
						<td><f:input path="amministrazione" size="50" maxlength="100" /> <input type="submit"
							class="buttoncerca" name="cercaAmministrazione" value="..."></td>
						
					</tr>
					<tr>
						<td class="w15 nowrap">Periodicita'</td>
						<td><f:select path="periodicita">
								<f:options items="${inserimentoDestinatariForm.listaPeriodicita}" itemValue="value"
									itemLabel="label" />
							</f:select></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table class="w100 cornice">
				
					<tr>
						<td class="w15 nowrap">Oggetto</td>
						<td><f:input path="oggetto" size="50" maxlength="500"  /></td>
					</tr>
					<tr>
						<td class="w15 nowrap">Testo</td>
						<td>
						<f:textarea path="testo" rows="4" cols="60"/>
					</tr>
					<tr>
						<td class="w15 nowrap">Note</td>
						<td><f:textarea path="note" rows="4" cols="60"/></td>
					</tr>
					
				</table>
			</td>
		</tr>
		
		
		
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td class="w87"><input type="submit" value="Salva"
							class="puls" name="metodo"/> <input type="submit" value="Ritorna"
							class="puls" name="metodo" /></td>
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