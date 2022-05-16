/**
 * 
 */
package com.giano.transforms;

import java.util.MissingResourceException;
import java.util.ResourceBundle;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.giano.utils.FileCachePurger;
import com.microstrategy.utils.xml.builders.WebReportExcelLayoutBuilder;
import com.microstrategy.web.app.transforms.ReportSavePropertiesTransform;
import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.ReportBean;
import com.microstrategy.web.beans.RequestKeys;
import com.microstrategy.web.beans.WebBeanException;
import com.microstrategy.web.objects.EnumExcelVersion;
import com.microstrategy.web.objects.EnumWebReportExecutionModes;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebReportExcelExportSettings;

/**
 * @author gianluca
 *
 */
public class SIEExportReportTransform extends ReportSavePropertiesTransform{	
	/**
	 * 
	 */
	public SIEExportReportTransform() {
		// TODO Auto-generated constructor stub
		super();
	}
	/* (non-Javadoc)
	 * @see com.microstrategy.web.app.transforms.ReportSavePropertiesTransform#transformForRequestSuccessful(com.microstrategy.web.beans.MarkupOutput)
	 */
	/* (non-Javadoc)
	 * @see com.microstrategy.web.app.transforms.ReportSavePropertiesTransform#transformForRequestSuccessful(com.microstrategy.web.beans.MarkupOutput)
	 */
	public void transformForRequestSuccessful(MarkupOutput out){	
		com.microstrategy.web.app.beans.AppContext ap = this.getAppContext();
		RequestKeys rk = ap.getRequestKeys();	
		
		ResourceBundle bl=null;
		try{
			bl = ResourceBundle.getBundle("sie");	
		}catch(MissingResourceException noBL){
			GianoContent gc = new GianoContent("Attenzione non &egrave; stato possibile eseguire la richiesta.","La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.");			
			gc.WriteContent(out);
			return;
		}
		
		if(rk.getValue("param1")==null){			
			/**Controllo se sono nella sezione accessibile o no*/
			if(rk.getValue("group")!=null){			
				super.transformForRequestSuccessful(out);
				return;
			}
			if(rk.getValue("name")!=null){							
				super.transformForRequestSuccessful(out);
				return;							
			}
			/**esportazione in pdf*/
			if(rk.getValue("PDFExportSection")!=null){							
				super.transformForRequestSuccessful(out);
				return;							
			}
		}
		
		
		/**Definizione della cartella dove vengono esportati i doc xls*/
		String sPath=bl.getString("export.dir");
		/**URL di esportazione*/
		String sURLexport=bl.getString("export.url");
		
		/**Cancellazione dei vecchi files esportati*/
		this.PurgeOldFiles(sPath);
		
		/**Generazione file XLS sul server WEB*/
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        
		ReportBean rb = getReportBean();
		String sTemp;
		try {
			sTemp = rb.getObjectInfo().getName().replace(' ', '_')+sdf.format(new Date());
		} catch (WebBeanException e1) {
			sTemp = sdf.format(new Date());
		}
		
		WebReportExcelLayoutBuilder webReportExcelLayoutBuilder = new WebReportExcelLayoutBuilder();
		webReportExcelLayoutBuilder.addName();
		webReportExcelLayoutBuilder.addFilter();
		webReportExcelLayoutBuilder.addPageByInfo();
		rb.setExecutionMode(EnumWebReportExecutionModes.REPORT_MODE_EXCEL);
		WebReportExcelExportSettings exportSettings = (WebReportExcelExportSettings)rb.getExportSettings();
		exportSettings.setLayout(webReportExcelLayoutBuilder.getXML());
		exportSettings.setVersion(EnumExcelVersion.EXCEL_2000_SR_1);
		
		
		/*Plain text*/
		/*WebReportPlainTextLayoutBuilder webReportPlainTextLayoutBuilder  = new WebReportPlainTextLayoutBuilder();		
		webReportPlainTextLayoutBuilder.addReport();
		WebReportPlainTextExportSettings exportPlainText = (WebReportPlainTextExportSettings)rb.getExportSettings();
		exportPlainText.setLayout(webReportPlainTextLayoutBuilder.getXML());
		exportPlainText.setSeparator(";");*/
		
		try {
			rb.collectData(); 
			//out.setContentType("application/vnd.ms-excel");	
			/**ATTENZIONE QUI C'E' DA SPECIFICARE IL PATH IN UN FILE DI PROPERTIES*/
			FileOutputStream fos = new FileOutputStream(sPath+sTemp+".xls");
			//fos.write(rb.getReportInstance().getExcelBinaryData());
			fos.write(rb.getReportInstance().getBinaryData());
			fos.flush();
			fos.close();
			

			
			//out.addHeader(arg0, arg1)
			/**Visualizzazione sezione centrale*/
			out.append("<table class=\"w100\" cellpadding=\"0\" cellspacing=\"0\">\n");
			out.append("	<tbody>\n");
			out.append("		<tr>\n");
			out.append("			<td class=\"alignTop\" style=\"width: 100%;\">\n");						
			out.append("		 		<table class=\"w100\" cellpadding=\"0\">\n");
			out.append("               <tbody>\n");
			out.append("						<tr style=\"display: none;\">\n");
			out.append("	                  <td class=\"w100 cornice\"></td>\n");
			out.append("	               </tr>\n");
			out.append(" 				</tbody>\n");
			out.append("				</table>\n");       
			out.append("				<table class=\"w100\" cellpadding=\"0\">\n");
			out.append("	            <tbody>\n");
			out.append("						<tr>\n");
			out.append("                      <td class=\"w100\"></td>\n");
			out.append("                  </tr>\n");
			out.append("                  <tr>\n");
			out.append("                  <td>\n");
			out.append("   	               <table class=\"cornice w100\">\n");
			out.append("   	                  <tbody>\n");
			out.append("					     <tr style=\"display: none;\">\n");
			out.append("		                        <td class=\"w100 cornice\"></td>\n");
			out.append("   	                     </tr>\n");
			out.append("   	                     <tr style=\"\">\n");
			out.append("   	                       <td class=\"w100\">\n");
			
			out.append(" <table class=\"w30 alignCenter\" >\n");
			out.append("   <tbody>\n");
			out.append("   <tr>\n");
			out.append("      <td class=\"w90 alignCenter\" colspan=\"2\">\n");
			/**Controllo la dimensione del file e mostro il messaggio*/
			out.append("<p class=\"sezione\">"+bl.getString("export.message")+"</p>\n");
			if(this.getFileLength(sPath+sTemp+".xls")>Integer.parseInt(bl.getString("export.file.max.size"))){
				out.append("<p class=\"sezione\">"+bl.getString("export.message.file.to.big")+"</p>\n");				
			}
			out.append("</td></tr>\n");
			
			out.append("   <tr>\n");
			out.append("      <td class=\"w90 alignCenter\">\n");
						
			
			/**Link Fisico al file xls*/								
			//out.append("<p><a class=\"somm\" href=\""+sURLexport+"/"+sTemp+".xls\">Preleva File</a></p>");
			out.append("<form name=\"dwl\" method=\"post\" action=\""+sURLexport+"sie_dwl.jsp\">\n");
			out.append("<input type=\"hidden\" name=\"DOC\" id=\"DOC\" value=\""+sTemp+".xls\">\n");
			out.append("<input type=\"hidden\" name=\"path\" id=\"path\" value=\""+sPath+"\">\n");
			/**Controllo la dimensione del file e mostro il messaggio*/
			if(this.getFileLength(sPath+sTemp+".xls")<Integer.parseInt(bl.getString("export.file.max.size"))){
				out.append("<input type=\"submit\" class=\"puls\" name=\"excel\" id=\"excel\" value=\"File Excel\">\n");
			}
			out.append("</form>\n");
			/*out.append("<!-- ");
			for(int o=0;o<rk.getNameCount();o++){
				out.append(rk.getName(o)+" == "+rk.getValue(rk.getName(o))+"<br>\n");
			}
			out.append(" --> ");*/
			
			out.append("</td><td>\n");
			if(rk.getValue("param1")!=null && rk.getValue("ServerNameG")!=null){
				out.append("<form name=\"rePrompt\" method=\"post\" action=\""+sURLexport+"mstrWeb?evt=3067&src=mstrWeb.3067&reportID="+rb.getObjectID()+"&accessibile=true&rePrompt=true&mstrWeb="+rk.getValue("mstrWeb")+"&param1="+URLEncoder.encode(rk.getValue("param1"), "UTF-8")+"&ServerNameG="+rk.getValue("ServerNameG")+"\">\n");				
			}else{
				out.append("<form name=\"rePrompt\" method=\"post\" action=\""+sURLexport+"mstrWeb?evt=3067&src=mstrWeb.3067&reportID="+rb.getObjectID()+"&accessibile=true&rePrompt=true&mstrWeb="+rk.getValue("mstrWeb")+"\">\n");
			}
			/*for(int o=0;o<rk.getNameCount();o++){
				out.append("<input type=\"hidden\" name=\""+rk.getName(o)+"\" id==\""+rk.getName(o)+"\" value=\""+rk.getValue(rk.getName(o))+"\"/>\n");
			}*/
			if(rk.getValue("rb")!=null){
				out.append("<input type=\"hidden\" name=\"rb\" id==\"rb\" value=\""+URLEncoder.encode(rk.getValue("rb"), "UTF-8")+"\"/>\n");				
			}			
			
			out.append("<input type=\"submit\" class=\"puls\" name=\"re_prompt\" id=\"re_prompt\" value=\"Ripeti Prompt\">\n");
			out.append("</form>\n");
			out.append("		 						</td>\n");
			out.append("       						</tr>\n");
			out.append("       					</tbody>\n");
			out.append("					</table>\n");
			
			out.append("											</td>\n");                      
			out.append("										</tr>\n");
			out.append("									</tbody>\n");
			out.append("								</table>\n");   
			out.append("			             </td>\n");
			out.append("         	       </tr>\n");
			out.append(" 					</tbody>\n");
			out.append("				</table>\n");
			out.append("			</td>\n");
			out.append("		</tr>\n");
			out.append("	</tbody>\n");																				
			out.append("</table>\n");
			/**Visualizzazione sezione centrale*/
		} catch (WebObjectsException e) {		
			out.append("<!-- WebObjectsException "+e.getMessage()+" -->");
			GianoContent gc = new GianoContent(bl.getString("title.execute.1"),bl.getString("message.execute.1"));
			gc.WriteContent(out);
		} catch (WebBeanException e) {
			out.append("<!-- WebBeanException "+e.getMessage()+" -->");
			GianoContent gc = new GianoContent(bl.getString("title.execute.1"),bl.getString("message.execute.1"));
			gc.WriteContent(out);
		} catch (FileNotFoundException e) {
			out.append("<!-- FileNotFoundException "+e.getMessage()+" -->");
			GianoContent gc = new GianoContent(bl.getString("title.execute.1"),bl.getString("message.execute.1"));
			gc.WriteContent(out);
		} catch (IOException e) {
			out.append("<!-- IOException "+e.getMessage()+" -->");
			GianoContent gc = new GianoContent(bl.getString("title.execute.1"),bl.getString("message.execute.1"));
			gc.WriteContent(out);
		}
		/**Generazione file XLS sul server WEB*/		
	}
	
	public void renderShell(MarkupOutput out){		
		RequestKeys rk = getRequestKeys();
		/**Avvio la scrittura dell'intestazione*/	
		if(rk.getValue("name")!=null){							
			super.transformForRequestSuccessful(out);
			return;							
		}
		GianoContent gc = new GianoContent();
		out.append("<!-- SIEExportReportTransform->renderShell -->");
		gc.paintHeader(out, rk);		
		super.renderShell(out);
	}	
	/**
	 * Rimuiovo i vecchi file xls presenti nella cartella di esportazione
	 * 
	 * @param String sFolder cartella dove eliminare i file
	 * */
	private void PurgeOldFiles(String sFolder){
		/** Ripulisco eventuali file in cache piu' vecchi del necessario */
        try {
                FileCachePurger fp = new FileCachePurger(sFolder, 50, 8);
                fp.addFileFilter(".xls");               
                fp.delete();                                
        } catch (Exception e) {
                //e.printStackTrace();                
        }

	}
	/**
	* Restituisce la dimensione di un file in MB
	* @param sFile
	* @return long
	*/
	public long getFileLength(String sFile){ 
		File oFile = new File(sFile);
		if(oFile.exists()){
			long byteLength = oFile.length();
			long megabyteLength = (byteLength / 1024);//1024 in MB			
			return megabyteLength;
		}
		return 0;
	}
}

