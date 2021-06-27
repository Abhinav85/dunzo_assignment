class CoffeeMachine {
    #isOn;
    #currentlyBrewing;
    #li
    constructor(output) {
        this.beverages = {};
        this.ingredients = {};
        this.output = output;
        this.#isOn = 0;
        this.#currentlyBrewing = 0;
        this.#li = new Set();
    }


    /**
     * Checks if the Machine is on
     * @returns Is machine on/True or Throw and Error
     */
    #checkIfOn = () => {
        if (this.#isOn) {
            return true
        } else {
            throw Error("Please start the machine")
        }
    }


    /**
     * Turn on the machine
     * @returns String stating that machine can start
     */
    startMachine = () => {
        this.#isOn = 1;
        return "Coffee Machine Started"
    }


    /**
     * Add beverages to the Coffee Machine
     * @param {String} beverageName 
     * @returns A string "Ingredients Added"
     */
    addBeverages = (beverageName) => {
        if (this.#checkIfOn()) {
            this.beverages[beverageName] = 1
        }
        return "Ingredients Added"
    }

    /**
     * Remove Beverages from Coffee Machine
     * @param {String} beverageName 
     * @returns A string "Removed"
     */
    removeBeverages = (beverageName) => {
        if (this.#checkIfOn()) {
            this.beverages[beverageName] = 0
        }
        return "Removed"
    }

    /**
     * Add Ingredients to the machine,
     * 
     * @param {Object} ingredients 
     * @returns Nothing
     */
    addIngredients = (ingredients) => {
        if (typeof (ingredients) === 'object' && !Array.isArray(ingredients)) {
            Object.keys(ingredients).forEach(elem => {
                this.ingredients[elem] = this.ingredients[elem] ? this.ingredients[elem] : 0 + ingredients[elem]
                this.#li.delete(elem)
            })
        } else {
            throw new TypeError("Ingredient Type Wrong")
        }
        return "Ingredients Added"
    }

    /**
     * Check how many drinks are currently brewing
     * @returns Integer
     */
    #checkCurrentBrewing = () => {
        return this.#currentlyBrewing;
    }

    /**
     * This is the private object that actually brews the Drink
     * This is async function because we don't need to block the thread
     * @param {String} beverage 
     * @param {Object} drinkIngredients 
     * @returns 
     */
    #brewBeveragePvt = async (beverage, drinkIngredients) => {
        // Decrease ingredients
        Object.keys(drinkIngredients).forEach(elem => {
            this.ingredients[elem] = this.ingredients[elem] - drinkIngredients[elem]
        })

        // Check ingredients level and raise alert if low
        this.#checkIngredientLevel()

        this.#currentlyBrewing = this.#currentlyBrewing - 1;
        return `${beverage} has been Brewed`

    }

    // Check the ingredients level, and if they are below 50, or missing from a drink, raise an alert
    /**
     * Check ingredients level and raise an alert if required
     */
    #checkIngredientLevel = () => {
        let lowIngredients = [];

        lowIngredients = Object.keys(this.ingredients).filter(elem => this.ingredients[elem] <= 50);
        this.#li.add(...lowIngredients);

        if (this.#li.size) {
            console.log(`Ingredients Low - ${[...this.#li].join(" ")}`)
        }

    }

    /**
     * Check if there are enough ingredients for a specific drink
     * @param {Object} drinkIngredients 
     * @returns Boolean if the numbers of drink are enough or not
     */
    #checkIfEnoughIngredients = (drinkIngredients) => {
        return Object.keys(drinkIngredients).every((elem) => this.ingredients[elem] >= drinkIngredients[elem])
    }


    /**
     * Find low Ingredients
     * @param {Object} drinkIngredients 
     * @returns An object with two keys, low and not available Ingredients
     */
    #findLowIngredients = (drinkIngredients) => {
        let lowIngredients = {
            low: [],
            notAvailable: []
        };
        Object.keys(drinkIngredients).forEach(elem => {
            if (this.ingredients[elem] === 0) {
                lowIngredients.notAvailable.push(elem);
            } else if (this.ingredients[elem] < drinkIngredients[elem]) {
                lowIngredients.low.push(elem)
            }
        });

        return lowIngredients;

    }



    /**
     * 
     * @param {String} beverage 
     * @param {Object} drinkIngredients 
     * @returns An error on console if the beverage cannot be brewed, or else the beverage has been brewed
     */
    brewBeverage = async (beverage, drinkIngredients) => {

        if (this.#checkIfOn()) {
            if (this.#checkCurrentBrewing() === this.output) {
                throw new Error("Machine on Full Capacity, please Wait for a While");
            } else if (!this.beverages[beverage] && !this.ingredients[beverage]) {
                throw new Error("No Such Beverage On Machine");
            } else {
                if (this.#checkIfEnoughIngredients(drinkIngredients)) {
                    console.log("Starting Brewing - ", beverage);
                    this.#currentlyBrewing = this.#currentlyBrewing + 1;
                    let brew = await this.#brewBeveragePvt(beverage, drinkIngredients);
                    return brew;
                } else {
                    let lowIngredient = this.#findLowIngredients(drinkIngredients);
                    this.#li.add(...lowIngredient.low);
                    this.#li.add(...lowIngredient.notAvailable);

                    // (`${beverage} couldn't be prepared because ${lowIngredient.low.length > 0 ? lowIngredient.low.join(" ,") + " is not sufficent " : ""} ${lowIngredient.notAvailable.length > 0 ? lowIngredient.notAvailable.join(" ,") + " is not not available" : ""}`)
                    this.#checkIngredientLevel()
                    throw new Error(`${beverage} couldn't be prepared because ${lowIngredient.low.length > 0 ? lowIngredient.low.join(" ,") + " is not sufficent " : ""} ${lowIngredient.notAvailable.length > 0 ? lowIngredient.notAvailable.join(" ,") + " is not not available" : ""}`)

                }
            }
        }
    }
}


module.exports = CoffeeMachine;


