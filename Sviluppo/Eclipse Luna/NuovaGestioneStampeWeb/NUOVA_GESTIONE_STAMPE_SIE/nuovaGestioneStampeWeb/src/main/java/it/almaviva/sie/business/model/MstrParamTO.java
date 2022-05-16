/**
 * 
 */
package it.almaviva.sie.business.model;

import java.io.Serializable;

/**
 * @author Teresa
 *
 */
public class MstrParamTO implements Serializable {
	private String parameter;
	private String url;
	private String user;
	private String pwd;
	public String getParameter() {
		return parameter;
	}
	public void setParameter(String parameter) {
		this.parameter = parameter;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	
	

}
