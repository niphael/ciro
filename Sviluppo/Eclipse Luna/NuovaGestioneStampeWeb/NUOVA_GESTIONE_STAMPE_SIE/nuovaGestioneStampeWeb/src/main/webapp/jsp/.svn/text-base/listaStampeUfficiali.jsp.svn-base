<%@page import="it.almaviva.sie.web.util.WebApplicationConstants"%>
<%@ include file="/jsp/include/header.jsp"%>
<f:form
	action="<%=request.getContextPath() + WebApplicationConstants.GESTIONE_STAMPE%>"
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
			<td><br>
				<table class="w100 cornice">
					
					<tr>
						<td class="w15 nowrap">Percorso: </td>
						<td>${ path }</td>
						
						<td class="W40 alignRight">
                                 <input type="submit" value="Stampe abilitate"
							class="puls" name="metodo"/> 
							      <input type="submit" value="Stampe personali"
							class="puls" name="metodo"/>
                                </td>
                       
					</tr>
					<c:if test="${ not empty ( listaReport ) }">
						<tr>
								<td class="W20">&nbsp;</td>
								<td class="W80 alignRight" colspan="2">
								<f:radiobutton path="formato" value="accessibile"/>Formato Accessibile
								<f:radiobutton path="formato" value="modificabile"/>Formato Modificabile
								 <input type="submit" value="Imposta formato" class="puls" name="metodo"/>
								
								</td>
							</tr>
							</c:if>
					<tr>
							   <td colspan="3">
							    <table class="w100 tableRicerca" border="1" cellspacing="0" cellpadding="0">	
							     <tr>							   			
								   <th class="w40"><strong>Nome</strong></th>
								   <th class="w60"><strong>Descrizione</strong></th>  									
								 </tr>
								<c:if test="${ not empty ( listaCartelle ) }">
								<c:forEach items="${ listaCartelle }"  var="codiceDescrizioneTO" varStatus="contatore" >
								
								 <tr>								   			
								   <td class="w40"><strong><i><a href="<%=request.getContextPath()%>/gestioneStampe.html?metodo=visualizzaStampe&path=>>${codiceDescrizioneTO.codice}&nome=${codiceDescrizioneTO.codice}" style="color: #000080" class=linkPager">${codiceDescrizioneTO.codice}</a></i></strong></td>
								   <td class="w60">${codiceDescrizioneTO.descrizione}</td>  									
								 </tr>
								</c:forEach>
								</c:if>
									<c:if test="${ not empty ( listaStampe ) }">
								<c:forEach items="${ listaStampe }"  var="codiceDescrizioneTO" varStatus="contatore" >
								
								 <tr>								   			
								   <td class="w40"><strong><i>
								   <a href="<%=request.getContextPath()%>/gestioneStampe.html?metodo=visualizzaStampe&path=${codiceDescrizioneTO.path}&nome=${codiceDescrizioneTO.descrizione}" style="color: #000080" class=linkPager">${codiceDescrizioneTO.descrizione}</a>
								  
								  </i></strong></td>
								   <td class="w60">${codiceDescrizioneTO.descrizioneObject}</td>  									
								 </tr>
								</c:forEach>
								</c:if>
								
									<c:if test="${ not empty ( listaReport ) }">
								<c:forEach items="${ listaReport }"  var="codiceDescrizioneTO" varStatus="contatore" >
								
								 <tr>								   			
								   <td class="w40"><strong><i>
								      <a href="<%=request.getContextPath()%>/gestioneStampe.html?metodo=visualizzaStampa&stampa=${codiceDescrizioneTO.codice}&formato=${formato}" style="color: #000080" class=linkPager">${codiceDescrizioneTO.descrizione} </a>
								  </i></strong></td>
								   <td class="w60">${codiceDescrizioneTO.descrizioneObject}</td>  									
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
					</tr>
				</table> <br />
			</td>
		</tr>
		<%@ include file="/jsp/include/footer.jsp"%>

	</table>
</f:form>
</body>
</html>