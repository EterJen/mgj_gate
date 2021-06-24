package com.gwideal.core.startup;

import com.gwideal.core.common.CoreBaseEntity;
import com.gwideal.increment.generator.IncGeneratorConfig;
import com.gwideal.increment.generator.IncMetaPackage;
import com.gwideal.increment.generator.IncMetaTable;
import com.gwideal.mybatis.metautils.JsonUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class CoreInitSystemRunner implements ApplicationRunner{
	
	@Value("${dbRelClassPath}")
	private String dbRelClassPath;
	
	@Value("${stateMachineConfig}")
	private String stateMachineConfig;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		//初始化表到实体的映射关系
        try{
        	IncGeneratorConfig incGeneratorConfig = JsonUtils.readByClass("codeGenerateConfig.json",IncGeneratorConfig.class);
    		for(IncMetaPackage mp: incGeneratorConfig.getMetaPackageList()){
    			for(IncMetaTable mt:mp.getMetaTableConfigs()){
    				CoreBaseEntity.tableToEntityMap.put(mt.getTableName(), mp.getPackageNameBase()+".l4.entity."+mt.getEntityName());
    			}
    		}

        }catch(Exception e){
        	e.printStackTrace();
        }
		
		
	}

}
