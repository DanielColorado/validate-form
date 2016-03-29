function TypeMSG (key,val) {
	this.key = key;
	this.val = val;
}

/** Clase para validar elementos de un formulario
*	element = representa el input al que se le van a validar campos
*	elementMSG = representa el elemento en el cual vamos a colocar el mensaje
*	arrValidate = arreglo de las validaciones que queremos hacer
*	arrTypeEvent = arreglo que nos indica en que momento se realizan las validaciones
*	Si no encuentra arrValidate se asigna como un arreglo nuevo
*	Si no encuentra arrTypeEvent se asigna como un arreglo nuevo 
 **/
function Validate (element, elementMSG, arrValidate,arrTypeEvent) {
	this.element = element;
	this.errores = [];
	this.elementMSG = elementMSG || [];
	this.arrValidate = arrValidate || [];
	this.arrTypeEvent = arrTypeEvent || [];
	var self = this;
	if(this.arrTypeEvent.indexOf("blur") !== -1){
		this.element.onblur = function () {
			self.validateAll(true);
		};
	}
	if(this.arrTypeEvent.indexOf("focus") !== -1){
		this.element.onfocus = function () {
			self.validateAll(true);
		};
	}
	if(this.arrTypeEvent.indexOf("keyup") !== -1){
		this.element.onkeyup = function () {
			self.validateAll(true);
		};
	}

	if(this.element instanceof Array){
		if(this.arrTypeEvent.indexOf("clickRB") !== -1){
			for(var item in this.element){
				this.element[item].onclick = function () {
					self.validateAll(true);
				}
			}
		}
	}

}

/** Funcion que nos ayuda a ver que se va a validar **/
Validate.prototype.validateAll = function(cleanArray) {
	for(var item in this.arrValidate){
		if(this.arrValidate[item][0] === "required")
			this.evalLength();
		if(this.arrValidate[item][0] === "email")
			this.validateEmail(this.arrValidate[item][1]);
		if(this.arrValidate[item][0] === "checked")
			this.isCheckedOne();
		if(this.arrValidate[item][0] === "maxLength")
			this.maxLength(this.arrValidate[item][1]);
		if(this.arrValidate[item][0] === "minLength")
			this.minLength(this.arrValidate[item][1]);
		if(this.arrValidate[item][0] === "minMaxLength")
			this.minMaxLength(this.arrValidate[item][1],this.arrValidate[item][2]);
	}
	var msgs = this.elementMSG;
	this.printMSG(msgs);
	if(cleanArray)this.Clear();
};

/** Funcion que ve que un input del tipo text no este vacio **/
Validate.prototype.evalLength = function() {
	if(this.element.value.length === 0){
		this.errores.push(["El campo esta vacio",new TypeMSG(3,"error")]);
	}else{
		this.errores.push(["El campo es aprobado",new TypeMSG(1,"correct")]);
	}
};

/** Funcion que nos dice si se selecciono al menos un elemento del tipo radio o checkbox **/
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

/** Funcion que limpia el arreglo de errores **/
Validate.prototype.Clear = function() {
	this.errores = [];
};

/** Funcion que nos indica si hay algun error para este objeto a validar **/
Validate.prototype.hasAnError = function() {
	for(var item in this.errores){
		if(this.errores[item][1].key === 3){
			return true;
		}
	}

	return false;
};

/** Funcion que verifica que la longitud de input text no pase la longitud maxima **/
Validate.prototype.maxLength = function(maxLength) {
	if(parseInt(this.element.value.length) > parseInt(maxLength)){
		this.errores.push(["Longitud maxima del campo: " + maxLength,new TypeMSG(3,"error")]);
	}
};

/** Funcion que verifica la longitud minima de input text  **/
Validate.prototype.minLength = function(minLength) {
	if(parseInt(this.element.value.length) < parseInt(minLength)){
		this.errores.push(["Longitud minima del campo: " + minLength,new TypeMSG(3,"error")]);
	}
};

/** Funcion que verifica que la longitud minima y maxima de un input tipo text este dentro de los rangos **/
Validate.prototype.minMaxLength = function(minLength, maxLength) {
	this.minLength(minLength);
	this.maxLength(maxLength);
};

/** Funcion que nos permite validar un input para que sea un email valido de acuerdo al patron que le pasemos
*	o usamos el patron que viene por default en la clase
 **/
Validate.prototype.validateEmail = function(pattern) {
	var patternTemp = pattern || /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	var emailText = this.element.value;

	if(patternTemp.test(emailText))
		this.errores.push(["Correo valido",new TypeMSG(1,"correct")]);
	else
		this.errores.push(["Parece ser que el email no es valido",new TypeMSG(3,"error")]);
};

/** Funcion que remueve y agrega una clase al elemento del mensaje de error **/
Validate.prototype.addOrRemoveClass = function(element, removeCSS, addCSS) {
	element.classList.remove(removeCSS);
	element.classList.add(addCSS);
};

/** Funcion que nos dice que tipo de mensaje se muestra 
*	arr = representa el arreglo de errores
**/
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

/** Funcion que imprime los mensajes de error en el elmento deseado 
*	elementMSG = representa el elemento en el cual se va a mostrar los mensajes
**/
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