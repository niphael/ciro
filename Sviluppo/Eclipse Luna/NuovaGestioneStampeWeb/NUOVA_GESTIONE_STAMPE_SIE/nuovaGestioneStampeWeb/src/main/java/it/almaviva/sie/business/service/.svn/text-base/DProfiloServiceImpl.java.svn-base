package it.almaviva.sie.business.service;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import it.almaviva.sie.business.mappers.DAbilitazioniStampeMapper;
import it.almaviva.sie.business.mappers.DProfiloMapper;
import it.almaviva.sie.business.model.BaseTO;
import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.DAbilitazStampeVO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.DProfiloVO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.TraceLogger;

@Service("dProfiloServiceImpl")
@Transactional
public class DProfiloServiceImpl implements DProfiloService {
	@Autowired
	private DProfiloMapper mapper;
	@Autowired
	private DAbilitazioniStampeMapper mapper1;
	
	@Autowired
	private CronologicoService service2;
	
	@Override
	public Profilo getDettaglioProfilo(String codiProfilo) {
		DProfiloVO vo =mapper.getDettaglioProfilo(codiProfilo);
		Profilo pp = new Profilo();
		pp.setCodi_pk_profilo(codiProfilo);;
		pp.setDesc_profilo(vo.getDesc_profilo());
		pp.setCodi_livello_org(vo.getCodi_livello_org());
		pp.setCodi_ragioneria(vo.getCodi_ragioneria());
		return pp;
	}
	
	 public ArrayList<DProfiloVO> getListaProfiliStampe(){
		 ArrayList<DProfiloVO> listaProfili= mapper.getListaProfiliStampe();
		 return listaProfili;
	 }

	@Override
	public ArrayList<CodiceDescrizioneTO> getListaProfiliStampeDaModificare(Profilo vo)
			throws ApplicationException {
		// TODO Auto-generated method stub
		 ArrayList<DProfiloVO> listaProfili=mapper.getListaProfiliStampeDaModificare(vo);
		 ArrayList lista = new ArrayList();
		 for(int i=0;i<listaProfili.size();i++){
			 DProfiloVO p = (DProfiloVO)listaProfili.get(i);
			 CodiceDescrizioneTO cod = new CodiceDescrizioneTO();
			 cod.setCodice(p.getCodi_pk_profilo());
			 cod.setDescrizione(p.getDesc_profilo());
			 lista.add(cod);
		 }
		return lista;
	}

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public BaseTO modificaProfiloStampe(Profilo p) throws  SQLException {
		// TODO Auto-generated method stub
			// valorizzo l'oggetto DProfiloVO da passare all'update
			DProfiloVO profiloVO = new DProfiloVO();
			profiloVO.setCodi_pk_profilo(p.getCodi_pk_profilo());
			profiloVO.setDesc_profilo(p.getDesc_profilo());
	  
			profiloVO.setROW_CODI_FUNZIONE(p.getFunzione());
			profiloVO.setROW_CREATED_USER_APP(p.getUtente());
			profiloVO.setROW_UPDATED_USER_APP(p.getUtente());
			profiloVO.setROW_TIPO_ELABORAZIONE("M");
			//recuper la Versione
			
			try {
				Integer versione = mapper.getVersione(p.getCodi_pk_profilo());
				//Versione
				profiloVO.setVERSIONE(versione);
				mapper.update(profiloVO);
				DAbilitazStampeVO stampeVO = new DAbilitazStampeVO();
				stampeVO.setCODI_PK_PROFILO(p.getCodi_pk_profilo());
				//elimino tutte le stampe relative al profilo selezionato
				mapper1.delete(stampeVO);
				//reinserisco le stampe
				for(int i=0;i<p.getListaStampe().size();i++){
					DAnagraficheStampeVO vv = (DAnagraficheStampeVO)p.getListaStampe().get(i);
					DAbilitazStampeVO vo = new DAbilitazStampeVO();
					vo.setCODI_PK_PROFILO(p.getCodi_pk_profilo());
					vo.setCODI_PK_OBJECT_ID(vv.getCodi_pk_object_id());
					vo.setVERSIONE(1);
					vo.setROW_CREATED_USER_APP(p.getUtente());
					vo.setROW_CODI_FUNZIONE(p.getFunzione());
					vo.setROW_TIPO_ELABORAZIONE("M");
					mapper1.insert(vo);
				}
				//inserisco cronologico
				service2.write(p);
			} 
			catch (SQLException e) {
				// TODO Auto-generated catch block
				TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
						+ e.getMessage(), DProfiloServiceImpl.class);
				p.setErrorMessage(" Errore sql");
			
			}
			catch (Exception e) {
				// TODO Auto-generated catch block
				TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
						+ e.getMessage(), DProfiloServiceImpl.class);
				p.setErrorMessage(" Errore generico");
			
			}
			
		return p;
	}

}
