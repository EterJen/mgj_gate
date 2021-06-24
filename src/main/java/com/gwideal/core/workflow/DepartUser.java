package com.gwideal.core.workflow;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.gwideal.core.cms.l4.entity.Administrator;

public class DepartUser implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8848506683222047424L;
	//当前操作推荐的用户  有可能为多个用户
    private List<Administrator> recomSelectedUsers = new ArrayList<Administrator>();

	public List<Administrator> getRecomSelectedUsers() {
		return recomSelectedUsers;
	}

	public void setRecomSelectedUsers(List<Administrator> recomSelectedUsers) {
		this.recomSelectedUsers = recomSelectedUsers;
	}

    
}
