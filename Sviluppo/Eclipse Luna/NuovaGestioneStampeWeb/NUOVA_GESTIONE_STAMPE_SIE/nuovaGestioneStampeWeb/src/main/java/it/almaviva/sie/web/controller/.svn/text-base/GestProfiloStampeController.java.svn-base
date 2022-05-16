/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.util.ArrayList;

import it.almaviva.sie.business.model.MstrConnectionParam;
import it.almaviva.sie.business.model.ParametriCodiceDescrizioneTO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.service.DProfiloService;
import it.almaviva.sie.business.service.RicercaPerCodiceDescrizioneService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.BaseForm;
import it.almaviva.sie.web.form.GestioneProfiliStampeForm;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
import it.almaviva.sie.web.form.SchedulazioneReportForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;
import it.almaviva.sie.web.validation.GestioneProfiliStampeValidator;
import it.almaviva.sie.web.validation.InserimentoDestinatarioValidator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/gestProfiloStampe.html")
public class GestProfiloStampeController extends MyAbstractController{
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private RicercaPerCodiceDescrizioneService service;

	@Autowired
	private DProfiloService service1;
	
	@RequestMapping(method = RequestMethod.GET)
	public String init(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  init della classe " +
						this.getClass().getName(),GestProfiloStampeController.class);
		
		startFunzione(request, session,sc);
		BaseForm ff = new BaseForm();
		model.addAttribute("baseForm", ff);
		//instanzio il form
		return "jsp/allineamento";

	}
	@RequestMapping(params="metodo=scorriLista")
	public String scorriLista(HttpServletRequest request, HttpSession session,Model model,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  scorriLista della classe " +
						this.getClass().getName(),GestProfiloStampeController.class);
		model.addAttribute("ricercaPerCodiceDescrizioneForm",myForm);
		return "jsp/listaProfiliStampe";	
		
	}
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Cerca")
	public String cerca(HttpServletRequest request, Model model,HttpSession session,@ModelAttribute GestioneProfiliStampeForm myForm,Errors result )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cerca della classe " +
						this.getClass().getName(),GestProfiloStampeController.class);
		try{
			Profilo p = new Profilo();
			p.setCodiProfiloDa(myForm.getCodiProfiloDa());
			p.setCodiProfiloA(myForm.getCodiProfiloA());
			//valido i dati immessi nel form
			new GestioneProfiliStampeValidator().validate(result, myForm);			
			request.setAttribute("clear1Status","true");
			
			ArrayList listaProfili = service1.getListaProfiliStampeDaModificare(p);
			if(!result.hasErrors() && (listaProfili==null || listaProfili.size()==0)){
				result.reject("no.data.found");
				//model.addAttribute("errore",this.getMessage("no.data.found"));
				
			}
			if(result.hasErrors()){
				ArrayList listaProfili2 = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PROFILI_COMBO);
				myForm.setListProfiliDa(listaProfili2);
				myForm.setListProfiliA(listaProfili2);
				model.addAttribute("gestioneProfiliStampeForm", myForm);
				return "jsp/ricercaProfiliStampe";
			}
				
			RicercaPerCodiceDescrizioneForm ff = new RicercaPerCodiceDescrizioneForm();
			model.addAttribute("ricercaPerCodiceDescrizioneForm", ff);
			sc.putObjectInSession(session, WebApplicationConstants.PARAMETRI_RICERCA_PROFILO, p);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_PROFILI_STAMPE, listaProfili);
			return "jsp/listaProfiliStampe";	
			
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), GestProfiloStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/ricercaProfiliStampe";
		}
		}
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Pulisci")
	public String pulisci(HttpServletRequest request, Model model,@ModelAttribute GestioneProfiliStampeForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  pulisci della classe " +
						this.getClass().getName(),GestProfiloStampeController.class);
		ArrayList listaProfili = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PROFILI_COMBO);
		myForm.setCodiProfiloDa("");
		myForm.setCodiProfiloA("");
		myForm.setListProfiliDa(listaProfili);
		myForm.setListProfiliA(listaProfili);
		model.addAttribute("gestioneProfiliStampeForm", myForm);
		return "jsp/ricercaProfiliStampe";	
	}	
		
/*	@RequestMapping(method = RequestMethod.POST,params="cercaProvincia=...")
	public String cercaProvincia(HttpServletRequest request, Model model,@ModelAttribute GestioneProfiliStampeForm myForm, HttpSession session )
			throws ApplicationException {
		try{
			RicercaPerCodiceDescrizioneForm ff = new RicercaPerCodiceDescrizioneForm();
			ff.setCodice(myForm.getCodiceRagioneria());
			ParametriCodiceDescrizioneTO parametri = new ParametriCodiceDescrizioneTO();
			parametri.setCodice(myForm.getCodiceRagioneria());
			parametri.setTipologiaRicerca("Ragioneria");
			ArrayList listaCodiceDescrizione = service.getListaCodiceDescrizione(parametri);
			model.addAttribute(WebApplicationConstants.LISTA_CODICE_DESCRIZIONE,listaCodiceDescrizione);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_CODICE_DESCRIZIONE, listaCodiceDescrizione);
			sc.putObjectInSession(session, "parametri", parametri);
			model.addAttribute("ricercaPerCodiceDescrizioneForm",ff);
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), GestProfiloStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/ricercaProfiliStampe";
		}
		
		return "jsp/listaCodiceDescrizione";	
		
	}*/
}
