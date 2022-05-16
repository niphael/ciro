package it.almaviva.sie.web.util;

import javax.servlet.http.HttpSession;

import it.almaviva.sie.business.util.TraceLogger;

public class SessionContainer {
	public Object getObjectInSession(HttpSession session, String attributo){
		TraceLogger.traceLog(TraceLogger.getDEBUG(), " ricerca oggetto '" + attributo + "' in sessione ", SessionContainer.class);
		return session.getAttribute(attributo);

	}
	
	public void removeObjectFromSession(HttpSession session, String attributo){
		session.removeAttribute(attributo);
		TraceLogger.traceLog(TraceLogger.getDEBUG(), " Rimosso oggetto '" + attributo + "' in sessione ", SessionContainer.class);

	}	
	
	public void putObjectInSession(HttpSession session, String attributo, Object obj){
		session.setAttribute(attributo,obj);
		TraceLogger.traceLog(TraceLogger.getDEBUG(), " Inserito oggetto '" + attributo + "' in sessione ", SessionContainer.class);

	}
	
	public void cleanSessione(HttpSession session){
		removeObjectFromSession(session,"profilo");
		removeObjectFromSession(session,"utente");
		removeObjectFromSession(session,"profiliForm");
		removeObjectFromSession(session,"stampeForm");
		removeObjectFromSession(session,"gestioneProfiliStampeForm");
		removeObjectFromSession(session,"reportForm");
		removeObjectFromSession(session,"schedulazioneReportForm");
		removeObjectFromSession(session,"inserimentoDestinatariForm");
		removeObjectFromSession(session,"inserisciStampaForm");
		removeObjectFromSession(session,"modificaProfiloStampaForm");
		removeObjectFromSession(session,"ricercaDestinatariForm");
		removeObjectFromSession(session,"ricercaPerCodiceDescrizioneForm");
		removeObjectFromSession(session,WebApplicationConstants.LISTA_STAMPE);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_PROFILI);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_DESTINATARI);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_AMMINISTRAZIONI);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_LOGIN_MSTR);
		removeObjectFromSession(session,WebApplicationConstants.CODICE_STAMPA);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_CODICE_DESCRIZIONE);
		removeObjectFromSession(session,WebApplicationConstants.UTENTE_DESTINATARIO);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_PERIODICITA);
		removeObjectFromSession(session,WebApplicationConstants.CRONOLOGICO_ON);
		removeObjectFromSession(session,WebApplicationConstants.START_CRONOLOGICO);
		removeObjectFromSession(session,WebApplicationConstants.STOP_CRONOLOGICO);
		removeObjectFromSession(session,WebApplicationConstants.SAVE_CRONOLOGICO);
		removeObjectFromSession(session,WebApplicationConstants.HTML_CRONOLOGICO);
		removeObjectFromSession(session,WebApplicationConstants.OPERATION_ID);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_PROFILI_COMBO);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_STAMPE_MODIFICA_PROFILO);
		removeObjectFromSession(session,WebApplicationConstants.PROFILO_DA_MODIFICARE);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_STAMPE_TOTALE);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_PERCORSI);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_STAMPE_ATTIVE);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_STAMPE_DA_ATTIVARE);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_STAMPE_DA_DISATTIVARE);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_CARTELLE);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_STAMPE_SCHEDULABILI);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		removeObjectFromSession(session,WebApplicationConstants.PATH);
		removeObjectFromSession(session,WebApplicationConstants.FORMATO);
		removeObjectFromSession(session,WebApplicationConstants.FUNZIONE);
		removeObjectFromSession(session,WebApplicationConstants.CONN_MSTR_SESSION);
		removeObjectFromSession(session,WebApplicationConstants.PARAMETRI_RICERCA);
		removeObjectFromSession(session,WebApplicationConstants.PARAMETRI_RICERCA_PROFILO);
		removeObjectFromSession(session,WebApplicationConstants.LISTA_PROFILI_STAMPE);

	}
}
