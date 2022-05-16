<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
	<f:form action="<%=request.getContextPath() + WebApplicationConstants.VIEW_DETT_REPORT%>" modelAttribute="stampeForm"  method="post" >
	
		<table class="w100">
		<tr><td class="w20">Utente connesso:${utente.userName} </td>
		</tr><tr>
		<td class="intestazione2">Gestione Stampe</td>
		</tr>
		<tr>
		<td>
		<%@ include file="/jsp/include/messaggioErrore.jsp"%>
		<table class="w100 riepilogo">
		<tr>
		<td class="w25">
		<strong>Codice:</strong> ${profilo.codi_pk_profilo}
		</td>
		</tr>
		<tr>
		<td class="w25">
		<strong>Livello organizzativo:</strong> ${profilo.codi_livello_org}
		</td>
		</tr>
		<tr>
		<td class="w25">
		<strong>Provincia:</strong> ${profilo.codi_ragioneria}
		</td>
		</tr>
		</table>
		</td>
		
		</tr>
			<tr>
			<td>
		<table  class="w100 cornice" >
					<tr>
						<td colspan="2"> <strong>Filtro Stampe</strong></td>
					</tr>
						
						<tr>
							<td class="w15 nowrap">Percorso</td>							
							<td >
							<f:select path="codiStampa"><f:options items="${stampeForm.listaStampe}" itemValue="value" itemLabel="label" /></f:select>
	                  	</td>
							<td>
						<input type="submit" value="Stampe abilitate"  class="puls"/>
						<input type="submit" value="Stampe personali"  class="puls"/>
							</td>
						</tr>
						<tr>
							<td class="w15 nowrap">Descrizione</td>							
							<td>
							<f:input path="descStampa" size="42" readonly="true" cssClass="descrizione"/>
							<input type="submit" class="buttoncerca" name="metodo" value="...">
							                  	</td>
	                  	</tr>
					</table>
					</td></tr>
		<tr>
					<td>
					<table class="w100">
						<tr>

							<td class="w87">
							
							<input type="submit" value="Avanti"  class="puls"/>
							
							<input type="submit" value="Indietro"  class="puls" name="metodo" />
						</td>
						</tr>
					</table>

					<br />
					</td>
				</tr>
	<%@ include file="/jsp/include/footer.jsp"%>
	
	</table>
	</f:form>
		</body>
		</html>