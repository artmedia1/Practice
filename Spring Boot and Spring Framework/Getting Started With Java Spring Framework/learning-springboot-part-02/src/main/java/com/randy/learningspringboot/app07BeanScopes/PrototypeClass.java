package com.randy.learningspringboot.app07BeanScopes;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Scope(value= ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component
public class PrototypeClass {
}
