/**
 * 
 */
package it.almaviva.sie.web.filter;

import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.web.util.SessionContainer;
import it.almaviva.sie.web.util.WebApplicationConstants;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.Deflater;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Teresa
 *
 */
public class CronologicoFilter implements Filter{

	
	private FilterConfig _filterConfig;
	
	public CronologicoFilter() {
	}

	
	
	/**
	* Method init.
	* @param config
	* @throws javax.servlet.ServletException
	*/
	public void init(FilterConfig config) throws ServletException {
		_filterConfig = config;
	}	

	
	/* (non Javadoc)
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	public void doFilter(
			ServletRequest request ,
		ServletResponse response,
		FilterChain chain)
		throws IOException, ServletException {


			
		SessionContainer sc = new SessionContainer();
				
	
		SieResponseWrapper wrapper =
			new SieResponseWrapper((HttpServletResponse) response);

		chain.doFilter(request, wrapper);
	
		OutputStream out = response.getOutputStream();
		byte[] buffer = wrapper.getData();
		String generatedHTML = new String(buffer);

	

		boolean startCronologico = false;
		
			String cronologicoON =null;
			if(((HttpServletRequest) request).getSession(false)!=null)
				cronologicoON =(String) sc.getObjectInSession(((HttpServletRequest) request).getSession(false), WebApplicationConstants.SAVE_CRONOLOGICO);
			
		
		
			// è stato richiesto il salvataggio
			// dello HTML per il cronologico ??
			if (cronologicoON != null
				&& cronologicoON.equals(WebApplicationConstants.CRONOLOGICO_ON)) {
				String htmlToSave = getHTMLtoSave(generatedHTML);
				startCronologico = true;
				// se è stato generato del codice html
				if (htmlToSave != null && !htmlToSave.trim().equals("")) {
					// metto nella sieDataTable il codice
					// HTML salvato per riprenderlo al momento  
					// della conferma

					Deflater compressor = new Deflater();
					compressor.setLevel(Deflater.BEST_COMPRESSION);
					compressor.setInput(htmlToSave.getBytes());
					compressor.finish();

					ByteArrayOutputStream bos =
						new ByteArrayOutputStream(htmlToSave.getBytes().length);

					byte[] buf = new byte[1024];
					while (!compressor.finished()) {
						int count = compressor.deflate(buf);
						bos.write(buf, 0, count);
					}

					try {
						bos.close();

						byte[] compressedHTML = bos.toByteArray();
						sc.putObjectInSession(((HttpServletRequest) request).getSession(false), WebApplicationConstants.HTML_CRONOLOGICO, compressedHTML);
						
						// tolgo dal sieDataTable il SAVE_CRONOLOGICO
						// per impedire che venga rifatto tutto 
						// al giro successivo 
						sc.removeObjectFromSession(((HttpServletRequest) request).getSession(false), WebApplicationConstants.SAVE_CRONOLOGICO);
					
						// pulisco il codice HTML
						// dai caratteri necessari al cronologico
						generatedHTML =
							Util.replace(
								generatedHTML,
								WebApplicationConstants.START_CRONOLOGICO,
								"");
						generatedHTML =
							Util.replace(
								generatedHTML,
								WebApplicationConstants.STOP_CRONOLOGICO,
								"");

						// rimetto in sessione la sieDataTbale
						// aggiornata 
					/*	((HttpServletRequest) request).getSession(
							false).setAttribute(
							SessionAttributes.SIE_DATA_TABLE,
							sieDataTable);*/
					} catch (IOException e) {
					}
				}
				else
				{
					//throw new ServletException("Cronologico : Non è stato possibile catturare il codice HTML. verificare la presenza nella pagina jsp delle stringhe di START e STOP cronologico.");
					
				}
			}

//		// invio sulla response il codice HTML ottenuto
//		out.write(generatedHTML.getBytes());
//		out.close();


		// invio sulla response il codice HTML ottenuto
		// per il cronologico
		if(startCronologico){
		 out.write(generatedHTML.getBytes());
		}
		//	invio sulla response il codice HTML oppure  
		//  il file pdf/xls
		else {
			 out.write(buffer);
		}
		out.close();

	}
	
	
	private void generaNuovaOperationId(ServletRequest request){
		try {
			// genero la newOperationId
			String newOperationId=createNewOperationId();
			// inserisco la newOperationId nella request
			request.setAttribute(WebApplicationConstants.OPERATION_ID,newOperationId);
		}catch(Exception ex){
			//System.out.println("Exception CronologicoFilter.generaNuovaOperationId: "+ex.toString());
		}
	}

	/* (non Javadoc)
	 * @see javax.servlet.Filter#destroy()
	 */
	public void destroy() {
	}

	private String getHTMLtoSave(String completeHTML) {
		String result = "";

		Pattern startPattern = Pattern.compile(WebApplicationConstants.START_CRONOLOGICO);
		Matcher startMatcher = startPattern.matcher(completeHTML);

		if (startMatcher.find()) {
			Pattern stopPattern = Pattern.compile(WebApplicationConstants.STOP_CRONOLOGICO);
			Matcher stopMatcher = stopPattern.matcher(completeHTML);

			if (stopMatcher.find()) {
				int start = startMatcher.start();
				int stop = stopMatcher.start();

				//result = completeHTML.substring(start, stop);
				result = completeHTML.substring(start + WebApplicationConstants.START_CRONOLOGICO.length(), stop);
			}
		}

		return result;
	}

	private static String createNewOperationId(){
		return ""+Calendar.getInstance().getTimeInMillis();
	}

}
