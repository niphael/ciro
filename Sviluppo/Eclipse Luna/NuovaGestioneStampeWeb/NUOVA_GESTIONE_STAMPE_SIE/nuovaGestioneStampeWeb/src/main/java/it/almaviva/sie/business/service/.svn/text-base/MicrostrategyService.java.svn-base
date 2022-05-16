/**
 * 
 */
package it.almaviva.sie.business.service;

import java.util.ArrayList;

import com.microstrategy.web.objects.WebObjectsException;

import it.almaviva.sie.business.exception.MstrException;
import it.almaviva.sie.business.model.ConnessioneMstrTO;
import it.almaviva.sie.business.model.EsitoMstrTO;
import it.almaviva.sie.business.model.MstrConnectionParam;
import it.almaviva.sie.business.model.MstrUtils;
import it.almaviva.sie.business.model.ParametriCodiceDescrizioneTO;
import it.almaviva.sie.business.model.VisualizzaStampaTO;

/**
 * @author Teresa
 *
 */
public interface MicrostrategyService {
	
	/**	 
	 *  Controlla se un utente � gi� esistente in  Microstrategy,
	 *  altrimenti lo crea
	 *   
	 *  @throws MstrException, WebObjectsException  
	 */
	public void checkUser(String userName, String fullName) throws MstrException, WebObjectsException;
	
	/**
	 * 	 
	 *  Restuisce la lista delle stampe associate ad un utente in Microstrategy 
	 * 
	 *  @return ArrayList: restituisce la lista delle stampe personali 
	 * 
	 *  @throws MstrException
	 *  
	 */	
	public ArrayList getElencoStampePersonali(String userName) throws MstrException;
	
	public void impostaParametriConnessione()throws MstrException;
	public String getUrlStampeSie()throws MstrException;
	
	public EsitoMstrTO getStampa(String sObjectId, ConnessioneMstrTO inConnessioneMstrTO, String userName,VisualizzaStampaTO stampa) throws MstrException;
	public EsitoMstrTO getProspetto(String sObjectId, String sObjectType, ConnessioneMstrTO inConnessioneMstrTO, String userName,VisualizzaStampaTO stampa) throws MstrException;

	/**
	 * 	 
	 *  Restuisce gli username di Microstrategy 
	 * 
	 *  @return ArrayList: restituisce gli username di Microstrategy  
	 * 
	 *  @throws MstrException
	 *  
	 */	
	public ArrayList getListaLoginMstr(ParametriCodiceDescrizioneTO param) throws MstrException;
	public void cancellaStampePersonali(ArrayList lista,String userName)throws MstrException;
	/**
	 * 	 
	 *  Restuisce la lista delle stampe presenti in Microstrategy 
	 * 
	 *  @return ArrayList: restituisce la lista delle stampe
	 * 
	 *  @throws MstrException
	 *  
	 */	
	public EsitoMstrTO getAllReport()  throws MstrException, WebObjectsException;
}
