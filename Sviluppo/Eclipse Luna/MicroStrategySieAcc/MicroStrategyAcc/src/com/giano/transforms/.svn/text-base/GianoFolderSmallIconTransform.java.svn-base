/**
 * 
 */
package com.giano.transforms;

import java.util.ResourceBundle;

import com.microstrategy.web.app.transforms.FolderSmallIconTransform;
import com.microstrategy.web.beans.RequestKeys;

/**
 * @author gianluca
 *
 */
public class GianoFolderSmallIconTransform extends FolderSmallIconTransform{

	/**
	 * 
	 */
	public GianoFolderSmallIconTransform() {
		// TODO Auto-generated constructor stub
	}
	public void transformForRequestSuccessful(com.microstrategy.web.beans.MarkupOutput out) {
		ResourceBundle bl = ResourceBundle.getBundle("sie");
		String sBypass="false";
		RequestKeys rk = getRequestKeys();
		
			
		if(rk.getValue("bypass")!=null){
			sBypass=rk.getValue("bypass");
		}
		/**Se nell'URL viene passato il parametro bypass creo la pagina di login*/
		if(sBypass.compareToIgnoreCase("true")==0){
			out.append("<!-- Eseguo il GianoFolderSmallIconTransform -->");
			super.transformForRequestSuccessful(out);
		}else{
			/**Stampo l'evento*/
			GianoContent gc = new GianoContent(bl.getString("title.folder.3"),bl.getString("message.folder.3"));
			gc.WriteContent(out);
		}				
		
		
		
	}
}
