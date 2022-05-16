/**
 * 
 */
package it.almaviva.sie.web.validation;

import it.almaviva.conteco.web.validation.common.ValidatorException;
import it.almaviva.sie.web.form.InserimentoDestinatariForm;
import it.almaviva.sie.web.form.RicercaDestinatariForm;

import org.springframework.context.ApplicationContext;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;

/**
 * @author Teresa
 *
 */
public class InserimentoDestinatarioValidator {

	public void validate(Errors errors, RicercaDestinatariForm myForm){
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "descReport", "required", new Object[]{"Titolo Report"});
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "loginMstr", "required", new Object[]{"Login Microstrategy"});
		
	}
	
	public void validate(Errors errors, InserimentoDestinatariForm myForm,ApplicationContext context){
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "nome", "required", new Object[]{"Destinatario"});
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "required", new Object[]{"Email"});
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "amministrazione", "required", new Object[]{"Amministrazione"});
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "periodicita", "required", new Object[]{"Periodicita'"});
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "oggetto", "required", new Object[]{"Oggetto'"});
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "testo", "required", new Object[]{"Testo"});
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "note", "required", new Object[]{"Note"});
		
		if(myForm.getTesto().length()>4000)
			errors.reject("number.max.lenght", new String[] { "Testo" , "4000"}, "");
		if(myForm.getNote().length()>200)
			errors.reject("number.max.lenght", new String[] { "Note" , "200"}, "");
	}
}
