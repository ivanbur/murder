class Bystander {
	constructor(playerColor, playerName, initx, inity, startWithWeapon) {
		this.color = playerColor;
		this.name = playerName;
		this.x = initx;
		this.y = inity;
		this.hasWeapon = startWithWeapon;
		this.direction = "up";
	}
	setDirection(newDir) {
		this.direction = newDir;
	}
	move() /*we need different directions for moving and for facing but right now lets focus on one*/{
		if (this.direction === "up") {
			this.y -= 10;
		} else if (this.direction === "left") {
			this.x -= 10;
		} else if (this.direction === "down") {
			this.y += 10;
		} else if (this.direction === "right") {
			this.x += 10;
		}
	}
	shoot()  {
		if (this.hasWeapon) {
			
		}
	}
}

class murderer {
	constructor(initColor, initName, initX, initY) {
		this.color = initColor;
		this.name = initName;
		this.x = initX;
		this.y = initY;
		this.direction = "up";
		this.hasKnife = true;
	}
	
	setDirection(newDir) {
		this.direction = newDir;
	}
	
	move() /*we need different directions for moving and for facing but right now lets focus on one*/{
		if (this.direction === "up") {
			this.y -= 10;
		} else if (this.direction === "left") {
			this.x -= 10;
		} else if (this.direction === "down") {
			this.y += 10;
		} else if (this.direction === "right") {
			this.x += 10;
		}
	}
	stab() {
		if (this.hasKnife) {
			if (this.direction === "up") {
				
			}
		}
	}
}

class bullet {
	constructor(initX, initY, direction) {
		this.x = initX;
		this.y = initY;
		this.direction = direction;
	}
	move() {
		
	}
}

class Knife {
	constructor() {
		this.x = Murderer.x;
		this.y = Murderer.y;
	}
}

let playerEx = new player("blue", "Foxtrot", 300, 250, false, false);

console.log(playerEx.color);
