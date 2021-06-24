package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.ForeignAffairsCertificateMapper;
import com.gwideal.core.cms.l4.entity.ForeignAffairsCertificate;
import com.gwideal.core.cms.l4.entity.Whitelist;
import com.gwideal.core.util.SignUtils;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ForeignAffairsCertificateService {

	@Autowired
	private ForeignAffairsCertificateMapper foreignAffairsCertificateMapper;

	@Autowired
	private LogService logService;

	@Autowired
	private SignUtils signUtils;

	public int create(ForeignAffairsCertificate foreignAffairsCertificate){
		foreignAffairsCertificate.setApplyData(new Date());
		foreignAffairsCertificate.setIsDelete(BigDecimal.ZERO);
		foreignAffairsCertificate.setStatus(BigDecimal.ZERO);

		//签名
/*		String sign = signUtils.sign(foreignAffairsCertificate.toString().getBytes());
		foreignAffairsCertificate.setSignText(sign);*/

		//签名
		Map<String, Object> postBean = new HashMap<>();
		postBean.put("data",foreignAffairsCertificate.toString().getBytes());


		/*String sign = signUtils.sign(postBean);
		administrator.setSignText(sign);*/

		String sign = signUtils.sign(postBean);
		foreignAffairsCertificate.setSignText(sign);

		return foreignAffairsCertificateMapper.insert(foreignAffairsCertificate);
	}

	public ForeignAffairsCertificate read(BigDecimal id){
		return foreignAffairsCertificateMapper.selectByPrimaryKey(id);
	}

	public int update(ForeignAffairsCertificate foreignAffairsCertificate){
		return foreignAffairsCertificateMapper.updateByPrimaryKey(foreignAffairsCertificate);
	}

	public int delete(BigDecimal id){
		return foreignAffairsCertificateMapper.deleteByPrimaryKey(id);
	}


	public ResultInfo<ForeignAffairsCertificate> list(ForeignAffairsCertificate queryBean){
		ResultInfo<ForeignAffairsCertificate> result = new ResultInfo<ForeignAffairsCertificate>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
			List<ForeignAffairsCertificate> plist = foreignAffairsCertificateMapper.list(queryBean);

			plist.forEach(administrator ->{
				if(StringUtils.isNotEmpty(administrator.getSignText())){
					Map<String, Object> postBean = new HashMap<>();
					postBean.put("data",administrator.toString());
					postBean.put("signData",administrator.getSignText());
					if(signUtils.verify(postBean)){
						administrator.setModify(true);
					}
					//对比签名
/*					if(!signUtils.verify(administrator.toString().getBytes(),administrator.getSignText())){
						administrator.setModify(true);
					}*/
				}
			});


			PageInfo<ForeignAffairsCertificate> pageInfo = new PageInfo<ForeignAffairsCertificate>(plist);
			result.setTotalRows(pageInfo.getTotal());
			result.setBeanList(pageInfo.getList());
			result.setResultType("success");
			return result;
		}else{
			List<ForeignAffairsCertificate> plist = foreignAffairsCertificateMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
			result.setBeanList(plist);
			result.setResultType("success");
			return result;
		}
	}
		
}
