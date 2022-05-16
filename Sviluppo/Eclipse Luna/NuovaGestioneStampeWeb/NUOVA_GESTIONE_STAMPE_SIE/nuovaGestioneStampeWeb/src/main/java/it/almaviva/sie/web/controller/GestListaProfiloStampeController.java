/**
 * 
 */
package it.almaviva.sie.web.controller;

import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.web.form.GestioneProfiliStampeForm;
import it.almaviva.sie.web.form.ModificaProfiloStampaForm;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;
import it.almaviva.sie.web.validation.InserimentoDestinatarioValidator;
import it.almaviva.sie.web.validation.RicercaPerCodiceDescrizioneValidator;

import java.util.ArrayList;

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
@RequestMapping("/gestListaProfiloStampe.html")
public class GestListaProfiloStampeController {

	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Ritorna")
	public String pulisci(HttpServletRequest request, Model model,HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  pulisci della classe " +
						this.getClass().getName(),GestListaProfiloStampeController.class);
		Profilo p = (Profilo)sc.getObjectInSession(session, WebApplicationConstants.PARAMETRI_RICERCA_PROFILO);
		ArrayList listaProfili = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PROFILI_COMBO);
		GestioneProfiliStampeForm myForm = new GestioneProfiliStampeForm();
		myForm.setCodiProfiloDa(p.getCodiProfiloDa());
		myForm.setCodiProfiloA(p.getCodiProfiloA());
		myForm.setListProfiliDa(listaProfili);
		myForm.setListProfiliA(listaProfili);
		model.addAttribute("gestioneProfiliStampeForm", myForm);
		return "jsp/ricercaProfiliStampe";	
	}	
	
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Modifica")
	public String modifica(HttpServletRequest request, Model model,HttpSession session,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm,Errors result )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  modifica della classe " +
						this.getClass().getName(),GestListaProfiloStampeController.class);
		
		ArrayList listaProfili= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PROFILI_STAMPE);
		//valido i dati immessi nel form
				new RicercaPerCodiceDescrizioneValidator().validate(myForm, result);			
				if (result.hasErrors()) {
					//sono stati riscontrati errori di validazione sui campi del form
						model.addAttribute("ricercaPerCodiceDescrizioneForm", myForm);
					
					return "jsp/listaProfiliStampe";
				}
		CodiceDescrizioneTO anag = (CodiceDescrizioneTO)listaProfili.get(Integer.parseInt(myForm.getIndexSelezionato()));
		
		//Profilo p = (Profilo)sc.getObjectInSession(session, WebApplicationConstants.PARAMETRI_RICERCA_PROFILO);
		try{
			ArrayList listaStampe= new ArrayList();
			listaStampe=service.getStampeProfiloForModifica(anag.getCodice());
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_MODIFICA_PROFILO, listaStampe);
			ModificaProfiloStampaForm mod = new ModificaProfiloStampaForm();
			mod.setCodiceProfilo(anag.getCodice());
			mod.setDescrizioneProfilo(anag.getDescrizione());
			model.addAttribute("modificaProfiloStampaForm",mod);
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), GestListaProfiloStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/listaProfiliStampe";
		}
		
		
		return "jsp/modificaProfiloStampe";	
	}	
}
