<template>
  <div>
    <h1>
      Bar simulator 
    </h1>
  </div>
  <CompositionSection @ingredient-removed="removeIngedient" @next-order="nextOrder"  @order-submited="onOrderSubmited" :randomDrink="randomDrink" :guessedDrink="guessedDrink" :selectedIngredients="selectedIngredients"></CompositionSection>
  <IngredientsList :ingredients="ingredients" @ingredient-added="onIngredientAdded" :randomDrink="randomDrink"></IngredientsList>
</template>

<script>
import CompositionSection from './components/CompositionSection';
import IngredientsList from './components/IngredientsList';

import { getIngredients } from './services/api/coktailsAPI'
import { getRandomCoktail } from './services/api/coktailsAPI'
import { checkOrder } from './services/api/game'

export default {
  name: 'App',
  components: {
    CompositionSection,
    IngredientsList
  },
  data() {
    return {
      randomDrink: '',
      ingredients: [], //tableau des tous les ingrédients
      selectedIngredients: [],
      guessedDrink: '' //tableau des ingrédients sélectionnées
    };
  },
  mounted() {
    randomCoktail.then(resultDrink => {
      this.randomDrink = resultDrink.drinks[0];
      console.log(resultDrink);
    });
    ingredients.then(resultIngredient => {
      this.ingredients = resultIngredient;
    });
  },
  methods: {
    onOrderSubmited() {
      console.log(checkOrder(this.randomDrink, this.selectedIngredients))
      if(checkOrder(this.randomDrink, this.selectedIngredients)){
        this.guessedDrink = this.randomDrink
      }
    },
    nextOrder(){
      console.log("next-order")
    },
    onIngredientAdded(ingredient) {
      this.selectedIngredients.push(ingredient);
      this.onOrderSubmited();
    },
    removeIngedient(ingredient){
      console.log("removing")
      let index = 0;
      for (let j = 0; j < this.selectedIngredients.length; j++) {
        const selIngredient = this.selectedIngredients[j].ingredients[0].strIngredient;
        const strIngredient = ingredient.ingredients[0].strIngredient;

        if (strIngredient.toLowerCase() == selIngredient.toLowerCase()) {
          index = j
          break; // match found, exit loop
        }
      }
      this.selectedIngredients.splice(index, 1);

    }
  }
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
