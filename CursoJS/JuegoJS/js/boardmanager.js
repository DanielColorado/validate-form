function ClearBoard(){
	for (i=0; i<8; i++){
		for (j=0; j<8; j++){
			board[i][j]=0;

			cell = document.getElementById("i"+i+j);
			cell.style.background = "";  
			cell = document.getElementById("i"+i+j).innerHTML = "";
		}
	}

}

function ClearOption(i, j){

	cell = document.getElementById("o"+i+j);
	cell.innerHTML = "";
}


function setBoard(){

	if (Level == 2) PaintLevel_2();
	if (Level == 3) PaintLevel_3();
	if (Level == 4) PaintLevel_4();
	if (Level == 5) PaintLevel_5();
	if (Level == 6) PaintLevel_6();
	if (Level == 7) PaintLevel_7();
	if (Level == 8) PaintLevel_8();
	if (Level == 9) PaintLevel_9();
	if (Level == 10) PaintLevel_10();
}

function PaintCell(x, y, color){
	cell = document.getElementById("i"+x+y);
	cell.style.background = "none repeat scroll 0% 0% " + color;
	
}

function PaintHorseCell(x, y, color){
	cell = document.getElementById("i"+x+y);
	cell.style.background = "none repeat scroll 0% 0% " + color;
	cell = document.getElementById("i"+x+y).innerHTML = 
		"<img id='" + x + y + "' src='horse.gif'></img>"
}

function PaintBonusCell(x, y){
	Image_Bonus = document.getElementById("i"+x+y);
	Image_Bonus = document.getElementById("i"+x+y).innerHTML = 
		"<img id='" + x + y + "' src='bonus.gif'></img>"
}

function PaintBoard(color_black, color_white){
	
	for (i=0; i<8; i+=2){
		for (j=0; j<8; j+=2){
			cell = document.getElementById("i"+i+j);
			cell.style.background = color_black;

			cell = document.getElementById("i"+(i+1)+j);
			cell.style.background = color_white;

			cell = document.getElementById("i"+i+(j+1));
			cell.style.background = color_white;

			cell = document.getElementById("i"+(i+1)+(j+1));
			cell.style.background = color_black;
		}
	}
	

}
function Paint_Column(column){
	for (i = 0; i<8; i++){
		board[column][i] = 1;
		PaintHorseCell(column, i, "orange");
	}
}
function Paint_Row(row){
	for (i = 0; i<8; i++){
		board[i][row] = 1;
		PaintHorseCell(i, row, "orange");
	}
}
function Paint_Diagonal(diagonal){
	for (i = 0; i < diagonal+1; i++){
		board[i][diagonal - i] = 1;
		PaintHorseCell(i, diagonal - i, "orange");
	}
}
function Paint_DiagonalInverse(diagonal){
	for (i = 0; diagonal >= 0; diagonal--){
		board[7 - i][diagonal] = 1;
		PaintHorseCell(7 - i++, diagonal, "orange");
	}
}
function PaintLevel_2(){
	Paint_Column(6);
}
function PaintLevel_3(){
	
	for (i = 0; i<8; i++){
		for(j = 4; j<8; j++){
			board[j][i] = 1;
			PaintHorseCell(j, i, "orange");
		}
	}
}
function PaintLevel_4(){
	PaintLevel_3(); PaintLevel_5();
}
function PaintLevel_5(){
	
	for (i = 0; i<4; i++){
		for(j = 0; j<4; j++){
			board[j][i] = 1;
			PaintHorseCell(j, i, "orange");
		}
	}
}
function PaintLevel_6(){
	Paint_Column(0);	Paint_Row(0);
	Paint_Column(7);	Paint_Row(7);
}
function PaintLevel_7(){
	Paint_Column(1);	
	Paint_Column(6);	
}
function PaintLevel_8(){
	Paint_Column(1);	
	Paint_Row(6);	
}
function PaintLevel_9(){
	Paint_Diagonal(4);
}
function PaintLevel_10(){
	Paint_Diagonal(7);
	Paint_DiagonalInverse(7)

}