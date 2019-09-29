var myGamePiece;
var myObstacles = [];
var myScore;
var my_interval = 20;

function startGame() {
	myGamePiece = new component(30, 30, "red", 10, 120, "ball");
	document.addEventListener("mousedown", (event) => 
		{
			myGamePiece.x = event.clientX;
			myGamePiece.y = event.clientY;
		}
	);
	document.addEventListener("mousemove", (event) =>
		{
			myGamePiece.x = event.clientX;
			myGamePiece.y = event.clientY;
		}
	);
	myScore = new component("30px", "Consolas", "black", 280, 40, "text");
	myGameArea.start();
}

var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, my_interval);
		},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function component(width, height, color, x, y, type) {
	this.type = type;
	this.score = 0;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;    
	this.x = x;
	this.y = y;
	this.update = () => {
		ctx = myGameArea.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		}
		else if (this.type == "ball") {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.height, 0, 2*Math.PI, false);
			ctx.fill();
		}
		else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}
}

function updateGameArea() {
	var x, height, gap, minHeight, maxHeight, minGap, maxGap;
	for (i = 0; i < myObstacles.length; i += 1) {
		if (myGamePiece.crashWith(myObstacles[i])) {
			window.location.replace("game_over.html?score=" + myScore.text);
		} 
	}
	myGameArea.clear();
	myGameArea.frameNo += 1;
	if (myGameArea.frameNo == 1 || everyinterval(30)) {
		x = myGameArea.canvas.width;
		minHeight = 20;
		maxHeight = 200;
		height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		minGap = 60;
		maxGap = 200;
		gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		myObstacles.push(new component(10, height, "green", x, 0));
		myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
	}
	for (i = 0; i < myObstacles.length; i += 1) {
		myObstacles[i].x += -10;
		myObstacles[i].update();
	}
	myScore.text="SCORE: " + myGameArea.frameNo;
	myScore.update();
	myGamePiece.update();
}

function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
	return false;
}

function start_click() {
	let val = document.getElementById("myRange").value;
	my_interval = parseInt(val);
	let input = document.getElementById('myRange');
	let header = document.getElementById('choose_speed');
	let label1 = document.getElementById('label1');
	let label2 = document.getElementById('label2');
	let button = document.getElementById('start_button');
	input.style.display = 'none';
	header.style.display = 'none';
	label1.style.display = 'none';
	label2.style.display = 'none';
	button.style.display = 'none';
	startGame();
}
