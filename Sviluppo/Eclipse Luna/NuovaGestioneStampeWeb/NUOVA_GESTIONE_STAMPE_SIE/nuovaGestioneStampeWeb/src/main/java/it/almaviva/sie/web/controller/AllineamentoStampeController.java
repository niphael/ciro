/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.service.DProfiloService;
import it.almaviva.sie.business.service.MicrostrategyService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.BaseForm;
import it.almaviva.sie.web.form.GestioneProfiliStampeForm;
import it.almaviva.sie.web.form.StampeForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.microstrategy.web.objects.WebObjectsException;

/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/allineamentoStampe.html")
public class AllineamentoStampeController {
	
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	@Autowired
	private MicrostrategyService service2;
	
	@Autowired
	private DProfiloService service3;
	
	@RequestMapping(method = RequestMethod.GET,params="metodo=allineamento")
	public String init(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  init della classe " +
						this.getClass().getName(),AllineamentoStampeController.class);
		//metto in sessione il nome della funzione
		FunzioneSIE funzione = (FunzioneSIE)sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		Utente utente = (Utente)sc.getObjectInSession(session, "utente");
		String forward="allineamentoEffettuato";
		BaseForm ff = new BaseForm();
		try {
			service2.impostaParametriConnessione();
			
			//effettuo allineamento
			service.aggiornaProfili(utente.getUserName());
			
			model.addAttribute("baseForm", ff);
		/*	if(funzione.getCodice().equals("GEST_STAMPE")){
				forward="ricercaProfiliStampe";
				//preparo i campi da visualizzare nella maschera
				ArrayList listaProfili = service3.getListaProfiliStampe();
				ArrayList listaPercorsi = service.getListaPercorsi();
				GestioneProfiliStampeForm myForm = new GestioneProfiliStampeForm();
				myForm.setListProfiliDa(listaProfili);
				myForm.setListProfiliA(listaProfili);
				myForm.setListPath(listaPercorsi);
				model.addAttribute("gestioneProfiliStampeForm",myForm);	
				sc.putObjectInSession(session, "gestioneProfiliStampeForm", myForm);
			}*/
		
		} catch (WebObjectsException e) {
			// TODO Auto-generated catch block
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), AllineamentoStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			model.addAttribute("baseForm", ff);
			return "jsp/allineamento";
		}catch (ApplicationException e) {
			// TODO Auto-generated catch block
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), AllineamentoStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			model.addAttribute("baseForm", ff);
			return "jsp/allineamento";
		}
		//instanzio il form
		return "jsp/"+forward;

	}
	@RequestMapping(method = RequestMethod.GET,params="metodo=caricaMaschera")
	public String caricaMaschera(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  caricaMaschera della classe " +
						this.getClass().getName(),AllineamentoStampeController.class);
		//metto in sessione il nome della funzione
		FunzioneSIE funzione = (FunzioneSIE)sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		String forward="allineamentoEffettuato";
		if(funzione.getCodice().equals("AGG_PROF_STAMPE")){
		forward="ricercaProfiliStampe";
		//preparo i campi da visualizzare nella maschera
		ArrayList listaProfili = service3.getListaProfiliStampe();
		GestioneProfiliStampeForm myForm = new GestioneProfiliStampeForm();
		myForm.setListProfiliDa(listaProfili);
		myForm.setListProfiliA(listaProfili);
		model.addAttribute("gestioneProfiliStampeForm",myForm);	
		sc.putObjectInSession(session, "gestioneProfiliStampeForm", myForm);
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_PROFILI_COMBO, listaProfili);
		}
		if(funzione.getCodice().equals("ATT_STAMPE")){
			forward="ricercaStampeDaAttivare";
			ArrayList listaStampe=service.getListaPercorsi();
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_PERCORSI,listaStampe);
			StampeForm formStampe= new StampeForm();
			formStampe.setListaStampe(listaStampe);
			model.addAttribute("stampeForm", formStampe);
		}
			//instanzio il form
			return "jsp/"+forward;	
	}
	}

