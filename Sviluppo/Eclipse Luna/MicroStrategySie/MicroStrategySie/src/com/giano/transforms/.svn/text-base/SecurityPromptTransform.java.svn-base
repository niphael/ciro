/**
 * 
 */
package com.giano.transforms;


import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.PromptObject;
import com.microstrategy.web.beans.Transformable;
import com.microstrategy.web.objects.WebElements;
import com.microstrategy.web.objects.WebElementsPrompt;
import com.microstrategy.web.objects.WebPrompt;
import com.microstrategy.web.transform.AbstractTransform;

/**
 * @author gianluca
 *
 */
public class SecurityPromptTransform extends AbstractTransform {
	
	public String getDescription() {
		// TODO Auto-generated method stub
		return "Security Prompt";
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
		WebElements answers = elemPrompt.getAnswer();
		String sPosPrompt="_"+Integer.toString(po.getPromptPosition());
		if(sPosPrompt.compareTo("_0")==0){
			sPosPrompt="";
		}
		if(!answers.isEmpty()){
			/**Identifica il valore che assume il Prompt*/		
			String sValore=null;
			out.append("\"><div class=\"nascoto\">\n");
			for(int a=0;a<answers.size();a++){
				String[] aFields = answers.get(a).getElementID().split(":");
				sValore=answers.get(a).getElementID()+"~"+answers.get(a).getDisplayUnitType()+"~"+aFields[1];							
				//out.append("<input checked type=\"checkbox\" name=\"answer"+sPosPrompt+"\" id=\"answer"+sPosPrompt+"\" value=\""+sValore+"\"/>");			
				out.append("<input type=\"hidden\" name=\"answer"+sPosPrompt+"\" id=\"Risposta"+sPosPrompt+a+"\" value=\""+sValore+"\"/>");
				//out.append("<font face='monospace' color='red'>Risposte pre impostate"+answers.get(a).getElementID()+"</font><br>");
			}	
			//out.append("<font face='monospace' color='green'><b>"+elemPrompt.getName()+"</b></font><br>");					
			//out.append("<font face='monospace' color='green'>"+elemPrompt.getTitle()+"</font><br>");
			//out.append("<font face='monospace' color='green'>"+elemPrompt.getMeaning()+"</font><br>");	
			out.append("<input value=\"\" name=\"answerOptions"+sPosPrompt+"\" id=\"answerOptions"+sPosPrompt+"\" type=\"hidden\">\n" +
					"<input value=\"2\" name=\"answerFormat"+sPosPrompt+"\" id=\"answerFormat"+sPosPrompt+"\" type=\"hidden\"></div>\n");
			/**Attenzione viene sovrascritta se in accessiblePromptTrasform vi e' renderPrompt*/	
		}
					
	}
}
