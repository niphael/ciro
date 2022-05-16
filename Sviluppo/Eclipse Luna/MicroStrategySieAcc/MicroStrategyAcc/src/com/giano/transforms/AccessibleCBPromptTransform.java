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
public class AccessibleCBPromptTransform extends AbstractTransform{

	public String getDescription() {
		// TODO Auto-generated method stub
		return "Accessible Check Box Prompt";
	}

	public Class getSupportedBeanType() {
		// TODO Auto-generated method stub
		return PromptObject.class;
	}

	public void transform(Transformable data, MarkupOutput out) throws ClassCastException {	
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
			sPromptMandatory="&nbsp;<span class=\"asterisco\"> * </span>\n";
		}
		int nElements=0;
		try {
			nElements = elemPrompt.getOrigin().getElementSource().getElements().size();			
		} catch (WebObjectsException e1) {			
			e1.printStackTrace();
		}
		if(nElements>3){
			/**Parte di HTML per chiudere ci� che creo nel AccessiblePromptTransform*/		
			out.append(" scrollauto\">");	
		}else{
			/**Parte di HTML per chiudere ci� che creo nel AccessiblePromptTransform*/		
			out.append("\">");	
		}
		
		
		out.append("<table class=\"w90 alignLeft\" summary=\""+elemPrompt.getTitle()+"\">\n");	
		//out.append("<caption>"+elemPrompt.getTitle()+"</caption>");
		out.append("   <tbody>\n");	
		/*out.append("	  <tr>");	
		out.append("		<td class=\"w5 alignLeft\" nowrap colspan=\"2\"><p class=\"riepilogo\">"+elemPrompt.getTitle()+"</p></td>");	
		out.append("	  </tr>");*/	
		out.append("	  <tr>\n");	
		out.append("		<td class=\"w5 alignLeft access\" colspan=\"2\"><p class=\"sezione\">"+elemPrompt.getMeaning()+"</p></td>\n");	
		out.append("	  </tr>\n");	
		out.append("	  <tr>\n");	
		out.append("         <th class=\"w20 alignLeft access\"><p class=\"sezione\">Selezione</p></th>\n");
		out.append("         <th class=\"w90 alignLeft access\" nowrap><p class=\"sezione\">"+elemPrompt.getName()+sPromptMandatory+"</p></th>\n");			                               
		out.append("      </tr>\n");	                                        
		
		if (elements == null || elements.size() == 0) {
			WebElementSource eltSrc = elemPrompt.getOrigin().getElementSource();
			try {
				elements = eltSrc.getElements();
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
					}		
					/**Ciclo per definire le risposte gia' inserite*/
					for(int a=0;a<answers.size();a++){
						if(answers.get(a).getElementID().compareToIgnoreCase(elements.get(i).getElementID())==0){
							sChecked="checked";
							break;
						}						
					}	
					out.append("	  <tr style=\"\">\n");											
					out.append("         <td class=\"w20 alignLeft access\"><input "+sChecked+" name=\"answer"+sPosPrompt+"\" id=\""+sLabel+"\" value=\""+sValore+"\" type=\"checkbox\"></td>\n");
					out.append("		 <td class=\"w90 alignLeft access\"><label for=\""+sLabel+"\">"+sLabel+"</label></td>\n");
					out.append("      </tr>\n");
					
					//out.append("<tr><td class=\"checkbox\"><input "+sChecked+" name=\"answer"+sPosPrompt+"\" id=\"answer"+sPosPrompt+"\" value=\""+sValore+"\" type=\"checkbox\"/><label>"+sLabel+"</label>");					
					sLabel="";
					sChecked="";
				}	 
			} catch (WebObjectsException e) {	
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
			
		}else{
			//Gestione prompt con elementi pre-caricati
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
					}		
					/**Ciclo per definire le risposte gia' inserite*/
					for(int a=0;a<answers.size();a++){
						if(answers.get(a).getElementID().compareToIgnoreCase(elementsA.get(i).getElementID())==0){
							sChecked="checked";
							break;
						}						
					}	
					out.append("	  <tr style=\"\">\n");											
					out.append("         <td class=\"w20 alignLeft access\"><input "+sChecked+" name=\"answer"+sPosPrompt+"\" id=\""+sLabel+"\" value=\""+sValore+"\" type=\"checkbox\"></td>\n");
					out.append("		 <td class=\"w90 alignLeft access\"><label for=\""+sLabel+"\">"+sLabel+"</label></td>\n");
					out.append("      </tr>\n");
					
					//out.append("<tr><td class=\"checkbox\"><input "+sChecked+" name=\"answer"+sPosPrompt+"\" id=\"answer"+sPosPrompt+"\" value=\""+sValore+"\" type=\"checkbox\"/><label>"+sLabel+"</label>");					
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
					}		
					/**Ciclo per definire le risposte gia' inserite*/
					for(int a=0;a<answers.size();a++){
						if(answers.get(a).getElementID().compareToIgnoreCase(elementsA.get(i).getElementID())==0){
							sChecked="checked";
							break;
						}						
					}	
					out.append("	  <tr style=\"\">\n");											
					out.append("         <td class=\"w20 alignLeft access\"><input "+sChecked+" name=\"answer"+sPosPrompt+"\" id=\""+sLabel+"\" value=\""+sValore+"\" type=\"checkbox\"></td>\n");
					out.append("		 <td class=\"w90 alignLeft access\"><label for=\""+sLabel+"\">"+sLabel+"</label></td>\n");
					out.append("      </tr>\n");
					
					//out.append("<tr><td class=\"checkbox\"><input "+sChecked+" name=\"answer"+sPosPrompt+"\" id=\"answer"+sPosPrompt+"\" value=\""+sValore+"\" type=\"checkbox\"/><label>"+sLabel+"</label>");					
					sLabel="";
					sChecked="";				
				}	 
			}
		}

		out.append("      <tr style=\"\">\n");	
		out.append("            <td class=\"w20 access\"><input value=\"1\" name=\"answerOptions"+sPosPrompt+"\" id=\"answerOptions"+sPosPrompt+"\" type=\"hidden\"></td>\n");						
		out.append("		      <td class=\"w90 access\"><input value=\"2\" name=\"answerFormat"+sPosPrompt+"\" id=\"answerFormat"+sPosPrompt+"\" type=\"hidden\"></td>\n");						          
		out.append("	  </tr>\n");	      
		out.append("      </tbody>\n");	
		out.append("</table>&nbsp;\n");	
				
		//out.append("</table>");
	}
}
