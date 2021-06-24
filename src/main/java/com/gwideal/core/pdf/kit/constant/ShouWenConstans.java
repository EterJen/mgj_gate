package com.gwideal.core.pdf.kit.constant;

public class ShouWenConstans {
	
	
	
	/**
	 * 密级
	 * $task.theCommonFormInfo.secretLevel$
	 */
	public static final String BEAN_SECRETLEVEL = "$task.theCommonFormInfo.secretLevel$";
	
	/**
	 * 来文单位
	 * $task.theCommonFormInfo.belongProInst.incomingDocDepart$ 
	 */
	public static final String BEAN_DOCDEPART = "$task.theCommonFormInfo.belongProInst.incomingDocDepart$";
	
	
	/**
	 * 来文文号
	 * $task.theCommonFormInfo.belongProInst.incomingDocNum$ 
	 */
	public static final String BEAN_DOCNUM = "$task.theCommonFormInfo.belongProInst.incomingDocNum$";
	
	/**
	 * 来文共
	 * $task.theCommonFormInfo.belongProInst.incomingNum$ 
	 */
	public static final String BEAN_INCOMINGNUM = "$task.theCommonFormInfo.belongProInst.incomingNum$";
	
	
	/**
	 * 收文日期
	 * $task.theCommonFormInfo.formJxwshouwen.receiveDate$
	 */
	public static final String BEAN_RECEIVEDATE = "$task.theCommonFormInfo.formJxwshouwen.receiveDate$";
	
	
	/**
	 * 收文文号
	 * $task.theCommonFormInfo.belongProInst.docFullName$ 
	 */
	public static final String BEAN_DOCFULLNAME = "$task.theCommonFormInfo.belongProInst.docFullName$";
	
	
	/**
	 * 领导批示
	 * $task.userOpinions.pishi.opinion$ 
	 */
	public static final String BEAN_PISHIOPINION = "$task.userOpinions.pishi.opinion$";
	
	
	/**
	 * 拟办意见
	 * $task.userOpinions.niban.opinion$ 
	 */
	public static final String BEAN_NIBANOPINION = "$task.userOpinions.niban.opinion$";
	
	/**
	 * 拟办
	 * $task.theCommonFormInfo.formJxwshouwen.niBan$ 
	 */
	public static final String BEAN_NIBAN = "$task.theCommonFormInfo.formJxwshouwen.niBan$";
	
	/**
	 * 拟搞日期
	 * $task.theCommonFormInfo.formJxwshouwen.niGaoDate$
	 */
	public static final String BEAN_NIGAODATE = "$task.theCommonFormInfo.formJxwshouwen.niGaoDate$";
	
	
	
	/**
	 * 审核
	 * $task.theCommonFormInfo.formJxwshouwen.shenHe$ 
	 */
	public static final String BEAN_SHENHE = "$task.theCommonFormInfo.formJxwshouwen.shenHe$";
	
	
	
	/**
	 * 审核日期
	 * $task.theCommonFormInfo.formJxwshouwen.shenHeDate$
	 */
	public static final String BEAN_SHENHEDATE = "$task.theCommonFormInfo.formJxwshouwen.shenHeDate$";
		
	
	/**
	 * 来文字号
	 * $task.theCommonFormInfo.formJywjj.incomingZiHao$
	 */
	public static final String BEAN_INCOMINGZIHAO = "$task.theCommonFormInfo.formJywjj.incomingZiHao$";
	
	
	/**
	 * 阅示意见
	 * $task.userOpinions.yueshi.opinion$  
	 */
	public static final String BEAN_YUESHIOPINION = "$task.userOpinions.yueshi.opinion$";
	
	
	/**
	 * 办理意见
	 * $task.userOpinions.banli.opinion$  
	 */
	public static final String BEAN_BANLIOPINION = "$task.userOpinions.banli.opinion$";
	
	  
	/**
	 * 登记人
	 * $task.theCommonFormInfo.formJywjj.registerUser$  
	 */
	public static final String BEAN_REGISTERUSER = "$task.theCommonFormInfo.formJywjj.registerUser$";
	
	
	
	/**
	 * 登记时间
	 * $task.theCommonFormInfo.formJywjj.registerDate$  
	 */
	public static final String BEAN_REGISTERDATE = "$task.theCommonFormInfo.formJywjj.registerDate$";
	

	
	/**
	 * 关联督文号
	 * $task.theCommonFormInfo.belongProInst.relateDuWenDocId$
	 */
	public static final String BEAN_RELATEDUWENDOCID = "$task.theCommonFormInfo.belongProInst.relateDuWenDocId$";	
	
	
	public enum ShouWenEnum{
		 	FAWEN("fawen","上海市长城电子发文单"),
		 	JXWSHOUWEN("jxwshouwen","上海市长城电子收文单"),
		 	JXWDWSHOUWEN("jxwdwshouwen","中共上海市长城电子收文单"),
		 	;


		    private String name;
		    private String value;
		
		ShouWenEnum(String name, String value) {
	        this.name = name;
	        this.value = value;
	    }

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}
		
		
	}
	
	
}
