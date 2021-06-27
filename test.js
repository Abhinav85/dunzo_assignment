const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
const CoffeeMachineContructor = require("./coffeeMachine/coffeeMachine");
const Beverages = require("./beverages/beverages");

// chai.use(chaiAsPromised);

const json = require("./data.json");
const jsonData = json.machine
const machineOutlets = jsonData.outlets.count_n;
const ingredients = jsonData.total_items_quantity;
const beveragesObj = jsonData.beverages;
const beverageArr = Object.keys(jsonData.beverages);





describe('Start the coffee machine',() => {
    const coffeeMaker = new CoffeeMachineContructor(machineOutlets)
    context('start the machine',() => {
        it('should return "Coffee Machine Started"',() => {
            expect(coffeeMaker.startMachine()).to.equal("Coffee Machine Started")
        });
    });
})

describe('Add Ingredients to the machine',() => {
    const coffeeMaker = new CoffeeMachineContructor(machineOutlets)
    context('Add Ingredients to a Turned on machine',() => {
        it('should return "Ingredients Added"',() => {
            coffeeMaker.startMachine()
            expect(coffeeMaker.addIngredients(ingredients)).to.equal("Ingredients Added")
        });
    });

    context('Send a non object to add Ingredients',() => {
        it('Should throw "Ingredient Type Wrong"',() => {
            coffeeMaker.startMachine()
            expect(coffeeMaker.addIngredients,[]).to.throw("Ingredient Type Wrong");
        });
    });

})


describe('Add beverages to the beverage class',() => {
    const beverages = new Beverages();
    context('Add a beverage to Beverage Class',() => {
        it('Should Add beverages', () => {
            expect(beverages.addBeverage(beverageArr[0],beveragesObj[beverageArr[0]])).to.be.equal("Ingredients Added")
        });
    });

    context('Add a wrong type of Beverage Class',() => {
        it('Should throw "Beverage Ingredients not an Object"',() => {
            expect(beverages.addBeverage,beverageArr[0],[]).to.throw('Beverage Ingredients not an Object');
        });
    });
});


describe('Make a beverage',() => {
    const coffeeMaker = new CoffeeMachineContructor(machineOutlets);
    coffeeMaker.startMachine()
    coffeeMaker.addIngredients(ingredients);
    const beverages = new Beverages();

    beverageArr.forEach(elem => beverages.addBeverage(elem, beveragesObj[elem]));
    beverageArr.forEach(elem => coffeeMaker.addBeverages(elem))


    context('Add a drink to beverage',() => {
        beverage = "hot_coffee";
        it(`Should response "${beverage} has been Brewed"`,async () => {
            let res = await coffeeMaker.brewBeverage(beverage, beverages.getBeverageIngredients(beverage))
            expect(res).to.be.equal("hot_coffee has been Brewed")

        });
    });

    context('Ingredient Low',() => {
        coffeeMaker.addIngredients(ingredients);
        beverage = "hot_coffee";
        it(`Should response with "hot_coffee couldn't be prepared because hot_milk is not sufficent"`, async () => {

            try {
                let res1 = await coffeeMaker.brewBeverage(beverage, beverages.getBeverageIngredients(beverage))
                let res2 = await coffeeMaker.brewBeverage(beverage, beverages.getBeverageIngredients(beverage))
            } catch (error) {
                console.log(error.message)
                expect(error.message).to.be.equal("hot_coffee couldn't be prepared because hot_milk is not sufficent  ")
            }
        })
    })

})