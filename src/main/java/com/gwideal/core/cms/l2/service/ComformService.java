package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.basic.l2.service.ResourceService;
import com.gwideal.core.cms.l3.dao.ComformMapper;
import com.gwideal.core.cms.l4.entity.Comform;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import per.eter.utils.file.FileUtils;
import per.eter.utils.file.SimpFile;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ComformService {

	@Autowired
	private ComformMapper comformMapper;

	@Autowired
	private AttachmentService attachmentService;

	@Autowired
	private LogService logService;
	@Autowired
	private FileUtils fileUtils;
	@Autowired
	ResourceService resourceService;

	public static String attRelativePath = "/articleAtt/newComForm";

	public int create(Comform comform){
		comform.setCreatetime(new Date());
		comform.setIsdelete(0);
		int result = comformMapper.insert(comform);
		logService.log(result, LogService.AuditType.新增, comform);
		return result;
	}
	
	public Comform read(BigDecimal id){
		return comformMapper.selectByPrimaryKey(id);
	}

	public int update(Comform comform){
		Comform oldComform = comformMapper.selectByPrimaryKey(comform.getId());
		comform.setUpdatetime(new Date());
		int result = comformMapper.updateByPrimaryKey(comform);
		logService.log(result, LogService.AuditType.修改, oldComform);
		return result;
	}
	
	public int delete(BigDecimal id){
		Comform oldComform = comformMapper.selectByPrimaryKey(id);
		oldComform.setIsdelete(1);
		int result = comformMapper.updateByPrimaryKeySelective(oldComform);
		logService.log(result, LogService.AuditType.删除, oldComform);
		return result;
	}
	
	
	public ResultInfo<Comform> list(Comform queryBean){
		ResultInfo<Comform> result = new ResultInfo<Comform>();
		if(queryBean.getPaging().equals("Yes")){
			PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
	        List<Comform> plist = comformMapper.list(queryBean);
	        PageInfo<Comform> pageInfo = new PageInfo<Comform>(plist);
	        result.setTotalRows(pageInfo.getTotal());
	        result.setBeanList(pageInfo.getList());
	        result.setResultType("success");
	        return result;
		}else{
			List<Comform> plist = comformMapper.list(queryBean);
			result.setTotalRows((long)plist.size());
	        result.setBeanList(plist);
	        result.setResultType("success");
	        return result;
		}
	}

	public ResultInfo<Comform> saveOrupdateAttachment(Comform comform, MultipartFile file) {
		ResultInfo<Comform> result = new ResultInfo<>();
		if (file!=null && file.getSize()>0) {
			try {
				MultipartFile[] multipartFiles = {file};
				Map<String, SimpFile> stringSimpFileMap = fileUtils.remoteUpload(multipartFiles, attRelativePath);

				SimpFile simpFile = stringSimpFileMap.get(file.getOriginalFilename());
				if (SimpFile.FileOperationResult.success.equals(simpFile.getFileOperationResult())) {
					comform.setOriginalName(simpFile.getOriginalFilename());
					comform.setFile(simpFile.getRelativePath());
				} else {
					result.setResultType("fail");
					result.setMessage("附件上传失败");
					return result;
				}
			} catch (Exception e) {
				e.printStackTrace();
				result.setResultType("fail");
				result.setMessage("附件上传失败");
				return result;
			}
		}
		int i;
		if (comform.getId()!=null) {
			i=update(comform);
		}else{
			i=create(comform);
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

	public ResultInfo<Comform> batchDelete(Comform comform) {
		ResultInfo<Comform> result = new ResultInfo<>();
		List<BigDecimal> ids = comform.getIds();
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
