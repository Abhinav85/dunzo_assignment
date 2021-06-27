const CoffeeMachineContructor = require("./coffeeMachine/index");
const Beverages = require("./beverages/index");

const json1 = require("./data.json");


const json = json1.machine



const coffeeMaker = new CoffeeMachineContructor(4)
const beverages = new Beverages();

coffeeMaker.startMachine();

let bevArr = Object.keys(json.beverages)

bevArr.forEach(elem => beverages.addBeverage(elem, json.beverages[elem]));

// console.log("beverages", beverages.getBeverages())

bevArr.forEach(elem => coffeeMaker.addBeverages(elem))

coffeeMaker.addIngredients(json.total_items_quantity);

try {
    coffeeMaker.brewBeverage("hot_coffee", beverages.getBeverageIngredients("hot_coffee"))
    coffeeMaker.brewBeverage("hot_coffee", beverages.getBeverageIngredients("hot_coffee"))
    coffeeMaker.brewBeverage("hot_coffee", beverages.getBeverageIngredients("hot_coffee"))
    coffeeMaker.brewBeverage("hot_coffee", beverages.getBeverageIngredients("hot_coffee"))
    coffeeMaker.brewBeverage("hot_coffee", beverages.getBeverageIngredients("hot_coffee"))
    coffeeMaker.brewBeverage("hot_coffee", beverages.getBeverageIngredients("hot_coffee"))
} catch (error) {
    console.log(error)
}



// coffeeMaker.brewBeverage("hot_milk")
// coffeeMaker.brewBeverage("hot_milk")
// coffeeMaker.brewBeverage("hot_milk")
// coffeeMaker.brewBeverage("hot_milk")



// console.log(coffeeMaker)