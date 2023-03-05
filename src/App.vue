<template>
  <div>
    <h1>
      Bar simulator 
    </h1>
  </div>
  <CompositionSection :drink="drink"></CompositionSection>
  <IngredientsList :ingredients="ingredients"></IngredientsList>
</template>

<script>
import CompositionSection from './components/CompositionSection';
import IngredientsList from './components/IngredientsList';

import { getIngredients } from './services/api/coktailsAPI'
import { getRandomCoktail } from './services/api/coktailsAPI'

export default {
  name: 'App',
  components: {
    CompositionSection,
    IngredientsList
  },
  data() {
    return {
      drink: {
        drinkName:'',
        drinkUrl:''
      },
      ingredients: [],
    };
  },
  mounted() {
    randomCoktail.then(resultDrink => {
      this.drink.drinkName = resultDrink.drinks[0].strDrink;
      this.drink.drinkUrl = resultDrink.drinks[0].strDrinkThumb;
    });
    ingredients.then(resultIngredient => {
      this.ingredients = resultIngredient;
    });
  },
}
const randomCoktail = getRandomCoktail();
const ingredients = getIngredients();

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  padding:0;
}
html, body {
  margin:0;
  padding:0;
  overflow-x: hidden;
}
h1{
  margin:5px;
}
</style>
