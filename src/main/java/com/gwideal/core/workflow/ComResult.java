package com.gwideal.core.workflow;

import java.io.Serializable;

public class ComResult implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String url;
	
	private boolean flag;
	
	private String html;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public boolean isFlag() {
		return flag;
	}

	public void setFlag(boolean flag) {
		this.flag = flag;
	}

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}
	
	
	
}
