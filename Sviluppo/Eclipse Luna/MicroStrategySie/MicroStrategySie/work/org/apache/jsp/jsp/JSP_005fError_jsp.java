package org.apache.jsp.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class JSP_005fError_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList(1);
    _jspx_dependants.add("/WEB-INF/tlds/webUtilTL.tld");
  }

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fdescriptor_0026_005fkey_005fdesc_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005ferrorValue_0026_005fproperty_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005ftype_005fname;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fthen;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _005fjspx_005ftagPool_005fweb_005fdescriptor_0026_005fkey_005fdesc_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005ferrorValue_0026_005fproperty_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005ftype_005fname = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005fthen = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005fweb_005fdescriptor_0026_005fkey_005fdesc_005fnobody.release();
    _005fjspx_005ftagPool_005fweb_005ferrorValue_0026_005fproperty_005fnobody.release();
    _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005ftype_005fname.release();
    _005fjspx_005ftagPool_005fweb_005fthen.release();
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    Throwable exception = org.apache.jasper.runtime.JspRuntimeLibrary.getThrowable(request);
    if (exception != null) {
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;


 /****
  * JSP_Error.jsp
  * This page is used as the error-page of JSP files.
  * If a runtime exception happens inside the JSP code, this is the page
  *  that will be displayed.
  *
  * Copyright 2004 MicroStrategy Incorporated. All rights reserved.
  * version: 1.2
  * xhtml: true
  ****/

      out.write("\r\n");
      out.write("<div class=\"mstrAlert\">\r\n");
      out.write("<div class=\"mstrAlertTitle\">");
      if (_jspx_meth_web_005fdescriptor_005f0(_jspx_page_context))
        return;
      out.write("</div>\r\n");
      out.write("<div class=\"mstrAlertMessage\">");
      if (_jspx_meth_web_005ferrorValue_005f0(_jspx_page_context))
        return;
      out.write("</div>\r\n");
      out.write("</div>\r\n");
      out.write('\r');
      out.write('\n');
      if (_jspx_meth_web_005fifFeature_005f0(_jspx_page_context))
        return;
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else log(t.getMessage(), t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }

  private boolean _jspx_meth_web_005fdescriptor_005f0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:descriptor
    com.microstrategy.web.app.taglibs.StringTag _jspx_th_web_005fdescriptor_005f0 = (com.microstrategy.web.app.taglibs.StringTag) _005fjspx_005ftagPool_005fweb_005fdescriptor_0026_005fkey_005fdesc_005fnobody.get(com.microstrategy.web.app.taglibs.StringTag.class);
    _jspx_th_web_005fdescriptor_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdescriptor_005f0.setParent(null);
    // /jsp/JSP_Error.jsp(16,28) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdescriptor_005f0.setKey("mstrWeb.1167");
    // /jsp/JSP_Error.jsp(16,28) name = desc type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdescriptor_005f0.setDesc("An error has occurred on this page.");
    int _jspx_eval_web_005fdescriptor_005f0 = _jspx_th_web_005fdescriptor_005f0.doStartTag();
    if (_jspx_th_web_005fdescriptor_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdescriptor_0026_005fkey_005fdesc_005fnobody.reuse(_jspx_th_web_005fdescriptor_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdescriptor_0026_005fkey_005fdesc_005fnobody.reuse(_jspx_th_web_005fdescriptor_005f0);
    return false;
  }

  private boolean _jspx_meth_web_005ferrorValue_005f0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:errorValue
    com.microstrategy.web.app.taglibs.ErrorValueTag _jspx_th_web_005ferrorValue_005f0 = (com.microstrategy.web.app.taglibs.ErrorValueTag) _005fjspx_005ftagPool_005fweb_005ferrorValue_0026_005fproperty_005fnobody.get(com.microstrategy.web.app.taglibs.ErrorValueTag.class);
    _jspx_th_web_005ferrorValue_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005ferrorValue_005f0.setParent(null);
    // /jsp/JSP_Error.jsp(17,30) name = property type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005ferrorValue_005f0.setProperty("message");
    int _jspx_eval_web_005ferrorValue_005f0 = _jspx_th_web_005ferrorValue_005f0.doStartTag();
    if (_jspx_th_web_005ferrorValue_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005ferrorValue_0026_005fproperty_005fnobody.reuse(_jspx_th_web_005ferrorValue_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005ferrorValue_0026_005fproperty_005fnobody.reuse(_jspx_th_web_005ferrorValue_005f0);
    return false;
  }

  private boolean _jspx_meth_web_005fifFeature_005f0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:ifFeature
    com.microstrategy.web.app.taglibs.IfFeatureTag _jspx_th_web_005fifFeature_005f0 = (com.microstrategy.web.app.taglibs.IfFeatureTag) _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005ftype_005fname.get(com.microstrategy.web.app.taglibs.IfFeatureTag.class);
    _jspx_th_web_005fifFeature_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fifFeature_005f0.setParent(null);
    // /jsp/JSP_Error.jsp(23,0) name = type type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifFeature_005f0.setType("systemPreference");
    // /jsp/JSP_Error.jsp(23,0) name = name type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifFeature_005f0.setName("renderExceptionInfo");
    int _jspx_eval_web_005fifFeature_005f0 = _jspx_th_web_005fifFeature_005f0.doStartTag();
    if (_jspx_eval_web_005fifFeature_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fifFeature_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fifFeature_005f0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fifFeature_005f0.doInitBody();
      }
      do {
        if (_jspx_meth_web_005fthen_005f0(_jspx_th_web_005fifFeature_005f0, _jspx_page_context))
          return true;
        int evalDoAfterBody = _jspx_th_web_005fifFeature_005f0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005fifFeature_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005fifFeature_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005ftype_005fname.reuse(_jspx_th_web_005fifFeature_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005ftype_005fname.reuse(_jspx_th_web_005fifFeature_005f0);
    return false;
  }

  private boolean _jspx_meth_web_005fthen_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fifFeature_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:then
    com.microstrategy.web.app.taglibs.ThenTag _jspx_th_web_005fthen_005f0 = (com.microstrategy.web.app.taglibs.ThenTag) _005fjspx_005ftagPool_005fweb_005fthen.get(com.microstrategy.web.app.taglibs.ThenTag.class);
    _jspx_th_web_005fthen_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fthen_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fifFeature_005f0);
    int _jspx_eval_web_005fthen_005f0 = _jspx_th_web_005fthen_005f0.doStartTag();
    if (_jspx_eval_web_005fthen_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fthen_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fthen_005f0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fthen_005f0.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("<!--\r\n");
        if (_jspx_meth_web_005ferrorValue_005f1(_jspx_th_web_005fthen_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("-->\r\n");
        int evalDoAfterBody = _jspx_th_web_005fthen_005f0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005fthen_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005fthen_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fthen.reuse(_jspx_th_web_005fthen_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fthen.reuse(_jspx_th_web_005fthen_005f0);
    return false;
  }

  private boolean _jspx_meth_web_005ferrorValue_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fthen_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:errorValue
    com.microstrategy.web.app.taglibs.ErrorValueTag _jspx_th_web_005ferrorValue_005f1 = (com.microstrategy.web.app.taglibs.ErrorValueTag) _005fjspx_005ftagPool_005fweb_005ferrorValue_0026_005fproperty_005fnobody.get(com.microstrategy.web.app.taglibs.ErrorValueTag.class);
    _jspx_th_web_005ferrorValue_005f1.setPageContext(_jspx_page_context);
    _jspx_th_web_005ferrorValue_005f1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fthen_005f0);
    // /jsp/JSP_Error.jsp(25,0) name = property type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005ferrorValue_005f1.setProperty("stackTrace");
    int _jspx_eval_web_005ferrorValue_005f1 = _jspx_th_web_005ferrorValue_005f1.doStartTag();
    if (_jspx_th_web_005ferrorValue_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005ferrorValue_0026_005fproperty_005fnobody.reuse(_jspx_th_web_005ferrorValue_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005ferrorValue_0026_005fproperty_005fnobody.reuse(_jspx_th_web_005ferrorValue_005f1);
    return false;
  }
}
