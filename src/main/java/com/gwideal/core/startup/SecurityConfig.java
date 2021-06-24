package com.gwideal.core.startup;

import com.gwideal.core.jwt.JwtAuthenticationEntryPoint;
import com.gwideal.core.jwt.JwtAuthenticationTokenFilter;
import com.gwideal.core.jwt.JxwSha256Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    private CorsConfiguration buildConfig() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*"); // 1、允许的访问源头；
        corsConfiguration.addAllowedHeader("*"); // 2、允许的请求的头；
        corsConfiguration.addAllowedMethod("*"); // 3、允许的请求方法：post,get等等；
        return corsConfiguration;
    }


    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(this.userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

/*    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }*/

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new JxwSha256Encoder();
    }

    @Bean
    public JwtAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
        return new JwtAuthenticationTokenFilter();
    }
    
    @Override
    public void configure(WebSecurity web) throws Exception {
    	  web.ignoring()
          .antMatchers("/**/*.html");
      
    }
    
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                // 由于使用的是JWT，我们这里不需要csrf
                .csrf().disable()

                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                	
                // 基于token，所以不需要session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER).and()
                .headers().frameOptions().disable().and()
                .authorizeRequests()
                //.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // 允许对于网站静态资源的无授权访问
                .antMatchers(
                        "/*.html",
                        "/favicon.ico",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.json",
                        "/**/*.ico",
                        "/**/*.ICO",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.GIF",
                        "/**/*.bmp",
                        "/**/*.BMP",
                        "/**/*.jpg",
                        "/**/*.JPG",
                        "/**/*.jpeg",
                        "/**/*.JPEG",
                        "/**/*.png",
                        "/**/*.PNG",
                        "/**/*.swf",
                        "/**/*.flv",
                        "/**/*.zip",
                        "/**/*.txt",
                        "/**/*.doc",
                        "/**/*.ppt",
                        "/**/*.xls",
                        "/**/*.pdf",
                        "/**/*.css",
                        "/**/*.map",
                        "/**/*.ttf",
                        "/**/*.woff2",
                        "/**/*.woff",
                        "/**/*.xlsx",
                        "/**/*.docx",
                        "/**/*.js",
                        "/**/*.xml",
                        "/**/*.dotm",
                        "/**/*.wps",
                        "/**/*.ofd",
                        "/**/*.wpt",
                        "/save",
                        "/export",
                        "/open"
                ).permitAll()
                // 对于获取token的rest api要允许匿名访问
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/sso").permitAll()
                /*跨域请求放行*/
                .antMatchers("/**/cors/**").permitAll()
                .antMatchers("/**/swapPwd/**").permitAll()
                .antMatchers("/**/redis/**").permitAll()
                //生成权限树父id正式环境不需要
                .antMatchers("/coreMpsModule/mpsModuleCreatParent").permitAll()
                .antMatchers("/**/trustedRequest/**").permitAll()
                .antMatchers("/**/index").permitAll()
                .antMatchers("/**/ukeySso/**").permitAll()
                .antMatchers("/attach/**").permitAll()
                .antMatchers("/ExternalExchange/**").permitAll()
                .antMatchers("/visualWF/**").permitAll()
                .antMatchers("/cacheUser/**").permitAll()
                .antMatchers("/initUserCache/**").permitAll()
                .antMatchers("/restful/**").permitAll()
                // 除上面外的所有请求全部需要鉴权认证
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()//就是这一行啦  
                .anyRequest().authenticated();

        // 添加JWT filter
        httpSecurity.addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class);
        httpSecurity.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

        // 禁用缓存
        httpSecurity.headers().cacheControl();
    } 
}
