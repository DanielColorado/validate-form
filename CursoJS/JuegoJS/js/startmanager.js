function Level_Inversed(){
/*
	if (Level == 4) return true;
	if (Level == 5) return true;
	if (Level == 6) return true;
	if (Level == 8) return true;
	if (Level == 10) return true;
*/
	return false;
}

function set_Moves_Required(){

	if (Level == 1) Moves_Required = 8;
	if (Level == 2) Moves_Required = 10;
	if (Level == 3) Moves_Required = 12;
	if (Level == 4) Moves_Required = 10;
	if (Level == 5) Moves_Required = 10;
	if (Level == 6) Moves_Required = 12;
	if (Level == 7) Moves_Required = 5;
	if (Level == 8) Moves_Required = 7;
	if (Level == 9) Moves_Required = 9;
	if (Level == 10) Moves_Required = 8;
	if (Level == 11) Moves_Required = 100;

	return Moves_Required
}

function set_Lifes(){

	if (Level == 1) Lifes = 1;
	if (Level == 2) Lifes = 4;
	if (Level == 3) Lifes = 3;
	if (Level == 4) Lifes = 3;
	if (Level == 5) Lifes = 4;
	if (Level == 6) Lifes = 3;
	if (Level == 7) Lifes = 5;
	if (Level == 8) Lifes = 3;
	if (Level == 9) Lifes = 4;
	if (Level == 10) Lifes = 5;
	if (Level == 11) Lifes = 5;
}
function set_Level_Moves(){

	if (Level == 1) Level_Moves = 64;
	if (Level == 2) Level_Moves = 56;
	if (Level == 3) Level_Moves = 32;
	if (Level == 4) Level_Moves = 16;
	if (Level == 5) Level_Moves = 48;
	if (Level == 6) Level_Moves = 36;
	if (Level == 7) Level_Moves = 48;
	if (Level == 8) Level_Moves = 49;
	if (Level == 9) Level_Moves = 58;
	if (Level == 10) Level_Moves = 48;
	if (Level == 11) Level_Moves = 64;
}

function set_Level_Parameters(){

	if (Next_Level){ 
		Level++; 
		set_Lifes();
		//Lifes = Level;
	}
	else{
		Lifes--;
		if (Lifes < 1) { 
			Level = 1; 
			Lifes = 1; 
		}		
	}
	score_lifes = document.getElementById("lifes").innerHTML = Lifes;
	score_level = document.getElementById("level").innerHTML = Level;

	ShowWelcome();
	hide_welcome = setTimeout ("hide_message(false)",2000);
	
	Bonus = 0;
	score_bonus = document.getElementById("bonus").innerHTML = "";

	set_Level_Moves();
	Moves = Level_Moves;
	Moves_Required = set_Moves_Required();

}