package com.gwideal.core.startup.servlet;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class ServletConfiguration  {

    
    @Bean
    public ServletRegistrationBean testServlet() {
        ServletRegistrationBean registration = new ServletRegistrationBean(new UploadServlet());
        registration.setEnabled(true);
        registration.addUrlMappings("/attach/uploadWps");
        return registration;
    }
    @Bean
    public ServletRegistrationBean ExternalExchange() {
        ServletRegistrationBean registration = new ServletRegistrationBean(new ExternalExchangeServlet());
        registration.setEnabled(true);
        registration.addUrlMappings("/ExternalExchange");
        return registration;
    }
    @Bean
    public ServletRegistrationBean uploadRedTemplate() {
        ServletRegistrationBean registration = new ServletRegistrationBean(new UploadRedTemplateServlet());
        registration.setEnabled(true);
        registration.addUrlMappings("/attach/uploadRedTemplate");
        return registration;
    }
    
    @Bean
    public ServletRegistrationBean downloadServlet() {
        ServletRegistrationBean registration = new ServletRegistrationBean(new DownloadServlet());
        registration.setEnabled(true);
        registration.addUrlMappings("/attach/downloadWps");
        return registration;
    }

    @Bean
    public ServletRegistrationBean printFormDownloadServlet() {
        ServletRegistrationBean registration = new ServletRegistrationBean(new PrintFormDownloadServlet());
        registration.setEnabled(true);
        registration.addUrlMappings("/printForm/downloadPdf");
        return registration;
    }

    @Bean
    public ServletRegistrationBean updateOfdServlet() {
        ServletRegistrationBean registration = new ServletRegistrationBean(new UpdateOfdServlet());
        registration.setEnabled(true);
        registration.addUrlMappings("/attach/updateOfd");
        return registration;
    }

}
