/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.MstrConnectionParam;
import it.almaviva.sie.business.model.ParametriCodiceDescrizioneTO;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.model.UtenteDestinatarioReportTO;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.service.MicrostrategyService;
import it.almaviva.sie.business.service.RicercaPerCodiceDescrizioneService;
import it.almaviva.sie.business.service.VerificaEsistenzaService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.InserimentoDestinatariForm;
import it.almaviva.sie.web.form.RicercaDestinatariForm;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
import it.almaviva.sie.web.form.SchedulazioneReportForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;
import it.almaviva.sie.web.validation.InserimentoDestinatarioValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/insDestinatariReport.html")
public class InsDestinatariReportController extends MyAbstractController{
	
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private MicrostrategyService service2;
	@Autowired
	private DAnagraficaStampeService service;
	
	@Autowired
	private RicercaPerCodiceDescrizioneService service1;
	
	@Autowired
	private VerificaEsistenzaService service3;
	
	@RequestMapping(method = RequestMethod.GET)
	public String init(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  init della classe " +
						this.getClass().getName(),InsDestinatariReportController.class);
		
		this.startFunzione(request, session, sc);
		RicercaDestinatariForm myForm = new RicercaDestinatariForm();
		model.addAttribute("ricercaDestinatariForm", myForm);
		//instanzio il form
		return "jsp/ricercaDestinatari";

	}
	
	@RequestMapping(method = RequestMethod.POST,params="cercaTitolo=...")
	public String cercaTitoloReport(HttpServletRequest request, Model model,@ModelAttribute RicercaDestinatariForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cercaTitoloReport della classe " +
						this.getClass().getName(),InsDestinatariReportController.class);
		try{
			RicercaPerCodiceDescrizioneForm ff = new RicercaPerCodiceDescrizioneForm();
			ff.setDescrizione(myForm.getDescReport());
			DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
			vo.setText_object_name(myForm.getDescReport());
			ArrayList listaStampe=Util.getListaCodiceDescrizione(service.getListaTitoliReport(vo));
			model.addAttribute(WebApplicationConstants.LISTA_STAMPE,listaStampe);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE, listaStampe);
			sc.putObjectInSession(session, "ricercaDestinatariForm", myForm);
			model.addAttribute("ricercaPerCodiceDescrizioneForm",ff);
			
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), InsDestinatariReportController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/ricercaDestinatari";
		}
		
		return "jsp/listaTitoliReport";	
	}
	
	
	@RequestMapping(method = RequestMethod.POST,params="cercaLogin=...")
	public String cercaLoginMstr(HttpServletRequest request, Model model,@ModelAttribute RicercaDestinatariForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cercaLoginMstr della classe " +
						this.getClass().getName(),InsDestinatariReportController.class);
		try {
			//imposto Parametri di connessione
			service2.impostaParametriConnessione();
			ParametriCodiceDescrizioneTO param = new ParametriCodiceDescrizioneTO();
			param.setDescrizione(myForm.getLoginMstr());
			RicercaPerCodiceDescrizioneForm ff = new RicercaPerCodiceDescrizioneForm();
			ff.setDescrizione(myForm.getLoginMstr());
			ArrayList listaLoginMstr = service2.getListaLoginMstr(param);
			model.addAttribute(WebApplicationConstants.LISTA_LOGIN_MSTR,listaLoginMstr);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_LOGIN_MSTR, listaLoginMstr);
			sc.putObjectInSession(session, "ricercaDestinatariForm", myForm);
			model.addAttribute("ricercaPerCodiceDescrizioneForm",ff);
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), InsDestinatariReportController.class);
			model.addAttribute("errore","Errore: non e' possibile recuperare la lista degli Utenti di Microstrategy");
			return "jsp/ricercaDestinatari";
			//throw new ApplicationException(e.getMessage());
		}
		return "jsp/listaLoginMstr";	
	}
	
	@RequestMapping(params="metodo=Pulisci")
	public String pulisci(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		RicercaDestinatariForm myForm = new RicercaDestinatariForm();
		myForm.setCodiceReport("");
		myForm.setDescReport("");
		myForm.setLoginMstr("");
		myForm.setTipoSpedizione("N");
		model.addAttribute("ricercaDestinatariForm",myForm);
		return "jsp/ricercaDestinatari";
		
	}
	@RequestMapping(params="metodo=Avanti")
	public String avanti(Model model,HttpServletRequest req, HttpSession session,@ModelAttribute RicercaDestinatariForm myForm,Errors result)throws ApplicationException, UnsupportedEncodingException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  avanti della classe " +
						this.getClass().getName(),InsDestinatariReportController.class);
		UtenteDestinatarioReportTO destinatario = new UtenteDestinatarioReportTO();
		//valido i dati immessi nel form
		new InserimentoDestinatarioValidator().validate(result, myForm);			
		if (result.hasErrors()) {
			//sono stati riscontrati errori di validazione sui campi del form
				model.addAttribute("ricercaDestinatariForm", myForm);
			
			return "jsp/ricercaDestinatari";
		}
		if(!verificaEsistenzaDati(myForm, model))
			return "jsp/ricercaDestinatari";
	
		
		destinatario.setTitoloReport(myForm.getDescReport());
		destinatario.setIdReport(myForm.getCodiceReport());
		destinatario.setLoginMicrostrategy(myForm.getLoginMstr());
		destinatario=service3.verificaEsistenzaDest(destinatario);
		if(!Util.isEmpty(destinatario.getErrorMessage())){
			model.addAttribute("errore", destinatario.getErrorMessage());
			return "jsp/ricercaDestinatari";
		}
		destinatario.setTipoSpedizione(myForm.getTipoSpedizione());
		destinatario.setDescTipoSpedizione("NORMALE");
		if(myForm.getTipoSpedizione().equals("P"))
			destinatario.setDescTipoSpedizione("PEC");
		sc.putObjectInSession(session, WebApplicationConstants.UTENTE_DESTINATARIO, destinatario);
		InserimentoDestinatariForm insForm = new InserimentoDestinatariForm();
		ArrayList<CodiceDescrizioneTO> listaPer=service1.getListaPeriodicitaSchedulabili();
		insForm.setListaPeriodicita(listaPer);
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_PERIODICITA, listaPer);
		model.addAttribute("inserimentoDestinatariForm",insForm);
		
		return "jsp/inserisciDestinatario";
		
	}
	
	private boolean verificaEsistenzaDati(@ModelAttribute RicercaDestinatariForm myForm,Model model) throws UnsupportedEncodingException{
		
		boolean esiste=false;
		//verifico esistenza titolo report
		if(!Util.isEmpty(myForm.getDescReport())){
			DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
			vo.setText_object_name(myForm.getDescReport());
			ArrayList listaStampe=Util.getListaCodiceDescrizione(service.getListaTitoliReport(vo));
			for(int i=0;i<listaStampe.size();i++){
				CodiceDescrizioneTO cod = (CodiceDescrizioneTO)listaStampe.get(i);
				if(cod.getDescrizione().equals(myForm.getDescReport()))
					esiste=true;
			}
		}
		if(!esiste){
			model.addAttribute("errore", this.getMessage("camp.non.esistente", new String[] { "Titolo Report" }));
			return esiste;
		}
		try{
				esiste=false;
				//verifico esistenza login
				if(!Util.isEmpty(myForm.getLoginMstr())){
					//imposto Parametri di connessione
					service2.impostaParametriConnessione();
					ParametriCodiceDescrizioneTO param = new ParametriCodiceDescrizioneTO();
					param.setDescrizione(myForm.getLoginMstr());
					ArrayList listaLoginMstr = service2.getListaLoginMstr(param);		
					for(int i=0;i<listaLoginMstr.size();i++){
						CodiceDescrizioneTO cod = (CodiceDescrizioneTO)listaLoginMstr.get(i);
						if(cod.getDescrizione().equals(myForm.getLoginMstr()))
							esiste=true;
					}
				}
			
	
		if(!esiste){
			model.addAttribute("errore", this.getMessage("camp.non.esistente", new String[] { "Login Microstrategy" }));
			return esiste;
		}
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), InsDestinatariReportController.class);
			model.addAttribute("errore", this.getMessage("lista.utenti.microstrategy.non.disponibile"));
			esiste=false;
			//throw new ApplicationException(e.getMessage());
		}
		return esiste;
	}
}
