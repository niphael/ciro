package org.apache.jsp.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.microstrategy.web.app.beans.PageComponent;

public final class Export_005fSaving_005fLinks_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList(1);
    _jspx_dependants.add("/WEB-INF/tlds/webUtilTL.tld");
  }

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005flocation_005fnobody;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005flocation_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.release();
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005flocation_005fnobody.release();
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			"Error_Links.jsp", true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;


    /*
     * Export_Saving_Links.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */

PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");

      out.write('\r');
      out.write('\n');
      out.write('\r');
      out.write('\n');
      org.apache.jasper.runtime.JspRuntimeLibrary.include(request, response, mstrPage.getTemplateInfo().getDefaultTemplate().getSection("links"), out, true);
      out.write('\r');
      out.write('\n');
      if (_jspx_meth_web_005fresource_005f0(_jspx_page_context))
        return;
      out.write('\r');
      out.write('\n');
      if (_jspx_meth_web_005fresource_005f1(_jspx_page_context))
        return;
      out.write('\r');
      out.write('\n');
      if (_jspx_meth_web_005fresource_005f2(_jspx_page_context))
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

  private boolean _jspx_meth_web_005fresource_005f0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:resource
    com.microstrategy.web.app.taglibs.BaseTag _jspx_th_web_005fresource_005f0 = (com.microstrategy.web.app.taglibs.BaseTag) _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.BaseTag.class);
    _jspx_th_web_005fresource_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fresource_005f0.setParent(null);
    // /jsp/Export_Saving_Links.jsp(17,0) name = type type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f0.setType("style");
    // /jsp/Export_Saving_Links.jsp(17,0) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f0.setName("mstr/pageWait.css");
    int _jspx_eval_web_005fresource_005f0 = _jspx_th_web_005fresource_005f0.doStartTag();
    if (_jspx_th_web_005fresource_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.reuse(_jspx_th_web_005fresource_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.reuse(_jspx_th_web_005fresource_005f0);
    return false;
  }

  private boolean _jspx_meth_web_005fresource_005f1(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:resource
    com.microstrategy.web.app.taglibs.BaseTag _jspx_th_web_005fresource_005f1 = (com.microstrategy.web.app.taglibs.BaseTag) _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005flocation_005fnobody.get(com.microstrategy.web.app.taglibs.BaseTag.class);
    _jspx_th_web_005fresource_005f1.setPageContext(_jspx_page_context);
    _jspx_th_web_005fresource_005f1.setParent(null);
    // /jsp/Export_Saving_Links.jsp(18,0) name = type type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f1.setType("javascript");
    // /jsp/Export_Saving_Links.jsp(18,0) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f1.setName("DHTML.js");
    // /jsp/Export_Saving_Links.jsp(18,0) name = location type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f1.setLocation("head");
    int _jspx_eval_web_005fresource_005f1 = _jspx_th_web_005fresource_005f1.doStartTag();
    if (_jspx_th_web_005fresource_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005flocation_005fnobody.reuse(_jspx_th_web_005fresource_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005flocation_005fnobody.reuse(_jspx_th_web_005fresource_005f1);
    return false;
  }

  private boolean _jspx_meth_web_005fresource_005f2(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:resource
    com.microstrategy.web.app.taglibs.BaseTag _jspx_th_web_005fresource_005f2 = (com.microstrategy.web.app.taglibs.BaseTag) _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005flocation_005fnobody.get(com.microstrategy.web.app.taglibs.BaseTag.class);
    _jspx_th_web_005fresource_005f2.setPageContext(_jspx_page_context);
    _jspx_th_web_005fresource_005f2.setParent(null);
    // /jsp/Export_Saving_Links.jsp(19,0) name = type type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f2.setType("javascript");
    // /jsp/Export_Saving_Links.jsp(19,0) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f2.setName("print.js");
    // /jsp/Export_Saving_Links.jsp(19,0) name = location type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f2.setLocation("head");
    int _jspx_eval_web_005fresource_005f2 = _jspx_th_web_005fresource_005f2.doStartTag();
    if (_jspx_th_web_005fresource_005f2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005flocation_005fnobody.reuse(_jspx_th_web_005fresource_005f2);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005flocation_005fnobody.reuse(_jspx_th_web_005fresource_005f2);
    return false;
  }
}
