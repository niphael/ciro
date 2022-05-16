package org.apache.jsp.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class PDF_005fOptions_005fContent_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList(1);
    _jspx_dependants.add("/WEB-INF/tlds/webUtilTL.tld");
  }

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean;
  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fweb_005fthen;
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
    _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _005fjspx_005ftagPool_005fweb_005felse = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.release();
    _005fjspx_005ftagPool_005fweb_005fthen.release();
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
      			"Error_Content.jsp", true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;


 /*
  * PDF_Options_Content.jsp
  * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
  */

      out.write("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" >\r\n");
      out.write("<tr>\r\n");
      out.write("<td valign=\"top\">\r\n");
      out.write('\r');
      out.write('\n');
      if (_jspx_meth_web_005fifBeanValue_005f0(_jspx_page_context))
        return;
      out.write("\r\n");
      out.write("</td>\r\n");
      out.write("</tr>\r\n");
      out.write("</table>\r\n");
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
    // /jsp/PDF_Options_Content.jsp(13,0) name = bean type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f0.setBean("options");
    // /jsp/PDF_Options_Content.jsp(13,0) name = property type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f0.setProperty("getCurrentGroupName");
    // /jsp/PDF_Options_Content.jsp(13,0) name = value type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f0.setValue("printHeaderFooter");
    int _jspx_eval_web_005fifBeanValue_005f0 = _jspx_th_web_005fifBeanValue_005f0.doStartTag();
    if (_jspx_eval_web_005fifBeanValue_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fifBeanValue_005f0 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fifBeanValue_005f0.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fifBeanValue_005f0.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("  ");
        if (_jspx_meth_web_005fthen_005f0(_jspx_th_web_005fifBeanValue_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("  ");
        if (_jspx_meth_web_005felse_005f0(_jspx_th_web_005fifBeanValue_005f0, _jspx_page_context))
          return true;
        out.write('\r');
        out.write('\n');
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
        out.write("\r\n");
        out.write("   ");
        if (_jspx_meth_web_005fdisplayBean_005f0(_jspx_th_web_005fthen_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("  ");
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

  private boolean _jspx_meth_web_005fdisplayBean_005f0(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fthen_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayBean
    com.microstrategy.web.app.taglibs.DisplayBeanTag _jspx_th_web_005fdisplayBean_005f0 = (com.microstrategy.web.app.taglibs.DisplayBeanTag) _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayBeanTag.class);
    _jspx_th_web_005fdisplayBean_005f0.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayBean_005f0.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fthen_005f0);
    // /jsp/PDF_Options_Content.jsp(15,3) name = bean type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayBean_005f0.setBean("options");
    // /jsp/PDF_Options_Content.jsp(15,3) name = styleName type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayBean_005f0.setStyleName("HeaderFooterOptionsStyle");
    int _jspx_eval_web_005fdisplayBean_005f0 = _jspx_th_web_005fdisplayBean_005f0.doStartTag();
    if (_jspx_th_web_005fdisplayBean_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.reuse(_jspx_th_web_005fdisplayBean_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.reuse(_jspx_th_web_005fdisplayBean_005f0);
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
        out.write("\r\n");
        out.write("    ");
        if (_jspx_meth_web_005fifBeanValue_005f1(_jspx_th_web_005felse_005f0, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("  ");
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

  private boolean _jspx_meth_web_005fifBeanValue_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f0, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:ifBeanValue
    com.microstrategy.web.app.taglibs.IfBeanValueTag _jspx_th_web_005fifBeanValue_005f1 = (com.microstrategy.web.app.taglibs.IfBeanValueTag) _005fjspx_005ftagPool_005fweb_005fifBeanValue_0026_005fvalue_005fproperty_005fbean.get(com.microstrategy.web.app.taglibs.IfBeanValueTag.class);
    _jspx_th_web_005fifBeanValue_005f1.setPageContext(_jspx_page_context);
    _jspx_th_web_005fifBeanValue_005f1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f0);
    // /jsp/PDF_Options_Content.jsp(18,4) name = bean type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f1.setBean("options");
    // /jsp/PDF_Options_Content.jsp(18,4) name = property type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f1.setProperty("getCurrentGroupName");
    // /jsp/PDF_Options_Content.jsp(18,4) name = value type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fifBeanValue_005f1.setValue("pdfReportHeaderFooter");
    int _jspx_eval_web_005fifBeanValue_005f1 = _jspx_th_web_005fifBeanValue_005f1.doStartTag();
    if (_jspx_eval_web_005fifBeanValue_005f1 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
      if (_jspx_eval_web_005fifBeanValue_005f1 != javax.servlet.jsp.tagext.Tag.EVAL_BODY_INCLUDE) {
        out = _jspx_page_context.pushBody();
        _jspx_th_web_005fifBeanValue_005f1.setBodyContent((javax.servlet.jsp.tagext.BodyContent) out);
        _jspx_th_web_005fifBeanValue_005f1.doInitBody();
      }
      do {
        out.write("\r\n");
        out.write("      ");
        if (_jspx_meth_web_005fthen_005f1(_jspx_th_web_005fifBeanValue_005f1, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("      ");
        if (_jspx_meth_web_005felse_005f1(_jspx_th_web_005fifBeanValue_005f1, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("    ");
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
        out.write("        ");
        if (_jspx_meth_web_005fdisplayBean_005f1(_jspx_th_web_005fthen_005f1, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("      ");
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

  private boolean _jspx_meth_web_005fdisplayBean_005f1(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005fthen_005f1, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayBean
    com.microstrategy.web.app.taglibs.DisplayBeanTag _jspx_th_web_005fdisplayBean_005f1 = (com.microstrategy.web.app.taglibs.DisplayBeanTag) _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayBeanTag.class);
    _jspx_th_web_005fdisplayBean_005f1.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayBean_005f1.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005fthen_005f1);
    // /jsp/PDF_Options_Content.jsp(20,8) name = bean type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayBean_005f1.setBean("options");
    // /jsp/PDF_Options_Content.jsp(20,8) name = styleName type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayBean_005f1.setStyleName("PDFReportHeaderFooterStyle");
    int _jspx_eval_web_005fdisplayBean_005f1 = _jspx_th_web_005fdisplayBean_005f1.doStartTag();
    if (_jspx_th_web_005fdisplayBean_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.reuse(_jspx_th_web_005fdisplayBean_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.reuse(_jspx_th_web_005fdisplayBean_005f1);
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
        out.write(" \t\t");
        if (_jspx_meth_web_005fdisplayBean_005f2(_jspx_th_web_005felse_005f1, _jspx_page_context))
          return true;
        out.write("\r\n");
        out.write("      ");
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

  private boolean _jspx_meth_web_005fdisplayBean_005f2(javax.servlet.jsp.tagext.JspTag _jspx_th_web_005felse_005f1, PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  web:displayBean
    com.microstrategy.web.app.taglibs.DisplayBeanTag _jspx_th_web_005fdisplayBean_005f2 = (com.microstrategy.web.app.taglibs.DisplayBeanTag) _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.get(com.microstrategy.web.app.taglibs.DisplayBeanTag.class);
    _jspx_th_web_005fdisplayBean_005f2.setPageContext(_jspx_page_context);
    _jspx_th_web_005fdisplayBean_005f2.setParent((javax.servlet.jsp.tagext.Tag) _jspx_th_web_005felse_005f1);
    // /jsp/PDF_Options_Content.jsp(23,3) name = bean type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayBean_005f2.setBean("options");
    // /jsp/PDF_Options_Content.jsp(23,3) name = styleName type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_web_005fdisplayBean_005f2.setStyleName("PDFOptionsStyle");
    int _jspx_eval_web_005fdisplayBean_005f2 = _jspx_th_web_005fdisplayBean_005f2.doStartTag();
    if (_jspx_th_web_005fdisplayBean_005f2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.reuse(_jspx_th_web_005fdisplayBean_005f2);
      return true;
    }
    _005fjspx_005ftagPool_005fweb_005fdisplayBean_0026_005fstyleName_005fbean_005fnobody.reuse(_jspx_th_web_005fdisplayBean_005f2);
    return false;
  }
}
