1.手动调整字典序号:手动调整 文种字典项顺序,意见提到通知后面，公告提到函后面，纪要提到公告后;
2.处长必须填写定密意见:手动修改发文流程 核稿阶段流出前置条件失败提示语,处长需为涉密公文填写处长意见; 核稿流转至专职核稿必须填写意见
3.核对专职核稿到审核阶段配置任务基数 单任务
4.删除临时的打印表单1 配置收发文督文静默打印按钮

核稿 fawenService.getLeadersOfSelfDepart(currentUser) 动态表达式部门
流出
前 fawenService.isSecretHandledByChuZhang(currentUser,taskInfoId) 处长需为涉密公文填写处长意见
意见必填
核稿流转至专职核稿必须填写意见
核稿流转至会稿必须填写意见

到专职核稿 后置逻辑空角色跳过
fawenService.handleZhuanZhiHeGaoPost(currentUser,taskInfoId,assigneeIdList,paramBean)
去掉专职核稿流出的定密任务检查 给审签


审核-审签
意见必填 审核流转至审签必须填写意见
前置fawenService.isAuthorizeSet(currentUser,taskInfoId) 定密责任人必须填写定密意见
后置补充任务 fawenService.handleSecretResponse(currentUser,assigneeIdList,paramBean)