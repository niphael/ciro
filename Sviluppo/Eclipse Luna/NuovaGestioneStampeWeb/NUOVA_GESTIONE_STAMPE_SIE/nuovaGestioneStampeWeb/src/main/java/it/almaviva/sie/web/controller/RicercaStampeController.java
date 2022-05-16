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
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
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
@RequestMapping("/ricercaStampe.html")
public class RicercaStampeController {
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	@RequestMapping(params="metodo=scorriLista")
	public String scorriLista(HttpServletRequest request, HttpSession session,Model model,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  scorriLista della classe " +
						this.getClass().getName(),RicercaStampeController.class);
		model.addAttribute("ricercaPerCodiceDescrizioneForm",myForm);
		return "jsp/listaStampe";	
		
	}
	
	@RequestMapping(params="metodo=Cerca")
	public String cerca(HttpServletRequest request, HttpSession session,Model model,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm )
			throws ApplicationException {
				TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cerca della classe " +
						this.getClass().getName(),RicercaStampeController.class);
		//String codiProfilo=myForm.getCodiProfilo();
				//recupero le stampe associate al profilo
				try{
				DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
				//Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
				//vo.setCodi_profilo(p.getCodi_pk_profilo());
				vo.setText_object_name(myForm.getDescrizione());
				ArrayList listaStampe=Util.getListaCodiceDescrizione(service.getListaStampe(vo));
				model.addAttribute(WebApplicationConstants.LISTA_STAMPE,listaStampe);
				sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE, listaStampe);
				} catch (Exception e) {
					e.printStackTrace();
					TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
							+ e.getMessage(), RedirectController.class);
					model.addAttribute("errore","Errore: "+e.getMessage());
					//throw new ApplicationException(e.getMessage());
				}
		return "jsp/listaStampe";	
		
	}
	@RequestMapping(params="metodo=Ritorna")
	public String ritorna(HttpServletRequest request, HttpSession session,Model model )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ritorna della classe " +
						this.getClass().getName(),RicercaStampeController.class);
		//String codiProfilo=myForm.getCodiProfilo();
		FunzioneSIE funzione=(FunzioneSIE) sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		String forward="listaReport";
		StampeForm myForm = (StampeForm)sc.getObjectInSession(session, "stampeForm");
		ArrayList listaPercorsi = new ArrayList();
		//Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");	
		if(funzione.getCodice().equals("GEST_STAMPE")){
			Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
			listaPercorsi = p.getListaStampe();
			forward="listaReport";
			
		}
		if(funzione.getCodice().equals("AGG_PROF_STAMPE")){
			listaPercorsi = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PERCORSI);
			forward="ricercaStampeDaAggiungere";
		}
		if(funzione.getCodice().equals("ATT_STAMPE")){
			listaPercorsi = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PERCORSI);
			forward="ricercaStampeDaAttivare";
		}
		
		myForm.setListaStampe(listaPercorsi);
		model.addAttribute("stampeForm",myForm);
		return "jsp/"+forward;	
	}
	@RequestMapping(params="metodo=Inserisci")
	public String inserisci(HttpServletRequest request, HttpSession session,Model model,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm ,Errors result  ){
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  inserisci della classe " +
						this.getClass().getName(),RicercaStampeController.class);
		FunzioneSIE funzione=(FunzioneSIE) sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		StampeForm ff = (StampeForm)sc.getObjectInSession(session, "stampeForm");
		String forward="listaReport";
		//Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		//valido i dati immessi nel form
		new RicercaPerCodiceDescrizioneValidator().validate(myForm, result);	
		ArrayList listaPercorsi = new ArrayList();
		if (result.hasErrors()) {
			//sono stati riscontrati errori di validazione sui campi del form
				model.addAttribute("ricercaPerCodiceDescrizioneForm", myForm);
			
			return "jsp/listaStampe";
		}
		if(funzione.getCodice().equals("GEST_STAMPE")){
			Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
			listaPercorsi = p.getListaStampe();
			forward="listaReport";
			
		}
		
		if(funzione.getCodice().equals("AGG_PROF_STAMPE")){
			listaPercorsi = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PERCORSI);
			forward="ricercaStampeDaAggiungere";
			
		}
		if(funzione.getCodice().equals("ATT_STAMPE")){
			listaPercorsi = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PERCORSI);
			forward="ricercaStampeDaAttivare";
		}
		//ff.setListaStampe(p.getListaStampe());
		ArrayList listaStampe= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE);
		CodiceDescrizioneTO anag = (CodiceDescrizioneTO)listaStampe.get(Integer.parseInt(myForm.getIndexSelezionato()));
		ff.setDescStampa(anag.getDescrizione());
		ff.setCodiStampa(anag.getCodice());
		
		ff.setListaStampe(listaPercorsi);
			
		model.addAttribute("stampeForm",ff);
		return "jsp/"+forward;		
	}

}
