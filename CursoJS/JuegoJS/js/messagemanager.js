function hide_message(restart){
	
	panel_message = document.getElementById("message");
	panel_message.style.display = "none";

	if (restart) autoplay();
}



function ShowGameOver(string_notification, string_button, game_over){
	ResetTime();
	Next_Level = !game_over;
	if (game_over == false){
		score_min = mins;
		score_sec = secs;
		string_score="";
		if (score_min < 10) string_score = "Level - " + Level  + " Time 0";
		string_score = string_score + score_min + ":";
		if (score_sec < 10) string_score = string_score +"0";
		string_score = string_score + score_sec;
	}
	else{
		string_score = "Score: " + (Level_Moves-Moves) + "/" + Level_Moves;
	}
	//string_tweet="<a id='tweet_game_over' class='popup' href='https://twitter.com/share' class='twitter-share-button' data-via='JoseCodFacilito' data-size='large' data-count='none' data-text='No soy capaz de hacer este juego!! ' target='_blank'>Tweet your try!</a>"
	
	
	Message = document.getElementById("message");
	Message.style.display = "block";
	Message_Notification=document.getElementById("notification").innerHTML=string_notification;
	Message_Data=document.getElementById("data_message").innerHTML=string_score;
	Message_Game=document.getElementById("button").innerHTML= string_button;
	

	Message_Share=document.getElementById("share_panel");
	Message_Share.style.display = "block";

	if (game_over == true){
		
		string_tweet="<a class='popup' target='_blank' href='http://twitter.com/share?text=Level%20" + Level +"%20-%20Score:%20" + (Level_Moves-Moves) + "/" + Level_Moves + "%20No%20puedo%20con%20este%20nivel!!%20&via=JoseCodFacilito'>Tweet you Score!</a>";
		Tweet_Game=document.getElementById("tweet_gameover").innerHTML=string_tweet;
		
		s = document.getElementById("seconds").innerHTML="00";
    	m = document.getElementById("minutes").innerHTML="00";
	}
	else{
		string_time = "";
		if (Total_mins < 10) string_time = "0";
		string_time = string_time + Total_mins + ":";
		if (Total_secs < 10) string_time = string_time + "0";
		string_time = string_time + Total_secs;

		string_tweet="<a class='popup' target='_blank' href='http://twitter.com/share?text=Ya%20me%20he%20pasado%20un%20nuevo%20nivel!!%20Level%20" + Level +"%20-%20Time:%20" + string_time + "%20&via=JoseCodFacilito'>Tweet you Game!</a>";
		Tweet_Game=document.getElementById("tweet_gameover").innerHTML=string_tweet;
	}
	
	WaitRestart();
}

function ShowWelcome(){
	Message = document.getElementById("message");
	Message.style.display = "block";
	Message_Level=document.getElementById("notification").innerHTML="Level: " + Level;
	Message_Lifes=document.getElementById("data_message").innerHTML="Lifes: " + Lifes;
	
	Message_Share=document.getElementById("share_panel");
	Message_Share.style.display = "none";

	s = document.getElementById("seconds").innerHTML = "00";
    m = document.getElementById("minutes").innerHTML = "00";	

}