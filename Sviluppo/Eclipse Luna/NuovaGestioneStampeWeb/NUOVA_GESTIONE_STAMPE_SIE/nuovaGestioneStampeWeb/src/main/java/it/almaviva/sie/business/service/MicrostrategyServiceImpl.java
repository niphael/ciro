package it.almaviva.sie.business.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Vector;

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

import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsException;
@Service("microstrategyService")
public class MicrostrategyServiceImpl extends MicrostrategyServiceImpl2 implements MicrostrategyService {
	

	@Autowired
	private DParametriApplicazioneMapper mapper;
	
	/**	 
	 *  Controlla se un utente ï¿½ giï¿½ esistente in  Microstrategy,
	 *  altrimenti lo crea
	 *   
	 *  @throws MstrException, WebObjectsException  
	 */
	public void checkUser(String userName, String fullName) throws MstrException, WebObjectsException {
		
		MstrUtils mstrUtil = new  MstrUtils(getMstrAdminConnectionParam());
        mstrUtil.createUser(userName, fullName, getMstrAdminConnectionParam().getSPassword(), getMstrAdminConnectionParam().getGrp_Save_Name());
	}

	private MstrConnectionParam getParametriConnessione(boolean admin)throws MstrException {
		ArrayList listaParametri=mapper.getParametriApplicazione();
		MstrConnectionParam mstrConnectionParam = new MstrConnectionParam();
		for(int i=0;i<listaParametri.size();i++){
			DParametriApplicazioneVO vo = (DParametriApplicazioneVO)listaParametri.get(i);
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_SERVER))
			{
				mstrConnectionParam.setSServerName(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_PORTA))
			{
				mstrConnectionParam.setIServerPort(new Integer(vo.getText_valore_parametro()));
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_SERVER_IP))
			{
				mstrConnectionParam.setMstr_server_ip(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_SERVER_PORT))
			{
				mstrConnectionParam.setMstr_server_port(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_GRP_DEST_REP)){
				mstrConnectionParam.setGrp_dest_rep(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.URL_STAMPE_SIE)){
				mstrConnectionParam.setUrl_stampe_sie(vo.getText_valore_parametro());
			}
			if (admin) {
				if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_ADM_USER))
				{
					mstrConnectionParam.setSLoginName(vo.getText_valore_parametro());
				}
				if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_ADM_PASSWD))
				{
					mstrConnectionParam.setSPassword(vo.getText_valore_parametro());
				}
				if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_GRP_SAVE))
				{
					mstrConnectionParam.setGrp_Save_Name(vo.getText_valore_parametro());
				}
				if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_GRP_NO_SAVE))
				{
					mstrConnectionParam.setGrp_No_Save_Name(vo.getText_valore_parametro());
				}
			} else {
				if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_USER))
				{
					mstrConnectionParam.setSLoginName(vo.getText_valore_parametro());
				}
				if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_PASSWD))
				{
					mstrConnectionParam.setSPassword(vo.getText_valore_parametro());
				}
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_CONTESTO_ACS))
			{
				mstrConnectionParam.setSContextAccWeb(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_PRJNAME))
			{
				mstrConnectionParam.setSProjectName(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_ID_ROOT))
			{
				mstrConnectionParam.setSIdRoot(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_SERVER_WEB))
			{
				mstrConnectionParam.setSServerWeb(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_PORTA_WEB))
				{
				mstrConnectionParam.setIServerPortWeb(new Integer(vo.getText_valore_parametro()));
				}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_CONTESTO_WEB))
			{
				mstrConnectionParam.setSContextWeb(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_PAGE_WEB))
			{
				mstrConnectionParam.setSPageWeb(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.MSTR_PROTOCOLLO))
			{
				mstrConnectionParam.setSProtocolloWeb(vo.getText_valore_parametro());
			}
		}
	
		return mstrConnectionParam;
	}
	
	/**
	 * 	 
	 *  Restuisce gli username di Microstrategy 
	 * 
	 *  @return ArrayList: restituisce gli username di Microstrategy  
	 * 
	 *  @throws MstrException
	 *  
	 */	
	public ArrayList getListaLoginMstr(ParametriCodiceDescrizioneTO parametri) throws MstrException{
		ArrayList list = new ArrayList();
		try{
			MstrUtils mstrUtil = new  MstrUtils(getMstrAdminConnectionParam());
			ArrayList listaOrdinata;
			try {
				listaOrdinata = (ArrayList) mstrUtil.getLoginMSTR( getMstrAdminConnectionParam().getGrp_dest_rep() );
				Iterator it = listaOrdinata.iterator();
				int i=0;
				boolean add = false;
				while (it.hasNext()) {
					String appo = (String)it.next();
					add = false;
					if(Util.isEmpty(parametri.getDescrizione().toUpperCase())){
						add = true;
					}else if(appo.toUpperCase().indexOf(parametri.getDescrizione().toUpperCase())>=0){
						add = true;
					}
					if(add){
						if(i==8) i=0;
						CodiceDescrizioneTO codVO1 = new CodiceDescrizioneTO();
						//costruisco il codice html
						codVO1.setCodice("");
						codVO1.setDescrizione(appo);
						list.add(codVO1);
						i++;	
					}
				}
			} catch (WebObjectsException e) {
				// TODO Blocco catch generato automaticamente
				e.printStackTrace();
			}
		} catch( MstrException mstrException){
			TraceLogger.traceLog(TraceLogger.getERROR(),
					"MSTR Catturata eccezione di tipo MstrException nel  getAllReport() della classe " +
							this.getClass().getName(),MicrostrategyServiceImpl.class);
		   throw mstrException;	
			}
		return list;
	}
	@Override
	public ArrayList getElencoStampePersonali(String userName)
			throws MstrException {
		// TODO Auto-generated method stub
		MstrConnectionParam mstrUserConnectionParam = null;
			try {
			mstrUserConnectionParam =
				(MstrConnectionParam) getMstrConnectionParam().clone();
			} catch (CloneNotSupportedException e) {
		}
			//esercizio
		//mstrUserConnectionParam.setSLoginName(userName);
			//sviluppo
			mstrUserConnectionParam.setSLoginName(getMstrAdminConnectionParam().getSLoginName());
		mstrUserConnectionParam.setSPassword(getMstrAdminConnectionParam().getSPassword());
		MstrUtils mstrUtil = new MstrUtils(mstrUserConnectionParam);
	
		mstrUtil.Connect();
		ArrayList lista = null;
		try {			
			Vector stampe = mstrUtil.getPersonalReport();
			lista = new ArrayList(stampe.size());
			for (Iterator i = stampe.iterator(); i.hasNext();) {
				MstrObject obj = (MstrObject)i.next();
				ReportMstrTO codTO = new ReportMstrTO();
				codTO.setDescriptionReport(obj.getSObjectDesc());
				codTO.setIdReport(obj.getSObjectID());
				codTO.setNameReport(obj.getSObjectName());
				codTO.setUrlAccReport(obj.getSObjectURLApiAcs());
				codTO.setUrlReport(obj.getSObjectURLApi());
			
				lista.add(codTO);
			}

		
		
		} finally {
			mstrUtil.Disconnect();
		}
		
		
		
		return lista;
	}

	@Override
	public void impostaParametriConnessione() throws MstrException {
		// TODO Auto-generated method stub
		setMstrAdminConnectionParam(getParametriConnessione(true));
		setMstrConnectionParam(getParametriConnessione(false));
		
	}
	public EsitoMstrTO getProspetto(String sObjectId,String sObjectType,  ConnessioneMstrTO inConnessioneMstrTO, String userName,VisualizzaStampaTO stampa) throws MstrException{
		EsitoMstrTO result = new EsitoMstrTO(true,Integer.parseInt("0"),"Success");
		boolean checkStampePersonali = false;
		MstrUtils mstrUtil = null;
		try {
			MstrConnectionParam mstrUserConnectionParam = (MstrConnectionParam)getMstrConnectionParam().clone();
			mstrUserConnectionParam.setSLoginName(getMstrAdminConnectionParam().getSLoginName());
			mstrUserConnectionParam.setSPassword(getMstrAdminConnectionParam().getSPassword());
			mstrUtil = new  MstrUtils(mstrUserConnectionParam);
		} catch (CloneNotSupportedException e) {
		}
		
		MstrObject oStampa=new MstrObject();
		oStampa.setSObjectID(sObjectId);
		oStampa.setIObjectType(new Integer(sObjectType).intValue());
		ConnessioneMstrTO outConnessioneMstrTO = null;	
		WebIServerSession serverSession = null;	
		if((outConnessioneMstrTO = mstrUtil.Connect(inConnessioneMstrTO)) == null){			
			//return 1;
			result = new EsitoMstrTO(false,Integer.parseInt(MstrCodedErrors.CODE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED),MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED);
					
		} else if (!checkStampePersonali){
			if(mstrUtil.isIntellServerAvailable()){
				/**Imposto in nome del Cluster*/
				oStampa.setSClusterNode(mstrUtil.getCluster());
				boolean isReportValid = true;
				/**Controllo se il Report ï¿½ valido e valorizzo tutte le proprietï¿½ valide*/
				boolean outcome = mstrUtil.isProspettoValid(oStampa); 	
				if(!outcome){					
					result = new EsitoMstrTO(false,Integer.parseInt(MstrCodedErrors.CODE_REPORT_NOT_AVAILABLE),MstrCodedErrors.MESSAGE_REPORT_NOT_AVAILABLE);
					isReportValid = false;		
				}
				String contexWeb=mstrUtil.getSContextWeb();
				/*if(isReportValid && !mstrUtil.isWebServerAlive(contexWeb)){					
					return new EsitoMstrTO(false,Integer.parseInt(MstrCodedErrors.CODE_CONN_WEB_SERVER_MSTR_NOT_ESTABLISHED),MstrCodedErrors.MESSAGE_CONN_WEB_SERVER_MSTR_NOT_ESTABLISHED);		
				}*/
			}else{
				result = new EsitoMstrTO(false,Integer.parseInt(MstrCodedErrors.CODE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED),MstrCodedErrors.MESSAGE_CONN_INTELLIGENCE_SERVER_NOT_ESTABLISHED);	
			}
		}
			result.setConnessioneMstrTO(outConnessioneMstrTO);
		    result.setUrlApi(mstrUtil.getSProtocolloWeb()+"://"+mstrUtil.getSServerWeb()+":"+getMstrConnectionParam().getMstr_server_port()+"/"+mstrUtil.getSContextWeb()+"/");
			
			if (!checkStampePersonali) {
				result.setUrlApi(result.getUrlApi() + oStampa.getSObjectURLApi());
			}
		return result;
		
	}

	@Override
	public String getUrlStampeSie() 	throws MstrException {
		// TODO Auto-generated method stub
		MstrConnectionParam mstrUserConnectionParam = null;
			try {
			mstrUserConnectionParam =
				(MstrConnectionParam) getMstrConnectionParam().clone();
			} catch (CloneNotSupportedException e) {
				return "";
		}
			return mstrUserConnectionParam.getUrl_stampe_sie();
	}

	
}