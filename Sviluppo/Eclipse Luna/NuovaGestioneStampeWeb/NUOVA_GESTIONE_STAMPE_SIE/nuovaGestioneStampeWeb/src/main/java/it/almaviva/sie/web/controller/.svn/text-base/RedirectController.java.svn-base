package it.almaviva.sie.web.controller;


//import it.almaviva.sie.business.util.ApplicationException;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Map;

import it.almaviva.sie.business.exception.MstrException;
import it.almaviva.sie.business.model.DUtentiProfiliVO;
import it.almaviva.sie.business.model.MstrConnectionParam;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.service.DProfiloService;
import it.almaviva.sie.business.service.DUtentiProfiliService;
import it.almaviva.sie.business.service.DVociMenuService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.PropertyConfigurer;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.form.ProfiliForm;
import it.almaviva.sie.web.form.StampeForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RedirectController 
{
	@Autowired
	private DUtentiProfiliService service;
	@Autowired
	private PropertyConfigurer configurer;
	@Autowired
	private DAnagraficaStampeService service1;
	@Autowired
	private DProfiloService service2;
	@Autowired
	private DVociMenuService service3;
	private SessionContainer sc = new SessionContainer();
	
	
	private void startFunzione(HttpServletRequest request,HttpSession session) throws MstrException{
		sc.cleanSessione(session);
		
		MstrConnectionParam mstrConnectionParam = new MstrConnectionParam();
		
		if(request.getParameter("start")!=null){
			
			mstrConnectionParam=service1.getParametriConnessione();
			if(request.getParameter("simulazione")!=null && request.getParameter("simulazione").equals("Y")){
				mstrConnectionParam.setSimulazione(request.getParameter("simulazione"));
				}
			try {
					
				String prov="";
				if(request.getParameter("param2")!=null)
		prov=URLDecoder.decode(request.getParameter("param2"),"UTF-8");
				mstrConnectionParam.setProvenienza(prov);
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			
		}
		sc.putObjectInSession(request.getSession(false), "mstrConnectionParam", mstrConnectionParam);
		
		//metto in sessione il nome della funzione
		FunzioneSIE funzione = new FunzioneSIE();
		funzione.setCodice(request.getParameter("funzione"));
		funzione.setNomeFunzione(request.getParameter("descFunzione"));
		sc.putObjectInSession(session, WebApplicationConstants.FUNZIONE, funzione);
	}
	@RequestMapping("/viewStampe.html")
	public String visualizzaStampe(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
	
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  indietro della classe " +
						this.getClass().getName(),GestioneReportController.class);
		
		startFunzione(request, session);
		ArrayList listaProfili=null;	
		String forward="jsp/listaProfili";
		Utente utente = new Utente();
		String usr = (String)request.getParameter("utente");
		usr = usr.toUpperCase();
		utente.setUserName(usr);
		listaProfili=service.getProfiliByUserName(utente.getUserName());
		if(listaProfili.size()>1){
			ProfiliForm myForm = new ProfiliForm();
			myForm.setListProfili(listaProfili);
			model.addAttribute("profiliForm",myForm);			
			sc.putObjectInSession(session, "profiliForm", myForm);
		}
		else{
			DUtentiProfiliVO prof = (DUtentiProfiliVO) listaProfili.get(0);
			ArrayList listaStampe=service1.getStampeForProfilo(prof.getCodi_pk_profilo());
			StampeForm formStampe= new StampeForm();
			formStampe.setListaStampe(listaStampe);
			model.addAttribute("stampeForm", formStampe);
			//creo oggetto profilo che inserisco in sessione
			Profilo p = service2.getDettaglioProfilo(prof.getCodi_pk_profilo());
			p.setListaStampe(listaStampe);
			//recupero l'utente dalla sessione
			sc.putObjectInSession(session, "profilo", p);
			sc.putObjectInSession(session, "stampeForm", formStampe);
			
			forward="jsp/listaReport";
		}
		
		//creo oggetto Utente, valorizzo i parametri e lo inserisco in sessione
		utente.setListaProfili(listaProfili);
		sc.putObjectInSession(request.getSession(false), "utente", utente);
		return forward;
	}
	@RequestMapping("/scambioPagina.html")
	public String init(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
		String usr=null;
		
		//pulisco la sessione
		sc.cleanSessione(session);
	    //recupero i profili mediante username dell'utente
		//caso in cui si stia accedendo da sviluppo
		Map valuer = configurer.getResolvedProps();
		String abilitaSso = (String) valuer.get(new String("abilita.sso"));
		int fase = new Integer(abilitaSso).intValue();
		String forward="jsp/welcomePage";
		MstrConnectionParam mstrConnectionParam = service1.getParametriConnessione();
		if(request.getParameter("start")!=null){
			try {
				
		String prov=URLDecoder.decode(request.getParameter("param2"),"UTF-8");
			mstrConnectionParam.setProvenienza(prov);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		sc.putObjectInSession(request.getSession(false), "mstrConnectionParam", mstrConnectionParam);
	
		
	
		try{
		if (fase==2){
			return "jsp/listaUtenti";	
		}else{
			if( request.getHeaders("username").hasMoreElements() ){
				
				usr = String.valueOf( request.getHeaders("username").nextElement() );
				usr = usr.toUpperCase();
				ArrayList listaFunzioni = service3.getListaVociMenu(usr);
				sc.putObjectInSession(request.getSession(false), "listaFunzioni", listaFunzioni);
				TraceLogger.traceLog(TraceLogger.getDEBUG(),
						"User recuperato dall'SSO - " + usr,
						RedirectController.class);
				//recupero i profili mediante username dell'utente SSo
				/*listaProfili=service.getProfiliByUserName(usr);
				if(listaProfili.size()>1){
					ProfiliForm myForm = new ProfiliForm();
					myForm.setListProfili(listaProfili);
					model.addAttribute("profiliForm",myForm);			
					sc.putObjectInSession(session, "profiliForm", myForm);
				}else{
					DUtentiProfiliVO prof = (DUtentiProfiliVO) listaProfili.get(0);
					ArrayList listaStampe=service1.getStampeForProfilo(prof.getCodi_pk_profilo());
					StampeForm formStampe= new StampeForm();
					formStampe.setListaStampe(listaStampe);
					model.addAttribute("stampeForm", formStampe);
					//creo oggetto profilo che inserisco in sessione
					Profilo p = service2.getDettaglioProfilo(prof.getCodi_pk_profilo());
					p.setListaStampe(listaStampe);
					//recupero l'utente dalla sessione
					Utente utente = (Utente)sc.getObjectInSession(session, "utente");
					sc.putObjectInSession(session, "profilo", p);
					sc.putObjectInSession(session, "stampeForm", formStampe);
					forward="jsp/listaReport";
				}*/
				
				//creo oggetto Utente, valorizzo i parametri e lo inserisco in sessione
				Utente utente = new Utente();
				utente.setUserName(usr);
			
				//utente.setListaProfili(listaProfili);
				sc.putObjectInSession(request.getSession(false), "utente", utente);
				
				
				return forward;
			}else{
				model.addAttribute("errore","Utente non registrato nel sistema");
				return "jsp/errore";
			}
				
		}
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/errore";
			//throw new ApplicationException(e.getMessage());
			
		}

	}
	
	@RequestMapping("/simulaLogin.html")
	//metodo utilizzato in ambiente di sviluppo
	//caso in cui non si passa da SSO
	public String simulaLogin(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
		String usr=null;
		ArrayList listaProfili=null;
		usr = (String)request.getParameter("utente");
		usr = usr.toUpperCase();
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"User recuperato da pagina di simulazione - " + usr,
				RedirectController.class);
		String forward="jsp/welcomePage";
		try{
	    //recupero i profili mediante username dell'utente
		/*listaProfili=service.getProfiliByUserName(usr);
		
		if(listaProfili.size()>1){
			ProfiliForm myForm = new ProfiliForm();
			myForm.setListProfili(listaProfili);
			model.addAttribute("profiliForm",myForm);			
			sc.putObjectInSession(session, "profiliForm", myForm);
		}else{
			DUtentiProfiliVO prof = (DUtentiProfiliVO) listaProfili.get(0);
			ArrayList listaStampe=service1.getStampeForProfilo(prof.getCodi_pk_profilo());
			StampeForm formStampe= new StampeForm();
			formStampe.setListaStampe(listaStampe);
			model.addAttribute("stampeForm", formStampe);
			//creo oggetto profilo che inserisco in sessione
			Profilo p = service2.getDettaglioProfilo(prof.getCodi_pk_profilo());
			p.setListaStampe(listaStampe);
			//recupero l'utente dalla sessione
			sc.putObjectInSession(session, "profilo", p);
			sc.putObjectInSession(session, "stampeForm", formStampe);
			forward="jsp/listaReport";
		}
		
		*/
		//creo oggetto Utente, valorizzo i parametri e lo inserisco in sessione
		Utente utente = new Utente();
		utente.setUserName(usr);
		//utente.setListaProfili(listaProfili);
		sc.putObjectInSession(request.getSession(false), "utente", utente);
		ArrayList listaFunzioni = service3.getListaVociMenu(usr);
		sc.putObjectInSession(request.getSession(false), "listaFunzioni", listaFunzioni);
	/*	MstrConnectionParam mstrConnectionParam = service1.getParametriConnessione();
		sc.putObjectInSession(request.getSession(false), "mstrConnectionParam", mstrConnectionParam);*/
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			//throw new ApplicationException(e.getMessage());
			model.addAttribute("errore","Errore: "+e.getMessage());
		}
		return forward;
	
	}
	@RequestMapping("/viewListaProfili.html")
	public String viewListaProfili(HttpServletRequest request, Model model, HttpSession session){
		SessionContainer sc = new SessionContainer();
		Utente utente = (Utente)sc.getObjectInSession(session, "utente");
		ProfiliForm myForm= (ProfiliForm) sc.getObjectInSession(session, "profiliForm");
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		myForm.setCodiProfilo(p.getCodi_pk_profilo());
		model.addAttribute("profiliForm",myForm);
		sc.putObjectInSession(session, "profiliForm", myForm);
		return "jsp/listaProfili";
		
	}
}
