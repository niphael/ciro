/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.StringTokenizer;

import it.almaviva.sie.business.model.ConnessioneMstrTO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.EsitoMstrTO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.model.VisualizzaStampaTO;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.business.service.MicrostrategyService;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.web.form.ProfiliForm;
import it.almaviva.sie.web.form.ReportForm;
import it.almaviva.sie.web.form.StampeForm;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.XMLReader;


/**
 * @author Teresa
 *
 */
@Controller
@RequestMapping("/gestioneStampe.html")
public class GestioneStampeController {
	SessionContainer sc = new SessionContainer();
	@Autowired
	private DAnagraficaStampeService service;
	@Autowired
	private MicrostrategyService service2;
	
	
	@RequestMapping(method = RequestMethod.POST,params="metodo=Ritorna")
	public String ritorna(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  ritorna della classe " +
						this.getClass().getName(),RicercaStampeController.class);
		//String codiProfilo=myForm.getCodiProfilo();
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		StampeForm myForm = (StampeForm)sc.getObjectInSession(session, "stampeForm");
		myForm.setListaStampe(p.getListaStampe());
		model.addAttribute("stampeForm",myForm);
		//rimuovo gli oggetti dalla sessione
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_CARTELLE);
	    sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE);
	    sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_REPORT);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		sc.removeObjectFromSession(session, WebApplicationConstants.PATH);
		return "jsp/listaReport";
	}
	@RequestMapping(method = RequestMethod.GET)
	public String init2(HttpServletRequest request, Model model, @ModelAttribute ProfiliForm myForm, HttpSession session )
			throws ApplicationException {
		return ritorna(request, model, session);
		
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
		if(req.getParameter("formato")!=null)
			myForm.setFormato(req.getParameter("formato"));
		model.addAttribute("stampeForm", myForm);
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
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_REPORT);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		sc.removeObjectFromSession(session, WebApplicationConstants.PATH);
		sc.removeObjectFromSession(session, "stampeForm");
		//recupero i nomi delle cartelle
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		ArrayList listaCartelle = new ArrayList();
			listaCartelle = Util.getCartelleStampe(p.getListaStampe());
		
		sc.putObjectInSession(session, WebApplicationConstants.LISTA_CARTELLE, listaCartelle);
		myForm.setFormato("accessibile");
		sc.putObjectInSession(session, "stampeForm", myForm);
		model.addAttribute("stampeForm", myForm);
		String path="<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path=Stampe abilitate\" class=\"linkPager\">Stampe abilitate</a>";
		model.addAttribute(WebApplicationConstants.PATH,path);
		sc.putObjectInSession(session, WebApplicationConstants.PATH, path);
		return "jsp/listaStampeUfficiali";
	}
	@RequestMapping(params="metodo=visualizzaStampe")
	public String visualizzaStampe(HttpServletRequest request, Model model, HttpSession session, @ModelAttribute StampeForm myForm)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  visualizzaStampe della classe " +
						this.getClass().getName(),RicercaStampeController.class);
		//rimuovo gli oggetti dalla sessione
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_CARTELLE);
	    sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE);
	    sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_REPORT);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI);
		sc.removeObjectFromSession(session, WebApplicationConstants.LISTA_STAMPE_PERSONALI_DA_ELIMINARE);
		sc.removeObjectFromSession(session, WebApplicationConstants.PATH);
		//String codiProfilo=myForm.getCodiProfilo();
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		String path="<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path=Stampe abilitate\" class=\"linkPager\">Stampe abilitate</a>";
		try{
		if(request.getParameter("path").equals("Stampe abilitate")){
			//recupero i nomi delle cartelle
			ArrayList listaCartelle = Util.getCartelleStampe(p.getListaStampe());
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_CARTELLE, listaCartelle);
		
		}else{
			DAnagraficheStampeVO vo = new DAnagraficheStampeVO();
			vo.setCodi_profilo(p.getCodi_pk_profilo());
			vo.setObject_path(request.getParameter("path").replace("'", "''"));
			
			ArrayList listaStampe=Util.getListaCodiceDescrizione(service.getListaStampeNew(vo));
			ArrayList listaReport=Util.getListaCodiceDescrizione(service.getListaStampe(vo));
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_STAMPE, listaStampe);
			sc.putObjectInSession(session, WebApplicationConstants.LISTA_REPORT, listaReport);
			String pathUtf = new String(request.getParameter("path").getBytes("ISO-8859-1"), "UTF-8");
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
				nome=request.getParameter("path").substring(0,pathUtf.lastIndexOf(">>"));
					while(st.hasMoreElements() && i<1){
						gg=st.nextToken();
						nome1=st.nextToken();
						i++;
						
					}
					path=path+"<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path=>>"+gg+"\" class=\"linkPager\">"+nome+"</a>";
					path=path+">><a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path="+pathUtf+"\" class=\"linkPager\">"+nome1+"</a>";
		
				}
				else{
					System.out.println(" request path"+request.getParameter("path"));
					String output = new String(request.getParameter("path").getBytes("UTF-8"));
					String output1 = new String(request.getParameter("path").getBytes("ISO-8859-1"));
					System.out.println(" UTF 8 "+output);
					System.out.println(" ISO-8859-1 "+output1);
					 path="<a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path=Stampe abilitate\" class=\"linkPager\">Stampe abilitate</a> <a href=\"/nuovaGestioneStampeWeb/gestioneStampe.html?metodo=visualizzaStampe&path="+output+"\" class=\"linkPager\">"+output+"</a>";
						
				}
			}
			
		
		model.addAttribute(WebApplicationConstants.PATH,path);
		sc.putObjectInSession(session, WebApplicationConstants.PATH, path);
		
		myForm.setFormato("modificabile");
		if(request.getParameter("formato")!=null)
			myForm.setFormato(request.getParameter("formato"));

		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), GestioneStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/listaReport";
		}
		model.addAttribute("stampeForm", myForm);
		sc.putObjectInSession(session, "stampeForm", myForm);
		sc.putObjectInSession(session, WebApplicationConstants.FORMATO, "modificabile");
		return "jsp/listaStampeUfficiali";
	}
	
	@RequestMapping(params="metodo=Imposta formato")
	public String impostaFormato(HttpServletRequest request, Model model, HttpSession session,@ModelAttribute StampeForm myForm)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  impostaFormato della classe " +
						this.getClass().getName(),RicercaStampeController.class);
		sc.putObjectInSession(session, WebApplicationConstants.FORMATO, myForm.getFormato());
		return "jsp/listaStampeUfficiali";
		}
		

	
	@RequestMapping(params="metodo=visualizzaStampa")
	public String visualizzaStampa(HttpServletRequest request, Model model, HttpSession session, @ModelAttribute StampeForm myForm,
			HttpServletResponse response)
			throws ApplicationException {
		TraceLogger.traceLog(TraceLogger.getDEBUG(),
				"Metodo  visualizzaStampa della classe " +
						this.getClass().getName(),GestioneStampeController.class);
		// Recupero id della stampa dalla request
		String codiceStampa = (String) request.getParameter("stampa");
		sc.putObjectInSession(session, WebApplicationConstants.CODICE_STAMPA, codiceStampa);
	try{
		
		DAnagraficheStampeVO vo = service.getStampa(codiceStampa);
		//String codiProfilo=myForm.getCodiProfilo();
		Profilo p = (Profilo)sc.getObjectInSession(session, "profilo");
		Utente utente = (Utente)sc.getObjectInSession(session, "utente");
		String userName = null;
		// Creazione di un oggetto contenente le informazioni
		// raccolte dalla sessione utente e dalla scelta fatta
		// dall'utente nelle pagine precedenti
		VisualizzaStampaTO visualizzaStampa = new VisualizzaStampaTO();
		//	Salvataggio del codice profilo di stampa
		visualizzaStampa.setCodiceProfiloStampa(
			p.getCodi_pk_profilo());

		// Salvataggio del codice stampa richiesto
		visualizzaStampa.setCodiceStampa(vo.getCodi_pk_object_id());
		
		// Salvataggio della modalit� accessibile/non accessibile
		visualizzaStampa.setModalita((String) sc.getObjectInSession(session, WebApplicationConstants.FORMATO));
		
		// Salvataggio dell'utente
		visualizzaStampa.setModalitaAccesso("L");
						 
		// Salvataggio dell'utente
		visualizzaStampa.setUserID(utente.getUserName());
		visualizzaStampa.setNomeStampa(vo.getText_object_name());
		visualizzaStampa.setDescStampa(vo.getDesc_object_desc());
	
		// Salvataggio della funzione
		visualizzaStampa.setCodiceFunzioneInExe("GEST_STAMPE");
		//imposto Parametri di connessione
		service2.impostaParametriConnessione();
		// Controllo se l'utente � abilitato alla visualizzazione delle stampe
		// Utente abilitato a salvare le stampe
		/*if (utente.getFlagMstrSave() == 1){
		//userName = user.getCognome() + "." + user.getNome();
		if (utente.getIsSimulante() != null && utente.getIsSimulante().booleanValue())
			userName = utente.getUtenteSimulato();
			else
			userName = utente.getUserName();
		}*/
		service2.checkUser(utente.getUserName(), utente.getUserName());
		ConnessioneMstrTO connessioneMstrTO = new ConnessioneMstrTO();
		if(sc.getObjectInSession(session, WebApplicationConstants.CONN_MSTR_SESSION)!=null)
		connessioneMstrTO=(ConnessioneMstrTO)sc.getObjectInSession(session, WebApplicationConstants.CONN_MSTR_SESSION);
		EsitoMstrTO esito = service2.getStampa(codiceStampa, connessioneMstrTO, utente.getUserName(),visualizzaStampa);
		String modalitaAccesso = visualizzaStampa.getModalita();
		String url = null;
		// Se � stata richiesta una stampa accessibile
		if (!Util.isEmpty(modalitaAccesso)
			&& modalitaAccesso.equals("accessibile")) {
			// Estrazione dell'url per la stampa accessibile
			url = esito.getUrlApiAcc();
		}
		// Se � stata richiesta una stampa non accessibile
		else {
			//	Estrazione dell'url per la stampa non accessibile
			url = esito.getUrlApi();
		}
		if (!esito.isEsitoCorretto()) {
			model.addAttribute("errore","Errore: "+esito.getMessaggio());
			return "jsp/listaStampeUfficiali";
		}
		connessioneMstrTO = (ConnessioneMstrTO)esito.getConnessioneMstrTO();
		sc.putObjectInSession(session, WebApplicationConstants.CONN_MSTR_SESSION,connessioneMstrTO);
		String sessionId = connessioneMstrTO.getSessionID();
		//connessioneMstrTO.getSaveState()
		
		/*String link=esito.getLinkSession();
		String loginPassword = "admin"+ ":" + "admin";
		String encoded = new sun.misc.BASE64Encoder().encode (loginPassword.getBytes());
		URL oracle = new URL(link);
		URLConnection conn = oracle.openConnection();
		conn.setRequestProperty ("Authorization", "Basic " + encoded);
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db = dbf.newDocumentBuilder();
		Document doc = db.parse(conn.getInputStream());
		NodeList descNodes = doc.getElementsByTagName("min-state");*/
	
		String saveState = connessioneMstrTO.getSaveState();
		//Aggiungo il SaveState
		url+= saveState;
		// Aggiunta all'url del livello organizzativo
		url += "&param1="+Util.cifraParametri(esito.getLivOrg().getBytes("UTF-8"),sessionId.getBytes("UTF-8"),esito.getLivOrg());
		// Aggiunta all'url del parametro 
		// per il ritorno da Microstrategy al SIE
				//String param2 = URLEncoder.encode(ip.getHostAddress()+request.getContextPath()+"/gestioneStampe.htm?metodo=init","UTF-8");
		vo.setObject_path(vo.getObject_path().replace("�", "a'"));
		String param2 = URLEncoder.encode(service2.getUrlStampeSie()+request.getContextPath()+"/gestioneStampe.html?metodo=visualizzaStampe&path="+vo.getObject_path()+"&formato="+modalitaAccesso,"UTF-8");
		
		url += "&param2="+param2;
		response.sendRedirect(url);
		} catch (Exception e) {
			e.printStackTrace();
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), GestioneStampeController.class);
			model.addAttribute("errore","Errore: "+e.getMessage());
			return "jsp/listaStampeUfficiali";
		}
		return null;
	
	}

}
