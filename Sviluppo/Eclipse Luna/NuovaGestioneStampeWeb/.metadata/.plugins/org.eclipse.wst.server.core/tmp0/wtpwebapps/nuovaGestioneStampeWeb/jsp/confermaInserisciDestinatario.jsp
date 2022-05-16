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
						<td>${utenteDestinatario.destinatario}</td>
						
					</tr>
					
					<tr>
						<td class="w15 nowrap">Email</td>
						<td>${utenteDestinatario.email}</td>
						
					</tr>
					<tr>
						<td class="w15 nowrap">Amministrazione</td>
						<td>${utenteDestinatario.amministrazione}</td>
						
					</tr>
					<tr>
						<td class="w15 nowrap">Periodicita'</td>
						<td>${utenteDestinatario.descPeriodicita}</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table class="w100 cornice">
				
					<tr>
						<td class="w15 nowrap">Oggetto</td>
						<td>${utenteDestinatario.oggetto}</td>
					</tr>
					<tr>
						<td class="w15 nowrap">Testo</td>
						<td>
						${utenteDestinatario.testo}</td>
					</tr>
					<tr>
						<td class="w15 nowrap">Note</td>
						<td>${utenteDestinatario.testo}</td>
					</tr>
					
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
							class="puls" name="metodo"/> <input type="submit" value="Indietro"
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