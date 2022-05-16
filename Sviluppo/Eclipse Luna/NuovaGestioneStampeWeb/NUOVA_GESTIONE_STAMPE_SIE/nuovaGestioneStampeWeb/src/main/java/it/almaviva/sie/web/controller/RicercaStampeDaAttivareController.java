/**
 * 
 */
package it.almaviva.sie.web.controller;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.web.form.InserisciStampaForm;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
import it.almaviva.sie.web.form.StampeForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
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
@RequestMapping("/ricercaStampeDaAttivare.html")
public class RicercaStampeDaAttivareController {

	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	
	@RequestMapping(params="metodo=...")
	public String cercaCodiceDescrizione(HttpServletRequest request, Model model,@ModelAttribute StampeForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cercaCodiceDescrizione della classe " +
						this.getClass().getName(),RicercaStampeDaAttivareController.class);
		try{
		DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
		vo.setObject_path(myForm.getPath());
		vo.setText_object_name(myForm.getDescStampa());
		
		RicercaPerCodiceDescrizioneForm ff = new RicercaPerCodiceDescrizioneForm();
		ff.setDescrizione(myForm.getDescStampa());
		ArrayList listaStampe=Util.getListaCodiceDescrizione(service.getListaStampe(vo));
		model.addAttribute(WebApplicationConstants.LISTA_STAMPE,listaStampe);
		model.addAttribute("ricercaPerCodiceDescrizioneForm",ff);
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE, listaStampe);
		sc.putObjectInSession(session, "stampeForm", myForm);
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/ricercaStampeDaAttivare";
			//throw new ApplicationException(e.getMessage());
		}
		return "jsp/listaStampe";	
		
	}
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Pulisci")
	public String pulisci(HttpServletRequest request, Model model, @ModelAttribute StampeForm ff, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  pulisci della classe " +
						this.getClass().getName(),RicercaStampeDaAttivareController.class);
		try{
		ArrayList listaStampe=service.getListaPercorsi();
		StampeForm formStampe= new StampeForm();
		formStampe.setListaStampe(listaStampe);
		model.addAttribute("stampeForm", formStampe);
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
		}	
		return "jsp/ricercaStampeDaAttivare";
		//throw new ApplicationException(e.getMessage());
	}
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Cerca")
	public String cerca(HttpServletRequest request, Model model,@ModelAttribute StampeForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cerca della classe " +
						this.getClass().getName(),RicercaStampeDaAttivareController.class);
		try{
			DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
			vo.setObject_path(myForm.getPath());
			vo.setText_object_name(myForm.getDescStampa());
			ArrayList listaStampe=service.getListaStampeDaAttivare(vo);
			ArrayList selezionati = new ArrayList();
			ArrayList attive = new ArrayList();
			for (int i = 0; i < listaStampe.size(); i++) {
				DAnagraficheStampeVO dd = (DAnagraficheStampeVO)listaStampe.get(i);
				if(dd.getFlag_stampa_attiva().equals("1")){
					selezionati.add(String.valueOf(i));
					attive.add(dd);
				}
			}
			
			
			InserisciStampaForm mod = new InserisciStampaForm();
			mod.setIndexSelezionati((String[])selezionati.toArray(new String[selezionati.size()]));
			model.addAttribute("inserisciStampaForm",mod);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_TOTALE, listaStampe);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_ATTIVE, attive);
			sc.putObjectInSession(session, WebApplicationConstants.PARAMETRI_RICERCA, vo);
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/ricercaStampeDaAttivare";
			//throw new ApplicationException(e.getMessage());
		}	
		return "jsp/elencoStampeDaAttivare";
	}
	
}
