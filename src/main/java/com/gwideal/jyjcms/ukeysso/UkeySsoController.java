
package com.gwideal.jyjcms.ukeysso;

import com.gwideal.core.cms.l3.dao.AdministratorMapper;
import com.gwideal.core.cms.l4.entity.Administrator;
import com.gwideal.core.jwt.AuthMapper;
import com.gwideal.core.jwt.AuthService;
import com.gwideal.core.workflow.ComResult;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ukeySso")
public class UkeySsoController {
    @Autowired
    private AuthMapper authMapper;

    @Autowired
    private AuthService authService;
    @Autowired
    private AdministratorMapper administratorMapper;

    @RequestMapping(value = "/randSign")
    public ResultInfo<ComResult> getRand() {
        ResultInfo<ComResult> result = new ResultInfo<ComResult>();
        result.setResultType("success");

        String url = "http://222.73.255.10:10318/GeneratorChallenge";
        String rand = "";
        URL openurl;
        try {
            openurl = new URL(url);
            HttpURLConnection yc = (HttpURLConnection) openurl.openConnection();
            yc.setConnectTimeout(2000);
            yc.setReadTimeout(2000);
            BufferedReader in = new BufferedReader(new InputStreamReader(yc.getInputStream()));
            String inputLine = null;
            while ((inputLine = in.readLine()) != null) {
                rand = inputLine.toString();
            }
            in.close();
            yc.disconnect();

            if (rand.length() > 0) {
                result.setMessage(rand);
            } else {
                result.setResultType("fail");
                result.setMessage("获取随机数长度为0，无法继续");
            } 
        } catch (Exception e) {
            result.setResultType("fail");
            result.setMessage("ukey自动登录失败，请通过密码验证登录");
        }

        return result;
    }

    @RequestMapping(value = "/login")
    public ResultInfo<Administrator> login(@RequestBody Map<String,String> postBean, HttpServletRequest request) {
        ResultInfo<Administrator> result = new ResultInfo<Administrator>();
        result.setResultType("success");

        String sCredential=postBean.get("authClientCtrl");
        String randomshu=postBean.get("rendsign");

        String sname=null;
        String checkrest="";
        String url= "http://222.73.255.10:10318/VerifyIdentityTicket";
        URL openurl;
        String resStr ="";

        try {
            openurl = new URL(url);
            HttpURLConnection ycs=(HttpURLConnection) openurl.openConnection();
            ycs.setDoInput(true);
            ycs.setDoOutput(true);
            ycs.setRequestMethod("POST");
            ycs.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
            OutputStream os  =ycs.getOutputStream();
            //???????
            String soap="<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+
                    "<verifyidentityticketreq version=\"1\">"+
                    "<challenge>"+randomshu+"</challenge>"+
                    "<identityticket>"+sCredential+"</identityticket>"+
                    "<appserverid>337c7f2b-7a34-4f50-9141-bab9e6478cc8</appserverid>"+
                    "</verifyidentityticketreq>";
            os.write(soap.getBytes());
            InputStream is =ycs.getInputStream();
            byte[] b =new byte[1024];
            int len = 0;
            while((len=is.read(b))!=-1){
                String ss =new String (b,0,len,"UTF-8");
                resStr+=ss;
            }
            String getret =resStr.substring(resStr.indexOf("<result>")+8, resStr.indexOf("</result>"));
            Base64.Decoder decoder=Base64.getDecoder();

            checkrest=new String(decoder.decode(getret),"UTF-8");
            is.close();
            os.close();
            ycs.disconnect();

        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            result.setResultType("fail");
            result.setMessage(e.getMessage());
        } catch (Exception e){
            e.printStackTrace();
            result.setResultType("fail");
            result.setMessage(e.getMessage());
        }

        String getret=checkrest.substring(checkrest.indexOf("<result>")+8, checkrest.indexOf("</result>"));
        System.out.print("getret=="+checkrest);
        if("0".equals(getret)){
            sname=checkrest.substring(checkrest.indexOf("<name>")+6, checkrest.indexOf("</name>"));
            sname = StringUtils.trim(sname);

            List<Administrator> users = authMapper.findByName(sname);
            if (null == users) {
                result.setResultType("fail");
                result.setMessage("用户名无效: [" + sname + "] 该用户不存在");
            } else if (users.isEmpty()) {
                result.setResultType("fail");
                result.setMessage("用户名无效: [" + sname + "] 该用户在系统中不存在");
            } else if (users.size() > 1) {
                result.setResultType("fail");
                result.setMessage("用户名无效: [" + sname + "] 该用户在系统存在同名，本次认证无效");
            } else {
                Administrator administrator = users.get(0);
                Administrator administratorUpdateBean = new Administrator();
                administratorUpdateBean.setId(administrator.getId());
                administratorUpdateBean.setUsbKeyInfo(checkrest);
                administratorMapper.updateByPrimaryKeySelective(administratorUpdateBean);
                result = authService.loginDeatil(users.get(0), request);
            }

        }else {
            result.setResultType("fail");
            result.setMessage("getret 状态不为0 无法继续");
        }

        return result;
    }
}
