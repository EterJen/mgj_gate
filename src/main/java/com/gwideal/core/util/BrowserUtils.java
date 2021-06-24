package com.gwideal.core.util;

import java.net.URLEncoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletResponse;

public class BrowserUtils {
	public static final String IE9 = "MSIE 9.0";
	  public static final String IE8 = "MSIE 8.0";
	  public static final String IE7 = "MSIE 7.0";
	  public static final String IE6 = "MSIE 6.0";
	  public static final String IE = "IE";
	  public static final String MAXTHON = "Maxthon";
	  public static final String QQ = "QQBrowser";
	  public static final String FIREFOX = "Firefox";
	  public static final String CHROME = "Chrome";
	  
	  public static void setExport(String browser, String RealName, HttpServletResponse response) throws Exception {
	    if ("Chrome".equals(browser)) {
	      
	      RealName = new String(RealName.getBytes("GBK"), "iso8859-1");
	      response.addHeader("Content-Disposition", 
	          "attachment;filename=" + RealName);
	    }
	    else if ("Firefox".equals(browser)) {

	      
	      RealName = URLEncoder.encode(RealName, "UTF-8");
	      response.addHeader("Content-Disposition", 
	          "attachment;filename*=" + RealName);
	    }
	    else {
	      
	      RealName = URLEncoder.encode(RealName, "UTF-8");
	      response.addHeader("Content-Disposition", 
	          "attachment;filename=" + RealName);
	    } 
	  }



	  
	  public static boolean regex(String regex, String str) {
	    Pattern p = Pattern.compile(regex, 8);
	    Matcher m = p.matcher(str);
	    return m.find();
	  }

	  
	  public static String checkBrowser(String userAgent) {
	    if (regex("Firefox", userAgent))
	    {
	      return "Firefox";
	    }
	    if (regex("Chrome", userAgent))
	    {
	      return "Chrome";
	    }
	    return "IE";
	  }
}
