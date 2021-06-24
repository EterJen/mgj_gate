myApp.service('PersonnelService', function () {

	var _this = this;

	_this.personnelChk = {
		chkNames: ['secretPost', 'temporaryPost', 'temporaryHireType', 'retireIdentity', 'departmentalCadre', 'engageType'],
		secretPost: {
			types: ['Yes', 'No'],
			Yes:    false,
			No:     false
		},
		temporaryPost: {
			types: ['Yes', 'No'],
			Yes:    false,
			No:     false
		},
		temporaryHireType: {
			types: ['borrow', 'engage'],
			borrow: false,
			engage: false
		},
		retireIdentity: {
			types: ['servant', 'institution', 'enterprise'],
			servant:        false,
			institution:    false,
			enterprise:     false
		},
		departmentalCadre: {
			types: ['Yes', 'No'],
			Yes:    false,
			No:     false
		},
		engageType: {
			types: ['first', 'once', 'twice', 'other'],
			first:  false,
			once:   false,
			twice:  false,
			other:  false
		}
	};

	this.getPersonnelChk = function () {
		return _this.personnelChk;
	};

	/**
	 * 单击checkbox框
	 */
	this.choseCK = function (task, chkName, type, $event) {
		var currSelect = _this.personnelChk[chkName][type];
		_this.personnelChk[chkName].types.forEach(function (value) {
			_this.personnelChk[chkName][value] = false;
		});
		if (currSelect) {
			$($event.target).removeClass("checked");
			_this.personnelChk[chkName][type] = true;
			task.theCommonFormInfo.formJxwPersonnel[chkName] = type;
		} else {
			$($event.target).addClass("checked");
			task.theCommonFormInfo.formJxwPersonnel[chkName] = null;
		}
		return task;
	};

	/**
	 * 单击checkbox框对应的文字
	 */
	this.chose = function (task, chkName, type) {
		var currSelect = _this.personnelChk[chkName][type];

		_this.personnelChk[chkName].types.forEach(function (value) {
			_this.personnelChk[chkName][value] = false;
		});
		if (currSelect) {
			task.theCommonFormInfo.formJxwPersonnel[chkName] = null;
			return;
		}

		_this.personnelChk[chkName][type] = true;
		task.theCommonFormInfo.formJxwPersonnel[chkName] = type;

		if (!task.theCommonFormInfo.formJxwPersonnel[chkName]) {
			task.theCommonFormInfo.formJxwPersonnel[chkName] = null;
		}
		return task;
	}

});