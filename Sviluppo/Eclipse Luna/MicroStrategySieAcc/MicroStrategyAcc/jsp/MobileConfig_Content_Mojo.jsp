<%@ taglib uri="/webUtilTL.tld" prefix="web" %>

<div id="mobileConfigView"></div>

<script type="text/javascript">

    //Set application config.
    mstrConfig = {
      taskURL: '<web:taskProcessorName type="admin"/>',
      
      <web:ifFeature type="systemPreference" name="validateRandNum"><web:then>
 		  validateRandNum: '<web:value type="httpSession" name="validateRandNum"/>',
 	  </web:then></web:ifFeature>
 	  
 	 <web:ifFeature type="preference" name="enableUsherAuthenticationOption"><web:then>
        isUsherAuthVisible: true, </web:then>
     <web:else>isUsherAuthVisible: false,</web:else></web:ifFeature>
 		
      thousandsSep: '<web:value type="misc" name="thousandSeparator"/>',
      decimalSep: '<web:value type="misc" name="decimalSeparator"/>',
      listSep: '<web:value type="misc" name="listSeparator"/>',
      mstrDescs: <web:bundleDescriptor name="mojo-mobile-config"/>,
      onMobileDevice: false
    };

	var mstrApp = {
		name: '<web:value type="config" name="servletDeploymentName"/>',
		jsRoot: '../javascript/',
		jsMojoRoot: '../javascript/mojo/js/source/',
		localeId: '<web:connectionValue property="locale"/>',
		helpUrl: '<web:value type="systemPreference" name="helpUrl" />',
		displayLocaleId: '<web:connectionValue property="displayLocaleID"/>',
		resourceFeedURL: '<web:resourceFeedName/>',
		configId: '<web:value type="requestKey" name="configId"/>',
	 	
		device: '<web:value type="requestKey" name="device"/>',
        isTouchApp: function() {return false;}		
	};
</script>

<web:resource type="jsbundle" bundleName="mojo-coreui" debugBundleName="mojo-coreui-debug" />
<web:resource type="jsbundle" bundleName="mojo-mobile-config" />
<web:showBundleDescriptor name="mojo-mobile-config"/>
