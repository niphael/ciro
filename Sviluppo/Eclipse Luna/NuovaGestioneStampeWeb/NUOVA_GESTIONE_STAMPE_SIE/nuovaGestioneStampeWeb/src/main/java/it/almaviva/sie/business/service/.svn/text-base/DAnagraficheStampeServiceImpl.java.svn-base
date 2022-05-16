package it.almaviva.sie.business.service;

import it.almaviva.sie.business.exception.MstrException;
import it.almaviva.sie.business.mappers.DAnagraficaStampeMapper;
import it.almaviva.sie.business.mappers.DParametriApplicazioneMapper;
import it.almaviva.sie.business.model.BaseTO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.DParametriApplicazioneVO;
import it.almaviva.sie.business.model.EsitoMstrTO;
import it.almaviva.sie.business.model.MstrConnectionParam;
import it.almaviva.sie.business.model.ReportMstrTO;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.MstrCodedErrors;
import it.almaviva.sie.business.util.MstrCostanti;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.web.controller.StampeTO;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.util.StringTokenizer;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.microstrategy.web.objects.WebObjectsException;
@Service("dAnagraficheStampeServiceImpl")
public class DAnagraficheStampeServiceImpl extends DAnagraficheStampeServiceImpl2 implements DAnagraficaStampeService {

    @Autowired
	private DAnagraficaStampeMapper mapper;
	@Autowired
	private DParametriApplicazioneMapper mapper2;
	@Autowired
	private MicrostrategyService service;
	private Logger logger = Logger.getLogger(this.getClass());
	@Override
	public ArrayList getStampeForProfilo(
			String codiProfilo) {
		// TODO Auto-generated method stub
		ArrayList listaStampe=mapper.getStampeForProfilo(codiProfilo);
		for(int i=0;i<listaStampe.size();i++){
			DAnagraficheStampeVO vv = (DAnagraficheStampeVO)listaStampe.get(i);
			vv.setObject_path(vv.getObject_path());
		}
		return listaStampe;
	}
	
	@Override
	public ArrayList getListaStampeTotale() {
		// TODO Auto-generated method stub
		ArrayList listaStampe=mapper.getListaStampeTotale();
		return listaStampe;
	}
	@Override
	public ArrayList getListaTitoliReport(
			DAnagraficheStampeVO vo) {
		// TODO Auto-generated method stub
		ArrayList listaStampe= new ArrayList();
		//Richiamo query che restituisce la lista delle stampe
		listaStampe=mapper.getListaTitoliReport(vo);
		
		return listaStampe;
	}
	@Override
	public ArrayList getListaStampe(
			DAnagraficheStampeVO vo) {
		// TODO Auto-generated method stub
		ArrayList listaStampe= new ArrayList();
		//Richiamo query che restituisce la lista delle stampe
		listaStampe=mapper.getListaStampe(vo);
	
		return listaStampe;
	}
	
	@Override
	public ArrayList getListaStampeNew(
			DAnagraficheStampeVO vo) {
		// TODO Auto-generated method stub
		ArrayList listaStampe= new ArrayList();
		//Richiamo query che restituisce la lista delle stampe
		listaStampe=mapper.getListaStampeNew(vo);
		HashMap mappa = new HashMap();
		int x=0;
		String path="";
		int tok =0;
		String path1="";
		String pathNew="";
		for(int i=0;i<listaStampe.size();i++){
			tok=0;
			DAnagraficheStampeVO vv = (DAnagraficheStampeVO)listaStampe.get(i);
			
			if(!vv.getObject_path().equals(vo.getObject_path())){
				//vv.setCodi_pk_object_id("000"+x);
				StringTokenizer st1 = new StringTokenizer(vo.getObject_path(),">>");
				StringTokenizer st = new StringTokenizer(vv.getObject_path(),">>");
				int t= st.countTokens();
				int t1= st1.countTokens();
				
				if(t1==1){
						while (st.hasMoreElements()){
							tok++;
							path1=st.nextToken();	
							if(tok==2)
								pathNew=path1;	
						}
					
					
				}
				if(t1==2){
					if(t==3){
						while (st.hasMoreElements()){
							tok++;
							path1=st.nextToken();	
							if(tok==3)
								pathNew=path1;	
						}
					
					}
				}
				
				
				
				//vv.setText_object_name(vv.getObject_path().substring(vo.getObject_path().length()+2,vv.getObject_path().length()));
				vv.setObject_path(vo.getObject_path()+">>"+pathNew);
				vv.setText_object_name(pathNew);
				vv.setDesc_object_desc("Cartella");
				path=vv.getObject_path();
				if(!mappa.containsKey(vv) && !Util.isEmpty(vv.getText_object_name())){
					mappa.put(vv, vv);
				}
			}
			
			
		}
		ArrayList res = new ArrayList(mappa.values());
		Collections.sort(res);
		return res;
	}
	@Override
	public DAnagraficheStampeVO getStampa(String codiId){
		// TODO Auto-generated method stub
		//Richiamo query che restituisce il dettaglio della stampa
		return mapper.getStampa(codiId);
	}
	
	public MstrConnectionParam getParametriConnessione()throws MstrException {
		ArrayList listaParametri=mapper2.getParametriApplicazione();
		MstrConnectionParam mstrConnectionParam = new MstrConnectionParam();
		for(int i=0;i<listaParametri.size();i++){
			DParametriApplicazioneVO vo = (DParametriApplicazioneVO)listaParametri.get(i);
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.IP_SERVER_SIE))
			{
				mstrConnectionParam.setIp_server_sie(vo.getText_valore_parametro());
			}
			if(vo.getCodi_pk_parametro().equals(MstrCostanti.PORTA_SERVER_SIE))
			{
				mstrConnectionParam.setPorta_server_sie(vo.getText_valore_parametro());
			}
		
		}
		return mstrConnectionParam;
	}

	@Override
	public boolean aggiornaProfili(String utente) throws WebObjectsException, ApplicationException {
		// TODO Auto-generated method stub
		ArrayList<DAnagraficheStampeVO> listaStampe = getListaStampeTotale();
		Set db = new HashSet();
		boolean bContinue = false;
		int returnCode;
		ArrayList listReport = null;
		try{
		for(int i=0;i<listaStampe.size();i++){
			DAnagraficheStampeVO vo = (DAnagraficheStampeVO)listaStampe.get(i);	
			db.add(vo.getCodi_pk_object_id());
		}
		if (true)
		{
			logger.info(" Chiamata al metodo getAllReport()");
			//Ottengo tutti i report da Microstrategy
			EsitoMstrTO baseTO = (EsitoMstrTO) service.getAllReport();
			returnCode = Integer.parseInt(MstrCodedErrors.CODE_NO_ERROR);
			//Controllo se ci sono stati degli errori durante la chiamata a Microstrategy
			if (baseTO.getValore() == returnCode) 
			{
				listReport = baseTO.getResultSearch();
				//Per ogni singolo ObjectID trovato dentro MSTR devo controllare se presente
				//dentro DB. Se si devo effettuare l'update del campo FLAG_STAMPA_ATTIVA a 1,
				//altrimenti devo effettuare il normale inserimento	
				for(int i = 0; i<listReport.size();i++)
				{
					//anagraficaStampeVO = findObjByID(listReport.get(i));
					//if(anagraficaStampeVO != null)
					boolean b = db.remove(((ReportMstrTO)listReport.get(i)).getIdReport());
					if (b)
					{
						//Report trovato dentro MSTR e trovato dentro DB effettuo l'aggiornamento dei dati
//						if(updateFlagStampaAttiva(listReport.get(i)))
//						{
//							bContinue = true;
//						}
						bContinue = true;
					}
					else
					{
						//Report trovato dentro MSTR e non trovato dentro DB effettuo il normale inserimento
						insertReportOnTable(listReport.get(i),utente);
						
					}
				}
				Iterator it2 = db.iterator();
				while(it2.hasNext()) {
					updateFlagStampaNoAttiva((String)it2.next());
				}
			}	
			}
		}catch (MstrException mstrException) {
			TraceLogger.traceLog(TraceLogger.getERROR(),
					"MSTR Catturata eccezione di tipo MstrException nel  aggiornaProfili() della classe " +
							this.getClass().getName(),DAnagraficheStampeServiceImpl.class);
				bContinue = false;
				throw mstrException;
			} catch (ApplicationException sieEx) {
				TraceLogger.traceLog(TraceLogger.getERROR(),
						"MSTR Catturata eccezione di tipo MstrException nel  aggiornaProfili() della classe " +
								this.getClass().getName(),DAnagraficheStampeServiceImpl.class);
				bContinue = false;
				throw sieEx;
			}
		return bContinue;
	}
	
	
	private void updateFlagStampaNoAttiva(String id)throws ApplicationException {
		mapper.updateFlagStampaNoAttiva(id);
	}
	  /**
		* 	 
		* Metodo che ritorna
		* 
		* @return
		* 
		* @throws ApplicationSIEExcetion
		* 
		*/
		private void insertReportOnTable(Object obj,String utente)
			throws ApplicationException {
			DAnagraficheStampeVO anagraficaStampeVO = new DAnagraficheStampeVO();
			ReportMstrTO reportMstrTO = (ReportMstrTO)obj;
				anagraficaStampeVO.setCodi_pk_object_id(reportMstrTO.getIdReport());
				anagraficaStampeVO.setCodi_object_type(reportMstrTO.getTypeObject());
				anagraficaStampeVO.setText_object_name(reportMstrTO.getDescriptionReport().replaceAll("'", "''"));
				anagraficaStampeVO.setDesc_object_desc(reportMstrTO.getDescriptionDocument().replaceAll("'", "''"));
			    anagraficaStampeVO.setObject_path(subPathReport(reportMstrTO.getPath()));
				anagraficaStampeVO.setText_url_api(reportMstrTO.getUrlReport());
				anagraficaStampeVO.setNUME_POSIZIONE_ELENCO(reportMstrTO.getNumeroPosizioneElenco());
				anagraficaStampeVO.setROW_CREATED_USER_APP(utente);
				anagraficaStampeVO.setROW_CODI_FUNZIONE("ALLIN_REPORT");
				mapper.insertDAnagraficaStampe(anagraficaStampeVO);
		
		}
		private String subPathReport(String path){
//			String oldPath = "Stampa Entrate>>Oggetti condivisi>>Report>>Stampe per SIE";		
//			return  path.replaceAll(oldPath, "") ;
			java.util.regex.Pattern p = java.util.regex.Pattern.compile("^([\\w\\s]+>>){4}");
			java.util.regex.Matcher m = p.matcher(path);
			String s = ">>" + m.replaceFirst("");
			return s;
		}
	
}
