
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 55;
var score = 0;

var bricksColor;
var paddleColor;
var ballColor;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (r = 0; r < brickRowCount; r++) {
		bricks[c][r] = {x: 0, y: 0, status: 1};
	}
}

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth/2; 
	}
}

function drowScore() {
	ctx.font = "30px Arical";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score:" + score, 8, 20);
}

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	} else if (e.keyCode == 37 ){
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39){
		rightPressed = false;
	} else if (e.keyCode ==37){
		leftPressed = false;
	}
}

function gameOver () {
	ctx.font = '60px Times New Roman';
	ctx.fillStyle='#f24343';
	ctx.strokeStyle='#d63939';
	ctx.fillText( 'GAME OVER', canvas.width/4, canvas.height/2);
	ctx.strokeText( 'GAME OVER', canvas.width/4, canvas.height/2);
}

function youWin () {
	ctx.font = '60px Times New Roman';
	ctx.fillStyle='#f2db10';
	ctx.strokeStyle='#d63939';
	ctx.fillText( 'YOU WIN !!!', canvas.width/4, canvas.height/2);
	ctx.strokeText( 'YOU WIN !!!', canvas.width/4, canvas.height/2);

}

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++){
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}
 
function collision() {
	for (c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score ++;
				}
			}
		}
	
	}
} 


function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drowPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD"; 
	ctx.fill();
	ctx.closePath();
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drowPaddle();
	collision();
	drowScore();

	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
		dx = -dx;
	}
	if(y + dy < ballRadius){
		dy = -dy;
	} 
	else if (y + dy > canvas.height-ballRadius ) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else { 
		gameOver();
		function delay(){
			document.location.reload();
		}
		setTimeout(delay, 3000);
		}
	}

	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7; 
	} 
	else if(leftPressed && paddleX > 0){
		paddleX -= 7;
	}

	if(score == brickRowCount*brickColumnCount) {
		youWin();
		function delay(){
			document.location.reload();
		}
		setTimeout(delay, 3000);
		}
	

	x += dx;
	y += dy;
}
setInterval (draw, 10);