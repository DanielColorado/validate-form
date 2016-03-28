var $ = function (selector) {
	return document.querySelector(selector);
}

var $$ = function (selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector));
}

var hashTag = function (id) {
	return document.getElementById(id);
}

var dot = function (className) {
	return document.getElementsByClassName(className);
}

var byName = function (name) {
	return Array.prototype.slice.call(document.getElementsByName(name));
}

var data = $$(".txt-uppercase");

console.log(data);

document.onkeyup = function () {
	data.forEach(function (element) {
		element.value = element.value.toUpperCase();
	});
}

var nombre = hashTag("nombre");
var ValidateInput = new Validate(nombre, nombre.nextElementSibling,[["required"],["minLength"]]);
//nombre.onblur = function () {
//
//	ValidateInput.evalLength();
//	ValidateInput.maxLength(10);
//	ValidateInput.minLength(3);
//	var msgs = nombre.nextElementSibling;
//	ValidateInput.printMSG(msgs);
//	ValidateInput.Clear();
//};

var apellido = hashTag("apellido_paterno");
var ValidateInputAp = new Validate(apellido, apellido.nextElementSibling,[["required"],["minLength",5]]);
//apellido.onblur = function () {
//
//	ValidateInputAp.evalLength();
//	ValidateInputAp.maxLength(10);
//	var msgs = apellido.nextElementSibling;
//	ValidateInputAp.printMSG(msgs);
//	ValidateInputAp.Clear();
//};

var apellidoM = hashTag("apellido_materno");
var ValidateInputAm = new Validate(apellidoM, apellidoM.nextElementSibling,[["required"],["minMaxLength",3,10]]);
//apellidoM.onblur = function () {
//
//	ValidateInputAm.evalLength();
//	ValidateInputAm.maxLength(10);
//	var msgs = apellidoM.nextElementSibling;
//	ValidateInputAm.printMSG(msgs);
//	ValidateInputAm.Clear();
//};

var genere = byName("rb_genere");
var ValidateInputG = new Validate(genere, genere[genere.length-1].nextElementSibling,[["checked"]]);