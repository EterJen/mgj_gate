package com.gwideal.core.util;

import org.apache.commons.lang.StringUtils;

import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

/**
 * @author 18800
 * @date 2018/11/11 19:01
 */
public class DateTimeUtils {

	private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	private static final DateTimeFormatter CH_DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy年MM月dd日");
	private static final DateTimeFormatter CH_SHORT_DATE_FORMATTER = DateTimeFormatter.ofPattern("MM月dd日");
	private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss");
	private static final DateTimeFormatter SHORT_TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
	private static final LocalTime BEGIN_TIME = LocalTime.of(8, 0);
	private static final LocalTime END_TIME = LocalTime.of(18, 0);

	/**
	 * 日期时间字符串转换为日期对象，调用时注意参数pattern与日期时间字符串形式要匹配
	 * @param dateTimeStr
	 * @param pattern
	 * @return
	 */
	public static Date str2Date(String dateTimeStr, String pattern) {
		Date date = null;
		if (StringUtils.isBlank(dateTimeStr)) {
			return date;
		}
		if ("yyyy-MM-dd".equals(pattern)) {
			date = localDate2Date(LocalDate.parse(dateTimeStr, DATE_FORMATTER));
		} else {
			date = ldt2Date(LocalDateTime.parse(dateTimeStr, DATE_TIME_FORMATTER));
		}
		return date;
	}

	public static String parseDate(Date date, String pattern) {
		String result = "";
		if (null == date) {
			return result;
		}
		if (StringUtils.isBlank(pattern)) {
			return result;
		}
		return DateTimeFormatter.ofPattern(pattern).format(date.toInstant().atZone(ZoneId.systemDefault()));
	}

	/**
	 * 获取当前日期的下一天日期
	 * @param date
	 * @return
	 */
	public static Date getNextDayByDate(Date date) {
		if (null == date) {
			date = new Date();
		}
		return localDate2Date(date2LocalDate(date).plusDays(1L));
	}

	/**
	 * 根据传入的时间获取该时间所在一周的周一时间
	 *
	 * @param date
	 * @return
	 */
	public static Date getCurrentMondayByDate(Date date) {
		if (null == date) {
			date = new Date();
		}
		LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		return Date.from(localDate.with(DayOfWeek.MONDAY).atStartOfDay(ZoneId.systemDefault()).toInstant());
	}

	/**
	 * 根据传入的时间获取该时间所在一周的周日时间
	 *
	 * @param date
	 * @return
	 */
	public static Date getCurrentSundayByDate(Date date) {
		if (null == date) {
			date = new Date();
		}
		LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		return Date.from(localDate.with(DayOfWeek.SUNDAY).atStartOfDay(ZoneId.systemDefault()).toInstant());
	}

	/**
	 * 根据传入的时间获取该时间所在月的第一天
	 *
	 * @param date
	 * @return
	 */
	public static Date getCurrentMonthFirstdayByDate(Date date) {
		if (null == date) {
			date = new Date();
		}
		LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		return Date.from(localDate.with(TemporalAdjusters.firstDayOfMonth()).atStartOfDay(ZoneId.systemDefault()).toInstant());
	}

	/**
	 * 根据传入的时间获取该时间所在月的最后一天
	 *
	 * @param date
	 * @return
	 */
	public static Date getCurrentMonthLastdayByDate(Date date) {
		if (null == date) {
			date = new Date();
		}
		LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		return Date.from(localDate.with(TemporalAdjusters.lastDayOfMonth()).atStartOfDay(ZoneId.systemDefault()).toInstant());
	}

	/**
	 * 根据传入的时间获取该时间所在一周的上周一时间
	 *
	 * @param date
	 * @return
	 */
	public static Date getPreMondayByDate(Date date) {
		if (null == date) {
			date = new Date();
		}
		LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
				.with(DayOfWeek.MONDAY).minusWeeks(1L);
		return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
	}


	/**
	 * 根据传入的时间获取该时间所在一周的下周一时间
	 *
	 * @param date
	 * @return
	 */
	public static Date getNextMondayByDate(Date date) {
		if (null == date) {
			date = new Date();
		}
		LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
				.with(DayOfWeek.MONDAY).plusWeeks(1L);
		return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
	}

	/**
	 * LocalDateTime转换为Date
	 *
	 * @param localDateTime
	 * @return
	 */
	public static Date ldt2Date(LocalDateTime localDateTime) {
		if (null == localDateTime) {
			localDateTime = LocalDateTime.now();
		}
		return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
	}

	/**
	 * Date转换为LocalDateTime
	 *
	 * @param date
	 * @return
	 */
	public static LocalDateTime date2Ldt(Date date) {
		if (date == null) {
			date = new Date();
		}
		return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
	}

	/**
	 * Date转换为LocalDate
	 *
	 * @param date
	 * @return
	 */
	public static LocalDate date2LocalDate(Date date) {
		return date2Ldt(date).toLocalDate();
	}

	/**
	 * Date转换为LocalTime
	 *
	 * @param date
	 * @return
	 */
	public static LocalTime date2LocalTime(Date date) {
		return date2Ldt(date).toLocalTime();
	}

	/**
	 * 根据传入的时间获取该时间对应的一周从周一到周日的日期
	 *
	 * @param date
	 * @return
	 */
	public static Map<LocalDate, String> getDateStrOfWeek(Date date, String prefix) {
		LocalDate monday = date2LocalDate(getCurrentMondayByDate(date));
		Map<LocalDate, String> map = new LinkedHashMap<>();
		StringBuilder sb;
		for (int i = 0; i < 7; i++) {
			sb = new StringBuilder();
			if (StringUtils.isEmpty(prefix)) {
				map.put(monday.plusDays(i), sb.append(monday.plusDays(i).getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.CHINA))
						.append("<br/>").append(localDate2String(monday.plusDays(i))).toString());
			} else {
				sb = new StringBuilder(prefix);
				map.put(monday.plusDays(i), sb.append(monday.plusDays(i).getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.CHINA))
						.append("<br/>").append(localDate2String(monday.plusDays(i))).toString());
			}
		}
		return map;
	}

	/**
	 * 根据传入的时间获取该时间对应的一周从周一到周日的字符串(mon,tue,wed,thu,fri,sat,sun)
	 * @param date
	 * @return
	 */
	public static Map<LocalDate, String> getShortNameOfWeek(Date date) {
		LocalDate monday = date2LocalDate(getCurrentMondayByDate(date));
		Map<LocalDate, String> map = new LinkedHashMap<>();
		for (int i = 0; i < 7; i++) {
			map.put(monday.plusDays(i), monday.plusDays(i).getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH).toLowerCase());
		}
		return map;
	}

	/**
	 * LocalDate格式化为日期字符串
	 *
	 * @param localDate
	 * @return
	 */
	public static String localDate2String(LocalDate localDate) {
		if (null == localDate) {
			localDate = LocalDate.now();
		}
		return DATE_FORMATTER.format(localDate);
	}

	/**
	 * LocalDateTime格式化为日期时间字符串
	 *
	 * @param localDateTime
	 * @return
	 */
	public static String ldt2String(LocalDateTime localDateTime) {
		if (null == localDateTime) {
			localDateTime = LocalDateTime.now();
		}
		return DATE_TIME_FORMATTER.format(localDateTime);
	}

	/**
	 * LocalTime格式化为时间字符串
	 *
	 * @param localTime
	 * @return
	 */
	public static String localTime2String(LocalTime localTime) {
		if (null == localTime) {
			localTime = LocalTime.now();
		}
		return TIME_FORMATTER.format(localTime);
	}

	public static String date2ShortTimeStr(Date date) {
		if (null != date) {
			return SHORT_TIME_FORMATTER.format(date2LocalTime(date));
		}
		return "";
	}

	public static String date2ChString(Date date) {
		if (null != date) {
			return CH_DATE_FORMATTER.format(date2LocalDate(date));
		}
		return "";
	}

	public static String date2String(Date date) {
		if (null != date) {
			return localDate2String(date2LocalDate(date));
		}
		return "";
	}

	/**
	 * 根据传入的开始时间和结束时间获取该时间段内每隔30分钟的时间点
	 * 默认获取08:00———18:00
	 *
	 * @param begin
	 * @param end
	 * @return
	 */
	public static Map<LocalTime, String> getTimePoint30OffSet(Date begin, Date end) {
		LocalTime beginTime;
		LocalTime endTime;
		if (null == begin) {
			beginTime = BEGIN_TIME;
		} else {
			beginTime = date2LocalTime(begin);
		}
		if (null == end) {
			endTime = END_TIME;
		} else {
			endTime = date2LocalTime(begin);
		}
		Map<LocalTime, String> map = new LinkedHashMap<>(30);
		while (!beginTime.isAfter(endTime)) {
			map.put(beginTime, SHORT_TIME_FORMATTER.format(beginTime));
			beginTime = beginTime.plusMinutes(30);
		}
		return map;
	}


	public static Date localDate2Date(LocalDate localDate) {
		if (null == localDate) {
			localDate = LocalDate.now();
		}
		return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
	}

	public static String getChPeriodNameByTime(Date date) {
		String chPeriodName = "";
		LocalTime time = date2LocalTime(date);
		if (time.isBefore(LocalTime.of(12, 0)) || time.equals(LocalTime.of(12, 0))) {
			chPeriodName = "上午";
		} else if (time.isAfter(LocalTime.of(12, 0)) && time.isBefore(LocalTime.of(18, 0))) {
			chPeriodName = "下午";
		} else {
			chPeriodName = "晚上";
		}
		return chPeriodName;
	}

	public static String localDate2ChShortString(LocalDate localDate) {
		return CH_SHORT_DATE_FORMATTER.format(localDate);
	}

	public static Map<LocalDate, String> getChShortDateStrOfWeek(Date date, String prefix) {
		LocalDate monday = date2LocalDate(getCurrentMondayByDate(date));
		Map<LocalDate, String> map = new LinkedHashMap<>();
		StringBuilder sb;
		for (int i = 0; i < 7; i++) {
			sb = new StringBuilder();
			if (StringUtils.isEmpty(prefix)) {
				map.put(monday.plusDays(i), sb.append(localDate2ChShortString(monday.plusDays(i))).append("<br>").append("（")
						.append(monday.plusDays(i).getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.CHINA)).append("）").toString());
			} else {
				sb = new StringBuilder(prefix);
				map.put(monday.plusDays(i), sb.append(localDate2ChShortString(monday.plusDays(i))).append("<br/>").append("（")
						.append(monday.plusDays(i).getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.CHINA)).append("）").toString());
			}
		}
		return map;

	}

	/**
	 * 判断某个时间加上expire天相对于当前时间是否超时
	 * @param date
	 * @param expire
	 * @return
	 */
	public static Boolean isExpire(Date date, Integer expire) {
		if (null == date) {
			return false;
		}
		return date2LocalDate(date).plusDays(expire).isBefore(date2LocalDate(new Date()));
	}
	
	/**
     * 根据日期获取当天是周几
     * @param datetime 日期
     * @return 周几
     */
    public static int dateToWeek(String datetime) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        //String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        Calendar cal = Calendar.getInstance();
        Date date;
        try {
            date = sdf.parse(datetime);
            cal.setTime(date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        //return weekDays[w];
        return w;
    }

	public static void main(String[] args) {
		System.out.println(parseDate(new Date(), "MM-dd"));
	}

}
