/*
 * Creato il 25-set-06
 *
 */
package it.almaviva.sie.business.service;



import it.almaviva.sie.business.mappers.DCronologicoMapper;
import it.almaviva.sie.business.model.BaseTO;
import it.almaviva.sie.business.model.CronologicoNode;
import it.almaviva.sie.business.model.DCronologicoOnlineModVO;
import it.almaviva.sie.business.util.TraceLogger;

import java.io.ByteArrayInputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thoughtworks.xstream.XStream;


/**
 * @author Pasqualino Serafino (Eidos)
 *
 */
@Service("cronologicoService")
public class CronologicoServiceImpl implements CronologicoService {
	
	@Autowired
	private DCronologicoMapper mapper1;
	
	 public  void write(Object objToWrite) throws Exception {
		boolean gestioneTransazione = false;
		// rappresentazione dell'oggetto secondo
		// uno standard applicativo
		CronologicoNode root = null;
		if (objToWrite instanceof BaseTO) {
			BaseTO parametro = (BaseTO) objToWrite;
			try {
					gestioneTransazione = true;
					// "trasformo" il TO in un CronologicoNode
					root = addNode("", parametro);

					// istanza dello Stream per la
					// scrittura su XML
					XStream xStream = new XStream();
					// Ottengo l'XML dell'oggetto
					String xml = xStream.toXML(root);

					DCronologicoOnlineModVO cronologicoVO =
						new DCronologicoOnlineModVO();
					cronologicoVO.setCODI_PK_USERID(parametro.getUtente());
					cronologicoVO.setROW_CREATED_USER_APP(parametro.getUtente());
					cronologicoVO.setCODI_PK_FUNZIONE(parametro.getFunzione());
					cronologicoVO.setROW_CODI_FUNZIONE(parametro.getFunzione());
					cronologicoVO.setTEXT_MODIFICA("");
					cronologicoVO.setROW_TIPO_ELABORAZIONE("M");
					byte[] temp = parametro.getCronologicoHTML();
					if (temp == null)
						temp = new byte[0];
					ByteArrayInputStream bais = new ByteArrayInputStream(temp);

					//		RIPRISTINARE
					// togliendo la riga commentata e commentando l'altra
					//cronologicoVO.setCompressedHTML( "".getBytes() );
			
					cronologicoVO.setHTML_COMPRESSED(temp);
					mapper1.writeCronologico(cronologicoVO);
		
				}catch (IllegalArgumentException e) {
				TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
						+ e.getMessage(), CronologicoServiceImpl.class);
				e.printStackTrace();

				gestisciTransazione(gestioneTransazione, e);

			} catch (IllegalAccessException e) {
				TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
						+ e.getMessage(), CronologicoServiceImpl.class);
				e.printStackTrace();
				e.printStackTrace();

				TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
						+ e.getMessage(), CronologicoServiceImpl.class);
				e.printStackTrace();
				e.printStackTrace();

				gestisciTransazione(gestioneTransazione, e);
				
			} catch (Exception e) {
				TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
						+ e.getMessage(), CronologicoServiceImpl.class);
				e.printStackTrace();
				e.printStackTrace();

				gestisciTransazione(gestioneTransazione, e);
			}
	 }
		}



	private void gestisciTransazione(boolean gestioneTransazione, Exception e) throws Exception {
		// se l'operazione è in transazione 
		if (gestioneTransazione) {
			// sollevo l'eccezione
			throw new Exception(e.getMessage());
		}
	}
	


	public static CronologicoNode addNode(String label, Object obj)
		throws IllegalArgumentException, IllegalAccessException {
		CronologicoNode result = new CronologicoNode();
		result.setLabel(label);

		if (obj != null) {
			result.setClassName(obj.getClass().getName());

			if (obj instanceof BaseTO) {
				// carico i figli del nodo
				Field[] fieldsDeclared = obj.getClass().getDeclaredFields();
				Field field = null;
				Object fieldValue = null;
				int modifier;

				for (int i = 0; i < fieldsDeclared.length; i++) {
					// field attuale
					field = fieldsDeclared[i];

					modifier = field.getModifiers();

					if (Modifier.isStatic(modifier)
						|| Modifier.isFinal(modifier)) {
						// per adesso ignoro il campo
					} else {
						setFieldAccessible(field, modifier);

						fieldValue = setFieldValue(obj, field, fieldValue);

						if (fieldValue instanceof ArrayList) {
							// istanza del nodo da aggiungere
							CronologicoNode childrenNode =
								new CronologicoNode();
							// imposto il nome della classe del nuovo nodo
							childrenNode.setClassName(
								fieldValue.getClass().getName());
							// imposto la label per il nuovo nodo
							childrenNode.setLabel(field.getName());
							// se il nodo è valorizzato
							if (fieldValue != null) {
								// aggiungo nel nuovo nodo tutti gli
								// elementi
								Object element = null;
								for (int j = 0;
									j < ((ArrayList) fieldValue).size();
									j++) {
									element = ((ArrayList) fieldValue).get(j);
									childrenNode.addChildren(
										addNode("", element));
								}
							}

							result.addChildren(childrenNode);

						} else if (fieldValue instanceof Map) {
							// istanza del nodo da aggiungere
							CronologicoNode childrenNode =
								new CronologicoNode();
							// imposto il nome della classe del nuovo nodo
							childrenNode.setClassName(
								fieldValue.getClass().getName());
							// imposto la label per il nuovo nodo
							childrenNode.setLabel( field.getName());

							// se il nodo è valorizzato
							if (fieldValue != null) {
								// le chiave
								Set keys = ((Map) fieldValue).keySet();
								// iteratore sulle chiavi
								Iterator iter = keys.iterator();

								Object key = null;
								Object element = null;
								while (iter.hasNext()) {
									// chiave dell'hashtable
									key = iter.next();
									// valore abbinato alla chiave
									element = ((Map) fieldValue).get(key);
									// aggiungo l'elemento al figlio
									childrenNode.addChildren(
										addNode("", element));
								}
								// aggiungo il figlio
								result.addChildren(childrenNode);
							}
						} else {
							result.addChildren(
								addNode(field.getName(), fieldValue));
						}
					}

				}
			} else {
				result.setLabel(label);
				result.setValue(obj.toString());

			}
		}

		return result;
	}



	private static void setFieldAccessible(Field field, int modifier) {
		// se l'attributo non è public
		if (!Modifier.isPublic(modifier)) {
			// lo rendo accessibile
			field.setAccessible(true);
		}
	}



	private static Object setFieldValue(Object obj, Field field, Object fieldValue) throws IllegalAccessException {
		// verifico che tipo di campo
		// sto valutando
		if (field.getType().isPrimitive()) {
			// il campo trovato è una primitiva
			fieldValue = getValueFromPrimitive(field, obj);
		} else if (field.getType().isArray()) {
			// il campo trovato è un array
			// DA GESTIRE
		} else {
			// il campo è un Object
			fieldValue = field.get(obj);
		}
		return fieldValue;
	}

	private static String getValueFromPrimitive(Field field, Object obj)
		throws IllegalArgumentException, IllegalAccessException {
		String result = null;

		if (field.getType().equals(Integer.TYPE)) {
			result = "" + field.getInt(obj);
		} else if (field.getType().equals(Boolean.TYPE)) {
			if (field.getBoolean(obj)) {
				result = "SI";
			} else {
				result = "NO";
			}
		} else if (field.getType().equals(Byte.TYPE)) {
			result = "" + field.getByte(obj);
		} else if (field.getType().equals(Character.TYPE)) {
			result = "" + field.getChar(obj);
		} else if (field.getType().equals(Short.TYPE)) {
			result = "" + field.getShort(obj);
		} else if (field.getType().equals(Long.TYPE)) {
			result = "" + field.getLong(obj);
		} else if (field.getType().equals(Float.TYPE)) {
			result = "" + field.getFloat(obj);
		} else if (field.getType().equals(Double.TYPE)) {
			result = "" + field.getDouble(obj);
		} else {
			// impossibile che si verifichi questa condizione
			// però .....
			result = "primitiva non trovata.";
		}

		return result;
	}
}
