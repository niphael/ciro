/**
 * 
 */
package it.almaviva.sie.web.form;

/**
 * @author Teresa
 *
 */
public class RicercaDestinatariForm extends BaseForm {
	
	private String codiceReport;
	private String descReport;
	private String loginMstr;
	private String tipoSpedizione;
	public String getCodiceReport() {
		return codiceReport;
	}
	public void setCodiceReport(String codiceReport) {
		this.codiceReport = codiceReport;
	}
	public String getDescReport() {
		return descReport;
	}
	public void setDescReport(String descReport) {
		this.descReport = descReport;
	}
	public String getLoginMstr() {
		return loginMstr;
	}
	public void setLoginMstr(String loginMstr) {
		this.loginMstr = loginMstr;
	}
	public String getTipoSpedizione() {
		return tipoSpedizione;
	}
	public void setTipoSpedizione(String tipoSpedizione) {
		this.tipoSpedizione = tipoSpedizione;
	}
	
	
	

}
