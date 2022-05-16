/**
 * 
 */
package it.almaviva.sie.business.model;

import it.almaviva.sie.business.util.Util;

import java.io.Serializable;

/**
 * @author Teresa
 *
 */
public class MstrConnectionParam implements Serializable, Cloneable {

	/**String sServerName Identifica il nome dell' Intelligence Server Microstrategy*/
	private String sServerName=null;
	/**int iServerPort Identifica la porta dell' Intelligence Server Microstrategy*/
	private Integer iServerPort= null;
	/**String sProjectName Identifica il Progetto nell' Intelligence Server Microstrategy a cui eseguire la connessione*/
	private String sProjectName=null;
	/**String sLoginName Identifica la login nell' Intelligence Server Microstrategy con cui eseguire la connessione*/
	private String sLoginName=null;
	/**String sPassword Identifica la password nell' Intelligence Server Microstrategy con cui eseguire la connessione*/
	private String sPassword=null;	
	/**Identifica il server WEB dell'interfaccia WEB MicroStrategy*/
	private String sServerWeb=null;
	/**Identifica la content root WEB dell'interfaccia WEB MicroStrategy*/
	private Integer iServerPortWeb=null;
	/**Identifica la content root WEB dell'interfaccia WEB MicroStrategy*/
	private String sContextWeb= null; //"sietomstr/asp";
	/**Identifica la content root WEB dell'interfaccia WEB MicroStrategy Accessibile*/
	private String sContextAccWeb= null; //"sietomstr/sietoacsmstr/asp";
	/**Identifica la pagina src dell'interfaccia WEB MicroStrategy*/
	private String sPageWeb=null;
	/**Identifica la content root WEB dell'interfaccia WEB MicroStrategy*/
	private String sIdRoot = null; 
	/**Identifica il protocollo per l'url */
	private String sProtocolloWeb= null; 
	/**Gruppo di appartenenza per lo user Save*/
	private String grp_Save_Name = null;
	/**Gruppo di appartenenza per lo user No Save*/
	private String grp_No_Save_Name = null;
	/**Gruppo di appartenenza per lo user destinatari report*/
	private String grp_dest_rep = null;
	
	/**indirizzo ip di microstrategy web*/
	private String mstr_server_ip = null;
	/**porta di microstrategy web*/
	private String mstr_server_port = null;
	
	private String ip_server_sie = null;
	private String porta_server_sie = null;
	private String provenienza=null;
	
	private String simulazione=null;
	
	private String url_stampe_sie = null;
	


	public String getUrl_stampe_sie() {
		return url_stampe_sie;
	}

	public void setUrl_stampe_sie(String url_stampe_sie) {
		this.url_stampe_sie = url_stampe_sie;
	}

	public String getSimulazione() {
		return simulazione;
	}

	public void setSimulazione(String simulazione) {
		this.simulazione = simulazione;
	}

	public String getProvenienza() {
		return provenienza;
	}

	public void setProvenienza(String provenienza) {
		this.provenienza = provenienza;
	}

	public String getIp_server_sie() {
		return ip_server_sie;
	}

	public void setIp_server_sie(String ip_server_sie) {
		this.ip_server_sie = ip_server_sie;
	}

	public String getPorta_server_sie() {
		return porta_server_sie;
	}

	public void setPorta_server_sie(String porta_server_sie) {
		this.porta_server_sie = porta_server_sie;
	}

	public String getMstr_server_ip() {
		return mstr_server_ip;
	}

	public void setMstr_server_ip(String mstr_server_ip) {
		this.mstr_server_ip = mstr_server_ip;
	}

	public String getMstr_server_port() {
		return mstr_server_port;
	}

	public void setMstr_server_port(String mstr_server_port) {
		this.mstr_server_port = mstr_server_port;
	}

	/**
	 * 
	 * Metodo che ritorna la login nell'Intelligence Server Microstrategy con cui eseguire la connessione
	 * 
	 * @return
	 * 
	 */
	public String getSLoginName() {
		// Ritorno la login nell' Intelligence Server Microstrategy
		return sLoginName;
	}

	/**
	 * 
	 * Metodo che riotrna la password nell'Intelligence Server Microstrategy con cui eseguire la connessione
	 * 
	 * @return
	 * 
	 */
	public String getSPassword() {
		// Ritorno la password nell' Intelligence Server Microstrategy
		return sPassword;
	}

	/**
	 * 
	 * Metodo che riotrna il Progetto nell'Intelligence Server Microstrategy a cui eseguire la connessione
	 * 
	 * @return
	 * 
	 */
	public String getSProjectName() {
		// Ritorno il progetto nell' Intelligence Server Microstrategy
		return sProjectName;
	}

	/**
	 * 
	 * Metodo che riotrna il nome dell'Intelligence Server Microstrategy
	 * 
	 * @return
	 * 
	 */
	public String getSServerName() {
		// Ritorno il nome dell' Intelligence Server Microstrategy
		return sServerName;
	}

	/**
	 * 
	 * Metodo che riotrna il server WEB dell'interfaccia WEB MicroStrategy
	 * 
	 * @return
	 * 
	 */
	public String getSServerWeb() {
		// Ritorno il server WEB dell'interfaccia WEB MicroStrategy
		return sServerWeb;
	}

	/**
	 * 
	 * Metodo che imposta la login nell'Intelligence Server Microstrategy con cui eseguire la connessione
	 * 
	 * @param string
	 * 
	 */
	public void setSLoginName(String string) {
		// Valorizzo la login nell' Intelligence Server Microstrategy
		sLoginName = string;
	}

	/**
	 * 
	 * Metodo che imposta la password nell'Intelligence Server Microstrategy con cui eseguire la connessione
	 * 
	 * @param string
	 * 
	 */
	public void setSPassword(String string) {
        // Valorizzo la password nell' Intelligence Server Microstrategy
		sPassword = string;
	}

	/**
	 * 
	 * Metodo che imposta il Progetto nell'Intelligence Server Microstrategy a cui eseguire la connessione
	 * 
	 * @param string
	 * 
	 */
	public void setSProjectName(String string) {
        // Valorizzo il progetto nell' Intelligence Server Microstrategy
		sProjectName = string;
	}

	/**
	 * 
	 * Metodo che imposta il nome dell'Intelligence Server Microstrategy
	 * 
	 * @param string
	 * 
	 */
	public void setSServerName(String string) {
		// Valorizzo il nome dell' Intelligence Server Microstrategy
		sServerName = string;
	}

	/**
	 * 
	 * Metodo che imposta il server WEB dell'interfaccia WEB MicroStrategy
	 * 
	 * @param string
	 * 
	 */
	public void setSServerWeb(String string) {
		// Valorizzo il server WEB dell'interfaccia WEB MicroStrategy
		sServerWeb = string;
	}

	/**
	 * 
	 * Metodo che ritorna la content root WEB dell'interfaccia WEB MicroStrategy
	 * 
	 * @return
	 * 
	 */
	public String getSContextWeb() {
		// Ritorno la content root WEB dell'interfaccia WEB MicroStrategy
		return sContextWeb;
	}

	/**
	 * 
	 * Metodo che ritorna la pagina src dell'interfaccia WEB MicroStrategy
	 * 
	 * @return
	 * 
	 */
	public String getSPageWeb() {
		// Ritorno la pagina src dell'interfaccia WEB MicroStrategy
		return sPageWeb;
	}

	/**
	 * 
	 * Metodo che imposta la content root WEB dell'interfaccia WEB MicroStrategy
	 * 
	 * @param string
	 * 
	 */
	public void setSContextWeb(String string) {
        // Valorizzo la content root WEB dell'interfaccia WEB MicroStrategy
		sContextWeb= string;
	}

	/**
	 * 
	 * Metodo che imposta la pagina src dell'interfaccia WEB MicroStrategy
	 * 
	 * @param string
	 * 
	 */
	public void setSPageWeb(String string) {
        // Valorizzo la pagina src dell'interfaccia WEB MicroStrategy
		sPageWeb = string;
	}

	/**
	 * 
	 * Metodo che ritorna la porta dell'Intelligence Server Microstrategy
	 * 
	 * @return
	 
	 **/
	public Integer getIServerPort() {
		// Ritorno la porta dell' Intelligence Server Microstrategy
		return iServerPort;
	}

	/**
	 * 
	 * Metodo che ritorna la content root WEB dell'interfaccia WEB MicroStrategy
	 * 
	 * @return
	 * 
	 */
	public Integer getIServerPortWeb() {
        // Ritorno la porta WEB dell' Intelligence Server Microstrategy
		return iServerPortWeb;
	}

	/**
	 * 
	 * Metodo che ritorna la content root WEB dell'interfaccia WEB MicroStrategy
	 * 
	 * @return
	 * 
	 */
	public String getSIdRoot() {
		return sIdRoot;
	}

	/**
	 * 
	 * Metodo che ritorna il protocollo per l'url
	 * 
	 * @return
	 * 
	 */
	public String getSProtocolloWeb() {
        // Ritorno il protocollo per l'url
		return sProtocolloWeb;
	}

	/**
	 * 
	 * Metodo che imposta la porta dell'Intelligence Server Microstrategy
	 * 
	 * @param integer
	 * 
	 */
	public void setIServerPort(Integer integer) {
        // Valorizzo la porta dell' Intelligence Server Microstrategy
		iServerPort = integer;
	}

	/**
	 * 
	 * Metodo che imposta la content root WEB dell'interfaccia WEB MicroStrategy
	 * 
	 * @param integer
	 * 
	 */
	public void setIServerPortWeb(Integer integer) {
        // Valorizzo la porta WEB dell' Intelligence Server Microstrategy
		iServerPortWeb = integer;
	}

	/**
	 * 
	 * Metodo che imposta la content root WEB dell'interfaccia WEB MicroStrategy
	 * 
	 * @param string
	 * 
	 */
	public void setSIdRoot(String string) {
		sIdRoot = string;
	}

	/**
	 * 
	 * Metodo che imposta il protocollo per l'url
	 * 
	 * @param string
	 * 
	 */
	public void setSProtocolloWeb(String string) {
		// Valorizzo il protocollo per l'url
		sProtocolloWeb = string;
	}
	
	/**
	 * 
	 * Metodo che controlla se uno dei parametri � nullo
	 * 
	 * @param string
	 * 
	 */
	public boolean isAtLeastOneEmpty() {
    // Controllo che nessun parametro sia nullo 
	if (Util.isEmpty(sServerName) ||
		(iServerPort== null) 		  ||
		Util.isEmpty(sProjectName) ||
		Util.isEmpty(sLoginName) ||
		//Util.isEmpty(sPassword) ||
		Util.isEmpty(sPageWeb) ||
		Util.isEmpty(sServerWeb) ||
		(iServerPortWeb== null)   ||
		Util.isEmpty(sContextWeb) ||
		Util.isEmpty(sContextAccWeb) ||
		Util.isEmpty(sProtocolloWeb) ||
		Util.isEmpty(sIdRoot) )
		return true;
	 else
		return false;	
	}

	/**
	 * 
	 * Metodo che ritorna la stampa dei parametri
	 * 
	 * @return String: stringa dei parametri
	 * 
	 */
    public String toString() {

	StringBuffer buffer = new StringBuffer();
	buffer.append("sProjectName="+sProjectName+"|");
	buffer.append("sServerName="+sServerName+"|");
	buffer.append("iServerPort="+iServerPort+"|");
	buffer.append("sLoginName="+sLoginName+"|");
	buffer.append("sPassword="+sPassword+"|");
	buffer.append("sServerWeb="+sServerWeb+"|");
	buffer.append("sServerWeb="+sServerWeb+"|");
	buffer.append("iServerPortWeb="+iServerPortWeb+"|");
	buffer.append("sContextWeb="+sContextWeb+"|");
	buffer.append("sContextAccWeb="+sContextAccWeb+"|");
	buffer.append("sPageWeb="+sPageWeb+"|");
	buffer.append("sIdRoot="+sIdRoot+"|");
	buffer.append("sProtocolloWeb="+sProtocolloWeb+"|");
	return buffer.toString();
    }
	/* (non Javadoc)
	 * @see java.lang.Object#clone()
	 */
	public Object clone() throws CloneNotSupportedException {
		MstrConnectionParam other = new MstrConnectionParam();
		other.sServerName = this.sServerName;
		other.iServerPort = this.iServerPort;
		other.sProjectName = this.sProjectName;
		other.sLoginName = this.sLoginName;
		other.sPassword = this.sPassword;
		other.sServerWeb = this.sServerWeb;
		other.iServerPortWeb = this.iServerPortWeb;
		other.sContextWeb = this.sContextWeb;
		other.sPageWeb = this.sPageWeb;	
		other.sIdRoot = this.sIdRoot;
		other.sProtocolloWeb = this.sProtocolloWeb;		
		other.sContextAccWeb = this.sContextAccWeb;
		other.url_stampe_sie=this.url_stampe_sie;
		other.mstr_server_port=this.mstr_server_port;
		return other; 
	}


	/**
	 * @return
	 */
	public String getSContextAccWeb() {
		return sContextAccWeb;
	}

	/**
	 * @param string
	 */
	public void setSContextAccWeb(String string) {
		sContextAccWeb = string;
	}

	/**
	 * @return
	 */
	public String getGrp_No_Save_Name() {
		return grp_No_Save_Name;
	}

	/**
	 * @return
	 */
	public String getGrp_Save_Name() {
		return grp_Save_Name;
	}

	/**
	 * @param string
	 */
	public void setGrp_No_Save_Name(String string) {
		grp_No_Save_Name = string;
	}

	/**
	 * @param string
	 */
	public void setGrp_Save_Name(String string) {
		grp_Save_Name = string;
	}

	/**
	 * @return grp_dest_rep
	 */
	public String getGrp_dest_rep() {
		return grp_dest_rep;
	}

	/**
	 * @param grp_dest_rep grp_dest_rep da impostare
	 */
	public void setGrp_dest_rep(String grp_dest_rep) {
		this.grp_dest_rep = grp_dest_rep;
	}
}
