<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<%--These includes should eventually be removed. They're currently kept for backwards compatibility: --%>
<web:resource  type="style" name="mstrWeb.css"/>
<web:resource  type="style" name="mstr/layoutDefault.css"/>
<web:resource  type="style" name="mstr/schemeDefault.css"/>
<web:resource  type="style" name="mstr/editorII.css"/>
<web:resource  type="style" name="mstr/layoutDialogs.css"/>
<web:resource  type="style" name="mstr/schemeDialogs.css"/>
<web:resource  type="style" name="mstr/pageRW.css"/>
<web:resource  type="style" name="mstr/pageWait.css"/>
<web:resource  type="style" name="@_Interface:/style/sie_style.css" />
<%--
 Check if the user has the DHTML preference turned on to determine whether
  the page should load some JavaScripr functions.
 <web:ifFeature runat="server" name="dhtml">
     [JavaScript code]
 </web:ifFeature>
--%>
<web:ifFeature  name="dhtml"><web:then>
<web:resource  type="javascript" name="DHTML.js"/>
<web:resource  type="javascript" name="IFRAME.js"/>
<web:resource  type="javascript" name="interfaces.js"/>
<web:resource  type="javascript" name="microstrategy.js"/>
<web:resource  type="javascript" name="errors.js"/>
<web:resource  type="javascript" name="bone.js"/>
<web:resource  type="javascript" name="formatObject.js"/>
<web:resource  type="javascript" name="number.js"/>
<web:resource  type="javascript" name="dialog.js"/>
<web:resource  type="javascript" name="HTMLAttributes.js"/>
<web:resource  type="javascript" name="editor.js"/>
<web:resource  type="javascript" name="mstrEventManager.js"/>
<web:resource  type="javascript" name="clientSideDescriptor.js"/>
<web:resource  type="javascript" name="updateManager.js"/>
<web:resource type="javascript" name="print.js"/>
<script language="JavaScript">
try { document.execCommand("BackgroundImageCache", false, true); } catch(err) {} 
</script>
</web:then></web:ifFeature>
