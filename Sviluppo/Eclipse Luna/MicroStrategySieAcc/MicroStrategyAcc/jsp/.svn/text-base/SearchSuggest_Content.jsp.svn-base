<%
 /*
  * SearchSuggest_Content.jsp
  * SearchBox basically HTML structure and bone to support QuickSearch, and also SQL Search in DHTML mode.
  *
  * Copyright 2010 MicroStrategy Incorporated. All rights reserved.
  */
%>

<%@ page errorPage="Error_Content.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>

<web:ifFeature name="object-search">
<web:then>

<web:clientSideDescriptor IDs="9049,9135,9246,9264,11231" />

<div id="mstrSearchSuggest" class="mstrSearchSuggestSections" scriptclass="mstrSearch" n="mstrSearchSuggest">
    <div class="SearchBoxSection" id="SearchBoxWrapper">
        <table class="SearchBox-Wrapper" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td class="searchInputTD">
                <div style="position: relative;">
                    <div class="SearchBox-suggestDiv" style="positionx: relative; background: none repeat scroll 0% 0% transparent;">
                        <input type="text" maxlength="100" id="suggestedPattern"  n="suggestedPattern" disabled="disabled" autocomplete="off" class="SearchBox-input">
                    </div>
                    <div class="SearchBox">
                        <div class="SearchBox-tip" n="searchTip"></div>
                        <input type="text" maxlength="100" id="searchPattern2" name="searchPattern2" n="searchPattern2" class="SearchBox-input" autocomplete="off" size="25" <web:descriptor attribute="title" key="mstrWeb.4325" desc="Search" /> value=""> 
                    </div>
                </div>
            </td>
            <td class="searchSpinnerTD">
               <div class="SearchBox-actions">
                   <div id="sbClear" n="sbClear" class="SearchBox-clear" <web:descriptor attribute="title" key="mstrWeb.2827" desc="Clear" />></div>
                   <div id="sbSpinner" n="sbSpinner" class="SearchBox-spinner" <web:descriptor attribute="title" key="mstrWeb.5720" desc="Waiting..." />></div>
               </div>
            </td>
            <td class="searchButtonTD">
                <div class="SearchBox-bgx">
                   <div id="sbSearch" n="sbSearch" class="SearchBox-search" tabindex="0" <web:descriptor attribute="title" key="mstrWeb.4325" desc="Search" />></div>
                </div>
            </td>
            <!-- 
            
             <td class="searchSettingTD">
                 <div class="SearchBox-bg">
                   <div id="sbSettings" n="sbSettings" class="SearchBox-settings" <web:descriptor attribute="title" key="mstrWeb.3653" desc="Advanced Options" />></div>
                </div>
            </td>
             -->
        </tr>
    </table>
    
     
    
    <!-- This is placeholder to display Search Suggestion -->
    <div id="SearchSuggestionPlaceholder" class="SearchSuggestionSection" n="SearchSuggestionPlaceholder"></div>
    
    </div> <!-- End of SearchBoxSection -->
  
    <!-- This is placeholder to display Search Suggestion -->
   <!-- 
     <div id="SearchSuggestionPlaceholder" class="SearchSuggestionSection"></div>
    -->
   
    <!-- This is placeholder to display search results -->
    <div id="SearchResultsPlaceholder" class="SearchResultsSection" n="SearchResultsPlaceholder"></div>
    
    <!-- This is placeholder to display Incremental Search Toolbar -->
    <div id="IncFetchPlaceholder" class="IncFetchToolBar clearfixx" n="IncFetchPlaceholder"></div>
    
</div>

<script language=javascript>
//Get search properties and register search bone
var searchProps = null;
switch (microstrategy.pageName) {
case 'search':  //search page
    searchProps = <web:displayBean bean="ssb" styleName="SearchSuggestStyle"/>;
    
    searchProps.supportOMD = true;
    searchProps.searchPattern =  (searchProps.searchPattern); //#598849 - escape( ) when sending, now unescape it
    searchProps.folderBoneId = 'folderAllModes';
    searchProps.styleName = '<web:value type="preference" name="folderViewMode" />' == 'FolderStyleList' ? 'FolderStyleQuickSearchResults' : 'FolderStyleQuickSearchResultsIcon';
    searchProps.objectType = (searchProps.objectType || '3,8,14081').split(',');  //default types to search

    //register folder bone
    microstrategy.bonesToRegister.push(
            {
               id: "folderAllModes", 
               loadCondition : "true"
            });
    break;
case 'summary'://summary page - when used as homepage, it should have the same behavior as desktop (home)page.
case 'desktop':
    searchProps = <web:displayBean bean="ssb" styleName="SearchSuggestDesktopQuickStyle"/>;
    searchProps.isDesktopSearchBox = true; //TODO: this should come from transform FP
    break;
case 'my':  //folder pages
case 'shared':
    searchProps = <web:displayBean bean="ssb" styleName="SearchSuggestQuickStyle"/>;
    searchProps.rootFolderType = {my: 20, shared: 7}[microstrategy.pageName] || 39;
    break;
default:  //generic header searchbox and preferences page header searchbox
    searchProps= <web:displayBean bean='ssb' styleName='SearchSuggestQuickStyle'/>;
    break;
}

//load allowed object types from preference
searchProps.allowedObjectTypesData = <web:value type="misc" name="searchObjectTypes" /> || []; 

//register search bone
var boneProp = {
        id: "mstrSearchSuggest", 
        loadCondition: "true",
        properties: searchProps                                 
      };
      
if (mstr.$A.findByForm(microstrategy.bonesToRegister, boneProp.id, 'id') > -1) {
    // when 'showHeaderbar' sys_definition is enabled, there will be a second searchbox rendereed in header shortcuts bar when _Interface is present.
    // Although this is not expected, it is difficult to fix it in jsp, so the workaround here is simply make both work. 
    document.getElementById(boneProp.id).id = boneProp.id + '1';
    boneProp.id = boneProp.id + '1';
    microstrategy.bonesToRegister.push(boneProp);
} else {
    microstrategy.bonesToRegister.push(boneProp);
}
</script>

</web:then>
</web:ifFeature>
