package com.gwideal.core.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gwideal.core.basic.l2.service.CoreMpsModuleService;
import com.gwideal.core.basic.l2.service.RedisService;
import com.gwideal.core.basic.l2.service.RedisUserLoginInfo;
import com.gwideal.core.basic.l4.entity.AuthUri;
import com.gwideal.core.cms.l2.service.AdministratorService;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.common.SystemUtils;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@SuppressWarnings("SpringJavaAutowiringInspection")
@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {


    @Autowired
    private UserDetailsService userDetailsService;


    @Autowired
    private CoreMpsModuleService coreMpsModuleService;

    @Autowired
    private AuthUri authUri;

    @Autowired
    private AuthService authService;

    @Autowired
    AdministratorService administratorService;
    @Autowired
    private RedisUserLoginInfo redisUserLoginInfo;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Value("${jwt.header}")
    private String tokenHeader;

    @Value("${jwt.tokenHead}")
    private String tokenHead;

    @Autowired
    RedisService redisService;


    private static String[] dengerUri = {"f", "cc"};
    protected static List<Pattern> patterns = new ArrayList<Pattern>();
    protected static List<Pattern> staticSourcePatterns = new ArrayList<Pattern>() {{
        add(Pattern.compile(".*=3231"));
        add(Pattern.compile(".*\\.js"));
        add(Pattern.compile(".*\\.html"));
        add(Pattern.compile(".*\\.css"));
        add(Pattern.compile(".*\\.ico"));
        add(Pattern.compile(".*\\.svg"));
        add(Pattern.compile(".*\\.json"));
        add(Pattern.compile(".*\\.ICO"));
        add(Pattern.compile(".*\\.gif"));

        add(Pattern.compile(".*\\.GIF"));
        add(Pattern.compile(".*\\.bmp"));
        add(Pattern.compile(".*\\.BMP"));
        add(Pattern.compile(".*\\.jpg"));
        add(Pattern.compile(".*\\.JPG"));
        add(Pattern.compile(".*\\.jpeg"));
        add(Pattern.compile(".*\\.JPEG"));
        add(Pattern.compile(".*\\.png"));
        add(Pattern.compile(".*\\.PNG"));
        add(Pattern.compile(".*\\.swf"));

        add(Pattern.compile(".*\\.ttf"));
        add(Pattern.compile(".*\\.woff2"));
        add(Pattern.compile(".*\\.woff"));

        add(Pattern.compile(".*\\.dotm"));
    }};

    static {
        patterns.add(Pattern.compile(".*\\.js"));
        patterns.add(Pattern.compile(".*\\.html"));
        patterns.add(Pattern.compile(".*\\.css"));
        patterns.add(Pattern.compile(".*\\.ico"));
        patterns.add(Pattern.compile(".*\\.svg"));
        patterns.add(Pattern.compile(".*\\.json"));
        patterns.add(Pattern.compile(".*\\.ICO"));
        patterns.add(Pattern.compile(".*\\.gif"));

        patterns.add(Pattern.compile(".*\\.GIF"));
        patterns.add(Pattern.compile(".*\\.bmp"));
        patterns.add(Pattern.compile(".*\\.BMP"));
        patterns.add(Pattern.compile(".*\\.jpg"));
        patterns.add(Pattern.compile(".*\\.JPG"));
        patterns.add(Pattern.compile(".*\\.jpeg"));
        patterns.add(Pattern.compile(".*\\.JPEG"));
        patterns.add(Pattern.compile(".*\\.png"));
        patterns.add(Pattern.compile(".*\\.PNG"));
        patterns.add(Pattern.compile(".*\\.swf"));

        patterns.add(Pattern.compile(".*\\.flv"));
        patterns.add(Pattern.compile(".*\\.zip"));
        patterns.add(Pattern.compile(".*\\.txt"));
        patterns.add(Pattern.compile(".*\\.doc"));
        patterns.add(Pattern.compile(".*\\.ppt"));
        patterns.add(Pattern.compile(".*\\.xls"));
        patterns.add(Pattern.compile(".*\\.pdf"));
        patterns.add(Pattern.compile(".*\\.map"));
        patterns.add(Pattern.compile(".*\\.ttf"));
        patterns.add(Pattern.compile(".*\\.woff2"));
        patterns.add(Pattern.compile(".*\\.woff"));
        patterns.add(Pattern.compile(".*\\.xlsx"));
        patterns.add(Pattern.compile(".*\\.docx"));
        patterns.add(Pattern.compile(".*\\.xml"));

        patterns.add(Pattern.compile(".*\\.dotm"));
        patterns.add(Pattern.compile(".*\\.wps"));
        patterns.add(Pattern.compile(".*\\.ofd"));
        patterns.add(Pattern.compile(".*\\.wpt"));
        patterns.add(Pattern.compile("auth"));
        patterns.add(Pattern.compile("sso"));
        patterns.add(Pattern.compile(".*cors.*"));
        patterns.add(Pattern.compile(".*trustedRequest/.*"));
        patterns.add(Pattern.compile(".*index"));
        patterns.add(Pattern.compile(".*ukeySso/.*"));
        patterns.add(Pattern.compile(".*swapPwd.*"));
        patterns.add(Pattern.compile(".*redis.*"));
        patterns.add(Pattern.compile(".*attach.*"));
        patterns.add(Pattern.compile(".*ExternalExchange.*"));
        patterns.add(Pattern.compile(".*visualWF.*"));
        patterns.add(Pattern.compile(".*cacheUser.*"));
        patterns.add(Pattern.compile(".*initUserCache.*"));
        patterns.add(Pattern.compile(".*\\.do"));
    }

    private boolean isInclude(String url) {
        for (Pattern pattern : patterns) {
            Matcher matcher = pattern.matcher(url);
            if (matcher.matches()) {
                return true;
            }
        }
        return false;
    }

    private boolean isStaticSourceInclude(String url) {
        for (Pattern pattern : staticSourcePatterns) {
            Matcher matcher = pattern.matcher(url);
            if (matcher.matches()) {
                return true;
            }
        }
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {


        String url = request.getRequestURI().substring(request.getContextPath().length());
        if (url.startsWith("/") && url.length() > 1) {
            url = url.substring(1);
        }
        if ("/".equals(url)) {
            response.sendRedirect("apps/user-view/index");
            return;
        }

        if ("mng".equals(url)) {
            final HttpSession session = request.getSession();
            final String id = session.getId();
            System.out.println(id);
            final int localPort = request.getLocalPort();
            response.sendRedirect("index");
            return;
        }
        if (isInclude(url)) {
            if (isStaticSourceInclude(url)) {
                response.setHeader("Cache-Control", " max-age=7200");
                response.setHeader("Expires", "Mon, 20 Jul 2019 23:00:00 GMT");
                response.setHeader("Pragma", "public");
                response.setHeader("Etag", "cacheIsFuny");
            }
            chain.doFilter(request, response);
            return;
        } else {
            HttpSession session = request.getSession(true);
            Administrator coreUser = null;

            final Object authUser = session.getAttribute("authUser");
            if (null != authUser) {
                coreUser = (Administrator) authUser;
            }

            /*从未登陆 考虑是通过凭证token访问 判断凭证建立有效连接*/
            if (null == coreUser) {
                String authorizationHeader = request.getHeader("Authorization");
                if (StringUtils.isNotBlank(authorizationHeader)) {
                    if (authorizationHeader != null && authorizationHeader.startsWith("akCorsToken ")) {
                        String[] s = authorizationHeader.split(" ");
                        if (null != s && 2 == s.length) {
                            String akCorsToken_ = s[1];
                            if (StringUtils.isNotBlank(akCorsToken_)) {
                                String userNameByToken = redisUserLoginInfo.getUserNameByToken(akCorsToken_);
                                if (StringUtils.isNotBlank(userNameByToken)) {
                                    final UserDetails userDetails = userDetailsService.loadUserByUsername(userNameByToken);
                                    JwtUser userDetails1 = (JwtUser) userDetails;
                                    if ("success".equals(userDetails1.getStatus())) {
                                        coreUser = userDetails1.getCoreUser();
                                        Administrator safeCacheUser = redisService.selUser(coreUser);
                                        coreUser = new Administrator();
                                        coreUser.setId(safeCacheUser.getId());
                                        coreUser.setName(safeCacheUser.getName());
                                        coreUser.setUsermode(safeCacheUser.getUsermode());
                                        coreUser.setIsdelete(safeCacheUser.getIsdelete());
                                        coreUser.setSessionId(akCorsToken_);
                                        session.setAttribute("authUser", coreUser);
                                    } else {
                                        coreUser = null;
                                    }
                                }
                            }
                        }
                    }
                }
            }


            if (coreUser == null || StringUtils.isBlank(coreUser.getName()) || StringUtils.isBlank(coreUser.getSessionId())) {
                ObjectMapper objectMapper = new ObjectMapper();
                ResultInfo<Administrator> ri = new ResultInfo<Administrator>();
                ri.setResultType("sessionInvalid");
                ri.setMessage("用户尚未登录，请登录");
                String resultJson = objectMapper.writeValueAsString(ri);
                response.setContentType("text/html");
                response.setCharacterEncoding("utf-8");
                PrintWriter out = response.getWriter();
                out.write(resultJson);
                out.close();
                return;
            }



            /*未登录或会话失效*/
            if (!redisUserLoginInfo.effective(coreUser)) {
                //如果已经登录，但是提供的token和已存储的token不一致，则表示会话已失效
                ObjectMapper objectMapper = new ObjectMapper();
                ResultInfo<Administrator> ri = new ResultInfo<Administrator>();
                ri.setResultType("sessionInvalid");
                ri.setMessage("会话已经失效，请重新登录");
                String resultJson = objectMapper.writeValueAsString(ri);
                response.setContentType("text/html");
                response.setCharacterEncoding("utf-8");
                PrintWriter out = response.getWriter();
                out.write(resultJson);
                out.close();
                return;
            }

            Administrator coreUserCache = redisService.selUser(coreUser);
            /*uri 权限过滤*/
            String uri = request.getRequestURI();
            if (authUri.getUriList().contains(uri)) {
                Set<String> userAuthUri = coreUserCache.getUserAuthUri();
                boolean uriAuth = false;
                if (null == userAuthUri || userAuthUri.isEmpty()) {
                    uriAuth = false;
                } else {
                    uriAuth = userAuthUri.contains(uri);
                }
                if (!uriAuth) {
                    ObjectMapper objectMapper = new ObjectMapper();
                    ResultInfo<Administrator> ri = new ResultInfo<Administrator>();
                    ri.setResultType("noUriAuth");
                    ri.setMessage("用户无访问权限" +
                            uri);
                    String resultJson = objectMapper.writeValueAsString(ri);
                    response.setContentType("text/html");
                    response.setCharacterEncoding("utf-8");
                    PrintWriter out = response.getWriter();
                    out.write(resultJson);
                    out.close();
                    return;
                }
            }


            JwtUser complexUser = new JwtUser(coreUser.getId(), coreUser.getName(), coreUser.getPassword(), coreUserCache, null, null);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(complexUser, null, complexUser.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);
        }

    }


}
