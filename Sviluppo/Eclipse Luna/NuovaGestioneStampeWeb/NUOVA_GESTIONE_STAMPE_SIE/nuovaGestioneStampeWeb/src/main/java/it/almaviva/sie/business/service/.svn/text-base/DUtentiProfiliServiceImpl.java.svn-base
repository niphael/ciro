package it.almaviva.sie.business.service;

import it.almaviva.sie.business.mappers.DUtentiProfiliMapper;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service("dUtentiProfiliService")
public class DUtentiProfiliServiceImpl implements DUtentiProfiliService{

	 @Autowired
	 private DUtentiProfiliMapper mapper;
	
	@Override
	public ArrayList getProfiliByUserName(String userName) {
		// TODO Auto-generated method stub
		ArrayList listaProfili=mapper.getProfiliByUserName(userName);
		return listaProfili;
	}

}
