package com.gwideal.core.workflow;

public class DFormAction {

	private String id;
	private String name;
	private String preCondition;
	private String actionToPerform;
	private String imageUrl;
	private FormActionType formActionType;//wps,form
	
	public enum FormActionType{
		wps,
		form,
		ofd
	}
	
	

	
	
	public FormActionType getFormActionType() {
		return formActionType;
	}
	public void setFormActionType(FormActionType formActionType) {
		this.formActionType = formActionType;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
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
	public String getPreCondition() {
		return preCondition;
	}
	public void setPreCondition(String preCondition) {
		this.preCondition = preCondition;
	}
	public String getActionToPerform() {
		return actionToPerform;
	}
	public void setActionToPerform(String actionToPerform) {
		this.actionToPerform = actionToPerform;
	}
	
	public DFormAction(String id, String name, String actionToPerform, String imageUrl,String preCondition,FormActionType formActionType) {
		super();
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.actionToPerform = actionToPerform;
		this.preCondition = preCondition;
		this.formActionType = formActionType;
	}
	
	
	
	
}
