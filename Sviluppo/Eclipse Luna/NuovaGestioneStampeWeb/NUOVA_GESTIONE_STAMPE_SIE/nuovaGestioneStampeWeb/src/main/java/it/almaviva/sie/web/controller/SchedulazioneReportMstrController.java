/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.net.URLEncoder;

import it.almaviva.sie.business.model.ConnessioneMstrTO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.EsitoMstrTO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.model.VisualizzaStampaTO;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.service.MicrostrategyService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.web.form.SchedulazioneReportForm;
import it.almaviva.sie.web.form.StampeForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/schedReportMstr.html")
public class SchedulazioneReportMstrController {
	
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	@Autowired
	private MicrostrategyService service2;
	
	@RequestMapping(params="metodo=schedula")
	public String schedula(HttpServletRequest request, Model model, HttpSession session, @ModelAttribute SchedulazioneReportForm myForm,
			HttpServletResponse response)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  schedula della classe " +
						this.getClass().getName(),SchedulazioneReportMstrController.class);
		// Recupero id della stampa dalla request
		String codiceStampa = (String) request.getParameter("stampa");
		Utente utente = (Utente)sc.getObjectInSession(session, "utente");
		try{
			
			DAnagraficheStampeVO vo = service.getStampa(codiceStampa);
			VisualizzaStampaTO visualizzaStampa = new VisualizzaStampaTO();
			// Salvataggio del codice stampa richiesto
			visualizzaStampa.setCodiceStampa(vo.getCodi_pk_object_id());
			// Salvataggio della modalit� accessibile/non accessibile
			visualizzaStampa.setModalita("ACCESSIBILE");
			// Salvataggio dell'utente
			visualizzaStampa.setUserID(utente.getUserName());
			// Salvataggio della funzione
			//visualizzaStampa.setFunzioneInExe("GEST_SCHED_PROSP");
			visualizzaStampa.setModalitaAccesso("L");
			visualizzaStampa.setCodiceProfiloStampa(""+vo.getCodi_object_type());
			//imposto Parametri di connessione
			service2.impostaParametriConnessione();
			service2.checkUser(utente.getUserName(), utente.getUserName());
			ConnessioneMstrTO connessioneMstrTO = new ConnessioneMstrTO();
			if(sc.getObjectInSession(session, WebApplicationConstants.CONN_MSTR_SESSION)!=null)
			connessioneMstrTO=(ConnessioneMstrTO)sc.getObjectInSession(session, WebApplicationConstants.CONN_MSTR_SESSION);
			EsitoMstrTO result = service2.getProspetto(codiceStampa, ""+vo.getCodi_object_type(),connessioneMstrTO, utente.getUserName(),visualizzaStampa);
			EsitoMstrTO esito = null;
			if (result != null) {
				esito = (EsitoMstrTO) result;
				/*if (!esito.isEsitoCorretto()) {
					model.addAttribute("errore","Errore: "+esito.getMessaggio());
					myForm = (SchedulazioneReportForm)sc.getObjectInSession(session, "schedulazioneReportForm");
					model.addAttribute("schedulazioneReportForm",myForm);
					return "jsp/listaStampeSchedulabili";
				}*/
				connessioneMstrTO = esito.getConnessioneMstrTO();
				
				if (connessioneMstrTO != null){
					sc.putObjectInSession(session, WebApplicationConstants.CONN_MSTR_SESSION,connessioneMstrTO);
				}
				String url = esito.getUrlApi();
				String sessionId = connessioneMstrTO.getSessionID();
				String saveState = connessioneMstrTO.getSaveState();
				//Aggiungo il SaveState
				url+= saveState;
				
				// Aggiunta all'url del livello organizzativo
				//url += "&param1="+cifraParametri(esito.getLivOrg().getBytes("UTF-8"),sessionId.getBytes("UTF-8"),esito.getLivOrg());
				
				
				
				// Aggiunta all'url del parametro 
				// per il ritorno da Microstrategy al SIE
				String param2 = URLEncoder.encode(service2.getUrlStampeSie()+request.getContextPath()+"/gestSchedInvioReport.html?utente="+utente.getUserName()+"&funzione=GEST_SCHED_PROSP&descFunzione=Schedulazione invio Report","UTF-8");
				url += "&param2="+param2;
				response.sendRedirect(url);
			}
		
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), GestioneStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/listaStampeSchedulabili";
		}
		return null;
	}
	@RequestMapping(method = RequestMethod.POST,params="metodo=Indietro")
	public String indietro(HttpServletRequest request, Model model, HttpSession session,@ModelAttribute SchedulazioneReportForm myForm)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  indietro della classe " +
						this.getClass().getName(),SchedulazioneReportMstrController.class);
		//String codiProfilo=myForm.getCodiProfilo();
		myForm = (SchedulazioneReportForm)sc.getObjectInSession(session, "schedulazioneReportForm");
		model.addAttribute("schedulazioneReportForm",myForm);
		//rimuovo gli oggetti dalla sessione
		return "jsp/scegliReport";
	}
}
