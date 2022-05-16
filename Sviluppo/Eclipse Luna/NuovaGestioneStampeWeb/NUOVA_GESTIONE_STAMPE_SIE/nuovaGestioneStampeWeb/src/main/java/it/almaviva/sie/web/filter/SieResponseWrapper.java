package it.almaviva.sie.web.filter;

import it.almaviva.sie.business.util.Util;

import java.io.ByteArrayOutputStream;
import java.io.CharArrayWriter;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

public class SieResponseWrapper extends HttpServletResponseWrapper {

	private int contentLength;
	private String contentType;
	
	
	private CharArrayWriter wr;

	public SieResponseWrapper(HttpServletResponse response) {
		super(response);
		wr = new CharArrayWriter();
	}
	
	public byte[] getData() {
		return new String(wr.toCharArray()).getBytes();
	}
	

	public PrintWriter getWriter() {
		// se la response è già stata committata fornisce
		// un writer fittizio, ignorato successivamente.
		// Il comportamento di default lancerebbe un'IllegalStateException
		if (this.isCommitted())
			return new PrintWriter(new ByteArrayOutputStream());
		return new PrintWriter(wr);
	}

	public void setContentType(String type) {
		this.contentType = type;
		super.setContentType(type);
	}

	public String getContentType() {
		return this.contentType;
	}

	public int getContentLength() {
		return contentLength;
	}

	public void setContentLength(int length) {
		this.contentLength = length;
		super.setContentLength(length);
	}

	
	/**
	 * 
	 * @param map
	 */
	public void setHeader(String arg1,String arg2) {
		// Questo metodo è stato aggiunto per il pdf 
		// xls
		if(arg1 == null)
		   arg1 = "";
		super.setHeader(arg1,arg2);
		((HttpServletResponse)super.getResponse()).setHeader(arg1,arg2);
		if(!Util.isEmpty(arg1) && arg1.equals("Content-type")){
			this.setContentType(arg2);
		}
	}

}

