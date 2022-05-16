<%
 /*
  * Search_Content.jsp
  * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
  */
%>

<%@ page errorPage="Error_Content.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>

<web:ifFeature name="dhtml">
<web:then>

<web:clientSideDescriptor IDs="2,3,73,162,163,271,272,715,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1995,2058,2033,2102,2398,2399,2509,2520,2969,2986,3012,3677,3680,3852,3853,3854,3855,3856,3857,3858,3859,3860,3861,3862,3863,4223,5717,5878,5879,5961,5972,8145,8146,8147,8211,8212,8213,8951,8952,9049,9168,9202"/>

<web:ifFeature name="i-frame">
 <web:then>
  <web:updateManager />
 </web:then>
</web:ifFeature>

 <table class="mstrSearchContainer" width="100%" cellspacing="0" cellpadding="0">
 <tr>
<!-- Left Side Tabs -->
 <td valign="top" class="mstrSearchContainerPanels">
 
<div class="mstrSearchTabs" id="searchTabs" scriptclass="mstrSearchTabsImpl">
<!-- Tab tip to toggle sidebar -->
<div id="tabToggler" class="mstrSearchTab toggler" ty='btn'><div class="icon-toggle">&nbsp;</div></div>

<div id="tabSearch" class="mstrSearchTab search" ty='tab'>
<div class="mstrSearchTabTitle" ty="ttl"><web:descriptor key="mstrWeb.10" desc="Search" /><div class="mstrSearchTabAction collapsed" ty="act" title="<web:descriptor key="mstrWeb.8951" desc="Show search options panel" />"></div></div>
<div class="content" ty="cnt">
    <jsp:include page='/jsp/Advanced_Search.jsp' flush="true" />
</div>
</div>

<%-- Browse tab --%>
<web:ifFeature name="public-reports"><web:then>
<div id="tabBrowse" class="mstrSearchTab browse" ty='tab'>
    <div class="mstrSearchTabTitle" ty="ttl"><web:descriptor key="mstrWeb.1825" desc="Browse" /></div>
    <div class="content" ty="cnt"></div>
</div>
</web:then></web:ifFeature>

<%-- Create tab --%>
<web:ifFeature name="create-objects"><web:then>
<div id="tabCreate" class="mstrSearchTab create" ty='tab'>
    <div class="mstrSearchTabTitle" ty="ttl"><web:descriptor key="mstrWeb.6155" desc="Create" /></div>
    <div class="content" ty="cnt"></div>
</div>
</web:then></web:ifFeature>

<%-- Tools tab --%>
<web:ifFeature name="preferences"><web:then>
<div id="tabTools" class="mstrSearchTab tools" ty='tab'>
    <div class="mstrSearchTabTitle" ty="ttl"><web:descriptor key="mstrWeb.3497" desc="Tools" /></div>
    <div class="content" ty="cnt"></div>
</div>
</web:then></web:ifFeature>

<!-- Filler tab - fake tab to fill up space below last tab -->
<div id="tabFiller" class="mstrSearchTab filler"></div>

</div>

</td>
<td valign="top" width="100%" class="mstrSearchContainerContent">

<div class="mstrSearchStacks">

<%-- Stack 1 - Search --%>

<!--  folder bone elem -->
<div id="folderAllModes" scriptclass="mstrFolderSearchImpl">
   <jsp:include page='/jsp/SearchSuggest_Content.jsp' flush="true" />
</div>


<%-- Stack 2 - Desktop section View --%>
<jsp:include page='/jsp/Desktop_View_Section.jsp' flush="true" />

<%-- Statck 3 - Desktop section Create --%>
<jsp:include page='/jsp/Desktop_Create_Section.jsp' flush="true" />

<%-- Stack 4 - Desktop section Tools --%>
<jsp:include page='/jsp/Desktop_Tools_Section.jsp' flush="true" />

</div>

</td>
</tr>
</table>


<script language="javascript">
 if (typeof(microstrategy) != 'undefined') {
    microstrategy.registerBone("searchTabs", (true), {
        selectedIndex : <web:value type="browserSetting" name="sidx"/>,
        visible : <web:value type="browserSetting" name="sps"/>,
        stacks: [document.getElementById('folderAllModes'), 
                    document.getElementById('dktpSectionView'),
                    document.getElementById('dktpSectionCreate'),
                    document.getElementById('dktpSectionTools')]
    });
  }
</script>

</web:then>
<web:else>

<TABLE BORDER="0" CELLSPACING="0" CELLPADDING="0" >
    <TR>
        <%-- Render the search page.--%>
        <TD COLSPAN="2">
            <web:ifBeanValue bean="sb" property="isAdvanced">
                <web:then>
                   <web:displayBean bean="sb" styleName="AdvancedSearchStyle"/>
                </web:then>
                <web:else>
                   <web:displayBean bean="sb" styleName="QuickSearchStyle"/>
                </web:else>
            </web:ifBeanValue>  
        </TD>
    </TR>
    <%-- If the results are ready for the current search, display the results. --%>
    <web:ifBeanValue bean="sb" property="showResults">
        <web:then>
            <TR>
                <TD COLSPAN="2">
                    <BR /><HR /><BR />
                    <web:displayBean bean="sb.results" />
                </TD>
            </TR>
        </web:then>
    </web:ifBeanValue>
</TABLE>


</web:else>
</web:ifFeature>

