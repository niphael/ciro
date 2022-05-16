package org.apache.jsp.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class Report_005fToolbar_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList(1);
    _jspx_dependants.add("/WEB-INF/tlds/webUtilTL.tld");
  }

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fthen;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005fname;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005felse;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005fthen = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005fname = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005felse = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.release();
    _005fjspx_005ftagPool_005fweb_005fthen.release();
    _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005fname.release();
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.release();
    _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.release();
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
      			"JSP_Error.jsp", true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;


/*
 * Report_Toolbar.jsp
 * This page displays the menus and toolbars for the Report page.
  *
  * Copyright 2004 MicroStrategy Incorporated. All rights reserved.
  * version: 1.2
  * xhtml: true
  ****/

      out.write("\r\n");
      out.write("<div class=\"mstrDockTopContainer\">\r\n");
      out.write('\r');
      out.write('\n');
      if (_jspx_meth_web_005fifBeanValue_005f0(_jspx_page_context))
        return;
      out.write("\r\n");
      out.write("</div>");
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

  private boolean _jspx_meth_web_005fifBeanValue_005f0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:ifBeanValue
    com.microstrategy.web.app.taglibs.IfBeanValueTag _jspx_th_web_005fifBeanValue_005f0 = (com.microstrategy.web.app.taglibs.IfBeanValueTag) _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.get(com.microstrategy.web.app.taglibs.IfBeanValueTag.class);
    _jspx_th_web_005fifBeanValue_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fifBeanValue_005f0.setParent(null);
    // /jsp/Report_Toolbar.jsp(16,0) name = bean type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f0.setBean("frame.rb");
    // /jsp/Report_Toolbar.jsp(16,0) name = property type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f0.setProperty("getXMLStatus");
    // /jsp/Report_Toolbar.jsp(16,0) name = value type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f0.setValue("3");
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
        out.write(' ');
        out.write('\r');
        out.write('\n');
        out.write(' ');
        if (_jspx_meth_web_005fifBeanValue_005f1(_jspx_th_web_005fthen_005f0, _jspx_page_context))
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

  private boolean _jspx_meth_web_005fifBeanValue_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fthen_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:ifBeanValue
    com.microstrategy.web.app.taglibs.IfBeanValueTag _jspx_th_web_005fifBeanValue_005f1 = (com.microstrategy.web.app.taglibs.IfBeanValueTag) _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.get(com.microstrategy.web.app.taglibs.IfBeanValueTag.class);
    _jspx_th_web_005fifBeanValue_005f1.setPageContext(_jspx_page_context);
    _jspx_th_web_005fifBeanValue_005f1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fthen_005f0);
    // /jsp/Report_Toolbar.jsp(18,1) name = bean type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f1.setBean("frame");
    // /jsp/Report_Toolbar.jsp(18,1) name = property type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f1.setProperty("getDesignMode");
    // /jsp/Report_Toolbar.jsp(18,1) name = value type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f1.setValue("0");
    int _jspx_eval_web_005fifBeanValue_005f1 = _jspx_th_web_005fifBeanValue_005f1.doStartTag();
    if (_jspx_eval_web_005fifBeanValue_005f1 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fifBeanValue_005f1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fifBeanValue_005f1.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fifBeanValue_005f1.doInitBody();
      }
      do {
        if (_jspx_meth_web_005fthen_005f1(_jspx_th_web_005fifBeanValue_005f1, _jspx_page_context))
          return true;
        out.write('\r');
        out.write('\n');
        out.write(' ');
        if (_jspx_meth_web_005felse_005f1(_jspx_th_web_005fifBeanValue_005f1, _jspx_page_context))
          return true;
        int evalDoAfterBody = _jspx_th_web_005fifBeanValue_005f1.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005fifBeanValue_005f1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005fifBeanValue_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.reuse(_jspx_th_web_005fifBeanValue_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.reuse(_jspx_th_web_005fifBeanValue_005f1);
    return false;
  }

  private boolean _jspx_meth_web_005fthen_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fifBeanValue_005f1, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:then
    com.microstrategy.web.app.taglibs.ThenTag _jspx_th_web_005fthen_005f1 = (com.microstrategy.web.app.taglibs.ThenTag) _005fjspx_005ftagPool_005fweb_005fthen.get(com.microstrategy.web.app.taglibs.ThenTag.class);
    _jspx_th_web_005fthen_005f1.setPageContext(_jspx_page_context);
    _jspx_th_web_005fthen_005f1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fifBeanValue_005f1);
    int _jspx_eval_web_005fthen_005f1 = _jspx_th_web_005fthen_005f1.doStartTag();
    if (_jspx_eval_web_005fthen_005f1 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fthen_005f1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fthen_005f1.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fthen_005f1.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("  ");
        if (_jspx_meth_web_005fifFeature_005f0(_jspx_th_web_005fthen_005f1, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("\r\n");
        out.write("\t  ");
        if (_jspx_meth_web_005fifFeature_005f1(_jspx_th_web_005fthen_005f1, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("\r\n");
        out.write(" ");
        int evalDoAfterBody = _jspx_th_web_005fthen_005f1.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005fthen_005f1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005fthen_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fthen.reuse(_jspx_th_web_005fthen_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fthen.reuse(_jspx_th_web_005fthen_005f1);
    return false;
  }

  private boolean _jspx_meth_web_005fifFeature_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fthen_005f1, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:ifFeature
    com.microstrategy.web.app.taglibs.IfFeatureTag _jspx_th_web_005fifFeature_005f0 = (com.microstrategy.web.app.taglibs.IfFeatureTag) _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005fname.get(com.microstrategy.web.app.taglibs.IfFeatureTag.class);
    _jspx_th_web_005fifFeature_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fifFeature_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fthen_005f1);
    // /jsp/Report_Toolbar.jsp(19,2) name = name type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifFeature_005f0.setName("dhtml");
    int _jspx_eval_web_005fifFeature_005f0 = _jspx_th_web_005fifFeature_005f0.doStartTag();
    if (_jspx_eval_web_005fifFeature_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fifFeature_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fifFeature_005f0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fifFeature_005f0.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("    ");
        if (_jspx_meth_web_005fthen_005f2(_jspx_th_web_005fifFeature_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("  ");
        int evalDoAfterBody = _jspx_th_web_005fifFeature_005f0.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005fifFeature_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005fifFeature_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005fname.reuse(_jspx_th_web_005fifFeature_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005fname.reuse(_jspx_th_web_005fifFeature_005f0);
    return false;
  }

  private boolean _jspx_meth_web_005fthen_005f2(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fifFeature_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:then
    com.microstrategy.web.app.taglibs.ThenTag _jspx_th_web_005fthen_005f2 = (com.microstrategy.web.app.taglibs.ThenTag) _005fjspx_005ftagPool_005fweb_005fthen.get(com.microstrategy.web.app.taglibs.ThenTag.class);
    _jspx_th_web_005fthen_005f2.setPageContext(_jspx_page_context);
    _jspx_th_web_005fthen_005f2.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fifFeature_005f0);
    int _jspx_eval_web_005fthen_005f2 = _jspx_th_web_005fthen_005f2.doStartTag();
    if (_jspx_eval_web_005fthen_005f2 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fthen_005f2 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fthen_005f2.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fthen_005f2.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("     <div class='mstrDockTopContent'>    \r\n");
        out.write("\t   ");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f0(_jspx_th_web_005fthen_005f2, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("        ");
        if (_jspx_meth_web_005fdisplayBean_005f0(_jspx_th_web_005fthen_005f2, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("     </div>\r\n");
        out.write("    ");
        int evalDoAfterBody = _jspx_th_web_005fthen_005f2.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005fthen_005f2 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005fthen_005f2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fthen.reuse(_jspx_th_web_005fthen_005f2);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fthen.reuse(_jspx_th_web_005fthen_005f2);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fthen_005f2, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f0 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fthen_005f2);
    // /jsp/Report_Toolbar.jsp(22,4) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f0.setName("ribbonFeaturesUpdate");
    int _jspx_eval_web_005fdisplayGuiComponent_005f0 = _jspx_th_web_005fdisplayGuiComponent_005f0.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f0);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayBean_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fthen_005f2, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayBean
    com.microstrategy.web.app.taglibs.DisplayBeanTag _jspx_th_web_005fdisplayBean_005f0 = (com.microstrategy.web.app.taglibs.DisplayBeanTag) _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayBeanTag.class);
    _jspx_th_web_005fdisplayBean_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayBean_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fthen_005f2);
    // /jsp/Report_Toolbar.jsp(23,8) name = bean type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayBean_005f0.setBean("ribbonBean");
    // /jsp/Report_Toolbar.jsp(23,8) name = styleName type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayBean_005f0.setStyleName("RptRibbonToolbars");
    int _jspx_eval_web_005fdisplayBean_005f0 = _jspx_th_web_005fdisplayBean_005f0.doStartTag();
    if (_jspx_th_web_005fdisplayBean_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.reuse(_jspx_th_web_005fdisplayBean_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.reuse(_jspx_th_web_005fdisplayBean_005f0);
    return false;
  }

  private boolean _jspx_meth_web_005fifFeature_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fthen_005f1, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:ifFeature
    com.microstrategy.web.app.taglibs.IfFeatureTag _jspx_th_web_005fifFeature_005f1 = (com.microstrategy.web.app.taglibs.IfFeatureTag) _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005fname.get(com.microstrategy.web.app.taglibs.IfFeatureTag.class);
    _jspx_th_web_005fifFeature_005f1.setPageContext(_jspx_page_context);
    _jspx_th_web_005fifFeature_005f1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fthen_005f1);
    // /jsp/Report_Toolbar.jsp(28,3) name = name type = null reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifFeature_005f1.setName("dhtml");
    int _jspx_eval_web_005fifFeature_005f1 = _jspx_th_web_005fifFeature_005f1.doStartTag();
    if (_jspx_eval_web_005fifFeature_005f1 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fifFeature_005f1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fifFeature_005f1.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fifFeature_005f1.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("\t  ");
        if (_jspx_meth_web_005fthen_005f3(_jspx_th_web_005fifFeature_005f1, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("\t  ");
        if (_jspx_meth_web_005felse_005f0(_jspx_th_web_005fifFeature_005f1, _jspx_page_context))
          return true;
        int evalDoAfterBody = _jspx_th_web_005fifFeature_005f1.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005fifFeature_005f1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005fifFeature_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005fname.reuse(_jspx_th_web_005fifFeature_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fifFeature_0026_005fname.reuse(_jspx_th_web_005fifFeature_005f1);
    return false;
  }

  private boolean _jspx_meth_web_005fthen_005f3(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fifFeature_005f1, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:then
    com.microstrategy.web.app.taglibs.ThenTag _jspx_th_web_005fthen_005f3 = (com.microstrategy.web.app.taglibs.ThenTag) _005fjspx_005ftagPool_005fweb_005fthen.get(com.microstrategy.web.app.taglibs.ThenTag.class);
    _jspx_th_web_005fthen_005f3.setPageContext(_jspx_page_context);
    _jspx_th_web_005fthen_005f3.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fifFeature_005f1);
    int _jspx_eval_web_005fthen_005f3 = _jspx_th_web_005fthen_005f3.doStartTag();
    if (_jspx_eval_web_005fthen_005f3 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fthen_005f3 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fthen_005f3.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fthen_005f3.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("\t\t<!-- New toolbar -->\r\n");
        out.write("\t\t");
        out.write("\r\n");
        out.write("\t  ");
        out.write("\r\n");
        out.write("\t  ");
        int evalDoAfterBody = _jspx_th_web_005fthen_005f3.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005fthen_005f3 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005fthen_005f3.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fthen.reuse(_jspx_th_web_005fthen_005f3);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fthen.reuse(_jspx_th_web_005fthen_005f3);
    return false;
  }

  private boolean _jspx_meth_web_005felse_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fifFeature_005f1, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:else
    com.microstrategy.web.app.taglibs.ElseTag _jspx_th_web_005felse_005f0 = (com.microstrategy.web.app.taglibs.ElseTag) _005fjspx_005ftagPool_005fweb_005felse.get(com.microstrategy.web.app.taglibs.ElseTag.class);
    _jspx_th_web_005felse_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005felse_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fifFeature_005f1);
    int _jspx_eval_web_005felse_005f0 = _jspx_th_web_005felse_005f0.doStartTag();
    if (_jspx_eval_web_005felse_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005felse_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005felse_005f0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005felse_005f0.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("\t\t  <!-- Old toolbar -->\r\n");
        out.write("\t\t  <div class=\"mstrMenuBar\" id=\"mstrMenuDiv\">\r\n");
        out.write("\t\t    <table border=0 cellpadding=0 cellspacing=0 ><tr>\r\n");
        out.write("\t\t     <td class=\"mstrMenuItems\">");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f1(_jspx_th_web_005felse_005f0, _jspx_page_context))
          return true;
        out.write("</td>\r\n");
        out.write("\t\t     <td class=\"mstrMenuLastUpdated\" nowrap>");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f2(_jspx_th_web_005felse_005f0, _jspx_page_context))
          return true;
        out.write("</td>\r\n");
        out.write("\t\t    </tr></table>\r\n");
        out.write("\t\t   </div>\r\n");
        out.write("\t\t   ");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f3(_jspx_th_web_005felse_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("\t\t   <div id = \"normalScreenOnlyToolBar\">\r\n");
        out.write("\t\t   ");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f4(_jspx_th_web_005felse_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("\t\t   ");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f5(_jspx_th_web_005felse_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("\t\t   ");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f6(_jspx_th_web_005felse_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("\t\t   ");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f7(_jspx_th_web_005felse_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("\t\t   ");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f8(_jspx_th_web_005felse_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("\t\t  </div>\r\n");
        out.write("\t\t  <div class=\"mstrSpacer\"/>\r\n");
        out.write("\t   ");
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

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f1 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f1.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f0);
    // /jsp/Report_Toolbar.jsp(40,33) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f1.setName("report_menus");
    int _jspx_eval_web_005fdisplayGuiComponent_005f1 = _jspx_th_web_005fdisplayGuiComponent_005f1.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f1);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f2(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f2 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f2.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f2.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f0);
    // /jsp/Report_Toolbar.jsp(41,46) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f2.setName("report_last_update");
    int _jspx_eval_web_005fdisplayGuiComponent_005f2 = _jspx_th_web_005fdisplayGuiComponent_005f2.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f2);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f2);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f3(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f3 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f3.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f3.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f0);
    // /jsp/Report_Toolbar.jsp(44,5) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f3.setName("report_toolbar_standard");
    int _jspx_eval_web_005fdisplayGuiComponent_005f3 = _jspx_th_web_005fdisplayGuiComponent_005f3.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f3.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f3);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f3);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f4(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f4 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f4.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f4.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f0);
    // /jsp/Report_Toolbar.jsp(46,5) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f4.setName("report_toolbar_crosstab");
    int _jspx_eval_web_005fdisplayGuiComponent_005f4 = _jspx_th_web_005fdisplayGuiComponent_005f4.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f4.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f4);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f4);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f5(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f5 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f5.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f5.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f0);
    // /jsp/Report_Toolbar.jsp(47,5) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f5.setName("report_toolbar_grid");
    int _jspx_eval_web_005fdisplayGuiComponent_005f5 = _jspx_th_web_005fdisplayGuiComponent_005f5.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f5.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f5);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f5);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f6(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f6 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f6.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f6.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f0);
    // /jsp/Report_Toolbar.jsp(48,5) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f6.setName("report_toolbar_graph");
    int _jspx_eval_web_005fdisplayGuiComponent_005f6 = _jspx_th_web_005fdisplayGuiComponent_005f6.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f6.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f6);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f6);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f7(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f7 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f7.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f7.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f0);
    // /jsp/Report_Toolbar.jsp(49,5) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f7.setName("report_toolbar_panels");
    int _jspx_eval_web_005fdisplayGuiComponent_005f7 = _jspx_th_web_005fdisplayGuiComponent_005f7.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f7.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f7);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f7);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f8(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f8 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f8.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f8.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f0);
    // /jsp/Report_Toolbar.jsp(50,5) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f8.setName("report_toolbar_format");
    int _jspx_eval_web_005fdisplayGuiComponent_005f8 = _jspx_th_web_005fdisplayGuiComponent_005f8.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f8.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f8);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f8);
    return false;
  }

  private boolean _jspx_meth_web_005felse_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fifBeanValue_005f1, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:else
    com.microstrategy.web.app.taglibs.ElseTag _jspx_th_web_005felse_005f1 = (com.microstrategy.web.app.taglibs.ElseTag) _005fjspx_005ftagPool_005fweb_005felse.get(com.microstrategy.web.app.taglibs.ElseTag.class);
    _jspx_th_web_005felse_005f1.setPageContext(_jspx_page_context);
    _jspx_th_web_005felse_005f1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fifBeanValue_005f1);
    int _jspx_eval_web_005felse_005f1 = _jspx_th_web_005felse_005f1.doStartTag();
    if (_jspx_eval_web_005felse_005f1 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005felse_005f1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005felse_005f1.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005felse_005f1.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("   ");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f9(_jspx_th_web_005felse_005f1, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("   ");
        if (_jspx_meth_web_005fdisplayGuiComponent_005f10(_jspx_th_web_005felse_005f1, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("   <div class=\"mstrSpacer\"/>\r\n");
        out.write(" ");
        int evalDoAfterBody = _jspx_th_web_005felse_005f1.doAfterBody();
        if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
          break;
      } while (true);
      if (_jspx_eval_web_005felse_005f1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.popBody();
      }
    }
    if (_jspx_th_web_005felse_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005felse.reuse(_jspx_th_web_005felse_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005felse.reuse(_jspx_th_web_005felse_005f1);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f9(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f1, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f9 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f9.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f9.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f1);
    // /jsp/Report_Toolbar.jsp(57,3) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f9.setName("report_design_mode_toolbar");
    int _jspx_eval_web_005fdisplayGuiComponent_005f9 = _jspx_th_web_005fdisplayGuiComponent_005f9.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f9.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f9);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f9);
    return false;
  }

  private boolean _jspx_meth_web_005fdisplayGuiComponent_005f10(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f1, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayGuiComponent
    com.microstrategy.web.app.taglibs.DisplayGuiComponentTag _jspx_th_web_005fdisplayGuiComponent_005f10 = (com.microstrategy.web.app.taglibs.DisplayGuiComponentTag) _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayGuiComponentTag.class);
    _jspx_th_web_005fdisplayGuiComponent_005f10.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayGuiComponent_005f10.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f1);
    // /jsp/Report_Toolbar.jsp(58,3) name = name type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayGuiComponent_005f10.setName("report_toolbar_graph");
    int _jspx_eval_web_005fdisplayGuiComponent_005f10 = _jspx_th_web_005fdisplayGuiComponent_005f10.doStartTag();
    if (_jspx_th_web_005fdisplayGuiComponent_005f10.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f10);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayGuiComponent_0026_005fname_005fnobody.reuse(_jspx_th_web_005fdisplayGuiComponent_005f10);
    return false;
  }
}
