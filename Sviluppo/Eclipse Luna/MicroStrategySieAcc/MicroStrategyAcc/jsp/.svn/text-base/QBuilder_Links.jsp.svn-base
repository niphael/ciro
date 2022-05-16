<%
 /****
  * version: 1.2
  * xhtml: true
  ****/
%><%@ page errorPage="Error_Links.jsp"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ page import="com.microstrategy.web.app.beans.PageComponent"
%><%PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");%>
<%
 /****
 * Display the "links" section of the template as specified in pageConfig.xml (i.e. Admin_Links.jsp)
 * <jsp:include page="[a page section]" />
  ****/
%>
<jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("links")%>' flush="true" />

<script type="text/javascript">
    // Set up the config object first.
    mstrConfig = {
        thousandsSep: '<web:value type="misc" name="thousandSeparator"/>',
        decimalSep: '<web:value type="misc" name="decimalSeparator"/>',
        listSep: '<web:value type="misc" name="listSeparator"/>',
        taskURL: '<web:taskProcessorName />',               
        <web:ifFeature type="systemPreference" name="validateRandNum"><web:then>
            validateRandNum: '<web:value type="httpSession" name="validateRandNum"/>',
        </web:then></web:ifFeature>
        <web:ifFeature name="profile-reports"><web:then>
            hasProfileReports: 1,
        </web:then></web:ifFeature> 
        <web:ifFeature name="web-define-view-report"><web:then>
            canCreateReport: 1,
        </web:then></web:ifFeature>
        <web:ifFeature name="create-analysis"><web:then>
            canCreateAnalysis: 1,
        </web:then></web:ifFeature>
        <web:ifFeature name="documents-design-mode"><web:then>
            <web:ifFeature name="manage-datasets"><web:then>
                <web:ifFeature name="document-execution"><web:then>
                    canCreateDocument: 1,
                </web:then></web:ifFeature>
            </web:then></web:ifFeature>
        </web:then></web:ifFeature>
         <web:ifFeature name="use-database-instance-manager"><web:then>
            useDataBaseInstanceManager: 1,
        </web:then></web:ifFeature>
        onMobileDevice: false,
        mstrDescs: <web:bundleDescriptor name="mojo-bootstrap,mojo-qb,mojo-wh"/>
    };

    //Set application object.
    mstrApp = {
        placeholder: 'pagePlaceholder', 
        Privs : '<web:connectionValue property="privsXML"/>',
        msgID: '<web:value type="requestKey" name="messageID"/>',       
        reportID: '<web:value type="requestKey" name="reportID"/>',
        folderID: '<web:value type="requestKey" name="folderID"/>',
        docID: '<web:value type="requestKey" name="messageID"/>',
        projectID: '<web:connectionValue property="projectID"/>',
        isFFSQL: '<web:value type="requestKey" name="FFsql"/>',
        isCloud: ('<web:value type="config" name="cloudEdition" />' == 'Professional'),
        saveAsCube:'<web:value type="requestKey" name="isCube"/>',
        analysisID: '<web:value type="requestKey" name="analysisID"/>',
        isNewAnalysis: '<web:value type="requestKey" name="isNewAnalysis"/>', 
        FlashResBundleURL : '<web:value name="resBundles/DashboardViewerBundle_" type="flashResURL"/>',    
        name: '<web:value type="config" name="servletDeploymentName"/>',
        pageName: '<web:beanValue property="name"/>',
        helpUrl: '<web:value type="systemPreference" name="helpUrl" />',
        userHelpPage: '<web:value type="systemPreference" name="userHelpPage" />',
        helpTopics:{
        	mainDB: 'database_import_page.htm',
        	mainSQL: 'freeform_import_page.htm',
        	tableJoin: 'join_options_dialog_box.htm',
        	filterValue: 'Enter_Value_dialog_box.htm',
        	expression: 'expression_dialog_box.htm',
        	condition: 'new_condition_dialog_box.htm'
        },
        //_JSP[    
        <%-- no need to add jsession id for asp --%>
        <web:ifFeature type="systemPreference" name="useCookies" value="1"><web:then><%-- add jsessionid only cookie is not disabled --%>
         sessionId: '<web:connectionValue property="containerSessionId" />',
        </web:then></web:ifFeature>
         //_JSP]  
        sessionState:'<web:connectionValue property="sessionState"/>',
        servletState: '<web:connectionValue property="servletState"/>',
        localeId: '<web:connectionValue property="locale"/>',
        displayLocaleId: '<web:connectionValue property="displayLocaleID"/>',   
        jsRoot: '../javascript/',   <%-- TODO: Need to send down actual value --%>
        jsMojoRoot: '../javascript/mojo/js/source/',        
        persistTaskParams: <web:value type="persistParameters" name=""/>,
        getPersistParams: function () {return this.persistTaskParams;},
        isOIVM: function() {return true;},
        isTouchApp: function() {return false;}  
    };
</script>


<web:resource type="js-style" name="mojo/css/core.css" />
<web:resource type="js-style" name="mojo/css/qb.css" />
<web:resource type="js-style" name="mojo/css/cge.css" />

<web:resource type="jsbundle" bundleName="mojo-bootstrap" />
<web:resource type="jsbundle" bundleName="mojo-qb" />
<web:resource type="jsbundle" bundleName="mojo-wh" />