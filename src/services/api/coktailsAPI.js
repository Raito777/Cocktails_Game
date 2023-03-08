const getRandomCoktail = async function() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    if(response.status == 200){
      return response.json()    
    }else{
      new Error(response.statusText)
    }
}

const getIngredients = async function() {
  const response = await fetch("/data/ingredients.json")
  if(response.status == 200){
    return response.json()    
  }else{
    new Error(response.statusText)
  }
}

const getDrinkFromIngredients = async function(ingredient) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
  if(response.status == 200){
    return response.json()    
  }else{
    new Error(response.statusText)
  }
}

const getDrinkById = async function(idDrink) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
  if(response.status == 200){
    return response.json()    
  }else{
    new Error(response.statusText)
  }
}

const getIngredientByName = async function(ingredientName) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`)
  if(response.status == 200){
    return response.json()    
  }else{
    new Error(response.statusText)
  }
}

export { getIngredientByName }
export { getDrinkById }
export { getDrinkFromIngredients }
export { getIngredients }
export { getRandomCoktail }