<%@ include file="/jsp/include/headerHome.jsp"%>
<table class="w100">
	<tr>
	<td class="w25">
	 <table>
	 
	 <c:if test="${ not empty ( listaFunzioni ) }">
								<c:forEach items="${ listaFunzioni }"  var="dAnagraficaVociMenuVO" varStatus="contatore" >
								 <tr>
	  <td class="titolopuls">
	  <a href="<%=request.getContextPath()%>${dAnagraficaVociMenuVO.TEXT_NEW_URL}?utente=${utente.userName}&funzione=${dAnagraficaVociMenuVO.CODI_PK_VOCE_MENU}&descFunzione=${dAnagraficaVociMenuVO.DESC_DESCRIZIONE_VOCE}"><b>${dAnagraficaVociMenuVO.DESC_DESCRIZIONE_VOCE}</b></a>
	 </td>
	 </tr>
							
								</c:forEach>
								</c:if>
	 
	 
	
	 </table>

	
	</td>
	<td align="left">
	<table>
	<tr>
	
	<td  align="left">
	In Stampe Sie sono disponibili tutte le Stampe del SIE. 
	L'accesso e' organizzato in cartelle (contesti di analisi) che raggruppano i principali temi della gestione delle entrate quali Registro contabile, 
	Quietanze erariali, Parifica del versato, Capitoli di entrata, Consuntivo, Versamenti diretti ed ex SAC, Debitori diretti, Ruoli, Versato regione Sicilia. 
	Sono disponibili prospetti predefiniti ottenibili applicando alcuni filtri di selezione. 
	I prospetti sono fruibili anche nel formato excel, nel rispetto delle regole previste dalla normativa sull'accessibilita'. 
	E' data inoltre la possibilita' agli utenti di realizzare report personali, seguendo percorsi guidati, che suggeriscono la scelta di alcune opzioni e 
	forniscono un risultato in forma tabellare.
	I dati ottenuti a video possono essere fruiti in formato excel o pdf.
	</td>
	
	</tr>
	</table>
	
	
	
	</td>
	
	
	</tr>
		
<tr>
	<td colspan="3" class="mnulat alignCenter">
		<table class="alignCenter" border="0" cellspacing="0" cellpadding="1">
			<tr>
				<td class="alignCenter">Sistema Informativo della Ragioneria
					Generale dello Stato</td>
				<td><img src="<%=request.getContextPath()%>/img/logo_rep.gif"
					alt="" style="" /></td>
			</tr>
		</table>
	</td>

</tr>
</table>
</body>
</html>