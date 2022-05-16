/**
 * 
 */
package com.giano.transforms;

import java.util.ResourceBundle;

import com.microstrategy.web.app.transforms.FolderIconTransform;
import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.RequestKeys;

/**
 * @author gianluca
 *
 */
public class GianoFolderIconTransform extends FolderIconTransform{

	/**
	 * 
	 */
	public GianoFolderIconTransform() {
		// TODO Auto-generated constructor stub
	}
	public void transformForRequestSuccessful(MarkupOutput out) {
		ResourceBundle bl = ResourceBundle.getBundle("sie");
		String sBypass="false";
		RequestKeys rk = getRequestKeys();
		
			
		if(rk.getValue("bypass")!=null){
			sBypass=rk.getValue("bypass");
		}
		/**Se nell'URL viene passato il parametro bypass creo la pagina di login*/
		if(sBypass.compareToIgnoreCase("true")==0){
			out.append("<!-- Eseguo il GianoFolderIconTransform -->");
			super.transformForRequestSuccessful(out);
		}else{
			/**Stampo l'evento*/
			GianoContent gc = new GianoContent(bl.getString("title.folder.2"),bl.getString("message.folder.2"));
			gc.WriteContent(out);
		}								
	}	
}
