/**
 * 
 */
package it.almaviva.sie.web.validation;

import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.web.form.GestioneProfiliStampeForm;

import org.springframework.validation.Errors;

/**
 * @author Teresa
 *
 */
public class GestioneProfiliStampeValidator {

	public void validate(Errors errors,GestioneProfiliStampeForm myForm){
		if(!Util.isEmpty(myForm.getCodiProfiloA()) && !Util.isEmpty(myForm.getCodiProfiloDa())){
			if (myForm.getCodiProfiloA().compareTo(myForm.getCodiProfiloDa()) < 0)
				errors.reject("error.firstfield.lower.than.second", new String[] { "A profilo" , "Da Profilo"}, "");
		}
		
	}
}
