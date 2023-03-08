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

import { getIngredientByName } from './coktailsAPI'

async function getMissingIngredients(randomDrink, selectedIngredients){
  let numIngredient = 1;
  let missingIngredients = [];
  while (randomDrink[`strIngredient${numIngredient}`] !== null) {
    numIngredient++;
  }
  numIngredient--;
  const promises = [];
  for (let i = 1; i <= numIngredient; i++) {
    const ingredientName = randomDrink[`strIngredient${i}`];
    const promise = getIngredientByName(ingredientName)
      .then(resultIngredient => {
        let isMissing = true;
        for (let j = 0; j < selectedIngredients.length; j++) {
          const selIngredient = selectedIngredients[j].ingredients[0].strIngredient;
          if (ingredientName.toLowerCase() == selIngredient.toLowerCase()) {
            isMissing = false;
            break; // match found, exit loop
          }
        }
        if (isMissing) {
          missingIngredients.push(resultIngredient)
        }
      });
    promises.push(promise);
  }
  await Promise.all(promises);

  return missingIngredients; // all ingredients matched
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

function sortIngredientsByType(ingredients) {
  const sortedIngredients = {};
  ingredients.forEach((ingredientObj) => {
    const ingredient = ingredientObj.ingredients[0];
    if (sortedIngredients[ingredient.strType]) {
      sortedIngredients[ingredient.strType].push(ingredient);
    } else {
      sortedIngredients[ingredient.strType] = [ingredient];
    }
  });
  const sortedArray = Object.values(sortedIngredients);
  return sortedArray;
}

export { sortIngredientsByType }
export { checkIngredient }
export { getMissingIngredients }
export { checkPossibleDrink }
export { checkOrder }
