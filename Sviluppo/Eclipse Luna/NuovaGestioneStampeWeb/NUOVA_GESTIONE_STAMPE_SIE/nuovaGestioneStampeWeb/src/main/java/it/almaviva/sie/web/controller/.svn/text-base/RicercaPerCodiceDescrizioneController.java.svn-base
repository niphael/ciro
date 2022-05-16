/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.util.ArrayList;

import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.ParametriCodiceDescrizioneTO;
import it.almaviva.sie.business.service.MicrostrategyService;
import it.almaviva.sie.business.service.RicercaPerCodiceDescrizioneService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.GestioneProfiliStampeForm;
import it.almaviva.sie.web.form.InserimentoDestinatariForm;
import it.almaviva.sie.web.form.RicercaDestinatariForm;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
import it.almaviva.sie.web.form.SchedulazioneReportForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;
import it.almaviva.sie.web.validation.RicercaPerCodiceDescrizioneValidator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/ricercaCodiceDescrizione.html")
public class RicercaPerCodiceDescrizioneController {
	
	private SessionContainer sc = new SessionContainer();
	
	@Autowired
	private MicrostrategyService service2;
	@Autowired
	private RicercaPerCodiceDescrizioneService service;
	
	@RequestMapping(params="metodo=scorriLista")
	public String scorriLista(HttpServletRequest request, HttpSession session,Model model,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  scorriLista della classe " +
						this.getClass().getName(),RicercaTitoliReportController.class);
		model.addAttribute("ricercaPerCodiceDescrizioneForm",myForm);
		String forward="listaCodiceDescrizione";
		FunzioneSIE funzione=(FunzioneSIE) sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		if(funzione.getCodice().equals("INS_UTENTI_REPOR")){
			
			forward="listaLoginMstr";
		}
	if(funzione.getCodice().equals("CERCA_DEST")){
			
		forward= "listaDestinatari";	
		}
	if(funzione.getCodice().equals("CERCA_AMM")){
		
		forward="listaAmministrazioni";	
		}
		return "jsp/"+forward;	
		
	}
	
	@RequestMapping(params="metodo=Ritorna")
	public String ritorna(HttpServletRequest request, HttpSession session,Model model )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ritorna della classe " +
						this.getClass().getName(),RicercaTitoliReportController.class);
		FunzioneSIE funzione=(FunzioneSIE) sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		String forward="";
		
		if(funzione.getCodice().equals("GEST_STAMPE")){
			forward="ricercaProfiliStampe";
			GestioneProfiliStampeForm myForm = (GestioneProfiliStampeForm)sc.getObjectInSession(session, "gestioneProfiliStampeForm");
			model.addAttribute("gestioneProfiliStampeForm",myForm);
		}
		if(funzione.getCodice().equals("INS_UTENTI_REPOR")){
			forward="ricercaDestinatari";
			RicercaDestinatariForm myForm = (RicercaDestinatariForm) sc.getObjectInSession(session, "ricercaDestinatariForm");
			model.addAttribute("ricercaDestinatariForm",myForm);
		}
		if(funzione.getCodice().equals("CERCA_DEST") || funzione.getCodice().equals("CERCA_AMM")){
			forward="inserisciDestinatario";
			InserimentoDestinatariForm myForm = (InserimentoDestinatariForm) sc.getObjectInSession(session, "inserimentoDestinatariForm");
			model.addAttribute("inserimentoDestinatariForm",myForm);
			
		}
	return "jsp/"+forward;	
	}
	
	@RequestMapping(params="metodo=Cerca")
	public String cerca(HttpServletRequest request, HttpSession session,Model model,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm )
			throws ApplicationException {
				TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cerca della classe " +
						this.getClass().getName(),RicercaTitoliReportController.class);
				
				String forward="";
				FunzioneSIE funzione=(FunzioneSIE) sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
				try{
					ParametriCodiceDescrizioneTO param = new ParametriCodiceDescrizioneTO();
					if(funzione.getCodice().equals("INS_UTENTI_REPOR")){
						param.setDescrizione(myForm.getDescrizione());
						ArrayList listaLoginMstr = service2.getListaLoginMstr(param);
						model.addAttribute(WebApplicationConstants.LISTA_LOGIN_MSTR,listaLoginMstr);
						sc.putObjectInSession(session, WebApplicationConstants.LISTA_LOGIN_MSTR, listaLoginMstr);
						forward="listaLoginMstr";
					}
					if(funzione.getCodice().equals("CERCA_DEST")){
						param=(ParametriCodiceDescrizioneTO) sc.getObjectInSession(session, WebApplicationConstants.PARAMETRI_RICERCA);
						param.setDescrizione(myForm.getDescrizione());
						ArrayList listaDest=service.getListaUtentiDestinatari(param);
						model.addAttribute(WebApplicationConstants.LISTA_DESTINATARI,listaDest);
						sc.putObjectInSession(session, WebApplicationConstants.LISTA_DESTINATARI, listaDest);
						forward= "listaDestinatari";	
					}	
					if(funzione.getCodice().equals("CERCA_AMM")){
						param.setDescrizione(myForm.getDescrizione());
						ArrayList listaDest=service.getListaAmministrazione(param);
						model.addAttribute(WebApplicationConstants.LISTA_AMMINISTRAZIONI,listaDest);
						sc.putObjectInSession(session, WebApplicationConstants.LISTA_AMMINISTRAZIONI, listaDest);
						forward= "listaAmministrazioni";	
					}	
				}
				catch (Exception e) {
					e.printStackTrace();
					TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
							+ e.getMessage(), InsDestinatariReportController.class);
					model.addAttribute("errore","Errore: "+e.getMessage());
					//return "jsp/inserisciDestinatario";
				}
				return "jsp/"+forward;	
	}
	@RequestMapping(params="metodo=Inserisci")
	public String inserisci(HttpServletRequest request, HttpSession session,Model model,@ModelAttribute RicercaPerCodiceDescrizioneForm myForm,Errors result){
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  inserisci della classe " +
						this.getClass().getName(),RicercaTitoliReportController.class);
		FunzioneSIE funzione=(FunzioneSIE) sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
		String forward="";
		ArrayList lista= new ArrayList();
		//valido i dati immessi nel form
				new RicercaPerCodiceDescrizioneValidator().validate(myForm, result);			
				if (result.hasErrors()) {
					//sono stati riscontrati errori di validazione sui campi del form
						model.addAttribute("ricercaPerCodiceDescrizioneForm", myForm);
						if(funzione.getCodice().equals("INS_UTENTI_REPOR"))
						forward="listaLoginMstr";
						if(funzione.getCodice().equals("CERCA_DEST"))
							forward= "listaDestinatari";	
					
						if(funzione.getCodice().equals("CERCA_AMM"))
							forward= "listaAmministrazioni";	
						
					return "jsp/"+forward;
				}
		if(funzione.getCodice().equals("INS_UTENTI_REPOR")){
			lista= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_LOGIN_MSTR);
			forward="ricercaDestinatari";
			CodiceDescrizioneTO anag = (CodiceDescrizioneTO)lista.get(Integer.parseInt(myForm.getIndexSelezionato()));
			RicercaDestinatariForm ff = (RicercaDestinatariForm) sc.getObjectInSession(session, "ricercaDestinatariForm");
			ff.setLoginMstr(anag.getDescrizione());
			model.addAttribute("ricercaDestinatariForm",ff);
		}
		if(funzione.getCodice().equals("CERCA_DEST")){
			lista= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_DESTINATARI);
			forward="inserisciDestinatario";
			InserimentoDestinatariForm ff = (InserimentoDestinatariForm) sc.getObjectInSession(session, "inserimentoDestinatariForm");
			CodiceDescrizioneTO anag = (CodiceDescrizioneTO)lista.get(Integer.parseInt(myForm.getIndexSelezionato()));
			ff.setNome(anag.getCodice());
			ff.setEmail(anag.getDescrizione());
			model.addAttribute("inserimentoDestinatariForm",ff);
		}
		if(funzione.getCodice().equals("CERCA_AMM")){
			lista= (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_AMMINISTRAZIONI);
			forward="inserisciDestinatario";
			InserimentoDestinatariForm ff = (InserimentoDestinatariForm) sc.getObjectInSession(session, "inserimentoDestinatariForm");
			CodiceDescrizioneTO anag = (CodiceDescrizioneTO)lista.get(Integer.parseInt(myForm.getIndexSelezionato()));
			ff.setAmministrazione(anag.getDescrizione());
			model.addAttribute("inserimentoDestinatariForm",ff);
		}
		return "jsp/"+forward;	
	}
}
