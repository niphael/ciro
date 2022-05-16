/**
 * Classe trasformation che estende il trasformation che viene utilizzato da MicroStrategy 
 * per la visualizzione del Prompt nel titolo e menu' laterale, i singoli prompt sono demandati
 * ai transform specifici
 * 
 * @see AccessibleCBPromptTransform, AccessibleInputPromptTransform, SecurityPromptTransform.
 * @author Gianluca Masci aka (GLM)
 */
package com.giano.transforms;

import it.mef.sie.cryptography.SymmetricCipher;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import java.util.Vector;

import sun.misc.BASE64Decoder;

import com.microstrategy.web.app.transforms.PromptsClassicTransform;
import com.microstrategy.web.beans.EnumBeanOutputFormat;
import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.PromptObject;
import com.microstrategy.web.beans.PromptsBean;
import com.microstrategy.web.beans.RequestKeys;
import com.microstrategy.web.beans.WebBeanException;
import com.microstrategy.web.objects.EnumWebPromptType;
import com.microstrategy.web.objects.WebElementSource;
import com.microstrategy.web.objects.WebElements;
import com.microstrategy.web.objects.WebElementsPrompt;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebPrompt;
import com.microstrategy.web.objects.WebProperties;
import com.microstrategy.web.objects.WebProperty;
import com.microstrategy.web.objects.WebPropertySet;

/**
 * @author Gianluca Masci aka (GLM)
 *
 */
public class AccessiblePromptTransform extends PromptsClassicTransform {		
	
	/**
	 * Identifica se il filtro di sicurezza e' impostato. Di default e' true cioe' impostato,
	 * viene impostato a false dal metodo setSecurityPrompts nel casodi errore
	 * */
	private boolean bSecurity=true; 
	/**Identifica se il prompt di sicurezza l'unico dei prompt presenti risolve il problema della pagina vuota col tasto esegui*/
	private boolean bOnlySecurity=true; 
	
	public AccessiblePromptTransform() {		
		super();		
	} 
		
	
	/**
	 * Metodo che imposta il prompt di sicurezza
	 * 
	 * @param WebPrompt oggetto prompt su cui impostare la risposta
	 * @author Gianluca Masci aka (GLM)
	 * @param requestKey 
	 * @param out 
	 * */
	private void setSecurityPrompts(WebPrompt prompt, RequestKeys requestKey, MarkupOutput out) {
		String sParam=null; 
		WebElementsPrompt elemPrompt = (WebElementsPrompt) prompt;							
		WebElements elements = elemPrompt.getSuggestedAnswers();
		String sElementID="";
		String sSecurityAnswer=null;
		String[] sAnswer=null; 
		
		
		/**Mi preparo a costruire le resposte*/
		WebElements answers = elemPrompt.getAnswer();
		
		/**Controllo se il prompt e' valorizzato*/
		if(!answers.isEmpty()){						
			return;
		}
		
		//out.append("<!-- Security: "+elemPrompt.getTitle()+" : "+requestKey.getValue("PARAM1")+"-->");
		if(sParam==null && requestKey!=null){			
			/**Controllo che il prompt e' RPS o UCB*/
			//TODO inserire decriptazione e prelevemento parametro da PARAM1={RPS=100;110|UCB=all|UCB_CAPO=|UCB_CLASS=}
			
			if(elemPrompt.getTitle().compareToIgnoreCase("RPS")==0){
				//sParam=requestKey.getValue("RPS");
				out.append("<!-- Security RPS: "+elemPrompt.getTitle()+"-->");
				sParam=this.getParam("RPS",requestKey,out);
			}else if(elemPrompt.getTitle().compareToIgnoreCase("UCB")==0){
				//sParam=requestKey.getValue("UCB");
				out.append("<!-- Security UCB: "+elemPrompt.getTitle()+"-->");
				sParam=this.getParam("UCB",requestKey,out);
			}else if(elemPrompt.getTitle().compareToIgnoreCase("UCB_CAPO")==0){
				//sParam=requestKey.getValue("UCB");
				out.append("<!-- Security UCB: "+elemPrompt.getTitle()+"-->");
				sParam=this.getParam("UCB",requestKey,out);
			}else if(elemPrompt.getTitle().compareToIgnoreCase("UCB_CLASS")==0){
				//sParam=requestKey.getValue("UCB");
				out.append("<!-- Security UCB: "+elemPrompt.getTitle()+"-->");
				sParam=this.getParam("UCB",requestKey,out);
			}else{				
				GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
				gc.WriteContentInside(out);
				return;
			}
			
			sSecurityAnswer=sParam;
		}else{			
			sSecurityAnswer=sParam;
		}
		
		if (elements == null || elements.size() == 0) {			
			WebElementSource eltSrc = elemPrompt.getOrigin().getElementSource();
			try {
				elements = eltSrc.getElements();
				sAnswer=new String[elements.size()];
				if(!elements.isEmpty()){
					for (int i=0;i<elements.size();i++) {	                        	     
						/*if(requestKey.getValue("debug")!=null){
							out.append("<font face='monospace' color='green'>ElemID: "+elements.get(i).getElementID()+"; ElemDesc: "+elements.get(i).getDisplayName()+"</font><br>");						
						}*/
						/**salvo le risposte presenti nella lista*/
						sAnswer[i]=elements.get(i).getElementID();
						sElementID=elements.get(i).getElementID().substring(0,elements.get(i).getElementID().indexOf(":"));
						/*if(requestKey.getValue("debug")!=null){
							out.append("<font face='monospace' color='green'>Short= "+sElementID+"</font><br>");
						}*/
					}	 
				}else{
					bSecurity=false;						
					return;
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
			WebElements elementsA = elemPrompt.getAnswer();
			/*if(requestKey.getValue("debug")!=null){								
				out.append("<font face='monospace' color='green'>ElemenA Size ==> "+elementsA.size()+"</font><br>");
			}*/
			if (elementsA == null || elementsA.size() == 0) {

				WebElementSource eltSrc = elemPrompt.getOrigin().getElementSource();
				try {
					elementsA = eltSrc.getElements();
					if(!elementsA.isEmpty()){
						for (int i=0;i<elementsA.size();i++) {	                        	     
							/*if(requestKey.getValue("debug")!=null){
								out.append("<font face='monospace' color='green'>ElemIDA: "+elementsA.get(i).getElementID()+"; ElemDescA: "+elementsA.get(i).getDisplayName()+"</font><br>");
							}*/
							sElementID=elementsA.get(i).getElementID().substring(0,elementsA.get(i).getElementID().indexOf(":"));
							/*if(requestKey.getValue("debug")!=null){
								out.append("<font face='monospace' color='green'>ShortA= "+sElementID+"</font><br>");
							}*/
						}	 
					}else{
						bSecurity=false;						
						return;
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
			}
		}
										
		/**rispondo con i valori arrivati in querystring*/
		if(sSecurityAnswer!=null) {
			/**controllo se il parametro contiene 'all' sigifica che devo rispondere a tutti i valori*/
			if(sSecurityAnswer.compareToIgnoreCase("all")==0){
				/*if(requestKey.getValue("debug")!=null){
						out.append("<font face='monospace' color='red'><b color=\"red\">Numero di Risposte "+answers.size()+"</b></font><br>");
					}*/
				for(int x=0;x<sAnswer.length;x++){
					answers.add(sAnswer[x]);	
				}

				try {
					elemPrompt.validate();
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
				elemPrompt.setAnswer(answers);
			}else{
				answers.clear();
				/*if(requestKey.getValue("debug")!=null){
							out.append("<font face='monospace' color='green'>Rispondo= "+sElementID+":"+requestKey.getValue("PARAM1")+";</font><br>");
						}*/
				String[] aSecurityAnswers=sSecurityAnswer.split(";");			
				for(int x=0;x<aSecurityAnswers.length;x++){
					answers.add(sElementID+":"+aSecurityAnswers[x].trim());	
					/*if(requestKey.getValue("debug")!=null){
								out.append("<font face='monospace' color='green'>Add answer: "+sElementID+":"+aSecurityAnswers[x]+"&nbsp;</font><br>");
							}*/
				}			
				try {
					elemPrompt.validate();
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
				elemPrompt.setAnswer(answers);
			}
			/*if(requestKey.getValue("debug")!=null){
						out.append("<font face='monospace' color='green'>RISPOSTA</font><br>");
					}*/			
		}else{
			if(!answers.isEmpty()){
				if(answers.size()!=0){
					/*if(requestKey.getValue("debug")!=null){
							out.append("<font face='monospace' color='red'>Filtro di Sicurezza non in request! Prendo il precedente</font><br>");
							for(int a=0;a<answers.size();a++){
								out.append("<font face='monospace' color='red'>Risposte pre impostate"+answers.get(a).getElementID()+"</font><br>");
							}
						}*/				
					elemPrompt.setAnswer(answers);				
				}else{
					/**nessun filtro di sicurezza bloccare il REPORT!!!*/
					bSecurity=false;						
					return;
				}
			}else{
				/**nessun filtro di sicurezza bloccare il REPORT!!!*/
				bSecurity=false;						
				return;
			}					
		}																
	}
	
	/**
	 * Metodo che ritorna il valore del parametro passato all'interno del
	 * valore di PARAM1, di seguito il formato:
	 * 
	 * {PARAM1=[RPS=110;111+UCB=all]}
	 * 
	 * @param requestKey Parametri di GET 
	 * @param out 
	 * @param String sParam parametro da estrarre
	 * @return String Valore del parametro da estrarre
	 * 
	 * */
	private String getParam(String sParam, RequestKeys requestKey, MarkupOutput out) {
		// TODO inserire sezione di descript		
		if(requestKey==null) return null;
		String[] aAppo1, aAppo2;
		String sToDeChiper;
		if(requestKey.getValue("PARAM1")==null) {bSecurity=false; return null;}
		try {			
			sToDeChiper = new String(requestKey.getValue("PARAM1").getBytes("ISO-8859-1"),"UTF-8");		
			/**Parametro in URL assente*/
			if(sToDeChiper==null) {bSecurity=false; return null;}
			String sParam1 = this.DeChiper(URLEncoder.encode(sToDeChiper,"UTF-8"),out);
			/**Stringa non decifrata*/
			if(sParam1==null)  {bSecurity=false; return null;}
			//out.append("<!-- Security Value: "+requestKey.getValue("PARAM1")+" -->");
			/**Qui divido il parametro param1 in RPS e UCB*/
			aAppo1=this.split(sParam1, "|");
			//out.append("<!-- Security Value: - "+aAppo1.length+" - "+aAppo1[0]+" - "+aAppo1[1]+" -->");
			
			for(int iRPS_UCB=0;iRPS_UCB<aAppo1.length;iRPS_UCB++){
				/**Ho trovato il parametro devo ora splittare per prendere il valore*/
				if(aAppo1[iRPS_UCB].substring(0, 3).compareToIgnoreCase(sParam)==0){				
					/**Ora contengo la coppia Parametro=Valore*/
					aAppo2=aAppo1[iRPS_UCB].split("=");
					out.append("<!-- Security Value "+sParam+": "+aAppo1[iRPS_UCB]+" length: "+aAppo2+"-->");
					/**Ritorno l'ultimo elemento dell'array che e' il valore*/
					return aAppo2[aAppo2.length-1];
				}
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	private String DeChiper(String value, MarkupOutput out) {
		
		String decoded;
		String finale=value;
		
		try {
			out.append("<!-- before decrypt :"+value+" -->");					
			decoded = URLDecoder.decode(value,"UTF-8");
			
			out.append("<!-- after URLDecoder :"+decoded+" -->");
			//riconverte i bytes da BASE64 a bytes standard da 8 bit
			BASE64Decoder decoder = new BASE64Decoder();
			byte[] originalCipher = decoder.decodeBuffer(decoded);
			
			byte[] rpsUcbDecipher = SymmetricCipher.decrypt(originalCipher,getPromptsBean().getSessionInfo().getSessionID().getBytes("UTF-8"));
			finale = new String(rpsUcbDecipher,"UTF-8");
			out.append("<!-- before decrypt :"+value+" after decrypt: "+finale+" -->");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			out.append("<!-- UnsupportedEncodingException: "+e.getMessage()+" -->");
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
			gc.WriteContent(out);
			return null;
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			out.append("<!-- IOException: "+e1.getMessage()+" -->");
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
			gc.WriteContent(out);
			return null;
		} catch (WebObjectsException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
			out.append("<!-- WebObjectsException: "+e2.getMessage()+" -->");
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
			gc.WriteContent(out);
			return null;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			out.append("<!-- Exception: "+e.getMessage()+" -->");
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
			gc.WriteContent(out);
			return null;
		}
//		
		return finale;
	}
			
	public String getDescription() {
		// TODO Auto-generated method stub
		return null;
	}	
	
	public void transformForRequestSuccessful(MarkupOutput out){		
		/**
		 * Richiamo la funzione per disegnare l'header nel Prompt
		 * Per il momento commentata la creazione dell'intestazione 
		 * e' stata inserita una pagina Sie_Header.ascx (HTML)
		 * con il codice necessario
		 * */
		ResourceBundle bl=null;
		/**Identifica quando passare alla riga successiva*/
		boolean bNextRow=true;
		/**determina se scrivere o meno il parametro cifrato in una input nascosta*/
		boolean bWriteParam1=true;
		/**determina se scrivere o meno il parametro ServerNameG in una input nascosta*/
		boolean bServerNameG=true;
		
		/**classe CSS da applicare al div che conterra il Prompt, puo' assumere come valore right-container2 o left-container2*/
		String sPromptCSS="left-container2";
		try{
			bl = ResourceBundle.getBundle("sie");	
		}catch(MissingResourceException noBL){
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
			gc.WriteContent(out);
			return;
		}
		/**contiene tutti i prompt presenti nel Report*/
		ArrayList aListPrompt = getPromptsList();
		
		out.append("<!-- Prompt Accessibile -->\n");		
		out.append("<p class=\"alignLeft sezione\">I dati contrassegnati con (<span class=\"asterisco\"> * </span>) sono obbligatori</p>\n");
		out.append("<!-- Contenitore di tutti i Prompt -->\n");
		out.append("<div class=\"base-layer\">\n");
		out.append("	<!-- inizio Tabella-->\n");
		out.append("	<div class=\"space-line\"><br></div>\n");
												
		/**Inizio del form*/
		renderFormStart(out); 
		PromptsBean pb = getPromptsBean();
		
		if(pb==null) return;
		
		boolean bForceNewLine=false;
		
		int i=0;			
		/**Forzo il rendering in HTML compatibile per accessibilita'!*/
		pb.setOutputFormat(EnumBeanOutputFormat.HTML_FORMAT);
		
		//com.microstrategy.web.app.beans.AppContext ap = this.getPromptsAppContext();
		RequestKeys rk = getRequestKeys();
		
		/*if(ap!=null){
			rk = ap.getRequestKeys();	
		}*/
		String sAcs="";
		sAcs=rk.getValue("accessibile");
		
		if(sAcs!=null){
			if (sAcs.compareToIgnoreCase("true")==0)
				out.append("<input type=\"hidden\" value=\"true\" name=\"accessibile\" id=\"accessibile\"/>\n");	
		}
		if(rk.getValue("param2")!=null){
			out.append("<!-- param2 -->\n");
			out.append("<input type=\"hidden\" value=\""+rk.getValue("param2")+"\" name=\"param2\" id=\"param2\"/>\n");
			out.append("<!-- param2 -->\n");
			rk.add("param2", rk.getValue("param2"));
		}
		
		for(int j=0;j<aListPrompt.size();j++){	
			try {	
				/**Sessione Scaduta*/
				if(!pb.getSessionInfo().isAlive() && !pb.getSessionInfo().isActive()){
					out.append("<font color=red>Sessione Scaduta= </font>&nbsp;&nbsp;\n");
					out.append("<font color=red>Sessione Scaduta= "+i+"</font>\n");
					return;
				}
				PromptObject po =((PromptObject) aListPrompt.get(j));
				
				if(bNextRow){					
					out.append("	<!-- inizio Righa (bNextRow) -->\n");
					out.append("	<div class=\"table-row\">\n");
					/**Imposto la classe css del prompt*/
					sPromptCSS="left-container2";					
					bNextRow=false;					
				}else{
					/**Imposto la classe css del prompt*/
					if(sPromptCSS.compareToIgnoreCase("nascosto")==0){
						sPromptCSS="left-container2";
						//bForceNewLine=true;
						bNextRow=false;
					}else {
						sPromptCSS="right-container2";
						bNextRow=true;
					}
					
				}
				
				/**scrivo il server Name in bServerNameG*/
				if(bServerNameG && rk.getValue("Server")!=null){
					out.append("<input type=\"hidden\" value=\""+rk.getValue("Server")+"\" name=\"ServerNameG\" id=\"ServerNameG\"/>");
					bServerNameG=false;
				}
				if(bServerNameG && rk.getValue("ServerNameG")!=null){
					out.append("<input type=\"hidden\" value=\""+rk.getValue("ServerNameG")+"\" name=\"ServerNameG\" id=\"ServerNameG\"/>");
					bServerNameG=false;
				}
				
				
				
				//out.append("<td>\n");
				//out.append("i="+i);	
				/**Controllo se nel report c'e' un prompt di sicurezza*/															
				WebPrompt oPrompt = po.getWebPrompt();					
				switch (oPrompt.getPromptType()) {
					case EnumWebPromptType.WebPromptTypeConstant:
						//out.append(" Stile Prompt Applicato: WebPromptTypeConstant <br>\n\n\n");	
						bOnlySecurity=false;
						break;
					case EnumWebPromptType.WebPromptTypeUnsupported:
						//out.append(" Stile Prompt Applicato: WebPromptTypeUnsupported <br>\n\n");
						break;
					case EnumWebPromptType.WebPromptTypeDimty:
						//out.append(" Stile Prompt Applicato: WebPromptTypeDimty <br> \n\n");
						break;
					case EnumWebPromptType.WebPromptTypeElements:						
						//out.append(" Stile Prompt Applicato: WebPromptTypeElements <br>\n\n");
						//modifica per aggiunta di nuovi prompt versione 9.0.2
						if(getStyleName(po).compareToIgnoreCase("SecurityPrompt")==0 || po.getWebPrompt().getDisplayProperties().getByName("CustomStyle").getValue().equals("SecurityPrompt")){		
							//out.append(" Stile Prompt Applicato: Security <br> \n\n");
							//out.append("<b> Nome Prompt: "+oPrompt.getName()+"</b><br><br>");
							/**Imposto il prompt di sicurezza*/
							if(bSecurity){
								if(rk.getValue("param1")!=null && bWriteParam1){									
									out.append("<!-- param1 -->");
									out.append("<input type=\"hidden\" value=\""+rk.getValue("param1")+"\" name=\"param1\" id=\"param1\"/>");
									out.append("<!-- param1 -->");
									bWriteParam1=false;
									//rk.add("param1", rk.getValue("param1"));
								}
								setSecurityPrompts(oPrompt, rk, out);								
								oPrompt.setClosed(true);
								oPrompt.validate();
								oPrompt.answerPrompt();
							}else{								
								GianoContent gc = new GianoContent(bl.getString("title.execute.1"),bl.getString("message.execute.1"));
								gc.WriteContent(out);
								break;
							}
							
						}else{
							bOnlySecurity=false;							
						}
						break;
					case EnumWebPromptType.WebPromptTypeExpression:
						//out.append(" Stile Prompt Applicato: WebPromptTypeExpression <br>\n\n");						
						break;
					case EnumWebPromptType.WebPromptTypeObjects:		
						bOnlySecurity=false;
						if (oPrompt.isClosed()){
							sPromptCSS="nascosto";														
						}
						//out.append(" Stile Prompt Applicato: WebPromptTypeObjects <br>\n\n");												
						break;
					default:
						//out.append("<!-- Stile Prompt Applicato: default --> <br>\n\n");
						break;
					}			
				if(bSecurity){
					if(rk.getValue("param1")!=null && bWriteParam1){									
						out.append("<!-- param1 -->");
						out.append("<input type=\"hidden\" value=\""+rk.getValue("param1")+"\" name=\"param1\" id=\"param1\"/>");
						out.append("<!-- param1 -->");
						bWriteParam1=false;
						//rk.add("param1", rk.getValue("param1"));
					}
				}
				//out.append("<!-- Stile Prompt Applicato: "+getStyleName(po)+"-->\n\n");
				if(bSecurity){
					out.append("<!--Inizio Prompt -->\n\n");
					/**
					 * Attenzione il resto dell'HTML lo scrivo nel trasformation specifico, 
					 * questo per la gesione dell'overflow.
					 * */
					//modifica per aggiunta di nuovi prompt versione 9.0.2
					if(getStyleName(po).compareToIgnoreCase("SecurityPrompt")==0 || po.getWebPrompt().getDisplayProperties().getByName("CustomStyle").getValue().equals("SecurityPrompt")) sPromptCSS="nascosto";
					
					
					
					out.append("<!--Display properties ="+ po.getWebPrompt().getDisplayProperties().getXML() +"-->\n\n");
					out.append("<!--Object info ="+ po.getWebPrompt().getXML() +"-->\n\n");
					out.append("<!--PSXSL ="+ po.getWebPrompt().getDisplayProperties().getByName("PSXSL") +"-->\n\n");
					out.append("<!--CustomStyle ="+ po.getWebPrompt().getDisplayProperties().getByName("CustomStyle").getValue() +"-->\n\n");
					out.append("<!--getName ="+ po.getPromptsBean().getName()+"-->\n\n");
					
					
					out.append("<!--Type prompt = ="+ po.getType() +"-->\n\n");
					out.append("<!--Style Prompt = "+ getStyleName(po)+"-->\n\n");
				
					
					out.append("<div class=\""+sPromptCSS);				
//					out.append("<b>start renderPrompt</b><br>");
					/**Controllo se nel report c'e' un prompt di sicurezza*/
					/* Modificata per gestione nuovi prompt mstr  9.0.2 */
					if(!po.getWebPrompt().getDisplayProperties().getByName("CustomStyle").getValue().equals("")){
						renderPrompt(out,po,po.getWebPrompt().getDisplayProperties().getByName("CustomStyle").getValue());
					}else{
				
							 renderPrompt(out,po,getStyleName(po));
							
					}
					   
					
						
					out.append("</div>");			
					out.append("<!--Fine Prompt -->\n\n");
					if(sPromptCSS.compareToIgnoreCase("right-container2")==0 || bForceNewLine){
						out.append("</div>");
						out.append("<!-- Fine Riga (else) -->\n");
						out.append("<div class=\"space-line\"><br></div>");						
					}
					
					
				}								
			}catch(Exception e2){
				StackTraceElement[] st = e2.getStackTrace();
				int r;
				out.append("<!-- ");
				for(r=0;r<st.length;r++){
					out.append("getLineNumber: "+st[r].getLineNumber()+"<br>\n");
					out.append("getMethodName: "+st[r].getMethodName()+"<br>\n");
					out.append("getFileName: "+st[r].getFileName()+"<br>\n");
				}
				out.append(" -->");											
			}					
				
		}
		/**Caso in cui c'e' solo il prompt di sicurezza*/
		if(bOnlySecurity){
			GianoContent gc = new GianoContent(bl.getString("title.only.security.prompt"),bl.getString("message.only.security.prompt"));
			gc.WriteInfo(out);			
			try {				
				pb.collectData();						
			} catch (WebBeanException e) {
				StackTraceElement[] st = e.getStackTrace();
				int r;
				out.append("<!-- collectData");
				for(r=0;r<st.length;r++){
					out.append("getLineNumber: "+st[r].getLineNumber()+"<br>\n");
					out.append("getMethodName: "+st[r].getMethodName()+"<br>\n");
					out.append("getFileName: "+st[r].getFileName()+"<br>\n");
				}
				out.append(" -->");			
			}
		}
		
		if(!bNextRow){
			out.append("</div>");
			//out.append("<div class=\""+sPromptCSS+"\"><br></div>");		
			out.append("<!-- Fine Riga (!bNextRow)-->");
			out.append("<div class=\"space-line\"><br></div>");
		}
		out.append("<div class=\"space-line\"><br></div>");
		out.append("</div>");
		out.append("<!-- Fine Tabella -->");
		
		if(bSecurity){
			/**Visualizzo i pulsanti all'interno del form*/
			renderExecuteButton(out);	
		}
						
		/**Fine del Form*/
		renderFormEnd(out);
		out.append("<!-- Prompt Accessibile -->");
	}
	
	public void renderExecuteButton(MarkupOutput out){		
		out.append("<table class=\"w100\">");
		out.append("   <tbody>");
		out.append("		<tr>");
		out.append("         <td class=\"alignLeft\">");
		
		/**
		 * Commentato perche' il pulsante e' presente nell'intestazione (Sie_Header.ascx)
		 * 
		out.append("				<input name=\"azione\" value=\"Torna a SIE\" class=\"puls\" type=\"submit\">");
		*/
		out.append("				<input name=\"answerButton\" id=\"answerButton\" value=\"Esegui\" class=\"puls\" type=\"submit\">");               
		out.append("         </td>");
		out.append("	      </tr>");
		out.append("      </tbody>");
		out.append("</table>");
	}	
	public void renderFormStart(MarkupOutput out){				
		out.append("<form ACTION=\"mstrWeb\" ID=\"PromptForm\" NAME=\"PromptForm\" METHOD=\"POST\" >");			
	}
	public void transformForRequestInError(MarkupOutput out){
		ResourceBundle bl=null;
		out.append("ERRORE INTERNO SIE!!!");
		try{			
			bl = ResourceBundle.getBundle("sie");
			out.append("<!-- AccessiblePromptTransform error: "+getPromptsBean().getErrorInfo().getErrorMessage()+"-->");
			out.append("<!-- AccessiblePromptTransform n: "+getPromptsBean().getErrorInfo().getErrorCode()+"-->");			
		}catch(MissingResourceException noBL){
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
			gc.WriteContent(out);
			return;
		}
		
		
		GianoContent gc = new GianoContent(bl.getString("title.login.1"),bl.getString("message.login.1"));
		gc.WriteContent(out);	
	}
	 /**
	 * Splitta una stringa in un array di Stringhe dato un
	 * certo carattere separatore
	 * 
	 * @param original 	stringa da splittare
	 * @param separator carattere separatore
	 * 
	 * @return String[]
	 * */
	public String[] split(String original, String separator) {
	    Vector nodes = new Vector();
	 
	    // Parse nodes into vector
	    int index = original.indexOf(separator);
	    while(index>=0) {
	        nodes.addElement( original.substring(0, index) );
	        original = original.substring(index+separator.length());
	        index = original.indexOf(separator);
	    }
	    // Get the last node
	    nodes.addElement( original );
	 
	    // Create splitted string array
	    String[] result = new String[ nodes.size() ];
	    if( nodes.size()>0 ) {
	        for(int loop=0; loop<nodes.size(); loop++)
	        result[loop] = (String)nodes.elementAt(loop);
	    }
	    return result;
	}	

	public void renderShell(MarkupOutput out){
		out.append("<!-- Start Bean Transform -->\n");
		out.append("<div>\n");
		this.transformForRequestSuccessful(out);
		out.append("</div>\n");
		out.append("<!-- End Bean Transform -->\n");
	}
}
