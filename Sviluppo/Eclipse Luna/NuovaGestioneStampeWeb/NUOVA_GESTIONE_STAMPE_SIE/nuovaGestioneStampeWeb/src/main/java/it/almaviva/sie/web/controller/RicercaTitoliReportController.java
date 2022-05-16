/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.util.ArrayList;

import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.sicurezza.model.Funzione;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.RicercaDestinatariForm;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
import it.almaviva.sie.web.form.SchedulazioneReportForm;
import it.almaviva.sie.web.form.StampeForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;
import it.almaviva.sie.web.validation.RicercaPerCodiceDescrizioneValidator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/ricercaTitoliReport.html")
public class RicercaTitoliReportController {
	
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	
	@RequestMapping(params="metodo=scorriLista")
	public String scorriLista(HttpServletRequest request, HttpSession session,Model model,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  scorriLista della classe " +
						this.getClass().getName(),RicercaTitoliReportController.class);
		model.addAttribute("ricercaPerCodiceDescrizioneForm",myForm);
		return "jsp/listaTitoliReport";	
		
	}
	@RequestMapping(params="metodo=Ritorna")
	public String ritorna(HttpServletRequest request, HttpSession session,Model model )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ritorna della classe " +
						this.getClass().getName(),RicercaTitoliReportController.class);
		FunzioneSIE funzione=(FunzioneSIE) sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		String forward="";
		
		if(funzione.getCodice().equals("GEST_SCHED_PROSP")){
			forward="scegliReport";
			SchedulazioneReportForm myForm = (SchedulazioneReportForm) sc.getObjectInSession(session, "schedulazioneReportForm");
			model.addAttribute("schedulazioneReportForm",myForm);
		}
		if(funzione.getCodice().equals("INS_UTENTI_REPOR")){
			forward="ricercaDestinatari";
			RicercaDestinatariForm myForm = (RicercaDestinatariForm) sc.getObjectInSession(session, "ricercaDestinatariForm");
			model.addAttribute("ricercaDestinatariForm",myForm);
		}
	return "jsp/"+forward;	
	}
	@RequestMapping(params="metodo=Cerca")
	public String cerca(HttpServletRequest request, HttpSession session,Model model,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm )
			throws ApplicationException {
				TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cerca della classe " +
						this.getClass().getName(),RicercaTitoliReportController.class);
		//String codiProfilo=myForm.getCodiProfilo();
				//recupero le stampe associate al profilo
				try{
				DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
				vo.setText_object_name(myForm.getDescrizione());
				ArrayList listaStampe=Util.getListaCodiceDescrizione(service.getListaTitoliReport(vo));
				model.addAttribute(WebApplicationConstants.LISTA_STAMPE,listaStampe);
				} catch (Exception e) {
					e.printStackTrace();
					TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
							+ e.getMessage(), RicercaTitoliReportController.class);
					model.addAttribute("errore","Errore: "+e.getMessage());
					//throw new ApplicationException(e.getMessage());
				}
		return "jsp/listaTitoliReport";	
		
	}
	
	@RequestMapping(params="metodo=Inserisci")
	public String inserisci(HttpServletRequest request, HttpSession session,Model model,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm ,Errors result ){
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  inserisci della classe " +
						this.getClass().getName(),RicercaTitoliReportController.class);
		FunzioneSIE funzione=(FunzioneSIE) sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		String forward="";
		ArrayList listaStampe= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE);
		//valido i dati immessi nel form
		new RicercaPerCodiceDescrizioneValidator().validate(myForm, result);			
		if (result.hasErrors()) {
			//sono stati riscontrati errori di validazione sui campi del form
				model.addAttribute("ricercaPerCodiceDescrizioneForm", myForm);
			
			return "jsp/listaTitoliReport";
		}
		CodiceDescrizioneTO anag = (CodiceDescrizioneTO)listaStampe.get(Integer.parseInt(myForm.getIndexSelezionato()));
		if(funzione.getCodice().equals("GEST_SCHED_PROSP")){
			forward="scegliReport";
			SchedulazioneReportForm ff = (SchedulazioneReportForm) sc.getObjectInSession(session, "schedulazioneReportForm");
			ff.setDescReport(anag.getDescrizione());
			ff.setCodiceReport(anag.getCodice());
			model.addAttribute("schedulazioneReportForm",ff);
		}
		if(funzione.getCodice().equals("INS_UTENTI_REPOR")){
			forward="ricercaDestinatari";
			RicercaDestinatariForm myForm2 = (RicercaDestinatariForm) sc.getObjectInSession(session, "ricercaDestinatariForm");
			myForm2.setCodiceReport(anag.getCodice());
			myForm2.setDescReport(anag.getDescrizione());
			model.addAttribute("ricercaDestinatariForm",myForm2);
		}
	return "jsp/"+forward;	
	}
}
