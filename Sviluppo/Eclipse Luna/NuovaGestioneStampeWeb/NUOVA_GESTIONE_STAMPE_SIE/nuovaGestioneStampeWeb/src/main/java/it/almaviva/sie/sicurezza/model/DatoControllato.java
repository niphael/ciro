/**
 * 
 */
package it.almaviva.sie.sicurezza.model;

import java.io.Serializable;

/**
 * @author Teresa
 *
 */
public class DatoControllato implements Serializable {
	// tipologiaControllo: 
	// Costanti -> CONTROLLO_FORTE_O_DEBOLE = 0;
	//				CONTROLLO_FORTE  = 1;
	//				CONTROLLO_DEBOLE = 2;
	//				CONTROLLO_FORTE_E_DEBOLE = 3;
	private int tipologiaControllo;
	
	private String valore;
	
	// esito: true=abilitato; false=non abilitato 
	private boolean esito; 
	
	/**
	 * 
	 * Costruttore a due argomenti (valore del dato e tipologia del controllo
	 *  da effettuare).
	 * 
	 * @param valore: valore del dato da controllare
	 * @param tipologiaControllo: tipologia del controllo da effettuare 
	 * 
	 * @see it.mef.sie.common.Costanti;
	 * 
	 */
	public DatoControllato(String valore, int tipologiaControllo) {
		// Costruttore a due argomenti (valore del dato e tipologia del controllo
		//  da effettuare).
		
		super();
		this.valore=valore;
		this.tipologiaControllo=tipologiaControllo;
	}
	
	/**
	 * 
	 * Costruttore ad un solo argomento ( valore del dato da controllare).
	 * In questo caso la tipologia di controllo è "debole".
	 * 
	 * @param valore : valore del dato da controllare	 
	 * @see it.mef.sie.common.Costanti;
	 * 
	 */	
	public DatoControllato(String valore) {
	// Costruttore ad un solo argomento ( valore del dato da controllare).
	//	In questo caso la tipologia di controllo è "debole".		
		this(valore, 2);
	}	

	/**
	 * metodo che verifica se è un esito
	 * @return esito: esito del controllo
	 * 
	 */
	public boolean isEsito() {
		return esito;
	}

	/**
	 * metodo che preleva la tipologia del controllo
	 * @return tipologiaControllo : tipologia del controllo
	 * @see it.mef.sie.common.Costanti;
	 * 
	 */
	public int getTipologiaControllo() {
		return tipologiaControllo;
	}

	/**
	 * metodo che preleva il valore 
	 * @return valore : valore del dato da controllare
	 * 
	 */
	public String getValore() {
		return valore;
	}

	/**
	 * metodo che imposta l'esito
	 * @param b: esito del controllo
	 * 
	 */
	public void setEsito(boolean b) {
		esito = b;
	}

	/**
	 * metodo che imposta la tipologia di controllo
	 * @param i : tipologia di controllo
	 * @see it.mef.sie.common.Costanti;
	 * 
	 */
	public void setTipologiaControllo(int i) {
		tipologiaControllo = i;
	}

	/**
	 * metodo che imposta il valore
	 * @param string : valore del dato da controllare
	 * 
	 */
	public void setValore(String string) {
		valore = string;
	}

}
