/**
 * 
 */
package it.almaviva.sie.web.controller;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.web.form.InserisciStampaForm;
import it.almaviva.sie.web.form.ModificaProfiloStampaForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import java.util.ArrayList;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
@RequestMapping("/aggiungiStampe.html")
public class AggiungiStampeController {

	private SessionContainer sc = new SessionContainer();
	@RequestMapping(method = RequestMethod.POST,params="metodo=Pulisci")
	public String pulisci(HttpServletRequest request, Model model,@ModelAttribute InserisciStampaForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  avanti della classe " +
						this.getClass().getName(),GestioneReportController.class);
		try{
			ArrayList listaStampeAssociate= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_MODIFICA_PROFILO);
			ArrayList listaStampe= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_TOTALE);
			ArrayList selezionati = new ArrayList();
			for (int i = 0; i < listaStampe.size(); i++) {
				DAnagraficheStampeVO dd = (DAnagraficheStampeVO)listaStampe.get(i);
				if(listaStampeAssociate.contains(dd)){
					dd.setSelected("Y");
					selezionati.add(String.valueOf(i));
				}
			}
			
			
			InserisciStampaForm mod = new InserisciStampaForm();
			mod.setIndexSelezionati((String[])selezionati.toArray(new String[selezionati.size()]));
			model.addAttribute("inserisciStampaForm",mod);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_TOTALE, listaStampe);
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/elencoStampeDaAggiugere";
			//throw new ApplicationException(e.getMessage());
		}	
		return "jsp/elencoStampeDaAggiugere";
	}
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Annulla")
	public String annulla(HttpServletRequest request, Model model, @ModelAttribute InserisciStampaForm ff,HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  modifica della classe " +
						this.getClass().getName(),AggiungiStampeController.class);
		try{
			Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		ModificaProfiloStampaForm myForm = new ModificaProfiloStampaForm();
		myForm.setCodiceProfilo(p.getCodi_pk_profilo());
		myForm.setDescrizioneProfilo(p.getDesc_profilo());
		model.addAttribute("modificaProfiloStampaForm", myForm);
		
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/elencoStampeDaAggiugere";
			//throw new ApplicationException(e.getMessage());
		}	
		return "jsp/modificaProfiloStampe";
	}
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Inserisci")
	public String inserisci(HttpServletRequest request, Model model, @ModelAttribute InserisciStampaForm ff,HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  inserisci della classe " +
						this.getClass().getName(),AggiungiStampeController.class);
		try{
			ArrayList listaStampe= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_TOTALE);
			ArrayList listaStampeMod= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_MODIFICA_PROFILO);
			if(ff.getIndexSelezionati()==null || ff.getIndexSelezionati().length==0){
				model.addAttribute("errore","Selezionare almeno una stampa da aggiungere");
				return pulisci(request, model, ff, session);
			}else{
				for (int i = 0; i < ff.getIndexSelezionati().length; i++) {

					int index = Integer.parseInt(ff.getIndexSelezionati()[i]);
					DAnagraficheStampeVO vo= (DAnagraficheStampeVO) listaStampe.get(index);
					listaStampeMod.add(vo);

				}
			}
			
			
	    Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		ModificaProfiloStampaForm myForm = new ModificaProfiloStampaForm();
		myForm.setCodiceProfilo(p.getCodi_pk_profilo());
		myForm.setDescrizioneProfilo(p.getDesc_profilo());
		model.addAttribute("modificaProfiloStampaForm", myForm);
		
		
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/elencoStampeDaAggiugere";
			//throw new ApplicationException(e.getMessage());
		}	
		return "jsp/modificaProfiloStampe";
	}
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Inserisci Tutti")
	public String inserisciTutti(HttpServletRequest request, Model model, @ModelAttribute InserisciStampaForm ff,HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  inserisciTutti della classe " +
						this.getClass().getName(),AggiungiStampeController.class);
		try{
			ArrayList listaStampe= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_TOTALE);
			
			ArrayList listaStampeMod= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_MODIFICA_PROFILO);
			//aggiungo tutte le stampe non ancora selezionate
			for(int i=0;i<listaStampe.size();i++){
				DAnagraficheStampeVO vo = (DAnagraficheStampeVO)listaStampe.get(i);
				if(Util.isEmpty(vo.getSelected()))
					listaStampeMod.add(vo);
			}
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_MODIFICA_PROFILO, listaStampeMod);
	    Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		ModificaProfiloStampaForm myForm = new ModificaProfiloStampaForm();
		myForm.setCodiceProfilo(p.getCodi_pk_profilo());
		myForm.setDescrizioneProfilo(p.getDesc_profilo());
		model.addAttribute("modificaProfiloStampaForm", myForm);
		
		
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/elencoStampeDaAggiugere";
			//throw new ApplicationException(e.getMessage());
		}	
		return "jsp/modificaProfiloStampe";
	}
}
