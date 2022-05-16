/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.service.CronologicoService;
import it.almaviva.sie.business.service.DProfiloService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.web.form.GestioneProfiliStampeForm;
import it.almaviva.sie.web.form.ModificaProfiloStampaForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

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
@RequestMapping("/confermaModificaProfiloStampe.html")
public class ConfermaModificaProfiloStampeController {
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DProfiloService service;
	@RequestMapping(params="metodo=Indietro")
	public String indietro(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cancella della classe " +
						this.getClass().getName(),ConfermaModificaProfiloStampeController.class);
		ModificaProfiloStampaForm myForm = new ModificaProfiloStampaForm();
		Profilo p = (Profilo)sc.getObjectInSession(session, WebApplicationConstants.PROFILO_DA_MODIFICARE);
		myForm.setCodiceProfilo(p.getCodi_pk_profilo());
		myForm.setDescrizioneProfilo(p.getDesc_profilo());
		model.addAttribute("modificaProfiloStampaForm", myForm);
		return "jsp/modificaProfiloStampe";	
	}
	@RequestMapping(params="metodo=Ok")
	public String ok(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ok della classe " +
						this.getClass().getName(),ConfermaModificaProfiloStampeController.class);
		//preparo i campi da visualizzare nella maschera
		ArrayList listaProfili = (ArrayList) sc.getObjectInSession(session, WebApplicationConstants.LISTA_PROFILI_COMBO);
		GestioneProfiliStampeForm myForm = new GestioneProfiliStampeForm();
		myForm.setListProfiliDa(listaProfili);
		myForm.setListProfiliA(listaProfili);
		model.addAttribute("gestioneProfiliStampeForm",myForm);	
		sc.putObjectInSession(session, "gestioneProfiliStampeForm", myForm);
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_PROFILI_COMBO, listaProfili);
		return "jsp/ricercaProfiliStampe";
	}
	@RequestMapping(params="metodo=Conferma")
	public String conferma(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cancella della classe " +
						this.getClass().getName(),ConfermaModificaProfiloStampeController.class);
		Profilo p = (Profilo)sc.getObjectInSession(session, WebApplicationConstants.PROFILO_DA_MODIFICARE);
		//cronologico:
		byte[] compressedHTML = (byte[])sc.getObjectInSession(session, WebApplicationConstants.HTML_CRONOLOGICO);
		p.setCronologicoHTML(compressedHTML);
		try{
		p=(Profilo) service.modificaProfiloStampe(p);
		ModificaProfiloStampaForm myForm = new ModificaProfiloStampaForm();
		myForm.setCodiceProfilo(p.getCodi_pk_profilo());
		myForm.setDescrizioneProfilo(myForm.getDescrizioneProfilo());
		model.addAttribute("modificaProfiloStampaForm", myForm);
		if(!Util.isEmpty(p.getErrorMessage())){
			model.addAttribute("errore","Errore: "+p.getErrorMessage());
			return "jsp/confermaModificaProfiloStampe";
		}
		//Inserisco cronologico
		//service2.write(p);
		
		model.addAttribute("ok",new Object());
		}
		
		catch (Exception e) {
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), ConfermaModificaProfiloStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/confermaModificaProfiloStampe";
		}
		return "jsp/confermaModificaProfiloStampe";	
	}

}
