/**
 * 
 */
package it.almaviva.sie.web.controller;

import it.almaviva.sie.business.model.ConnessioneMstrTO;
import it.almaviva.sie.business.model.EsitoMstrTO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.model.ReportMstrTO;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.model.VisualizzaStampaTO;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.service.MicrostrategyService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.web.form.ProfiliForm;
import it.almaviva.sie.web.form.StampeForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/gestioneStampePersonali.html")
public class GestioneStampePersonaliController {
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	@Autowired
	private MicrostrategyService service2;
	
	@RequestMapping(params="metodo=visualizzaStampaPersonale")
	public String visualizzaStampaPersonale(HttpServletRequest request, Model model, HttpSession session, @ModelAttribute StampeForm myForm,
			HttpServletResponse response)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  visualizzaStampaPersonale della classe " +
						this.getClass().getName(),GestioneStampeController.class);
		// Recupero id della stampa dalla request
		try{
		String codiceStampa = (String) request.getParameter("stampa");
		//String codiProfilo=myForm.getCodiProfilo();
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		Utente utente = (Utente)sc.getObjectInSession(session, "utente");
		String userName = null;
		ReportMstrTO stampa = null;
		ArrayList listaStampe=(ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		for (int i = 0; i < listaStampe.size(); i++) {
			stampa = (ReportMstrTO)listaStampe.get(i);
			if (stampa.getIdReport().equals(codiceStampa))
			break;
			}
		// Creazione di un oggetto contenente le informazioni
		// raccolte dalla sessione utente e dalla scelta fatta
		// dall'utente nelle pagine precedenti
		VisualizzaStampaTO visualizzaStampa = new VisualizzaStampaTO();
		//	Salvataggio del codice profilo di stampa
		visualizzaStampa.setCodiceProfiloStampa(
			p.getCodi_pk_profilo());

		// Salvataggio del codice stampa richiesto
		visualizzaStampa.setCodiceStampa(codiceStampa);
		visualizzaStampa.setNomeStampa(stampa.getNameReport());
		visualizzaStampa.setDescStampa(stampa.getDescriptionReport());
		
		// Salvataggio della modalit� accessibile/non accessibile
		visualizzaStampa.setModalita((String) request.getParameter("formato"));
		
		// Salvataggio dell'utente
		visualizzaStampa.setModalitaAccesso("M");
						 
		// Salvataggio dell'utente
		visualizzaStampa.setUserID(utente.getUserName());
	
		// Salvataggio della funzione
		visualizzaStampa.setCodiceFunzioneInExe("GEST_STAMPE");
		//imposto Parametri di connessione
		service2.impostaParametriConnessione();
		// Controllo se l'utente � abilitato alla visualizzazione delle stampe
		// Utente abilitato a salvare le stampe
		if (utente.getFlagMstrSave() == 1){
		//userName = user.getCognome() + "." + user.getNome();
		if (utente.getIsSimulante() != null && utente.getIsSimulante().booleanValue())
			userName = utente.getUtenteSimulato();
			else
			userName = utente.getUserName();
		}
		service2.checkUser(userName,userName);
		ConnessioneMstrTO connessioneMstrTO = new ConnessioneMstrTO();
		if(sc.getObjectInSession(session, WebApplicationConstants.CONN_MSTR_SESSION)!=null)
			connessioneMstrTO=(ConnessioneMstrTO)sc.getObjectInSession(session, WebApplicationConstants.CONN_MSTR_SESSION);
		EsitoMstrTO esito = service2.getStampa(codiceStampa, connessioneMstrTO, utente.getUserName()+ " StampePersonali",visualizzaStampa);
		String modalitaAccesso = visualizzaStampa.getModalita();
		String url = null;
		// Se � stata richiesta una stampa accessibile
		if (!Util.isEmpty(modalitaAccesso)
			&& modalitaAccesso.equals("accessibile")) {
			// Estrazione dell'url per la stampa accessibile
			url = esito.getUrlApiAcc()+ stampa.getUrlAccReport();
		}
		// Se � stata richiesta una stampa non accessibile
		else {
			//	Estrazione dell'url per la stampa non accessibile
			url = esito.getUrlApi() + stampa.getUrlReport();
		}
		if (!esito.isEsitoCorretto()) {
			model.addAttribute("errore","Errore: "+esito.getMessaggio());
			return "jsp/listaStampePersonali";
		}
		connessioneMstrTO = (ConnessioneMstrTO)esito.getConnessioneMstrTO();
		sc.putObjectInSession(session, WebApplicationConstants.CONN_MSTR_SESSION,connessioneMstrTO);
		String sessionId = connessioneMstrTO.getSessionID();
		String saveState = connessioneMstrTO.getSaveState();
		//Aggiungo il SaveState
		url+= saveState;
		// Aggiunta all'url del livello organizzativo
		url += "&param1="+Util.cifraParametri(esito.getLivOrg().getBytes("UTF-8"),sessionId.getBytes("UTF-8"),esito.getLivOrg());
		// Aggiunta all'url del parametro 
		// per il ritorno da Microstrategy al SIE
				//String param2 = URLEncoder.encode(ip.getHostAddress()+request.getContextPath()+"/gestioneStampe.htm?metodo=init","UTF-8");
		String param2 = URLEncoder.encode(service2.getUrlStampeSie()+request.getContextPath()+"/gestioneStampe.html?metodo=Stampe personali&formato="+modalitaAccesso,"UTF-8");
		url += "&param2="+param2+"&utenteStampe="+utente.getUserName();
		response.sendRedirect(url);
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), GestioneStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/listaStampePersonali";
		}
		return null;
	}
	
	@RequestMapping(params="metodo=Imposta formato")
	public String impostaFormato(HttpServletRequest request, Model model, HttpSession session,@ModelAttribute StampeForm myForm)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  impostaFormato della classe " +
						this.getClass().getName(),RicercaStampeController.class);
		sc.putObjectInSession(session, WebApplicationConstants.FORMATO, myForm.getFormato());
		return "jsp/listaStampePersonali";
		}
	
	
	@RequestMapping(params="metodo=Elimina Stampe Personali")
	public String eliminaStampePersonali(Model model,HttpServletRequest req, @ModelAttribute StampeForm myForm, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  eliminaStampePersonali della classe " +
						this.getClass().getName(),GestioneStampeController.class);
		ArrayList listaStampe=(ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		ArrayList listaStampePersonali=new ArrayList();
		if(myForm.getCancellazioneStampe()==null || myForm.getCancellazioneStampe().size()==0){
			model.addAttribute("errore","Selezionare almeno una stampa da eliminare");
			return "jsp/listaStampePersonali";
		}
		
		for (int i = 0; i < myForm.getCancellazioneStampe().size(); i++) {
			listaStampePersonali.add(listaStampe.get(Integer.parseInt((String)myForm.getCancellazioneStampe().get(i))));
		}	
		
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE, listaStampePersonali);
		sc.putObjectInSession(session, "stampeForm", myForm);
		return "jsp/listaStampePersonaliDaEliminare";
	}
	
	@RequestMapping(params="metodo=Annulla")
	public String annulla(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  annulla della classe " +
						this.getClass().getName(),GestioneStampeController.class);
		StampeForm myForm = (StampeForm)sc.getObjectInSession(session, "stampeForm");
		model.addAttribute("stampeForm",myForm);
		return "jsp/listaStampePersonali";
	}
	
	@RequestMapping(params="metodo=Conferma")
	public String conferma(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  conferma della classe " +
						this.getClass().getName(),GestioneStampeController.class);
		Utente utente = (Utente)sc.getObjectInSession(session, "utente");
		String userName=utente.getUserName();
		// Controllo se l'utente � abilitato alla visualizzazione delle stampe
		// Utente abilitato a salvare le stampe
		if (utente.getFlagMstrSave() == 1){
		//userName = user.getCognome() + "." + user.getNome();
		if (utente.getIsSimulante() != null && utente.getIsSimulante().booleanValue())
			userName = utente.getUtenteSimulato();
			else
			userName = utente.getUserName();
		}
		//Controllo tutte le stampe personali associate su Mstr 
        //Utente abilitato a salvare le stampe
		ArrayList listaDaCanc = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		try{
			//richiamo metodo che cancella stamper personali
			service2.cancellaStampePersonali(listaDaCanc, userName);
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), GestioneStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/listaStampePersonaliDaEliminare";
		}
		
		model.addAttribute("ok","Operazione correttamente eseguita");
		//String codiProfilo=myForm.getCodiProfilo();
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		StampeForm myForm = (StampeForm)sc.getObjectInSession(session, "stampeForm");
		myForm.setListaStampe(p.getListaStampe());
		model.addAttribute("stampeForm",myForm);
		return "jsp/listaReport";
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String init2(HttpServletRequest request, Model model, @ModelAttribute ProfiliForm myForm, HttpSession session )
			throws ApplicationException {
		return ritorna(request, model, session);
		
	}
	@RequestMapping(method = RequestMethod.POST,params="metodo=Ritorna")
	public String ritorna(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ritorna della classe " +
						this.getClass().getName(),RicercaStampeController.class);
		//String codiProfilo=myForm.getCodiProfilo();
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		StampeForm myForm = (StampeForm)sc.getObjectInSession(session, "stampeForm");
		myForm.setListaStampe(p.getListaStampe());
		model.addAttribute("stampeForm",myForm);
		//rimuovo gli oggetti dalla sessione
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_CARTELLE);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		sc.removeObjectFromSession(session, WebApplicationConstants.PATH);
		return "jsp/listaReport";
	}
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Stampe abilitate")
	public String stampeAbilitate(Model model,HttpServletRequest req, @ModelAttribute StampeForm myForm, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  stampeAbilitate della classe " +
						this.getClass().getName(),GestioneReportController.class);
		
		//rimuovo gli oggetti dalla sessione
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_CARTELLE);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		sc.removeObjectFromSession(session, WebApplicationConstants.PATH);
		sc.removeObjectFromSession(session, "stampeForm");
		//recupero i nomi delle cartelle
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		ArrayList listaCartelle = Util.getCartelleStampe(p.getListaStampe());
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_CARTELLE, listaCartelle);
		myForm.setFormato("accessibile");
		sc.putObjectInSession(session, "stampeForm", myForm);
		model.addAttribute("stampeForm", myForm);
		String path="<a href=\"/simulatoreWeb/gestioneStampe.html?metodo=visualizzaStampe&path=Stampe abilitate\" class=\"linkPager\">Stampe abilitate</a>";
		model.addAttribute(WebApplicationConstants.PATH,path);
		sc.putObjectInSession(session, WebApplicationConstants.PATH, path);
		return "jsp/listaStampeUfficiali";
	}
}
