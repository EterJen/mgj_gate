-- drop table EITC09.DICCATEGORY;
-- drop table EITC09.DICMODE;
-- drop table EITC09.DICTYPE;

CREATE TABLE EITC09.DICCATEGORY (
  CATEGORYID      number, --
  NAME    VARCHAR2 (255), --
  DESCRIPTION      VARCHAR2 (255), 
  PRIMARY KEY (CATEGORYID)
);

CREATE TABLE EITC09.DICMODE (
  dictype      VARCHAR2 (255), --
  SPLITMODE   VARCHAR2 (10), --
  CNAME      VARCHAR2 (255), --	
  CATEGORYID  number,
  PRIMARY KEY (dictype)
);

CREATE TABLE EITC09.DICTYPE (
  dictype      VARCHAR2 (255), 
  id   VARCHAR2 (50),
  NAME      VARCHAR2 (255), 	
  DESCRIPTION VARCHAR2 (512), 
  ENAME VARCHAR2 (255), 
  ext  VARCHAR2 (50),
  FLAG  VARCHAR2(10),
  PRIMARY KEY (dictype,id)
);


Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj12', '松江九亭高科技工业园区', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj11', '松江工业区佘山分区', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj10', '松江永丰城镇工业地块', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj09', '松江九亭城镇工业地块', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj08', '松江漕河泾开发区松江园区', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd11', '嘉定化学工业区金山分区', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js06', '金山石化基地', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js01', '金山松隐城镇工业地块', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js05', '金山亭林城镇工业地块', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js02', '金山干巷城镇工业地块', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js04', '金山廊下城镇工业地块', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'zb02', '闸北市北工业新区', '19', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh04', '闵行向阳工业区', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj07', '松江工业区石湖荡分区', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx13', '奉贤化学工业区奉贤分区', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx12', '奉贤奉贤现代农业园地', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx11', '奉贤临港物流园区奉贤分区', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx10', '奉贤邬桥城镇工业地块', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx09', '奉贤庄行城镇工业地块', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx08', '奉贤临港城镇工业地块', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx07', '奉贤金汇城镇工业地块', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx06', '奉贤杨王城镇工业地块', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx05', '奉贤泰顺城镇工业地块', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx16', '奉贤头桥城镇工业地块', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx15', '奉贤四团城镇工业地块', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx14', '奉贤海港综合开发区城镇工业地块', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'bs01', '宝山城市工业园区', '01', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd01', '嘉定国际汽车城零部件配套园区', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd10', '嘉定安亭汽车产业基地', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'bs03', '宝山罗店工业园区', '01', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd02', '嘉定徐行工业园区', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd09', '嘉定工业区马陆园区', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd03', '嘉定南翔城镇工业地块', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd08', '嘉定江桥城镇工业地块', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd07', '嘉定华亭城镇工业地块', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'bs02', '宝山顾村工业园区', '01', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'bs04', '宝山月浦工业园区', '01', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'bs08', '宝山杨行工业园区', '01', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh02', '闵行航天科技产业园', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'bs05', '宝山钢铁基地', '01', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'bs07', '宝山吴淞工业基地', '01', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh03', '闵行紫竹科学园区', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh06', '闵行吴泾工业基地', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh12', '闵行漕河泾开发区浦江园区', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh07', '闵行浦江镇城镇工业地块', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh11', '闵行马桥城镇工业地块', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh10', '闵行欣梅城镇工业地块', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh09', '闵行闵东工业区', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh08', '闵行闵北工业区', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pt04', '普陀长征工业园区', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pt02', '普陀新杨工业园区', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pt01', '普陀未来岛园区', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'bs06', '宝山工业园区', '01', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj06', '松江泗泾高科技开发区', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd06', '嘉定工业区', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd05', '嘉定南翔工业园区', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd04', '嘉定外冈工业园区', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js03', '金山上海兴塔工业区', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj05', '松江天马工业区', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qp01', '青浦商榻城镇工业地块', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '18', '李明福', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '30', '价格情况通报', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('WsbpType', '3', '委跨', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFBType', '1', '信访', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFSType', '2', '求助', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFResult', '5', '未解决（诉求不合理）', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('secretBrief', '05', '系统管理员', 'U0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('UserPerferrence', '01', '待办事项列表自动接收', '不自动接受选择0, \r\n需要自动接收选择1', 'FRAMEWORK_AUTORECEIVE', 
    '0,1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '42', '信息化推进处', 'D70', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '43', '长城电子党委领导', 'D75', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '44', '党委办公室（信访办公室）', 'D76', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '45', '干部处（老干部处）', 'D77', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '46', '宣传处', 'D79', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '47', '纪工委（监察室）', 'D80', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '48', '机关党委', 'D81', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '49', '系统工会', 'D83', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '50', '组织处（统战处）', 'D78', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFSType', '6', '来电', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '08', '请 同志阅处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '842', '初等教育', '84', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '843', '中等教育', '84', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '844', '高等教育', '84', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '849', '其他教育', '84', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '851', '医院', '85', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '852', '卫生院及社区医疗活动', '85', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '853', '门诊部医疗活动', '85', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '854', '计划生育技术服务活动', '85', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '855', '妇幼保健活动', '85', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '856', '专科疾病防治活动', '85', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '857', '疾病预防控制及防疫活动', '85', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '859', '其他卫生活动', '85', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '860', '社会保障业', '86', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '871', '提供住宿的社会福利', '87', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '872', '不提供住宿的社会福利', '87', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '881', '新闻业', '88', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '882', '出版业', '88', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '891', '广播', '89', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '892', '电视', '89', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '893', '电影', '89', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '894', '音像制作', '89', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '901', '文艺创作与表演', '90', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '902', '艺术表演场馆', '90', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '903', '图书馆与档案馆', '90', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '904', '文物及文化保护', '90', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '905', '博物馆', '90', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '906', '烈士陵园、纪念馆', '90', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '907', '群众文化活动', '90', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '908', '文化艺术经纪代理', '90', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '909', '其他文化艺术', '90', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '911', '商业、雇主和专业性组织的活动', '91', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '912', '工会的活动', '91', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '919', '其他成员组织的活动', '91', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '921', '电影、广播、电视及其它娱乐活动', '92', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '922', '新闻机构的活动', '92', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '923', '图书馆、档案馆、博物馆及其它文化活动', '92', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '929', '其他娱乐活动', '92', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '930', '中国共产党机关', '93', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '941', '国家权力机构', '94', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '942', '国家行政机构', '94', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '943', '人民法院和人民检察院', '94', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '949', '其他国家机构', '94', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '951', '人民政协', '95', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '952', '民主党派', '95', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '961', '群众团体', '96', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '962', '社会团体', '96', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '963', '宗教组织', '96', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '971', '社区自治组织', '97', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '972', '村民自治组织', '97', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '980', '国际组织', '98', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'bs', '宝山区', '01', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'cn', '长宁区', '02', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'cm', '崇明县', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFSType', '7', '来访', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWFS', '5', '1234', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DocDealNotifySetting', '0', 'CuurentWeekDay', '2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '01', '王坚', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '05', '刘健', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '06', '傅新华', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '08', '周敏浩', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '09', '戎之勤', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '10', '马静', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DangGongFa', '1', '办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, EXT, 
    FLAG)
 Values
   ('FaWenDic', '12', '长城电子发文', '255', 'Party', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '13', '市国防科工办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '15', '市教委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '16', '市科委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '22', '市财政局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '23', '市人力资源社会保障局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '27', '市农委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '29', '市规划国土资源局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '31', '市海洋局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '32', '市文广影视局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '33', '市卫生局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '36', '市审计局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '37', '市政府外办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '50', '市住房保障房屋管理局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '51', '市交通港口局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '70', '市公务员局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    FLAG)
 Values
   ('SpecTab', '2', 'GE', '收乙,阅示,组群', '573', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('SecurityLevel', '0', '秘密', '秘密', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('SecurityLevel', '1', '机密', '机密', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '07', '邵志清', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '11', '张华芳', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '14', '柳靖国', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPResult2', '1', '解决或采纳', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('InLetterType', '2', '请示', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPResult2', '3', '留作参考', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '07', '请 同志签发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('Level', '2', '急件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('Level', '3', '特急', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('ValidateRule', 'CURRENCY', 'CURRENCY', '^(-?\d+)(\.\d+)?$', '金额数值不合法', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('ValidateRule', 'DATE', 'DATE', '^\d{4}-\d-([0-2]\d)|(3[01])$', '日期不合法', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '6', '会议通知', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '7', '经委信息', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '8', '工作专报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '9', '工作意见稿', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '10', '会议纪要', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '11', '其它', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '01', '请示', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '02', '报告', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '02', '拟同意', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '03', '已阅', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '04', '阅知', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '05', '阅示', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '06', '阅处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '09', '请 同志审签', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '10', '请 同志审核', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '11', '已回复', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '1', '一', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '2', '二', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '3', '三', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '4', '四', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '5', '五', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '6', '六', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '7', '七', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '8', '八', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '9', '九', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '10', '十', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '11', '一十一', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '12', '一十二', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '13', '一十三', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '14', '一十四', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '15', '一十五', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '16', '一十六', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '17', '一十七', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '18', '一十八', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '19', '一十九', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '20', '二十', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '21', '二十一', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '6', '市行业发展署', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '7', '市经委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '8', '市食药监管局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '9', '市技监局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '10', '市外经贸委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '11', '上海海关', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '12', '上海世博局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '13', '市安全生产监管局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '14', '市电力公司', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '15', '市财政局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '16', '市工商局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '17', '市国资委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '18', '人行市分行', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '19', '上海烟草专卖局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '20', '上海银监局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '21', '市农委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '22', '市教委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '23', '市科委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '24', '市知识产权局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '25', '市文广影视局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '26', '市新闻出版局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '27', '市卫生局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '28', '市人口计生委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '29', '出入境检验检疫局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '30', '市建委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '31', '市规划局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '33', '市环保局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '32', '市市政局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '34', '市房地资源局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '35', '市市容环卫局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '36', '市深水港指挥部', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '37', '市交通局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '38', '徐汇区政府', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '39', '普陀区政府', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '40', '闸北区政府', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '41', '长宁区政府', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '42', '闵行区政府', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '43', '宝山区政府', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '44', '市旅游委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '45', '市民族宗教委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '46', '市政府法制办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '47', '市人事局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '48', '市公安局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '49', '市劳动保障局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '50', '市精神文明办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typItem', '1', '未归类', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '1', '市政府办公厅', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '2', '商务部', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '3', '国家发改委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '4', '市人大', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '5', '市发改委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '6', '市财政局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '7', '市环保局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('SelectModalRsv1', '1', '全部导出', '全部导出', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('SelectModalRsv1', '2', '日期+来文字号+标题+密级', '日期+来文字号+标题+密级', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '1', '委领导', 'D2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '2', '办公室', 'D3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '3', '研究室', 'D44', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '4', '综合规划室', 'D5', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '5', '经济运行处', 'D6', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '6', '市场流通处', 'D7', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '7', '电力处', 'D8', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '8', '工业区管理处', 'D9', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '9', '装备工业处', 'D10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '10', '重化工业处', 'D11', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '11', '都市产业处', 'D12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '12', '军工处', 'D13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '13', '零售业管理处', 'D14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '14', '服务业管理处', 'D15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '15', '食品业管理处', 'D16', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '17', '技术进步处', 'D17', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '18', '产业投资处', 'D18', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '19', '节能环保处', 'D19', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '20', '外经处', 'D20', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '21', '教育培训处', 'D21', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '22', '人事处', 'D22', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '23', '直属党委', 'D23', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '24', '机关党委', 'D24', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '25', '老干部处', 'D25', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '26', '信息中心', 'D26', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '27', '高新工程处', 'D41', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '28', '军工配套处', 'D42', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '29', '小企业办', 'D35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '30', '整规办', 'D37', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Dept', '31', '纪检组监察室', 'D39', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '7', '提交', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '3', '流转', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '2', '办理', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '4', '转交', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '9', '终止', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '10', '知会', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '11', '过期', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '12', '阅毕', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvType', '3', '信函', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvType', '1', '收文处理', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '11', '沪府任', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('taskstate', '5', '回退', 'Sendback', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '1', 'varchar', 'varchar', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '2', 'int', 'int', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '3', 'text', 'text', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '4', 'bigint', 'bigint', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '5', 'tinyint', 'tinyint', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '6', 'char', 'char', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '7', 'nvarchar', 'nvarchar', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '8', 'ntext', 'ntext', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '9', 'nchar', 'nchar', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '10', 'real', 'real', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '11', 'float', 'float', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FieldType', '12', 'money', 'money', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('InfoPublic', '1', '是', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('InfoPublic', '2', '否', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '03', '批复', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '04', '通知', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '11', '公告', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '12', '通告', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '05', '函', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '06', '通报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '07', '议案', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '08', '意见', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '09', '纪要', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '10', '决定', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '13', '命令', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('FlowState', '0', '启动', 'Start', 'Start', 
    'Start', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('FlowState', '1', '挂起', 'HangUp', 'HangUp', 
    'HangUp', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('FlowState', '2', '中止', 'Abandon', 'Abandon', 
    'Abandon', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('FlowState', '3', '完成', 'Complete', 'Complete', 
    'Complete', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('FlowState', '4', '归档', 'Pigeonhole', 'Pigeonhole', 
    'Pigeonhole', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '8', '办结', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '1', '未收', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SaveType', '1', '永久', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SaveType', '2', '30年', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SaveType', '3', '10年', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('InLetterType', '1', '报告', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typItem', '4', '其他', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typItem', '6', '文具', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('InLetterType', '3', '简报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPResult2', '2', '列入计划拟解决', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('TSType', '1', '参政类', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('TSType', '2', '举报类', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typItem', '3', '纸张', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('TSType', '3', '申诉类', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('TSType', '4', '求决类', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('TSType', '5', '其它类', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('InLetterType', '4', '专报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('HighLeader', '03', '屠光绍', '光绍', 'and lead like ''%屠光绍%''', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx', '奉贤区', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'hk', '虹口区', '05', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd', '嘉定区', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js', '金山区', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jn', '静安区', '08', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'lw', '卢湾区', '09', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh', '闵行区', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'nh', '南汇区', '11', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd', '浦东新区', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pt', '普陀区', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qp', '青浦区', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj', '松江区', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'xhp', '新黄浦区', '16', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'xh', '徐汇区', '17', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'yp', '杨浦区', '18', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'zb', '闸北区', '19', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('HighLeader', '04', '艾宝俊', '宝俊', 'and lead like ''%艾宝俊%''', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '28', '中办发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '27', '监察室', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '22', '信息安全处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '14', '电子信息产业处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '16', '软件和信息服务业处 ', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '21', '信息化推进处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '3', '政策法规处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '20', '信息基础设施管理处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '23', '信用管理处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '19', '央企服务处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '15', '生产性服务处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '1', '办公室', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '5', '综合规划处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '6', '经济运行处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '17', '电力处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '18', '工业区管理处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '11', '装备产业处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '12', '重化产业处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '13', '都市产业处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '31', '党委办公室（信访办公室）', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '7', '技术进步处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '8', '产业投资处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '10', '节能与综合利用处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '9', '外经处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '4', '人事教育处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '30', '信息中心', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '25', '高新工程处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '24', '军工配套处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '32', '干部处（老干部处）', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '26', '中小企业办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '2', '研究室', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '34', '宣传处', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '35', '纪工委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '36', '机关党委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '37', '系统工会', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '33', '组织处（统战处）', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('WsbpType', '2', '委参', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('WsbpType', '1', '委组', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('WsbpLevel', '1', '特急', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFSType', '1', '咨询', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFSType', '3', '意见建议', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFGK', '1', '公开', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFAnswer', '2', '书面', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFResult', '2', '部分解决', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('secretBrief', '01', '行政领导', 'D84', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('secretBrief', '02', '党委领导', 'D75', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('secretBrief', '03', '龚丽', 'U2281', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '02', '戴海波', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFSType', '5', '来信', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWFS', '7', '1234', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('FONDSCODE', '01', 'THIS', '1377226592843', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '1', '政法', 'A', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '2', '部队', 'B', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '3', '各区', 'C', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '4', '各县', 'D', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '5', '农业', 'E', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '6', '工业', 'F', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '7', '交通', 'G', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '8', '计划', 'H', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '9', '建设', 'I', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '10', '财贸', 'J', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '11', '经贸', 'K', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '12', '外事', 'L', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '13', '统战', 'M', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '14', '宣传', 'N', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '15', '教卫', 'O', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('DWTYPE', '16', '科技', 'P', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '1', '中委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '2', '中发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '3', '厅字', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWFS', '6', '1234', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '5', '中发电', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '6', '中办发电', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '7', '中办通报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '8', '中秘文发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '9', '沪委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '10', '沪委发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '11', '会议纪要', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '12', '办公厅通报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '13', '上海工作', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '14', '沪委办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '15', '中央白头文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '16', '市委白头文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '17', '沪委办发电', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '18', '沪委办发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '19', '国务院文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '20', '国务院各部委文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '21', '市政府文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '22', '市人大常委会文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '23', '委办局文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '24', '直属单位文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '25', '密码电报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '26', '沪委办督', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWLB', '27', '情况通报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWFS', '1', '传 真', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWFS', '2', '平 信', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWFS', '3', '机 要', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWFS', '4', '内 转', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '12', '沪府函', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('INFOPUBLISH', '01', '全系统公文数', '4513,117249', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ZXZJBAGEXPAND', '0', '委内专项资金的项目', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ZXZJBAGEXPAND', '1', '市级专项资金的项目', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ZXZJBAGEXPAND', '2', '技术改造资金', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('NEWINFOPUBLIC', '0', '是', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '10', '价格情况通报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFGK', '2', '不公开', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFResult', '6', '未解决（暂不具备条件）', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '03', '制造业', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '04', '电力、燃气及水的生产和供应业', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '05', '建筑业', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '06', '交通运输、仓储和邮政业', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '07', '信息传输、计算机服务和软件业', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '08', '批发和零售业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '09', '住宿和餐饮业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '10', '金融业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '11', '房地产业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '12', '租赁和商务服务业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '13', '科学研究、技术服务和地质勘查业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '14', '水利、环境和公共设施管理业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '15', '居民服务和其他服务业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '16', '教育', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '17', '卫生、社会保障和社会福利业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '18', '文化、体育和娱乐业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '19', '公共管理和社会组织', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '20', '国际组织', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '01', '农业', '01', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '02', '林业、伐木业和有关的服务活动', '01', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '03', '畜牧业', '01', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '04', '渔业', '01', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '05', '农、林、牧、渔服务业', '01', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '06', '煤炭开采和洗选业', '02', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '07', '石油和天然气开采业', '02', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '08', '黑色金属矿采选业', '02', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '09', '有色金属矿采选业', '02', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '10', '非金属矿采选业', '02', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '11', '其他采矿业', '02', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '13', '农副食品加工业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '14', '食品制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '15', '饮料制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '16', '烟草制品业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '17', '纺织业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '18', '纺织服装、鞋、帽制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '19', '皮革、毛皮、羽毛（绒）及其制品业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '20', '木材加工及木、竹、藤、棕、草制品业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '21', '家具制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '22', '造纸及纸制品业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '23', '印刷业和记录媒介的复制', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '24', '文教体育用品制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '25', '石油加工、炼焦及核燃料加工业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '26', '化学原料及化学制品制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '27', '医药制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '28', '化学纤维制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '29', '橡胶制品业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '30', '塑料制品业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '31', '非金属矿物制品业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '32', '黑色金属冶炼及压延加工业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '33', '有色金属冶炼及压延加工业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '34', '金属制品业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '35', '通用设备制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '36', '专用设备制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '01', '农、林、牧、渔业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('IndustryClassA', '02', '采矿业', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '37', '交通运输设备制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '39', '电气机械及器材制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '40', '通信设备、计算机及其他电子设备制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '41', '仪器仪表及文化、办公用机械制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '42', '工艺品及其他制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '43', '废弃资源和废旧材料回收加工业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '44', '电力、热力的生产和供应业', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '45', '燃气生产和供应业', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '46', '水的生产和供应业', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '47', '房屋和土木工程建筑业', '05', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '48', '建筑安装业', '05', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '49', '建筑装饰业', '05', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '50', '其他建筑业', '05', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '51', '铁路运输业', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '52', '道路运输业', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '53', '城市公共交通业', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '54', '水上运输业', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '55', '航空运输业', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '56', '管道运输业', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '57', '装卸搬运和其他运输服务业', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '58', '仓储业', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '59', '邮政业', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '60', '电信和其他信息传输服务业', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '61', '计算机服务业', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '62', '软件业', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '63', '批发业', '08', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '65', '零售业', '08', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '66', '住宿业', '09', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '67', '餐饮业', '09', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '68', '银行业', '10', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '69', '证券业', '10', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '70', '保险业', '10', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '71', '其他金融活动', '10', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '72', '房地产业', '11', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '73', '租赁业', '12', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '74', '商务服务业', '12', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '75', '研究与试验发展', '13', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '76', '专业技术服务业', '13', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '77', '科技交流和推广服务业', '13', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '78', '地质勘探业', '13', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '79', '水利管理业', '14', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '80', '环境管理业', '14', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '81', '公共设施管理业', '14', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '82', '居民服务业', '15', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '83', '其他服务业', '15', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '84', '教育', '16', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '85', '卫生', '17', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '86', '社会保障业', '17', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '87', '社会福利业', '17', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '88', '新闻出版业', '18', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '89', '广播、电视、电影和音像业', '18', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '90', '文化艺术业', '18', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('ValidateRule', 'EMAIL', 'EMAIL', '^[\w-]+(\.[\w-]+)*@[\\w-]+(\.[\w-]+)+$', '电子邮箱不合法', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('ValidateRule', 'ID', 'ID', '^\d{15,18}$', '身份证号不合法', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('ValidateRule', 'notEmpty', 'notEmpty', '非空', '该单元不能为空', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('ValidateRule', 'NUMBER', 'NUMBER', '^\d+$', '数值不合法', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ValidateRule', 'RMBCURRENCY', 'RMBCURRENCY', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('ValidateRule', 'TIME', 'TIME', '^\d?\d:\d{2}:\d{2}$', '时间不合法', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('ValidateRule', 'URL', 'URL', '^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$', '网址不合法', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '01', '宝山区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '02', '长宁区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '03', '崇明县', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '04', '奉贤区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '05', '虹口区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '06', '嘉定区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '07', '金山区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '8', '市质监局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '9', '市规划局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '10', '市府新闻办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '11', '市安全技术监督局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ComFrom', '12', '市府督察室', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('AreaStatic', '1', '发文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('AreaStatic', '2', '发信息', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('AreaStatic', '3', '收文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('AreaStatic', '4', '收信息', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendType', '1', '全部', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('SendType', '2', '长城电子发文', '长城电子发文', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('SendType', '4', '国防办发文', '国防办发文', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('SendType', '5', '沪经办信发文', '沪经办信发文', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperYi', '7', '白头文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperJia', '5', '业务通讯', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperYi', '1', '沪委办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperYi', '2', '沪委办发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperYi', '3', '沪委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperYi', '4', '沪委发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperYi', '5', '办公厅通报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '1', '情况通报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '2', '沪府发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '3', '沪府办发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '4', '市府令', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '5', '专题会议纪要', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '6', '沪府办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '7', '常务会议纪要', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '8', '沪府', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '9', '工作会议纪要', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '1', '机要信', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '2', '挂号信', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '3', '机要室文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '4', '函', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvLetter', '5', '通知', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ValidateRule', 'RULEID', 'RULEID', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('FlowState', '5', '销毁', 'Destory', 'Destory', 
    'Destory', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '13', '作废', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '1', '市政府办公厅', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '08', '静安区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '09', '卢湾区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '10', '闵行区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '11', '南汇区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '12', '浦东新区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '13', '普陀区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '14', '青浦区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '15', '松江区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '16', '新黄浦区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '17', '徐汇区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '18', '杨浦区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('County', '19', '闸北区', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typBuyState', '1', '未购买', '未购买', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typBuyState', '2', '已购买入库', '已购买入库', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('Important', '1', '重要', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('taskstate', '14', '清退', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Role', '1', '管理员', 'R1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Role', '2', '发文登陆', 'R3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Role', '3', '收文登陆', 'R5', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Role', '4', '文印', 'R4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Role', '5', '督文', 'R6', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Role', '6', '发布管理员 ', 'R7', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Role', '7', '机要秘书', 'R11', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Entity', '1', '2处', 'E1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('Entity', '2', '20处', 'E2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RetRsvType', '1', '已清退', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RetRsvType', '2', '已接收', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RetRsvType', '3', '未清退', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RetRsvType', '4', '全部', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '1', '中发', '1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '2', '中办发', '1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '3', '厅字', '1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '4', '中办通报', '1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '5', '业务通讯', '1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '6', '沪委办', '2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '7', '沪委办发', '2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '8', '沪委', '2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '9', '沪委发', '2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '10', '通报', '2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '11', '情况通报', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '12', '沪府发', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '13', '沪府办发', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '14', '市府令', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '15', '国令', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '16', '国函', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '17', '国办发明电', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '18', '国办秘函', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '19', '国阅', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '20', '内部情况通报', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '21', '国办发', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '22', '国发', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '23', '参阅文件', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '24', '专题会议纪要', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '25', '沪府办', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '26', '常务会议纪要', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '27', '沪府', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '28', '工作会议纪要', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvPaperCome', '29', '市委专题会议纪要', '2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperDoc', '01', '中央文件(甲)', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperDoc', '02', '市委文件(乙)', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperDoc', '03', '市政府文件(丙)', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperDoc', '04', '国务院文件(国)', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperDoc', '06', '长城电子收', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperDoc', '07', '沪经党组收', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperDoc', '08', '人大书面意见办理', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperDoc', '09', '政协提案办理', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '1', '2处', 'E1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '2', '20处', 'E2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '3', '管理员', 'R1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '4', '发文登陆', 'R3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '5', '收文登陆', 'R5', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '6', '文印', 'R4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '7', '督文', 'R6', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '8', '发布管理员 ', 'R7', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '9', '机要秘书', 'R11', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '11', '委领导', 'D2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '12', '办公室', 'D3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '13', '研究室', 'D4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '14', '综合规划室', 'D5', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '15', '经济运行处', 'D6', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '16', '市场流通处', 'D7', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '17', '电力处', 'D8', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '18', '工业区管理处', 'D9', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '19', '装备工业处', 'D10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '20', '重化工业处', 'D11', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '21', '都市产业处', 'D12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '22', '军工处', 'D13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '23', '零售业管理处', 'D14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '24', '服务业管理处', 'D15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '25', '食品业管理处', 'D16', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '28', '产业投资处', 'D18', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '29', '节能环保处', 'D19', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '30', '外经处', 'D20', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '31', '教育培训处', 'D21', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '32', '人事处', 'D22', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '33', '直属党委', 'D23', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '34', '机关党委', 'D24', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '35', '老干部处', 'D25', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '36', '信息中心', 'D26', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '37', '高新工程处', 'D41', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '38', '军工配套处', 'D42', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '39', '小企业办', 'D35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '40', '整规办', 'D37', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('RsvDocDept', '41', '纪检组监察室', 'D39', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '12', '已通过电子邮件回复', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('LinkRecDoc', '1', '长城电子收', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RetType', '1', '未办理', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RetType', '2', '在办理', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RetType', '3', '已办理', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '4', '市工商局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '2', '市监察局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '3', '市水务局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '5', '市城管执法局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '6', '市政府法制办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '7', '市社团局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    FLAG)
 Values
   ('SpecTab', '4', 'GE', '收国,阅示,组群', '579', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '10', '市发改委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '11', '市物价局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '12', '市经济信息化委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('Require', '1', '主办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('Require', '2', '合办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('Require', '3', '会办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPCate', '1', '财经', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPCate', '2', '工业', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '22', '二十二', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '23', '二十三', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '24', '二十四', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '25', '二十五', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '26', '二十六', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '27', '二十七', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '28', '二十八', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '29', '二十九', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ChinaNum', '30', '三十', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPResult', '1', '解决采纳', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPResult', '2', '正在解决', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPResult', '3', '计划解决', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPResult', '4', '留作参考', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPResult', '5', '难以解决', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '1', '市发改委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '2', '市信息委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '3', '市金融办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '4', '市物价局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DPDept', '5', '市统计局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('ApplyPrice', '1', '2000', '金额大小', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('Level', '4', '加急', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperJia', '3', '厅字', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperJia', '4', '中办通报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperGuo', '1', '国令', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperGuo', '2', '国函', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperGuo', '3', '国办发明电', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperJia', '1', '中发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperJia', '2', '中办发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperGuo', '4', '国办密函', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperGuo', '5', '国阅', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperGuo', '6', '内部情况通报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperGuo', '7', '国办发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperGuo', '8', '国发', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperGuo', '9', '参阅文件', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperYi', '6', '市委专题会议纪要', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typeMeeting', '35', '1801 (委领导)', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typeMeeting', '36', '1802 (委领导)', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('OUTPUTINCREASE', '02', 'excel', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typeMeeting', '38', '1701 (委领导)', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typeMeeting', '39', '1702', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    FLAG)
 Values
   ('CustomQuery', '1', '备案统计附加条件', '备案数据统计使用的数据表', 'TBL_INVESTPRJOPI', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('ArhDept', '99', '其他', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '16', '史文军', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '99', '船舶制造业', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('BPOffUser', '04', '张寅', '副主任', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('BPOffUser', '05', '苗锦鹤', '副主任', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('SendType', '6', '长城电子党委发文', '长城电子党委发文', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, EXT, 
    FLAG)
 Values
   ('FaWenDic', '03', '国防科工办发文', '256', 'Gov', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, EXT, 
    FLAG)
 Values
   ('FaWenDic', '11', '长城电子党委发文', '300', 'Party', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, EXT, 
    FLAG)
 Values
   ('FaWenDic', '13', '国防科工办发文', '256', 'Party', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, EXT, 
    FLAG)
 Values
   ('FaWenDic', '21', '国防科工办发文', '256', 'GF', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, EXT, 
    FLAG)
 Values
   ('FaWenDic', '22', '长城电子党委发文', '300', 'GF', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, EXT, 
    FLAG)
 Values
   ('FaWenDic', '23', '长城电子发文', '255', 'GF', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '14', '市商务委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '17', '市民族宗教委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '18', '市公安局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '19', '市安全局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '20', '市民政局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '21', '市司法局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '24', '市外专局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('BPOffUser', '01', '王宁琴', '主任', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('BPOffUser', '02', '钟建国', '主任', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('BPOffUser', '03', '林主恩', '副主任', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '17', '徐惠明', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '03', '尚玉英', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '04', '陈跃华', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '12', '沈庭忠 ', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('BPBossUser', '13', '施兴德', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DGGL', '1', '长城电子工委收〔〕', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, EXT, 
    FLAG)
 Values
   ('FaWenDic', '01', '长城电子发文', '255', 'Gov', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, EXT, 
    FLAG)
 Values
   ('FaWenDic', '02', '长城电子党委发文', '300', 'Gov', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '25', '市医保局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '26', '市建设交通委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '28', '市环保局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '34', '市中医药办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '35', '市人口计生委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '38', '市国资委', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '39', '市地税局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '41', '市质量技监局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '42', '市统计局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '43', '市新闻出版局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '44', '市版权局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '45', '市体育局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '46', '市旅游局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '47', '市知识产权局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '48', '市绿化市容局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '49', '市林业局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '52', '市安全监管局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '53', '市政府机管局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '54', '市民防办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '55', '市人防办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '56', '市政府合作交流办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '57', '市政府协作办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '58', '市政府接待办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '59', '市政府侨办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '60', '市政府研究室', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '61', '市金融办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '62', '市口岸办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '63', '上海世博局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '64', '市政府新闻办', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '65', '市政府发展研究中心', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '66', '市政府参事室', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '67', '市粮食局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '68', '市监狱管理局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('SendDept', '69', '市食品药品管理局', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperDoc', '05', '长城电子工委收', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    FLAG)
 Values
   ('SpecTab', '1', 'GE', '收甲,阅示,组群', '570', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    FLAG)
 Values
   ('SpecTab', '3', 'GE', '收丙,阅示,组群', '576', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('SelOnlyDept', '1', '584', 'phaseID', '发文核稿', 
    '无附加条件时，流转只能选拟稿部门', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('SecurityLevel', '2', '绝密', '绝密', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '13', '沪府令', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('secretBrief', '04', '潘晓刚', 'U2262', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('BPOffUser', '06', '信亚东', '处长', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('ZXZJCategory', '01', '专项资金外部数据上传专用卷分类', '1037', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'xh01', '徐汇漕河泾新兴技术开发区
', '17
', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pt03', '普陀桃浦工业区', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'zb01', '闸北彭浦工业区
', '19', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd12', '嘉定黄渡工业园区', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd24', '浦东新区外高桥保税区
', '12
', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd01', '浦东新区川沙经济园区
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd23', '浦东新区机场经济园区
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd02', '浦东新区合庆经济园区
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd22', '浦东新区陆家嘴金融贸易区', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd03', '浦东新区洋山保税港区', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd21', '浦东新区飞机总装基地
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd04', '浦东新区临港重装备产业基地', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd20', '浦东新区临港主产业基地
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd05', '浦东新区高桥老工业基地城镇工业地块', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd14', '浦东新区曹路城镇工业地块
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd13', '浦东新区北蔡城镇工业地块', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd12', '浦东新区宣桥城镇工业地块
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd11', '浦东新区六灶城镇工业地块
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd10', '浦东新区金桥出口加工区
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd09', '浦东新区张江高科技园区
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx01', '奉贤星火开发区
', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd08', '浦东新区临港工业区
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd07', '浦东新区康桥工业区', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd06', '浦东新区大麦湾工业区', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd19', '浦东新区新场工业区', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd18', '浦东新区祝桥空港工业区', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd17', '浦东新区老港化工工业区
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'cn01', '长宁虹桥经济技术开发区', '02', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd16', '浦东新区南汇工业区
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx02', '奉贤工业综合开发区
', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx04', '奉贤奉城经济园区', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'fx03', '奉贤青港经济园区', '04', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh01', '闵行经济技术开发区
', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'pd15', '浦东新区闵行经济技术开发区临港园区
', '12', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj01', '松江工业区
', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj04', '松江出口加工区
', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj03', '松江工业区洞泾分区
', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'sj02', '松江金山工业区', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qt01', '上海化学工业区
', '999', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'jd13', '嘉定金山第二工业区', '06', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js08', '金山枫泾工业园区', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js09', '金山朱泾工业园区', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js10', '金山张堰工业区', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'js07', '金山工业区山阳园
', '07', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qp09', '青浦工业园区
', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qp08', '青浦徐泾镇工业开发区
', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qp07', '青浦华新镇工业开发区
', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qp06', '青浦白鹤镇工业开发区
', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qp05', '青浦朱家角工业开发区
', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qp04', '青浦练塘镇工业开发区
', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qp03', '青浦出口加工区
', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'cm01', '崇明工业园区
', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qp02', '青浦金泽城镇工业地块
', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('HighLeader', '01', '韩正', '韩正', 'and lead like ''%韩正%''', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('HighLeader', '02', '杨雄', '杨雄', 'and lead like ''%杨雄%''', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('HighLeader', '05', '沈晓明', '晓明', 'and lead like ''%沈晓明%''', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typeMeeting', '40', '1703', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('HighLeader', '00', '市领导的批示', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('HighLeader', '06', '赵雯', '赵雯', 'and lead like ''%赵雯%''', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('HighLeader', '07', '姜平', '姜平', 'and lead like ''%姜平%''', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('HighLeader', '08', '周波', '周波', 'and lead like ''%周波%''', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('HighLeader', '09', '翁铁慧', '铁慧', 'and lead like ''%翁铁慧%''', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, EXT, 
    FLAG)
 Values
   ('HighLeader', '10', '时光辉', '光辉', 'and lead like ''%时光辉%''', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typeMeeting', '41', '1610 (停用) (群众路线小组专用)', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('typeMeeting', '42', '1205', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('WsbpType', '4', '归组', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('WsbpType', '5', '归参', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('WsbpType', '6', '归跨', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('WsbpLevel', '2', '急', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFSType', '4', '投诉举报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFBType', '2', '12345', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFSType', '8', '来邮', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFSType', '9', '市长信箱', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvType', '4', '中央文件(甲)', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFAnswer', '1', '电话', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFAnswer', '3', '约谈', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFResult', '1', '解决', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFResult', '4', '未解决（政策所限）', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFMY', '1', '满意', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFMY', '2', '不满意', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('XFMY', '3', '未评价', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DangGongFa', '2', '人', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvType', '5', '国务院文件(国)', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvType', '6', '市委文件(乙)', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvType', '7', '市府文件(丙)', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DWFS', '8', '1234', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('NEWINFOPUBLIC', '1', ' ', '取消选中', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('RsvPaperBing', '14', '公告', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('OUTPUTINCREASE', '01', 'word', '374700', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('OUTPUTINCREASE', '03', 'docwork', '324333', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('OUTPUTINCREASE', '04', 'pdf', '0', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('UserPerferrence', '02', '已办事项列表显示会议相关内容', '不显示会议事项选择0, \r\n需要显示选择1', 'TASKLIST_FINISHEDMEETING', 
    '0,1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, ENAME, FLAG)
 Values
   ('CHYTZCH_ZCHB', '1', '产业投资处项目自查表', '1044', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'cm02', '崇明长兴海洋装备基地', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'cm04', '崇明向化城镇工业地块', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'cm03', '崇明富盛开发区', '03', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'mh05', '闵行闵行莘庄工业区', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('Region', 'qt02', '闵行出口加工区', '999', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '723', '房地产中介服务', '72', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '729', '其他房地产活动', '72', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '731', '机械设备租赁', '73', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '732', '文化及日用品出租', '73', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '741', '企业管理服务', '74', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '742', '法律服务', '74', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '743', '咨询与调查', '74', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '744', '广告业', '74', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '745', '知识产权服务', '74', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '746', '职业中介服务', '74', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '747', '市场管理', '74', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '748', '旅行社', '74', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '749', '其他商务服务', '74', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '751', '自然科学研究与试验发展', '75', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '752', '工程和技术研究与试验发展', '75', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '753', '农业科学研究与试验发展', '75', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '754', '医学研究与试验发展', '75', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '755', '社会人文科学研究与试验发展', '75', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '761', '气象服务', '76', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '762', '地震服务', '76', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '763', '海洋服务', '76', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '764', '测绘服务', '76', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '765', '技术检测', '76', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '766', '环境监测', '76', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '767', '工程技术与规划管理', '76', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '769', '其他专业技术服务', '76', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '771', '技术推广服务', '77', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '772', '科技中介服务', '77', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '779', '其他科技服务', '77', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '781', '矿产地质勘探', '78', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '782', '基础地质勘查', '78', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '783', '地质勘查技术服务', '78', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '791', '防洪管理', '79', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '792', '水资源管理', '79', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '799', '其他水利管理', '79', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '801', '自然保护', '80', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '802', '环境治理', '80', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '811', '市政公共设施管理', '81', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '812', '城市绿化管理', '81', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '813', '游览景区管理', '81', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '821', '家庭服务', '82', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '822', '托儿所', '82', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '823', '洗染服务', '82', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '824', '理发及美容保健服务', '82', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '825', '洗浴服务', '82', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '826', '婚姻服务', '82', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '827', '殡葬服务', '82', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '828', '摄影扩印服务', '82', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '829', '其他居民服务', '82', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '831', '修理与维护', '83', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '832', '清洁服务', '83', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '839', '其他未列明的服务', '83', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '841', '学前教育', '84', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('CommonApprove', '01', '同意', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('MEETINGRECORDTYPE', '01', '党委会', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('BIGTITLE', '02', '行政领导日程安排', '行政领导一周工作安排', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT001', '01', '采纳', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT001', '02', '留作参考', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT001', '03', '不予采纳', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT001', '04', '部分采纳', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT002', '01', '有政策信息', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT002', '02', '无政策信息', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT002', '03', '对政策解释不接受', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT003', '01', '属实', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT004', '01', '是', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT004', '02', '否', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT005', '03', '诉求过高', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT006', '02', '未联', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT008', '01', '电话', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT009', '01', '实际解决', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT009', '02', '解释说明', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT010', '01', '满意', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT010', '04', '未评价', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('UserPerferrence', '04', '主页会议通知计数器', '不提示选择0,\r\n需要提示选1', 'MEETINGCOUNT', 
    '0,1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('UserPerferrence', '05', '签章打印延迟', '选择延迟长度（千毫秒）', 'SIGNPRINTDELAY', 
    '5000,6000,7000,8000,9000,10000', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT004', '03', '无实际现场', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT007', '01', '始终关机', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT007', '02', '始终未接', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT007', '03', '其他', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT008', '03', '约谈', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT009', '03', '参考备案', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT009', '04', '诉求过高', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT009', '05', '未解决', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT010', '02', '不满意', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT010', '03', '认可', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('UserPerferrence', '06', '任务超时提醒', '选择超时天数，0为不提醒', 'TASKOVERTIME', 
    '0,1,2,3,4,5,6,7', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '14', '决议', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('DocumentType', '15', '公报', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    EXT, FLAG)
 Values
   ('UserPerferrence', '07', '使用移动办公助手', '不使用选择0，否则选择1', 'MOBILEHELPER', 
    '0,1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('MEETINGRECORDTYPE', '03', '党委专题会', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('PARTYSUPERVISETYPE', '01', '专', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('PARTYSUPERVISETYPE', '02', '批', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, ENAME, 
    FLAG)
 Values
   ('UserPerferrence', '03', '用户喜好流转目标', '#请选择部门', 'PERFERORGSTRING', 
    1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('MEETINGRECORDTYPE', '02', '党委扩大会', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('BIGTITLE', '01', '党委领导日程安排', '委领导一周工作安排汇总表', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('BIGTITLE', '03', '党委领导日程安排', '党委领导日程安排', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT003', '02', '部分属实', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT003', '03', '不属实', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT005', '01', '诉求合理合法', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT005', '02', '无政策依据', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT005', '04', '其他', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT006', '01', '已联', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, FLAG)
 Values
   ('12345OPT008', '02', '书面', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, DESCRIPTION, FLAG)
 Values
   ('SendType', '7', '规范性文件发文', '规范性文件发文', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '91', '体育', '18', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '92', '娱乐业', '18', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '93', '中国共产党机关', '19', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '94', '国家机构', '19', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '95', '人民政协和民主党派', '19', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '96', '群众团体、社会团体和宗教组织', '19', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '97', '基层群众自治组织', '19', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassB', '98', '国际组织', '20', 0);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '11', '谷物及其他作物的种植', '1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '12', '蔬菜、园艺作物的种植', '1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '13', '水果、坚果、饮料和香料作物的种植', '1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '14', '中药材的种植', '1', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '21', '林木的培育和种植', '2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '22', '木材和竹材的采运', '2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '23', '林产品的采集', '2', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '31', '牲畜的饲养', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '32', '猪的饲养', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '33', '家禽的饲养', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '34', '狩猎和捕捉动物', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '39', '其他畜牧业', '3', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '41', '海洋渔业', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '42', '内陆渔业', '4', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '51', '农业服务业', '5', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '52', '林业服务业', '5', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '53', '畜牧服务业', '5', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '54', '渔业服务业', '5', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '61', '烟煤和无烟煤的开采洗选', '6', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '62', '褐煤的开采洗选', '6', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '69', '其他煤炭采选', '6', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '71', '天然原油和天然气开采', '7', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '79', '与石油和天然气开采有关的服务活动', '7', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '81', '铁矿采选', '8', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '89', '其他黑色金属矿采选', '8', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '91', '常用有色金属矿采选', '9', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '92', '贵金属矿采选', '9', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '93', '稀有稀土金属矿采选', '9', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '101', '非金属矿采选业', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '102', '化学矿采选', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '103', '采盐', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '109', '石棉及其他非金属矿采选', '10', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '110', '其他采矿业', '11', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '131', '谷物磨制', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '132', '饲料加工', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '133', '植物油加工', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '134', '制糖', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '135', '屠宰及肉类加工', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '136', '水产品加工', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '137', '蔬菜、水果和坚果加工', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '139', '其他农副食品加工', '13', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '141', '焙烤食品制造', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '142', '糖果、巧克力及蜜饯制造', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '143', '方便食品制造', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '144', '液体乳及乳制品制造', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '145', '罐头制造', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '146', '调味品、发酵制品制造', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '149', '其他食品制造', '14', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '151', '肉类、鱼类、水果、蔬菜、油类及油脂的生产、加工和防腐', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '152', '乳制品的制造', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '153', '谷物磨制品、淀粉及淀粉制品和牧畜精饲料的制造', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '154', '其它食品的制造', '15', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '161', '烟叶复烤', '16', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '162', '卷烟制造', '16', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '169', '其他烟草制品加工', '16', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '171', '棉、化纤纺织及印染精加工', '17', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '172', '毛纺织和染整精加工', '17', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '173', '麻纺织', '17', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '174', '丝绢纺织及精加工', '17', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '175', '纺织制成品制造', '17', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '176', '针织品、编织品及其制品制造', '17', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '181', '纺织服装制造', '18', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '182', '纺织面料鞋的制造', '18', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '183', '制帽', '18', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '191', '皮革鞣制加工', '19', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '192', '皮革制品制造', '19', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '193', '毛皮鞣制及制品加工', '19', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '194', '羽毛（绒）加工及制品制造', '19', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '201', '锯材、木片加工', '20', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '202', '人造板制造', '20', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '203', '木制品制造', '20', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '204', '竹、藤、棕、草制品制造', '20', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '211', '木制家具制造', '21', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '212', '竹、藤家具制造', '21', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '213', '金属家具制造', '21', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '214', '塑料家具制造', '21', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '219', '其他家具制造', '21', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '221', '纸浆制造', '22', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '222', '造纸', '22', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '223', '纸制品制造', '22', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '231', '印刷', '23', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '232', '装订及其他印刷服务活动', '23', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '233', '记录媒介的复制', '23', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '241', '文化用品制造', '24', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '242', '体育用品制造', '24', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '243', '乐器制造', '24', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '244', '玩具制造', '24', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '245', '游艺器材及娱乐用品制造', '24', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '251', '精炼石油产品的制造', '25', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '252', '炼焦', '25', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '253', '核燃料加工', '25', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '261', '基础化学原料制造', '26', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '262', '肥料制造', '26', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '263', '农药制造', '26', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '264', '涂料、油墨、颜料及类似产品制造', '26', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '265', '合成材料制造', '26', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '266', '专用化学产品制造', '26', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '267', '日用化学产品制造', '26', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '271', '化学药品原药制造', '27', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '272', '化学药品制剂制造', '27', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '273', '中药饮片加工', '27', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '274', '中成药制造', '27', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '275', '兽用药品制造', '27', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '276', '生物、生化制品的制造', '27', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '277', '卫生材料及医药用品制造', '27', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '281', '纤维素纤维原料及纤维制造', '28', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '282', '合成纤维制造', '28', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '291', '轮胎制造', '29', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '292', '橡胶板、管、带的制造', '29', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '293', '橡胶零件制造', '29', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '294', '再生橡胶制造', '29', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '295', '日用及医用橡胶制品制造', '29', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '296', '橡胶靴鞋制造', '29', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '299', '其他橡胶制品制造', '29', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '301', '塑料薄膜制造', '30', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '302', '塑料板、管、型材的制造', '30', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '303', '塑料丝、绳及编织品的制造', '30', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '304', '泡沫塑料制造', '30', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '305', '塑料人造革、合成革制造', '30', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '306', '塑料包装箱及容器制造', '30', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '307', '塑料零件制造', '30', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '308', '日用塑料制造', '30', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '309', '其他塑料制品制造', '30', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '311', '水泥、石灰和石膏的制造', '31', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '312', '水泥及石膏制品制造', '31', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '313', '砖瓦、石材及其他建筑材料制造', '31', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '314', '玻璃及玻璃制品制造', '31', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '315', '陶瓷制品制造', '31', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '316', '耐火材料制品制造', '31', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '319', '石墨及其他非金属矿物制品制造', '31', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '321', '炼铁', '32', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '322', '炼钢', '32', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '323', '钢压延加工', '32', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '324', '铁合金冶炼', '32', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '331', '常用有色金属冶炼', '33', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '332', '贵金属冶炼', '33', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '333', '稀有稀土金属冶炼', '33', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '334', '有色金属合金制造', '33', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '335', '有色金属压延加工', '33', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '341', '结构性金属制品制造', '34', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '342', '金属工具制造', '34', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '343', '集装箱及金属包装容器制造', '34', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '344', '金属丝绳及其制品的制造', '34', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '345', '建筑、安全用金属制品制造', '34', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '346', '金属表面处理及热处理加工', '34', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '347', '搪瓷制品制造', '34', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '348', '不锈钢及类似日用金属制品制造', '34', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '349', '其他金属制品制造', '34', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '351', '锅炉及原动机制造', '35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '352', '金属加工机械制造', '35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '353', '起重运输设备制造', '35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '354', '泵、阀门、压缩机及类似机械的制造', '35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '355', '轴承、齿轮、传动和驱动部件的制造', '35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '356', '洪炉、熔炉及电炉制造', '35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '357', '风机、衡器、包装设备等通用设备制造', '35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '358', '通用零部件制造及机械修理', '35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '359', '金属铸、锻加工', '35', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '361', '矿山、冶金、建筑专用设备制造', '36', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '362', '化工、木材、非金属加工专用设备制造', '36', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '363', '食品、饮料、烟草及饲料生产专用设备制造', '36', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '364', '印刷、制药、日化生产专用设备制造', '36', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '365', '纺织、服装和皮革工业专用设备制造', '36', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '366', '电子和电工机械专用设备制造', '36', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '367', '农、林、牧、渔专用设备制造', '36', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '368', '医疗仪器设备及器械制造', '36', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '369', '环保、社会公共安全及其他专用设备制造', '36', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '371', '铁路运输设备制造', '37', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '372', '汽车制造', '37', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '373', '摩托车制造', '37', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '374', '自行车制造', '37', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '375', '船舶及浮动装置制造', '37', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '376', '航空航天器', '37', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '379', '交通器材及其他交通运输设备制造', '37', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '391', '电机制造', '39', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '392', '输配电及控制设备制造', '39', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '393', '电线、电缆、光缆及电工器材制造', '39', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '394', '电池制造', '39', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '395', '家用电力器具制造', '39', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '396', '非电力家用器具制造', '39', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '397', '照明器具制造', '39', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '399', '其他电气机械及器材制造', '39', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '401', '通信设备制造', '40', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '402', '雷达及配套设备制造', '40', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '403', '广播电视设备制造', '40', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '404', '电子计算机制造', '40', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '405', '电子器件制造', '40', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '406', '电子元件制造', '40', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '407', '家用视听设备制造', '40', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '409', '其他电子设备制造', '40', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '411', '通用仪器仪表制造', '41', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '412', '专用仪器仪表制造', '41', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '413', '钟表与计时仪器制造', '41', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '414', '光学仪器及眼镜制造', '41', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '415', '文化、办公用机械制造', '41', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '419', '其他仪器仪表的制造及修理', '41', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '421', '工艺美术品制造', '42', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '422', '日用杂品制造', '42', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '423', '煤制品制造', '42', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '424', '核辐射加工', '42', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '429', '其他未列明的制造业', '42', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '431', '金属废料和碎屑的加工处理', '43', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '432', '非金属废料和碎屑的加工处理', '43', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '441', '电力生产', '44', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '442', '电力供应', '44', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '443', '热力生产和供应', '44', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '450', '燃气生产和供应业', '45', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '461', '自来水的生产和供应', '46', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '462', '污水处理及其再生利用', '46', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '469', '其他水的处理、利用与分配', '46', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '471', '房屋工程建筑', '47', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '472', '土木工程建筑', '47', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '480', '建筑安装业', '48', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '490', '建筑装饰业', '49', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '501', '汽车的销售', '50', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '502', '汽车的保养和修理', '50', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '509', '其他未列明的建筑活动', '50', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '511', '铁路旅客运输', '51', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '512', '铁路货物运输', '51', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '513', '铁路运输辅助活动', '51', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '521', '公路旅客运输', '52', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '522', '道路货物运输', '52', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '523', '道路运输辅助活动', '52', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '531', '公共电汽车客运', '53', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '532', '轨道交通', '53', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '533', '出租车客运', '53', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '534', '城市轮渡', '53', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '539', '其他城市公共交通', '53', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '541', '水上旅客运输', '54', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '542', '水上货物运输', '54', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '543', '水上运输辅助活动', '54', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '551', '航空客货运输', '55', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '552', '通用航空服务', '55', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '553', '航空运输辅助活动', '55', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '560', '管道运输业', '56', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '571', '装卸搬运', '57', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '572', '运输代理服务', '57', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '581', '谷物、棉花等农产品仓储', '58', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '589', '其他仓储', '58', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '591', '国家邮政', '59', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '599', '其他寄递服务', '59', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '601', '电信', '60', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '602', '互联网信息服务', '60', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '603', '广播电视传输服务', '60', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '604', '卫星传输服务', '60', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '611', '计算机系统服务', '61', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '612', '数据处理', '61', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '613', '计算机维修', '61', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '619', '其他计算机服务', '61', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '621', '定期空中运输', '62', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '629', '其他软件服务', '62', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '631', '农蓄产品批发', '63', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '632', '食品、饮料及烟草制品批发', '63', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '633', '纺织、服装及日用品批发', '63', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '634', '文化、体育用品及器材批发', '63', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '635', '医药及医疗器材批发', '63', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '636', '矿产品、建材及化工产品批发', '63', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '637', '机械设备、五金交电及电子产品批发', '63', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '638', '贸易经纪与代理', '63', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '639', '其他批发', '63', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '651', '综合零售', '65', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '652', '食品、饮料及烟草制品专门零售', '65', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '653', '纺织、服装及日用品专门零售', '65', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '654', '文化、体育用品及器材专门零售', '65', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '655', '医药及医疗器材专门零售', '65', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '656', '汽车、摩托车、燃料及零配件专门零售', '65', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '657', '家用电器及电子产品专门零售', '65', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '658', '五金、家具及市内装修材料专门零售', '65', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '659', '无店铺及其他零售', '65', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '661', '旅游饭店', '66', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '662', '一般旅馆', '66', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '669', '其他住宿服务', '66', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '671', '正餐服务', '67', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '672', '快餐服务', '67', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '673', '饮料及冷饮服务', '67', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '679', '其他餐饮服务', '67', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '681', '中央银行', '68', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '682', '商业银行', '68', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '689', '其他银行', '68', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '691', '证券市场管理', '69', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '692', '证券经纪与交易', '69', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '693', '证券投资', '69', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '694', '证券分析与咨询', '69', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '701', '人寿保险', '70', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '702', '非人寿保险', '70', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '703', '保险辅助服务', '70', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '711', '金融信托与管理', '71', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '712', '金融租赁', '71', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '713', '财务公司', '71', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '714', '邮政储蓄', '71', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '715', '典当', '71', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '719', '其他未列明的金融活动', '71', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '721', '房地产开发经营', '72', 1);
Insert into EITC09.DICTYPE
   (DICTYPE, ID, NAME, EXT, FLAG)
 Values
   ('IndustryClassC', '722', '物业管理', '72', 1);
COMMIT;


Insert into EITC09.DICCATEGORY
   (CATEGORYID, NAME, DESCRIPTION)
 Values
   (26, '专项资金字典库', '专项资金字典库');
Insert into EITC09.DICCATEGORY
   (CATEGORYID, NAME, DESCRIPTION)
 Values
   (27, '自定义查询', '自定义查询');
Insert into EITC09.DICCATEGORY
   (CATEGORYID, NAME, DESCRIPTION)
 Values
   (28, '特殊报表', '特殊报表');
Insert into EITC09.DICCATEGORY
   (CATEGORYID, NAME, DESCRIPTION)
 Values
   (33, '系统配置', '非流程的培植');
Insert into EITC09.DICCATEGORY
   (CATEGORYID, NAME, DESCRIPTION)
 Values
   (24, '办理工作', '办理工作');
Insert into EITC09.DICCATEGORY
   (CATEGORYID, NAME)
 Values
   (22, '会议室管理');
Insert into EITC09.DICCATEGORY
   (CATEGORYID, NAME, DESCRIPTION)
 Values
   (15, '物品管理', '第二模块');
Insert into EITC09.DICCATEGORY
   (CATEGORYID, NAME)
 Values
   (17, '信息系统');
Insert into EITC09.DICCATEGORY
   (CATEGORYID, NAME, DESCRIPTION)
 Values
   (20, '流程', '流程');
Insert into EITC09.DICCATEGORY
   (CATEGORYID, NAME, DESCRIPTION)
 Values
   (29, '党委流程', '党委流程');
COMMIT;


Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('PARTYSUPERVISETYPE', '1', '党委督查类型', 29);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('12345OPT001', '1', '意见建议类事实认定', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('12345OPT003', '1', '12345事实认定', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('12345OPT004', '1', '12345现场查看', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('12345OPT005', '1', '12345诉求认证', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('12345OPT007', '1', '12345未联原因', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('12345OPT010', '1', '12345是否满意', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('12345OPT002', '1', '咨询类事实认定', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('MEETINGRECORDTYPE', '1', '会议纪要类型', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('BIGTITLE', '1', '大标题', 33);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('12345OPT006', '1', '12345先行联系', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('12345OPT008', '1', '12345答复方式', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('12345OPT009', '1', '12345是否解决', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('ZXZJCategory', '1', '专项资金专用卷分类', 26);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('ZXZJDomain', '1', '专项资金领域', 26);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('CustomQuery', '1', '自定义查询', 27);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('Region', '1', '区域', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('IndustryClassA', '1', '行业一级分类', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('IndustryClassB', '1', '行业二级分类', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('IndustryClassC', '1', '行业三级分类', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('NEWINFOPUBLIC', '1', '新信息公开', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('secretBrief', '1', '涉秘简报查看', 33);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('CHYTZCH_ZCHB', '1', '产业投资处项目自查表', 28);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('ZXZJBAGEXPAND', '1', 'BAG附加', 26);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('WsbpType', '1', '外事报批分类', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DocDealNotifySetting', '1', '待办流程知会设置', 33);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('OUTPUTINCREASE', '1', '导出增量', 33);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('HighLeader', '1', '市领导', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('ArhDept', '1', '归档处室', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('XFSType', '1', '信访分类', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('XFGK', '1', '信访公开', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('XFAnswer', '1', '答复方式', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('XFResult', '1', '信访解决', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('XFMY', '1', '信访满意', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('FONDSCODE', '1', '归档全宗号', 33);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('BPBossUser', '1', '报批委领导', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DangGongFa', '1', '党工发字号', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('SpecTab', '1', '流转额外显示的Tab', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DPResult2', '1', '政协办理结果', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('TSType', '1', '投诉分类', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('InLetterType', '1', '委内便函类别', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('typeMeeting', '1', '会议室管理', 22);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('CommonApprove', '1', '常用审批意见', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RetType', '1', '清退类型', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('SendDept', '1', '送文单位', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('ChinaNum', '1', '中文数量', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RsvPaperBing', '1', '丙', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RsvLetter', '1', '信函类型', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('Require', '1', '办理要求', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DPCate', '1', '类别', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DPResult', '1', '办理结果', 24);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DPDept', '1', '办理部门', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('typItem', '1_1', '物品分类库', 15);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RsvPaperJia', '1', '甲', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('Important', '1', '重要', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('ApplyPrice', '1', '申请金额', 15);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('SelectModalRsv1', '1', '选择模版', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('Dept', '1', '经委部门', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DocumentType', '1', '文种', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('taskstate', '1', '任务状态', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RsvType', '1', '收文分类', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('InfoPublic', '1', '信息公开', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('FieldType', '1', '字段类型', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('ValidateRule', '1', '校验规则', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('SecurityLevel', '1', '密级', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('FlowState', '1', '流程状态', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('Level', '1', '等级', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('typBuyState', '1', '购买状态', 15);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('ComFrom', '1', '来文单位', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('SendType', '1', '发文分类', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RsvPaperYi', '1', '乙', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RsvPaperGuo', '1', '国', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('AreaStatic', '1', '区县统计', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('LinkRecDoc', '1', '关联收文号', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('County', '1', '区县', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('Role', '1', '角色', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('Entity', '1', '集合', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RetRsvType', '1', '清退接受', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RsvPaperCome', '1', '收字来文', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RsvPaperDoc', '1', '收字收文分类', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('RsvDocDept', '1', '收字查询部门选择', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('SaveType', '1', '保管期限', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('BPOffUser', '1', '报批办理办公室人员', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('SelOnlyDept', '1', '核稿流转给拟稿部门', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DGGL', '1', '党工关联收文号', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('FaWenDic', '1', '发文字典', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DWTYPE', '1', '党委发文类型', 29);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DWLB', '1', '党委文件类型', 29);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('DWFS', '1', '党委发送渠道', 29);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('WsbpLevel', '1', '外事报批等级', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('SECRETCONFIRM', '1', '定密单', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('UserPerferrence', '1', '用户喜好', 33);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('XFBType', '1', '信访类别', 20);
Insert into EITC09.DICMODE
   (DICTYPE, SPLITMODE, CNAME, CATEGORYID)
 Values
   ('INFOPUBLISH', '1', '系统信息', 33);
COMMIT;


