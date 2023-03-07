function checkOrder(randomDrink, selectedIngredients) {
    let numIngredient = 1;
    while (randomDrink[`strIngredient${numIngredient}`] !== null) {
      numIngredient++;
    }
    numIngredient--;

    // console.log(numIngredient)
    // console.log(selectedIngredients.length)

    if(numIngredient != selectedIngredients.length){
        //console.log("bad length")
        return false;
    }

    for (let i = 1; i <= numIngredient; i++) {
      const ingredient = randomDrink[`strIngredient${i}`];

      if (!ingredient) {
        break; // no more ingredients, exit loop
      }

      let matchFound = false;
      for (let j = 0; j < selectedIngredients.length; j++) {
        const selIngredient = selectedIngredients[j].ingredients[0].strIngredient;
        if (ingredient.toLowerCase() == selIngredient.toLowerCase()) {
          matchFound = true;
          break; // match found, exit loop
        }
      }
      if (!matchFound) {
        return false; // ingredient not found in selected ingredients
      }
    }
    return true; // all ingredients matched
}

function checkPossibleDrink(possibleDrink, selectedIngredients) {
  console.log(possibleDrink)
  if(selectedIngredients.length == 1){
    const randomIndex = Math.floor(Math.random() * possibleDrink[0].drinks.length);
    let firstRandomDrink = possibleDrink[0].drinks[randomIndex].idDrink;
    return firstRandomDrink;
  }

  const idDrinksCommuns = possibleDrink.reduce((acc, cur) => {
    const idDrinks = cur.drinks.map(drink => drink.idDrink);
    if (!acc) {
      return idDrinks;
    } else {
      return acc.filter(idDrink => idDrinks.includes(idDrink));
    }
  }, null)
  

  console.log(idDrinksCommuns)
  if(idDrinksCommuns){
    if(idDrinksCommuns.length == 1){
      return idDrinksCommuns[0]
    }else if(idDrinksCommuns.length > 1){
      const randomDrink = Math.floor(Math.random() * idDrinksCommuns.length)
      return idDrinksCommuns[randomDrink]
    }
  }
  
  return 0
}

function calculateMissingIngrediants(randomDrink, selectedIngredients){
    let numIngredient = 1;
    while (randomDrink[`strIngredient${numIngredient}`] !== null) {
      numIngredient++;
    }
    numIngredient--;
    let nbMissingIngredients = numIngredient;
    for (let i = 1; i <= numIngredient; i++) {
      const ingredient = randomDrink[`strIngredient${i}`];

      for (let j = 0; j < selectedIngredients.length; j++) {
        const selIngredient = selectedIngredients[j].ingredients[0].strIngredient;
        if (ingredient.toLowerCase() == selIngredient.toLowerCase()) {
          nbMissingIngredients--;
          break; // match found, exit loop
        }
      }
    }
    return nbMissingIngredients; // all ingredients matched
}

function checkIngredient(randomDrink, ingredientToCheck){
  let numIngredient = 1;
  while (randomDrink[`strIngredient${numIngredient}`] !== null) {
    numIngredient++;
  }
  numIngredient--;
  console.log(ingredientToCheck);
  for (let i = 1; i <= numIngredient; i++) {
    const ingredient = randomDrink[`strIngredient${i}`];

      if (ingredient.toLowerCase() == ingredientToCheck.ingredients[0].strIngredient.toLowerCase()) {
        return true
      }
    
  }
  return false; // all ingredients matched
}
export { checkIngredient }
export { calculateMissingIngrediants }
export { checkPossibleDrink }
export { checkOrder }
