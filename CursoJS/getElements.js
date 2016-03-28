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
	return Array.prototype.slice.call(document.getElementsByClassName(className));
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
var ValidateInput = new Validate(nombre, nombre.nextElementSibling,[["required"],["minLength"]],["blur"]);


var apellido = hashTag("apellido_paterno");
var ValidateInputAp = new Validate(apellido, apellido.nextElementSibling,[["required"],["minLength",5]],["focus","keyup"]);


var apellidoM = hashTag("apellido_materno");
var ValidateInputAm = new Validate(apellidoM, apellidoM.nextElementSibling,[["required"],["minMaxLength",3,10]],["keyup"]);


var genere = byName("rb_genere");
var ValidateInputG = new Validate(genere, genere[genere.length-1].nextElementSibling.nextElementSibling,[["checked"]],["clickRB"]);

var hobbies = byName("cbhobies");
var ValidateInputH = new Validate(hobbies, hobbies[hobbies.length-1].nextElementSibling.nextElementSibling,[["checked"]],["clickRB"]);

var botonEnvia = hashTag("envia");
var formulario = hashTag("fm_nuevo");
botonEnvia.onclick = function (event) {
	event.preventDefault();
	console.log(this);
	ValidateInput.validateAll(false);
	ValidateInputAp.validateAll(false);
	ValidateInputAm.validateAll(false);
	ValidateInputG.validateAll(false);
	ValidateInputH.validateAll(false);

	var arrPass = [ValidateInput.hasAnError(),ValidateInputAp.hasAnError(),ValidateInputAm.hasAnError(),ValidateInputG.hasAnError(),ValidateInputH.hasAnError()];

	for(var item in arrPass){
		if(arrPass[item] === true){
			clean();
			return false;
		}
	}
	clean();
	formulario.submit();
	return true;
}

/** Funcion para limpiar los arreglos de errores **/
function clean () {
	ValidateInput.Clear();
	ValidateInputAp.Clear();
	ValidateInputAm.Clear();
	ValidateInputG.Clear();
	ValidateInputH.Clear();
}