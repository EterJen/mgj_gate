package com.gwideal.core.basic.l4.entity;

import java.io.Serializable;

public class ActionDef implements Serializable {

	private String id;
	private String name;
	/**
	 * grouping--分组，add添加，rightMune右键菜单
	 */
	private String grouping;
	private String type;
	private String icon;
	private String condition;
	/*private String action;*/


    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public ActionDef() {
    }

    public ActionDef(String id, String name, String icon ,String grouping) {
        this.id = id;
        this.name = name;
        this.icon = icon;
		this.grouping = grouping;
    }

    public ActionDef(String id, String name, String type, String icon , String condition) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.icon = icon;
        this.condition = condition;
    }


    public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public String getGrouping() {
		return grouping;
	}

	public void setGrouping(String grouping) {
		this.grouping = grouping;
	}

	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	@Override
	public String toString() {
		return " * id = "+ id ;
	}
	
	
	
//	public String getAction() {
//		return action;
//	}
//	public void setAction(String action) {
//		this.action = action;
//	}
//	
	
	
	
	
}
