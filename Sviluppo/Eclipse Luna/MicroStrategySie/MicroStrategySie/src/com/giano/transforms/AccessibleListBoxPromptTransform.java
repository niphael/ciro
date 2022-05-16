/**
 * 
 */
package com.giano.transforms;

import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.PromptObject;
import com.microstrategy.web.beans.Transformable;
import com.microstrategy.web.objects.WebElementSource;
import com.microstrategy.web.objects.WebElements;
import com.microstrategy.web.objects.WebElementsPrompt;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebPrompt;
import com.microstrategy.web.transform.AbstractTransform;

/**
 * @author gianluca
 *
 */
public class AccessibleListBoxPromptTransform  extends AbstractTransform{
	public String getDescription() {
		// TODO Auto-generated method stub
		return "Accessible List Box Prompt";
	}

	public Class getSupportedBeanType() {
		// TODO Auto-generated method stub
		return PromptObject.class;
	}

	public void transform(Transformable data, MarkupOutput out) throws ClassCastException {
		// TODO Auto-generated method stub
		PromptObject po = (PromptObject) data;
		WebPrompt oPrompt = po.getWebPrompt();	
		WebElementsPrompt elemPrompt = (WebElementsPrompt) oPrompt;							
		WebElements elements = elemPrompt.getSuggestedAnswers();
		/**Risposte gia' definite dall'utente*/
		WebElements answers = elemPrompt.getAnswer();
		/**Identifica le selezioni gia' fatte*/
		String sChecked="";
		/**Identifica il valore che assume il Prompt*/		
		String sValore=null;
		/**Identifica la label che assume il Prompt*/
		String sLabel="";
		String sPosPrompt="_"+Integer.toString(po.getPromptPosition());
		/**contiene il testo per o prompt obbligatori*/
		String sPromptMandatory="";
		if(sPosPrompt.compareTo("_0")==0){
			sPosPrompt="";
		}
		/**Evidenzio che il PROMPT � obbligatorio*/
		if(oPrompt.isRequired()){
			sPromptMandatory="&nbsp;<span class=\"asterisco\"> * </span>";
		}
		/**Parte di HTML per chiudere ci� che creo nel AccessiblePromptTransform*/		
		out.append("\">");
		
		out.append("<p class=\"alignLeft sezione\">"+elemPrompt.getMeaning()+"</p>");	
		//out.append("<p class=\"alignLeft sezione\">"+elemPrompt.getName()+sPromptMandatory+"</p>");                                       
				
		if (elements == null || elements.size() == 0) {
			WebElementSource eltSrc = elemPrompt.getOrigin().getElementSource();
			try {
				elements = eltSrc.getElements();
				String select="<select name=\"answer"+sPosPrompt+"\" id=\"answer"+sPosPrompt+"\">";
				out.append("<p class=\"alignLeft sezione\"><label for=\"answer"+sPosPrompt+"\">"+elemPrompt.getName()+sPromptMandatory+"</label>&nbsp;"+select+"\n");
				
				for (int i=0;i<elements.size();i++) {	
					/**Inizio le costruzione del valore del singolo elemento del Prompt*/
					sValore=elements.get(i).getElementID()+"~"+elements.get(i).getDisplayUnitType()+"~";
					String[] aValues = elements.get(i).getBrowseFormValues();
					
					for(int f=0;f<aValues.length;f++){
						/**Appendo la label del Prompt al suo valore*/
						sValore+=aValues[f];
						if(f<(aValues.length-1)){
							sLabel+=aValues[f]+":";	
						}else{
							sLabel+=aValues[f];
						}
						//out.append("f="+f+" i="+i+" "+aValues[f]+"<br>");
						//out.append("f="+f+" i="+i+" "+sValore+"<br>");
					}		
					/**Ciclo per definire le risposte gia' inserite*/
					for(int a=0;a<answers.size();a++){
						if(answers.get(a).getElementID().compareToIgnoreCase(elements.get(i).getElementID())==0){
							sChecked="selected";
							break;
						}						
					}	
					if(!oPrompt.isRequired() && i==0){
						out.append("<option "+sChecked+" value=\"\" >- Tutti -</option>\n");
					}
					out.append("<option "+sChecked+" value=\""+sValore+"\" >"+sLabel+"</option>\n");	
					
														
					sLabel="";
					sChecked="";
				}	 
			} catch (WebObjectsException e) {
				// TODO Auto-generated catch block
				StackTraceElement[] st = e.getStackTrace();
				int r;
				out.append("<!-- ");
				for(r=0;r<st.length;r++){
					out.append("getLineNumber: "+st[r].getLineNumber()+"<br>\n");
					out.append("getMethodName: "+st[r].getMethodName()+"<br>\n");
					out.append("getFileName: "+st[r].getFileName()+"<br>\n");
				}
				out.append(" -->");
				GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
				gc.WriteContentInside(out);
				return;				
			}
			out.append("</select>\n");
			out.append("</p>\n");
		}else{
			WebElements elementsA = elemPrompt.getAnswer();			
			if (elementsA == null || elementsA.size() == 0) {
				if(elemPrompt.getSuggestedAnswers()!=null){
					out.append("<!-- elemPrompt.getSuggestedAnswers().size(): "+elemPrompt.getSuggestedAnswers().size()+"<br>\n -->");
					elementsA = elemPrompt.getSuggestedAnswers();			
				}											
				for (int i=0;i<elementsA.size();i++) {	                        	     						
					/**Inizio le costruzione del valore del singolo elemento del Prompt*/
					sValore=elementsA.get(i).getElementID()+"~"+elementsA.get(i).getDisplayUnitType()+"~";
					String[] aValues = elementsA.get(i).getBrowseFormValues();
					
					for(int f=0;f<aValues.length;f++){
						/**Appendo la label del Prompt al suo valore*/
						sValore+=aValues[f];
						if(f<(aValues.length-1)){
							sLabel+=aValues[f]+":";	
						}else{
							sLabel+=aValues[f];
						}
						//out.append("f="+f+" i="+i+" "+aValues[f]+"<br>");
						//out.append("f="+f+" i="+i+" "+sValore+"<br>");
					}		
					/**Ciclo per definire le risposte gia' inserite*/
					for(int a=0;a<answers.size();a++){
						if(answers.get(a).getElementID().compareToIgnoreCase(elementsA.get(i).getElementID())==0){
							sChecked="selected";
							break;
						}						
					}	
					if(!oPrompt.isRequired() && i==0){
						out.append("<option "+sChecked+" value=\"\" >- Tutti -</option>\n");
					}
					out.append("<option "+sChecked+" value=\""+sValore+"\" >"+sLabel+"</option>\n");	
					
														
					sLabel="";
					sChecked="";						
				}	 		                        
			}else{			
				if(elemPrompt.getSuggestedAnswers()!=null){
					out.append("<!-- elemPrompt.getSuggestedAnswers().size(): "+elemPrompt.getSuggestedAnswers().size()+"<br>\n -->");
					elementsA = elemPrompt.getSuggestedAnswers();			
				}
				for (int i=0;i<elementsA.size();i++) {	                        	     						
					/**Inizio le costruzione del valore del singolo elemento del Prompt*/
					sValore=elementsA.get(i).getElementID()+"~"+elementsA.get(i).getDisplayUnitType()+"~";
					String[] aValues = elementsA.get(i).getBrowseFormValues();
					
					for(int f=0;f<aValues.length;f++){
						/**Appendo la label del Prompt al suo valore*/
						sValore+=aValues[f];
						if(f<(aValues.length-1)){
							sLabel+=aValues[f]+":";	
						}else{
							sLabel+=aValues[f];
						}
						//out.append("f="+f+" i="+i+" "+aValues[f]+"<br>");
						//out.append("f="+f+" i="+i+" "+sValore+"<br>");
					}		
					/**Ciclo per definire le risposte gia' inserite*/
					for(int a=0;a<answers.size();a++){
						if(answers.get(a).getElementID().compareToIgnoreCase(elementsA.get(i).getElementID())==0){
							sChecked="selected";
							break;
						}						
					}	
					if(!oPrompt.isRequired() && i==0){
						out.append("<option "+sChecked+" value=\"\" >- Tutti -</option>\n");
					}
					out.append("<option "+sChecked+" value=\""+sValore+"\" >"+sLabel+"</option>\n");	
					
														
					sLabel="";
					sChecked="";						
				}				
			}
			
		}

		out.append("<input value=\"1\" name=\"answerOptions"+sPosPrompt+"\" id=\"answerOptions"+sPosPrompt+"\" type=\"hidden\">\n");						
		out.append("<input value=\"2\" name=\"answerFormat"+sPosPrompt+"\" id=\"answerFormat"+sPosPrompt+"\" type=\"hidden\">\n");						          		
	}
}
