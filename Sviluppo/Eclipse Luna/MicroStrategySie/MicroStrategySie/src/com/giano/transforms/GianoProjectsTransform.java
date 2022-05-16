/**
 * 
 */
package com.giano.transforms;


import java.util.MissingResourceException;
import java.util.ResourceBundle;

import com.microstrategy.web.app.transforms.ProjectsTransform;
import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.RequestKeys;

/**
 * @author gianluca
 *
 */
public class GianoProjectsTransform extends ProjectsTransform {

	/**
	 * 
	 */
	public GianoProjectsTransform() {
		// TODO Auto-generated constructor stub
	}
	public void transformForRequestSuccessful(MarkupOutput out) {
		ResourceBundle bl=null;
		try{
			bl = ResourceBundle.getBundle("sie");	
		}catch(MissingResourceException noBL){
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
			gc.WriteContent(out);
			return;
		}
		
		String sBypass="false";
		RequestKeys rk = getRequestKeys();
		
			
		if(rk.getValue("bypass")!=null){
			sBypass=rk.getValue("bypass");
		}
		/**Se nell'URL viene passato il parametro bypass creo la pagina di login*/
		if(sBypass.compareToIgnoreCase("true")==0){
			out.append("<!-- Eseguo il GianoProjectsTransform -->");
			super.transformForRequestSuccessful(out);
		}else{
			/**Stampo l'evento*/
			GianoContent gc = new GianoContent(bl.getString("title.project.1"),bl.getString("message.project.1"));
			gc.WriteContent(out);
		}				
		
	}	
}
