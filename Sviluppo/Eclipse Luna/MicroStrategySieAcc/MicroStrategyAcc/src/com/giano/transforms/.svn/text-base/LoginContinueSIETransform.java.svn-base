/**
 * Classe che estende il Trasformation per la login page di MicroStrategy
 */
package com.giano.transforms;

import java.util.MissingResourceException;
import java.util.ResourceBundle;

import com.microstrategy.web.app.beans.LoginBean;
import com.microstrategy.web.app.transforms.LoginContinueTransform;
import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.RequestKeys;
import com.microstrategy.web.beans.WebEvent;

/**
 * @author gianluca
 *
 */
public class LoginContinueSIETransform extends LoginContinueTransform{
	public LoginContinueSIETransform() {		
		super();		
	} 
	/**
	 * Metodo per la visualizzazione della login Form
	 * @author Gianluca Masci aka (GLM)
	 * */
	public void transformForRequestSuccessful(MarkupOutput out){
		ResourceBundle bl=null;
		try{
			bl = ResourceBundle.getBundle("sie");	
		}catch(MissingResourceException noBL){
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
			gc.WriteContent(out);
			return;
		}
		String sBypass="false";
		/**Prelevo la Login Bean*/
		LoginBean lb = getLoginBean();
		/**Prelevo l'evento proveniente dalla LoginBean*/
		WebEvent oEvent=getLoginEvent(lb);
		RequestKeys rk = getRequestKeys();
		

		if(rk.getValue("bypass")!=null){
			sBypass=rk.getValue("bypass");
		}
				
		/**Se nell'URL viene passato il parametro bypass creo la pagina di login*/
		if(sBypass.compareToIgnoreCase("true")==0){
			out.append("<!-- Eseguo il LoginContinueSIETransform -->");
			super.transformForRequestSuccessful(out);
		}else{
			/**Stampo l'evento*/
			out.append("Errore LoginContinueSIETransform->transformForRequestSuccessful Evento: "+String.valueOf(oEvent.getID()));
			GianoContent gc = new GianoContent(bl.getString("title.login.2"),bl.getString("message.login.2"));
			gc.WriteContent(out);
		}		
	}
}
