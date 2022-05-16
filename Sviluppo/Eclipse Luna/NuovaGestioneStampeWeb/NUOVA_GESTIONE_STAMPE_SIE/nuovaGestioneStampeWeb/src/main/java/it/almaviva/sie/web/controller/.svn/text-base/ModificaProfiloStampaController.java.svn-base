/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.util.ArrayList;
import java.util.Iterator;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.service.DUtentiProfiliService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.sicurezza.model.Funzione;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.ModificaProfiloStampaForm;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
import it.almaviva.sie.web.form.StampeForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/modificaProfiloStampe.html")
public class ModificaProfiloStampaController {
	private SessionContainer sc = new SessionContainer();
	
	@Autowired
	private DAnagraficaStampeService service;
	@RequestMapping(params="metodo=Ritorna")
	public String ritorna(Model model,HttpServletRequest req, @ModelAttribute ModificaProfiloStampaForm myForm, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ritorna della classe " +
						this.getClass().getName(),ModificaProfiloStampaController.class);
		RicercaPerCodiceDescrizioneForm ff = new RicercaPerCodiceDescrizioneForm();
		model.addAttribute("ricercaPerCodiceDescrizioneForm", ff);
		return "jsp/listaProfiliStampe";
	}
	@RequestMapping(params="metodo=Cancella")
	public String cancella(Model model,HttpServletRequest req, @ModelAttribute ModificaProfiloStampaForm myForm, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cancella della classe " +
						this.getClass().getName(),ModificaProfiloStampaController.class);
		ArrayList listaStampe = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_MODIFICA_PROFILO);
		if(myForm.getListaStampe()==null || myForm.getListaStampe().size()==0){
			model.addAttribute("errore","Selezionare almeno una stampa da eliminare");
		}else{
			Iterator it = myForm.getListaStampe().iterator();
			ArrayList lista2 = new ArrayList();
			lista2.addAll(listaStampe);
			while(it.hasNext()) { 
				Integer i = new Integer((String)it.next());
				DAnagraficheStampeVO dd = (DAnagraficheStampeVO)lista2.get(i);
				listaStampe.remove(dd);
			}	
		}
		ArrayList lista1 = new ArrayList();
		lista1.addAll(listaStampe);
		myForm.setListaStampe(null);
		model.addAttribute("modificaProfiloStampaForm", myForm);
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_MODIFICA_PROFILO, lista1);
		return "jsp/modificaProfiloStampe";	
	}
	@RequestMapping(params="metodo=Aggiungi")
	public String aggiungi(Model model,HttpServletRequest req, @ModelAttribute ModificaProfiloStampaForm myForm,HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  aggiungi della classe " +
						this.getClass().getName(),ModificaProfiloStampaController.class);
		Profilo p = new Profilo();
		p.setCodi_pk_profilo(myForm.getCodiceProfilo());
		p.setDesc_profilo(myForm.getDescrizioneProfilo());
		ArrayList listaStampe=service.getListaPercorsi();
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_PERCORSI,listaStampe);
		StampeForm formStampe= new StampeForm();
		formStampe.setListaStampe(listaStampe);
		model.addAttribute("stampeForm", formStampe);
		sc.putObjectInSession(session, "stampeForm", formStampe);
		sc.putObjectInSession(session, "profilo", p);
		return "jsp/ricercaStampeDaAggiungere";	
	}
	@RequestMapping(params="metodo=Salva")
	public String salva(Model model,HttpServletRequest req, @ModelAttribute ModificaProfiloStampaForm myForm, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cancella della classe " +
						this.getClass().getName(),ModificaProfiloStampaController.class);
		ArrayList listaStampe = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_MODIFICA_PROFILO);
		
		Profilo p = new Profilo();
		p.setCodi_pk_profilo(myForm.getCodiceProfilo());
		p.setDesc_profilo(myForm.getDescrizioneProfilo());
		p.setListaStampe(listaStampe);
		Utente user = (Utente)sc.getObjectInSession(session, "utente");
		FunzioneSIE f = (FunzioneSIE)sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		p.setUtente(user.getUserName());
		p.setFunzione("MOD_PROF_STAMPE");
		sc.putObjectInSession(session, WebApplicationConstants.PROFILO_DA_MODIFICARE, p);
		sc.putObjectInSession(session, WebApplicationConstants.SAVE_CRONOLOGICO, WebApplicationConstants.CRONOLOGICO_ON);
		model.addAttribute("modificaProfiloStampaForm", myForm);
		return "jsp/confermaModificaProfiloStampe";	
	}
	
}
