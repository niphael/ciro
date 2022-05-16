<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.GESTIONE_STAMPE_PERSONALI%>"
	modelAttribute="stampeForm" method="post">

	<table class="w100">
	<tr>
	<td><br>Le stampe contrassegnate con (Rs) sono Report Services</td>
	</tr>
		<tr>
			<td><%@ include file="/jsp/include/messaggioErrore.jsp"%>
				<table class="w100 riepilogo">
					<tr>
						<td class="w25"><strong>Codice:</strong>
							${profilo.codi_pk_profilo}</td>
					</tr>
					<tr>
						<td class="w25"><strong>Livello organizzativo:</strong>
							${profilo.codi_livello_org}</td>
					</tr>
					<tr>
						<td class="w25"><strong>Provincia:</strong>
							${profilo.codi_ragioneria}</td>
					</tr>
				</table></td>

		</tr>
		<tr>
			<td>
			<br>
				<table class="w100 cornice">
					
					<tr>
						<td class="w15 nowrap">Percorso: </td>
						<td>${ path }</td>
						
						<td class="W40 alignRight">
                                 <input type="submit" value="Stampe abilitate"
							class="puls" name="metodo"/> 
							      
                                </td>
                       
					</tr>
						<tr>
								<td class="W20">&nbsp;</td>
								<td class="W80 alignRight" colspan="2">
								<f:radiobutton path="formato" value="accessibile"/>Formato Accessibile
								<f:radiobutton path="formato" value="modificabile"/>Formato Modificabile
								 <input type="submit" value="Imposta formato" class="puls" name="metodo"/>
								
								</td>
							</tr>
					<tr>
							   <td colspan="3">
							    <table class="w100 tableRicerca" border="1" cellspacing="0" cellpadding="0">	
							     <tr>							   			
								   <th class="w40"><strong>Nome</strong></th>
								   <th class="w60"><strong>Descrizione</strong></th>  
								   <th class="w30"><strong>Selezione</strong></th>									
								 </tr>
								<c:if test="${ not empty ( listaStampePersonali ) }">
							
								<c:forEach items="${ listaStampePersonali }"  var="reportMstrTO" varStatus="contatore">
								
								 <tr>								   			
								   <td ><strong><i><a href="<%=request.getContextPath()%>/gestioneStampePersonali.html?metodo=visualizzaStampaPersonale&stampa=${reportMstrTO.idReport}&formato=${formato}" style="color: #000080" class="linkPager">${reportMstrTO.nameReport}</a></i></strong></td>
								   <td>${reportMstrTO.descriptionReport}</td>  	
								   <td align="center"> <f:checkbox path="cancellazioneStampe" value="${contatore.index}" id="check_${contatore.index}"/></td>								
								 </tr>
								</c:forEach>
								</c:if>
								
								 </table></td></tr>
				
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table class="w100">
					<tr>

						<td class="w87"><input type="submit" value="Ritorna"
							class="puls" name="metodo" /> </td>
							<td align="right" >
							<input type="submit" value="Elimina Stampe Personali"
							class="puls" name="metodo" />
							
							</td>
					</tr>
					
				</table> <br />
			</td>
		</tr>
		<%@ include file="/jsp/include/footer.jsp"%>

	</table>
</f:form>
</body>
</html>