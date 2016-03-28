function Jugador (nombre) {
	this.nombre = nombre;
	this.pv = 100;
	this.sp = 100;

	this.curar = function (jugadorObjetivo) {
		if (this.sp > 40) {
			if (jugadorObjetivo.pv < 100) {
				this.sp -= 40;
				jugadorObjetivo.pv += 20;
			}else{
				console.log(jugadorObjetivo.nombre + " tiene lleno su pv");
			}
		}else{
			console.info(this.nombre + " no tiene sp");
		}
		this.estado(jugadorObjetivo);
	}

	this.atacar = function (jugadorObjetivo) {
		if (jugadorObjetivo.pv > 40) {
			jugadorObjetivo.pv -= 40;
		} else{
			jugadorObjetivo.pv = 0;
			console.error(jugadorObjetivo.nombre + " murio!!!");
		}
		this.estado(jugadorObjetivo);
	}

	
}

Jugador.prototype.estado = function(jugadorObjetivo) {
	console.info(this);
	console.info(jugadorObjetivo);	
};

var gandalf = new Jugador("Gandalf");
var legoland = new Jugador("Legoland");
var aragon = new Jugador("Aragon");

console.log(gandalf);
console.log(legoland);
console.log(aragon);