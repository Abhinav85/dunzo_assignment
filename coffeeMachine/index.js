class CoffeeMachine{
    #isOn;
    #currentlyBrewing;
    #li
    constructor(output){
        this.beverages = {};
        this.ingredients = {};
        this.output = output;
        this.#isOn = 0;
        this.#currentlyBrewing = 0;
        this.#li = new Set();
    }


    #checkIfOn = () => {
        if(this.#isOn){
            return true
        }else{
            throw Error("Please start the machine")
        }
    }


    startMachine = () => {
        this.#isOn = 1;
        return "Coffee Machine Started"
    }


    addBeverages = (beverageName) => {
        if(this.#checkIfOn()){
            this.beverages[beverageName] = 1
        }
        return "Added"
    }

    removeBeverages = (beverageName) => {
        if(this.#checkIfOn()){
            this.beverages[beverageName] = 0
        }
        return "Removed"
    }


    addIngredients = (ingredients) => {
        if(typeof(ingredients) === 'object'){
            Object.keys(ingredients).forEach(elem => {
                this.ingredients[elem] =  this.ingredients[elem] ? this.ingredients[elem] : 0 + ingredients[elem]
                this.#li.delete(elem)
            })
        }else{
            throw Error("Ingredient Type Wrong")
        }
        return "Added"
    }

    #checkCurrentBrewing = () => {
        return this.#currentlyBrewing;
    }

    #brewBeveragePvt = async (beverage, drinkIngredients) => {
        // Decrease ingredients
        Object.keys(drinkIngredients).forEach(elem => {
            this.ingredients[elem] = this.ingredients[elem] - drinkIngredients[elem]
        })
        this.#checkIngredientLevel()

        return setTimeout(() => {
            this.#currentlyBrewing  = this.#currentlyBrewing - 1;
            console.log(`${beverage} has been Brewed`)
        },1000);

    }

    #checkIngredientLevel = () => {
        let lowIngredients = [];

        lowIngredients = Object.keys(this.ingredients).filter(elem => this.ingredients[elem] <= 50);
        this.#li.add(...lowIngredients);

        if(this.#li.size){
            console.log(`Ingredients Low - ${[...this.#li].join(" ")}`)
        }

    }

    #checkIfEnoughIngredients = (drinkIngredients) => {
        return Object.keys(drinkIngredients).every((elem) => this.ingredients[elem] >= drinkIngredients[elem])
    }

    #findLowIngredients = (drinkIngredients) => {
        let lowIngredients = {
            low : [],
            notAvailable : []
        };
        Object.keys(drinkIngredients).forEach(elem => {
            if(this.ingredients[elem] === 0){
                lowIngredients.notAvailable.push(elem);
            }else if(this.ingredients[elem] < drinkIngredients[elem]){
                lowIngredients.low.push(elem)
            }
        });

        return lowIngredients;

    }

    brewBeverage = async (beverage, drinkIngredients) => {
        if(this.#checkIfOn()){
            if(this.#checkCurrentBrewing() === this.output){
                console.error("Machine on Full Capacity, please Wait for a While");
            }else if(!this.beverages[beverage]){
                console.error("No Such Beverage On Machine");
            }else{
                if(this.#checkIfEnoughIngredients(drinkIngredients)){
                    this.#currentlyBrewing = this.#currentlyBrewing + 1;

                    let brew = await this.#brewBeveragePvt(beverage,drinkIngredients);

                    return brew;
                }else{
                    let lowIngredient = this.#findLowIngredients(drinkIngredients);
                    this.#li.add(...lowIngredient.low);
                    this.#li.add(...lowIngredient.notAvailable);
                    


                    console.error(`${beverage} couldn't be prepared because ${lowIngredient.low.length > 0 ? lowIngredient.low.join(" ,") + " is not sufficent "  : ""} ${lowIngredient.notAvailable.length > 0 ? lowIngredient.notAvailable.join(" ,") + " is not not available" : ""}`)
                    this.#checkIngredientLevel()
                    return ;
                }
            }
        }
    }
}


module.exports = CoffeeMachine;


