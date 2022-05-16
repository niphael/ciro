package it.almaviva.sie.business.model;

import it.almaviva.sie.business.exception.MstrException;
import it.almaviva.sie.business.util.MstrCodedErrors;



import java.io.IOException;
import java.io.Serializable;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Vector;

import org.apache.log4j.Logger;

import com.microstrategy.web.beans.UserBean;
import com.microstrategy.web.beans.UserEntitiesBean;
import com.microstrategy.web.beans.UserEntityBean;
import com.microstrategy.web.beans.UserGroupBean;
import com.microstrategy.web.beans.WebBeanException;
import com.microstrategy.web.beans.WebBeanFactory;
import com.microstrategy.web.objects.SimpleList;
import com.microstrategy.web.objects.WebClusterAdmin;
import com.microstrategy.web.objects.WebClusterNode;
import com.microstrategy.web.objects.WebClusters;
import com.microstrategy.web.objects.WebFolder;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectSource;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebObjectsFactory;
import com.microstrategy.web.objects.WebSearch;
import com.microstrategy.web.objects.WebShortcut;
import com.microstrategy.web.objects.admin.users.WebStandardLoginInfo;
import com.microstrategy.web.objects.admin.users.WebUser;
import com.microstrategy.web.objects.admin.users.WebUserEntity;
import com.microstrategy.web.objects.admin.users.WebUserGroup;
import com.microstrategy.webapi.EnumDSSXMLObjectFlags;
import com.microstrategy.webapi.EnumDSSXMLObjectSubTypes;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;
import com.microstrategy.webapi.EnumDSSXMLSearchDomain;
import com.microstrategy.webapi.EnumDSSXMLSearchFlags;


/**
 * 
 * Classe per la gestione della connessione a MSTR IS che sar� utilizzata come ponte tra
 * Sie e MicroStrategy
 * 
 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
 * @version 1.0
 * @see  
 * 
 */
public class MstrUtils  implements Serializable{
	
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
	/**Identifica la pagina src dell'interfaccia WEB MicroStrategy*/
	private String sPageWeb=null;
	/**Identifica il server WEB dell'interfaccia WEB MicroStrategy*/
	private String sServerWeb=null;
	/**Identifica la porta del server dell'interfaccia WEB MicroStrategy*/
	private Integer iServerPortWeb=null;
	/**Identifica il context WEB dell'interfaccia WEB MicroStrategy*/
	private String sContextWeb= null; //"sietomstr/asp";
	/**Identifica la content root WEB dell'interfaccia WEB MicroStrategy Accessibile*/
	private String sContextAccWeb= null; //"sietomstr/sietoacsmstr/asp";
	/**Identifica la directory contente i report*/
	private String sIdRoot = null; 
	/**Identifica il protocollo per accedere all'interfaccia WEB MicroStrategy*/
	private String sProtocolloWeb=null;
	private String  mstr_server_port=null;

	

	
	/**vector vMstrObject Lista di oggetti MSTR per le stampe*/
	private Vector vMstrObject = new Vector();			
	
	private WebObjectsFactory factory=null;	
	private WebIServerSession serverSession=null;	
	
	private Logger logger = Logger.getLogger(this.getClass());
	
	
	
	/**
	 * 
	 *Costruttore.
	 * 
	 */
	public MstrUtils(MstrConnectionParam param) throws MstrException{
		
			super();
			logger.info(" inizio del costruttore MstrUtils");
			if (param.isAtLeastOneEmpty()){
				throw new MstrException(MstrCodedErrors.MESSAGE_STAMPE_PARAM_NOT_VALID);
			}
			sServerName=param.getSServerName();
			iServerPort=param.getIServerPort();
			sProjectName=param.getSProjectName();
			sLoginName=param.getSLoginName();
			sPassword=param.getSPassword();	
			sPageWeb=param.getSPageWeb();
			sServerWeb=param.getSServerWeb();
			sContextWeb= param.getSContextWeb();
			sContextAccWeb = param.getSContextAccWeb();
			sProtocolloWeb=param.getSProtocolloWeb();
			iServerPortWeb=param.getIServerPortWeb();
			sIdRoot = param.getSIdRoot();
			mstr_server_port=param.getMstr_server_port();
			logger.debug(param);
			logger.info(" stampo parametri di connessione sServerName="+sServerName+" iServerPort="+iServerPort+" sProjectName="+sProjectName+" "
					+ "sLoginName="+sLoginName+" sPassword="+sPassword+" sPageWeb="+sPageWeb+" sServerWeb="+sServerWeb+" sContextWeb="+sContextWeb+" "
							+ "sProtocolloWeb="+sProtocolloWeb+" iServerPortWeb="+iServerPortWeb+" sIdRoot="+sIdRoot+" mstr_server_port="+mstr_server_port);
	}

	

	/**
	 * Ritorna la porta dell'Intelligence Server MicroStrategy
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @return the iServerPort
	 */
	public Integer getIServerPort() {
		return iServerPort;
	}
	/**
	 * Imposta la porta dell'Intelligence Server MicroStrategy
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param serverPort the iServerPort to set
	 */
	public void setIServerPort(Integer serverPort) {
		iServerPort = serverPort;
	}
	/**
	 * Ritorna il nome dell'utente con cui collegarsi a Intelligence Server MicroStrategy
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @return the sLoginName
	 */
	public String getSLoginName() {
		return sLoginName;
	}
	/**
	 * Imposta il nome dell'utente con cui collegarsi a Intelligence Server MicroStrategy
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param loginName the sLoginName to set
	 */
	public void setSLoginName(String loginName) {
		sLoginName = loginName;
	}
	/**
	 * Ritorna la password dell'utente con cui collegarsi a Intelligence Server MicroStrategy
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @return the sPassword
	 */
	public String getSPassword() {
		return sPassword;
	}
	/**
	 * Imposta la password per l'utente con cui collegarsi a Intelligence Server MicroStrategy
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param password the sPassword to set
	 */
	public void setSPassword(String password) {
		sPassword = password;
	}
	/**
	 * Ritorna il nome del progetto registrato su Intelligence Server MicroStrategy
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @return the sProjectName
	 */
	public String getSProjectName() {
		return sProjectName;
	}
	/**
	 * Imposta il nome del progetto registrato su Intelligence Server MicroStrategy
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param projectName the sProjectName to set
	 */
	public void setSProjectName(String projectName) {
		sProjectName = projectName;
	}
	/**
	 * Ritorna il nome dell'Intelligence Server MicroStrategy
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @return the sServerName
	 */
	public String getSServerName() {
		return sServerName;
	}
	/**
	 * Imposta il nome dell'Intelligence Server MicroStrategy
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param serverName the sServerName to set
	 */
	public void setSServerName(String serverName) {
		sServerName = serverName;
	}
	
	/**
	 * Metodo che esegue la connessione ad un Intelligence	Server Microstrategy e
	 * ritorna un vettore di oggetti che contiene le informazioni basi per l'esecuzione
	 * dell'oggetto personali.
	 * 
	 * FOR TESTING ONLY!!!!
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @return Vector vettore di oggetti MstrObject che contiene le informazioni basilari sulla tipologia di oggetti personali
	 */
	public Vector getPersonalReport() {
//			WebObjectsFactory factory = WebObjectsFactory.getInstance();
//			WebIServerSession serverSession=factory.getIServerSession();             
			WebObjectSource oObjectSource =	factory.getObjectSource();             
			try {  
				/**resetto il vettore di Oggetti MicroStrategy*/
				if(!vMstrObject.isEmpty()){
						vMstrObject.clear();                           
				}                      
				/**Imposto i parametri per la connessione*/
//				serverSession.setServerName(sServerName);
//				serverSession.setServerPort(iServerPort.intValue());
//				serverSession.setProjectName(sProjectName);
//				serverSession.setLogin(sLoginName);
//				serverSession.setPassword(sPassword);          
           
				oObjectSource.setFlags(oObjectSource.getFlags() | EnumDSSXMLObjectFlags.DssXmlObjectTotalObject);
				/**ricerco tutti gli oggetti Stampe (Report, Report	Services e Documenti HTML)*/
				WebSearch oSearch =	oObjectSource.getNewSearchObject();            
				oSearch.setAsync(false);                               
				SimpleList types=oSearch.types();
				Integer typeR = new Integer(EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition);
				Integer typeD = new Integer(EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition);
				types.add(typeR);
				types.add(typeD);
				/**Se occorre potrei limitare la ricerca all'interno di una particolare folder*/
				oSearch.setSearchRoot("84DAAC900B864173907F44B75C68FD96");
				oSearch.setSearchFlags(EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive);
           
				oSearch.submit();                      
				/**Lancio la getResults ricerca */
                                           
				/**Finch� la getStatus � DssXmlObjectSearchStatusRunning*/
           
				WebFolder oFolder = oSearch.getResults();
	
           		
				for(int i=0;i<oFolder.size();i++){
					WebObjectInfo oObject = oFolder.get(i);                
                                               
					MstrObject oMstrObject = new MstrObject();
					/**Prelevo il path dell'oggetto*/
					SimpleList sList = oObject.getAncestors();
					String sPath="/";                              
					for(int test=0;test<sList.size();test++){
							sPath+=((WebObjectInfo)sList.item(test)).getName()+"/";
							//System.out.println(">>>>>>"+((WebObjectInfo)sList.item(test)).getName()+" <<<<<<");
					}
					oMstrObject.setSObjectPATH(sPath);
					sPath="/";
					/**Prelevo il path dell'oggetto*/
					//System.out.println("PATH="+oMstrObject.getSObjectPATH());
                    
					oMstrObject.setSObjectID(oObject.getID());
//AGGIUNTA BENJI
					/**Prelevo l'owner dell'oggetto*/
					oMstrObject.setSObjectOwner(oObject.getOwner().getName());
//AGGIUNTA BENJI					
					/**Catturo la descrizione dell'oggetto MicroStrategy*/
					WebObjectSource oObjectSourceDesc = factory.getObjectSource();                     
					oObjectSourceDesc.setFlags(oObjectSourceDesc.getFlags()	| EnumDSSXMLObjectFlags.DssXmlObjectComments);
					/**Oggetto da cui prelevo la descrizione inserita lato Desktop*/
					WebObjectInfo oObjectDesc =	oObjectSourceDesc.getObject(oObject.getID(),oObject.getType(),true);
					/**Catturo la descrizione dell'oggetto MicroStrategy*/
					oMstrObject.setIObjectType(oObject.getType());
					oMstrObject.setSObjectName(oObject.getName());                         
					oMstrObject.setSObjectDesc(oObjectDesc.getDescription());
					/**Imposto il nome dell'Intelligence Server per la gestione del Cluster*/
					// farlo fuori  --- oMstrObject.setSClusterNode(this.getCluster());
					if(oObject.getType()==EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition){
			
			
							if(oObject.getSubType()==EnumDSSXMLObjectSubTypes.DssXmlSubTypeReportGraph){
								/**Report Graph*/
								oMstrObject.setSObjectURLApi(this.getSPageWeb()+"?evt=4001&src="+this.getSPageWeb()+".4001&reportID="+oObject.getID()+"&reportViewMode=2&server="+getSServerName()+"&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));						
								oMstrObject.setSObjectURLApiAcs(this.getSPageWeb()+"?evt=3067&src="+this.getSPageWeb()+".3067&reportID="+oObject.getID()+"&group=export&fastExport=true&reportViewMode=2&server="+getSServerName()+"&accessibile=true&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));
							}else if(oObject.getSubType()==EnumDSSXMLObjectSubTypes.DssXmlSubTypeReportGrid){
								/**Report Grid*/
								oMstrObject.setSObjectURLApi(this.getSPageWeb()+"?evt=4001&src="+this.getSPageWeb()+".4001&reportID="+oObject.getID()+"&reportViewMode=1&server="+getSServerName()+"&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));
								oMstrObject.setSObjectURLApiAcs(this.getSPageWeb()+"?evt=3067&src="+this.getSPageWeb()+".3067&reportID="+oObject.getID()+"&group=export&fastExport=true&reportViewMode=1&server="+getSServerName()+"&accessibile=true&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));
							}
							
						}else if(oObject.getType()==EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition){
			
							if(oObject.getSubType()==EnumDSSXMLObjectSubTypes.DssXmlSubTypeReportWritingDocument){
								/**Report Services*/
								oMstrObject.setSObjectURLApi(this.getSPageWeb()+"?evt=2048001&src="+this.getSPageWeb()+".2048001&documentID="+oObject.getID()+"&visualizationMode=0&currentViewMedia=2&server="+getSServerName()+"&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));
								oMstrObject.setSObjectURLApiAcs(this.getSPageWeb()+"?evt=3069&src="+this.getSPageWeb()+".3069&documentID="+oObject.getID()+"&executionMode=4&server="+getSServerName()+"&accessibile=true&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));							
							}else if(oObject.getSubType()==EnumDSSXMLObjectSubTypes.DssXmlSubTypeDocumentDefinition){
								/**Documento HTML non gestito*/
							}
							
						}
					vMstrObject.add(oMstrObject);
					oMstrObject=null;      
					oObjectDesc=null;
				}                      
				serverSession.closeSession();
				return vMstrObject;
		} catch (WebObjectsException e) {
				//sSystem.err.println(e.getMessage());                            
				return null;
		}      
	}
	
	/**
	 * Metodo per la verifica dell'esistenza di un'utenza in MSTR
	 */
	private boolean isValidUser(String sUser) {             
		WebObjectSource oObjectSource = factory.getObjectSource();        
		oObjectSource.setFlags(EnumDSSXMLSearchFlags.DssXmlSearchNameWildCard+EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive);
		/**ricerco tutti gli oggetti Stampe (Report, Report Services e Documenti HTML)*/
		WebSearch oSearch = oObjectSource.getNewSearchObject();            
		oSearch.setAsync(false);                               
		SimpleList types=oSearch.types();
		Integer typeR = new Integer(EnumDSSXMLObjectTypes.DssXmlTypeUser);       
		types.add(typeR);       
		/**Se occorre potrei limitare la ricerca all'interno di una particolare folder*/
		oSearch.setAbbreviationPattern(sUser);
      
		oSearch.setDomain(EnumDSSXMLSearchDomain.DssXmlSearchDomainRepository);
		oSearch.setSearchFlags(EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive);
	       
		try {
			oSearch.submit();
			/**Lancio la getResults ricerca */
                       
			/**Finch� la getStatus � DssXmlObjectSearchStatusRunning*/
                       
			WebFolder oFolder = oSearch.getResults();
			if(oFolder.size()>0){
			   //System.out.println("Utente Trovato! NON SARA' CREATO!");
			   return false;
			}                      
		} catch (WebObjectsException e) {
			logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+" in isValidUser");
			logger.info("Exception del metodo isValidUser" + this.getClass().getName(),e);
			return false;
		}                        
		return true;
	}
	
	/**
	 * Metodo per la creazione a run-time di un'utenza in MSTR
	 */
	public void createUser(String loginName, String fullName, String password, String groupSave)throws MstrException {
		  UserBean user = null;
		  try {		
				factory = WebObjectsFactory.getInstance();
				serverSession = Connect();
			          
				/**Controllo esistenza Utenza*/
				if(!isValidUser(loginName))
					return;
				else{
					
					//throw new MstrException(""," L'utente non � censito su Microstrategy");
					//Instantiate a new user
					/*user = WebBeanFactory.getInstance().newUserBean();
					user.setSessionInfo(serverSession);
					user.InitAsNew();

					//Fetch properties for the user
					WebUser ua = (WebUser) user.getUserEntityObject();
					WebStandardLoginInfo loginInfo = ua.getStandardLoginInfo();

					//Set basic user information
					ua.setLoginName(loginName);
					ua.setFullName(fullName);
					user.getObjectInfo().setDescription("created at	run-time");
					loginInfo.setPassword(password);
					loginInfo.setPasswordModifiable(false);                
					//Set other properties
					//loginInfo.setPasswordExpirationDate(new Date(2007, 01,01));  
					//Password expires on January 1, 2007
					//loginInfo.setPasswordExpirationFrequency(90); 
					//90 days to expire
					loginInfo.setPasswordExpiresAutomatically(false); 
					//If set to false, password never expires
					loginInfo.setStandardAuthAllowed(true); 
					//The user can log in using standard auth
					user.save();
		       
					try {
						 //Prelevo il gruppo "StampaEntrate"                            
						 UserGroupBean ugrp = WebBeanFactory.getInstance().newUserGroupBean();
						 ugrp.setObjectID(groupSave);
						 ugrp.setSessionInfo(serverSession);
		                                                                                                            
						 WebUserGroup WUG = (WebUserGroup)serverSession.getFactory().getObjectSource().getObject(ugrp.getObjectID(), EnumDSSXMLObjectTypes.DssXmlTypeUser);
						 //Utente creato a run-time
						 WebUserEntity WU = (WebUserEntity)serverSession.getFactory().getObjectSource().getObject(user.getObjectID(), EnumDSSXMLObjectTypes.DssXmlTypeUser);
		            
						 //WebUserList WULG = WUG.getMembers();
						 UserEntitiesBean entities = ugrp.getChildren();
						 entities.add(user);
						 //WULG.add(WU);
						 ugrp.save();   	 
						 
						 
						 
						 System.out.println("GRUPPO: ---> "+ugrp.getName());
						 System.out.println("UTENTE: ---> "+user.getName());
		            
					} catch (IllegalArgumentException e) {
						  logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY);
						  logger.info("Exception del metodo createUser " + this.getClass().getName(),e);
						  throw new MstrException(CodedErrors.CODE_ERRORE_MSTR,e.getMessage());
					} catch (WebObjectsException e) {
						  logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY);
						  logger.info("Exception del metodo createUser " + this.getClass().getName(),e);
						  throw new MstrException(CodedErrors.CODE_ERRORE_MSTR,e.getMessage());
					}
					*/
				}
			
			/*} catch (WebBeanException ex) {
				System.out.println("Error creating a session: " +
				ex.getMessage());*/
			} finally {
				Disconnect();             
			}
		}
	/**
	 * Metodo che controlla se � possibile stabilire una connessione con Intelligence Server
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @return boolean Ritorna lo stato del test di connessione true connessione riuscita false non riuscita
	 * */
	public boolean isAliveOld(){
		//		Create factory object.
		WebObjectsFactory factory=WebObjectsFactory.getInstance();
		WebIServerSession serverSession=factory.getIServerSession();		                                                       
		//		Set up session properties by reading from the portlet properties/credentials vault.
		serverSession.setServerName(sServerName);
		serverSession.setServerPort(iServerPort.intValue());
		serverSession.setProjectName(sProjectName);
		serverSession.setLogin(sLoginName);
		serverSession.setPassword(sPassword);		
		//serverSession.setApplicationType(EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
		try {
			serverSession.getSessionID();	
			serverSession.closeSession();
			return true;
		} catch (WebObjectsException e) {
			logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY);
			logger.info(
				   "Exception del metodo isAliveOld() "+
						   this.getClass().getName(),e);
			return false;
		}					
	}		
	/**
	 * Metodo privato che ritorna il nome dell'Intelligence Server meno carico in caso di Cluster
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @return String Nome del Cluster MSTR 
	 */
	public String getCluster() throws it.almaviva.sie.business.exception.MstrException{
		WebClusterAdmin wca = WebObjectsFactory.getInstance().getClusterAdmin();
		int iClusterLoad=0;
		int iClusterLoadBalanceFactor=0;
		String sCusterName=null;
		//WebIServerSession serverSession=WebObjectsFactory.getIServerSession();
		logger.debug(
		   "INIZIO del metodo getCluster() "+
				   this.getClass().getName());
		try {
			WebClusters wcs = wca.getClusters();
			if(wcs.size()>0){						
				//WebCluster wc = wcs.get(0);
				logger.debug("Number of clusters: "+ wca.getClusters().size());
				/**Controllo se c'� un cluster*/
				if(wcs.size()==1){
					return wca.getClusters().get(0).get(0).getNodeName();
				}
				for(int i=0;i<wcs.size();i++){
					logger.debug("Cluster Name: "+ wca.getClusters().get(i).get(0).getNodeName());
					/**Prelevo il nodo e controllo il carico*/
					WebClusterNode oClusterNode = wca.getClusterNode(wca.getClusters().get(i).get(0).getNodeName());
					logger.debug("Cluster Load: "+ oClusterNode.getLoad());				
					logger.debug("Cluster LoadBalanceFactor: "+ oClusterNode.getLoadBalanceFactor());
					if(iClusterLoad==0 && iClusterLoadBalanceFactor==0 && sCusterName==null){
						iClusterLoad=oClusterNode.getLoad();
						iClusterLoadBalanceFactor=oClusterNode.getLoadBalanceFactor();	
						sCusterName=wca.getClusters().get(i).get(0).getNodeName();
					}else{
						if(iClusterLoad>oClusterNode.getLoad() && iClusterLoadBalanceFactor<oClusterNode.getLoadBalanceFactor()){
							return wca.getClusters().get(i).get(0).getNodeName();
						}else{
							return sCusterName;
						}
							
					}				
					oClusterNode=null;
				}
			}			
		} catch (WebObjectsException e) {
			logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+" in getCluster(): ");
			logger.info(
			   "Exception del metodo getCluster() "+
					   this.getClass().getName(),e);
			throw new MstrException(e.getMessage());
		}
		logger.debug(
		   "FINE del metodo getCluster() "+
				   this.getClass().getName());

		return null;
	}
	
	/**
	 * Metodo pubblico che ritorna il nome dell'Intelligence Server meno carico in caso di Cluster
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param bConnect identifica se eseguire la connessione prima di prelevare il cluster MSTR
	 * @return String Nome del Cluster MSTR 
	 */
	public String getCluster(boolean bConnect) throws MstrException{			
		String sClusterNodeName=null;
		WebIServerSession serverSession=null;
		logger.debug(
		   "INIZIO del metodo getCluster(boolean bConnect) "+
				   this.getClass().getName());

		if(bConnect){					
			try {
				serverSession=this.Connect();
				if(serverSession==null) return null;
				if(serverSession.isActive() && serverSession.isAlive()){
					sClusterNodeName=this.getCluster();	
					this.Disconnect(serverSession);
				}
			} catch (WebObjectsException e) {
				logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+" in getCluster(boolean bConnect): ");
				logger.info(
					   "Exception del metodo "+ "getCluster(boolean bConnect)  "+
							   this.getClass().getName(),e);
				throw new MstrException(e.getMessage());
			}									
			return sClusterNodeName;							
		}
		sClusterNodeName=this.getCluster();
		logger.debug(
		   "FINE del metodo getCluster(boolean bConnect) "+
				   this.getClass().getName());


		return sClusterNodeName;
	}
	/**
	 * Metodo che esegue la Disconnessione a Intelligence Server 
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param bConnect identifica se eseguire la connessione prima di prelevare il cluster MSTR
	 * @return String Nome del Cluster MSTR 
	 */
	private boolean Disconnect(WebIServerSession serverSession){
		try {
			logger.debug(
			   "INIZIO del metodo Disconnect(boolean bConnect) "+
					   this.getClass().getName());
			serverSession.getSessionID();	
			serverSession.closeSession();
			//System.out.println("Disconnect!");
			logger.debug(
			   "FINE del metodo Disconnect(boolean bConnect) "+
					   this.getClass().getName());
			return true;
		} catch (WebObjectsException e) {
			logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+" in Disconnect(): ");
			logger.info(
					   "Exception del metodo Disconnect() "+
							   this.getClass().getName(),e);
			return false;
		}	
	}
	
	/**
	 * Metodo che esegue la Disconnessione a Intelligence Server 
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param bConnect identifica se eseguire la connessione prima di prelevare il cluster MSTR
	 * @return String Nome del Cluster MSTR 
	 */
	public boolean Disconnect(){		
			return Disconnect(getServerSession());
	}
	
	
	/**
	 * Metodo che esegue la connessione a Intelligence Server 
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param bConnect identifica se eseguire la connessione prima di prelevare il cluster MSTR
	 * @return String Nome del Cluster MSTR 
	 */
	public WebIServerSession Connect()throws MstrException {
		logger.debug( "INIZIO del metodo Connect() " + this.getClass().getName());
		logger.info(" stampo parametri di connessione sServerName="+sServerName+" iServerPort="+iServerPort+" sProjectName="+sProjectName+" "
				+ "sLoginName="+sLoginName+" sPassword="+sPassword+" sPageWeb="+sPageWeb+" sServerWeb="+sServerWeb+" sContextWeb="+sContextWeb+" "
						+ "sProtocolloWeb="+sProtocolloWeb+" iServerPortWeb="+iServerPortWeb+" sIdRoot="+sIdRoot+" mstr_server_port="+mstr_server_port);

		factory = WebObjectsFactory.getInstance();
		serverSession = factory.getIServerSession();				
		
		/**Imposto i parametri per la connessione*/
		serverSession.setServerName(sServerName);
		serverSession.setServerPort(iServerPort.intValue());
		serverSession.setProjectName(sProjectName);
		serverSession.setLogin(sLoginName);
		serverSession.setPassword(sPassword);	
		//serverSession.setLocale(java.util.Locale.ITALIAN);

		try {
			serverSession.getSessionID();			
		} catch (WebObjectsException e) {
			logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+""+MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED);
			logger.info("Exception del metodo Connect() " + this.getClass().getName(),e);
			throw new MstrException( MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED);
		}
        
		logger.debug( "FINE del metodo Connect() " + this.getClass().getName());

		return serverSession;
	}
	
	/**
	 * Metodo che esegue la connessione a Intelligence Server o 
	 * riutilizza quella passta in ingresso 
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param connessioneMstrTO identifica la connessione MSTR
	 * @return String Nome del Cluster MSTR 
	 */
	public ConnessioneMstrTO Connect(ConnessioneMstrTO connessioneMstrTO)throws MstrException {
		logger.debug(
		   "INIZIO del metodo Connect() "+
				   this.getClass().getName());

		factory=WebObjectsFactory.getInstance();
		serverSession=factory.getIServerSession();				
		/**Imposto i parametri per la connessione*/
		serverSession.setServerName(sServerName);
		serverSession.setServerPort(iServerPort.intValue());
		serverSession.setProjectName(sProjectName);
		serverSession.setLogin(sLoginName);
		serverSession.setPassword(sPassword);	
		//serverSession.setLocale(java.util.Locale.ITALIAN);

		try {
			if (connessioneMstrTO != null &&
			    (connessioneMstrTO.getSessionID() == null ||
				connessioneMstrTO.getSessionID().equals("")))
				connessioneMstrTO = null;
				
			if (connessioneMstrTO == null){ 
				connessioneMstrTO = new ConnessioneMstrTO();
				try {
					connessioneMstrTO.setSessionID(serverSession.getSessionID());
					connessioneMstrTO.setSaveState(serverSession.saveState(0));
				} catch (WebObjectsException e) {
					logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+""+MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED);
					logger.info(
							   "Exception del metodo Connect() "+
									   this.getClass().getName(),e);
					throw new MstrException(MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED);
				}
			} else {
				serverSession.setSessionID(connessioneMstrTO.getSessionID());
				if (!serverSession.isAlive()) {
					
					factory=WebObjectsFactory.getInstance();
					serverSession=factory.getIServerSession();				
					/**Imposto i parametri per la connessione*/
					serverSession.setServerName(sServerName);
					serverSession.setServerPort(iServerPort.intValue());
					serverSession.setProjectName(sProjectName);
					serverSession.setLogin(sLoginName);
					serverSession.setPassword(sPassword);	
					serverSession.setLocale(java.util.Locale.ITALIAN);					

					String sid = serverSession.getSessionID();
					connessioneMstrTO = new ConnessioneMstrTO();  
					connessioneMstrTO.setSessionID(sid);
					connessioneMstrTO.setSaveState(serverSession.saveState());		
				}
			}
		} catch (WebObjectsException e) {
			// TODO Blocco catch generato automaticamente
			e.printStackTrace();
		} catch (MstrException e) {
			// TODO Blocco catch generato automaticamente
			e.printStackTrace();
		}    
    
		logger.debug(
		   "FINE del metodo Connect() "+
			   this.getClass().getName());

		return connessioneMstrTO;
	}
	
	public boolean isProspettoValid(MstrObject oStampa) throws MstrException{	
		logger.debug("INIZIO del metodo isProspettoValid() "+this.getClass().getName());
	
		WebObjectSource oObjectSource = factory.getObjectSource();
		   
		oObjectSource.setFlags(oObjectSource.getFlags() | EnumDSSXMLObjectFlags.DssXmlObjectTotalObject);
		/**ricerco tutti gli oggetti Stampe (Report, Report Services e Documenti HTML)*/
		WebSearch oSearch = oObjectSource.getNewSearchObject();		
		oSearch.setAsync(false);				
		SimpleList types=oSearch.types();
		Integer typeR=new Integer(EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition);
		Integer typeD=new Integer(EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition);
		Integer typeL=new Integer(EnumDSSXMLObjectTypes.DssXmlTypeShortcut);
		types.add(typeR);
		types.add(typeD);
		types.add(typeL);
		/**Se occorre potrei limitare la ricerca all'interno di una particolare folder*/
		oSearch.setSearchRoot(getSIdRoot());
		oSearch.setSearchFlags(EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive);			
		try {
			oSearch.submit();
			/**Lancio la getResults ricerca */
			
			/**Finch� la getStatus �  DssXmlObjectSearchStatusRunning*/
			
			WebFolder oFolder = oSearch.getResults();
			
			for(int i=0;i<oFolder.size();i++){
				WebObjectInfo oObject = oFolder.get(i);			
				
				/**controllo se nella lista di oggetti ritornati vi � quello che cerco di eseguire*/								
				if(oObject.getID().compareToIgnoreCase(oStampa.getSObjectID())==0){
					if (oObject.getType() == EnumDSSXMLObjectTypes.DssXmlTypeShortcut) {
						WebShortcut oShortCut = (WebShortcut)oObject;
						oObject = oShortCut.getTarget();
						oObject.populate();
						oStampa.setSObjectID(oObject.getID());
						if (oObject.getType() != EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition &&
							oObject.getType() != EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition) {
							continue;
						}
					}
					
					oStampa.setSObjectURLApi(   this.getSPageWeb()+"?evt=3032&src="+this.getSPageWeb()+".3032&objectType_3032="+oStampa.getIObjectType()+"&objectID_3032="+oStampa.getSObjectID()+"&server="+getSServerName()+"&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));
					break;
				}				
			}
			
		}catch (WebObjectsException e) {
			logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+" "+MstrCodedErrors.MESSAGE_REPORT_NOT_AVAILABLE);
			logger.info(
					   "Exception del metodo isReportValid() "+
							   this.getClass().getName(),e);
			throw new MstrException(MstrCodedErrors.MESSAGE_REPORT_NOT_AVAILABLE);
		}			
		logger.debug(
			   "FINE del metodoisReportValid() "+
					   this.getClass().getName());

		return false;
	}
	
	
	/**
	 * Metodo che controlla la validit� della stampa e valorizza l'oggetto MstrObject passato in input
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * 	
	 * @param MstrObject oStampa oggetto MicroStrategy da controllare 
	 * 	 
	 * @return boolean true controllo con esito positivo, false controllo fallito
	 */
	public boolean isReportValid(MstrObject oStampa) throws MstrException{	
		logger.debug(
			   "INIZIO del metodo isReportValid() "+
					   this.getClass().getName());
	
		WebObjectSource oObjectSource = factory.getObjectSource();
		   
		oObjectSource.setFlags(oObjectSource.getFlags() | EnumDSSXMLObjectFlags.DssXmlObjectTotalObject);
		/**ricerco tutti gli oggetti Stampe (Report, Report Services e Documenti HTML)*/
		WebSearch oSearch = oObjectSource.getNewSearchObject();		
		oSearch.setAsync(false);				
		SimpleList types=oSearch.types();
		Integer typeR=new Integer(EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition);
		Integer typeD=new Integer(EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition);
		Integer typeL=new Integer(EnumDSSXMLObjectTypes.DssXmlTypeShortcut);
		types.add(typeR);
		types.add(typeD);
		types.add(typeL);
		/**Se occorre potrei limitare la ricerca all'interno di una particolare folder*/
		oSearch.setSearchRoot(getSIdRoot());
		oSearch.setSearchFlags(EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive);			
		try {
			oSearch.submit();
			/**Lancio la getResults ricerca */
			
			/**Finch� la getStatus �  DssXmlObjectSearchStatusRunning*/
			
			WebFolder oFolder = oSearch.getResults();
			
			for(int i=0;i<oFolder.size();i++){
				WebObjectInfo oObject = oFolder.get(i);			
				
				/**controllo se nella lista di oggetti ritornati vi � quello che cerco di eseguire*/								
				if(oObject.getID().compareToIgnoreCase(oStampa.getSObjectID())==0){
					if (oObject.getType() == EnumDSSXMLObjectTypes.DssXmlTypeShortcut) {
						WebShortcut oShortCut = (WebShortcut)oObject;
						oObject = oShortCut.getTarget();
						oObject.populate();
						oStampa.setSObjectID(oObject.getID());
						if (oObject.getType() != EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition &&
							oObject.getType() != EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition) {
							continue;
						}
					}
					
					if(oObject.getType()==EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition){
						
						
						if(oObject.getSubType()==EnumDSSXMLObjectSubTypes.DssXmlSubTypeReportGraph){
							/**Report Graph*/
							oStampa.setSObjectURLApi(this.getSPageWeb()+"?evt=4001&src="+this.getSPageWeb()+".4001&reportID="+oObject.getID()+"&reportViewMode=2&server="+getSServerName()+"&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));						
							oStampa.setSObjectURLApiAcs(this.getSPageWeb()+"?evt=3067&src="+this.getSPageWeb()+".3067&reportID="+oObject.getID()+"&group=export&fastExport=true&reportViewMode=2&server="+getSServerName()+"&accessibile=true&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));
						}else if(oObject.getSubType()==EnumDSSXMLObjectSubTypes.DssXmlSubTypeReportGrid){
							/**Report Grid*/
							oStampa.setSObjectURLApi(this.getSPageWeb()+"?evt=4001&src="+this.getSPageWeb()+".4001&reportID="+oObject.getID()+"&reportViewMode=1&server="+getSServerName()+"&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));
							oStampa.setSObjectURLApiAcs(this.getSPageWeb()+"?evt=3067&src="+this.getSPageWeb()+".3067&reportID="+oObject.getID()+"&group=export&fastExport=true&reportViewMode=1&server="+getSServerName()+"&accessibile=true&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));					
							}
						return true;
					}else if(oObject.getType()==EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition){
						
						if(oObject.getSubType()==EnumDSSXMLObjectSubTypes.DssXmlSubTypeReportWritingDocument){
							/**Report Services*/
							oStampa.setSObjectURLApi(this.getSPageWeb()+"?evt=2048001&src="+this.getSPageWeb()+".2048001&documentID="+oObject.getID()+"&visualizationMode=0&currentViewMedia=2&server="+getSServerName()+"&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));
							oStampa.setSObjectURLApiAcs(this.getSPageWeb()+"?evt=3069&src="+this.getSPageWeb()+".3069&documentID="+oObject.getID()+"&executionMode=4&server="+getSServerName()+"&accessibile=true&project="+this.getSProjectName().replace(' ', '+')+"&port="+this.getIServerPort()+"&usrSmgr=");//+serverSession.saveState(0));							
						}else if(oObject.getSubType()==EnumDSSXMLObjectSubTypes.DssXmlSubTypeDocumentDefinition){
							/**Documento HTML non gestito*/
						}
						return true;
					}
					
//					if(oObject.getType()==EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition){
//						/**Oggetto Report da utilizzare durante l'esecuzione*/
//						WebReportSource oRepSource = factory.getReportSource();
//						/**Prelevo l'oggetto*/
//						oRepSource.getNewInstance(oStampa.getSObjectID());				        				        
//						return true;
//					}else if(oObject.getType()==EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition){
//						if(oObject.getSubType()==EnumDSSXMLObjectSubTypes.DssXmlSubTypeReportWritingDocument){
//							WebDocumentSource oDocSource = factory.getDocumentSource();
//							oDocSource.getNewInstance(oStampa.getSObjectID());	
//							return true;
//						}						
//					}
					break;
				}				
			}
			
		}catch (WebObjectsException e) {
			logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+" "+MstrCodedErrors.MESSAGE_REPORT_NOT_AVAILABLE);
			logger.info(
					   "Exception del metodo isReportValid() "+
							   this.getClass().getName(),e);
			throw new MstrException(MstrCodedErrors.MESSAGE_REPORT_NOT_AVAILABLE);
		}			
		logger.debug(
			   "FINE del metodoisReportValid() "+
					   this.getClass().getName());

		return false;
	}
	
	/**
	 * Metodo per ottenere la lista delle utenze presenti su MSTR
	 */
	public ArrayList getLoginMSTR(String group) throws WebObjectsException{
		logger.debug("INIZIO del metodo getLoginMSTR() "+this.getClass().getName());
		ArrayList arrayListLoginMSTR = new ArrayList();
		UserBean user = null;
		String step = null;
		try {		
			step = "factory = WebObjectsFactory.getInstance();";
			factory = WebObjectsFactory.getInstance();
			step = "serverSession = Connect();";
			serverSession = Connect();
			step = "UserGroupBean ugrp = WebBeanFactory.getInstance().newUserGroupBean();";
			//Prelevo il gruppo "StampaEntrate"                            
			UserGroupBean ugrp = WebBeanFactory.getInstance().newUserGroupBean();
			step = "ugrp.setObjectID(group);";
			ugrp.setObjectID(group);
			step = "ugrp.setSessionInfo(serverSession);";
			ugrp.setSessionInfo(serverSession);
			//WebUserList WULG = WUG.getMembers();
			step = "UserEntitiesBean entities = ugrp.getChildren();";
			UserEntitiesBean entities = ugrp.getChildren();
			step = "for( int i = 0; i< entities.size(); i++)";
			for( int i = 0; i< entities.size(); i++){
				step = "arrayListLoginMSTR.add( entities.get("+i+") );";
				//UserEntityBean userEntityBean = entities.get(i);
				//arrayListLoginMSTR.add( entities.get(i).getObjectName() );
				arrayListLoginMSTR.add( entities.get(i).getObjectInfo().getAbbreviation() );
				//arrayListLoginMSTR.add( entities.get(i).getUserEntityObject().toString());
			}
			//System.out.println("entities: ---> "+entities.size());
			//System.out.println("GRUPPO: ---> "+ugrp.getName());
		} catch (IllegalArgumentException e) {
			logger.debug("Errore getLoginMSTR step: " + step);
			e.printStackTrace();
		} catch (WebBeanException e) {
			logger.debug("Errore getLoginMSTR step: " + step);
			e.printStackTrace();
		} catch (MstrException e) {
			logger.debug("Errore getLoginMSTR step: " + step);
			e.printStackTrace();     
		} finally {
			try{
				step = "Disconnect();";
				Disconnect();             
			} catch (Exception e) {
				logger.debug("Errore getLoginMSTR step: " + step);
				e.printStackTrace();              
			}     
		}
		
		return arrayListLoginMSTR;
	}
	
	public ArrayList getAllReport(MstrConnectionParam mstrConnectionParam) throws WebObjectsException
		{	
		logger.debug(
			"INIZIO del metodo getAllReport() "+
					this.getClass().getName());

			ArrayList arrayListReport = null;
			WebObjectsFactory objFactory = null;
			WebIServerSession webSS = null;
			ReportMstrTO reportMstrTO = null;
			
			try
				{
					
					objFactory = WebObjectsFactory.getInstance();
					
					webSS = objFactory.getIServerSession();
					webSS.setServerName(mstrConnectionParam.getSServerName());
					webSS.setServerPort(mstrConnectionParam.getIServerPort().intValue());
					webSS.setLogin(mstrConnectionParam.getSLoginName());
					webSS.setPassword(mstrConnectionParam.getSPassword());
					webSS.setProjectName(mstrConnectionParam.getSProjectName());
						
					
					WebObjectSource objSource = objFactory.getObjectSource();
					WebSearch objSearch = objSource.getNewSearchObject();
			
					objSearch.setSearchFlags(EnumDSSXMLSearchFlags.DssXmlSearchAbbreviationWildCard + EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive);
					objSearch.setAsync(false);
					objSearch.types().add(new Integer(EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition));
					objSearch.types().add(new Integer(EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition));
					objSearch.types().add(new Integer(EnumDSSXMLObjectTypes.DssXmlTypeShortcut));
					objSearch.setSearchRoot(mstrConnectionParam.getSIdRoot());
					objSearch.submit();	
				
					WebFolder objFolder = objSearch.getResults();
					arrayListReport = new ArrayList();
					if(objFolder.size()>0)
					{
						for(int i = 0; i<objFolder.size();i++)
						{
							
							/**Catturo la descrizione dell'oggetto MicroStrategy*/
							WebObjectSource oObjectSourceDesc =	objFactory.getObjectSource();                     
							oObjectSourceDesc.setFlags(oObjectSourceDesc.getFlags()	| EnumDSSXMLObjectFlags.DssXmlObjectComments);
															/**Oggetto da cui prelevo la descrizione inserita lato
							Desktop*/
							WebObjectInfo oObjectDesc =	oObjectSourceDesc.getObject(objFolder.get(i).getID(),objFolder.get(i).getType()	,true);
							
							if (oObjectDesc.getType() == EnumDSSXMLObjectTypes.DssXmlTypeShortcut) {
								WebShortcut oShortCut = (WebShortcut)oObjectDesc;
								oObjectDesc = oShortCut.getTarget();
								oObjectDesc.populate();
								if (oObjectDesc.getType() != EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition &&
									oObjectDesc.getType() != EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition) {
									continue;
								}
							}
							
							 reportMstrTO = new ReportMstrTO();
							 //ID Univoco del Report assegnato da Microstrategy
							 reportMstrTO.setIdReport(objFolder.get(i).getID());
							//reportMstrTO.setIdReport(oObjectDesc.getID());
							 //Nome del Report o Document inserito dentro Microstrategy
							 //reportMstrTO.setDescriptionReport(objFolder.get(i).getName());
							//reportMstrTO.setDescriptionReport(objFolder.get(i).getName());
							reportMstrTO.setDescriptionReport(oObjectDesc.getName());
							 //Descrizione del Report o Document inserito dentro Microstrategy
							 //reportMstrTO.setDescriptionDocument(objFolder.get(i).getDescription());
							reportMstrTO.setDescriptionDocument(oObjectDesc.getDescription());
							 //Ottengo il tipo di report
							 //reportMstrTO.setTypeObject(new Integer(objFolder.get(i).getType()));
							reportMstrTO.setTypeObject(new Integer(oObjectDesc.getType()));
							 //Numero ordine di visualizzazione
							 reportMstrTO.setNumeroPosizioneElenco(new Integer(i+1));			 
							  
							 //Prelevo il Path del Report
							 SimpleList sList = objFolder.get(i).getAncestors();
							 String sPath=""; 
							 // System.out.println("Size :" + sList.size());                             
							 for(int j=0;j<sList.size();j++){
								sPath += ((WebObjectInfo)sList.item(j)).getName();
								if(j != (sList.size()-1)){
									sPath += ">>";						
								}
							 }
							 //System.out.println("Path Report : " + sPath);
							 reportMstrTO.setPath(sPath);
						     
						     
						     	 
							 arrayListReport.add(reportMstrTO);
							}
						}
					}
					catch(WebObjectsException webObjException)
					{
						logger.error(
							"Catturata eccezione di tipo WebObjectsException nel metodo "+
									this.getClass().getName() + ".getAllReport()");
						logger.error(webObjException);			

									throw webObjException;	
					}
					finally
					{
						if(webSS.isActive())
						{
							try {
								webSS.closeSession();
							} catch (WebObjectsException webObjException) {
								logger.error(
										"Catturata eccezione di tipo WebObjectsException nel metodo "+
									this.getClass().getName() + ".getAllReport()",webObjException);
									throw webObjException;
							}
						}
					}
			logger.debug(
					"FINE del metodogetAllReport() "+
							this.getClass().getName());

					return arrayListReport;
				}

	public boolean isWebServerAlive(String contestoWeb)throws MstrException{
		logger.debug(
				"INIZIO del metodo isWebServerAlive() "+
						this.getClass().getName());

		URL oURL;
		try {
			oURL = new URL (sProtocolloWeb+"://"+sServerWeb+":"+mstr_server_port+""+"/"+contestoWeb+"/"+sPageWeb);
			//oURL = new URL (sProtocolloWeb+"://"+sServerWeb+"/"+sContextWeb+"/"+sPageWeb);
			System.out.println("URL "+oURL);
			HttpURLConnection huc;
			huc = (HttpURLConnection) oURL.openConnection();
			if(huc.getResponseCode()!=HttpURLConnection.HTTP_OK){
				logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+" "+MstrCodedErrors.MESSAGE_CONN_WEB_SERVER_MSTR_NOT_ESTABLISHED);
				throw new MstrException( MstrCodedErrors.MESSAGE_CONN_WEB_SERVER_MSTR_NOT_ESTABLISHED);
				//return false;
			}
		} catch (MalformedURLException e1) {
			logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+" in isWebServerAlive(): ");
			logger.info(
					   "Exception del metodo isWebServerAlive() "+
							   this.getClass().getName(),e1);
			return false;
		}catch (IOException e) {
			logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+" in isWebServerAlive(): ");
			logger.info(
					   "Exception del metodo isWebServerAlive() "+
							   this.getClass().getName(),e);
			return false;
		}
		logger.debug(
				"FINE del metodo isWebServerAlive() "+
						this.getClass().getName());

		return true;	
	}
	
	public boolean isActive(){
		logger.debug(
				"Metodo "+ "isActive() "+
						this.getClass().getName());
		return serverSession.isActive();	
	}

	public boolean isAlive() throws MstrException{
		try{
			logger.debug(
					"Metodo isAlive() "+
							this.getClass().getName());
		return serverSession.isAlive();	
		} catch (WebObjectsException e) {
			logger.info(MstrCodedErrors.MESSAGE_MICROSTRATEGY+" "+MstrCodedErrors.MESSAGE_CONN_WEB_SERVER_MSTR_NOT_ESTABLISHED);
			logger.info(
					   "Exception del metodo isAlive() "+
							   this.getClass().getName(),e);
			throw new MstrException(MstrCodedErrors.MESSAGE_CONN_WEB_SERVER_MSTR_NOT_ESTABLISHED);
		}			
	}
	public boolean isIntellServerAvailable()throws MstrException{
		logger.debug(
				"Metodo isIntellServerAvailable() "+
						this.getClass().getName());

		return isActive() && isAlive();	
	}
	
	/**
	 * Metodo utillizzato per la cancellazione di un utente all'interno di MicroStrategy
	 * 
	 * @author gianluca masci aka (GLM)
	 * @param String loginName nome della login da cercare ed eliminare in MicroStrategy
	 * 
	 * @see getUserInfo
	 * */
	public void deleteUser(String loginName){
		try {
			//Connessione
			Connect();
		
			WebObjectInfo oUserInfo=null;
			//System.out.println("Utente da cancellare: "+loginName);
			oUserInfo=getUserInfo(loginName);
		
			if(oUserInfo!=null){			
				try {
					//System.out.println("Cancellazione Utente Passo Finale!");
					factory.getObjectSource().deleteObject(oUserInfo);
				} catch (WebObjectsException e) {
					//System.out.println("Impossibile rimuovere l'utente!");
					e.printStackTrace();
				}
			}
		} catch (Exception e) {
			//System.out.println("Errore Generico");
			e.printStackTrace();
		}		
	}
	
	/**
	 * Ritorna ID dell'utente in base al nome passato
	 * 
	 @param String sUser nome utente da prelevare
	 * */
	private WebObjectInfo getUserInfo(String sUser){				
		WebObjectInfo oUserInfo=null;
		if(!isValidUser(sUser)){
			//System.out.println("Utente Valido, ne prelevo il webobjectInfo");
			WebObjectSource oObjectSource = factory.getObjectSource();
			
			oObjectSource.setFlags(EnumDSSXMLSearchFlags.DssXmlSearchNameWildCard+EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive);
			/**ricerco tutti gli oggetti Stampe (Report, Report Services e Documenti HTML)*/
			WebSearch oSearch = oObjectSource.getNewSearchObject();		
			oSearch.setAsync(false);				
			SimpleList types=oSearch.types();
			Integer typeR=new Integer(EnumDSSXMLObjectTypes.DssXmlTypeUser);        
			types.add(typeR);        
			/**Se occorre potrei limitare la ricerca all'interno di una particolare folder*/
			oSearch.setAbbreviationPattern(sUser); 
			oSearch.setDomain(EnumDSSXMLSearchDomain.DssXmlSearchDomainRepository );
			oSearch.setSearchFlags(EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive);
			
			try {
				oSearch.submit();
				/**Lancio la getResults ricerca */
				
				/**Finchè la getStatus è  DssXmlObjectSearchStatusRunning*/
				
				WebFolder oFolder = oSearch.getResults();
				if(oFolder.size()>0){						
					//System.out.println("WebObjectInfo Trovato!");
					oUserInfo=oFolder.get(0);
				}			
			} catch (WebObjectsException e) {
				//System.out.println("Errore nel prelevare il WebObjectInfo");
				e.printStackTrace();
				return null;
			}									
		}
		
		return oUserInfo;
	}
	
	/**
	 * Metodo utillizzato per la cancellazione di una stampa personale all'interno di MicroStrategy
	 * 
	 * @author gianluca masci aka (GLM)
	 * @param String sReportName nome della stampa da Eliminare in MicroStrategy
	 * @param String sLoginName nome della login owner della stampa da eliminare in MicroStrategy
	 * 
	 * @see getObjectInfo
	 * */
	public void deletePersonalReport(String sReportName, String sLoginName){
		try {
			WebObjectInfo oPersonalReportObjectInfo=null;
			
			//TODO Utilizzare la connessione in sessione
			//Connect();
			
			oPersonalReportObjectInfo=getObjectInfo(sReportName, sLoginName);
			if(oPersonalReportObjectInfo!=null){			
				try {
					//System.out.println("Cancellazione Report Personale Utente:"+sLoginName);
					factory.getObjectSource().deleteObject(oPersonalReportObjectInfo);					
					//Eliminazione degli oggetti legati all'utente.					
				} catch (WebObjectsException e) {
					//System.out.println("Impossibile rimuovere l'utente!");
					e.printStackTrace();
				}
			}
		} catch (Exception e) {
			//System.out.println("Errore Generico");
			e.printStackTrace();
		}	
		
	}
	
	
	
	

	/**
	 * Ritorna un oggetto WebObjectInfo che sarà eliminato da MicroStrategy, le 
	 * tipologie di sono:
	 * 		EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition (RS)
	 *  	EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition (Report)
	 * 
	 * @author gianluca masci aka (GLM)
	 * @param String sReportName nome della stampa da Eliminare in MicroStrategy
	 * @param String sLoginName nome della login owner della stampa da eliminare in MicroStrategy
	 * 
	 * 
	 * @see deletePersonalReport
	 * */
	private WebObjectInfo getObjectInfo(String sReportName, String sLoginName){				
			WebObjectInfo oObjectInfo=null;
			
			WebObjectSource oObjectSource = factory.getObjectSource();	
			oObjectSource.setFlags(EnumDSSXMLSearchFlags.DssXmlSearchNameWildCard+EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive);
			/**ricerco tutti gli oggetti Stampe (Report, Report Services e Documenti HTML)*/
			WebSearch oSearch = oObjectSource.getNewSearchObject();		
			oSearch.setAsync(false);				
			SimpleList types=oSearch.types();
		   Integer typeR=new Integer(EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition);
		   Integer typeD=new Integer(EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition);
		     
		   types.add(typeR);        
		   types.add(typeD);
		   //System.out.println("Cancellazione oggetto Personale utente: "+sLoginName);
		   /**Se occorre potrei limitare la ricerca all'interno di una particolare folder*/
		   oSearch.setNamePattern(sReportName); 
		   oSearch.setDomain(EnumDSSXMLSearchDomain.DssXmlSearchDomainRepository);
			oSearch.setSearchFlags(EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive);
			
			
			try {
				oSearch.submit();
				/**Lancio la getResults ricerca */
				
				/**Finche' la getStatus e' DssXmlObjectSearchStatusRunning*/
				
				WebFolder oFolder = oSearch.getResults();
				//System.out.println("Numero di Oggetti Personali Trovati: "+oFolder.size());
				if(oFolder.size()>0){	
					/**Ciclo tutti gli ogetti trovati*/
					for(int i=0;i<oFolder.size();i++){
						oObjectInfo=oFolder.get(i);
						//System.out.println("Oggetto Personale: "+oObjectInfo.getName());
						//System.out.println("Owner Oggetto Personale: "+oObjectInfo.getOwner().getName());
						/**Controllo che l'owner dell'oggetto sia la login MSTR*/
						if(oObjectInfo.getOwner().getName().equals(sLoginName)){
							//System.out.println("Oggetto Personale Trovato");
							return oObjectInfo;
						}
					}										
				}			
			} catch (WebObjectsException e) {
				//System.out.println("Errore nel prelevare il WebObjectInfo");
				e.printStackTrace();
				return null;
			}									
		
		return oObjectInfo;
	}
	


	/**
	 * Imposta il Server WEB per MicroStrategy da controllare e dove eseguire le richieste
	 * 
	 * @return the sServerWeb
	 */
	public String getSServerWeb() {
		return sServerWeb;
	}
	/**
	 * Ritorna il Server WEB per MicroStrategy da controllare e dove eseguire le richieste
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param serverWeb the sServerWeb to set
	 */
	public void setSServerWeb(String serverWeb) {
		sServerWeb = serverWeb;
	}
	/**
	 * @return
	 */
	public String getSIdRoot() {
		return sIdRoot;
	}

	/**
	 * Ritorna la condivisione WEB per MicroStrategy da controllare e dove eseguire le richieste
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @return the sShareWEB
	 */
	public String getSContextWeb() {
		return sContextWeb;
	}

	/**
	 * @return
	 */
	public WebIServerSession getServerSession() {
		return serverSession;
	}

	/**
	 * @return
	 */
	public String getSPageWeb() {
		return sPageWeb;
	}

	/**
	 * @return
	 */
	public Vector getVMstrObject() {
		return vMstrObject;
	}

	/**
	 * @param string
	 */
	public void setSIdRoot(String string) {
		sIdRoot = string;
	}

	/**
	 * Imposta la condivisione WEB per MicroStrategy da controllare e dove eseguire le richieste
	 * 
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * @param shareWEB the sShareWEB to set
	 */
	public void setSContextWeb(String string) {
		sContextWeb = string;
	}

	/**
	 * @param session
	 */
	public void setServerSession(WebIServerSession session) {
		serverSession = session;
	}

	/**
	 * @param string
	 */
	public void setSPageWeb(String string) {
		sPageWeb = string;
	}

	/**
	 * @param vector
	 */
	public void setVMstrObject(Vector vector) {
		vMstrObject = vector;
	}

	/**
	 * @return
	 */
	public Integer getIServerPortWeb() {
		return iServerPortWeb;
	}

	/**
	 * @return
	 */
	public String getSProtocolloWeb() {
		return sProtocolloWeb;
	}

	/**
	 * @param integer
	 */
	public void setIServerPortWeb(Integer integer) {
		iServerPortWeb = integer;
	}

	/**
	 * @param string
	 */
	public void setSProtocolloWeb(String string) {
		sProtocolloWeb = string;
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



	public String getMstr_server_port() {
		return mstr_server_port;
	}



	public void setMstr_server_port(String mstr_server_port) {
		this.mstr_server_port = mstr_server_port;
	}

}
