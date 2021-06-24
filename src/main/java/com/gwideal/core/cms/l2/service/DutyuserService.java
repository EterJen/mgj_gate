package com.gwideal.core.cms.l2.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gwideal.core.cms.l3.dao.DutyuserMapper;
import com.gwideal.core.cms.l4.entity.Dutyuser;
import com.gwideal.mybatis.metautils.ResultInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class DutyuserService {

    @Autowired
    private DutyuserMapper dutyuserMapper;

    @Autowired
    private LogService logService;


    public int create(Dutyuser dutyuser) {

        withSortId(dutyuser);
        dutyuser.setIsdelete(0);
        dutyuser.setUpdatetime(new Date());
        int result = dutyuserMapper.insert(dutyuser);
        logService.log(result, LogService.AuditType.新增, dutyuser);
        return result;
    }

    public void withSortId(Dutyuser dutyuser) {
        if (null == dutyuser.getSortid()) {
            dutyuser.setSortid(dutyuserMapper.selectMaxSortId(dutyuser));
        }else {
            dutyuserMapper.adjustSortId(dutyuser);
        }
    }

    public Dutyuser read(BigDecimal id) {
        return dutyuserMapper.selectByPrimaryKey(id);
    }

    public int update(Dutyuser dutyuser) {
        Dutyuser oldDutyuser = dutyuserMapper.selectByPrimaryKey(dutyuser.getId());
        if (!oldDutyuser.getSortid().equals(dutyuser.getSortid())) {
            withSortId(dutyuser);
        }
        int result = dutyuserMapper.updateByPrimaryKey(dutyuser);
        logService.log(result, LogService.AuditType.修改, oldDutyuser);
        return result;
    }

    public int delete(BigDecimal id) {
        Dutyuser oldDutyuser = dutyuserMapper.selectByPrimaryKey(id);
        oldDutyuser.setIsdelete(1);
        int result = dutyuserMapper.updateByPrimaryKeySelective(oldDutyuser);
        logService.log(result, LogService.AuditType.删除, oldDutyuser);
        return result;
    }


    public ResultInfo<Dutyuser> list(Dutyuser queryBean) {
        ResultInfo<Dutyuser> result = new ResultInfo<Dutyuser>();
        if (queryBean.getPaging().equals("Yes")) {
            PageHelper.startPage(queryBean.getPageNo(), queryBean.getPageSize());
            List<Dutyuser> plist = dutyuserMapper.list(queryBean);
            PageInfo<Dutyuser> pageInfo = new PageInfo<Dutyuser>(plist);
            result.setTotalRows(pageInfo.getTotal());
            result.setBeanList(pageInfo.getList());
            result.setResultType("success");
            return result;
        } else {
            List<Dutyuser> plist = dutyuserMapper.list(queryBean);
            result.setTotalRows((long) plist.size());
            result.setBeanList(plist);
            result.setResultType("success");
            return result;
        }
    }

    public ResultInfo<Dutyuser> batchDelete(Dutyuser dutyuser) {
        ResultInfo<Dutyuser> result = new ResultInfo<>();
        List<BigDecimal> ids = dutyuser.getIds();
        int i = 0;
        if (ids != null && ids.size() > 0) {
            for (BigDecimal id : ids) {
                i += delete(id);
            }
        }
        result.setResultType("success");
        result.setMessage("批量删除成功，删除" + i + "条记录！");
        return result;
    }

    public ResultInfo<Dutyuser> getDutyusers(String department) {
        ResultInfo<Dutyuser> result = new ResultInfo<Dutyuser>();
        List<Dutyuser> plist = dutyuserMapper.getDutyusers(department);
        result.setTotalRows((long) plist.size());
        result.setBeanList(plist);
        result.setResultType("success");
        return result;

    }
}
