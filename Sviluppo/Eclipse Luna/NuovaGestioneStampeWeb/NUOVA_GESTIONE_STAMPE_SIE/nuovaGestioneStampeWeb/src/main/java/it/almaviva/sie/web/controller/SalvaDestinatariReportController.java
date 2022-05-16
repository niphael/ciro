/**
 * 
 */
package it.almaviva.sie.web.controller;

import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.DAmministrazioneVO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.ParametriCodiceDescrizioneTO;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.model.UtenteDestinatarioReportTO;
import it.almaviva.sie.business.service.CronologicoService;
import it.almaviva.sie.business.service.GestioneUtentiService;
import it.almaviva.sie.business.service.RicercaPerCodiceDescrizioneService;
import it.almaviva.sie.business.service.VerificaEsistenzaService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.InserimentoDestinatariForm;
import it.almaviva.sie.web.form.RicercaDestinatariForm;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;
import it.almaviva.sie.web.validation.InserimentoDestinatarioValidator;

import java.sql.SQLException;
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
@RequestMapping("/salvaDestinatariReport.html")
public class SalvaDestinatariReportController extends MyAbstractController{
	@Autowired
	private RicercaPerCodiceDescrizioneService service;
	@Autowired
	private VerificaEsistenzaService service1;
	
	@Autowired
	private GestioneUtentiService service2;
	
	@Autowired
	private CronologicoService service3;
	private SessionContainer sc = new SessionContainer();
	
	
	
	@RequestMapping(method = RequestMethod.POST,params="cercaDestinatario=...")
	public String cercaDestinatario(HttpServletRequest request, Model model,@ModelAttribute InserimentoDestinatariForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cercaDestinatario della classe " +
						this.getClass().getName(),SalvaDestinatariReportController.class);
		try{
			ArrayList listaPer = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PERIODICITA);
			myForm.setListaPeriodicita(listaPer);
			RicercaPerCodiceDescrizioneForm ff = new RicercaPerCodiceDescrizioneForm();
			ff.setDescrizione(myForm.getNome());
			ParametriCodiceDescrizioneTO param = new ParametriCodiceDescrizioneTO();
			param.setDescrizione(myForm.getNome());
			UtenteDestinatarioReportTO destinatario = (UtenteDestinatarioReportTO)sc.getObjectInSession(session, WebApplicationConstants.UTENTE_DESTINATARIO);
			
			if(destinatario.getTipoSpedizione().equals("N"))
				param.setTipologiaRicerca("destinatario");
			else
				param.setTipologiaRicerca("destinatario pec");
				
			
			ArrayList listaDest=service.getListaUtentiDestinatari(param);
			model.addAttribute(WebApplicationConstants.LISTA_DESTINATARI,listaDest);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_DESTINATARI, listaDest);
			model.addAttribute("ricercaPerCodiceDescrizioneForm",ff);
			sc.putObjectInSession(session, "inserimentoDestinatariForm", myForm);
			//metto in sessione il nome della funzione
			FunzioneSIE funzione = (FunzioneSIE) sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
			funzione.setCodice("CERCA_DEST");
			sc.putObjectInSession(session, WebApplicationConstants.FUNZIONE, funzione);
			sc.putObjectInSession(session, WebApplicationConstants.PARAMETRI_RICERCA, param);
			
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), InsDestinatariReportController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/inserisciDestinatario";
		}
		
		return "jsp/listaDestinatari";	
	}
	
	@RequestMapping(method = RequestMethod.POST,params="cercaAmministrazione=...")
	public String cercaAmministrazione(HttpServletRequest request, Model model,@ModelAttribute InserimentoDestinatariForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cercaAmministrazione della classe " +
						this.getClass().getName(),SalvaDestinatariReportController.class);
		try{
			ArrayList listaPer = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PERIODICITA);
			myForm.setListaPeriodicita(listaPer);
			RicercaPerCodiceDescrizioneForm ff = new RicercaPerCodiceDescrizioneForm();
			ff.setDescrizione(myForm.getAmministrazione());
			ParametriCodiceDescrizioneTO param = new ParametriCodiceDescrizioneTO();
			param.setDescrizione(myForm.getAmministrazione());
			param.setTipologiaRicerca("amministrazione");
			ArrayList listaAmm = service.getListaAmministrazione(param);
			model.addAttribute(WebApplicationConstants.LISTA_AMMINISTRAZIONI,listaAmm);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_AMMINISTRAZIONI, listaAmm);
			model.addAttribute("ricercaPerCodiceDescrizioneForm",ff);
			sc.putObjectInSession(session, "inserimentoDestinatariForm", myForm);
			//metto in sessione il nome della funzione
			FunzioneSIE funzione = (FunzioneSIE) sc.getObjectInSession(session, WebApplicationConstants.FUNZIONE);
			funzione.setCodice("CERCA_AMM");
			sc.putObjectInSession(session, WebApplicationConstants.FUNZIONE, funzione);
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), InsDestinatariReportController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/inserisciDestinatario";
		}
		return "jsp/listaAmministrazioni";	
	}
	@RequestMapping(params="metodo=Salva")
	public String salva(Model model,HttpServletRequest req, HttpSession session,@ModelAttribute InserimentoDestinatariForm myForm,Errors result)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  salva della salva " +
						this.getClass().getName(),SalvaDestinatariReportController.class);
		try{
			//valido i dati immessi nel form
			new InserimentoDestinatarioValidator().validate(result, myForm,getContext());		
			ArrayList listaPer = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PERIODICITA);
			if (result.hasErrors()) {
				myForm.setListaPeriodicita(listaPer);
				//sono stati riscontrati errori di validazione sui campi del form
				model.addAttribute("inserimentoDestinatariForm", myForm);
				return "jsp/inserisciDestinatario";
			}
			UtenteDestinatarioReportTO destinatario = (UtenteDestinatarioReportTO)sc.getObjectInSession(session, WebApplicationConstants.UTENTE_DESTINATARIO);
			destinatario.setDestinatario(myForm.getNome());
			destinatario.setEmail(myForm.getEmail());
			destinatario.setCodicePeriodicita(myForm.getPeriodicita());
			for(int i=0;i<listaPer.size();i++){
				CodiceDescrizioneTO cod = (CodiceDescrizioneTO)listaPer.get(i);
				if(cod.getCodice().equals(myForm.getPeriodicita()))
					destinatario.setDescPeriodicita(cod.getDescrizione());
			}
			destinatario.setAmministrazione(myForm.getAmministrazione());
			//verifico esistenza di amministrazione
			DAmministrazioneVO amm = service1.getAmministrazione(myForm.getAmministrazione());
			if(amm==null){
				model.addAttribute("errore", this.getMessage("camp.non.esistente", new String[] { "Amministrazione" }));
				myForm.setListaPeriodicita(listaPer);
				//sono stati riscontrati errori di validazione sui campi del form
				model.addAttribute("inserimentoDestinatariForm", myForm);
				return "jsp/inserisciDestinatario";
			}else
				destinatario.setCodiceAmministrazione(amm.getCOD_LIV01()+amm.getCOD_LIV02()+amm.getCOD_LIV03()+amm.getCOD_LIV04()+amm.getCOD_LIV05());
			destinatario.setOggetto(myForm.getOggetto());
			destinatario.setTesto(myForm.getTesto());
			destinatario.setNote(myForm.getNote());
			sc.putObjectInSession(session, "inserimentoDestinatariForm", myForm);
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), InsDestinatariReportController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/inserisciDestinatario";
		}
		
		sc.putObjectInSession(session, WebApplicationConstants.SAVE_CRONOLOGICO, WebApplicationConstants.CRONOLOGICO_ON);
		return "jsp/confermaInserisciDestinatario";
		
	}
	@RequestMapping(params="metodo=Conferma")
	public String conferma(Model model, HttpSession session,@ModelAttribute InserimentoDestinatariForm myForm)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  conferma della salva " +
						this.getClass().getName(),SalvaDestinatariReportController.class);
		UtenteDestinatarioReportTO destinatario = (UtenteDestinatarioReportTO)sc.getObjectInSession(session, WebApplicationConstants.UTENTE_DESTINATARIO);
		destinatario.setFunzione("INS_UTENTI_REPOR");
		Utente utente = (Utente) sc.getObjectInSession(session, "utente");
		destinatario.setUtente(utente.getUserName());
		byte[] compressedHTML = (byte[])sc.getObjectInSession(session, WebApplicationConstants.HTML_CRONOLOGICO);
		destinatario.setCronologicoHTML(compressedHTML); 
		try{
		service2.inserisciDestinatarioReport(destinatario);
		service3.write(destinatario);
		model.addAttribute("ok",new Object());
		}
		catch (SQLException e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), SalvaDestinatariReportController.class);
			model.addAttribute("errore",this.getMessage("errore.sql"));
		}
		catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), SalvaDestinatariReportController.class);
			model.addAttribute("errore",this.getMessage("errore.sql"));
		}
		return "jsp/confermaInserisciDestinatario";
	}
	
	@RequestMapping(params="metodo=Ritorna")
	public String ritorna(Model model, HttpSession session,@ModelAttribute InserimentoDestinatariForm myForm)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ritorna della salva " +
						this.getClass().getName(),SalvaDestinatariReportController.class);
		RicercaDestinatariForm ff = (RicercaDestinatariForm)sc.getObjectInSession(session, "ricercaDestinatariForm");
		model.addAttribute("ricercaDestinatariForm", ff);
		return "jsp/ricercaDestinatari";

	}
	
	@RequestMapping(params="metodo=Ok")
	public String ok(Model model, HttpSession session,@ModelAttribute InserimentoDestinatariForm myForm)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ritorna della ok " +
						this.getClass().getName(),SalvaDestinatariReportController.class);
		RicercaDestinatariForm ff = new RicercaDestinatariForm();
		model.addAttribute("ricercaDestinatariForm", ff);
		return "jsp/ricercaDestinatari";

	}
	
	@RequestMapping(params="metodo=Pulisci")
	public String pulisci(Model model, HttpSession session,@ModelAttribute InserimentoDestinatariForm myForm)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ritorna della Pulisci " +
						this.getClass().getName(),SalvaDestinatariReportController.class);
		myForm.setNome("");
		myForm.setEmail("");
		ArrayList listaPer = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PERIODICITA);
		myForm.setListaPeriodicita(listaPer);
		myForm.setPeriodicita("");
	
		myForm.setAmministrazione("");
		myForm.setOggetto("");
		myForm.setTesto("");
		myForm.setNote("");
		model.addAttribute("inserimentoDestinatariForm", myForm);
		return "jsp/inserisciDestinatario";

	}
	
	@RequestMapping(params="metodo=Indietro")
	public String indietro(Model model, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  indietro della indietro " +
						this.getClass().getName(),SalvaDestinatariReportController.class);
		InserimentoDestinatariForm ff = (InserimentoDestinatariForm)sc.getObjectInSession(session, "inserimentoDestinatariForm");
		ArrayList listaPer = (ArrayList)sc.getObjectInSession(session, WebApplicationConstants.LISTA_PERIODICITA);
		ff.setListaPeriodicita(listaPer);
		model.addAttribute("inserimentoDestinatariForm", ff);
		return "jsp/inserisciDestinatario";

	}
}
