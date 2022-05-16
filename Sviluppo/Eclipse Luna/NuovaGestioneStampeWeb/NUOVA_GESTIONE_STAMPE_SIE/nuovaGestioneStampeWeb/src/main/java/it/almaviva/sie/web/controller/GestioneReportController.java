/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.util.ArrayList;
import java.util.StringTokenizer;

import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.service.DProfiloService;
import it.almaviva.sie.business.service.MicrostrategyService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.web.form.ProfiliForm;
import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;
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
@RequestMapping("/viewDettaglioReport.html")
public class GestioneReportController  {
	
	private SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	@Autowired
	private DProfiloService service1;
	@Autowired
	private MicrostrategyService service2;
	//@RequestMapping(params="metodo=init")
	@RequestMapping(method = RequestMethod.POST)
	public String init(HttpServletRequest request, Model model, @ModelAttribute ProfiliForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  init della classe " +
						this.getClass().getName(),GestioneReportController.class);
		String codiProfilo=myForm.getCodiProfilo();
		//recupero le stampe associate al profilo
		try{
		ArrayList listaStampe=service.getStampeForProfilo(codiProfilo);
		StampeForm formStampe= new StampeForm();
		formStampe.setListaStampe(listaStampe);
		model.addAttribute("stampeForm", formStampe);
		//creo oggetto profilo che inserisco in sessione
		Profilo p = service1.getDettaglioProfilo(codiProfilo);
		p.setListaStampe(listaStampe);
		SessionContainer sc = new SessionContainer();
		//recupero l'utente dalla sessione
		Utente utente = (Utente)sc.getObjectInSession(session, "utente");
		myForm.setListProfili(utente.getListaProfili());
		sc.putObjectInSession(session, "profilo", p);
		sc.putObjectInSession(session, "stampeForm", formStampe);
		sc.putObjectInSession(session, "profiliForm", myForm);
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			//throw new ApplicationException(e.getMessage());
		}
		return "jsp/listaReport";	
		
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String init2(HttpServletRequest request, Model model, @ModelAttribute ProfiliForm myForm, HttpSession session )
			throws ApplicationException {
		//ProfiliForm myForm= (ProfiliForm) sc.getObjectInSession(session, "profiliForm");
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_CARTELLE);
	    sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_REPORT);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		sc.removeObjectFromSession(session, WebApplicationConstants.PATH);
		sc.removeObjectFromSession(session, "stampeForm");
		StampeForm formStampe= (StampeForm)sc.getObjectInSession(session, "stampeForm");
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		formStampe.setListaStampe(p.getListaStampe());
		model.addAttribute("stampeForm", formStampe);
		
		return "jsp/listaReport";	
		
	}
	@RequestMapping(method = RequestMethod.POST,params="metodo=Indietro")
	public String indietro(Model model,HttpServletRequest req,HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  indietro della classe " +
						this.getClass().getName(),GestioneReportController.class);
		Utente utente = (Utente)sc.getObjectInSession(session, "utente");
		if(utente.getListaProfili().size()>1){
			ProfiliForm myForm= (ProfiliForm) sc.getObjectInSession(session, "profiliForm");
			Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
			myForm.setCodiProfilo(p.getCodi_pk_profilo());
			model.addAttribute("profiliForm",myForm);
			sc.putObjectInSession(session, "profiliForm", myForm);
			return "jsp/listaProfili";
		}else
			return "jsp/welcomePage";
		
	}
	@RequestMapping(params="metodo=Stampe personali")
	public String stampePersonali(Model model,HttpServletRequest req, @ModelAttribute StampeForm myForm, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  stampePersonali della classe " +
						this.getClass().getName(),GestioneReportController.class);
		//rimuovo gli oggetti dalla sessione
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_CARTELLE);
	    sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE);
	    sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_REPORT);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		sc.removeObjectFromSession(session, WebApplicationConstants.PATH);
		sc.removeObjectFromSession(session, "stampeForm");
		//recupero l'utente dalla sessione
		Utente utente = (Utente)sc.getObjectInSession(session, "utente");
		try {
			//imposto Parametri di connessione
			service2.impostaParametriConnessione();
			// Controllo se l'utente � abilitato alla visualizzazione delle stampe
			service2.checkUser(utente.getUserName(), utente.getUserName());
			 //Controllo tutte le stampe personali associate su Mstr 
			ArrayList listaReport = service2.getElencoStampePersonali(utente.getUserName());
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI, listaReport);
			sc.putObjectInSession(session, WebApplicationConstants.FORMATO, "modificabile");
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/listaReport";
			//throw new ApplicationException(e.getMessage());
		}
		myForm.setFormato("modificabile");
		sc.putObjectInSession(session, "stampeForm", myForm);
		String path="<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=stampePersonali\" class=\"linkPager\">Stampe personali</a>";
		model.addAttribute(WebApplicationConstants.PATH,path);
		sc.putObjectInSession(session, WebApplicationConstants.PATH, path);

		return "jsp/listaStampePersonali";
	}
	@RequestMapping(params="metodo=Stampe abilitate")
	public String stampeAbilitate(Model model,HttpServletRequest req, @ModelAttribute StampeForm myForm, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  stampeAbilitate della classe " +
						this.getClass().getName(),GestioneReportController.class);
		
		//rimuovo gli oggetti dalla sessione
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_CARTELLE);
	    sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_REPORT);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		sc.removeObjectFromSession(session, WebApplicationConstants.PATH);
		sc.removeObjectFromSession(session, "stampeForm");
		//recupero i nomi delle cartelle
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		ArrayList listaCartelle = Util.getCartelleStampe(p.getListaStampe());
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_CARTELLE, listaCartelle);
		myForm.setFormato("accessibile");
		sc.putObjectInSession(session, "stampeForm", myForm);
		model.addAttribute("stampeForm", myForm);
		String path="<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path=Stampe abilitate\" class=\"linkPager\">Stampe abilitate</a>";
		model.addAttribute(WebApplicationConstants.PATH,path);
		sc.putObjectInSession(session, WebApplicationConstants.PATH, path);
		return "jsp/listaStampeUfficiali";
	}
	
	@RequestMapping(params="metodo=Avanti")
	public String avanti(Model model,HttpServletRequest req, @ModelAttribute StampeForm myForm, HttpSession session)throws ApplicationException{
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  avanti della classe " +
						this.getClass().getName(),GestioneReportController.class);
		//rimuovo gli oggetti dalla sessione
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_CARTELLE);
	    sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE);
	    sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_REPORT);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		sc.removeObjectFromSession(session, WebApplicationConstants.PATH);
		sc.removeObjectFromSession(session, "stampeForm");
		ArrayList listaStampe= new ArrayList();
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		//caso in cui non sono specificati parametri di input nella maschera precedente
		//si visualizza la lista delle cartelle
		String path="<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path=Stampe abilitate\" class=\"linkPager\">Stampe abilitate</a>";
		try{
		if(Util.isEmpty(myForm.getPath())&& Util.isEmpty(myForm.getDescStampa())){
			//recupero i nomi delle cartelle
			ArrayList listaCartelle = Util.getCartelleStampe(p.getListaStampe());
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_CARTELLE, listaCartelle);
			model.addAttribute(WebApplicationConstants.PATH,path);
		}

		//caso in cui si specifica un path
		if(!Util.isEmpty(myForm.getPath())&& Util.isEmpty(myForm.getDescStampa())){
			DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
			vo.setCodi_profilo(p.getCodi_pk_profilo());
			vo.setObject_path(myForm.getPath().replace("'", "''"));
			vo.setText_object_name(myForm.getDescStampa());
			
			listaStampe=Util.getListaCodiceDescrizione(service.getListaStampeNew(vo));
			ArrayList listaReport=Util.getListaCodiceDescrizione(service.getListaStampe(vo));
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE, listaStampe);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_REPORT, listaReport);
			//path="<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path=Stampe abilitate\" class=\"linkPager\">Stampe abilitate</a> <a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path="+myForm.getPath()+"\" class=\"linkPager\">"+myForm.getPath()+"</a>";
			String pathUtf = new String(req.getParameter("path").getBytes("ISO-8859-1"), "UTF-8");
			StringTokenizer st = new StringTokenizer(pathUtf,">>");
			int token = st.countTokens();
			String pp="";
			String gg="";
			int i=0;
			String nome="";
			String nome1="";
			String nome2="";
			String nome3="";
			if (token==3){
				while(st.hasMoreElements()){
					pp=st.nextToken();
					gg=gg+">>"+pp;
					if(i==0)
						nome=gg;
					if(i==1){
						nome1=pp;	
						nome2=gg;
					}
					
					if(i==2)
						nome3=pp;
					i++;
					
				}
				path=path+"<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path="+nome+"\" class=\"linkPager\">"+nome+"</a>";
				path=path+">><a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path="+nome2+"\" class=\"linkPager\">"+nome1+"</a>";
				path=path+">><a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path="+pathUtf+"\" class=\"linkPager\">"+nome3+"</a>";
				
				
				}
			else if (token==2){
				nome=req.getParameter("path").substring(0,req.getParameter("path").lastIndexOf(">>"));
					while(st.hasMoreElements() && i<1){
						gg=st.nextToken();
						nome1=st.nextToken();
						i++;
						
					}
					path=path+"<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path=>>"+gg+"\" class=\"linkPager\">"+nome+"</a>";
					path=path+">><a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path="+pathUtf+"\" class=\"linkPager\">"+nome1+"</a>";
		
				}
				else{
					String output = new String(req.getParameter("path"));
					
					 path="<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path=Stampe abilitate\" class=\"linkPager\">Stampe abilitate</a> <a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path="+output+"\" class=\"linkPager\">"+output+"</a>";
						
				}
		
		}
		if(!Util.isEmpty(myForm.getDescStampa())){
			DAnagraficheStampeVO vo = service.getStampa(myForm.getCodiStampa());
			CodiceDescrizioneTO codice = new CodiceDescrizioneTO();
			codice.setCodice(vo.getCodi_pk_object_id());
			codice.setDescrizione(vo.getText_object_name());
			codice.setPath(vo.getObject_path());
			codice.setDescrizioneObject(vo.getDesc_object_desc());
			listaStampe.add(codice);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE, listaStampe);
			path="<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path=Stampe abilitate\" class=\"linkPager\">Stampe abilitate</a> <a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path="+vo.getObject_path()+"\" class=\"linkPager\">"+vo.getObject_path()+"</a>";
			model.addAttribute(WebApplicationConstants.PATH,path);
		}
		}catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), RedirectController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/listaReport";
			//throw new ApplicationException(e.getMessage());
		}
		myForm.setFormato("modificabile");
		sc.putObjectInSession(session, "stampeForm", myForm);
		sc.putObjectInSession(session, WebApplicationConstants.FORMATO, "modificabile");
		model.addAttribute(WebApplicationConstants.PATH,path);
		sc.putObjectInSession(session, WebApplicationConstants.PATH, path);
		model.addAttribute("stampeForm", myForm);
		return "jsp/listaStampeUfficiali";
	}
	@RequestMapping(params="metodo=Pulisci")
	public String pulisci(Model model,HttpServletRequest req, HttpSession session)throws ApplicationException{
		StampeForm myForm = new StampeForm();
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		myForm.setCodiStampa("");
		myForm.setDescStampa("");
		myForm.setListaStampe(p.getListaStampe());
		model.addAttribute("stampeForm",myForm);
		return "jsp/listaReport";
		
	}
	
	@RequestMapping(params="metodo=...")
	public String cercaCodiceDescrizione(HttpServletRequest request, Model model,@ModelAttribute StampeForm myForm, HttpSession session )
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  cercaCodiceDescrizione della classe " +
						this.getClass().getName(),GestioneReportController.class);
		try{
		DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		vo.setCodi_profilo(p.getCodi_pk_profilo());
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
			return "jsp/listaReport";
			//throw new ApplicationException(e.getMessage());
		}
		return "jsp/listaStampe";	
		
	}
	
}
