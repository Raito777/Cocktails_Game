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
        const selIngredient = selectedIngredients[j].strIngredient;
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

function getIngredientByName(name, ingredients) {

  // Flatten the array of ingredients using the `flatMap` method
  const flattenedIngredients = ingredients.flatMap(obj => obj.ingredients);

  // Use the `find` method to search for the ingredient with the specified name
  const ingredient = flattenedIngredients.find(obj => obj.strIngredient.toLowerCase() === name);

  return ingredient;
}

function getMissingIngredients(randomDrink, selectedIngredients){
  const ingredients = require('../../../public/data/ingredients.json');

  let numIngredient = 1;
  let missingIngredients = [];
  while (randomDrink[`strIngredient${numIngredient}`] !== null) {
    numIngredient++;
  }
  numIngredient--;
  for (let i = 1; i <= numIngredient; i++) {
    const ingredientName = randomDrink[`strIngredient${i}`];
    const ingredient = new Proxy (getIngredientByName(ingredientName.toLowerCase(), ingredients), {})

    let isMissing = true;
      for (let j = 0; j < selectedIngredients.length; j++) {
        const selIngredient = selectedIngredients[j].strIngredient;
        if (ingredientName.toLowerCase() == selIngredient.toLowerCase()) {
          isMissing = false;
          break; // match found, exit loop
        }
      }
      if (isMissing) {
        missingIngredients.push(ingredient)
      }


  }

  return missingIngredients; // all ingredients matched
}

function checkIngredient(randomDrink, ingredientToCheck){
  let numIngredient = 1;
  while (randomDrink[`strIngredient${numIngredient}`] !== null) {
    numIngredient++;
  }
  numIngredient--;
  for (let i = 1; i <= numIngredient; i++) {
    const ingredient = randomDrink[`strIngredient${i}`];

      if (ingredient.toLowerCase() == ingredientToCheck.strIngredient.toLowerCase()) {
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

function get4RandomIngredientsFromType(ingredients, theIngredient, selectedIngredients) {
  let randomIngredients = [];
  const ingredientFromType = ingredients.filter((ingredient) => {
    if (ingredient.ingredients[0].strType == theIngredient.strType) {
      return ingredient;
    }
  });

  while(randomIngredients.length < 4){
    const randomIndex = Math.floor(Math.random() * ingredientFromType.length);
    const ingredient = ingredientFromType[randomIndex];
    if (!randomIngredients.some(ing => ing.idIngredient === ingredient.ingredients[0].idIngredient) && ingredient != theIngredient && !randomIngredients.some(ing => ing.idIngredient === selectedIngredients.idIngredient)) {
      if(ingredient.ingredients[0].good == "false"){
        ingredient.ingredients[0].good = null;
      }
      randomIngredients.push(ingredient.ingredients[0]);
    }
  }
  // console.log("before pushing")
  // console.log(randomIngredients)
  return randomIngredients;
}

export { get4RandomIngredientsFromType }
export { sortIngredientsByType }
export { checkIngredient }
export { getMissingIngredients }
export { checkPossibleDrink }
export { checkOrder }
