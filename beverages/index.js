class Beverages{
    #beverages = {};
    constructor(){
       
    }

    getBeverageIngredients = (beverageName) => {
        if(this.#beverages[beverageName]){
            return this.#beverages[beverageName]
        }else{
            throw Error("Drink Does Not Exist")
        }
    }


    addBeverage = (beverageName,beverageIngredient) => {
        this.#beverages[beverageName] = beverageIngredient;
        return "Added"
    }

    getBeverages = () => {
        return this.#beverages
    }
}

module.exports = Beverages;