

const UP_LEFT= -3 * Math.PI / 4;
const UP_RIGHT= - Math.PI / 4;
const DOWN_LEFT=  3 * Math.PI / 4;
const DOWN_RIGHT=  Math.PI / 4;

let paddle=null;
let ball=null;
let interval=null;

$("#game").mousemove( function(event) {
	if (!interval) {
    return;
  }
	user_paddle_position= Math.min(event.pageY - $("#game").offset().top, 
									$("#game").height() - $("#user-paddle").height());
	$("#user-paddle").css({
		top: `${user_paddle_position}px` 
	});

});



function update() {
	update_paddle();
	update_ball();
}

$("#start-btn").click(function (){
	$("#start-screen").css("display","none");
	$("#restart-btn").css("display","block");
	start_game();
})



function update_ball() {
		ball.top+= ball.speed  * Math.sin(ball.direction);
		ball.left+= ball.speed * Math.cos(ball.direction);
		$("#ball").css({
			top: `${ball.top}`,
			left: `${ball.left}`
		});
		is_ball_crashed_top();
		is_ball_crashed_bottom();
		is_ball_crashed_user_paddle();
		is_ball_crashed_paddle();
		game_over();
		
}

function game_over(){
	var player= winner();
	if(player){
		$("#game-over-screen").css("display","block");
		$("#winner").text(player+" player has won the game!")
		clearInterval(interval);
		interval=null;
		
	}
	
}

function is_ball_crashed_top(){
	if(ball.top <= 0){
		if(ball.direction===UP_LEFT){
		ball.direction=DOWN_LEFT;}
	else {
	ball.direction=DOWN_RIGHT;}
	}
	
}

function is_ball_crashed_bottom(){
	var game_height = $("#game").height();
	var ball_height = $("#ball").height();
	if(ball.top >= game_height - ball_height){
		if(ball.direction===DOWN_RIGHT)
			ball.direction=UP_RIGHT;
		else 
			ball.direction=UP_LEFT;
	}
	
}

function is_ball_crashed_user_paddle(){
	
	var user_paddle_width = $("#user-paddle").width();
	var user_paddle_height = $("#user-paddle").height();
	var user_paddle_top = $("#user-paddle").offset().top;
	
	if(ball.left <= user_paddle_width && ball.top>= user_paddle_top - $("#game").offset().top && ball.top<= user_paddle_top + user_paddle_height-  $("#game").offset().top){
		if(ball.direction===UP_LEFT){
		ball.direction=UP_RIGHT;}
		else {
		ball.direction=DOWN_RIGHT;}
	}
	
}

function is_ball_crashed_paddle(){
	var paddle_width = $("#paddle").width();
	var paddle_height = $("#paddle").height();
	var paddle_top = $("#paddle").offset().top;
	if(ball.left >= $("#game").width() - paddle_width - $("#ball").width() && ball.top>= paddle_top - $("#game").offset().top && ball.top<= paddle_top + paddle_height-  $("#game").offset().top){
		if(ball.direction===UP_RIGHT){
		ball.direction=DOWN_RIGHT;}
		else {
		ball.direction=DOWN_LEFT;}
	}
	
}

$("#restart-btn").click(function(){
	$("#game-over-screen").css("display","none");
	$("#restart-btn").css("display","none");
	init();
	clearInterval(interval);
	$("#start-screen").css("display","block");
	
});

function start_game(){
	init();
	interval = setInterval(update, 50);
}

function init(){
	paddle= {
	speed: 20,
	direction:1,
	top: 0
	}
	
	ball ={
	speed:20,
	direction: DOWN_LEFT,
	top:200,
	left: 300
	
	}
	$("#ball").css({
			top: `${ball.top}`,
			left: `${ball.left}`
		});
	$("#paddle").css({
		top: "0px"
	});
	$("#user-paddle").css({
		top: "0px"
	});
	
}

function winner(){
	
if(ball.left<0 )
		
		return 'Green';
	else if(ball.left> $("#game").width()- $("#ball").width())
		return 'Red';
	else 
		return false;
	
	
}
function update_paddle(){
	paddle.top += paddle.speed * paddle.direction;
	
	var paddle_top=  paddle.top ;
	
	$("#paddle").css({
		top: `${paddle_top}px` 
	});
	
	if(paddle.top >= $("#game").height() - $("#paddle").height()){
		paddle.direction =-1;
	}
	if(paddle.top <=0 ){
		paddle.direction =1;
	}
}