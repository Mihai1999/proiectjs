

var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");
gameCanvas.style.border = "thick solid black";

let snake = [  {x: 150, y: 150},  {x: 140, y: 150},  {x: 130, y: 150},  {x: 120, y: 150},  {x: 110, y: 150},];
let score = 0
let schimbaDirectia = false;
let mancareX;
let mancareY;
let dx = 0;
let dy = -10;
let mancat = false;


function drawSnakePart(snakePart) {
ctx.fillStyle = skin;  
ctx.strokestyle = 'darkgreen';
ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {  
snake.forEach(drawSnakePart);
}


function advanceSnake(){
	const head = {x: snake[0].x +dx, y: snake[0].y +dy};
	snake.unshift(head);
	snake.pop();
	
	if ( head.x === mancareX && head.y === mancareY) {
			score += 1;
			snake.push({x: snake[snake.length-1].x + dx , y: snake[snake.length-1].y + dy });
			createFood();
			
			scor.innerHTML = "SCORE: " + score;
			
		
	}
	
}

function clearCanvas() { 
ctx.fillStyle = "#ccff66";
ctx.strokeStyle = "black";
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function deplasare( difficulty){
if(gameover() === true) {
	alert("GAME OVER");
	
	return; 	
}
setTimeout(function onTick() { 


schimbaDirectia = false;
clearCanvas(); 
drawFood();  
advanceSnake();  
drawSnake();

deplasare(difficulty);}, difficulty);



}

function changeDirection(event){
	const LEFT_KEY = 37;  
	const RIGHT_KEY = 39;  
	const UP_KEY = 38;  
	const DOWN_KEY = 40;
	const keyPressed = event.keyCode;  
	
	if (schimbaDirectia) return;
	schimbaDirectia = true;
	
	if (keyPressed ===  LEFT_KEY && dx != 10){
		dx = -10;
		dy = 0;
	}
	
	if (keyPressed === RIGHT_KEY && dx != -10){
		dx = 10;
		dy = 0;
	}
	
	if (keyPressed === UP_KEY && dy != 10){
		dx = 0;
		dy = - 10;
	}
	
	if(keyPressed === DOWN_KEY && dy != -10){
		dx = 0;
		dy = 10;
	}
	
}

function drawFood(){
	
	ctx.fillStyle = 'red';  
	ctx.strokestyle = 'darkred';
	ctx.fillRect(mancareX, mancareY, 10, 10);
	ctx.strokeRect(mancareX, mancareY, 10, 10);
	
}

function createFood(){
	
	mancareX = Math.floor(Math.random() * 30) * 10 ;
	mancareY = Math.floor(Math.random() * 30) * 10;
	var validFood = true;
	snake.forEach(function foodOnSnake(part){
		if ( part.x === mancareX && part.y === mancareY){
			validFood = false;
		}
		
		if ( validFood === false) createFood();
		
	});
	
	
}

function gameover(){
	var sfarsit = false;
	if ( snake[0].x > 300 || snake[0].x < 0 || snake[0].y > 300 || snake[0].y < 0)
		sfarsit = true;
	var i = 1;
	while(i < snake.length){
		if( snake[0].x === snake[i].x && snake[0].y === snake[i].y)
			sfarsit = true;
		i++;
	}
	
	return sfarsit;
}

var formular = document.getElementById("form-area");
formular.style.width =  "33%" ;
formular.style.backgroundColor = "white";

var gameArea = document.getElementById("game-area");
scor = document.createElement("p");
scor.innerHTML = "SCORE: " + score;
gameArea.appendChild(scor);

var nume;
var email;
var skin;
var viteza = [ 200, 150, 100];
var parola;

var jucator = {};

function startGame(){
	
nume = document.getElementById("game-name").value;
email = document.getElementById("game-email").value;
skin = document.getElementById("skin").value;
parola = document.getElementById("game-pass").value;
var dificultate = document.getElementById("dificultate").selectedIndex;
var difficulty = viteza[dificultate];

jucator = { nume: nume, email: email, color: skin, passw: parola, diff: difficulty };

const regexemail = new RegExp('.+@.+\..+');
const regexpass = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])');
const r1 = new RegExp('(?=.*[a-z])');
const r2 = new RegExp('(?=.*[A-Z])');
const r3 = new RegExp('(?=.*[0-9])');
const r4 = new RegExp('([a-zA-Z0-9]{8, 16})');
const regexname = new RegExp('[a-zA-Z0-9]{6,12}');
console.log("email " +regexemail.test(email));
console.log( "parola "+ parola  +regexpass.test(parola));
console.log("r1" + r1.test(parola));
console.log("r2" + r2.test(parola));
console.log("r3" + r3.test(parola));
console.log("r4" + r4.test(parola));
console.log("name " + regexname.test(nume));

if( regexemail.test(email) && regexpass.test(parola) && regexname.test(nume)){
	createFood();
	deplasare(difficulty);
	document.addEventListener("keydown", changeDirection);
}
else {
	var eroare = document.createElement("div");
	eroare.innerHTML = "Date completate gresit";
	eroare.style.color = 'red';
	document.body.appendChild(eroare);
}

}



