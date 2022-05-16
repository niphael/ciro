/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.util.ArrayList;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.web.form.BaseForm;
import it.almaviva.sie.web.form.InserisciStampaForm;
import it.almaviva.sie.web.form.ModificaProfiloStampaForm;
import it.almaviva.sie.web.form.StampeForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

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
@RequestMapping("/attivazioneStampe.html")
public class AttivazioneStampeController extends MyAbstractController{
	private SessionContainer sc = new SessionContainer();
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
	
	@RequestMapping(params="metodo=Salva")
	public String salva(Model model,HttpServletRequest req, @ModelAttribute InserisciStampaForm myForm, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  salva della classe " +
						this.getClass().getName(),AttivazioneStampeController.class);
		ArrayList listaStampe= (ArrayList) sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_TOTALE);
		ArrayList listaStampeAttive= (ArrayList) sc.getObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_ATTIVE);
		ArrayList listaStampeDaAttivare= new ArrayList();
		ArrayList listaStampeDaDisattivare= new ArrayList();
		ArrayList listaStampeCheck= new ArrayList();
		
		for (int i = 0; i < myForm.getIndexSelezionati().length; i++) {

			int index = Integer.parseInt(myForm.getIndexSelezionati()[i]);
			DAnagraficheStampeVO vo= (DAnagraficheStampeVO) listaStampe.get(index);
			listaStampeCheck.add(vo);
			//si sta attivando una stampa disattiva in precedenza
			if(!listaStampeAttive.contains(vo))
				listaStampeDaAttivare.add(vo);
	
		}
		
		for (int i = 0; i < listaStampe.size(); i++) {
			DAnagraficheStampeVO vo= (DAnagraficheStampeVO) listaStampe.get(i);
			if(vo.getFlag_stampa_attiva().equals("1") && !listaStampeCheck.contains(vo))
				listaStampeDaDisattivare.add(vo);
		}
		if (listaStampeDaAttivare.isEmpty() && listaStampeDaDisattivare.isEmpty()) {
			model.addAttribute("errore","Non e' stata richiesta alcuna modifica.");
			return "jsp/elencoStampeDaAttivare";
			
		}
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_DA_ATTIVARE, listaStampeDaAttivare);
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_DA_DISATTIVARE, listaStampeDaDisattivare);
		sc.putObjectInSession(session, WebApplicationConstants.SAVE_CRONOLOGICO, WebApplicationConstants.CRONOLOGICO_ON);
		model.addAttribute("inserisciStampaForm", myForm);
		return "jsp/confermaAttivazioneStampe";
	}
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Pulisci")
	public String pulisci(HttpServletRequest request, Model model,@ModelAttribute InserisciStampaForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  avanti della classe " +
						this.getClass().getName(),AttivazioneStampeController.class);
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
	
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Indietro")
	public String indietro(HttpServletRequest request, Model model, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  indietro della classe " +
						this.getClass().getName(),AttivazioneStampeController.class);
		try{
			ArrayList listaPercorsi =(ArrayList) sc.getObjectInSession(session, WebApplicationConstants.LISTA_PERCORSI);
			StampeForm myForm = new StampeForm();
			DAnagraficheStampeVO dd  = (DAnagraficheStampeVO)sc.getObjectInSession(session, WebApplicationConstants.PARAMETRI_RICERCA);
			myForm.setPath(dd.getObject_path());
			myForm.setDescStampa(dd.getText_object_name());
			myForm.setListaStampe(listaPercorsi);
			model.addAttribute("stampeForm",myForm);
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/elencoStampeDaAttivare";
			//throw new ApplicationException(e.getMessage());
		}	
		return "jsp/ricercaStampeDaAttivare";
	}
}
