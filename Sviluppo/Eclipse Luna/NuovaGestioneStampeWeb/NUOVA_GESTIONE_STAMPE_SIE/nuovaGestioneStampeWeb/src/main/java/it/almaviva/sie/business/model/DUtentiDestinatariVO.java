/**
 * 
 */
package it.almaviva.sie.business.model;

/**
 * @author Teresa
 *
 */
public class DUtentiDestinatariVO extends BaseVO{
	private String DESTINATARIO;
	private String EMAIL;
	private String AMMINISTRAZIONE;
	private String ID_REPORT;
	private String TITOLO_REPORT;
	private String CODI_PERIODICITA;
	private String NOTE;

	private String LOGIN_MICROSTRATEGY;
	private String TIPO_SPEDIZIONE;
	private String OGGETTO;
	private String TESTO;
	private String VALIDITA;
	
	
	
	
	
	public String getAMMINISTRAZIONE() {
		return AMMINISTRAZIONE;
	}
	public void setAMMINISTRAZIONE(String aMMINISTRAZIONE) {
		AMMINISTRAZIONE = aMMINISTRAZIONE;
	}
	public String getID_REPORT() {
		return ID_REPORT;
	}
	public void setID_REPORT(String iD_REPORT) {
		ID_REPORT = iD_REPORT;
	}
	public String getTITOLO_REPORT() {
		return TITOLO_REPORT;
	}
	public void setTITOLO_REPORT(String tITOLO_REPORT) {
		TITOLO_REPORT = tITOLO_REPORT;
	}
	public String getCODI_PERIODICITA() {
		return CODI_PERIODICITA;
	}
	public void setCODI_PERIODICITA(String cODI_PERIODICITA) {
		CODI_PERIODICITA = cODI_PERIODICITA;
	}
	public String getNOTE() {
		return NOTE;
	}
	public void setNOTE(String nOTE) {
		NOTE = nOTE;
	}

	public String getLOGIN_MICROSTRATEGY() {
		return LOGIN_MICROSTRATEGY;
	}
	public void setLOGIN_MICROSTRATEGY(String lOGIN_MICROSTRATEGY) {
		LOGIN_MICROSTRATEGY = lOGIN_MICROSTRATEGY;
	}
	public String getTIPO_SPEDIZIONE() {
		return TIPO_SPEDIZIONE;
	}
	public void setTIPO_SPEDIZIONE(String tIPO_SPEDIZIONE) {
		TIPO_SPEDIZIONE = tIPO_SPEDIZIONE;
	}
	public String getOGGETTO() {
		return OGGETTO;
	}
	public void setOGGETTO(String oGGETTO) {
		OGGETTO = oGGETTO;
	}
	public String getTESTO() {
		return TESTO;
	}
	public void setTESTO(String tESTO) {
		TESTO = tESTO;
	}
	public String getVALIDITA() {
		return VALIDITA;
	}
	public void setVALIDITA(String vALIDITA) {
		VALIDITA = vALIDITA;
	}
	public String getDESTINATARIO() {
		return DESTINATARIO;
	}
	public void setDESTINATARIO(String dESTINATARIO) {
		DESTINATARIO = dESTINATARIO;
	}
	public String getEMAIL() {
		return EMAIL;
	}
	public void setEMAIL(String eMAIL) {
		EMAIL = eMAIL;
	}
	
	
}
