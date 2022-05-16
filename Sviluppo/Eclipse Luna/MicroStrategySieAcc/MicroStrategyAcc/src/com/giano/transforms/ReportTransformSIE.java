/**
 * 
 */
package com.giano.transforms;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import com.microstrategy.web.app.transforms.ReportGridTransformImpl;
import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.RequestKeys;
import com.microstrategy.web.beans.WebBeanException;

/**
 * @author gianluca
 *
 * -2147207171 è il codice di errore tornato da MSTR in caso di timeout aka numero di righe ecceduto...
 */
public class ReportTransformSIE extends ReportGridTransformImpl {

	public void transformForRequestInError(MarkupOutput out) {
		ResourceBundle bl=null;		
		RequestKeys rk = getRequestKeys();	
		try{
			bl = ResourceBundle.getBundle("sie");	
			out.append("<!-- ReportTransformSIE error: "+getReportBean().getErrorInfo().getErrorMessage()+"-->");
			out.append("<!-- ReportTransformSIE n: "+getReportBean().getErrorInfo().getErrorCode()+"-->");
			/**
			 * Gestione errore personalizzata
			 * 
			 * */
			String sCode=String.valueOf(getReportBean().getErrorInfo().getErrorCode());						
			if(sCode.startsWith("-2147")){
				String sRePrompt="<p>";
				
				
				if(rk.getValue("param1")!=null && rk.getValue("ServerNameG")!=null){
					sRePrompt+="<form name=\"rePrompt\" method=\"post\" action=\"mstrWeb?evt=4001&src=mstrWeb.4001&reportID="+getReportBean().getObjectID()+"&accessibile=false&rePrompt=true&mstrWeb="+rk.getValue("mstrWeb")+"&param1="+URLEncoder.encode(rk.getValue("param1"), "UTF-8")+"&ServerNameG="+rk.getValue("ServerNameG")+"\">\n";				
				}else{
					sRePrompt+="<form name=\"rePrompt\" method=\"post\" action=\"mstrWeb?evt=4001&src=mstrWeb.4001&reportID="+getReportBean().getObjectID()+"&accessibile=false&rePrompt=true&mstrWeb="+rk.getValue("mstrWeb")+"\">\n";
				}
				/*for(int o=0;o<rk.getNameCount();o++){
					out.append("<input type=\"hidden\" name=\""+rk.getName(o)+"\" id==\""+rk.getName(o)+"\" value=\""+rk.getValue(rk.getName(o))+"\"/>\n");
				}*/
				if(rk.getValue("rb")!=null){
					sRePrompt+="<input type=\"hidden\" name=\"rb\" id==\"rb\" value=\""+URLEncoder.encode(rk.getValue("rb"), "UTF-8")+"\"/>\n";				
				}			
				
				sRePrompt+="<input type=\"submit\" class=\"puls\" name=\"re_prompt\" id=\"re_prompt\" value=\"Ripeti Prompt\">\n";
				sRePrompt+="</form></p>\n";
				
				GianoContent gc = new GianoContent(bl.getString("title.report.error.big.1"),bl.getString("message.report.error.big.1")+sRePrompt);
				gc.WriteContent(out);
				
				return;
			}
		}catch(MissingResourceException noBL){
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la stampa richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema. <!-- com.giano.transforms.ReportTransformSIE.transformForRequestInError() -->");			
			gc.WriteContent(out);
			return;
		}catch (WebBeanException e1){
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la stampa richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema. <!-- com.giano.transforms.ReportTransformSIE.transformForRequestInError() -->");			
			gc.WriteContent(out);
			return;
		}catch (UnsupportedEncodingException e1){
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la stampa richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema. <!-- com.giano.transforms.ReportTransformSIE.transformForRequestInError() -->");			
			gc.WriteContent(out);
			return;
		}
		
		GianoContent gc = new GianoContent(bl.getString("title.report.error.1"),bl.getString("message.report.error.1"));
		gc.WriteContent(out);
		
	}	
}
