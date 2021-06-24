package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l2.service.ResourceService;
import com.gwideal.core.cms.l3.dao.TemplateMngMapper;
import com.gwideal.core.cms.l4.entity.TemplateMng;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class TemplateMngService {

	@Autowired
	private TemplateMngMapper templateMngMapper;

	@Autowired
	private AttachmentService attachmentService;

	@Autowired
	private LogService logService;

	@Autowired
	ResourceService resourceService;
	

	public int create(TemplateMng templateMng){
		templateMng.setCreatetime(new Date());
		templateMng.setIsdelete(0);
		int result = templateMngMapper.insert(templateMng);
		logService.log(result, LogService.AuditType.新增, templateMng);
		return result;
	}
	
	public TemplateMng read(BigDecimal id){
		return templateMngMapper.selectByPrimaryKey(id);
	}

	public int update(TemplateMng templateMng){
		TemplateMng oldTemplateMng = templateMngMapper.selectByPrimaryKey(templateMng.getId());
		templateMng.setUpdatetime(new Date());
		int result = templateMngMapper.updateByPrimaryKey(templateMng);
		logService.log(result, LogService.AuditType.修改, oldTemplateMng);
		return result;
	}
	
	public int delete(BigDecimal id){
		TemplateMng oldTemplateMng = templateMngMapper.selectByPrimaryKey(id);
		oldTemplateMng.setIsdelete(1);
		int result = templateMngMapper.updateByPrimaryKeySelective(oldTemplateMng);
		logService.log(result, LogService.AuditType.删除, oldTemplateMng);
		return result;
	}
	
	
	public ResultInfo<TemplateMng> list(TemplateMng queryBean){
		ResultInfo<TemplateMng> result = new ResultInfo<TemplateMng>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<TemplateMng> plist = templateMngMapper.list(queryBean);
	        PageInfo<TemplateMng> pageInfo = new PageInfo<TemplateMng>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<TemplateMng> plist = templateMngMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<TemplateMng> saveOrupdateAttachment(TemplateMng templateMng, MultipartFile file) {
		ResultInfo<TemplateMng> result = new ResultInfo<>();
		if (file!=null && file.getSize()>0) {
			try {
				ResultInfo<TemplateMng> attachmentResultInfo = attachmentService.uploadImg(file);
				if ("success".equals(attachmentResultInfo.getResultType())) {
					String originalFilename = file.getOriginalFilename();
					String fileName = originalFilename.substring(originalFilename.lastIndexOf(System.getProperty("file.separator")) + 1);//获取上传文件名字
					templateMng.setName(fileName);
					templateMng.setFile(attachmentResultInfo.getToken());
				}else{
					return attachmentResultInfo;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		int i;
		if (templateMng.getId()!=null) {
			i=update(templateMng);
		}else{
			i=create(templateMng);
		}
		if(i>0){
			result.setResultType("success");
			result.setMessage("保存成功");
		}else{
			result.setResultType("fail");
			result.setMessage("保存失败");
		}
		return result;
	}

	public ResultInfo<TemplateMng> batchDelete(TemplateMng templateMng) {
		ResultInfo<TemplateMng> result = new ResultInfo<>();
		List<BigDecimal> ids = templateMng.getIds();
		int i=0;
		if (ids!=null&& ids.size()>0) {
			for (BigDecimal id : ids) {
				i+=delete(id);
			}
		}
		result.setResultType("success");
		result.setMessage("批量删除成功，删除"+i+"条记录！");
		return result;
	}
}
