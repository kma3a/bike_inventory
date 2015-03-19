
function Bike(brand, model, color, salePrice) {
	this.brand = brand;
	this.model = model;
	this.color = color;
	this.salePrice = salePrice;
}

Bike.prototype.displayBike = function() {
	console.log("The price of the " +this.color + " " + this.brand + " " + this.model + " is now " + this.salePrice + ".");
};

Bike.prototype.updatePrice = function(newPrice) {
	this.salePrice = newPrice;
	console.log("The price of the " +this.color + " " + this.brand + " " + this.model + " is now " + this.salePrice + ".");
};

myBike = new Bike("harley", "Zoom", "Yellow", 123.20);
myBike.displayBike();
myBike.updatePrice(103.20);

function Inventory() {
	this.allBikes = [];
}

Bike.prototype.addBike = function(newBike) {
	this.allBikes.push(newBike);
}

function RunInventory() {
	this.currentInvetory = new Inventory();
}

RunInventory.prototype.startInventory= function() {
	console.log("Welcome to your Inventory");
	this.menu();
}

RunInventory.prototype.menu = function() {
	console.log("1- add a bike\n2-remove a bike\n3- view a bike\n4- search for a bike\n5- view inventory\n6- exit");
	switch(this.getInput("What would you like to do?")) {
		case "1":
			this.menu();
		case "2":
			this.menu();
		case "3":
			this.menu();
		case "4":
			this.menu();
		case "5":
			this.menu();
		case "6":
		default: 
			this.menu();
			break;
	}
}


var game = new RunInventory;
game.startInventory();

