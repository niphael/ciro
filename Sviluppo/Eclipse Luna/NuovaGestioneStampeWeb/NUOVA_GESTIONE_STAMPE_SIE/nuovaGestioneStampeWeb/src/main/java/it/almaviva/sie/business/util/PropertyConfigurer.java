package it.almaviva.sie.business.util;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.stereotype.Component;
@Component
public class PropertyConfigurer extends PropertyPlaceholderConfigurer {
	private Map<String, String> resolvedProps;
  	
	

  @Override
  protected void processProperties(ConfigurableListableBeanFactory beanFactoryToProcess,
      Properties props) throws BeansException {
      super.processProperties(beanFactoryToProcess, props);
      resolvedProps = new HashMap<String, String>();
      for (Object key : props.keySet()) {
          String keyStr = key.toString();
          resolvedProps.put(keyStr, parseStringValue(props.getProperty(keyStr), props,
                  new HashSet()));
      }
  }

  public Map<String, String> getResolvedProps() {
      return Collections.unmodifiableMap(resolvedProps);
  }
}
