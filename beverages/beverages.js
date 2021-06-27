class Beverages{
    #beverages = {};
    constructor(){
        this.#beverages = {}
    }

    /**
     * Get The ingredients of the beverage
     * @param {beverageName} beverageName 
     * @returns Object conatining beverage of the drink
     */
    getBeverageIngredients = (beverageName) => {
        if(this.#beverages[beverageName]){
            return this.#beverages[beverageName]
        }else{
            throw Error("Drink Does Not Exist")
        }
    }

    /**
     * Add a beverage name and beverage ingredient.
     * @param {String} beverageName 
     * @param {Object} beverageIngredient 
     * @returns Added String
     */
    addBeverage = (beverageName,beverageIngredient) => {
        if(typeof(beverageIngredient) === 'object' && !Array.isArray(beverageIngredient)){
            this.#beverages[beverageName] = beverageIngredient;
            return "Ingredients Added"
        }else{
            throw new TypeError('Beverage Ingredients not an Object')
        }
     
    }

    /**
     * gGt all the beverages
     * @returns Object containing all beverages
     */
    getBeverages = () => {
        return this.#beverages
    }
}

module.exports = Beverages;