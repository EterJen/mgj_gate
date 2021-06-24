myApp.service('NodeTreeTool', function () {
    /*防止变量未定义就使用*/
    self = this;
    this.isEmpty = function (object) {
        if (object === null || object === undefined) {
            return true;
        } else {
            return false;
        }
    };
    /*判断属性是否为boolen false null 未定义*/
    this.isFalse = function (object) {
        if (object === null || object === undefined || object == false) {
            return true;
        } else {
            return false;
        }
    };

    this.relatedCheck = function (parentNode, selfNode, siblingNodes, sonNodes) {
        if (selfNode.checked) {
            /*选中所有子节点*/
            if (!this.isEmpty(sonNodes)) {
                for (var i = 0; i <= sonNodes.length - 1; i++) {
                    sonNodes[i].checked = true;
                }
            }
            /*兄弟节点计算 更新父节点*/
            if (!this.isEmpty(siblingNodes)) {
                var parentChecked = true;
                for (var i = 0; i <= siblingNodes.length - 1; i++) {
                    if (this.isFalse(siblingNodes[i].checked)) {
                        parentChecked = false;
                        break;
                    }
                }
                if (!this.isEmpty(parentNode)) {
                    parentNode.checked = parentChecked;
                }
            }

        } else {
            /*子节点清空*/
            if (!this.isEmpty(sonNodes)) {
                for (var i = 0; i <= sonNodes.length - 1; i++) {
                    sonNodes[i].checked = false;
                }
            }

            /*更新父节点*/
            if (!this.isEmpty(parentNode)) {
                parentNode.checked = false;
            }
        }
    };

    this.checkedCount = function (parentNode, selfNode, siblingNodes, sonNodes, resultList) {
        /*父节点存在*/
        if (!this.isEmpty(parentNode)) {
            /*全选*/
            if (parentNode.checked) {
                /*添加所有兄弟节点 除已选中的*/
                if (!this.isEmpty(siblingNodes)) {
                    siblingNodes.forEach(function (value) {
                        if (self.isFalse(value.checked)) {
                            resultList = resultList.concat(value);
                        }
                    });
                }

                /*加入父节点*/
                resultList = resultList.concat(parentNode);
            } else {
                resultList = resultList.filter(function (value) {
                    return parentNode != value;
                });
            }
        }

        /*判断自己*/
        if (selfNode.checked) {
            /*子节点存在添加子节点*/
            if (!this.isEmpty(sonNodes)) {
                /*孩子节点 先过滤再加入*/
                resultList = resultList.filter(function (value) {
                    return !(sonNodes.indexOf(value) >= 0);
                });
                sonNodes.forEach(function (value) {
                    resultList = resultList.concat(value);
                });
            }
            /*添加自己*/
            resultList = resultList.concat(selfNode);
        } else {
            /*过滤子节点*/
            if (!this.isEmpty(sonNodes)) {
                resultList = resultList.filter(function (value) {
                    return !(sonNodes.indexOf(value) >= 0);
                });
            }
            /*过滤自己*/
            resultList = resultList.filter(function (value) {
                return selfNode != value;
            });
        }


        /*数组引用经过filter concat已经改变 需要手动返回*/
        return resultList;
    };
    
    /*根据当前节点查询父节点和兄弟节点*/
    this.queryParentNodeAndSiblingNodes=function(selfNode,data){
    	var resultList={"parentNode":null,"siblingNodes":null,"index":0};
    	if(selfNode.parentid!==null&&selfNode.parentid!==""&&selfNode.parentid!=="-1"){
    		angular.forEach(data, function(item) {
        		if(item.id===selfNode.parentid){
        			resultList.parentNode=item;
                	resultList.siblingNodes=item.nodes;
                	angular.forEach(item.nodes, function(d,index) {
                		if(d.id===selfNode.id){
                        	resultList.index=index;
                		}
                	})
        		}else if(item.nodes!==null&&item.nodes.length>0){
        			self.foreachNodes(item,selfNode,resultList);
                }
        	})
    	}else{
    		angular.forEach(data, function(item,index) {
        		if(item.id===selfNode.id){
                	resultList.index=index;
        		}
        	})
    		resultList.siblingNodes=data;
    	}
    	return resultList;
    }
    
    /*循环子节点查找当前节点的父节点和兄弟节点*/
    this.foreachNodes=function(node,selfNode,resultList){
    	angular.forEach(node.nodes, function(item) {
    		if(item.id===selfNode.parentid){
            	resultList.parentNode=item;
            	resultList.siblingNodes=item.nodes;
            	angular.forEach(item.nodes, function(d,index) {
            		if(d.id===selfNode.id){
                    	resultList.index=index;
            		}
            	})
            }else if(item.nodes!==null&&item.nodes.length>0){
            	self.foreachNodes(item,selfNode,resultList);
            }
        });
    }


	/*根据当前节点查询父节点*/
	this.foreachQueryParentNodes=function(nodes,selfNode,resultList){

		angular.forEach(nodes, function(item) {

			if(item.id==selfNode.parentid){
				resultList.istrue=true;
				resultList.value=item
				//resultList=item;
			}else if(item.nodes!=null&&item.nodes.length>0){
				self.foreachQueryParentNodes(item.nodes,selfNode,resultList);
			}
		});
		if (resultList.istrue) {
			//console.log(resultList.value);
			return resultList.value;
		}

	}
    
    /*循环所有数结构对是否有排序进行筛选*/
    this.foreachDatas=function(d){
    	//angular.forEach(d, function(item,index,arr) {
    	for (var i = 0; i <= d.length - 1; i++) {
    		d[i].noUpMove=true;d[i].noDownMove=true;d[i].noMove=true;
    		if(d[i].parentid!==null&&d[i].parentid!==""&&d[i].parentid!=="-1"){
            	if(i===0)
            		d[i].noUpMove=false;
            	if(i===(d.length-1))
            		d[i].noDownMove=false;
            }else{
            	d[i].noMove=false;
            }
    		if(d[i].nodes!==null&&d[i].nodes.length>0){
    			this.foreachDatas(d[i].nodes);
            }
    	}	
        //});
    }
    
    /*查询当前节点的坐标和所有父节点的坐标*/
    this.queryParentNodeIndexAndselfNodeIndex=function(selfNode,data,resultList){
    	for(var i=0;i<data.length;i++){
    		resultList=[];
    		var resultListLength=0;
    		resultList[resultListLength]=i; 
    		if(data[i].id===selfNode.id){
    			return resultList;
    		}else if(data[i].nodes!==null&&data[i].nodes.length>0){
    			//console.log(index);
    			var resultObj=self.queryAllSonIndex(selfNode,data[i].nodes,resultList,resultListLength+1);
    			if(!this.isEmpty(resultObj)&&resultObj.resultType){
    				//console.log(JSON.stringify(resultList));
    				return resultObj.resultList;
    			}
    		}
    	}
    	/*angular.forEach(data, function(item,index,arr) {
    		resultList[resultList.length]=index;
    		if(item.id===selfNode.id){
    			resultList.push(index);
    			return resultList;
    		}else if(item.nodes!==null&&item.nodes.length>0){
    			console.log(index);
    			//self.queryAllSonIndex(selfNode,item.nodes,resultList,index);
    		}
    	});*/
    }
    
    this.queryAllSonIndex=function(selfNode,data,resultList,resultListLength){
    	//resultListLength=resultList.length;//根据返回数组的长度判断当前index位置
    	var resultType=false;
    	for(var i=0;i<data.length;i++){
    		resultList[resultListLength]=i;
    		//console.log(resultListLength);
    		resultList=resultList.slice(0,resultListLength+1);
    		//console.log(JSON.stringify(resultList)+"=="+data[i].id+"=="+selfNode.id+(data[i].id==selfNode.id));
    		if(data[i].id===selfNode.id){
    			resultType=true;
    			return {"resultType":resultType,"resultList":resultList};
    		}else if(data[i].nodes!==null&&data[i].nodes.length>0){
    			//console.log(index);
    			var resultObj=self.queryAllSonIndex(selfNode,data[i].nodes,resultList,resultListLength+1);
    			if(!this.isEmpty(resultObj)&&resultObj.resultType){
    				return resultObj;
    			}
    		}
    	}
    }
    /*树形菜单全选和全不选*/
    this.selectAll=function(data,isChecked){
    	angular.forEach(data, function(item) {
    		item.checked=isChecked;
    		if(item.nodes!==null&&item.nodes.length>0){
    			self.selectAll(item.nodes,isChecked);
    		}
    	});
    }
    /*判断兄弟节点是否选中--只针对权限管理*/
    this.isSelectParent=function(data,currentIndexList,isChecked){
    	var currentNode=[];
    	if(isChecked){
    		for(var i=0;i<currentIndexList.length-1;i++){
    			if(currentNode!=null&&currentNode.length>0){
    				currentNode[currentIndexList[i]].checked=isChecked;
    				currentNode=currentNode[currentIndexList[i]].nodes;
    			}else{
    				data[currentIndexList[i]].checked=isChecked;
        			currentNode=data[currentIndexList[i]].nodes;
    			}
        	}
    	}else{
    		if(currentIndexList.length<2){
    			return;
    		}
    		for(var i=currentIndexList.length-2;i>=0;i--){
    			currentNode={};
    			for(var j=0;j<i+1;j++){
    				if(currentNode.nodes!=null&&currentNode.nodes.length>0){
        				currentNode=currentNode.nodes[currentIndexList[j]];
        				//console.log(currentNode.title);
        			}else{
            			currentNode=data[currentIndexList[j]];
            			//console.log(currentNode.title);
        			}
    				
    			}
    			for(var e=0;e<currentNode.nodes.length;e++){
					//console.log(currentNode.nodes[e].title);
					if(currentNode.nodes[e].checked){
						return;
					}
				}
				currentNode.checked=false;
        	}
    	}
    }
    /*添加权限id*/
    this.addMpsavailModuleId=function(data,selectModuleList){
    	for(var i=0;i<data.length;i++){
    		if(data[i].checked){
    			selectModuleList.push(data[i].id);
    			if(data[i].nodes!=null&&data[i].nodes.length>0){
    				selectModuleList=this.addMpsavailModuleId(data[i].nodes,selectModuleList);
    			}
    		}
    	}
    	return selectModuleList;
    }
});


