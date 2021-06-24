package com.gwideal.core.yeWu.l1.controllear;


import com.gwideal.core.yeWu.l2.service.PyOverSeasUserService;
import com.gwideal.core.yeWu.l4.entity.PyOverSeasUser;
import com.gwideal.core.yeWu.l5.utils.VerifyUtil;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/pyOverSeasUser")
public class PyOverSeasUserController {
    /**
     * 处理用户注册,找回密码
     * 登录
     * 修改信息等
     */
    @Autowired
    PyOverSeasUserService pyOverSeasUserService;
    /**
     * 密码正则，数字、英文、特殊符号8到30位
     * 符合二级等保要求
     */
    public static final String REGEX_PASSWORD_STRONG = "^(?![0-9]+$)(?![^0-9]+$)(?![a-zA-Z]+$)(?![^a-zA-Z]+$)(?![a-zA-Z0-9]+$)[a-zA-Z0-9\\S]{8,}$";

    /**
     * 登录
     *
     * @param login_map
     * @param session
     * @return
     */
    @RequestMapping(value = "/trustedRequest/login")
    public JSON login(@RequestBody Map login_map, HttpSession session) {
        JSONObject json = new JSONObject();
        System.out.println("-------------login----:" + login_map.size());
        Object obj_username = login_map.get("username");
        String username = obj_username == null ? "" : obj_username.toString().trim().toLowerCase();
        Object obj_password = login_map.get("password");
        String password = obj_password == null ? "" : obj_password.toString().trim();

        if (username.length() == 0 || password.length() < 8) {
            json.put("code", "-1");
            json.put("msg", "您输入的账号或密码不正确！");

        } else {
            /**
             * 加密出来每个密码都不一样
             */
            password = username + "|" + password;
            /**
             * 加密
             */
            String passowrd_md5 = DigestUtils.md5DigestAsHex(password.getBytes());

            PyOverSeasUser pyOverSeasUser = pyOverSeasUserService.getPyOverSeasUser(username, passowrd_md5);

            if (pyOverSeasUser == null) {
                json.put("code", "-2");
                json.put("msg", "您输入的账号或密码不正确");

            } else if (pyOverSeasUser.getState() != 1) {
                json.put("code", "-3");
                json.put("msg", "你输入的账号已被关闭");
            } else {
                boolean flag = Pattern.matches(REGEX_PASSWORD_STRONG, password);
                json.put("code", "1");
                if (!flag) {
                    json.put("code", "1");
                    json.put("msg", "密码不复合密码要去请修改密码！");
                }


                session.setAttribute("pyoverseasuser", pyOverSeasUser);
//                Session
                /**
                 * 查询用户权限
                 *
                 */

            }
        }
        return json;
    }


    /**
     * 生成验证码
     *
     * @return
     */
    @RequestMapping(value = "/trustedRequest/verCode")
    public void verCode(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("image/jpeg");//设置相应类型,告诉浏览器输出的内容为图片
        response.setHeader("Pragma", "No-cache");//设置响应头信息，告诉浏览器不要缓存此内容
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expire", 0);
        VerifyUtil randomValidateCode = new VerifyUtil();
        randomValidateCode.getRandcode(request, response);//输出验证码图片
        //验证码从session中取出来看看
//        String yanzhengm= (String) request.getSession().getAttribute("RANDOMREDISKEY");

//        return null;
    }


    /**
     * 注册
     *
     * @param request
     * @param login_map
     * @return
     */
    @RequestMapping(value = "/trustedRequest/register")
    public JSON register(HttpServletRequest request, @RequestBody Map login_map) {
        Object obj_username = login_map.get("username");
        String username = obj_username == null ? "" : obj_username.toString().trim().toLowerCase();
        Object obj_password = login_map.get("password");
        String password = obj_password == null ? "" : obj_password.toString().trim();
        Object obj_email = login_map.get("email");
        String email = obj_email == null ? "" : obj_email.toString().trim();
        Object obj_oragnname = login_map.get("oragnname");
        String oragnname = obj_oragnname == null ? "" : obj_oragnname.toString().trim();
        Object obj_verCode = login_map.get("verCode");
        String verCode = obj_verCode == null ? "" : obj_verCode.toString().trim().toLowerCase();
        JSONObject jsonObject = new JSONObject();
        //验证验证码
        String yanzhengm = (String) request.getSession().getAttribute("RANDOMREDISKEY");
        boolean flag = Pattern.matches(REGEX_PASSWORD_STRONG, password);
        if (!flag) {
            jsonObject.put("code", "-1");
            jsonObject.put("msg", "密码不复合密码要去请修改密码！");
        }else if (verCode.equals(yanzhengm.toLowerCase())) {
            if (username.length() > 0) {
                //验证用户名
                PyOverSeasUser pyOverSeasUser = pyOverSeasUserService.getPyOverSeasUser(username, "");
                if (pyOverSeasUser != null) {
                    jsonObject.put("code", "-1");
                    jsonObject.put("msg", "用户名已存在！");
                } else {

                    /**
                     * 加密出来每个密码都不一样
                     */
                    password = username + "|" + password;
                    /**
                     * 加密
                     */
                    String passowrd_md5 = DigestUtils.md5DigestAsHex(password.getBytes());
                    pyOverSeasUserService.savePyOverSeasUser(username, passowrd_md5, email, oragnname);
                    jsonObject.put("code", "1");
                }
            }
        } else {
            jsonObject.put("code", "-1");
            jsonObject.put("msg", "验证码输入有误，请重新输入。");
        }
        return jsonObject;
    }

    /**
     * 找回密码
     *
     * @param request
     * @param login_map
     * @return
     */
    @RequestMapping(value = "/trustedRequest/goForgetPassword")
    public JSON goForgetPassword(HttpServletRequest request, @RequestBody Map login_map) {
        Object obj_username = login_map.get("username");
        String username = obj_username == null ? "" : obj_username.toString().trim().toLowerCase();
        Object obj_email = login_map.get("email");
        String email = obj_email == null ? "" : obj_email.toString().trim().toLowerCase();

        SimpleDateFormat simpleDateFormatNotReplace = new SimpleDateFormat("yyyyMMddHHmmss");

        String str_date = simpleDateFormatNotReplace.format(new Date());
        String token_UUID = UUID.randomUUID().toString().toUpperCase().replaceAll("-", "");

        String new_token = str_date + token_UUID;

        //jdk8特性
        Base64.Encoder encoder = Base64.getEncoder();
        //编码
        String encoder_token = encoder.encodeToString(new_token.getBytes());

        JSONObject jsonObject = new JSONObject();
        PyOverSeasUser pyOverSeasUser = pyOverSeasUserService.getPyOverSeasUser(username, "");
        if (pyOverSeasUser == null) {
            jsonObject.put("code", "-1");
            jsonObject.put("msg", "用户名或邮箱输入错误！");
        } else {
            if (email.equals(pyOverSeasUser.getEmail().toLowerCase())) {
                //保存到usertoken
                pyOverSeasUserService.updatePyOverSeasUserToken(username, encoder_token);
                jsonObject.put("code", "1");
                String mail_content = pyOverSeasUser.getOrganizationname() + " 您好，\n" +
                        "\n" +
                        "这是您要求重置密码的帐户：" + pyOverSeasUser.getUsername() +
                        "，请复制粘贴下面的链接至浏览器地址栏打开： http://?token=" + encoder_token +
                        "\n重置密码链接有效期10天！超期请重新发起申请！";

            } else {
                jsonObject.put("code", "-1");
                jsonObject.put("msg", "邮箱或者用户名输入错误！");
            }
        }

        /**
         * 写日志
         */

//


        return jsonObject;
    }


    /**
     * 用户重置密码
     *
     * @param request
     * @param login_map
     * @return
     */
    @RequestMapping(value = "/trustedRequest/resetPassword")
    public JSON resetPassword(HttpServletRequest request, @RequestBody Map login_map) {

        JSONObject jsonObject = new JSONObject();
        Object obj_userToken = login_map.get("userToken");
        String userToken = obj_userToken == null ? "" : obj_userToken.toString().trim();
        Object obj_password = login_map.get("password");
        String password = obj_password == null ? "" : obj_password.toString().trim();
        //重置的密码需要复合密码规则

        boolean flag = Pattern.matches(REGEX_PASSWORD_STRONG, password);
        if (!flag) {
            jsonObject.put("code", "-1");
            jsonObject.put("msg", "密码不复合密码要去请修改密码！");
        }else if (userToken.length() < 20) {
            //userToken不合理
            jsonObject.put("code", "-1");
            jsonObject.put("msg", "此重置密码链接已失效！");
        } else {
//            解码json
            Base64.Decoder decoder = Base64.getDecoder();
            String token = "";
            try {
                token = new String(decoder.decode(userToken.getBytes()), "UTF-8");
                String str_ctokenDate = token.substring(0, 14);
                SimpleDateFormat simpleDateFormatReplace = new SimpleDateFormat("yyyyMMddHHmmss");
                Date date_ctokenDate = simpleDateFormatReplace.parse(str_ctokenDate);
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(date_ctokenDate);
                calendar.add(Calendar.DATE, 10);

                Date new_cTokenDate = calendar.getTime();
                if (new_cTokenDate.getTime() > new Date().getTime()) {
                    //通过token获取用户
                   PyOverSeasUser pyOverSeasUser=pyOverSeasUserService.getPyOverSeasUserToken(userToken);
                   if(pyOverSeasUser==null){
                       //查询不到，可能重新获取过，被覆盖，或者伪造的-此重置密码链接已失效。
                       jsonObject.put("code", "-1");
                       jsonObject.put("msg", "此重置密码链接已失效！");
                   }else{
                       pyOverSeasUserService.updatePyOverSeasUserTokenPassword(password,userToken);
                       jsonObject.put("code", "1");
                   }
                } else {
                    //连接超期了
                    jsonObject.put("code", "-1");
                    jsonObject.put("msg", "此重置密码链接已失效！");
                }
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
                //解码失败
                jsonObject.put("code", "-1");
                jsonObject.put("msg", "此重置密码链接已失效！");
            } catch (ParseException e) {
                e.printStackTrace();
                //日期被篡改
                jsonObject.put("code", "-1");
                jsonObject.put("msg", "此重置密码链接已失效！");
            }
        }
        return jsonObject;
    }


}
