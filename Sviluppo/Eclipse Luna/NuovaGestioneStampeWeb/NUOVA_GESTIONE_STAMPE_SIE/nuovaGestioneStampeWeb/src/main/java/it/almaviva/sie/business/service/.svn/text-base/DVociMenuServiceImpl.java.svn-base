package it.almaviva.sie.business.service;

import java.util.ArrayList;

import it.almaviva.sie.business.mappers.DVociMenuMapper;
import it.almaviva.sie.business.model.DAnagraficaVociMenuVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("dVociMenuService")
public class DVociMenuServiceImpl implements DVociMenuService{
	 @Autowired
	 private DVociMenuMapper mapper;

	@Override
	public ArrayList<DAnagraficaVociMenuVO> getListaVociMenu(String username) {
		// TODO Auto-generated method stub
		ArrayList<DAnagraficaVociMenuVO> listaVoci = mapper.getListaVociMenu(username);
		return listaVoci;
	}
}
