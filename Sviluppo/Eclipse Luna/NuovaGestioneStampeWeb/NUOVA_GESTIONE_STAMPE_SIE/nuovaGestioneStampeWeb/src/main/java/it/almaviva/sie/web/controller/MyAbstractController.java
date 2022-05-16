/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Locale;

import it.almaviva.sie.business.exception.MstrException;
import it.almaviva.sie.business.model.MstrConnectionParam;
import it.almaviva.sie.business.model.Utente;
import it.almaviva.sie.business.service.DAnagraficaStampeService;
import it.almaviva.sie.sicurezza.model.FunzioneSIE;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;


/**
 * @author Teresa
 *
 */
@Controller
public class MyAbstractController {

	private ApplicationContext context;
	
	@Autowired
    private DAnagraficaStampeService service1;

	public void setContext(ApplicationContext context) {
		this.context = context;
	}
	
	public ApplicationContext getContext() {
		return context;
	}
	
	public String getMessage(String key, Object[] param, Locale locale) {
		return context.getMessage(key, param, locale);
	}
	
	public String getMessage(String key, Object[] param) {
		return context.getMessage(key, param, Locale.ITALIAN);
	}

	public String getMessage(String key) {
		return context.getMessage(key, null, Locale.ITALIAN);
	}
	
	public  void startFunzione(HttpServletRequest request,HttpSession session,SessionContainer sc ) throws MstrException{
		sc.cleanSessione(session);
		Utente utente = new Utente();
		String usr = (String)request.getParameter("utente");
		usr = usr.toUpperCase();
		utente.setUserName(usr);
		sc.putObjectInSession(request.getSession(false), "utente", utente);
		
		MstrConnectionParam mstrConnectionParam = new MstrConnectionParam();
		
		if(request.getParameter("start")!=null){
			mstrConnectionParam=service1.getParametriConnessione();
		
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
}
