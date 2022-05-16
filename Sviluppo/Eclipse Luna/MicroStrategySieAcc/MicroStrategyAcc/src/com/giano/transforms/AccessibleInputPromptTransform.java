/**
 * 
 */
package com.giano.transforms;

import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.PromptObject;
import com.microstrategy.web.beans.Transformable;
import com.microstrategy.web.objects.WebConstantPrompt;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebPrompt;
import com.microstrategy.web.transform.AbstractTransform;

/**
 * @author gianluca
 *
 */
public class AccessibleInputPromptTransform extends AbstractTransform{

	public String getDescription() {
		// TODO Auto-generated method stub
		return "Accessible Text Box Prompt";
	}

	public Class getSupportedBeanType() {
		// TODO Auto-generated method stub
		return PromptObject.class;
	}

	public void transform(Transformable data, MarkupOutput out) throws ClassCastException {	
		PromptObject po = (PromptObject) data;	
		WebPrompt oPrompt = po.getWebPrompt();	
		WebConstantPrompt wcp = (WebConstantPrompt) oPrompt;
		String sValore=wcp.getAnswer();
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
		/**Parte di HTML per chiudere ci� che creo nel AccessiblePromptTransform*/		
		out.append("\">");
		
		out.append("<table class=\"w90 alignLeft\" > <tbody>	  <tr>		<td class=\"w5 alignLeft access\" colspan=\"2\"><p class=\"alignLeft sezione\">"+wcp.getMeaning()+"</p>\n</td>	  </tr>");	
		//out.append("<p class=\"alignLeft sezione\">"+wcp.getName()+sPromptMandatory+"</p>");	
		
		//Resetto il prompt
		try {				
			wcp.resetAnswer();
			wcp.setAnswer("");
			wcp.validate();
			wcp.answerPrompt();
		} catch (WebObjectsException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}			
		
		if(sValore!=null && !sValore.trim().equals("")){
			out.append("<tr>         <th class=\"w30 alignLeft access\"><p class=\"alignLeft sezione\"><label for=\"answer"+sPosPrompt+"\">"+wcp.getName()+sPromptMandatory+"</label></th> <th class=\"w90 alignLeft access\" nowrap><input type=\"text\" name=\"answer"+sPosPrompt+"\" id=\"answer"+sPosPrompt+"\" value=\""+sValore+"\"/></p>\n");
		}else{			
			out.append("<tr>         <th class=\"w30 alignLeft access\"><p class=\"alignLeft sezione\"><label for=\"answer"+sPosPrompt+"\">"+wcp.getName()+sPromptMandatory+"</label></th> <th class=\"w90 alignLeft access\" nowrap><input type=\"text\" name=\"answer"+sPosPrompt+"\" id=\"answer"+sPosPrompt+"\"  value=\"\"/></p>\n");
		}																	                   
		out.append("<input value=\"\" name=\"answerOptions"+sPosPrompt+"\" id=\"answerOptions"+sPosPrompt+"\" type=\"hidden\">\n");						
		out.append("<input value=\"2\" name=\"answerFormat"+sPosPrompt+"\" id=\"answerFormat"+sPosPrompt+"\" type=\"hidden\">\n</th>      </tr></tbody></table>");						          		
	}

}
