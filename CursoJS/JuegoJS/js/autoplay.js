var CellSelected_x;
var CellSelected_y;
var CheckCell_Required;

var Lifes = 1; //1;
var Level = 1;//1;
var Next_Level = false;
var Level_Moves;

var Bonus;
var Moves;
var Options;

var Total_secs;
var Total_mins;
var cronometer;

var board = new Array(8);

// 0 esta libre
// 1 casilla marcada
// 2 es un bonus
// 9 es una opcion del movimiento actual



function Check_SuccessfulEnd(){

	SuccessfulEnd = true;
	if (Moves > 0) SuccessfulEnd = false;
	if (SuccessfulEnd) ShowGameOver("You win!!", "Next Level", false);

}

function Check_GameOver(x, y){

	Options = 0;

	Check_Move(x, y, 1, 2);		//check move right - top long
	Check_Move(x, y, 2, 1);		//check move right long - top
	Check_Move(x, y, 1, -2);	//check move right - bottom long
	Check_Move(x, y, 2, -1);	//check move right long - bottom
	Check_Move(x, y, -1, 2);	//check move left - top long
	Check_Move(x, y, -2, 1);	//check move left long - top
	Check_Move(x, y, -1, -2);	//check move left - bottom long
	Check_Move(x, y, -2, -1);	//check move left long - bottom
	//alert("revisadas todas las opciones de movimiento")
	cont_moves = document.getElementById("options").innerHTML = Options;

	if (!Options){

		if (Bonus) CheckCell_Required = false;
		else ShowGameOver("Game Over", "Try Again!", true);
		
	}

}

function Grow_Meter_Bonus(){
	moves_done = Level_Moves - Moves;
	bonus_done = Math.floor((moves_done / Moves_Required));
	moves_rest = Moves_Required * (bonus_done);
	bonus_grow = moves_done - moves_rest;
	
	width_meter = bonus_grow * 168 / Moves_Required;
	
	meter_bonus = document.getElementById("meter_bonus");
	meter_bonus.style.width = width_meter + "px";
}

function SelectCell(x, y){

	Moves--;
	cont_moves = document.getElementById("moves").innerHTML = Moves;
	
	Grow_Meter_Bonus();
	
	
	PaintCell(CellSelected_x, CellSelected_y, "orange");
	PaintHorseCell(x, y, "green");

	if (board[x][y] == 2){
		Bonus++;
		score_bonus = document.getElementById("bonus").innerHTML = "+" + Bonus;
	}
	

	board[x][y]=1;
	CellSelected_x=x;
	CellSelected_y=y;
	ClearOption(x, y)

	ClearOptions();

	CheckCell_Required = true;
	Check_SuccessfulEnd();
	Check_GameOver(x, y);
	Check_new_Bonus();

}



function Check_new_Bonus(){

	if ((Level_Moves-Moves) % Moves_Required == 0){
		
		Bonus_Cell = false;
		while (Bonus_Cell == false){
			Bonus_Cell_x=Math.round(Math.random()*7);
			Bonus_Cell_y=Math.round(Math.random()*7);
			if (board[Bonus_Cell_x][Bonus_Cell_y] == 0) 
				Bonus_Cell = true;
		}
		board[Bonus_Cell_x][Bonus_Cell_y] = 2;
		PaintBonusCell(Bonus_Cell_x, Bonus_Cell_y);
	
	}
	
}

function CheckCell(x, y){
	CheckTrue = true;
	if (CheckCell_Required){
		dif_x = x - CellSelected_x;
		dif_y = y - CellSelected_y;
		CheckTrue = false;

		if (dif_x == 1 && dif_y == 2)   CheckTrue = true; // right - top long
		if (dif_x == 1 && dif_y == -2)  CheckTrue = true; // right - bottom long
		if (dif_x == 2 && dif_y == 1)   CheckTrue = true; // right long - top
		if (dif_x == 2 && dif_y == -1)  CheckTrue = true; // rightlong - bottom
		if (dif_x == -1 && dif_y == 2)  CheckTrue = true; // left - top long
		if (dif_x == -1 && dif_y == -2) CheckTrue = true; // left - bottom long
		if (dif_x == -2 && dif_y == 1)  CheckTrue = true; // left long - top
		if (dif_x == -2 && dif_y == -1) CheckTrue = true; // left long - bottom

	}
	else{
		if (board[x][y] == 0 || board[x][y] == 2){
			Bonus--;
			score_bonus = document.getElementById("bonus").innerHTML = "+" + Bonus;
			if (Bonus == 0) score_bonus = document.getElementById("bonus").innerHTML = "";
		}
	}

	if (board[x][y]==1) CheckTrue=false;

	if (CheckTrue) SelectCell(x, y);
}

function Check_Move(x, y, mov_x, mov_y){
		option_x = x+mov_x;
		option_y = y+mov_y;
		console.log("revisando opcion"+option_x+""+option_y)
		if (option_x < 8 && option_y < 8 && 
			option_x >= 0 && option_y >= 0){
			console.log("opcion dentro del tablero. Estado:"+board[option_x][option_y]);
			if (board[option_x][option_y] == 0 ||
				board[option_x][option_y] == 2){

				console.log("opcion posible de jugar");
				Options++;
				
				cell = document.getElementById("o"+option_x+option_y);
				cell.innerHTML = "<div class='option_user' onclick='CheckCell(" + option_x + "," + option_y + ")'></div>";
				if (board[option_x][option_y] == 0) board[option_x][option_y] = 9;
				console.log("marcada " +option_x+""+option_y);
			}
		}
}
function ClearOptions(){
	for ( i = 0; i < 8; i++){
		for (j = 0; j < 8; j++){
			if (board[i][j] == 9 || board[i][j] == 2){
				if (board[i][j] == 9) board[i][j] = 0;
				ClearOption(i, j);
			}
		}
	}
}



function autoplay(){
	set_Level_Parameters();

	for (i=0; i<10; i++) board[i]= new Array(8);
	ClearBoard();
	setBoard();
	ResetTime();
	//StartTime();	
	
	resetgame = setTimeout("StartTime()", 2000);

	First_Position = false;
	while (First_Position == false){
		x=Math.round(Math.random()*7);
		y=Math.round(Math.random()*7);
		if (board[x][y] == 0) 
			First_Position = true;
	}

	CellSelected_x=x;
	CellSelected_y=y;

	SelectCell(x, y);



}
autoplay();