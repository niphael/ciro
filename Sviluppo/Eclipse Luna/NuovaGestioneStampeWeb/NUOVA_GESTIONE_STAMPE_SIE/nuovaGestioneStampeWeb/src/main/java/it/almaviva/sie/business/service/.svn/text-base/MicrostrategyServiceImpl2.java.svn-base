package it.almaviva.sie.business.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Vector;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.almaviva.sie.business.exception.MstrException;
import it.almaviva.sie.business.mappers.DAbilitazioniStampeLivOrgMapper;
import it.almaviva.sie.business.mappers.DAbilitazioniStampeMapper;
import it.almaviva.sie.business.mappers.DCronologicoStampeMapper;
import it.almaviva.sie.business.mappers.DParametriApplicazioneMapper;
import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.ConnessioneMstrTO;
import it.almaviva.sie.business.model.DAbilitazStampeLivOrgVO;
import it.almaviva.sie.business.model.DAbilitazStampeVO;
import it.almaviva.sie.business.model.DCronologicoStampeVO;
import it.almaviva.sie.business.model.DParametriApplicazioneVO;
import it.almaviva.sie.business.model.EsitoMstrTO;
import it.almaviva.sie.business.model.MstrConnectionParam;
import it.almaviva.sie.business.model.MstrObject;
import it.almaviva.sie.business.model.MstrUtils;
import it.almaviva.sie.business.model.ParametriCodiceDescrizioneTO;
import it.almaviva.sie.business.model.ReportMstrTO;
import it.almaviva.sie.business.model.VisualizzaStampaTO;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.MstrCodedErrors;
import it.almaviva.sie.business.util.MstrCostanti;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.sicurezza.model.DatiControllatiTO;
import it.almaviva.sie.web.controller.AllineamentoStampeController;
import it.almaviva.sie.web.controller.RedirectController;

import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsException;

public abstract class MicrostrategyServiceImpl2 implements MicrostrategyService {
	
	private MstrConnectionParam mstrConnectionParam = null;
	private MstrConnectionParam mstrAdminConnectionParam = null;
	@Autowired
	private DAbilitazioniStampeLivOrgMapper mapper1;
	@Autowired
	private DAbilitazioniStampeMapper mapper2;
	@Autowired
	private DCronologicoStampeMapper mapper3;
	private Logger logger = Logger.getLogger(this.getClass());
	public EsitoMstrTO getStampa(String sObjectId, ConnessioneMstrTO inConnessioneMstrTO, String userName,VisualizzaStampaTO stampa) throws MstrException{
		MstrUtils mstrUtil = null;
		boolean checkStampePersonali = false;
		MstrConnectionParam mstrUserConnectionParam=null;
		if (userName != null) {
			if(userName.endsWith(" StampePersonali")){
				userName = userName.replaceAll(" StampePersonali","");
				checkStampePersonali = true;
			}
			    
			try {
				mstrUserConnectionParam = (MstrConnectionParam)mstrConnectionParam.clone();
				// per esercizio -> 
				//mstrUserConnectionParam.setSLoginName(userName);
				//quella di sotto è per sviluppo
				mstrUserConnectionParam.setSLoginName(getMstrAdminConnectionParam().getSLoginName());
				mstrUserConnectionParam.setSPassword(getMstrAdminConnectionParam().getSPassword());
				mstrUtil = new  MstrUtils(mstrUserConnectionParam);
			} catch (CloneNotSupportedException e) {
			}
		} else {
			mstrUtil = new  MstrUtils(mstrConnectionParam);
		}
		MstrObject oStampa=new MstrObject();
		EsitoMstrTO result = new EsitoMstrTO(true,Integer.parseInt("0"),"Success");
		oStampa.setSObjectID(sObjectId);
		WebIServerSession serverSession = null;	
		ConnessioneMstrTO outConnessioneMstrTO = null;	
		boolean isReportValid = true;
		if((outConnessioneMstrTO = mstrUtil.Connect(inConnessioneMstrTO)) == null){			
			//return 1;
			result = new EsitoMstrTO(false,Integer.parseInt(MstrCodedErrors.CODE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED),MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED+" Username"+userName+" password "+ mstrUserConnectionParam.getSPassword());
					
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione1:  "
					+ MstrCodedErrors.CODE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED, MicrostrategyServiceImpl2.class);
		} else if (!checkStampePersonali){
			// Controllo se il profilo ï¿½ abilitato 
			// alla visualizzazione della stampa
			DAbilitazStampeVO vo = new DAbilitazStampeVO();
			vo.setCODI_PK_OBJECT_ID(stampa.getCodiceStampa());
			vo.setCODI_PK_PROFILO(stampa.getCodiceProfiloStampa());
			int i=mapper2.getAbilitazione(vo);
			if(i==0)
				throw new MstrException("Utente non abilitato alla visualizzazione della stampa");
			serverSession = mstrUtil.getServerSession();
			if(mstrUtil.isIntellServerAvailable()){
				/**Devo controllare se l'oggetto passato ï¿½ valido*/
				
				/**Imposto in nome del Cluster*/
				oStampa.setSClusterNode(mstrUtil.getCluster());
				
				
				/**Controllo se il Report ï¿½ valido e valorizzo tutte le proprietï¿½ valide*/
				boolean outcome = mstrUtil.isReportValid(oStampa); 					
				if(!outcome){					
					result = new EsitoMstrTO(false,Integer.parseInt(MstrCodedErrors.CODE_REPORT_NOT_AVAILABLE),MstrCodedErrors.MESSAGE_REPORT_NOT_AVAILABLE);
					isReportValid = false;		
				}
			
			}else{
				result = new EsitoMstrTO(false,Integer.parseInt(MstrCodedErrors.CODE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED),MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED);
				TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione2:  "
						+ MstrCodedErrors.CODE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED, MicrostrategyServiceImpl2.class);
			}
			
		}
		String contexWeb=mstrUtil.getSContextWeb();
		if(stampa.getModalita().equals("accessibile"))
			contexWeb=mstrUtil.getSContextAccWeb();
		/*if(isReportValid && !mstrUtil.isWebServerAlive(contexWeb)){					
			return new EsitoMstrTO(false,Integer.parseInt(MstrCodedErrors.CODE_CONN_WEB_SERVER_MSTR_NOT_ESTABLISHED),MstrCodedErrors.MESSAGE_CONN_WEB_SERVER_MSTR_NOT_ESTABLISHED);
		}*/
		result.setConnessioneMstrTO(outConnessioneMstrTO);
        result.setUrlApi(mstrUtil.getSProtocolloWeb()+"://"+mstrUtil.getSServerWeb()+":"+mstrConnectionParam.getMstr_server_port()+"/"+mstrUtil.getSContextWeb()+"/");
		result.setUrlApiAcc(mstrUtil.getSProtocolloWeb()+"://"+mstrUtil.getSServerWeb()+":"+mstrConnectionParam.getMstr_server_port()+"/"+mstrUtil.getSContextAccWeb()+"/");
		
		if (!checkStampePersonali) {
			result.setUrlApi(result.getUrlApi() + oStampa.getSObjectURLApi());
			result.setUrlApiAcc(result.getUrlApiAcc()+ oStampa.getSObjectURLApiAcs());
		}
		
		//String link="http://"+mstrConnectionParam.getMstr_server_ip()+":"+mstrConnectionParam.getMstr_server_port()+"/"+mstrUtil.getSContextWeb()+"/taskAdmin?taskId=getSessionState&taskEnv=xml&taskContentType=xml&server="+mstrConnectionParam.getSServerName()+"&project=Stampa+Entrate&uid="+mstrAdminConnectionParam.getSLoginName()+"&pwd="+mstrAdminConnectionParam.getSPassword();
		//result.setLinkSession(link);
		//recupero livello organizzativo
		DAbilitazStampeLivOrgVO vv = mapper1.getLivelloOrganizzativo(stampa.getCodiceProfiloStampa());
		String rpsUcb = getLivelloOrganizzativo(vv);
		result.setLivOrg(rpsUcb);	
		
		//scrivo sul cronologico
		DCronologicoStampeVO vo = new DCronologicoStampeVO();
		vo.setCODI_PK_USERID(userName);
		vo.setCODI_PK_OBJECT_ID(sObjectId);
		vo.setCODI_OBJECT_TYPE(0);
		vo.setTEXT_OBJECT_NAME(stampa.getNomeStampa());
		vo.setDESC_OBJECT_DESC(stampa.getDescStampa());
		vo.setTEXT_USER_MSTR(userName);
		vo.setROW_CODI_FUNZIONE(stampa.getCodiceFunzioneInExe());
		mapper3.writeCronologico(vo);
		
		return result;
	}

	private String getLivelloOrganizzativo(DAbilitazStampeLivOrgVO vv){
	String rpsUcb = "";
	if (!Util.isEmpty(vv.getCodi_livello_org())) {
		// se il livello organizzativo ï¿½ AMM
		if (vv.getCodi_livello_org()
			.equals("AMM"))
			rpsUcb = "RPS=ALL|UCB=ALL";
		// se il livello organizzativo ï¿½ RPS
		if (vv.getCodi_livello_org()
			.equals("RPS"))
			rpsUcb =
				"RPS=" + vv.getCodi_ragioneria() + "|UCB=ALL";
		// se il livello organizzativo ï¿½ UCB
		if (vv.getCodi_livello_org()
			.equals("UCB"))
			rpsUcb = "RPS=ALL|UCB=" + vv.getCodi_ragioneria();
	}

	return rpsUcb;
	
}
	public void cancellaStampePersonali(ArrayList lista,String userName)throws MstrException{
		MstrConnectionParam mstrUserConnectionParam = null;
		try {
			mstrUserConnectionParam =
				(MstrConnectionParam) mstrConnectionParam.clone();
		} catch (CloneNotSupportedException e) {
		}
		mstrUserConnectionParam.setSLoginName(userName);
		mstrUserConnectionParam.setSPassword(mstrAdminConnectionParam.getSPassword());
		MstrUtils mstrUtil = new MstrUtils(mstrUserConnectionParam);
	
		mstrUtil.Connect();
		try {			
			for( Iterator it = lista.iterator();it.hasNext();)
			{	
				ReportMstrTO obj = (ReportMstrTO)it.next();
				//ReportMstrTO codTO = new ReportMstrTO();
				//codTO.setNameReport(obj.getSObjectName());
				mstrUtil.deletePersonalReport(obj.getNameReport(),userName);
							
			}	    
		} finally {
			mstrUtil.Disconnect();
		}
	}

	@Override
	public EsitoMstrTO getAllReport() throws MstrException, WebObjectsException {
		// TODO Auto-generated method stub
		MstrUtils mstrUtils = null;
		logger.info(" Metodo getAllReport() della classe MicrostrategyServiceImpl2");
		EsitoMstrTO result = new EsitoMstrTO(true,Integer.parseInt(MstrCodedErrors.CODE_NO_ERROR),"Success");
		ArrayList arrayListReport = null;
		try
		{logger.info(" Chiamata al costruttore MstrUtils");
			mstrUtils = new MstrUtils(mstrConnectionParam);
			MstrObject mstrObject = new MstrObject();
			logger.info(" Chiamo metodo connect di MstrUtils");
			if(mstrUtils.Connect()==null)
			{
				result = new EsitoMstrTO(false,Integer.parseInt(MstrCodedErrors.CODE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED),MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED);	
			}else
			{
				if(mstrUtils.isIntellServerAvailable())
				{
					mstrObject.setSClusterNode(mstrUtils.getCluster());
					arrayListReport = mstrUtils.getAllReport(mstrAdminConnectionParam);
					result = new EsitoMstrTO(true,Integer.parseInt(MstrCodedErrors.CODE_NO_ERROR),"Success");
				}
				else
				{
					result = new EsitoMstrTO(false,Integer.parseInt(MstrCodedErrors.CODE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED),MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED);	
				}
			}
		}catch(MstrException mstrException){
				TraceLogger.traceLog(TraceLogger.getERROR(),
						"MSTR Catturata eccezione di tipo MstrException nel  getAllReport() della classe " +
								this.getClass().getName(),MicrostrategyServiceImpl.class);
			   throw mstrException;
		}catch(WebObjectsException webObjEx){
				TraceLogger.traceLog(TraceLogger.getERROR(),
						"MSTR Catturata eccezione di tipo MstrException nel  getAllReport() della classe " +
								this.getClass().getName(),MicrostrategyServiceImpl.class);
				throw new MstrException(MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED);
			}finally {
				mstrUtils.Disconnect();
			}
		result.setResultSearch(arrayListReport);
		return result;
	}

	public MstrConnectionParam getMstrConnectionParam() {
		return mstrConnectionParam;
	}

	public void setMstrConnectionParam(MstrConnectionParam mstrConnectionParam) {
		this.mstrConnectionParam = mstrConnectionParam;
	}

	public MstrConnectionParam getMstrAdminConnectionParam() {
		return mstrAdminConnectionParam;
	}

	public void setMstrAdminConnectionParam(MstrConnectionParam mstrAdminConnectionParam) {
		this.mstrAdminConnectionParam = mstrAdminConnectionParam;
	}
	
}