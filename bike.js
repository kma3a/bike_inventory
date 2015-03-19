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

Inventory.prototype.findByBrand = function(brandName) {
	var bikes = [];
	this.allBikes.forEach(function(bike) {
		if(bike.brand === brandName) {
			bikes.push(bike);
		}
	})
	return bikes;
}

Inventory.prototype.findByColor = function(colorName) {
	var bikes = [];
	this.allBikes.forEach(function(bike) {
		if(bike.color === colorName) {
			bikes.push(bike);
		}
	})
	return bikes;
}

Inventory.prototype.findInRange = function(minNumber,maxNumber) {
	var bikes = [];
	this.allBikes.forEach(function(bike) {
		if(bike.salePrice < maxNumber && bike.salePrice >= minNumber) {
			bikes.push(bike);
		}
	})
	return bikes;
}

Inventory.prototype.findGreaterThan = function(minNumber) {
	var bikes = [];
	this.allBikes.forEach(function(bike) {
		if(bike.salePrice >= minNumber) {
			bikes.push(bike);
		}
	})
	return bikes;
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


RunInventory.prototype.displayList = function(list) {
	if (list.length === 0) {
		return console.log("sorry bikes of that range could not be found");
	} else {
		list.forEach(function(bike) {
			bike.displayBike();
		})
	}
}

RunInventory.prototype.searchByRange = function() {
	console.log("1- under 500\n2- 500-1000\n3- 1000+\n4- return to search menu");
	switch(this.getInput("What would you like to search by?")) {
		case "1":
			return this.displayList(this.currentInventory.findInRange(0,500));
		case "2":
			return this.displayList(this.currentInventory.findInRange(500,1000));
		case "3":
			return this.displayList(this.currentInventory.findGreaterThan(1000));
		case "4":
			this.menu();
			break;
		default:
			this.search();
			break;
	}
}

RunInventory.prototype.search = function() {
	console.log("1- brand\n2- color\n3- sale price range\n4- return to menu");
	switch(this.getInput("What would you like to search by?")) {
		case "1":
			return this.displayList(this.currentInventory.findByBrand(this.getInput("What is the brand you would like to search for?")));
		case "2":
			return this.displayList(this.currentInventory.findByColor(this.getInput("What is the color you would like to search for?")));

		case "3":
			this.searchByRange();	
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
	console.log("1- add a bike\n2-remove a bike\n3- search for a bike\n4- view inventory\n5- exit");
	switch(this.getInput("What would you like to do?")) {
		case "1":
			this.addBike();
			this.menu();
			break;
		case "2":
			this.menu();
			break;
		case "3":
			this.search();
			this.menu();
			break;
		case "4":
			this.menu();
			break;
		case "5":
			break;
		default: 
			this.menu();
			break;
	}
}


var game = new RunInventory;
game.startInventory();

