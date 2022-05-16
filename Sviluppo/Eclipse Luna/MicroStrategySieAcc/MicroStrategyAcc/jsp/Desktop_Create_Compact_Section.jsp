<%
  /****
  * Desktop_Create_Section.jsp
  * This file displays links to Create Report and Create Document.
  *
  * Copyright 2004 MicroStrategy Incorporated. All rights reserved.
  * version: 1.2
  * xhtml: true
  ****/
%><%@ page errorPage="JSP_Error.jsp"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ taglib uri="/webUtilTL.tld" prefix="web" %>

<web:ifFeature name="create-objects">
<web:then>
 <div class="mstrDesktopSection" id="dktpSectionCreate">
  <div class="mstrDesktopSectionTitle"><div class="mstrDesktopSectionIcon"><web:descriptor key="mstrWeb.6155" desc="Create" /></div></div>
</web:then>
<web:else>
	<web:ifFeature name="template-documents;dhtml;documents-design-mode">
	<web:then>
 <div class="mstrDesktopSection" id="dktpSectionCreate">
  <div class="mstrDesktopSectionTitle"><div class="mstrDesktopSectionIcon"><web:descriptor key="mstrWeb.6155" desc="Create" /></div></div>
	</web:then>
	</web:ifFeature>
</web:else>
</web:ifFeature>

  <web:ifFeature name="dhtml;create-analysis"><web:then>
    <a href="#" class="mstr-dskt-lnk new-analysis" onclick="microstrategy.createIVE();">
       <div class="mstr-dskt-icn"></div>
       <div class="mstr-dskt-nm"><web:descriptor key="mstrWeb.9929" desc="New Dashboard" /></div>
       <div class="mstr-dskt-dsc"><web:descriptor desc="Create a quick analysis or dashboard from imported or existing data." key="mstrWeb.11114"/></div>
    </a>
  </web:then></web:ifFeature>
  <web:ifFeature name="create-view-reports"><web:then>
    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenCreate" linkAttributes ="class='mstr-dskt-lnk new-report'">
       <div class="mstr-dskt-icn"></div>
       <div class="mstr-dskt-nm"><web:descriptor key="mstrWeb.9930" desc="New Report" /></div>
       <div class="mstr-dskt-dsc"><web:descriptor key="mstrWeb.49" desc="Create and publish a new report on this site." /></div>
      </web:urlEvent>
  </web:then></web:ifFeature>
  <web:ifFeature name="template-documents;dhtml;documents-design-mode"><web:then>
    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenCreateDocument" linkAttributes ="class='mstr-dskt-lnk new-rwd'">
       <div class="mstr-dskt-icn"></div>
       <div class="mstr-dskt-nm"><web:descriptor key="mstrWeb.5898" desc="New Document"/></div>
       <div class="mstr-dskt-dsc"><web:descriptor key="mstrWeb.11115" desc="Create an enterprise report or scorecard from scratch or from a template."/></div>
      </web:urlEvent>
  </web:then></web:ifFeature>
  <web:ifFeature name="dhtml;use-prompt-editor"><web:then>
    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenCreatePromptPage" linkAttributes ="class='mstr-dskt-lnk new-prompt'">
       <div class="mstr-dskt-icn"></div>
       <div class="mstr-dskt-nm"><web:descriptor desc="New Prompt" key="mstrWeb.5730"/></div>
       <div class="mstr-dskt-dsc"><web:descriptor desc="Create a prompt to ask for user input." key="mstrWeb.8980"/></div>
      </web:urlEvent>
  </web:then></web:ifFeature>
  <web:ifFeature name="dhtml;use-report-filter-editor;savetemplatefilter"><web:then>
    <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenFilterEditor" linkAttributes ="class='mstr-dskt-lnk new-filter'">
       <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentIsNew" value="true" />
       <div class="mstr-dskt-icn"></div>
       <div class="mstr-dskt-nm"><web:descriptor desc="New Filter" key="mstrWeb.5425"/></div>
       <div class="mstr-dskt-dsc"><web:descriptor desc="Create a filter to filter data." key="mstrWeb.8981"/></div>
      </web:urlEvent>
  </web:then></web:ifFeature>
  <web:ifFeature name="dhtml;web-import-data"><web:then>
    <web:ifFeature type="systemPreference" name="enableQB"><web:then>
      <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenImportWizardEntryPage" linkAttributes="class='mstr-dskt-lnk import'">
        <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentIsNew" value="true" />
        <div class="mstr-dskt-icn"></div>
        <div class="mstr-dskt-nm"><web:descriptor key="mstrWeb.7972" desc="Import Data" /></div>
        <div class="mstr-dskt-dsc"><web:descriptor desc="Import Data from Files, Databases, Salesforce, Hadoop or Web Services." key="mstrWeb.9170"/></div>
      </web:urlEvent>
    </web:then><web:else>
      <web:urlEvent eventID="com.microstrategy.web.app.beans.EnumServletEvents.WebEventOpenImportWizard" linkAttributes="class='mstr-dskt-lnk import'">
        <web:eventArgument name="com.microstrategy.web.app.beans.EnumServletEvents.WebEventArgumentIsNew" value="true" />
        <div class="mstr-dskt-icn"></div>
        <div class="mstr-dskt-nm"><web:descriptor key="mstrWeb.7972" desc="Import Data" /></div>
        <div class="mstr-dskt-dsc"><web:descriptor desc="Import Data from Files, Databases, Salesforce, Hadoop or Web Services." key="mstrWeb.9170"/></div>
      </web:urlEvent>
    </web:else></web:ifFeature>
  </web:then></web:ifFeature>
  <web:ifFeature name="dhtml;web-use-custom-group-editor"><web:then>
    <a href="#" class="mstr-dskt-lnk new-cg" onclick="microstrategy.openCustomGroupEditor();">
       <div class="mstr-dskt-icn"></div>
       <div class="mstr-dskt-nm"><web:descriptor key="mstrWeb.8113" desc="New Custom Group" /></div>
       <div class="mstr-dskt-dsc"><web:descriptor desc="Create a custom group to segment report data." key="mstrWeb.8979"/></div>
    </a>
  </web:then></web:ifFeature>
  <web:ifFeature name="dhtml;create-metric"><web:then>
    <a href="#" class="mstr-dskt-lnk new-metric" onclick="microstrategy.openMetricEditor();">
       <div class="mstr-dskt-icn"></div>
       <div class="mstr-dskt-nm"><web:descriptor key="mstrWeb.2213" desc="New Metric" /></div>
       <div class="mstr-dskt-dsc"><web:descriptor desc="Create a metric to analyze data." key="mstrWeb.8977"/></div>
    </a>
  </web:then></web:ifFeature>
  <web:ifFeature name="dhtml;web-import-data;save-report-privilege"><web:then>
    <span class="mstr-dskt-lnk mstr-file">
        <div class="mstr-dskt-icn"></div>
        <div class="mstr-dskt-nm"><web:descriptor key="mstrWeb.11443" desc="Import MicroStrategy File" /></div>
        <div class="mstr-dskt-dsc"><web:descriptor key="mstrWeb.11470" desc="Import a dashboard packaged in a MicroStrategy file (.mstr)." /></div>
        <form id="import_form_dsktp"class="mstrmojo-FileUploadBox" target="import_iframe" enctype="multipart/form-data" method="post" action="<web:taskProcessorName />">
            <input type="file" class="mstrmojo-FileUploadBox-file" size="30" name="myFile" onchange="microstrategy.uploadDashboardFile('import_form_dsktp');" accept=".mstr" title="">
            <input type="hidden" name="fileFieldName" value="myFile">
            <input type="hidden" name="taskId" value="importSaveRWD">
            <input type="hidden" name="taskEnv" value="jsonp2">
            <input type="hidden" name="jsonp" value="parent.microstrategy.uploadCallback(@R@)">
            <input type="hidden" name="myfile" value="">
            <input type="hidden" name="sessionState" value = "<web:connectionValue property="sessionState"/>">
        </form>  
    </span>
  </web:then></web:ifFeature>

<web:ifFeature name="template-reports">
<web:then>
 </div>
</web:then>
<web:else>
	<web:ifFeature name="template-documents;dhtml;documents-design-mode">
	<web:then>
 </div>
	</web:then>
	</web:ifFeature>
</web:else>
</web:ifFeature>
