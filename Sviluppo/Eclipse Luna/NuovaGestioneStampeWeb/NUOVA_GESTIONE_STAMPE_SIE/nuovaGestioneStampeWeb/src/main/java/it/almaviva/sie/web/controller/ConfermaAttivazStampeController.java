/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.util.ArrayList;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.GestioneProfiliStampeForm;
import it.almaviva.sie.web.form.InserisciStampaForm;
import it.almaviva.sie.web.form.StampeForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/confermaAttivazStampe.html")
public class ConfermaAttivazStampeController {
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	
	@RequestMapping(params="metodo=Conferma")
	public String conferma(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  conferma della classe " +
						this.getClass().getName(),ConfermaAttivazStampeController.class);
		ArrayList listaDaAttivare = (ArrayList) sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_DA_ATTIVARE);
		ArrayList listaDaDisattivare = (ArrayList) sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_DA_DISATTIVARE);
		StampeTO stampa = new StampeTO();
		//cronologico:
		byte[] compressedHTML = (byte[])sc.getObjectInSession(session, WebApplicationConstants.HTML_CRONOLOGICO);
		stampa.setCronologicoHTML(compressedHTML);
		Utente user = (Utente)sc.getObjectInSession(session, "utente");
		FunzioneSIE f = (FunzioneSIE)sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		stampa.setUtente(user.getUserName());
		stampa.setFunzione(f.getCodice());
		stampa.setListaDaAttivare(listaDaAttivare);
		stampa.setListaDaDisattivare(listaDaDisattivare);
		try{
		InserisciStampaForm myForm = new InserisciStampaForm();
		model.addAttribute("inserisciStampaForm",myForm);
		stampa = (StampeTO) service.modificaStatoStampe(stampa);
		if(!Util.isEmpty(stampa.getErrorMessage())){
			model.addAttribute("errore","Errore: "+stampa.getErrorMessage());
			return "jsp/confermaAttivazioneStampe";
		}
		model.addAttribute("ok",new Object());
		
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), ConfermaModificaProfiloStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/confermaAttivazioneStampe";
		}
		return "jsp/confermaAttivazioneStampe";	
		}

	@RequestMapping(params="metodo=Annulla")
	public String annulla(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  annulla della classe " +
						this.getClass().getName(),ConfermaAttivazStampeController.class);
		try{
			ArrayList listaStampe= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_TOTALE);
			ArrayList selezionati = new ArrayList();
			for (int i = 0; i < listaStampe.size(); i++) {
				DAnagraficheStampeVO dd = (DAnagraficheStampeVO)listaStampe.get(i);
				if(dd.getFlag_stampa_attiva().equals("1")){
						selezionati.add(String.valueOf(i));
				}
			}
			InserisciStampaForm mod = new InserisciStampaForm();
			mod.setIndexSelezionati((String[])selezionati.toArray(new String[selezionati.size()]));
			model.addAttribute("inserisciStampaForm",mod);
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/elencoStampeDaAttivare";
			//throw new ApplicationException(e.getMessage());
		}	
		return "jsp/elencoStampeDaAttivare";
	}
	@RequestMapping(params="metodo=Ok")
	public String ok(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ok della classe " +
						this.getClass().getName(),ConfermaAttivazStampeController.class);
		ArrayList listaStampe=service.getListaPercorsi();
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_PERCORSI,listaStampe);
		StampeForm formStampe= new StampeForm();
		formStampe.setListaStampe(listaStampe);
		model.addAttribute("stampeForm", formStampe);
		return "jsp/ricercaStampeDaAttivare";
	}
}
