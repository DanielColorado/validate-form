/* Objeto para crear una cookie, si no se introduce ningun valor 
*  el nombre de la cookie sera default, el valor sera none value
*  y la fecha de expiracion sera dentro de una hora
 */
function Cookie (name, value, expires) {
	this.name = name || "default";
	this.value = value || "none value";
	this.value = escape(this.value);
	this.expires = expires || this.expiresHours(1);
	this.expires = this.expires.toUTCString();
}

/** Nos permite crear la cookie de acuerdo a los datos que vienen en el objeto */
Cookie.prototype.Create = function() {
	document.cookie = this.name + "=" + this.value + ";expires=" + this.expires + ";" ;
};

/** Nos trae el valor de la cookie, el valor se obtiene del objeto actual */
Cookie.prototype.Read = function() {
	var cookies = document.cookie;
	var arrCookie = cookies.split("; ");
	for( var cookieTemp in arrCookie ){
		var temp = arrCookie[cookieTemp].split("=");
		if (temp[0] === this.name) {
			return unescape(temp[1]);
		}
	}	
	return undefined;
};

/** Actualiza el valor de la cookie, los demas datos se mantiene */
Cookie.prototype.Update = function(newValue) {
	this.value = escape(newValue);
	this.Create();
};

/** Elimina la cookie de acuerdo al nombre del objeto actual */
Cookie.prototype.Delete = function() {
	var oldDate = new Date(0);
	this.expires = oldDate.toUTCString();
	document.cookie = this.name + "=" + this.value + ";expires=" + this.expires + ";" ;
	this.expires = this.expiresHours(1).toUTCString();
}

/** Funcion que nos ayuda a eliminar cualquier cookie pasando como parametro el nombre de la cookie */
Cookie.prototype.DeleteCookie = function(name) {
	var cookieTemp = new Cookie(name);
	cookieTemp.Delete();
};

/** Funcion que nos regresa el valor de una cookie pasando como argumento el nombre de la cookie */
Cookie.prototype.ReadCookie = function(name) {
	var cookieTemp = new Cookie(name);
	return cookieTemp.Read();
};

/** Funcion que nos permite expirar la fecha en horas */
Cookie.prototype.expiresHours = function(hours) {
	var now = new Date();
	now.setHours( now.getHours() + hours);
	return now;
};

/** Funcion que nos permite expirar la fecha en minutos */
Cookie.prototype.expiresMinutes = function(minutes) {
	var now = new Date();
	now.setMinutes( now.getMinutes() + minutes);
	return now;
};

/** Funcion que nos permite expirar la fecha en segundos */
Cookie.prototype.expiresSeconds = function(seconds) {
	var now = new Date();
	now.setSeconds( now.getSeconds() + seconds);
	return now;
};

/** Funcion que nos permite expirar la fecha en meses */
Cookie.prototype.expiresMonths = function(months) {
	var now = new Date();
	now.setMonth( now.getMonth() + months);
	return now;
};