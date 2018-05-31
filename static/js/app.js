// Initialize Firebase
var config = {
    apiKey: "AIzaSyBki3mFlSayHyQeql5-SEa7gXNg3nvVNsQ",
    authDomain: "murder-438bd.firebaseapp.com",
    databaseURL: "https://murder-438bd.firebaseio.com",
    projectId: "murder-438bd",
    storageBucket: "murder-438bd.appspot.com",
    messagingSenderId: "558094635149"
};

firebase.initializeApp(config);
var database = firebase.database();
var canvas = document.getElementById("Canvas");
var context = canvas.getContext("2d");
var playerID = "";
const shootSpeed = 3;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

class Bullet {
	constructor(x, y, dir, id) {
		this.x = x;
		this.y = y;
		this.direction = dir;
		this.firedFrom = id;
	}

	move() {
		var temp = this;
		this.x += shootSpeed * Math.cos(this.direction);
		this.y += shootSpeed * Math.sin(this.direction);
		database.ref("people/").once("value", function(snapshot) {
			database.ref("bullets/").once("value", function(bullet) {
				for (var n of bullet.val()) {
					if (n.firedFrom == temp.firedFrom) {
						var indexOfBullet = bullet.val().indexOf(n);
					}
				}
				database.ref("bullets/" + bullet.val()[indexOfBullet] + "/x").set(temp.x);
				database.ref("bullets/" + bullet.val()[indexOfBullet] + "/y").set(temp.y);
				for (var i in snapshot.val()) {
					console.log(snapshot.val()[i].x);
					console.log(temp);
					console.log(temp.x);
					if (temp.x > snapshot.val()[i].x && temp.x < snapshot.val()[i].x + 50 && temp.y > snapshot.val()[i].y && temp.y < snapshot.val()[i].y + 50 && snapshot.val()[i] != temp.firedFrom) {
						
						database.ref("bullets/" + bullet.val()[indexOfBullet]).remove();
						window.close();
					} else {

						temp.move();
					}
				}
			});
			
		});
	}
}

class Bystander {
	constructor(playerColor, playerName, initx, inity, startWithWeapon) {
		this.color = playerColor;
		this.name = playerName;
		this.x = initx;
		this.y = inity;
		this.hasWeapon = startWithWeapon;
		this.direction = 90;
	}
	setDirection(newDir) {
		this.direction = newDir;
	}
	
	
	shoot()  {
		if (this.hasWeapon) {
			
		}
	}
}

class Murderer {
	constructor(initColor, initName, initX, initY) {
		this.color = initColor;
		this.name = initName;
		this.x = initX;
		this.y = initY;
		this.direction = 90;
		this.hasKnife = true;
	}
	
	setDirection(newDir) {
		this.direction = newDir;
	}
	
	// move() /*we need different directions for moving and for facing but right now lets focus on one*/{
	// 	if (this.direction === "up") {
	// 		this.y -= 10;
	// 	} else if (this.direction === "left") {
	// 		this.x -= 10;
	// 	} else if (this.direction === "down") {
	// 		this.y += 10;
	// 	} else if (this.direction === "right") {
	// 		this.x += 10;
	// 	}
	// }
	stab() {
		database.ref("people/").once("value", function(snapshot) {

		});
	}
}

var player;
var player = new Bystander("default", "default", 50, 50, false);

var colors = ["green", "blue", "red", "yellow", "brown", "pink", "purple"];
var keys = { 
	length: 0 
}
const playerMovement = 10;
var names = {
	"Alpha": true,
	"Bravo": true,
	"Charlie": true,
	"Delta": true,
	"Echo": true,
	"Foxtrot": true,
	"Golf": true,
	"Hotel": true,
	"India": true,
	"Julliet": true,
	"Kilo": true,
	"Lima": true,
	"Miko": true,
	"Matt": true,
	"November": true,
	"Oscar": true,
	"Papa": true,
	"Quebec": true,
	"Romeo": true,
	"Sierra": true,
	"Tango": true,
	"Uniform": true,
	"Victor": true,
	"Whiskey": true,
	"X-ray": true,
	"Yankee": true,
	"Zulu": true
}

$(document).ready(function() {
	//database.ref("people/0").set(player);
	//database.ref("people/1").set(player2);
	//database.ref("names/").set(names);
	//$("#header").show();
	//$("#theButton").show();
	$("#Canvas").hide();
});

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

function playGame() {
	$("#header").hide();
	$("#theButton").hide();
	$("#Canvas").show();
	
	
	database.ref("names/").once("value").then(function(snapshot) {
		var playersOnline = 0;
		for (var i in snapshot.val()) {
			if (!snapshot.val()[i]) {
				playersOnline++;
			}
		}
		if (playersOnline == 3) {
			player = new Murderer("default", "default", 50, 50);
		} else if (playersOnline == 5) {
			player = new Bystander("default", "default", 50, 50, true);
		} else {
			player = new Bystander("default", "default", 50, 50, false);
		}
		player.color = colors[Math.round(Math.random() * colors.length)];
		var property = pickRandomProperty(snapshot.val());
		console.log("#1 - " + snapshot.val()[property]);
		while (!snapshot.val()[property]) {
			console.log("#2 - " + snapshot.val()[property]);
			property = pickRandomProperty(snapshot.val());
			console.log("#3 - " + snapshot.val()[property]);
		}
		console.log("should be playerid - " + property);
		playerID = property;
		player.name = playerID;
		let obj = snapshot.val();
		console.log(obj);
		console.log(snapshot.val());
		obj[playerID] = false;
		console.log(obj);
		database.ref("names/").set(obj);
		try {
			console.log("PLAYERID - " + playerID);
			database.ref("people/" + playerID).set(player);
		}
		catch(e) {
			console.log("bad things happened");
			error.log(e);
		}
		
	});
}

document.onkeydown = function(event) {
	if (!keys[event.keyCode]) {
		keys[event.keyCode] = true;
		keys.length++;
	}

	if (keys[87] && keys.length == 1) { // w keycode
		database.ref("people/" + playerID + "/y").once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/y").set(snapshot.val() - playerMovement);
			database.ref("people/" + playerID + "/direction").set(90);
		});
	}
	if (keys[65] && keys.length == 1) { // a keycode
	 	database.ref("people/" + playerID + "/x").once("value").then(function(snapshot) {
	 		database.ref("people/" + playerID + "/x").set(snapshot.val() - playerMovement);
	 		database.ref("people/" + playerID + "/direction").set(180);
	 	});
	}
	if (keys[83] && keys.length == 1) { // s keycode
		database.ref("people/" + playerID + "/y").once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/y").set(snapshot.val() + playerMovement);
			database.ref("people/" + playerID + "/direction").set(270); 
		});
	}
	if (keys[68] && keys.length == 1) { // d keycode
		database.ref("people/" + playerID + "/x").once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val() + playerMovement);
			database.ref("people/" + playerID + "/direction").set(0);
		});
	}

	if (keys[87] && keys[68] && keys.length == 2) { // w + d
		database.ref("people/" + playerID).once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val().x + playerMovement);
			database.ref("people/" + playerID + "/y").set(snapshot.val().y - playerMovement);
			database.ref("people/" + playerID + "/direction").set(45);
		});
	}

	if (keys[87] && keys[65] && keys.length == 2) { // w + a
		database.ref("people/" + playerID).once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val().x - playerMovement);
			database.ref("people/" + playerID + "/y").set(snapshot.val().y - playerMovement);
			database.ref("people/" + playerID + "/direction").set(135);
		});
	}

	if (keys[83] && keys[68] && keys.length == 2) { // s + d
		database.ref("people/" + playerID).once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val().x + playerMovement);
			database.ref("people/" + playerID + "/y").set(snapshot.val().y + playerMovement);
			database.ref("people/" + playerID + "/direction").set(315);
		});
	}

	if (keys[83] && keys[65] && keys.length == 2) { // s + a
		database.ref("people/" + playerID).once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val().x - playerMovement);
			database.ref("people/" + playerID + "/y").set(snapshot.val().y + playerMovement);
			database.ref("people/" + playerID + "/direction").set(225);
		});
	}
}

document.onkeyup = function(event) {
	if (keys[event.keyCode]) {
		keys[event.keyCode] = false;
		keys.length--;
	}
}

database.ref("names/").on("value", function(snapshot) {
	context.fillStyle = "white";
	context.clearRect(0, 0, canvas.width, canvas.height);
	database.ref("people/").once("value", function(snapshot) {
		for (var i in snapshot.val()) {
			context.fillStyle = snapshot.val()[i].color;
			context.fillRect(snapshot.val()[i].x, snapshot.val()[i].y, 50, 50);
		}
	});
});

database.ref("people/").on("value", function(snapshot) {
	context.fillStyle = "white";
	for (var n in snapshot.val()) {
		context.clearRect(snapshot.val()[n].x - playerMovement, snapshot.val()[n].y - playerMovement, 50 + (playerMovement*2), 50 + (playerMovement*2));
		context.fillStyle = snapshot.val()[n].color;
		context.fillRect(snapshot.val()[n].x, snapshot.val()[n].y, 50, 50);
	}

});

database.ref("bullets/").on("value", function(snapshot) {
	for (var i in snapshot.val()) {
		context.clearRect(snapshot.val()[i].x - shootSpeed, snapshot.val()[i].y - shootSpeed, 50 + (shootSpeed*2), 50 + (shootSpeed*2));
		context.fillStyle = "black";
		context.fillRect(snapshot.val()[i].x, snapshot.val()[i].y, 10, 10);
	}
})

window.addEventListener("click", function(m) {
	console.log("secondTesting");
	if (player.hasWeapon) {
		
	} else if (player.hasKnife) {
		
	} else {
		
	}
	database.ref("bullets/").once("value", function(snapshot) {
			database.ref("people/").once("value", function(players) {
				let bulletsArr = snapshot.val();
				if (bulletsArr == null) {
					bulletsArr = [];
				}
				
				bulletsArr.push(new Bullet(players.val()[playerID].x + 25, players.val()[playerID].y + 25, players.val()[playerID].direction, playerID));
				database.ref("bullets/").set(bulletsArr);
				bulletsArr[bulletsArr.length - 1].move();
			});
		});
});

window.addEventListener("beforeunload", function(e) {
	database.ref("names/" + playerID).set(true);

	database.ref("people/" + playerID).remove();
});


/*

setInterval(function() {    
    document.body.innerHTML = "You are pressing ".concat(keys.length, " keys at the same time");
}, 500);




Example (this one happens one time):

database.ref("people/chara").once("value").then(function(snapshot) {
	Your code goes here
	to get the value it's snapshot.val()
});








Example (this one runs every time the value changes of "peopleOnline"):

database.ref("peopleOnline").on("value", function(snapshot) {
	Your code goes here
	to get the value it's snapshot.val()
});

*/
