package org.apache.jsp.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import com.microstrategy.web.app.beans.PageComponent;

public final class Print_005fOptions_005fLinks_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList(1);
    _jspx_dependants.add("/WEB-INF/tlds/webUtilTL.tld");
  }

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fthen;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005felse;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005fthen = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005felse = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.release();
    _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.release();
    _005fjspx_005ftagPool_005fweb_005fthen.release();
    _005fjspx_005ftagPool_005fweb_005felse.release();
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
     * Print_Options_Links.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
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
      out.write("\r\n");
      out.write("\r\n");
      if (_jspx_meth_web_005fifBeanValue_005f0(_jspx_page_context))
        return;
      out.write("\r\n");
      out.write("\r\n");
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
    // /jsp/Print_Options_Links.jsp(19,0) name = type type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f0.setType("javascript");
    // /jsp/Print_Options_Links.jsp(19,0) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f0.setName("export.js");
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
    com.microstrategy.web.app.taglibs.BaseTag _jspx_th_web_005fresource_005f1 = (com.microstrategy.web.app.taglibs.BaseTag) _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.BaseTag.class);
    _jspx_th_web_005fresource_005f1.setPageContext(_jspx_page_context);
    _jspx_th_web_005fresource_005f1.setParent(null);
    // /jsp/Print_Options_Links.jsp(20,0) name = type type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f1.setType("javascript");
    // /jsp/Print_Options_Links.jsp(20,0) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f1.setName("print.js");
    int _jspx_eval_web_005fresource_005f1 = _jspx_th_web_005fresource_005f1.doStartTag();
    if (_jspx_th_web_005fresource_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.reuse(_jspx_th_web_005fresource_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.reuse(_jspx_th_web_005fresource_005f1);
    return false;
  }

  private boolean _jspx_meth_web_005fifBeanValue_005f0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:ifBeanValue
    com.microstrategy.web.app.taglibs.IfBeanValueTag _jspx_th_web_005fifBeanValue_005f0 = (com.microstrategy.web.app.taglibs.IfBeanValueTag) _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.get(com.microstrategy.web.app.taglibs.IfBeanValueTag.class);
    _jspx_th_web_005fifBeanValue_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fifBeanValue_005f0.setParent(null);
    // /jsp/Print_Options_Links.jsp(22,0) name = bean type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f0.setBean("options");
    // /jsp/Print_Options_Links.jsp(22,0) name = property type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f0.setProperty("getShowOptions");
    // /jsp/Print_Options_Links.jsp(22,0) name = value type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f0.setValue("true");
    int _jspx_eval_web_005fifBeanValue_005f0 = _jspx_th_web_005fifBeanValue_005f0.doStartTag();
    if (_jspx_eval_web_005fifBeanValue_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fifBeanValue_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fifBeanValue_005f0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fifBeanValue_005f0.doInitBody();
      }
      do {
        if (_jspx_meth_web_005fthen_005f0(_jspx_th_web_005fifBeanValue_005f0, _jspx_page_context))
          return true;
        if (_jspx_meth_web_005felse_005f0(_jspx_th_web_005fifBeanValue_005f0, _jspx_page_context))
          return true;
        int evalDoAfterBody = _jspx_th_web_005fifBeanValue_005f0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005fifBeanValue_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005fifBeanValue_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.reuse(_jspx_th_web_005fifBeanValue_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.reuse(_jspx_th_web_005fifBeanValue_005f0);
    return false;
  }

  private boolean _jspx_meth_web_005fthen_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fifBeanValue_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:then
    com.microstrategy.web.app.taglibs.ThenTag _jspx_th_web_005fthen_005f0 = (com.microstrategy.web.app.taglibs.ThenTag) _005fjspx_005ftagPool_005fweb_005fthen.get(com.microstrategy.web.app.taglibs.ThenTag.class);
    _jspx_th_web_005fthen_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fthen_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fifBeanValue_005f0);
    int _jspx_eval_web_005fthen_005f0 = _jspx_th_web_005fthen_005f0.doStartTag();
    if (_jspx_eval_web_005fthen_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fthen_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fthen_005f0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fthen_005f0.doInitBody();
      }
      do {
        out.write('\r');
        out.write('\n');
        if (_jspx_meth_web_005fresource_005f2(_jspx_th_web_005fthen_005f0, _jspx_page_context))
          return true;
        out.write('\r');
        out.write('\n');
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

  private boolean _jspx_meth_web_005fresource_005f2(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fthen_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:resource
    com.microstrategy.web.app.taglibs.BaseTag _jspx_th_web_005fresource_005f2 = (com.microstrategy.web.app.taglibs.BaseTag) _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.BaseTag.class);
    _jspx_th_web_005fresource_005f2.setPageContext(_jspx_page_context);
    _jspx_th_web_005fresource_005f2.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fthen_005f0);
    // /jsp/Print_Options_Links.jsp(23,0) name = type type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f2.setType("style");
    // /jsp/Print_Options_Links.jsp(23,0) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f2.setName("mstr/pageExportOptions.css");
    int _jspx_eval_web_005fresource_005f2 = _jspx_th_web_005fresource_005f2.doStartTag();
    if (_jspx_th_web_005fresource_005f2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.reuse(_jspx_th_web_005fresource_005f2);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.reuse(_jspx_th_web_005fresource_005f2);
    return false;
  }

  private boolean _jspx_meth_web_005felse_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fifBeanValue_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:else
    com.microstrategy.web.app.taglibs.ElseTag _jspx_th_web_005felse_005f0 = (com.microstrategy.web.app.taglibs.ElseTag) _005fjspx_005ftagPool_005fweb_005felse.get(com.microstrategy.web.app.taglibs.ElseTag.class);
    _jspx_th_web_005felse_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005felse_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fifBeanValue_005f0);
    int _jspx_eval_web_005felse_005f0 = _jspx_th_web_005felse_005f0.doStartTag();
    if (_jspx_eval_web_005felse_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005felse_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005felse_005f0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005felse_005f0.doInitBody();
      }
      do {
        out.write('\r');
        out.write('\n');
        if (_jspx_meth_web_005fresource_005f3(_jspx_th_web_005felse_005f0, _jspx_page_context))
          return true;
        out.write('\r');
        out.write('\n');
        int evalDoAfterBody = _jspx_th_web_005felse_005f0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005felse_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005felse_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005felse.reuse(_jspx_th_web_005felse_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005felse.reuse(_jspx_th_web_005felse_005f0);
    return false;
  }

  private boolean _jspx_meth_web_005fresource_005f3(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:resource
    com.microstrategy.web.app.taglibs.BaseTag _jspx_th_web_005fresource_005f3 = (com.microstrategy.web.app.taglibs.BaseTag) _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.BaseTag.class);
    _jspx_th_web_005fresource_005f3.setPageContext(_jspx_page_context);
    _jspx_th_web_005fresource_005f3.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f0);
    // /jsp/Print_Options_Links.jsp(25,0) name = type type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f3.setType("style");
    // /jsp/Print_Options_Links.jsp(25,0) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fresource_005f3.setName("mstr/pagePreferences.css");
    int _jspx_eval_web_005fresource_005f3 = _jspx_th_web_005fresource_005f3.doStartTag();
    if (_jspx_th_web_005fresource_005f3.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.reuse(_jspx_th_web_005fresource_005f3);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fresource_0026_005ftype_005fname_005fnobody.reuse(_jspx_th_web_005fresource_005f3);
    return false;
  }
}
