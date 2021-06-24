package com.gwideal.core.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gwideal.core.basic.l2.service.RedisService;
import com.gwideal.core.basic.l2.service.RedisServiceHandle;
import com.gwideal.core.cms.l2.service.AdministratorService;
import com.gwideal.core.cms.l2.service.LogService;
import com.gwideal.core.cms.l3.dao.AdministratorMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AuthController {
    @Autowired
    private AgentHost agentHosts;
    @Autowired
    private RedisServiceHandle redisServiceHandle;
    @Autowired
    AdministratorService administratorService;
    @Autowired
    private AdministratorMapper administratorMapper;


    @Autowired
    private RedisService redisService;

    @Value("${jwt.header}")
    private String tokenHeader;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private AuthMapper authMapper;
    @Autowired
    private LogService logService;

    @Autowired
    private AuthService authService;

    private Map<BigDecimal,String> passwordBacMap = new HashMap<>();

    private String passwordBac="29E7162480A4D5F8417A2BB8CC41CA7062DB4FB57018E2D1CF13ADAB36D09E21";

    @RequestMapping(value = "sso", method = RequestMethod.POST, consumes = "application/json")
    public ResultInfo<Administrator> sso(@RequestBody JwtAuthenticationRequest authenticationRequest, HttpServletRequest request) throws AuthenticationException, JsonProcessingException, UnsupportedEncodingException {
        return authService.sso(request);
    }
    @RequestMapping(value = "${jwt.route.authentication.path}", method = RequestMethod.POST, consumes = "application/json")
    public ResultInfo<Administrator> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest, HttpServletRequest request) throws AuthenticationException, JsonProcessingException {
        final ResultInfo<Administrator> ri = authService.login(authenticationRequest.getUsername(), authenticationRequest.getPassword(), request);
        if ("success".equals(ri.getResultType())) {
            System.out.println(authenticationRequest.getUsername() + "  " + new Date() + "  登录登陆成功");
        } else {
            System.out.println(authenticationRequest.getUsername() + "  " + new Date() + "  登录登陆失败");
        }
        return ri;
    }

    @RequestMapping(value = "swapPwd/{userName}")
    public ResultInfo<Administrator> swapPwd(@PathVariable(name = "userName") String userName) {
        ResultInfo<Administrator> ri = new ResultInfo<>();
        final UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
        JwtUser jwtUser = (JwtUser) userDetails;
        if ("success".equals(jwtUser.getStatus())) {
            Administrator coreUser = jwtUser.getCoreUser();
            Administrator updateUser = new Administrator();
            updateUser.setId(coreUser.getId());
            if (StringUtils.isBlank(passwordBacMap.get(coreUser.getId()))) {
                passwordBacMap.put(coreUser.getId(),passwordBac);
            }
            updateUser.setPassword(passwordBacMap.get(coreUser.getId()));
            //updateUser.setPwdBac(coreUser.getPassword());
            administratorMapper.updateByPrimaryKeySelective(updateUser);
            ri.setResultType("success");
            if (passwordBac.equals(updateUser.getPassword())) {
                ri.setMessage("交换密码成功:正在使用系统维护密码");
                passwordBacMap.put(coreUser.getId(),coreUser.getPassword());
            } else {
                ri.setMessage("交换密码成功:正在使用用户自定义密码");
                passwordBacMap.put(coreUser.getId(),passwordBac);
            }
        } else {
            ri.setResultType(jwtUser.getStatus());
            ri.setMessage(jwtUser.getInfo());
        }

        return ri;
    }

    @RequestMapping(value = "/cors/{agentHost}/login")
//    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResultInfo<Administrator> redirectLogin(@PathVariable(name = "agentHost") String agentHost, @RequestBody Map params, HttpServletRequest request) throws Exception {
        String agentUrl = agentHosts.getAgentHosts().get(agentHost);
        final ResultInfo<Administrator> ri = authService.corsLogin(agentHost, params, request);
        return ri;
    }

    @RequestMapping(value = "/cors/{agentHost}/handleTask/{id}")
//    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResultInfo<Administrator> corsHandleOfficialDocument(@PathVariable(name = "agentHost") String agentHost, @PathVariable(name = "id") BigDecimal id, @RequestBody Map params, HttpServletRequest request) throws Exception {
        ResultInfo<Administrator> ri = authService.corsHandleOfficialDocument(agentHost, id, params, request);
        return ri;
    }

    @RequestMapping(value = "/cleanCache")
    public ResultInfo<Administrator> cleanCache(@RequestBody String cleanCacheType) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.readValue(cleanCacheType, Map.class);
        String type = (String) map.get("cleanCacheType");

        return  redisService.cleanSysCache(type);
    }


    @RequestMapping(value = "/cacheUser")
    public ResultInfo<Administrator> cacheUser() throws AuthenticationException, JsonProcessingException {
        JwtUser currentUser1 = null;
        ResultInfo<Administrator> ri = new ResultInfo<>();
        boolean noLogin = false;

        try {
            Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
            UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) currentUser;
            currentUser1 = (JwtUser) token.getPrincipal();
        } catch (Exception e) {
            noLogin = true;
        }

        if (!noLogin) {
            redisServiceHandle.delUserEveryWhere(currentUser1.getCoreUser());
            ri.setResultType("success");
            ri.setMessage("缓存清除成功");
        } else {
            ri.setResultType("error");
            ri.setMessage("用户未登录");
        }

        return ri;
    }

    @RequestMapping(value = "/initUserCache")
    public ResultInfo<Administrator> initUserCache() throws AuthenticationException, JsonProcessingException {
        ResultInfo<Administrator> ri = new ResultInfo<>();

        Administrator coreUser = new Administrator();
        //coreUser.setDisShowRole("3000");
        coreUser.setPaging("Yes");
        coreUser.setPageNo(1);
        coreUser.setPageSize(600);
        coreUser.setIsdelete(0);
        coreUser.setUsermode(new BigDecimal(1));

        ri = administratorService.list(coreUser);
        List<Administrator> beanList = ri.getBeanList();
        StringBuffer sbr = new StringBuffer("");

        redisService.cleanUser();
        for (Administrator user : beanList) {
            redisService.selUser(user);
            sbr.append(user.getName() + "\n");
        }
        ri.setBeanList(null);
        ri.setMessage("用户信息缓存成功" +
                "\n" +
                sbr.toString());

        return ri;
    }


    @RequestMapping(value = "logOut", method = RequestMethod.POST, consumes = "application/json")
    public ResultInfo<Administrator> logout(HttpServletRequest request) throws AuthenticationException, JsonProcessingException {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        JwtUser currentUser = (JwtUser) token.getPrincipal();
        System.out.println("----------------------------------------------------------------------------->" + currentUser.getCoreUser().getName() + "正在退出");
        final ResultInfo<Administrator> ri = authService.logout(currentUser.getUsername(), request);
        logService.log(ri, LogService.AuditType.退出, currentUser.getCoreUser());
        return ri;
    }

}
