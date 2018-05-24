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
var playerID = 0;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var player = {
	color: "",
	name: "charlie",
	group: "",
	direction: 90,
	x: 50,
	y: 50,
	hasGun: false
}

var colors = ["green", "blue", "red"];
var group = ["bystander", "murderer"];
var keys = { length: 0 }
const playerMovement = 10;

// var player2 = {
// 	color: "blue",
// 	name: "beta",
// 	group: "murderer",
// 	direction: 0,
// 	x: 150,
// 	y: 250,
// 	hasGun: false
// }

$(document).ready(function() {
	// database.ref("people/0").set(player);
	// database.ref("people/1").set(player2);
});

function playGame() {
	player.color = colors[Math.round(Math.random() * colors.length)];

	database.ref("people/").once("value").then(function(snapshot) {
	 	playerID = snapshot.val().length;
	 	database.ref("people/" + playerID).set(player);
	});
	//setEventListeners();
	//setInterval(draw, 1);
}

// function draw() {
// 	database.ref("people/").once("value").then(function(snapshot) {
// 		context.fillStyle = "white";
// 		context.fillRect(0, 0, window.innerWidth, window.innerHeight);
// 		for (var i = 0; i < snapshot.val().length; i++) {
// 			context.fillStyle = snapshot.val()[i].color;
// 			context.fillRect(snapshot.val()[i].x, snapshot.val()[i].y, 50, 50);
// 		}
// 	});
// 	//console.log("sup");
// }

// function setEventListeners() {
// 	addEventListener('keydown', function(event) {
// 		if (event.keyCode == 87) { // w keycode
// 			database.ref("people/" + playerID + "/y").once("value").then(function(snapshot) {
// 				database.ref("people/" + playerID + "/y").set(snapshot.val() - 10);
// 			});
// 		}
// 		if (event.keyCode == 65) { // a keycode
// 		 	database.ref("people/" + playerID + "/x").once("value").then(function(snapshot) {
// 		 		database.ref("people/" + playerID + "/x").set(snapshot.val() - 10);
// 		 	});
// 		}
// 		if (event.keyCode == 83) { // s keycode
// 			database.ref("people/" + playerID + "/y").once("value").then(function(snapshot) {
// 				database.ref("people/" + playerID + "/y").set(snapshot.val() + 10);
// 			});
// 		}
// 		if (event.keyCode == 68) { // d keycode
// 			database.ref("people/" + playerID + "/x").once("value").then(function(snapshot) {
// 				database.ref("people/" + playerID + "/x").set(snapshot.val() + 10);
// 			});
// 		}
// 	});
// }

document.onkeydown = function(event) {
	if (!keys[event.keyCode]) {
		keys[event.keyCode] = true;
		keys.length++;
	}

	if (event.keyCode == 87) { // w keycode
		database.ref("people/" + playerID + "/y").once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/y").set(snapshot.val() - playerMovement);
		});
	}
	if (event.keyCode == 65) { // a keycode
	 	database.ref("people/" + playerID + "/x").once("value").then(function(snapshot) {
	 		database.ref("people/" + playerID + "/x").set(snapshot.val() - playerMovement);
	 	});
	}
	if (event.keyCode == 83) { // s keycode
		database.ref("people/" + playerID + "/y").once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/y").set(snapshot.val() + playerMovement);
		});
	}
	if (event.keyCode == 68) { // d keycode
		database.ref("people/" + playerID + "/x").once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val() + playerMovement);
		});
	}
}

document.onkeyup = function(event) {
	if (keys[event.keyCode]) {
		keys[event.keyCode] = false;
		keys.length--;
	}
}

database.ref("people/").on("value", function(snapshot) {
	context.fillStyle = "white";
	for (var n in snapshot.val()) {
		//context.clearRect(n.x - playerMovement, n.y - playerMovement, 50 + (playerMovement*2), 50 + (playerMovement*2));
		console.log(n);
	}

	// for (var i in snapshot.val()) {
	// 	context.fillStyle = i.color;
	// 	context.fillRect(i.x, i.y, 50, 50);
	// }


});

window.addEventListener("beforeunload", function(e) {
	database.ref("people/" + playerID).remove();
});

playGame();

/*

Keep in mind to press multiple keys at once

var keys = {
    length: 0
};

document.onkeydown = function(e) {
    if (!keys[e.keyCode]) {
        keys[e.keyCode] = true;
        keys.length++;
    }
    
    if (keys[87] && keys[68] && !keys[83] && !keys[65]) {
    	document.body.innerHTML = "PRESSING W AND D";
    }
}

document.onkeyup = function(e) {
    if (keys[e.keyCode]) {
        keys[e.keyCode] = false;
        keys.length--;
    }
}

setInterval(function() {    
    document.body.innerHTML = "You are pressing ".concat(keys.length, " keys at the same time");
}, 500);

*/


/* Example (this one happens one time):

database.ref("people/chara").once("value").then(function(snapshot) {
	Your code goes here
	to get the value it's snapshot.val()
});

*/






/* Example (this one runs every time the value changes of "peopleOnline"):

database.ref("peopleOnline").on("value", function(snapshot) {
	Your code goes here
	to get the value it's snapshot.val()
});

*/