function checkOrder(randomDrink, selectedIngredients) {
    let numIngredient = 1;
    while (randomDrink[`strIngredient${numIngredient}`] !== null) {
      numIngredient++;
    }
    numIngredient--;

    console.log(numIngredient)
    console.log(selectedIngredients.length)

    if(numIngredient != selectedIngredients.length){
        console.log("bad length")
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

export { checkOrder }
