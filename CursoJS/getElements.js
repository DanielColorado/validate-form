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

/** Inputs que contengan la clase txt-uppercase **/
var data = $$(".txt-uppercase");
/** funcion que nos permite cambiar el texto del campo cuando detecta que una tecla dejo de ser presionada **/
document.onkeyup = function () {
	data.forEach(function (element) {
		element.value = element.value.toUpperCase();
	});
}

/** Nombre de los inputs **/
var nombre = hashTag("nombre");
var apellido = hashTag("apellido_paterno");
var apellidoM = hashTag("apellido_materno");
var Email = hashTag("correo");
var genere = byName("rb_genere");
var hobbies = byName("cbhobies");

/** Boton de enviar el formulario **/
var botonEnvia = hashTag("envia");
/** Formulario **/
var formulario = hashTag("fm_nuevo");

/** Arreglo donde se guarda los elementos a validar **/
var arreglo_inputs = [];

/** Campos a validar **/
var ValidateInput = new Validate(nombre, nombre.nextElementSibling,[["required"],["minLength",2]],["blur"]);
var ValidateInputAp = new Validate(apellido, apellido.nextElementSibling,[["required"],["minLength",5]],["focus","keyup"]);
var ValidateInputAm = new Validate(apellidoM, apellidoM.nextElementSibling,[["required"],["minMaxLength",3,10]],["keyup"]);
var ValidateInputG = new Validate(genere, genere[genere.length-1].nextElementSibling.nextElementSibling,[["checked"]],["clickRB"]);
var ValidateInputH = new Validate(hobbies, hobbies[hobbies.length-1].nextElementSibling.nextElementSibling,[["checked"]],["clickRB"]);
var ValidateInputEmail = new Validate(Email, Email.nextElementSibling,[["required"],["email"]],["blur"]);

/** Ingresamos todos los campos a validar en el arreglo **/
arreglo_inputs.push(ValidateInput);
arreglo_inputs.push(ValidateInputAp);
arreglo_inputs.push(ValidateInputAm);
arreglo_inputs.push(ValidateInputG);
arreglo_inputs.push(ValidateInputH);
arreglo_inputs.push(ValidateInputEmail);

/** Cuando damos click en el boton de enviar validamos todos los campos si uno tiene error no mandamos el formulario **/
botonEnvia.onclick = function (event) {
	event.preventDefault();
	var returnBool = true;
	for(var item in arreglo_inputs){
		arreglo_inputs[item].validateAll();
		if(arreglo_inputs[item].hasAnError()){
			returnBool = false;
		}
	}
	clean();
	if(returnBool)formulario.submit();
	return returnBool;
}

/** Funcion para limpiar los arreglos de errores **/
function clean () {
	for(var item in arreglo_inputs){
		arreglo_inputs[item].Clear();
	}
}