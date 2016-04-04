var pHoras = document.getElementById('horas'),
	pAMPM = document.getElementById('ampm'),
	pMinutos = document.getElementById('minutos'),
	pSegundos = document.getElementById('segundos'),
	pDiaSemana = document.getElementById('diaSemana'),
	pDia = document.getElementById('dia'),
	pMes = document.getElementById('mes'),
	pYear = document.getElementById('year');
function Watch () {
	self = this;
	this.ampm = "";
	this.format = null;
	this.currentDate = null;
	this.DAYSWEEK= ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
	this.MONTHS= ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	this.init= function() {
		self.currentDate = new Date();
		var dateText = self.getBreakdownDate();
		pHoras.textContent = dateText.time[0];
		pMinutos.textContent = dateText.time[1];
		pSegundos.textContent = dateText.time[2];
		pDiaSemana.textContent = dateText.date[0];
		pDia.textContent = dateText.date[1]
		pMes.textContent = dateText.date[2];
		pYear.textContent = dateText.date[3];
		pAMPM.textContent = self.ampm;
		};
	this.addZero= function(number) {
		return (number < 10) ? "0" + number : number;
	};
	this.getBreakdownDate= function() {
		var tempHour = self.currentDate.getHours();
		if(self.format != null){
			if (tempHour >= 12) {
				tempHour = tempHour - 12;
				self.ampm = 'PM';
			} else {
				self.ampm = 'AM';
			}
		}
		return {
			date:[
				self.DAYSWEEK[self.currentDate.getDay()],
				self.currentDate.getDate(),
				self.MONTHS[self.currentDate.getMonth()],
				self.currentDate.getFullYear()
			],
			time:[
				self.addZero(tempHour),
				self.addZero(self.currentDate.getMinutes()),
				self.addZero(self.currentDate.getSeconds())
			]
		};
	};
}
var mi_reloj = new Watch();
mi_reloj.format = "12";
setInterval(mi_reloj.init,1000);