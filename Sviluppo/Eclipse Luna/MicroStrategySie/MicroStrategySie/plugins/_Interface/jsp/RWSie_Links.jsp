<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<%-- DHTML.js is necessary when HTML mode is On and current RW document is prompted which is waiting for user's input --%>
<web:ifBeanValue  bean="rwb" mproperty="getXMLStatus" value="6"><web:then >
 <web:ifFeature  name="html"><web:then >
  <web:resource  type="custom-javascript" name="@_Interface:javascript/DHTML.js" />
 </web:then></web:ifFeature>
</web:then></web:ifBeanValue>
<%-- These are only necessary if editing is enabled --%>
<web:ifBeanValue  bean="rwb" mproperty="getXMLStatus" value="2"><web:else >
 <web:ifFeature  type="bean" value="rwframe" name="rw-interactive-view-mode-eplus"><web:then >
  <web:resource  type="style" name="dnd.css"/>
 </web:then></web:ifFeature>
</web:else></web:ifBeanValue>
<web:resource  type="style" name="ReportDefaults.css"/>
<%-- Use different css for the look and feel between Design and View mode --%>
<web:ifBeanValue  bean="rwframe" mproperty="getDesignMode" value="0"><web:then >
 <web:resource  type="style" name="mstr/DocumentView.css"/>
</web:then><web:else >
 <web:resource  type="style" name="mstr/DocumentDesign.css"/>
 <web:resource  type="style" name="../style/ReportTransformGridDesign.css"/>
</web:else></web:ifBeanValue>
<%-- Files for the new look and feel --%>
<web:resource  type="style" name="mstr/layoutDialogs.css"/>
<web:resource  type="style" name="mstr/schemeDialogs.css"/>
<web:resource  type="style" name="mstr/folderTransform.css"/>
<web:resource  type="style" name="mstr/colorGradientEditor.css"/>
<web:resource  type="style" name="mstr/scroller.css"/>
<web:resource  type="style" name="mstr/pageRW.css"/>
<web:resource  type="style" name="mstr/pageWait.css"/>
<web:ifBeanValue  bean="rwb" mproperty="getXMLStatus" value="2"><web:else >
 <web:ifFeature  type="bean" value="rwframe" name="rw-interactive-view-mode-eplus"><web:then >
  <web:resource  type="style" name="mstr/tree.css"/>
 </web:then></web:ifFeature>
</web:else></web:ifBeanValue>
<web:resource  type="style" name="mstr/menus.css"/>
<web:resource  type="style" name="mstr/buttonsRW.css"/>
<web:resource  type="style" name="mstr/pageBySection.css"/>
<web:ifFeature  name="lTbar" type="browserSetting" value="1"><web:then >
<web:resource  type="style" name="mstr/dockLeft.css"/>
</web:then></web:ifFeature>
<web:resource  type="style" name="mstr/pageRW.css"/>
<web:resource  type="style" name="mstr/filterEditor.css"/>
<web:resource  type="style" name="mstr/fileBrowser.css"/>
<web:resource  type="style" name="mstr/selector.css"/>
<web:resource  type="custom-style" name="@_Interface:style/sie_style.css" />
<%-- Javascript files --%>
<web:ifFeature  name="dhtml"><web:then >
 <web:resource  type="javascript" name="mstrRWUnitBone.js"/>  
 <web:resource  type="javascript" name="serializer.js"/>
 <web:resource  type="javascript" name="updateManager.js"/>
 <web:resource  type="javascript" name="clientSideDescriptor.js"/>
 <web:resource  type="javascript" name="GradientUtil.js"/>
 <web:resource  type="javascript" name="mstrColorGradientEditorImpl.js"/>
 <web:resource  type="javascript" name="mstrRWColorGradientEditorImpl.js"/>
 <web:resource  type="javascript" name="print.js"/>
 <script>
 function submitLink(oAnchor) {
    var sTarget; sTarget = oAnchor.target;
    //submit always using a form so max state is submitted:
    var oForm = createDynamicForm(oAnchor.href);
    if (sTarget) oForm.target = sTarget;
    submitForm(oForm);
    return false;
 }
 </script>
 
 <%-- These are only necessary if editing is enabled --%>
<web:ifBeanValue  bean="rwb" mproperty="getXMLStatus" value="2"><web:else >
 <web:ifFeature  type="bean" value="rwframe" name="rw-interactive-view-mode-eplus"><web:then >
  <web:resource  type="style" name="mstr/Wizard.css"/>
  <web:resource  type="javascript" name="mask.js"/>
  <web:resource  type="javascript" name="maskMapped.js"/>
  <web:resource  type="javascript" name="subSectionMask.js"/>
  <web:resource  type="javascript" name="selections.js"/>
  <web:resource  type="javascript" name="dragnDropObj.js"/>
  <web:resource  type="javascript" name="docSelections.js"/>
  <web:resource  type="javascript" name="observer.js"/>
  <web:resource  type="javascript" name="objProps.js"/>
  <web:resource  type="javascript" name="colResizeImpl.js"/>
  <web:resource  type="javascript" name="gridMapper.js"/>
  <web:resource  type="javascript" name="template.js"/>
  <web:resource  type="javascript" name="mstrObjectBrowserImpl.js"/>
  <web:resource  type="javascript" name="mstrReportObjectsImpl.js"/>
 </web:then></web:ifFeature>
</web:else></web:ifBeanValue>
 <web:resource  type="javascript" name="dropdown.js"/>
 <web:resource  type="javascript" name="toolbar.js"/>
 <web:resource  type="javascript" name="tab.js"/>
 <web:resource  type="javascript" name="docCommands.js"/>
 <web:resource  type="javascript" name="viewerCommands.js"/>
 <web:resource  type="javascript" name="doc.js"/>
 <web:resource  type="javascript" name="features.js"/>
 <web:resource  type="javascript" name="section.js"/>
 <web:resource  type="javascript" name="mstrSubSection.js"/>
 <web:resource  type="javascript" name="mstrFixedPanel.js"/>
 <web:resource  type="javascript" name="mstrPanel.js"/>
 <web:resource  type="javascript" name="mstrPanelStack.js"/>
 <web:resource  type="javascript" name="mstrRoundedRectangle.js"/>
 <web:resource  type="javascript" name="docViewer.js"/>
 <web:resource  type="javascript" name="tableUtils.js"/>
 <web:resource  type="javascript" name="gridGlobalsGG.js"/>
 <web:resource  type="javascript" name="grid.js"/>
 <web:resource  type="javascript" name="mstrPortalImpl.js"/>
 <web:resource  type="javascript" name="mstrRWControlImpl.js"/>
 <web:resource  type="javascript" name="AC_OETags.js"/>
 
</web:then><web:else >
<web:resource  type="style" name="mstr/DocumentViewHTML.css"/>
<web:resource  type="style" name="mstr/ie7.css" />
</web:else></web:ifFeature>
