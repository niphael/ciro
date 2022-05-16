/**
 * Classe per scrivere il contenuto della parte centrale della pagina MSTR
 */
package com.giano.transforms;

import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;

import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.RequestKeys;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectsFactory;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;

/**
 * @author gianluca
 *
 */
public class GianoContent {
	private static String sStaticURLReturnToSIE=null;
	/**Identifica il messaggio da far comparire a video*/
	private String sMessageOutPut="";
	private String sTitleOutPut="Attenzione non e' stato possibile eseguire la richiesta.";
	
	/**Costruttore di default*/
	public GianoContent() {
		
	}
	/**
	 * Costruttore per la gestione degli errori
	 * 
	 * @param String sTitle titolo dell'errore 
	 * @param String sMessage messaggio di errore 
	 */
	public GianoContent(String sTitle, String sMessage) {
		// TODO Auto-generated constructor stub
		sMessageOutPut=sMessage; 
		sTitleOutPut=sTitle;
	}
	/**
	 * Metodo incaricato di visualizzare la sezione centrale del contenuto della pagina "WELCOME"
	 * e varie.
	 * 
	 * @param MarkupOutput out OutPut HTML
	 * @param RequestKeys rk parametri in URL 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com 
	 * */
	public void WriteContent(MarkupOutput out) {
		out.append("<table class=\"w100 cornice\" cellpadding=\"0\" cellspacing=\"0\">");
		out.append("	<tbody>");
		out.append("		<tr>");
		out.append("			<td class=\"alignTop\" style=\"width: 100%;\">");						
		out.append("		 		<table class=\"w100\" cellpadding=\"0\">");
		out.append("               <tbody>");
		out.append("						<tr style=\"display: none;\">");
		out.append("	                  <td class=\"w100\"></td>");
		out.append("	               </tr>");
		out.append(" 				</tbody>");
		out.append("				</table>");       
		out.append("				<table class=\"w100\" cellpadding=\"0\">");
		out.append("	            <tbody>");
		out.append("						<tr>");
		out.append("                      <td class=\"w100\"></td>");
		out.append("                  </tr>");
		out.append("                  <tr>");
		out.append("                  <td>");
		out.append("   	               <table class=\"w100\">");
		out.append("   	                  <tbody>");
		out.append("					     <tr style=\"display: none;\">");
		out.append("		                        <td class=\"w100\"></td>");
		out.append("   	                     </tr>");
		out.append("   	                     <tr style=\"\">");
		out.append("   	                       <td class=\"w100 alignLeft\">");
		
		//Qui e' il titolo della pagina
		out.append("<h2>"+sTitleOutPut+"</h2>");
		//Qui e' il titolo della pagina
		
		//Qui e' il contenuto della pagina
		out.append("<p>"+sMessageOutPut+"</p><br>");		
		//Qui e' il contenuto della pagina
		
		out.append("											</td>");                      
		out.append("										</tr>");
		out.append("									</tbody>");
		out.append("								</table>");   
		out.append("			             </td>");
		out.append("         	       </tr>");
		out.append(" 					</tbody>");
		out.append("				</table>");
		out.append("			</td>");
		out.append("		</tr>");
		out.append("	</tbody>");																				
		out.append("</table>");
	}
	
	/**
	 * Metodo incaricato di visualizzare la sezione centrale nel caso di errori sui prompt
	 * 
	 * @param MarkupOutput out OutPut HTML
	 * @param RequestKeys rk parametri in URL 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com 
	 * */
	public void WriteContentInside(MarkupOutput out) {
		out.append("<table class=\"w100 cornice\" cellpadding=\"0\" cellspacing=\"0\">");
		out.append("	<tbody>");
		out.append("		<tr>");
		out.append("			<td class=\"alignTop\" style=\"width: 100%;\">");						
		out.append("		 		<table class=\"w100\" cellpadding=\"0\">");
		out.append("               <tbody>");
		out.append("						<tr style=\"display: none;\">");
		out.append("	                  <td class=\"w100\"></td>");
		out.append("	               </tr>");
		out.append(" 				</tbody>");
		out.append("				</table>");       
		out.append("				<table class=\"w100\" cellpadding=\"0\">");
		out.append("	            <tbody>");
		out.append("						<tr>");
		out.append("                      <td class=\"w100\"></td>");
		out.append("                  </tr>");
		out.append("                  <tr>");
		out.append("                  <td>");
		out.append("   	               <table class=\"w100\">");
		out.append("   	                  <tbody>");
		out.append("					     <tr style=\"display: none;\">");
		out.append("		                        <td class=\"w100\"></td>");
		out.append("   	                     </tr>");
		out.append("   	                     <tr style=\"\">");
		out.append("   	                       <td class=\"w100 alignLeft\">");
		
		//Qui e' il titolo della pagina
		out.append("<h2>"+sTitleOutPut+"</h2>");
		//Qui e' il titolo della pagina
		
		//Qui e' il contenuto della pagina
		out.append("<p>"+sMessageOutPut+"</p><br>");		
		//Qui e' il contenuto della pagina
		
		out.append("											</td>");                      
		out.append("										</tr>");
		out.append("									</tbody>");
		out.append("								</table>");   
		out.append("			             </td>");
		out.append("         	       </tr>");
		out.append(" 					</tbody>");
		out.append("				</table>");
		out.append("			</td>");
		out.append("		</tr>");
		out.append("	</tbody>");																				
		out.append("</table>");

	}
	
	/**
	 * Metodo incaricato di visualizzare la sezione centrale un'informazione centrata
	 * 
	 * @param MarkupOutput out OutPut HTML
	 * @param RequestKeys rk parametri in URL 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com 
	 * */
	public void WriteInfo(MarkupOutput out) {
		out.append("<table class=\"w100\" cellpadding=\"0\" cellspacing=\"0\">");
		out.append("	<tbody>");
		out.append("		<tr>");
		out.append("			<td class=\"alignTop\" style=\"width: 100%;\">");						
		out.append("		 		<table class=\"w100\" cellpadding=\"0\">");
		out.append("               <tbody>");
		out.append("						<tr style=\"display: none;\">");
		out.append("	                  <td class=\"w100\"></td>");
		out.append("	               </tr>");
		out.append(" 				</tbody>");
		out.append("				</table>");       
		out.append("				<table class=\"w100\" cellpadding=\"0\">");
		out.append("	            <tbody>");
		out.append("						<tr>");
		out.append("                      <td class=\"w100\"></td>");
		out.append("                  </tr>");
		out.append("                  <tr>");
		out.append("                  <td>");
		out.append("   	               <table class=\"w100\">");
		out.append("   	                  <tbody>");
		out.append("					     <tr style=\"display: none;\">");
		out.append("		                        <td class=\"w100\"></td>");
		out.append("   	                     </tr>");
		out.append("   	                     <tr style=\"\">");
		out.append("   	                       <td class=\"w100 alignCenter\">");
		
		//Qui e' il titolo della pagina
		out.append("<h2>"+sTitleOutPut+"</h2>");
		//Qui e' il titolo della pagina
		
		//Qui e' il contenuto della pagina
		out.append("<p>"+sMessageOutPut+"</p><br>");		
		//Qui e' il contenuto della pagina
		
		out.append("											</td>");                      
		out.append("										</tr>");
		out.append("									</tbody>");
		out.append("								</table>");   
		out.append("			             </td>");
		out.append("         	       </tr>");
		out.append(" 					</tbody>");
		out.append("				</table>");
		out.append("			</td>");
		out.append("		</tr>");
		out.append("	</tbody>");																				
		out.append("</table>");
	}
	/**
	 * Metodo che e' incaricato di scrivere l'header per il SIE 
	 * costruisce anche l'URL per tornare al sie tramite il parametro in 
	 * querystring param2
	 * 
	 * @param MarkupOutput out HTML di uscita
	 * @param RequestKeys rk oggetto SDK MSTR per catturate il param2
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * 
	 * */
	public void paintHeader(MarkupOutput out,RequestKeys rk){
		/**Ora devo catturare il secondo parametro (param2) che mi cotruisce il link di ritorno al SIE*/
		String sURLReturnToSIE=null;
		sURLReturnToSIE=rk.getValue("PARAM2");
		if(sURLReturnToSIE!=null){
			try {				
				URLDecoder.decode(sURLReturnToSIE,"UTF-8");
				sStaticURLReturnToSIE=sURLReturnToSIE;
			} catch (UnsupportedEncodingException e) {
				StackTraceElement[] st = e.getStackTrace();
				int r;
				out.append("<!-- ");
				for(r=0;r<st.length;r++){
					out.append("getLineNumber: "+st[r].getLineNumber()+"<br>\n");
					out.append("getMethodName: "+st[r].getMethodName()+"<br>\n");
					out.append("getFileName: "+st[r].getFileName()+"<br>\n");
				}
				out.append(" -->");
				sURLReturnToSIE="#";
			}
		}else{
			/**param2 non presente URL saltato*/
			if(sStaticURLReturnToSIE!=null){
				sURLReturnToSIE=sStaticURLReturnToSIE;	
			}else{
				sURLReturnToSIE="##";	
			}
			
		}		
		
	
		
		
		out.append("<link rel=\"stylesheet\" type=\"text/css\" href=\"../plugins/_Interface/style/sie_style.css\"/>");
		//Funzione AJAX per la gestione del timeout del SIE		
		out.append("<script language=\"javascript\">;\n");
		out.append("var oIFRAME = document.createElement(\"IFRAME\");\n");	
		//TimeOut 300000Ms -> 300s -> 5Min
		out.append("setInterval(\"sieBack('"+sURLReturnToSIE+"');\",300000);\n");
		out.append("function sieBack(sURL){\n");			
		out.append("	if (oIFRAME) {\n");
		out.append("		oIFRAME.style.width=\"0px\";\n");
		out.append("		oIFRAME.style.height=\"0px\";\n");
		out.append("		oIFRAME.src=sURL;\n");			
		out.append("		oIFRAME.id=\"oSIE\";\n");
		//out.append("		alert(sURL);\n");
		out.append("		document.body.appendChild(oIFRAME);\n");		
	    out.append("	}\n");
		out.append("}\n");
		out.append("</script>\n");
	
		//Funzione AJAX per la gestione del timeout del SIE
		out.append("<table class=\"w100 bgcolor\" cellpadding=\"0\" cellspacing=\"0\">");
		out.append("	<tbody><tr>");
		out.append("		<td class=\"width:196;\">");
		out.append("		<img src=\"../plugins/_Interface/images/sie/logo_sie.jpg\" alt=\"SIE - Sistema Informativo Entrate\">");
		out.append("		</td>");
		out.append("		<td class=\"w100\">			");		
		out.append("<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">");
		out.append("	<tbody><tr>	");
		out.append("		<td>		");
		out.append("			<table width=\"100%\">");
		out.append("				<tbody><tr>						");
		out.append("					<td class=\"w80 alignTop\" align=\"center\">");
		out.append("						&nbsp;");
		out.append("					</td>										");
		out.append("					<td class=\"w20 mnulat\" align=\"center\">");
		out.append("					<a href=\""+sURLReturnToSIE+"\" class=\"somm\"><font size=\"2\">Torna a Selezione Stampe</font></a>");
		out.append("				</td></tr>");
		out.append("			</tbody></table>");
		out.append("		</td>");
		out.append("	</tr>");
		out.append("	<tr>");
		out.append("		<td class=\"intestazione\">");
	/*	out.append("			<img src=\"../plugins/_Interface/images/sie/stampa.png\" title=\"Stampa\" alt=\"Stampa\"/>");*/
		out.append("			<img src=\"../plugins/_Interface/images/sie/spazio.gif\" alt=\"\" height=\"2\" width=\"1\">	");				
		out.append("		</td>");
		out.append("	</tr>");
		out.append("	<tr>");
		out.append("		<td>");		
		out.append("			<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">");
		out.append("<tbody><tr>");
		out.append("<td class=\"titolo\" align=\"center\">");
		/**
		 * Inserimento Titolo della Pagina (aka M5)
		 * 
		 * attenzione qui non dovrò visualizzare il titolo per le pagine che non 
		 * contengono report.
		 * 
		 * Catturo il nome del Report che ho lanciato
		 * */	
		String sReportName=this.getReportName(rk,out);
		if(sReportName.compareToIgnoreCase("")==0){
			//TODO gestione del titolo anche se manca id dell'oggetto
			out.append("<!-- Report Name-->&nbsp;<web:beanValue runat=\"server\" mproperty=\"title\" encode=\"true\"/>&nbsp;<!-- Report Name-->");	
		}else{			
			out.append("<!-- Report Name-->&nbsp;"+sReportName+"&nbsp;<!-- Report Name-->");
		}
		
		
		out.append("</td>");
		out.append("</tr>");
		out.append("</tbody></table>");
		out.append("</td>");
		out.append("	</tr>		");
		out.append("</tbody></table>");
		out.append("		</td>");
		out.append("	</tr>");
		out.append("	<tr>");
		out.append("		<td class=\"alignTop\">");
		out.append("		</td>");
		out.append("		<td class=\"alignTop\">");
		out.append("			<table class=\"w100\" cellpadding=\"1\" cellspacing=\"2\">");
		out.append(" <tbody><tr>");
		out.append(" <td class=\"intestazione2\"></td>");
		out.append(" </tr>");
		out.append(" </tbody></table>");
		out.append("		</td>");
		out.append("	</tr>");
		out.append("	<tr>");
		out.append("		<td class=\"alignTop\">");
		out.append("		</td>");
		out.append("		</tr></tbody></table>");
	}
	/**
	 * Questo metodo si occupa di prelevare il nome del Report/documento
	 * eseguito.
	 * 
	 * @param MarkupOutput out HTML dell'header per il SIE
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * 
	 * */
	private String getReportName(RequestKeys rk,MarkupOutput out) {
		// TODO inserire IS dinamico!
		
		String sObjectId="";
		int iType=0;
		WebObjectsFactory factory=WebObjectsFactory.getInstance();
		WebIServerSession serverSession=factory.getIServerSession();	
		
		if(rk.getValue("reportID")!=null){
			sObjectId=rk.getValue("reportID");
			iType=EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition;
		}else if(rk.getValue("documentID")!=null){
			sObjectId=rk.getValue("documentID");
			iType=EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition;
		}else if(rk.getValue("rb")!=null){
			/**catturo il nome del report dall'XML state del bean*/
			sObjectId=this.getReportNameFormXML(rk.getValue("rb"),"rb");
			iType=EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition;
		}else if(rk.getValue("rwb")!=null){
			/**catturo il nome del report dall'XML state del bean*/
			sObjectId=this.getReportNameFormXML(rk.getValue("rwb"),"rwb");
			iType=EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition;
		}
		
		//Imposto i parametri per la connessione
		String sReportName="";
		String sFirstPrj="Stampa Entrate";			
		
		if(rk.getValue("Server")!=null){
			serverSession.setServerName(rk.getValue("Server"));
		}
		/**Imposto il nome del server dal parametro custom*/
		if(rk.getValue("ServerNameG")!=null){
			serverSession.setServerName(rk.getValue("ServerNameG"));
		}
		
		serverSession.setServerPort(0);
		serverSession.setLogin("u_sie_control");
		serverSession.setPassword("control_sie_u");	
	
		
		serverSession.setProjectName(sFirstPrj);
		
		try {							
			WebObjectInfo woi = factory.getObjectSource().getObject(sObjectId, iType);
			woi.populate();
			sReportName=woi.getName();								
			serverSession.closeSession();
			serverSession=null;
			woi=null;
			return sReportName;
		}catch (Exception e) {
		
			return "<!-- "+e.getMessage()+" -->";
		}		
	}
	/**
	 * Questo metodo si occupa di prelevare il nome del Report/documento
	 * eseguito dall'XML state del bean.
	 * 
	 * @param String XmlContent xml del bean
	 * @param String sAttribute attributo da cui prelevare il nome
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * 
	 * */
	private String getReportNameFormXML(String XmlContent, String sAttribute) {
		Document documentObj;
		DocumentBuilderFactory factoryObj = DocumentBuilderFactory.newInstance();	
	
		
		// Leggo il file XML dato del Server
		StringReader readerXML = new StringReader(XmlContent);							  
		// Imposto il File XML come imput 		
		InputSource xmlSource = new InputSource(readerXML);
		// Build document:
		DocumentBuilder builder;
		
		try {
			builder = factoryObj.newDocumentBuilder();
			documentObj = builder.parse(xmlSource);
			
			// Generate the NodeList;
			org.w3c.dom.NodeList nodeList = documentObj.getElementsByTagName(sAttribute);
			
			for (int i=0; i<nodeList.getLength(); i++){
				Element curElm = (Element)nodeList.item(i);
				return curElm.getAttribute("did");				
			}
		} 
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();			
			return "";
		}
		return "";
	}
}
