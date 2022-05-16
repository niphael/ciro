<%@ page errorPage="JSP_Error.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>
<div id="mainApp"></div>
<script type="text/javascript"> 
          //Set application config.
          mstrConfig = {
              simpleDialog: true,
              taskURL: '<web:taskProcessorName />',
              thousandsSep: '<web:value type="misc" name="thousandSeparator"/>',
              decimalSep: '<web:value type="misc" name="decimalSeparator"/>',
              listSep: '<web:value type="misc" name="listSeparator"/>',
              jsLibs: '../javascript-libraries/',
              onMobileDevice: false
          };
</script>

<%-- Include the Mojo JavaScript bundle! --%>
<script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script> 

<web:resource type="jsbundle" bundleName="mojo-coreui" debugBundleName="mojo-coreui-debug" />
<web:resource type="jsbundle" bundleName="mojo-mobile" debugBundleName="mojo-mobile-debug" />
<web:resource type="jsbundle" bundleName="winphone-app-hosted" />

<script type="text/javascript">     
          //Set application globals.
          mstrApp = new mstrmojo.MobileApp({
              id: 'mobileApp',
              deviceType: 3,          /* mstrmojo.MobileConfigConstants.DEVICE_ANDROID */
              placeholder: 'mainApp',
              name: '<web:value type="config" name="servletDeploymentName"/>',
              pageName: '<web:beanValue property="name"/>',
              localeId: '<web:connectionValue property="locale"/>',
              helpUrl: '<web:value type="systemPreference" name="helpUrl" />',
              displayLocaleId: '<web:connectionValue property="displayLocaleID"/>',
              jsRoot: '../javascript/',   <%-- TODO: Need to send down actual value --%>
              jsMojoRoot: '../javascript/mojo/js/source/',
              viewFactory: new mstrmojo.winphone.ViewFactory(),
              serverProxy: new mstrmojo.MobileServerProxy({
                  transport: mstrmojo.XHRServerTransport
              })
          });
       mstrApp.start();
</script>



