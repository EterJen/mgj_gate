package com.gwideal.core.cms.l2.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import com.gwideal.core.sm.sm4.handler.SM4Handler;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import com.gwideal.core.cms.l4.entity.*;
import com.gwideal.core.cms.l3.dao.*;
import com.gwideal.mybatis.metautils.*;
import com.gwideal.mybatis.metautils.ResultInfo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageInfo;
import java.math.BigDecimal;

@Service
@Transactional
public class managerOfBusinessSecretService {

	@Autowired
	private managerOfBusinessSecretMapper managerOfBusinessSecretMapper;

	@Autowired
	private RelationArticleSimplefileMapper relationArticleSimplefileMapper;
	@Autowired
	private SimpleFileMapper simpleFileMapper;
	@Autowired
	SM4Handler sm4Handler;


	public int create(managerOfBusinessSecret managerOfBusinessSecret){
		managerOfBusinessSecret.setProductCode(sm4Handler.encrypt(managerOfBusinessSecret.getProductCode()));
		managerOfBusinessSecret.setProductDeptname(sm4Handler.encrypt(managerOfBusinessSecret.getProductDeptname()));
		managerOfBusinessSecret.setUserAdress(sm4Handler.encrypt(managerOfBusinessSecret.getUserAdress()));
		managerOfBusinessSecret.setUserCode(sm4Handler.encrypt(managerOfBusinessSecret.getUserCode()));
		managerOfBusinessSecret.setUserDeptname(sm4Handler.encrypt(managerOfBusinessSecret.getUserDeptname()));
		managerOfBusinessSecret.setUserMail(sm4Handler.encrypt(managerOfBusinessSecret.getUserMail()));
		managerOfBusinessSecret.setUserMobile(sm4Handler.encrypt(managerOfBusinessSecret.getUserMobile()));
		managerOfBusinessSecret.setUserOrganizationcode(sm4Handler.encrypt(managerOfBusinessSecret.getUserOrganizationcode()));
		managerOfBusinessSecret.setUserPerson(sm4Handler.encrypt(managerOfBusinessSecret.getUserPerson()));
		managerOfBusinessSecret.setUserTel(sm4Handler.encrypt(managerOfBusinessSecret.getUserTel()));

		managerOfBusinessSecret.setApplyData(new Date());
		int insert = managerOfBusinessSecretMapper.insert(managerOfBusinessSecret);

		RelationArticleSimplefile relationArticleSimplefile = new RelationArticleSimplefile();
		relationArticleSimplefile.setArticleId(managerOfBusinessSecret.getId());
		relationArticleSimplefileMapper.delete(relationArticleSimplefile);

		SimpleFile simpleFiles = simpleFileMapper.selectByPrimaryKey(managerOfBusinessSecret.getImagePath());
		if (simpleFiles != null) {
				BigDecimal id = simpleFiles.getId();
				relationArticleSimplefile.setSimpleFileId(id);
				relationArticleSimplefileMapper.insert(relationArticleSimplefile);
		}
		return insert;
	}
	
	public managerOfBusinessSecret read(BigDecimal id){
		return managerOfBusinessSecretMapper.selectByPrimaryKey(id);
	}

	public int update(managerOfBusinessSecret managerOfBusinessSecret){
		return managerOfBusinessSecretMapper.updateByPrimaryKey(managerOfBusinessSecret);
	}
	
	public int delete(BigDecimal id){
		return managerOfBusinessSecretMapper.deleteByPrimaryKey(id);
	}
	
	
	public ResultInfo<managerOfBusinessSecret> list(managerOfBusinessSecret queryBean){
		ResultInfo<managerOfBusinessSecret> result = new ResultInfo<managerOfBusinessSecret>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<managerOfBusinessSecret> plist = managerOfBusinessSecretMapper.list(queryBean);

			plist.forEach(obj ->{
				obj.setProductCode(sm4Handler.decrypt(obj.getProductCode()));
				obj.setProductDeptname(sm4Handler.decrypt(obj.getProductDeptname()));
				obj.setUserAdress(sm4Handler.decrypt(obj.getUserAdress()));
				obj.setUserCode(sm4Handler.decrypt(obj.getUserCode()));
				obj.setUserDeptname(sm4Handler.decrypt(obj.getUserDeptname()));
				obj.setUserMail(sm4Handler.decrypt(obj.getUserMail()));
				obj.setUserMobile(sm4Handler.decrypt(obj.getUserMobile()));
				obj.setUserOrganizationcode(sm4Handler.decrypt(obj.getUserOrganizationcode()));
				obj.setUserPerson(sm4Handler.decrypt(obj.getUserPerson()));
				obj.setUserTel(sm4Handler.decrypt(obj.getUserTel()));
				RelationArticleSimplefile relationArticleSimplefile = new RelationArticleSimplefile();
				relationArticleSimplefile.setArticleId(obj.getId());
				List<RelationArticleSimplefile> list = relationArticleSimplefileMapper.list(relationArticleSimplefile);
				if (CollectionUtils.isNotEmpty(list)) {
					List<SimpleFile> simpleFiles = new ArrayList<>();
					for (RelationArticleSimplefile articleSimplefile : list) {
						simpleFiles.add(simpleFileMapper.selectByPrimaryKey(articleSimplefile.getSimpleFileId()));
					}
					obj.setSimpleFiles(simpleFiles);
				}
			});

	        PageInfo<managerOfBusinessSecret> pageInfo = new PageInfo<managerOfBusinessSecret>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<managerOfBusinessSecret> plist = managerOfBusinessSecretMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}
		
}
