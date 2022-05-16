package it.almaviva.sie.business.model;

import java.io.Serializable;

public class MstrObject implements Serializable {
	/**Identifica l'object ID dell'oggetto MicroStrategy*/
	private String sObjectID=null;
	/**Identifica l'evento da eseguire per l'oggetto MicroStrategy*/
	private String sObjectURLApi=null;
	/**Identifica l'evento da eseguire per l'oggetto MicroStrategy accessibile*/
	private String sObjectURLApiAcs=null;	
	/**Identifica la tipologia di oggetto MicroStrategy*/
	private int iObjectType=0;
	/**Identifica il nome dell'oggetto MicroStrategy*/
	private String sObjectName=null;	
	/**Identifica la descrizione dell'oggetto Microstrategy*/
	private String sObjectDesc=null;
	/**Identifica il nodo del Cluster MicroStrategy*/
	private String sClusterNode=null;
	/**definisce il path dell'oggetto MicroStrategy*/
	private String sObjectPATH=null;
	/**definisce l'owner dell'oggetto MicroStrategy*/
	private String sObjectOwner=null;
	
	
	/**
	 * 
	 * 
	 * 
	 * @return the sObjectPATH
	 * 
	 */
	public String getSObjectPATH() {
		// Ritorno il path dell'oggetto MicroStrategy
		return sObjectPATH;
	}
	/**
	 * 
	 * 
	 * 
	 * @param objectPATH the sObjectPATH to set
	 * 
	 */
	public void setSObjectPATH(String objectPATH) {
        // Valorizzo il path dell'oggetto MicroStrategy
		sObjectPATH = objectPATH;
	}
	/**
	 * 
	 * 
	 * 
	 * @return the sClusterNode
	 * 
	 */
	public String getSClusterNode() {
		// Ritorno il nodo del Cluster MicroStrategy
		return sClusterNode;
	}
	/**
	 * 
	 * 
	 * 
	 * @param clusterNode the sClusterNode to set
	 * 
	 */
	public void setSClusterNode(String clusterNode) {
        // Valorizzo il nodo del Cluster MicroStrategy
		sClusterNode = clusterNode;
	}
	/**
	 * 
	 * Ritorna l'URL per l'esecuzione non accessibile
	 * 
	 * @return the sObjectURLApi
	 * 
	 */
	public String getSObjectURLApi() {
		// Ritorno l'evento da eseguire per l'oggetto MicroStrategy
		return sObjectURLApi;
	}
	/**
	 * 
	 * Imposta l'URL per l'esecuzione non accessibile
	 * @param objectURLApi the sObjectURLApi to set
	 * 
	 */
	public void setSObjectURLApi(String objectURLApi) {
        // Valorizzo l'evento da eseguire per l'oggetto MicroStrategy
		sObjectURLApi = objectURLApi;
	}
	/**
	 * 
	 * @return the sObjectID
	 * 
	 */
	public String getSObjectID() {
		// Ritorno l'object ID dell'oggetto MicroStrategy
		return sObjectID;
	}
	/**
	 * 
	 * @param objectID the sObjectID to set
	 * 
	 */
	public void setSObjectID(String objectID) {
        // Valorizzo l'object ID dell'oggetto MicroStrategy
		sObjectID = objectID;
	}
	/**
	 * 
	 * @return the sObjectType
	 * 
	 */
	public int getIObjectType() {
		// Ritorno la tipologia di oggetto MicroStrategy
		return iObjectType;
	}
	/**
	 * 
	 * @param objectType the sObjectType to set
	 * 
	 */
	public void setIObjectType(int objectType) {
        // Valorizzo la tipologia di oggetto MicroStrategy
		iObjectType = objectType;
	}
	/**
	 * 
	 * @return the sObjectName
	 * 
	 */
	public String getSObjectName() {
		// Ritorno il nome dell'oggetto MicroStrategy
		return sObjectName;
	}
	/**
	 * 
	 * @param objectName the sObjectName to set
	 * 
	 */
	public void setSObjectName(String objectName) {
        // Valorizzo il nome dell'oggetto MicroStrategy
		sObjectName = objectName;
	}
	/**
	 * 
	 * @return the sObjectDesc
	 * 
	 */
	public String getSObjectDesc() {
        // Ritorno la descrizione dell'oggetto MicroStrategy
		return sObjectDesc;
	}
	/**
	 * 
	 * @param objectDesc the sObjectDesc to set
	 * 
	 */
	public void setSObjectDesc(String objectDesc) {
        // Valorizzo la descrizione dell'oggetto MicroStrategy
		sObjectDesc = objectDesc;
	}
	/**
	 * 
	 * Ritorna l'URL per l'esecuzione accessibile
	 * @return the sObjectURLApiAcs
	 * 
	 */
	public String getSObjectURLApiAcs() {
		// Ritorno l'evento da eseguire per l'oggetto MicroStrategy accessibile
		return sObjectURLApiAcs;
	}
	/**
	 * 
	 * Imposta l'URL per l'esecuzione accessibile
	* @param objectURLApiAcs the sObjectURLApiAcs to set
	 * 
	 */
	public void setSObjectURLApiAcs(String objectURLApiAcs) {
        // Valorizzo l'evento da eseguire per l'oggetto MicroStrategy accessibile
		sObjectURLApiAcs = objectURLApiAcs;
	}	
	/**
	 * 
	 * Imposta l'URL per l'esecuzione accessibile 
	 * @param objectOwner the sObjectOwner to set
	 * 
	 */
	
	public void setSObjectOwner(String objectOwner)
	{
		sObjectOwner = objectOwner;
	}
	
	/**
	 * 
	 * Ritorna l'URL per l'esecuzione accessibile
	 * @return the sObjectOwner
	 * 
	 */
	public String getSObjectOwner()
	{
		return sObjectOwner ; 
	}
	
}
