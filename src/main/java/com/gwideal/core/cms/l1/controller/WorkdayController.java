
package com.gwideal.core.cms.l1.controller;
import javax.servlet.http.HttpServletRequest;
import javax.validation.groups.Default;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.gwideal.core.jwt.JwtUser;
import com.gwideal.core.util.DateTimeUtils;
import com.gwideal.mybatis.metautils.ResultInfo;
import com.gwideal.core.cms.l4.entity.*;
import com.gwideal.core.cms.l2.service.*;
import com.gwideal.core.cms.l3.dao.WorkdayMapper;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/workday")
public class WorkdayController {

	@Autowired
	WorkdayService workdayService;
	@Autowired
	WorkdayMapper workdayMapper;

	@RequestMapping("/init")
	public ResultInfo<Workday> init(String initType) {
		ResultInfo<Workday> result = new ResultInfo<Workday>();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
		JwtUser currentUser =(JwtUser)token.getPrincipal();
		Workday initBean = null;
		if(initType.equals("create")){
			initBean = new Workday();
		}else if(initType.equals("query")){
			initBean = new Workday();
		}
		result.setBean(initBean);
		return result;
	}


	@RequestMapping("/create")
	public ResultInfo<Workday> create(@RequestBody @Validated(value={Default.class}) Workday workday,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Workday> result = new ResultInfo<Workday>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(workdayService.create(workday)>0){
			result.setResultType("success");
			result.setBeanId(workday.getId());
			result.setMessage("创建成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("创建失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/read/{id}")
	public ResultInfo<Workday> read(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Workday> result = new ResultInfo<Workday>();
		Workday bean = workdayService.read(id);
		if(bean==null){
			result.setResultType("fail");
			result.setMessage("读取的数据不存在");
		}else{
			result.setResultType("success");
			result.setMessage("读取成功");
			result.setBean(bean);
		}
		return result;
	}
	
	@RequestMapping(value="/update")
	public ResultInfo<Workday> update(@RequestBody @Validated(value={Default.class}) Workday workday,BindingResult bindingResult) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Workday> result = new ResultInfo<Workday>();
		if(bindingResult.hasErrors()){
			result.setResultType("validationError");
			for(FieldError fe:bindingResult.getFieldErrors()){
				result.getErrors().put(fe.getField(), fe.getDefaultMessage());
			}
			return result;
		}
		if(workdayService.update(workday)>0){
			result.setResultType("success");
			result.setMessage("更新成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("更新失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/delete/{id}")
	public ResultInfo<Workday> delete(@PathVariable(name="id") BigDecimal id) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		ResultInfo<Workday> result = new ResultInfo<Workday>();
		if(workdayService.delete(id)>0){
			result.setResultType("success");
			result.setMessage("删除成功");	
		}else{
			result.setResultType("fail");
			result.setMessage("删除失败");	
		}
		return result;
	}
	
	@RequestMapping(value="/list")
	public ResultInfo<Workday> list(@RequestBody Workday workday) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken)currentUser;
		JwtUser currentUser1 =(JwtUser)token.getPrincipal();
		workday.setCurrentUser(currentUser1);
		return workdayService.list(workday);
	}

	@RequestMapping(value="/getWorkday")
	public ResultInfo<Workday>  getWorkday(@RequestBody Workday workday){
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, Integer.parseInt(workday.getYear()));
		calendar.set(Calendar.MONTH,Integer.parseInt(workday.getMonth())-1);
		calendar.set(Calendar.DAY_OF_MONTH,1);
		String startdate = DateTimeUtils.parseDate(calendar.getTime(), "yyyy-MM-dd");
		calendar.roll(Calendar.DATE, -1);
		String enddate = DateTimeUtils.parseDate(calendar.getTime(), "yyyy-MM-dd");
		List list=workdayService.getWorkDayListByDate(startdate,enddate);

		ResultInfo<Workday> resultInfo = new ResultInfo<>();
		resultInfo.setResultType("success");
		resultInfo.setBeanList(list);

		return  resultInfo;
	}

	
	@RequestMapping(value="/show")
	 public  ResultInfo<Workday>  show(@RequestBody Workday workday) {
			String year=workday.getYear();
			String month=workday.getMonth();
		    String calendar="";
		    int y = 0;
		    int m = 0;
		    if (StringUtils.isNotEmpty(year))
		    {
		      y = Integer.parseInt(year);
		    }
		    if (StringUtils.isNotEmpty(month))
		    {
		      m = Integer.parseInt(month);
		    }
		    
		    if (y == 0) {
		    
		    	 Calendar t_Calendar = Calendar.getInstance();
		         y= t_Calendar.get(Calendar.YEAR);
		    }
		   
		    long count=workdayService.getYearCount(Integer.valueOf(y)+"");
		    //List<Long> list = this.workDayManager.find(" select count(id) from WorkDay where to_number(to_char(to_date(workdate),'yyyy'))=?", new Object[] { Integer.valueOf(y) });
		 
		      if (count == 0L){
		    	  initWorkDaySet(y); 
		      }
		    
		    calendar = getWorkDay(y, m);
		    
		    //System.out.println("calendar:"+calendar);
		    
		    ResultInfo<Workday> result = new ResultInfo<Workday>();
			Map<String,Object> map= new HashMap<String,Object>();
			map.put("calendar", calendar);
			result.setAdditionalInfo(map);
			result.setResultType("success");
		
			return result;
			
		  }
	
	 private void initWorkDaySet(int year)
	  {
	    Calendar calendar = new GregorianCalendar(year, 0, 1);
	    int i = 1;
	    while (calendar.get(1) < year + 1) {
	      Workday day = new Workday();
	      day.setWorkdate(calendar.getTime());

	      if ((calendar.get(2) + 1 == 1) && (calendar.get(5) == 1))
	      {
	        day.setIswork("0");
	        day.setRemark("元旦");
	        day.setMustworkday("3");
	      }
	      else if ((calendar.get(2) + 1 == 5) && (calendar.get(5) == 1))
	      {
	        day.setIswork("0");
	        day.setRemark("劳动节");
	        day.setMustworkday("3");
	      }
	      else if ((calendar.get(2) + 1 == 10) && (calendar.get(5) == 1))
	      {
	        day.setIswork("0");
	        day.setRemark("国庆节");
	        day.setMustworkday("3");
	      }
	      else if ((calendar.get(7) == 1) || (calendar.get(7) == 7))
	      {
	        day.setIswork("0");
	      }
	      else
	      {
	        day.setIswork("1");
	      }
	      workdayService.create(day);
	      //this.workDayManager.save(day);
	      calendar.add(6, 1);
	    }
	  }
	 
	 
	 private String getWorkDay(int year, int month)
	  {
	    
		 Calendar calendar = Calendar.getInstance();
			
			if(year!=0)
			calendar.set(Calendar.YEAR, year);
			if(month!=0)
			calendar.set(Calendar.MONTH, month-1);
			calendar.set(Calendar.DAY_OF_MONTH, 1);
			
			int nMonth=calendar.get(Calendar.MONTH)+1;//这是哪个月的参数,这是要传入的参数
			int DayCount;
			
			if (nMonth==4 || nMonth==6 || nMonth==9 || nMonth==11) {
				DayCount = 30;
			} else if (nMonth==2) {
				if (IsRunYear(calendar.get(Calendar.YEAR))) {
					DayCount = 29;
				}else {
					DayCount = 28;
				}
			} else {
				DayCount = 31;
			}
			
			int sDayIndex = 0;
			
			int Start=calendar.get(Calendar.DAY_OF_WEEK);//返回一个数字，代表这个月的第一天是星期几

			
			int kong=Start-Calendar.MONDAY;
			if(kong<0)
				kong=7+kong;
			
	    StringBuffer sb = new StringBuffer();
	    sb.append("<table width=\"100%\" height=\"301\" class=\"listView\" >  ");
	    sb.append("<thead>");
	    sb.append("<tr><th width=\"14%\"><div align=\"center\" >星期一</div></th>");
	    sb.append("<th width=\"14%\"><div align=\"center\" >星期二</div></th>");
	    sb.append("<th width=\"14%\"><div align=\"center\" >星期三</div></th>");
	    sb.append("<th width=\"14%\"><div align=\"center\" >星期四</div></th>");
	    sb.append("<th width=\"14%\"><div align=\"center\" >星期五</div></th>");
	    sb.append("<th width=\"14%\"><div align=\"center\" >星期六</div></th>");
	    sb.append("<th width=\"14%\"><div align=\"center\" >星期日</div></th></tr>");
	    sb.append("</thead>");
	    
	    for (int Row = 0; Row <= 5; Row++) {
	      sb.append("<tr>\n");
	      for (int Col = 0; Col <= 6; Col++) {
	        sb.append("<td>\n");

	        if ((Row == 0) && (Col < kong)) {
	          sb.append("&nbsp;");
	        }
	        else if (sDayIndex < DayCount)
	        {
	          sDayIndex++;
	          calendar.set(5, sDayIndex);
	          //List list = this.workDayManager.find(" from WorkDay where to_char(workdate,'yyyyMMdd')=? ", new Object[] { DateUtil.FormatDate(calendar.getTime(), "yyyyMMdd") });
	          List list=workdayService.getWorkDayList(DateTimeUtils.parseDate(calendar.getTime(), "yyyyMMdd"));
	     
	          if (list.size() > 0)
	          {
	            Workday day = (Workday)list.get(0);
	            sb.append("<input  type=\"hidden\" name=\"pids\" value=\"" + day.getId() + "\"/>");
	            if ("1".equals(day.getIswork()))
	            {
	              sb.append("<input  type=checkbox name=\"checks\" id=\"check_" + sDayIndex + "\" value=\"" + sDayIndex + "\" checked=\"checked\" onClick=\"doChoose(this)\" />\n");
	            }
	            else
	            {
	              sb.append("<input  type=checkbox name=\"checks\" id=\"check_" + sDayIndex + "\" value=\"" + sDayIndex + "\" onClick=\"doChoose(this)\" />\n");
	            }

	            if(StringUtils.isNotEmpty(day.getRemark()))
	   			 {
	   				 sb.append("<span style=\"margin-left: 25px\" >"+day.getRemark()+"</span>\n");
	   			 }
	   			 else
	   			 {
	   				 sb.append("<span style=\"margin-left: 25px;\" ></span>\n");
	   			 }

	            if ((StringUtils.isNotEmpty(day.getMustworkday())) && ("3".equals(day.getMustworkday())))
	            {
	              sb.append("<span style=\"margin-left: 25px\" >节假日</span>\n");
	            }
	            else if ((StringUtils.isNotEmpty(day.getMustworkday())) && ("4".equals(day.getMustworkday())))
	            {
	              sb.append("<span style=\"margin-left: 25px\" >春节</span>\n");
	            }

	            sb.append("<select  name=\"mustWorkdays\" style=\"margin-left: 25px;width:70%;display:none\">");

	            sb.append("<option value=\"\">正常作息</option>");
	            if ("3".equals(day.getMustworkday()))
	              sb.append("<option value=\"3\" selected=\"true\">节假日</option>");
	            else {
	              sb.append("<option value=\"3\" >节假日</option>");
	            }
	            if ("4".equals(day.getMustworkday()))
	              sb.append("<option value=\"4\"  selected=\"true\">春节</option>");
	            else {
	              sb.append("<option value=\"4\">春节</option>");
	            }

	            sb.append("</select>");

	            if ("3".equals(day.getMustworkday()))
	              sb.append("<div align=\"center\" class=\"STYLE4\">" + sDayIndex + "</div>\n");
	            else if ("4".equals(day.getMustworkday()))
	              sb.append("<div align=\"center\" class=\"STYLE5\">" + sDayIndex + "</div>\n");
	            else if ("1".equals(day.getIswork()))
	            {
	              sb.append("<div align=\"center\" class=\"STYLE3\">" + sDayIndex + "</div>\n");
	            }
	            else
	            {
	              sb.append("<div align=\"center\" class=\"STYLE1\">" + sDayIndex + "</div>\n");
	            }

	          }

	        }
	        else
	        {
	          sb.append("&nbsp;");
	        }
	        sb.append("</td>\n");
	      }
	      sb.append("</tr>\n");
	    }
	    
	    sb.append("</table>");

	    return sb.toString();
	  }
	 
	 public boolean IsRunYear(int nYear) {
		    return (nYear % 4 == 0) && ((nYear % 100 != 0) || (nYear % 400 == 0));
		  }
		  private int getFristWeek(int year, int month) {
		    Calendar cal = Calendar.getInstance();
		    cal.set(year, month - 1, 1);
		    return cal.get(7) - 1;
		  }

		  private int getDayOfMonth(int year, int month) {
		    int[][] ary = { { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 }, 
		      { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 } };
		    return ary[isLeapYear(year)][month];
		  }

		  private int isLeapYear(int year) {
		    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
		      return 1;
		    }

		    return 0;
		  }
		  
		  @RequestMapping(value="/save")
		  public  ResultInfo<Workday>  save(@RequestBody Workday workday)
		  {
			  List<String> list = new ArrayList<>(Arrays.asList(workday.getChecks()));
			 
		    
		    for (int i = 0; i < workday.getPids().length; i++)
		    {
		        
		            
		    	
		    	//System.out.println("===="+workday.getPids()[i]);
		    	BigDecimal bigDecimal=new BigDecimal(workday.getPids()[i]);
		     com.gwideal.core.cms.l4.entity.Workday day =	workdayMapper.selectByPrimaryKey(bigDecimal);
		     if (list.contains((new StringBuilder(String.valueOf(day.getWorkdate().getDate()))).toString())) 
		     
		      {
		        day.setIswork("1");
		      }
		      else
		      {
		        day.setIswork("0");
		      }

		      if (("3".equals(workday.getMustWorkdays()[i])) || ("4".equals(workday.getMustWorkdays()[i]))){
		    	  day.setIswork("0");
		      }
		      else {
		        day.setMustworkday("");
		      }
		      
		      day.setMustworkday(workday.getMustWorkdays()[i]);
		      workdayMapper.updateByPrimaryKey(day);
		     
		    }
		    
		    ResultInfo<Workday> result = new ResultInfo<Workday>();
		    result.setResultType("success");
		    return result;
		  }

}
