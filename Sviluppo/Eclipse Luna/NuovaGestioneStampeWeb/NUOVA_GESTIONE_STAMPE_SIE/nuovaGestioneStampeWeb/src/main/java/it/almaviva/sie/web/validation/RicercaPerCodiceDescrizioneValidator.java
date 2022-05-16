/**
 * 
 */
package it.almaviva.sie.web.validation;

import it.almaviva.sie.web.form.RicercaPerCodiceDescrizioneForm;

import org.springframework.validation.Errors;

/**
 * @author Teresa
 *
 */
public class RicercaPerCodiceDescrizioneValidator {

	
	public void validate(Object target, Errors errors) {
		RicercaPerCodiceDescrizioneForm myForm=(RicercaPerCodiceDescrizioneForm)target;
		if(myForm.getIndexSelezionato()==null){
			errors.rejectValue("indexSelezionato", "","Selezionare una riga");
		}
		//Non rimuovere questo commento
		//OBIETTIVO
		//conteco_15_05
		//3108
	}
	
}
