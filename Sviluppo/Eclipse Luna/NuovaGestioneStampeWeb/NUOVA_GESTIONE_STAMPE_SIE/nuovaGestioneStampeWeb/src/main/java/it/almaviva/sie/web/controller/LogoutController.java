/**
 * 
 */
package it.almaviva.sie.web.controller;

import it.almaviva.sie.business.util.ApplicationException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Teresa
 *
 */
@Controller
public class LogoutController {

	@RequestMapping("/logout.html")
	public String init(HttpServletRequest request, Model model, HttpSession session)
			throws ApplicationException {
		return "logout";
	}
}
