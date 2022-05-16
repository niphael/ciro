/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.MstrConnectionParam;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
import it.almaviva.sie.web.form.SchedulazioneReportForm;
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
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/gestSchedInvioReport.html")
public class SchedulazioneInvioReportController extends MyAbstractController{
	
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	

	@RequestMapping(method = RequestMethod.GET)
	public String init(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  init della classe " +
						this.getClass().getName(),SchedulazioneInvioReportController.class);
		
		startFunzione(request, session,sc);
		//instanzio il form
		SchedulazioneReportForm myForm = new SchedulazioneReportForm();
		model.addAttribute("schedulazioneReportForm", myForm);
		return "jsp/scegliReport";

	}
	@RequestMapping(method = RequestMethod.POST,params="metodo=...")
	public String cercaTitoloReport(HttpServletRequest request, Model model,@ModelAttribute SchedulazioneReportForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cercaTitoloReport della classe " +
						this.getClass().getName(),SchedulazioneInvioReportController.class);
		try{
			RicercaPerCodiceDescrizioneForm ff = new RicercaPerCodiceDescrizioneForm();
			ff.setDescrizione(myForm.getDescReport());
			DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
			vo.setText_object_name(myForm.getDescReport());
			ArrayList listaStampe=Util.getListaCodiceDescrizione(service.getListaTitoliReport(vo));
			model.addAttribute(WebApplicationConstants.LISTA_STAMPE,listaStampe);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE, listaStampe);
			sc.putObjectInSession(session, "schedulazioneReportForm", myForm);
			model.addAttribute("ricercaPerCodiceDescrizioneForm",ff);
			
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/scegliReport";
		}
		
		return "jsp/listaTitoliReport";	
	}
	
	@RequestMapping(params="metodo=Pulisci")
	public String pulisci(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		SchedulazioneReportForm myForm = new SchedulazioneReportForm();
		myForm.setCodiceReport("");
		myForm.setDescReport("");
		model.addAttribute("schedulazioneReportForm",myForm);
		return "jsp/scegliReport";
		
	}
	
	@RequestMapping(params="metodo=Cerca")
	public String cerca(Model model,HttpServletRequest req,@ModelAttribute SchedulazioneReportForm myForm, HttpSession session)throws ApplicationException, UnsupportedEncodingException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cerca della classe " +
						this.getClass().getName(),SchedulazioneInvioReportController.class);
		DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
		vo.setText_object_name(myForm.getDescReport());
		ArrayList listaStampeSchedulabili=Util.getListaCodiceDescrizione(service.getListaTitoliReport(vo));
		model.addAttribute(WebApplicationConstants.LISTA_STAMPE_SCHEDULABILI,listaStampeSchedulabili);
		sc.putObjectInSession(session, "schedulazioneReportForm", myForm);
		return "jsp/listaStampeSchedulabili";
	}

}
