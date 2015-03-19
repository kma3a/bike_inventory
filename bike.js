var sget = require('sget');

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

Inventory.prototype.addNewBike = function(newBike) {
	this.allBikes.push(newBike);
}


myInventory = new Inventory();
myInventory.addNewBike(myBike);

function RunInventory() {
	this.currentInventory = new Inventory;
}

RunInventory.prototype.startInventory= function() {
	console.log("Welcome to your Inventory");
	this.menu();
}

RunInventory.prototype.getInput = function(message) {
	return sget(message).trim().toUpperCase();
}

RunInventory.prototype.addBike = function() {
	var brand = this.getInput("What is the brand of the bike you would like to add?");
	var model = this.getInput("What is the model of the bike?");
	var color = this.getInput("What is the color of the bike?");
	var salePrice = this.getInput("What is the sale price of the bike?");
	this.currentInventory.addNewBike(new Bike(brand,model, color,salePrice));
}

RunInventory.prototype.search = function() {
	console.log("1- brand\n2- color\n3- sale price range\n4- return to menu");
	switch(this.getInput("What would you like to search by?") {
		case "1":
			this.menu();
			break;
		case "2":
			this.menu();
			break;
		case "3":
			this.menu();
			break;
		case "4":
			this.menu();
			break;
		default:
			this.search();
			break;
	}
}

	

RunInventory.prototype.menu = function() {
	console.log("1- add a bike\n2-remove a bike\n3- view a bike\n4- search for a bike\n5- view inventory\n6- exit");
	switch(this.getInput("What would you like to do?")) {
		case "1":
			this.addBike();
			this.menu();
			break;
		case "2":
			this.menu();
			break;
		case "3":
			this.menu();
			break;
		case "4":
			this.search();
			this.menu();
			break;
		case "5":
			this.menu();
			break;
		case "6":
			break;
		default: 
			this.menu();
			break;
	}
}


var game = new RunInventory;
game.startInventory();

