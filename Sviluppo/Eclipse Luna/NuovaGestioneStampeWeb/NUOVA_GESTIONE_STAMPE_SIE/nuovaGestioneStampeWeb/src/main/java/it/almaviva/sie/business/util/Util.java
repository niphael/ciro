package it.almaviva.sie.business.util;

import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.mef.sie.cryptography.SymmetricCipher;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.commons.codec.binary.Base64;



public class Util {
	private final static String DB_SEPARATORE = ">>";
	public static boolean isEmpty(String s) {
		if (s == null || s.trim().equals("")) {
			return true;
		} else {
			return false;
		}
	}
	
	public static ArrayList getCartelleStampe(ArrayList listaStampe){
		ArrayList listaCartelle = new ArrayList();
		String currentDir="";
		Charset utf8charset = Charset.forName("UTF-8");
		for(int i=0;i<listaStampe.size();i++){
			DAnagraficheStampeVO vo = (DAnagraficheStampeVO)listaStampe.get(i);
			String output="";
			String output1="";
			String[] temp = vo.getObject_path().split(DB_SEPARATORE);
			if(!currentDir.equals(temp[1])){
				CodiceDescrizioneTO codice = new CodiceDescrizioneTO();
				try {
					output = new String(temp[1].getBytes("UTF-8"));
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				codice.setCodice(output);
				codice.setDescrizione("Cartella");
				listaCartelle.add(codice);
			}
			currentDir=temp[1];

		}
		return listaCartelle;
	}
	
	public static ArrayList getListaCodiceDescrizione(ArrayList listaStampe){
		ArrayList lista = new ArrayList();
		
		String output="";
		for(int i=0;i<listaStampe.size();i++){
			DAnagraficheStampeVO vo = (DAnagraficheStampeVO)listaStampe.get(i);
			CodiceDescrizioneTO codice = new CodiceDescrizioneTO();
			codice.setCodice(vo.getCodi_pk_object_id());
			codice.setDescrizione(vo.getText_object_name());
			codice.setPath(vo.getObject_path().replace("à", "&agrave;"));
			codice.setDescrizioneObject(vo.getDesc_object_desc());
			lista.add(codice);
		}
		return lista;
	}
	

/*	public static String correggiAccenti(String acc){
		String corr ="";
		if(!Util.isEmpty(acc))
		corr =acc.replaceAll("�", "e'").replaceAll("�", "a'").replaceAll("�", "i'").replaceAll("�", "o'");
		return corr;
		
	}
	public static String cambiaAccenti(String acc){
		String corr ="";
		if(!Util.isEmpty(acc))
		corr =acc.replaceAll("e''", "�").replaceAll("a''", "�").replaceAll("i''", "�").replaceAll("o''", "�");
		return corr;
		
	}*/
	/**
	 * Metodo per cifrare una stringa
	 *  
	 * @param input stringa da cifrare
	 * @param key chieva da utilizzare per la cifratura
	 * @return stringa cifrata
	 * 
	 * @throws Exception
	 */
	public static String cifraParametri(byte[] input, byte[] key,String originale) throws Exception {

		byte[] rpsUcbCipher = null;
		String encoded = null;

		// Cifratura dei parametri
		rpsUcbCipher =
			SymmetricCipher.encrypt(
				input,
				key);
		
		//	BASE64 consente di rappresentare
		// in formato testuale il contenuto di byte
		   byte[] encoded1 = Base64.encodeBase64(rpsUcbCipher);
	         String encodedString = new String(encoded1);
	// codifica una stringa nel formato URL
			encoded = URLEncoder.encode(encodedString, "UTF-8");
	
		
//		/*********** DA ELIMINARE **************/
//		String decoded = URLDecoder.decode(encoded, "UTF-8");
//		//riconverte i bytes da BASE64 a bytes standard da 8 bit
//		BASE64Decoder decoder = new BASE64Decoder();
//		byte[] originalCipher = decoder.decodeBuffer(decoded);
//		byte[] rpsUcbDecipher =
//			SymmetricCipher.decrypt(
//				originalCipher,
//				key); 
//		//byte[] rpsUcbDecipher = SymmetricCipher.decrypt(originalCipher,esitoMstr.getSessionID().getBytes("UTF-8"),rpsUcb.length());
//		String finale = new String(rpsUcbDecipher, "UTF-8");
//		System.out.println("Testo decifrato: "+finale);
//		
//		if (!finale.equals(originale)) {
//			System.out.println("/****************** DECIFRATURA ERRATA *************************/");
//		}
		
		return encoded;
	}
	
	public static String replace(String str, String pattern, String replace) {

		if (isEmpty(str))
			return str;

		int s = 0;
		int e = 0;
		StringBuffer result = new StringBuffer();

		while ((e = str.indexOf(pattern, s)) >= 0) {
			result.append(str.substring(s, e));
			result.append(replace);
			s = e + pattern.length();
		}
		result.append(str.substring(s));
		return result.toString();

	}
	
	/**
	 * 
	 * @return (new java.sql.Date(new java.util.Date().getTime()))
	 */
		public static Date getSystemDate() {
			return (new java.sql.Date(new java.util.Date().getTime()));
		}
}
