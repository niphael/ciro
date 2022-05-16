/**
 * 
 */
package com.giano.transforms;

import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.PromptObject;
import com.microstrategy.web.beans.Transformable;
import com.microstrategy.web.objects.WebFolder;
import com.microstrategy.web.objects.WebObjectsPrompt;
import com.microstrategy.web.objects.WebPrompt;
import com.microstrategy.web.transform.AbstractTransform;

/**
 * @author gianluca
 *
 */
public class AccessibleObjectCBPromptTransform extends AbstractTransform{

	public String getDescription() {
		// TODO Auto-generated method stub
		return "Accessible Check Box Prompt";
	}

	public Class getSupportedBeanType() {
		// TODO Auto-generated method stub
		return PromptObject.class;
	}

	public void transform(Transformable data, MarkupOutput out) throws ClassCastException {
		// TODO rimuovere i commenti di debug 
		PromptObject po = (PromptObject) data;
		WebPrompt oPrompt = po.getWebPrompt();	
		WebObjectsPrompt objPrompt = (WebObjectsPrompt) oPrompt;	
		
		WebFolder folders = objPrompt.getSuggestedAnswers();
		WebFolder answers = objPrompt.getAnswer();
		/**Identifica le selezioni gia' fatte*/
		String sChecked="";
		/**Identifica la label che assume il Prompt*/
		String sLabel="";
		/**Identifica il valore che assume il Prompt*/		
		String sValore=null;
		String sPosPrompt="_"+Integer.toString(po.getPromptPosition());
		/**contiene il testo per o prompt obbligatori*/
		String sPromptMandatory="";
		
		if(sPosPrompt.compareTo("_0")==0){
			sPosPrompt="";
		}
		/**Evidenzio che il PROMPT è obbligatorio*/
		if(oPrompt.isRequired()){
			sPromptMandatory="&nbsp;<span class=\"asterisco\"> * </span>";
		}
		int nElements=0;
		
		nElements = folders.size();			
		
		if(nElements>3){
			/**Parte di HTML per chiudere ciò che creo nel AccessiblePromptTransform*/					
			if(oPrompt.isClosed()) out.append(" nascosto\">");
			else out.append(" scrollauto\">");
		}else{
			/**Parte di HTML per chiudere ciò che creo nel AccessiblePromptTransform*/
			if(oPrompt.isClosed()) out.append(" nascosto\">");
			else out.append("\">");	
		}
		
		out.append("<table class=\"w90 alignLeft\" summary=\""+objPrompt.getTitle()+"\">\n");	
		//out.append("<caption>"+objPrompt.getTitle()+"</caption>");
		out.append("   <tbody>");	
		/*out.append("	  <tr>");	
		out.append("		<td class=\"w5 alignLeft\" nowrap colspan=\"2\"><p class=\"riepilogo\">"+elemPrompt.getTitle()+"</p></td>");	
		out.append("	  </tr>");*/	
		out.append("	  <tr>");	
		out.append("		<td class=\"w5 alignLeft access\" colspan=\"2\"><p class=\"sezione\">"+objPrompt.getMeaning()+"</p></td>");	
		out.append("	  </tr>");	
		out.append("	  <tr>");	
		out.append("         <th class=\"w20 alignLeft access\"><p class=\"sezione\">Selezione</p></th>");
		out.append("         <th class=\"w90 alignLeft access\" nowrap><p class=\"sezione\">"+objPrompt.getName()+sPromptMandatory+"</p></th>");			                               
		out.append("      </tr>");	 
		
		for(int i =0;i<folders.size();i++){
			/*out.append("<BR>folders.get(i).getID()="+folders.get(i).getID()+"<BR>");
			out.append("<BR>folders.get(i).getName()="+folders.get(i).getName()+"<BR>");
			out.append("<BR>folders.get(i).getType()="+folders.get(i).getType()+"<BR>");
			out.append("<BR>objPrompt.getAnswer().size()="+objPrompt.getAnswer().size()+"<BR>");
			out.append("<BR>oPrompt.isClosed()="+oPrompt.isClosed()+"<BR>");
			out.append("<BR>oPrompt.isUsed()="+oPrompt.isUsed()+"<BR><BR><BR>");*/
		
			sValore=folders.get(i).getID()+"~"+folders.get(i).getType()+"~"+folders.get(i).getName();
			sLabel = folders.get(i).getName();
			sChecked="";
			/**Ciclo per definire le risposte gia' inserite*/
			for(int a=0;a<answers.size();a++){
				if(answers.get(a).getID().compareToIgnoreCase(folders.get(i).getID())==0){
					sChecked="checked";
					break;
				}						
			}	
			out.append("	  <tr style=\"\">");											
			out.append("         <td class=\"w20 alignLeft access\"><input "+sChecked+" name=\"answer"+sPosPrompt+"\" id=\""+sLabel+"\" value=\""+sValore+"\" type=\"checkbox\"></td>");
			out.append("		 <td class=\"w90 alignLeft access\"><label for=\""+sLabel+"\">"+sLabel+"</label></td>");
			out.append("      </tr>");
			
			//out.append("sValore="+sValore);
		}
		
		out.append("      <tr style=\"\">");	
		out.append("            <td class=\"w20 access\"><input value=\"\" name=\"answerOptions"+sPosPrompt+"\" id=\"answerOptions"+sPosPrompt+"\" type=\"hidden\"></td>");						
		out.append("		      <td class=\"w90 access\"><input value=\"2\" name=\"answerFormat"+sPosPrompt+"\" id=\"answerFormat"+sPosPrompt+"\" type=\"hidden\"></td>");						          
		out.append("	  </tr>");	      
		out.append("      </tbody>");	
		out.append("</table>&nbsp;");	
	}
}
