/**
 * 
 */
package com.giano.transforms;

import java.util.MissingResourceException;
import java.util.ResourceBundle;
import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintStream;

/**
 * @author gianluca
 *
 */
public class GianoError {
	/**
	 * Scrive il file di errore html per gli errori generici del web server
	 * 
	 * */
	public void writeErrorFile(String sURLtoSIE){
		ResourceBundle bl=null;
		try{
			bl = ResourceBundle.getBundle("sie");	
			/**Definizione della cartella dove vengono esportati i doc xls*/
			String sPath=bl.getString("export.dir");
			
			FileOutputStream out; // declare a file output object
			PrintStream p; // declare a print stream object
			try
			{				
				File oFileError = new File(sPath+"error.html");
				if(!oFileError.exists()){
					out = new FileOutputStream(sPath+"error.html",true);		               				
					p = new PrintStream( out );				
					p.println ("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">");
					p.println ("<html>");
					p.println ("<head>");
					p.println ("<title>BENVENUTI. SIE</title>");
					p.println ("</head>");
					p.println ("<body>");

					p.println ("<!-- Inizio Intestazione-->");
					p.println ("<!-- Start Bean Transform -->");
					p.println ("<div>");
					p.println ("<link rel=\"stylesheet\" type=\"text/css\" href=\"../style/sie_style.css\"/>");
					p.println ("<table class=\"w100 bgcolor\" cellpadding=\"0\" cellspacing=\"0\">	");
					p.println ("<tbody>");
					p.println ("<tr>		");
					p.println ("<td class=\"width:196;\">			");
					p.println ("<img src=\"../images/sie/logo_sie.jpg\" alt=\"SIE - Sistema Informativo Entrate\">		");
					p.println ("</td>		");
					p.println ("<td class=\"w100\">			");
					p.println ("<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">	");
					p.println ("<tbody>");
					p.println ("<tr>			");
					p.println ("<td>					");
					p.println ("<table width=\"100%\">				");
					p.println ("<tbody>");
					p.println ("<tr>											");
					p.println ("<td class=\"w80 alignTop\" align=\"center\">&nbsp;</td>");
					p.println ("<td class=\"w20 mnulat\" align=\"center\">						");
					p.println ("<a href=\""+sURLtoSIE+"\" class=\"somm\"><img src=\"../images/sie/torna_sie.png\" title=\"Torna al SIE\" alt=\"Torna al SIE\"/></a>");
					p.println ("</td>");
					p.println ("</tr>");
					p.println ("</tbody>");
					p.println ("</table>		");
					p.println ("</td>	");
					p.println ("</tr>	");
					p.println ("<tr>");
					p.println ("<td class=\"intestazione\">			");
					p.println ("<img src=\"../images/sie/stampa.png\" title=\"Stampa\" alt=\"Stampa\"/>");
					p.println ("<img src=\"../images/sie/spazio.gif\" alt=\"\" height=\"2\" width=\"1\">");
					p.println ("</td>	");
					p.println ("</tr>	");
					p.println ("<tr>");
					p.println ("<td>");
					p.println ("<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">");
					p.println ("<tbody>");
					p.println ("<tr>");
					p.println ("<td class=\"titolo\" align=\"center\">&nbsp;</td>");
					p.println ("</tr>");
					p.println ("</tbody>");
					p.println ("</table>");
					p.println ("</td>");
					p.println ("</tr>		");
					p.println ("</tbody>");
					p.println ("</table>				");
					p.println ("</td>");
					p.println ("</tr>");
					p.println ("<tr>");
					p.println ("<td class=\"alignTop\">		");
					p.println ("</td>		");
					p.println ("<td class=\"alignTop\">			");
					p.println ("<table class=\"w100\" cellpadding=\"1\" cellspacing=\"2\"> ");
					p.println ("<tbody>");
					p.println ("<tr> ");
					p.println ("<td class=\"intestazione2\"></td> ");
					p.println ("</tr> ");
					p.println ("</tbody>");
					p.println ("</table>		");
					p.println ("</td>	");
					p.println ("</tr>	");
					p.println ("<tr>		");
					p.println ("<td class=\"alignTop\">	</td>		");
					p.println ("</tr>");
					p.println ("</tbody>");
					p.println ("</table>");
					p.println ("</div>");
					p.println ("<!-- End Bean Transform -->");
					p.println ("<!-- Fine Intestazione-->");
					p.println ("<div class=\"mstrTransform\" style=\"\" ><table class=\"w100 cornice\" cellpadding=\"0\" cellspacing=\"0\">	<tbody>		<tr>			<td class=\"alignTop\" style=\"width: 100%;\">		 		<table class=\"w100\" cellpadding=\"0\">               <tbody>						<tr style=\"display: none;\">	                  <td class=\"w100\"></td>	               </tr> 				</tbody>				</table>				<table class=\"w100\" cellpadding=\"0\">	            <tbody>						<tr>                      <td class=\"w100\"></td>                  </tr>                  <tr>                  <td>   	               <table class=\"w100\">   	                  <tbody>					     <tr style=\"display: none;\">		                        <td class=\"w100\"></td>   	                     </tr>   	                     <tr style=\"\">   	                       <td class=\"w100 alignLeft\"><h2>Attenzione non &egrave; stato possibile eseguire la richiesta.</h2><p>La stampa selezionata non &egrave; disponibile in questo momento riprovare pi&ugrave; tardi, se il problema persiste contattare l'amministratore di sistema.</p><br>											</td>										</tr>									</tbody>								</table>			             </td>         	       </tr> 					</tbody>				</table>			</td>		</tr>	</tbody></table></div>");
					p.println ("</body>");
					p.println ("</html>");
					p.close();
				}				
			}
			catch (Exception e)
			{
				System.err.println ("Error writing to file "+e.getMessage());
				return;
			}
		}catch(MissingResourceException noBL){
			
			return;
		}
		return;
	}
}
