var sget = require('sget');

function Bike(brand, model, color, salePrice) {
	this.brand = brand;
	this.model = model;
	this.color = color;
	this.salePrice = salePrice;
}

Bike.prototype.displayBike = function() {
	return "brand: " + this.brand + " model: " + this.model + " color: " + this.color + " price: " + this.salePrice;
};

Bike.prototype.updatePrice = function(newPrice) {
	this.salePrice = newPrice;
	return console.log("The price of the " +this.color + " " + this.brand + " " + this.model + " is now " + this.salePrice + ".");
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

Inventory.prototype.viewInventory = function() {
	if (this.allBikes.length === 0) {
		console.log("You have nothing in your inventory");
	} else {
		this.allBikes.forEach(function(bike) {
			console.log(bike.displayBike());
		})
	}
}

Inventory.prototype.removeBike = function(currentBike) {
	var index = this.allBikes.indexOf(currentBike);
	console.log(currentBike.displayBike() + " has been removed.");
	this.allBikes.splice(index,1);
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
		console.log("sorry bikes of that range could not be found");
	} else {
		this.options(list);
		}
}

RunInventory.prototype.viewBike = function(currentBike) {
	var bikeMenu = {"1":function(currentBike) {game.currentInventory.removeBike(currentBike);},
			"2": function(currentBike) {var getNewPrice = game.getInput("What is the new sale price?");
					if ( isNaN(getNewPrice)) {
						console.log("Must be a number");
						game.viewBike(currentBike); 
					} else {
						currentBike.updatePrice(getNewPrice);
					}
				},
			"3": function() {game.menu();}
		}
	console.log("1- remove bike\n2- edit price\n3- return to menu");
	var userChoice = this.getInput("What would you like to do?");
	if (bikeMenu[userChoice]) {
		bikeMenu[userChoice](currentBike);
	}  else {
		console.log("command not avalible");
		this.viewBike(currentBike);
	}
}

RunInventory.prototype.options = function(list) {
	list.forEach(function(bike, index) {
		return	console.log( index + ", " + bike.displayBike());
	})
	var userInput = this.getInput("Which bike would you like to view? (or 'exit' to go to main menu)");
	if (!isNaN(userInput) && list[userInput] !== undefined){
		this.viewBike(list[userInput]);	
	} else if (userInput === 'EXIT') {
		this.menu();
	} else {
		this.options(list);
	}
}


RunInventory.prototype.searchByRange = function() {
	console.log("1- under 500\n2- 500-1000\n3- 1000+\n4- return to search menu");
	var input = this.getInput("What would you like to search by?");
	var options = {"1":function() {	var currentList = game.currentInventory.findInRange(0,500);
			game.displayList(currentList);
			},
			"2":function() { var currentList = game.currentInventory.findInRange(500,1000);
			game.displayList(currentList);
			},
			"3":function() { var currentList = game.currentInventory.findGreaterThan(1000);
			game.displayList(currentList);
			},
			"4":function() { game.menu();
			}
	}
	if (options[input]){
		options[input]();
	} else {
		this.search();
	}
}

RunInventory.prototype.search = function() {
	console.log("1- brand\n2- color\n3- sale price range\n4- return to menu");
	var input = this.getInput("What would you like to search by?");
	var options = { "1": function() {
			var currentList = game.currentInventory.findByBrand(game.getInput("What is the brand you would like to search for?"));
			game.displayList(currentList);
		},
		"2": function() {
			var currentList = game.currentInventory.findByColor(game.getInput("What is the color you would like to search for?"));
			game.displayList(currentList);
		},
		"3": function() {
			game.searchByRange();	
			game.menu();
		},
		"4": function() {
			game.menu();
		}
	}
	if(options[input]) {
		options[input]();
	} else {
		this.search();
	}
}

RunInventory.prototype.menu = function() {
	console.log("1- add a bike\n2- search for a bike\n3- view inventory\n4- exit");
	var input = this.getInput("What would you like to do?");
	var option = {
		"1": function() {
			game.addBike();
			game.menu();
		},
		"2": function() {
			game.search();
			game.menu();
		},
		"3": function() {
			game.currentInventory.viewInventory();
			game.menu();
		},
		"4": function() {
			console.log("Thanks for using this Inventory system!");
		}
	};
	if (option[input]) {
		option[input]();
	} else {
		this.menu();
	}
}


var game = new RunInventory;
game.startInventory();

