function TypeMSG (key,val) {
	this.key = key;
	this.val = val;
}

function Validate (element, elementMSG, arrValidate) {
	this.element = element;
	this.errores = [];
	var self = this;
	this.element.onblur = function () {
		for(var item in arrValidate){
			if(arrValidate[item][0] === "required")
				self.evalLength();
			if(arrValidate[item][0] === "maxLength")
				self.maxLength(arrValidate[item][1]);
			if(arrValidate[item][0] === "minLength")
				self.minLength(arrValidate[item][1]);
			if(arrValidate[item][0] === "minMaxLength")
				self.minMaxLength(arrValidate[item][1],arrValidate[item][2]);
		}
		var msgs = elementMSG;
		self.printMSG(msgs);
		self.Clear();
	};
	this.element.onfocus = function () {
		for(var item in arrValidate){
			if(arrValidate[item][0] === "required")
				self.evalLength();
			if(arrValidate[item][0] === "maxLength")
				self.maxLength(arrValidate[item][1]);
			if(arrValidate[item][0] === "minLength")
				self.minLength(arrValidate[item][1]);
			if(arrValidate[item][0] === "minMaxLength")
				self.minMaxLength(arrValidate[item][1],arrValidate[item][2]);
		}
		var msgs = elementMSG;
		self.printMSG(msgs);
		self.Clear();
	};
	this.element.onkeyup = function () {
		for(var item in arrValidate){
			if(arrValidate[item][0] === "required")
				self.evalLength();
			if(arrValidate[item][0] === "maxLength")
				self.maxLength(arrValidate[item][1]);
			if(arrValidate[item][0] === "minLength")
				self.minLength(arrValidate[item][1]);
			if(arrValidate[item][0] === "minMaxLength")
				self.minMaxLength(arrValidate[item][1],arrValidate[item][2]);
		}
		var msgs = elementMSG;
		self.printMSG(msgs);
		self.Clear();
	};
	if(this.element instanceof Array){
		for(var item in this.element){
			this.element[item].onclick = function () {
				for(var item in arrValidate)
				{
					if(arrValidate[item][0] === "required")
						self.evalLength();
					if(arrValidate[item][0] === "checked")
						self.isCheckedOne();
					if(arrValidate[item][0] === "maxLength")
						self.maxLength(arrValidate[item][1]);
					if(arrValidate[item][0] === "minLength")
						self.minLength(arrValidate[item][1]);
					if(arrValidate[item][0] === "minMaxLength")
						self.minMaxLength(arrValidate[item][1],arrValidate[item][2]);
				}
				var msgs = elementMSG;
				self.printMSG(msgs);
				self.Clear();
			}
		}
	}

}

Validate.prototype.evalLength = function() {
	if(this.element.value.length === 0){
		this.errores.push(["El campo esta vacio",new TypeMSG(3,"error")]);
	}else{
		this.errores.push(["El campo es aprobado",new TypeMSG(1,"correct")]);
	}
};

Validate.prototype.isCheckedOne = function() {
	var selectRb = false;
	for(var item in this.element){
		if(this.element[item].checked){
			selectRb = true;
			break;
		}
	}
	if(!selectRb)
		this.errores.push(["El campo es obligatorio, seleccione uno por favor",new TypeMSG(3,"error")]);
	else
		this.errores.push(["El campo es aprobado",new TypeMSG(1,"correct")]);
};

Validate.prototype.Clear = function() {
	this.errores = [];
};

Validate.prototype.maxLength = function(maxLength) {
	if(parseInt(this.element.value.length) > parseInt(maxLength)){
		this.errores.push(["Longitud maxima del campo: " + maxLength,new TypeMSG(3,"error")]);
	}
};

Validate.prototype.minLength = function(minLength) {
	if(parseInt(this.element.value.length) < parseInt(minLength)){
		this.errores.push(["Longitud minima del campo: " + minLength,new TypeMSG(3,"error")]);
	}
};

Validate.prototype.minMaxLength = function(minLength, maxLength) {
	this.minLength(minLength);
	this.maxLength(maxLength);
};

Validate.prototype.addOrRemoveClass = function(element, removeCSS, addCSS) {
	element.classList.remove(removeCSS);
	element.classList.add(addCSS);
};

Validate.prototype.typeOfMSG = function(arr) {
	var intTypeMSG = 0;
	var arrMsg = [[3,0],[2,0],[1,0]];
	for(var item in arr){
		for(var j in arrMsg){
			if(arr[item][1].key === arrMsg[j][0]){
				arrMsg[j][1]+=1;
			}
		}
	}

	intTypeMSG = arrMsg[0];
	for (var i = 0; i < arrMsg.length-1; i++) {
		if(arrMsg[i+1][1] > intTypeMSG[1]){
			intTypeMSG = arrMsg[i+1];
		}
	}
	return intTypeMSG[0];
}

Validate.prototype.printMSG = function(elementMSG) {
	elementMSG.innerHTML = "";
	var arr = this.errores;
	var msgType = this.typeOfMSG(arr);
	for(var item in arr){
		if(arr[item][1].key === 3){
			this.addOrRemoveClass(elementMSG,'correct','error');
		}else{
			this.addOrRemoveClass(elementMSG,'error','correct');
		}
		if(arr[item][1].key === msgType){
			elementMSG.innerHTML += arr[item][0]+ "<br>";
		}
	}
};