/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.47
 * Generated at: 2016-01-05 13:46:41 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import it.almaviva.sie.web.util.WebApplicationConstants;

public final class listaProfili_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.HashMap<java.lang.String,java.lang.Long>(4);
    _jspx_dependants.put("/jsp/include/messaggioErrore.jsp", Long.valueOf(1451995812393L));
    _jspx_dependants.put("/jsp/include/header.jsp", Long.valueOf(1451995812389L));
    _jspx_dependants.put("/WEB-INF/display-tag.tld", Long.valueOf(1451995811612L));
    _jspx_dependants.put("/jsp/include/footer.jsp", Long.valueOf(1451995812397L));
  }

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005ff_005fform_0026_005fmodelAttribute_005fmethod_005faction;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fif_0026_005ftest;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005ff_005fselect_0026_005fpath;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005ff_005foptions_0026_005fitems_005fitemValue_005fitemLabel_005fnobody;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _005fjspx_005ftagPool_005ff_005fform_0026_005fmodelAttribute_005fmethod_005faction = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fc_005fif_0026_005ftest = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005ff_005fselect_0026_005fpath = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005ff_005foptions_0026_005fitems_005fitemValue_005fitemLabel_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005ff_005fform_0026_005fmodelAttribute_005fmethod_005faction.release();
    _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.release();
    _005fjspx_005ftagPool_005ff_005fselect_0026_005fpath.release();
    _005fjspx_005ftagPool_005ff_005foptions_0026_005fitems_005fitemValue_005fitemLabel_005fnobody.release();
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=ISO-8859-1");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write('\r');
      out.write('\n');
      out.write("\r\n");
      out.write("    \r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\" />\r\n");
      out.write("<meta http-equiv=\"expires\" content=\"now\" />\r\n");
      out.write("<meta http-equiv=\"pragma\" content=\"no-cache\" />\r\n");
      out.write("<meta http-equiv=\"Cache-Control\" content=\"no-cache\" />\r\n");
      out.write("<title>SIE - Sistema Informativo Entrate</title>\r\n");
      out.write("<meta http-equiv=\"Content-Style-Type\" content=\"text/css\" />\r\n");
      out.write("<link rel=\"stylesheet\" href=\"");
      out.print(request.getContextPath());
      out.write("/css/style.css\" type=\"text/css\" />\r\n");
      out.write("<link rel=\"stylesheet\" href=\"");
      out.print(request.getContextPath());
      out.write("/css/displaytag-table.css\" type=\"text/css\" />\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("<table><tr><td>\r\n");
      out.write("<img src=\"");
      out.print(request.getContextPath());
      out.write("/img/logo_sie.jpg\" \r\n");
      out.write("  alt=\"SIE - Sistema Informativo Entrate\" />\r\n");
      out.write("</td></tr></table>");
      out.write('\r');
      out.write('\n');
      out.write('	');
      //  f:form
      org.springframework.web.servlet.tags.form.FormTag _jspx_th_f_005fform_005f0 = (org.springframework.web.servlet.tags.form.FormTag) _005fjspx_005ftagPool_005ff_005fform_0026_005fmodelAttribute_005fmethod_005faction.get(org.springframework.web.servlet.tags.form.FormTag.class);
      _jspx_th_f_005fform_005f0.setPageContext(_jspx_page_context);
      _jspx_th_f_005fform_005f0.setParent(null);
      // /jsp/listaProfili.jsp(3,1) name = action type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_f_005fform_005f0.setAction(request.getContextPath() + WebApplicationConstants.VIEW_DETT_REPORT+ "?metodo=init");
      // /jsp/listaProfili.jsp(3,1) name = modelAttribute type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_f_005fform_005f0.setModelAttribute("profiliForm");
      // /jsp/listaProfili.jsp(3,1) name = method type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_f_005fform_005f0.setMethod("post");
      int[] _jspx_push_body_count_f_005fform_005f0 = new int[] { 0 };
      try {
        int _jspx_eval_f_005fform_005f0 = _jspx_th_f_005fform_005f0.doStartTag();
        if (_jspx_eval_f_005fform_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
          do {
            out.write("\r\n");
            out.write("\t\t\r\n");
            out.write("\t\t<table class=\"w100\">\r\n");
            out.write("\t\t<tr><td class=\"w20\">Utente connesso:");
            out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${utente.userName}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
            out.write(" </td>\r\n");
            out.write("\t\t</tr><tr>\r\n");
            out.write("\t\t<td class=\"intestazione2\">Gestione Stampe</td>\r\n");
            out.write("\t\t</tr>\r\n");
            out.write("\t\t\t<tr>\r\n");
            out.write("\t\t\t<td>\r\n");
            out.write("\t\t\t");
            if (_jspx_meth_c_005fif_005f0(_jspx_th_f_005fform_005f0, _jspx_page_context, _jspx_push_body_count_f_005fform_005f0))
              return;
            out.write("\r\n");
            out.write("\t\t<table  class=\"w100 cornice\" >\r\n");
            out.write("\t\t\t\t\t<tr>\r\n");
            out.write("\t\t\t\t\t\t<td colspan=\"2\"> <strong>Selezione Profilo</strong></td>\r\n");
            out.write("\t\t\t\t\t</tr>\r\n");
            out.write("\t\t\t\t\t\t\r\n");
            out.write("\t\t\t\t\t\t<tr>\r\n");
            out.write("\t\t\t\t\t\t\t<td class=\"w15 nowrap\">Profilo</td>\t\t\t\t\t\t\t\r\n");
            out.write("\t\t\t\t\t\t\t<td class=\"w85\">\r\n");
            out.write("\t\t\t\t\t\t\t\t\t\t");
            if (_jspx_meth_f_005fselect_005f0(_jspx_th_f_005fform_005f0, _jspx_page_context, _jspx_push_body_count_f_005fform_005f0))
              return;
            out.write("\r\n");
            out.write("\t\r\n");
            out.write("\t\t\t\t\t\t\t</td>\r\n");
            out.write("\t\t\t\t\t\t</tr>\r\n");
            out.write("\t\t\t\t\t</table>\r\n");
            out.write("\t\t\t\t\t</td></tr>\r\n");
            out.write("\t\t<tr>\r\n");
            out.write("\t\t\t\t\t<td>\r\n");
            out.write("\t\t\t\t\t<table class=\"w100\">\r\n");
            out.write("\t\t\t\t\t\t<tr>\r\n");
            out.write("\r\n");
            out.write("\t\t\t\t\t\t\t<td class=\"w87\">\r\n");
            out.write("\t\t\t\t\t\t\t\r\n");
            out.write("\t\t\t\t\t\t\t<input type=\"submit\" value=\"Avanti\"  class=\"puls\"/>\r\n");
            out.write("\t\t\t\t\t\t</td>\r\n");
            out.write("\r\n");
            out.write("\t\t\t\t\t\t</tr>\r\n");
            out.write("\t\t\t\t\t</table>\r\n");
            out.write("\r\n");
            out.write("\t\t\t\t\t<br />\r\n");
            out.write("\t\t\t\t\t</td>\r\n");
            out.write("\t\t\t\t</tr>\r\n");
            out.write("\t\t\t\t\r\n");
            out.write("\t");
            out.write("<tr>\r\n");
            out.write("<td colspan=\"2\"  class=\"mnulat alignCenter\">\r\n");
            out.write("\t\t\t<table class=\"alignCenter\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\">\t\t\r\n");
            out.write("\t\t\t<tr><td class=\"alignCenter\">Sistema Informativo della Ragioneria Generale dello Stato</td>\t\t\t\r\n");
            out.write("\t\t\t<td><img src=\"");
            out.print(request.getContextPath());
            out.write("/img/logo_rep.gif\" alt=\"\"    style=\" \"/></td>\t\t</tr></table>\r\n");
            out.write("\t\t</td>\r\n");
            out.write("\r\n");
            out.write("\t</tr>\r\n");
            out.write("\r\n");
            out.write("\t\t</table>\r\n");
            out.write("\t");
            int evalDoAfterBody = _jspx_th_f_005fform_005f0.doAfterBody();
            if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
              break;
          } while (true);
        }
        if (_jspx_th_f_005fform_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
          return;
        }
      } catch (java.lang.Throwable _jspx_exception) {
        while (_jspx_push_body_count_f_005fform_005f0[0]-- > 0)
          out = _jspx_page_context.popBody();
        _jspx_th_f_005fform_005f0.doCatch(_jspx_exception);
      } finally {
        _jspx_th_f_005fform_005f0.doFinally();
        _005fjspx_005ftagPool_005ff_005fform_0026_005fmodelAttribute_005fmethod_005faction.reuse(_jspx_th_f_005fform_005f0);
      }
      out.write("\r\n");
      out.write("\t\t</body>\r\n");
      out.write("\t\t</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }

  private boolean _jspx_meth_c_005fif_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_f_005fform_005f0, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_f_005fform_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  c:if
    org.apache.taglibs.standard.tag.rt.core.IfTag _jspx_th_c_005fif_005f0 = (org.apache.taglibs.standard.tag.rt.core.IfTag) _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.get(org.apache.taglibs.standard.tag.rt.core.IfTag.class);
    _jspx_th_c_005fif_005f0.setPageContext(_jspx_page_context);
    _jspx_th_c_005fif_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_f_005fform_005f0);
    // /jsp/include/messaggioErrore.jsp(1,1) name = test type = boolean reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_c_005fif_005f0.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${errore ne null }", java.lang.Boolean.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false)).booleanValue());
    int _jspx_eval_c_005fif_005f0 = _jspx_th_c_005fif_005f0.doStartTag();
    if (_jspx_eval_c_005fif_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      do {
        out.write("\r\n");
        out.write("<li class=\"error\"> ");
        out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${errore}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
        out.write(" </li>\r\n");
        int evalDoAfterBody = _jspx_th_c_005fif_005f0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
    }
    if (_jspx_th_c_005fif_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.reuse(_jspx_th_c_005fif_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.reuse(_jspx_th_c_005fif_005f0);
    return false;
  }

  private boolean _jspx_meth_f_005fselect_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_f_005fform_005f0, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_f_005fform_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  f:select
    org.springframework.web.servlet.tags.form.SelectTag _jspx_th_f_005fselect_005f0 = (org.springframework.web.servlet.tags.form.SelectTag) _005fjspx_005ftagPool_005ff_005fselect_0026_005fpath.get(org.springframework.web.servlet.tags.form.SelectTag.class);
    _jspx_th_f_005fselect_005f0.setPageContext(_jspx_page_context);
    _jspx_th_f_005fselect_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_f_005fform_005f0);
    // /jsp/listaProfili.jsp(21,10) name = path type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_f_005fselect_005f0.setPath("codiProfilo");
    int[] _jspx_push_body_count_f_005fselect_005f0 = new int[] { 0 };
    try {
      int _jspx_eval_f_005fselect_005f0 = _jspx_th_f_005fselect_005f0.doStartTag();
      if (_jspx_eval_f_005fselect_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        do {
          if (_jspx_meth_f_005foptions_005f0(_jspx_th_f_005fselect_005f0, _jspx_page_context, _jspx_push_body_count_f_005fselect_005f0))
            return true;
          int evalDoAfterBody = _jspx_th_f_005fselect_005f0.doAfterBody();
          if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
            break;
        } while (true);
      }
      if (_jspx_th_f_005fselect_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (java.lang.Throwable _jspx_exception) {
      while (_jspx_push_body_count_f_005fselect_005f0[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_f_005fselect_005f0.doCatch(_jspx_exception);
    } finally {
      _jspx_th_f_005fselect_005f0.doFinally();
      _005fjspx_005ftagPool_005ff_005fselect_0026_005fpath.reuse(_jspx_th_f_005fselect_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_f_005foptions_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_f_005fselect_005f0, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_f_005fselect_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  f:options
    org.springframework.web.servlet.tags.form.OptionsTag _jspx_th_f_005foptions_005f0 = (org.springframework.web.servlet.tags.form.OptionsTag) _005fjspx_005ftagPool_005ff_005foptions_0026_005fitems_005fitemValue_005fitemLabel_005fnobody.get(org.springframework.web.servlet.tags.form.OptionsTag.class);
    _jspx_th_f_005foptions_005f0.setPageContext(_jspx_page_context);
    _jspx_th_f_005foptions_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_f_005fselect_005f0);
    // /jsp/listaProfili.jsp(21,39) name = items type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_f_005foptions_005f0.setItems((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${profiliForm.listProfili}", java.lang.Object.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
    // /jsp/listaProfili.jsp(21,39) name = itemValue type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_f_005foptions_005f0.setItemValue("value");
    // /jsp/listaProfili.jsp(21,39) name = itemLabel type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_f_005foptions_005f0.setItemLabel("label");
    int[] _jspx_push_body_count_f_005foptions_005f0 = new int[] { 0 };
    try {
      int _jspx_eval_f_005foptions_005f0 = _jspx_th_f_005foptions_005f0.doStartTag();
      if (_jspx_th_f_005foptions_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (java.lang.Throwable _jspx_exception) {
      while (_jspx_push_body_count_f_005foptions_005f0[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_f_005foptions_005f0.doCatch(_jspx_exception);
    } finally {
      _jspx_th_f_005foptions_005f0.doFinally();
      _005fjspx_005ftagPool_005ff_005foptions_0026_005fitems_005fitemValue_005fitemLabel_005fnobody.reuse(_jspx_th_f_005foptions_005f0);
    }
    return false;
  }
}
