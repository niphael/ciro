package com.giano.transforms;

import com.giano.transforms.HeaderBean;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import com.microstrategy.web.app.transforms.AbstractAppTransform;
import com.microstrategy.web.beans.MarkupOutput;
import com.microstrategy.web.beans.RequestKeys;
import com.microstrategy.web.objects.WebClusterAdmin;
import com.microstrategy.web.objects.WebClusters;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebObjectsFactory;

/**
 * @author gianluca
 *
 */
public class SIEHeaderA extends AbstractAppTransform{
	private static String sStaticURLReturnToSIE=null;
	/**
	 * 
	 */
	public SIEHeaderA() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * Questo metodo disegna l'intestazione di tutti gli Header
	 * 
	 * @param MarkupOutput out HTML dell'header per il SIE
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * 
	 * */
	public Class<HeaderBean> getSupportedBeanType() {
		return HeaderBean.class;
	}
	public String getDescription() {
		return "A custom transform that renders header";
	}



	public void transformForRequestSuccessful(MarkupOutput out) {
		
		RequestKeys rk = getRequestKeys();
		if(rk.getValue("param1")==null&&((HeaderBean)_bean).getParam1()!=null){
		rk.add("param1",((HeaderBean)_bean).getParam1());
		}
		if(rk.getValue("param2")==null&&((HeaderBean)_bean).getParam2()!=null){
		rk.add("param2",((HeaderBean)_bean).getParam2());
		}
		if(rk.getValue("documentID")==null&&((HeaderBean)_bean).getDocumentID()!=null){
		rk.add("documentID",((HeaderBean)_bean).getDocumentID());
		}
		if(rk.getValue("reportID")==null&&((HeaderBean)_bean).getReportID()!=null){
		rk.add("reportID",((HeaderBean)_bean).getReportID());
		}
		if(rk.getValue("server")==null&&((HeaderBean)_bean).getServer()!=null){
		rk.add("server",((HeaderBean)_bean).getServer());
		}
		if(rk.getValue("ServerNameG")==null&&((HeaderBean)_bean).getServerNameG()!=null){
		rk.add("ServerNameG",((HeaderBean)_bean).getServerNameG());
		}
		GianoContent gc = new GianoContent();
		
		/*
		 * Attivazione scrittura parametri in get/post/cookies 
		 * 	
		out.append("<!-- ");
		for(int o=0;o<rk.getNameCount();o++){
			out.append(rk.getName(o)+" == "+rk.getValue(rk.getName(o))+"<br>\n");
		}
		out.append(" --> ");*/
	
		/**non scrivo l'intestazione nel caso in cui esporto*/
		if(rk.getValue("executionMode")!=null){			
			if(rk.getValue("executionMode").compareToIgnoreCase("3")==0){
				return;
			}			
		}
		if(rk.getValue("group")!=null){
			if(rk.getValue("group").compareToIgnoreCase("pdf")==0){			
				out.append("<!-- group pdf -->");
				return;
			}
		}
		/**esportazione in pdf*/
		if(rk.getValue("PDFExportSection")!=null){
			return;							
		}
		/*if(rk.getValue("name")!=null){							
			out.append("<!-- name <> null -->");
			return;							
		}*/
		String sURLReturnToSIE=null;
		sURLReturnToSIE=rk.getValue("PARAM2");
		if(sURLReturnToSIE!=null){
			try {
				URLDecoder.decode(sURLReturnToSIE,"UTF-8");
				sStaticURLReturnToSIE=sURLReturnToSIE;
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
		/**scrivo il file di errore generico*/
		GianoError oError = new GianoError();
		oError.writeErrorFile(sStaticURLReturnToSIE);
		/**Riesegui la connessione a IS MSTR*/
		this.reConnectIS(out,rk);
		
		gc.paintHeader(out, rk);		
	}
	/**
	 * Questo metodo si occupa di riconnettere IS MSTR alla parte WEB
	 * 
	 * @param MarkupOutput out HTML dell'header per il SIE
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * 
	 * */
	private void reConnectIS(MarkupOutput out, RequestKeys rk) {
		WebClusterAdmin wca = WebObjectsFactory.getInstance().getClusterAdmin();
	
		//TODO inserire il nome dell'IS da ricollegare a run-time
		String sServerName="";
		if(rk.getValue("Server")!=null){
			sServerName=rk.getValue("Server");	
	
		try {
			WebClusters wcs = wca.getClusters();
			/*out.append("<!-- ");
			out.append("Number of clusters: "+ wca.getClusters().size());*/
			for(int i=0;i<wcs.size();i++){		    	 
				//out.append("Cluster Name: "+ wca.getClusters().get(i).get(0).getNodeName());
				sServerName=wca.getClusters().get(i).get(0).getNodeName();
			}
			//out.append(" ------------------- ");
			wca.connect(sServerName,0,5,50);
				wca.refreshAllClusters();
			//out.append("Number of clusters: "+ wca.getClusters().size());
			for(int i=0;i<wcs.size();i++){
				//out.append("Cluster Name: "+ wca.getClusters().get(i).get(0).getNodeName());
			}
			//out.append(" --> ");
		} catch (WebObjectsException e) {
			//out.append("<!-- Cluster Error! -->");
			e.printStackTrace();
		}
		}
	}
	public void renderShell(MarkupOutput out){
		out.append("<!-- Start Bean Transform -->\n");
		out.append("<div>\n");
		this.transformForRequestSuccessful(out);
		out.append("</div>\n");
		out.append("<!-- End Bean Transform -->\n");
	}
}

