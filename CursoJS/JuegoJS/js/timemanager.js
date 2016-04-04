function ResetTime(){
    clearInterval(cronometer);
}

function StartTime(){

    Inverse_secs = 0;
    Inverse_mins = 0;
    s = document.getElementById("seconds");
    m = document.getElementById("minutes");

    cronometer = setInterval(
        function(){
        	Inverse_secs++;
        	secs=Inverse_secs;

            /*
        	if (Level_Inversed()){
	        	if (Level == 4) TimeMaximum = 150;
	        	if (Level == 5) TimeMaximum = 180;
	        	if (Level == 6) TimeMaximum = 210;
	        	if (Level == 8) TimeMaximum = 240;
	        	if (Level == 10) TimeMaximum = 270;
				secs = TimeMaximum - Inverse_secs;
				if (secs == 0) ShowGameOver("Game Over", "Try Again!", true);
			}
            */
            
        	mins=0;
        	while (secs >= 60){ //mins = (secs / 60); secs = secs - (mins * 60);
        		mins++;
        		secs -= 60;
        	}

	        if (mins<10) m.innerHTML ="0"+mins;
            else m.innerHTML = mins;
			if (secs<10) s.innerHTML ="0"+secs;
            else s.innerHTML = secs;
            Total_secs = secs;
            Total_mins = mins;
        }
        ,1000);
}