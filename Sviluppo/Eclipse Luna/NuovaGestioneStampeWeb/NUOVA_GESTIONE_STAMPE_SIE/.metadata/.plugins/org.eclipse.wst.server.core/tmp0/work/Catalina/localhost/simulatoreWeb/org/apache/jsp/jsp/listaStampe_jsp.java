/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.47
 * Generated at: 2016-01-05 13:46:45 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import it.almaviva.sie.web.util.WebApplicationConstants;

public final class listaStampe_jsp extends org.apache.jasper.runtime.HttpJspBase
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
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005ff_005finput_0026_005fsize_005fpath_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fdisplay_005ftable_0026_005frequestURI_005fpagesize_005fname_005fid_005fexcludedParams_005fclass;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fproperty_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fclass;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005ff_005fradiobutton_0026_005fvalue_005fpath_005fnobody;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _005fjspx_005ftagPool_005ff_005fform_0026_005fmodelAttribute_005fmethod_005faction = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fc_005fif_0026_005ftest = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005ff_005finput_0026_005fsize_005fpath_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fdisplay_005ftable_0026_005frequestURI_005fpagesize_005fname_005fid_005fexcludedParams_005fclass = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fproperty_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fclass = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005ff_005fradiobutton_0026_005fvalue_005fpath_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005ff_005fform_0026_005fmodelAttribute_005fmethod_005faction.release();
    _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.release();
    _005fjspx_005ftagPool_005ff_005finput_0026_005fsize_005fpath_005fnobody.release();
    _005fjspx_005ftagPool_005fdisplay_005ftable_0026_005frequestURI_005fpagesize_005fname_005fid_005fexcludedParams_005fclass.release();
    _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fproperty_005fnobody.release();
    _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fclass.release();
    _005fjspx_005ftagPool_005ff_005fradiobutton_0026_005fvalue_005fpath_005fnobody.release();
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
      out.write("\r\n");
      out.write("\r\n");
      out.write("\t");
      //  f:form
      org.springframework.web.servlet.tags.form.FormTag _jspx_th_f_005fform_005f0 = (org.springframework.web.servlet.tags.form.FormTag) _005fjspx_005ftagPool_005ff_005fform_0026_005fmodelAttribute_005fmethod_005faction.get(org.springframework.web.servlet.tags.form.FormTag.class);
      _jspx_th_f_005fform_005f0.setPageContext(_jspx_page_context);
      _jspx_th_f_005fform_005f0.setParent(null);
      // /jsp/listaStampe.jsp(4,1) name = action type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_f_005fform_005f0.setAction(request.getContextPath() + WebApplicationConstants.RICERCA_STAMPE);
      // /jsp/listaStampe.jsp(4,1) name = modelAttribute type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_f_005fform_005f0.setModelAttribute("ricercaPerCodiceDescrizioneForm");
      // /jsp/listaStampe.jsp(4,1) name = method type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_f_005fform_005f0.setMethod("post");
      int[] _jspx_push_body_count_f_005fform_005f0 = new int[] { 0 };
      try {
        int _jspx_eval_f_005fform_005f0 = _jspx_th_f_005fform_005f0.doStartTag();
        if (_jspx_eval_f_005fform_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
          do {
            out.write("\r\n");
            out.write("\t\r\n");
            out.write("\t\t<table class=\"w100\">\r\n");
            out.write("\t\t<tr><td class=\"w20\">Utente connesso:");
            out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${utente.userName}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
            out.write(" </td>\r\n");
            out.write("\t\t</tr><tr>\r\n");
            out.write("\t\t<td class=\"intestazione2\">Gestione Stampe</td>\r\n");
            out.write("\t\t</tr>\r\n");
            out.write("\t\t<tr>\r\n");
            out.write("\t\t<td>\r\n");
            out.write("\t\t");
            if (_jspx_meth_c_005fif_005f0(_jspx_th_f_005fform_005f0, _jspx_page_context, _jspx_push_body_count_f_005fform_005f0))
              return;
            out.write("\r\n");
            out.write("\t\r\n");
            out.write("\t\t</td>\r\n");
            out.write("\t\t\r\n");
            out.write("\t\t</tr>\r\n");
            out.write("\t\t  <tr>\r\n");
            out.write("\t\t\t\t\t      <td colspan=\"4\">Le stampe contrassegnate con (Rs) sono Report Services</td>\r\n");
            out.write("\t\t\t\t       </tr>  \r\n");
            out.write("\t\t\t\t          <tr><td>\r\n");
            out.write("\t\t                <table class=\"w100 cornice\">\r\n");
            out.write("\t\t                  <tr><td><strong>\r\n");
            out.write("\t\t                     Ricerca Codice  Stampa con Percorso </strong></td></tr>\r\n");
            out.write("\t\t                  <tr>\r\n");
            out.write("\t\t                    <td class=\"alignTop\"><table class=\"w100\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n");
            out.write("\t\t                        <tr>\r\n");
            out.write("\t\t                          <td class=\"w15\"><label for=\"descrizione\">Descrizione</label></td>\r\n");
            out.write("\t\t                          <td class=\"w75\">\r\n");
            out.write("\t\t                          ");
            if (_jspx_meth_f_005finput_005f0(_jspx_th_f_005fform_005f0, _jspx_page_context, _jspx_push_body_count_f_005fform_005f0))
              return;
            out.write("\r\n");
            out.write("\t\t                          </td>\r\n");
            out.write("\t\t                        </tr>\r\n");
            out.write("\t\t                    </table>\r\n");
            out.write("\t\t                    </td></tr></table>\r\n");
            out.write("\t\t                       <table class=\"w100\" border=\"0\">\r\n");
            out.write("\t\t                    <tr>\r\n");
            out.write("\t\t                       <td class=\"alignLeft\">\r\n");
            out.write("\t\t                     <input type=\"submit\" value=\"Cerca\"  class=\"puls\" name=\"metodo\" />\r\n");
            out.write("\t\t                      </td>\r\n");
            out.write("\t\t\t\t\t          <td class=\"alignRight\">\r\n");
            out.write("\t\t                      <input type=\"submit\" value=\"Ritorna\"  class=\"puls\" name=\"metodo\" />\r\n");
            out.write("\t\t                      </td>\r\n");
            out.write("\t\t                    </tr>\r\n");
            out.write("\t\t                </table>\r\n");
            out.write("\t\t                    </td>\r\n");
            out.write("\t\t                  </tr>  \r\n");
            out.write("\t\t\t\t       \r\n");
            out.write("\t\t\t<tr>\r\n");
            out.write("\t\t\t<td>\r\n");
            out.write("\t\t");
            //  display:table
            org.displaytag.tags.TableTag _jspx_th_display_005ftable_005f0 = (org.displaytag.tags.TableTag) _005fjspx_005ftagPool_005fdisplay_005ftable_0026_005frequestURI_005fpagesize_005fname_005fid_005fexcludedParams_005fclass.get(org.displaytag.tags.TableTag.class);
            _jspx_th_display_005ftable_005f0.setPageContext(_jspx_page_context);
            _jspx_th_display_005ftable_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_f_005fform_005f0);
            // /jsp/listaStampe.jsp(50,2) name = requestURI type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
            _jspx_th_display_005ftable_005f0.setRequestURI("/ricercaStampe.html?metodo=scorriLista");
            // /jsp/listaStampe.jsp(50,2) name = id type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
            _jspx_th_display_005ftable_005f0.setUid("item");
            // /jsp/listaStampe.jsp(50,2) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
            _jspx_th_display_005ftable_005f0.setName((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${ listaStampe }", java.lang.Object.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
            // /jsp/listaStampe.jsp(50,2) name = class type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
            _jspx_th_display_005ftable_005f0.setClass("tableRicerca w100");
            // /jsp/listaStampe.jsp(50,2) name = pagesize type = int reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
            _jspx_th_display_005ftable_005f0.setPagesize(8);
            // /jsp/listaStampe.jsp(50,2) name = excludedParams type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
            _jspx_th_display_005ftable_005f0.setExcludedParams("*");
            int _jspx_eval_display_005ftable_005f0 = _jspx_th_display_005ftable_005f0.doStartTag();
            if (_jspx_eval_display_005ftable_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
              java.lang.Object item = null;
              java.lang.Integer item_rowNum = null;
              if (_jspx_eval_display_005ftable_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
                out = _jspx_page_context.pushBody();
                _jspx_push_body_count_f_005fform_005f0[0]++;
                _jspx_th_display_005ftable_005f0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
                _jspx_th_display_005ftable_005f0.doInitBody();
              }
              item = (java.lang.Object) _jspx_page_context.findAttribute("item");
              item_rowNum = (java.lang.Integer) _jspx_page_context.findAttribute("item_rowNum");
              do {
                out.write("\r\n");
                out.write("\t\t\t\t\t\t\t\t\t\t");
                if (_jspx_meth_display_005fcolumn_005f0(_jspx_th_display_005ftable_005f0, _jspx_page_context, _jspx_push_body_count_f_005fform_005f0))
                  return;
                out.write("\r\n");
                out.write("\t\t\t\t\t\t\t\t\t");
                if (_jspx_meth_display_005fcolumn_005f1(_jspx_th_display_005ftable_005f0, _jspx_page_context, _jspx_push_body_count_f_005fform_005f0))
                  return;
                out.write("\t\r\n");
                out.write("\t\t\t\t\t\t\t\t");
                if (_jspx_meth_display_005fcolumn_005f2(_jspx_th_display_005ftable_005f0, _jspx_page_context, _jspx_push_body_count_f_005fform_005f0))
                  return;
                out.write("\t\r\n");
                out.write("\t\t\t\t\t\t\t\t");
                int evalDoAfterBody = _jspx_th_display_005ftable_005f0.doAfterBody();
                item = (java.lang.Object) _jspx_page_context.findAttribute("item");
                item_rowNum = (java.lang.Integer) _jspx_page_context.findAttribute("item_rowNum");
                if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
                  break;
              } while (true);
              if (_jspx_eval_display_005ftable_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
                out = _jspx_page_context.popBody();
                _jspx_push_body_count_f_005fform_005f0[0]--;
              }
            }
            if (_jspx_th_display_005ftable_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
              _005fjspx_005ftagPool_005fdisplay_005ftable_0026_005frequestURI_005fpagesize_005fname_005fid_005fexcludedParams_005fclass.reuse(_jspx_th_display_005ftable_005f0);
              return;
            }
            _005fjspx_005ftagPool_005fdisplay_005ftable_0026_005frequestURI_005fpagesize_005fname_005fid_005fexcludedParams_005fclass.reuse(_jspx_th_display_005ftable_005f0);
            out.write("\t\r\n");
            out.write("\t\t\t\t\t\t\t\t<table class=\"w100\">\r\n");
            out.write("\t\t              \t<tr>\r\n");
            out.write("\t\t                \t<td class=\"alignRight\">\r\n");
            out.write("\t\t                \t <input type=\"submit\" value=\"Inserisci\"  class=\"puls\" name=\"metodo\" />\r\n");
            out.write("\t\t                    </td>\r\n");
            out.write("\t\t                </tr>\r\n");
            out.write("\t\t              \t</table>\t\t\t\r\n");
            out.write("\t\t\t\t\t</td></tr>\r\n");
            out.write("\t\t<tr>\r\n");
            out.write("\t\t\t\t\t<td>\r\n");
            out.write("\t\t\t\t\r\n");
            out.write("\r\n");
            out.write("\t\t\t\t\t<br />\r\n");
            out.write("\t\t\t\t\t</td>\r\n");
            out.write("\t\t\t\t</tr>\r\n");
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
            out.write("\t\r\n");
            out.write("\t</table>\r\n");
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

  private boolean _jspx_meth_f_005finput_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_f_005fform_005f0, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_f_005fform_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  f:input
    org.springframework.web.servlet.tags.form.InputTag _jspx_th_f_005finput_005f0 = (org.springframework.web.servlet.tags.form.InputTag) _005fjspx_005ftagPool_005ff_005finput_0026_005fsize_005fpath_005fnobody.get(org.springframework.web.servlet.tags.form.InputTag.class);
    _jspx_th_f_005finput_005f0.setPageContext(_jspx_page_context);
    _jspx_th_f_005finput_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_f_005fform_005f0);
    // /jsp/listaStampe.jsp(30,28) name = path type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_f_005finput_005f0.setPath("descrizione");
    // /jsp/listaStampe.jsp(30,28) name = size type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_f_005finput_005f0.setSize("30");
    int[] _jspx_push_body_count_f_005finput_005f0 = new int[] { 0 };
    try {
      int _jspx_eval_f_005finput_005f0 = _jspx_th_f_005finput_005f0.doStartTag();
      if (_jspx_th_f_005finput_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (java.lang.Throwable _jspx_exception) {
      while (_jspx_push_body_count_f_005finput_005f0[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_f_005finput_005f0.doCatch(_jspx_exception);
    } finally {
      _jspx_th_f_005finput_005f0.doFinally();
      _005fjspx_005ftagPool_005ff_005finput_0026_005fsize_005fpath_005fnobody.reuse(_jspx_th_f_005finput_005f0);
    }
    return false;
  }

  private boolean _jspx_meth_display_005fcolumn_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_display_005ftable_005f0, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_f_005fform_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  display:column
    org.displaytag.tags.ColumnTag _jspx_th_display_005fcolumn_005f0 = (org.displaytag.tags.ColumnTag) _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fproperty_005fnobody.get(org.displaytag.tags.ColumnTag.class);
    _jspx_th_display_005fcolumn_005f0.setPageContext(_jspx_page_context);
    _jspx_th_display_005fcolumn_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_display_005ftable_005f0);
    // /jsp/listaStampe.jsp(51,10) name = property type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_display_005fcolumn_005f0.setProperty("object_path");
    // /jsp/listaStampe.jsp(51,10) name = title type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_display_005fcolumn_005f0.setTitle("Percorso");
    int _jspx_eval_display_005fcolumn_005f0 = _jspx_th_display_005fcolumn_005f0.doStartTag();
    if (_jspx_th_display_005fcolumn_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fproperty_005fnobody.reuse(_jspx_th_display_005fcolumn_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fproperty_005fnobody.reuse(_jspx_th_display_005fcolumn_005f0);
    return false;
  }

  private boolean _jspx_meth_display_005fcolumn_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_display_005ftable_005f0, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_f_005fform_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  display:column
    org.displaytag.tags.ColumnTag _jspx_th_display_005fcolumn_005f1 = (org.displaytag.tags.ColumnTag) _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fproperty_005fnobody.get(org.displaytag.tags.ColumnTag.class);
    _jspx_th_display_005fcolumn_005f1.setPageContext(_jspx_page_context);
    _jspx_th_display_005fcolumn_005f1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_display_005ftable_005f0);
    // /jsp/listaStampe.jsp(52,9) name = property type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_display_005fcolumn_005f1.setProperty("text_object_name");
    // /jsp/listaStampe.jsp(52,9) name = title type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_display_005fcolumn_005f1.setTitle("Descrizione");
    int _jspx_eval_display_005fcolumn_005f1 = _jspx_th_display_005fcolumn_005f1.doStartTag();
    if (_jspx_th_display_005fcolumn_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fproperty_005fnobody.reuse(_jspx_th_display_005fcolumn_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fproperty_005fnobody.reuse(_jspx_th_display_005fcolumn_005f1);
    return false;
  }

  private boolean _jspx_meth_display_005fcolumn_005f2(javax.servlet.jsp.tagext.JspTag _jspx_th_display_005ftable_005f0, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_f_005fform_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  display:column
    org.displaytag.tags.ColumnTag _jspx_th_display_005fcolumn_005f2 = (org.displaytag.tags.ColumnTag) _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fclass.get(org.displaytag.tags.ColumnTag.class);
    _jspx_th_display_005fcolumn_005f2.setPageContext(_jspx_page_context);
    _jspx_th_display_005fcolumn_005f2.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_display_005ftable_005f0);
    // /jsp/listaStampe.jsp(53,8) name = title type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_display_005fcolumn_005f2.setTitle("Seleziona");
    // /jsp/listaStampe.jsp(53,8) name = class type = java.lang.String reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_display_005fcolumn_005f2.setClass("alignCenter");
    int _jspx_eval_display_005fcolumn_005f2 = _jspx_th_display_005fcolumn_005f2.doStartTag();
    if (_jspx_eval_display_005fcolumn_005f2 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_display_005fcolumn_005f2 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_push_body_count_f_005fform_005f0[0]++;
        _jspx_th_display_005fcolumn_005f2.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_display_005fcolumn_005f2.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("\t\t\t\t\t\t\t\t");
        if (_jspx_meth_f_005fradiobutton_005f0(_jspx_th_display_005fcolumn_005f2, _jspx_page_context, _jspx_push_body_count_f_005fform_005f0))
          return true;
        out.write("\r\n");
        out.write("\t\t\t\t\t\t\t\t\t\t\t");
        int evalDoAfterBody = _jspx_th_display_005fcolumn_005f2.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_display_005fcolumn_005f2 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
        _jspx_push_body_count_f_005fform_005f0[0]--;
      }
    }
    if (_jspx_th_display_005fcolumn_005f2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fclass.reuse(_jspx_th_display_005fcolumn_005f2);
      return true;
    }
    _005fjspx_005ftagPool_005fdisplay_005fcolumn_0026_005ftitle_005fclass.reuse(_jspx_th_display_005fcolumn_005f2);
    return false;
  }

  private boolean _jspx_meth_f_005fradiobutton_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_display_005fcolumn_005f2, javax.servlet.jsp.PageContext _jspx_page_context, int[] _jspx_push_body_count_f_005fform_005f0)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  f:radiobutton
    org.springframework.web.servlet.tags.form.RadioButtonTag _jspx_th_f_005fradiobutton_005f0 = (org.springframework.web.servlet.tags.form.RadioButtonTag) _005fjspx_005ftagPool_005ff_005fradiobutton_0026_005fvalue_005fpath_005fnobody.get(org.springframework.web.servlet.tags.form.RadioButtonTag.class);
    _jspx_th_f_005fradiobutton_005f0.setPageContext(_jspx_page_context);
    _jspx_th_f_005fradiobutton_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_display_005fcolumn_005f2);
    // /jsp/listaStampe.jsp(54,8) name = path type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_f_005fradiobutton_005f0.setPath("indexSelezionato");
    // /jsp/listaStampe.jsp(54,8) name = value type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_f_005fradiobutton_005f0.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${item_rowNum-1}", java.lang.Object.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
    int[] _jspx_push_body_count_f_005fradiobutton_005f0 = new int[] { 0 };
    try {
      int _jspx_eval_f_005fradiobutton_005f0 = _jspx_th_f_005fradiobutton_005f0.doStartTag();
      if (_jspx_th_f_005fradiobutton_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        return true;
      }
    } catch (java.lang.Throwable _jspx_exception) {
      while (_jspx_push_body_count_f_005fradiobutton_005f0[0]-- > 0)
        out = _jspx_page_context.popBody();
      _jspx_th_f_005fradiobutton_005f0.doCatch(_jspx_exception);
    } finally {
      _jspx_th_f_005fradiobutton_005f0.doFinally();
      _005fjspx_005ftagPool_005ff_005fradiobutton_0026_005fvalue_005fpath_005fnobody.reuse(_jspx_th_f_005fradiobutton_005f0);
    }
    return false;
  }
}
