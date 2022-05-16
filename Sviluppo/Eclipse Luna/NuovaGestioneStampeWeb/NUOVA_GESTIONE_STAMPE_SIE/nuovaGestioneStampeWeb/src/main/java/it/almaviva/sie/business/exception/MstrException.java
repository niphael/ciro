package it.almaviva.sie.business.exception;

import it.almaviva.sie.business.util.ApplicationException;

/**
 * Descrive un eccezione generica lanciata da Microstrategy 
 * 
 * @author Massa (Insirio)
 * @version 1.0
 * @see
 */
public class MstrException extends ApplicationException {
	/**
	 * Costruttore.
	 * 
	 * @param codice
	 * @param messaggio
	 */
	public MstrException(String messaggio) {
		super(messaggio);
	}

	/**
	 * Costruttore.
	 */
	public MstrException() {
		super();
	}

	/**
	 * Costruttore.
	 * 
	 * @param a
	 */
	public MstrException(Exception a) {
		this(a.getMessage());
		
	}
}
