package com.gwideal.core.jwt;

import com.gwideal.core.basic.l2.service.*;
import com.gwideal.core.cms.l2.service.AdministratorService;
import com.gwideal.core.cms.l2.service.LogService;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.common.HttpClientTool;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
public class AuthService implements UserDetailsService {


    @Autowired
    private RedisUserLoginInfo redisUserLoginInfo;

    @Autowired
    private LogService logService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthMapper authMapper;


    @Autowired
    HttpClientTool httpClientTool;

    @Autowired
    AdministratorService administratorService;

    @Value("${jwt.tokenHead}")
    private String tokenHead;

    public ResultInfo<Administrator> restfulLogin(String username, String password, HttpServletRequest request) {
        ResultInfo<Administrator> ri = new ResultInfo<>();
        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (password.equals(userDetails.getPassword())) {
            Administrator Administrator;
            JwtUser userDetails1 = (JwtUser) userDetails;
            if ("success".equals(userDetails1.getStatus())) {
                Administrator = userDetails1.getCoreUser();
                ri = loginDeatil(Administrator, request);
                ri.setBean(Administrator);
            } else {
                ri.setResultType(userDetails1.getStatus());
                ri.setMessage(userDetails1.getInfo());
            }
        } else {
            ri.setResultType("fail");
            ri.setMessage("??????????????????");
        }
        return ri;
    }

    public ResultInfo<Administrator> login(String username, String password, HttpServletRequest request) {
        ResultInfo<Administrator> ri = new ResultInfo<>();

        final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        Administrator administrator = null;
        JwtUser userDetails1 = (JwtUser) userDetails;
        if ("success".equals(userDetails1.getStatus())) {
            administrator = userDetails1.getCoreUser();
            boolean truePwd = false;
            try {
                truePwd = administratorService.checkPwd(username, password);
            } catch (Exception e) {
                //                e.printStackTrace();
                ri.setResultType("fail");
                ri.setMessage("??????????????????");
            }
            if (truePwd) {
                ri = loginDeatil(administrator, request);
            }
        } else {
            ri.setResultType(userDetails1.getStatus());
            ri.setMessage(userDetails1.getInfo());
        }

        return ri;
    }

    /*????????????????????????????????????*/
    public ResultInfo<Administrator> userLogin(Administrator administrator, HttpServletRequest request) {
        HttpSession session = request.getSession();
        final String sessionId = String.valueOf(UUID.randomUUID());
        ResultInfo<Administrator> ri = new ResultInfo<Administrator>();

        if (null != administrator) {
            administrator.setPassword(null);
            administrator.setSessionId(sessionId);
            if (administrator.getUsermode().equals(new BigDecimal("1"))) { //?????????1=?????????????????????????????????????????????????????????token;
                redisUserLoginInfo.login(administrator);
                ri.setResultType("success");
            } else if (administrator.getUsermode().equals(new BigDecimal("2"))) {//?????????2=?????????????????????
                if (redisUserLoginInfo.hasLogin(administrator)) {//????????????????????????????????????????????????
                    ri.setResultType("error");
                    ri.setMessage("???????????????????????????????????????");
                } else {//???????????????????????????????????????????????????????????????????????????
                    redisUserLoginInfo.login(administrator);
                    ri.setResultType("success");
                }
            } else if (administrator.getUsermode().equals(new BigDecimal("3"))) {//?????????3=????????????????????? ??????????????????????????????????????????
                redisUserLoginInfo.loginUnique(administrator);
                ri.setResultType("success");
            } else {
                ri.setResultType("error");
                ri.setMessage("????????????????????????");
            }

            if ("success".equals(ri.getResultType())) {
                /*??????????????????????????????*/
                Administrator safeCacheUser = administratorService.cacheCompleteCopy(administrator);
                /*??????????????????????????? ??????????????????*/
                JwtUser complexUser = new JwtUser(safeCacheUser.getId(), safeCacheUser.getName(), safeCacheUser.getPassword(), safeCacheUser, null, null);
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(complexUser, null, complexUser.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);


                /*??????session????????????????????????  ?????????????????? ?????????????????????????????????*/
                Administrator authUser = new Administrator();
                authUser.setId(safeCacheUser.getId());
                authUser.setName(safeCacheUser.getName());
                //authUser.setUsermode(safeCacheUser.getUsermode());
                authUser.setIsdelete(safeCacheUser.getIsdelete());
                authUser.setSessionId(sessionId);
                session.setAttribute("authUser", authUser);

                logService.log(ri, LogService.AuditType.??????, safeCacheUser);
            }
        }
        return ri;
    }

    public ResultInfo<Administrator> loginDeatil(Administrator administrator, HttpServletRequest request) {
        HttpSession session = request.getSession();
        final String sessionId = String.valueOf(UUID.randomUUID());
        ResultInfo<Administrator> ri = new ResultInfo<Administrator>();

        if (null != administrator) {
            administrator.setPassword(null);
            administrator.setSessionId(sessionId);
            if (administrator.getUsermode().equals(new BigDecimal("1"))) { //?????????1=?????????????????????????????????????????????????????????token;
                redisUserLoginInfo.login(administrator);
                ri.setResultType("success");
            } else if (administrator.getUsermode().equals(new BigDecimal("2"))) {//?????????2=?????????????????????
                if (redisUserLoginInfo.hasLogin(administrator)) {//????????????????????????????????????????????????
                    ri.setResultType("error");
                    ri.setMessage("???????????????????????????????????????");
                } else {//???????????????????????????????????????????????????????????????????????????
                    redisUserLoginInfo.login(administrator);
                    ri.setResultType("success");
                }
            } else if (administrator.getUsermode().equals(new BigDecimal("3"))) {//?????????3=????????????????????? ??????????????????????????????????????????
                redisUserLoginInfo.loginUnique(administrator);
                ri.setResultType("success");
            } else {
                ri.setResultType("error");
                ri.setMessage("????????????????????????");
            }

            if ("success".equals(ri.getResultType())) {
                /*??????????????????????????????*/
                Administrator safeCacheUser = administratorService.cacheCompleteCopy(administrator);
                /*????????????????????? ???????????? */
                JwtUser complexUser = new JwtUser(safeCacheUser.getId(), safeCacheUser.getName(), safeCacheUser.getPassword(), safeCacheUser, null, null);
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(complexUser, null, complexUser.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                /*??????????????????????????????????????? ?????????????????????*/
                Administrator returnCacheUser = administratorService.cacheNgCopy(administrator);
                /*RCurrentTaskInfo rCurrentTaskInfo = new RCurrentTaskInfo();
                rCurrentTaskInfo.setPaging("Yes");
                rCurrentTaskInfo.setPageSize(10);
                rCurrentTaskInfo.setPageNo(1);
                rCurrentTaskInfo.setCurrAdministrator(safeCacheUser);
                returnCacheUser.setToDoTasksInf(rCurrentTaskInfoService.getTodoTask(rCurrentTaskInfo, safeCacheUser));*/

                ri.setBeanId(returnCacheUser.getId());
                ri.setBean(returnCacheUser);

                /*??????session????????????????????????  ?????????????????? ?????????????????????????????????*/
                Administrator authUser = new Administrator();
                authUser.setId(safeCacheUser.getId());
                authUser.setName(safeCacheUser.getName());
                authUser.setIsdelete(safeCacheUser.getIsdelete());
                authUser.setSessionId(sessionId);
                session.setAttribute("authUser", authUser);

                logService.log(ri, LogService.AuditType.??????, safeCacheUser);
            }
        }
        return ri;
    }


    public Administrator findByUsername(String name) {
        List<Administrator> byUsername = authMapper.findByUsername(name);
        if (null != byUsername && !byUsername.isEmpty()) {
            return byUsername.get(0);
        } else {
            return null;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Administrator administrator = new Administrator();
        String status = "success";
        String info = "???????????????:" + username;
        List<Administrator> users = authMapper.findByUsername(username);
        if (null == users) {
            status = "fail";
            info = "???????????????: [" + username + "] ??????????????????";
        } else if (users.isEmpty()) {
            status = "fail";
            info = "???????????????: [" + username + "] ??????????????????????????????";
        } else if (users.size() > 1) {
            status = "fail";
            info = "???????????????: [" + username + "] ???????????????????????????????????????????????????????????????";
        } else {
            administrator = users.get(0);
        }

        return new JwtUser(administrator.getId(), administrator.getName(), administrator.getPassword(), administrator, status, info);
    }


    public ResultInfo<Administrator> logout(String username, HttpServletRequest request) {
        ResultInfo<Administrator> ri = new ResultInfo<Administrator>();

        redisUserLoginInfo.logout((Administrator) (request.getSession(true).getAttribute("authUser")));

        ri.setResultType("success");
        ri.setMessage("??????????????????");
        return ri;
    }

    public ResultInfo<Administrator> corsLogin(String agentHost, Map params, HttpServletRequest request) {


        Administrator administrator = administratorService.akCorsUser(agentHost, params);

        ResultInfo<Administrator> ri = loginDeatil(administrator, request);

        if ("success".equals(ri.getResultType())) {
            ri.setMessage("????????????????????????");
        } else {
            ri.setMessage("???????????????????????????????????????????????????");
        }

        return ri;
    }


    public ResultInfo<Administrator> corsHandleOfficialDocument(String agentHost, BigDecimal id, Map params, HttpServletRequest request) {
        Administrator administrator = administratorService.akCorsUser(agentHost, params);
        ResultInfo<Administrator> ri = userLogin(administrator, request);

        /*???????????? ???????????????????????????*/
        if ("success".equals(ri.getResultType())) {
            /*?????????message ??????????????????????????????messa*/
            ri.setMessage("????????????????????????");
            if (id.compareTo(BigDecimal.ZERO) == 1) {
                //rCurrentTaskInfoService.taskHandle(id, ri);
            }
        } else {
            ri.setMessage("????????????????????????????????????????????????????????????");
        }

        return ri;
    }


    public ResultInfo<Administrator> sso(HttpServletRequest request) throws UnsupportedEncodingException {
        ResultInfo<Administrator> ri = new ResultInfo<>();

        ri.setResultType("fail");
        ri.setMessage("????????????");

        /*???????????????????????? ???????????????????????????????????????????????????*/
        Cookie[] cookies = request.getCookies();
        if (null != cookies && 0 < cookies.length) {
            final HashMap<String, String> stringStringHashMap = new HashMap<>();

            for (Cookie cookie : cookies) {
                String name = cookie.getName();
                String value = cookie.getValue();
                if (StringUtils.isNotBlank(value)) {
                    String decode = URLDecoder.decode(value, "UTF-8");
                    stringStringHashMap.put(name, new String(decode.getBytes("UTF-8"), "UTF-8"));
                }
            }
            final String koal_cert_cn = stringStringHashMap.get("KOAL_CERT_CN");
            final String koal_cert_gn = stringStringHashMap.get("KOAL_CERT_GN");
            if (StringUtils.isNotBlank(koal_cert_cn)) {
                Administrator userBySn = administratorService.findUserBySn(koal_cert_cn);
                if (null == userBySn) {
                    userBySn = new Administrator();
                    userBySn.setSn(koal_cert_cn);
                    userBySn.setName(koal_cert_cn);
                    userBySn.setDisplay(koal_cert_gn);
                    administratorService.autoAdd(userBySn);
                    userBySn = administratorService.findUserBySn(koal_cert_cn);
                }
                ri = loginDeatil(userBySn, request);
            }
        }

               /*
                Cookie[] cookies = request.getCookies();
                if (null != cookies && 0 < cookies.length) {

                    StringBuffer sb = new StringBuffer();
                    for (Cookie cookie : cookies) {
                        String name = cookie.getName();
                        String val = null;
                        String value = cookie.getValue();
                        if (StringUtils.isNotBlank(value)) {
                            String decode = URLDecoder.decode(cookie.getValue(), "UTF-8");
                            val = new String(decode.getBytes("UTF-8"), "UTF-8");
                            sb.append(name).append("--------------");
                            sb.append(val).append("<br/>");
                        }
                    }

                    ObjectMapper objectMapper = new ObjectMapper();
                    ResultInfo<Administrator> ri = new ResultInfo<Administrator>();
                    ri.setResultType("fail");
                    ri.setMessage(sb.toString());
                    String resultJson = objectMapper.writeValueAsString(sb.toString());
                    response.setContentType("text/html");
                    response.setCharacterEncoding("utf-8");
                    PrintWriter out = response.getWriter();
                    out.write(resultJson);
                    out.close();
                    return;
                }
                */


        return ri;
    }
}
