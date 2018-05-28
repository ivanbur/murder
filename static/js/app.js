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

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var player = {
	color: "default",
	name: "default",
	group: "default",
	direction: 90,
	x: 50,
	y: 50,
	hasGun: false
}

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
	//database.ref("names/").set(names);
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
	player.color = colors[Math.round(Math.random() * colors.length)];
	database.ref("names/").once("value").then(function(snapshot) {
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
	// database.ref("playersOnline/").once("value").then(function(snapshot) {
	// 	let obj2 = snapshot.val();
	// 	console.log("playerID in playersOnline - " + playerID);
	// 	if (obj2 == null) {
	// 		obj2 = {};
	// 	}
	// 	obj2[playerID] = true;

	// 	database.ref("playersOnline/").set(arr2);
	// });
}

document.onkeydown = function(event) {
	if (!keys[event.keyCode]) {
		keys[event.keyCode] = true;
		keys.length++;
	}

	if (keys[87] && keys.length == 1) { // w keycode
		database.ref("people/" + playerID + "/y").once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/y").set(snapshot.val() - playerMovement);
		});
	}
	if (keys[65] && keys.length == 1) { // a keycode
	 	database.ref("people/" + playerID + "/x").once("value").then(function(snapshot) {
	 		database.ref("people/" + playerID + "/x").set(snapshot.val() - playerMovement);
	 	});
	}
	if (keys[83] && keys.length == 1) { // s keycode
		database.ref("people/" + playerID + "/y").once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/y").set(snapshot.val() + playerMovement);
		});
	}
	if (keys[68] && keys.length == 1) { // d keycode
		database.ref("people/" + playerID + "/x").once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val() + playerMovement);
		});
	}

	if (keys[87] && keys[68] && keys.length == 2) {
		database.ref("people/" + playerID).once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val().x + playerMovement);
			database.ref("people/" + playerID + "/y").set(snapshot.val().y - playerMovement);
		});
	}

	if (keys[87] && keys[65] && keys.length == 2) {
		database.ref("people/" + playerID).once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val().x - playerMovement);
			database.ref("people/" + playerID + "/y").set(snapshot.val().y - playerMovement);
		});
	}

	if (keys[83] && keys[68] && keys.length == 2) {
		database.ref("people/" + playerID).once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val().x + playerMovement);
			database.ref("people/" + playerID + "/y").set(snapshot.val().y + playerMovement);
		});
	}

	if (keys[83] && keys[65] && keys.length == 2) {
		database.ref("people/" + playerID).once("value").then(function(snapshot) {
			database.ref("people/" + playerID + "/x").set(snapshot.val().x - playerMovement);
			database.ref("people/" + playerID + "/y").set(snapshot.val().y + playerMovement);
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
		console.log(n);
		console.log(snapshot.val()[n]);
		context.fillStyle = snapshot.val()[n].color;
		console.log("color" + snapshot.val()[n].color);
		console.log(snapshot.val()[n].x + ", " + snapshot.val()[n].y);
		context.fillRect(snapshot.val()[n].x, snapshot.val()[n].y, 50, 50);
	}

	//for (var i in snapshot.val()) {
	// 	try {
	//		context.fillStyle = i.color;
	//	}
	//	catch(error) {
	//		console.log("errorerrorerror");
	//	}
	//	
	//	context.fillStyle = i.color;
	//	console.log("x")
	// 	context.fillRect(i.x, i.y, 50, 50);
	//}

	
});

window.addEventListener("beforeunload", function(e) {
	
	// database.ref("playersOnline/").once("value", function(snapshot) {
	// 	database.ref("playersOnline/").set(snapshot.val() - 1);
	// });
	console.log("debug3 - " + playerID);

	//database.ref("playersOnline/" + playerID).remove();

	console.log("debug1");
	database.ref("names/" + playerID).set(true);

	console.log("debug2");
	
	database.ref("people/" + playerID).remove();
});

playGame();

// make new that says playersOnline and when that changes redraw the entire thing.
// that way when somebody exits it will clear them and you can't see them anymore.


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
