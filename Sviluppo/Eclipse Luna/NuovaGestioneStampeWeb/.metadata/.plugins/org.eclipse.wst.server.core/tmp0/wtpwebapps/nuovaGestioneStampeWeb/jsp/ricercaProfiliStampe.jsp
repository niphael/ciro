<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.GEST_PROFILO_STAMPE%>"
	modelAttribute="gestioneProfiliStampeForm" method="post">

	<table class="w100">
		<tr>
			<td><br><%@ include file="/jsp/include/messaggioErrore.jsp"%>
				</td>

		</tr>
		<tr>
			<td>
				<table class="w100 cornice">
				
					<tr>
						<td colspan="2"><strong>Ricerca Generica</strong></td>
					</tr>

					<tr>
						<td class="w15 nowrap">Da Profilo</td>
						<td><f:select path="codiProfiloDa">
						<f:option value=" ">-</f:option>
								<f:options items="${gestioneProfiliStampeForm.listProfiliDa}" itemValue="value"
									itemLabel="label" />
							</f:select></td>
						
					</tr>
					<tr>
						<td class="w15 nowrap">A Profilo</td>
						<td><f:select path="codiProfiloA">
							<f:option value=" ">-</f:option>
								<f:options items="${gestioneProfiliStampeForm.listProfiliA}" itemValue="value"
									itemLabel="label" />
							</f:select></td>
					</tr>
				</table>
			</td>
		</tr>
<%-- 		<tr>
			<td>
				<table class="w100 cornice">
				
					<tr>
						<td colspan="2"><strong>Livello Organizzativo</strong></td>
					</tr>

					<tr>
						<td class="w15 nowrap">Nessuno</td>
						<td><f:radiobutton path="livelloOrganizzativo" value="Nessuno"/></td>
						
					</tr>
					<tr>
						<td class="w15 nowrap">Amministrazione</td>
						<td><f:radiobutton path="livelloOrganizzativo" value="Amministrazione"/></td>
						
					</tr>
					<tr>
						<td class="w15 nowrap">Provincia</td>
						<td><f:radiobutton path="livelloOrganizzativo" value="Provincia"/></td>
						<td>Provincia <f:input path="codiceRagioneria" maxlength="3" size="4"/>
						<f:input path="descrizioneRagioneria" size="42" readonly="true"
								cssClass="descrizione" /> <input type="submit"
							class="buttoncerca" name="cercaProvincia" value="..."></td>
						
					</tr>
					
					<tr>
						<td class="w15 nowrap">UCB</td>
						<td><f:radiobutton path="livelloOrganizzativo" value="UCB"/></td>
						<td>Codice UCB <f:input path="codiceUCB" maxlength="3" size="4"/>
						<f:input path="descrizioneUCB" size="42" readonly="true"
								cssClass="descrizione" /> <input type="submit"
							class="buttoncerca" name="metodo" value="..."></td>
						
					</tr>
				</table>
			</td>
		</tr>
		
		<tr>
			<td>
				<table class="w100 cornice">
				
					<tr>
						<td colspan="2"><strong>Stampa</strong></td>
					</tr>

					<tr>
						<td class="w15 nowrap">Nessuno</td>
						<td><f:radiobutton path="flagStampa" value="Nessuno"/></td>
						
					</tr>
					<tr>
						<td class="w15 nowrap">Stampa</td>
						<td><f:radiobutton path="flagStampa" value="Amministrazione"/></td>
						<td>Percorso <f:select path="codicePath">
								<f:options items="${gestioneProfiliStampeForm.listPath}" itemValue="value"
									itemLabel="label" />
							</f:select></td>
						
					</tr>
					<tr>
						<td class="w15 nowrap"></td>
						<td></td>
						<td>Descrizione<f:hidden path="codiceStampa"/>
						<f:input path="descrizioneStampa" size="42" readonly="true"
								cssClass="descrizione" /> <input type="submit"
							class="buttoncerca" name="metodo" value="..."></td>
						
					</tr>
					
				</table>
			</td>
		</tr> --%>
		
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td class="w87"><input type="submit" value="Cerca"
							class="puls" name="metodo"/></td>
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