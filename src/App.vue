<template>
<div>
    <h1>
        Bar simulator
    </h1>
</div>
<CompositionSection @ingredient-removed="removeIngedient" @next-order="nextOrder" @order-submited="onOrderSubmited" :victory="victory" :nbMissingIngredients="nbMissingIngredients" :randomDrink="randomDrink" :guessedDrink="guessedDrink" :selectedIngredients="selectedIngredients"></CompositionSection>
<IngredientsList :ingredients="ingredients" @ingredient-added="onIngredientAdded" :randomDrink="randomDrink"></IngredientsList>
</template>

<script>
import CompositionSection from './components/CompositionSection';
import IngredientsList from './components/IngredientsList';

import {
    getRandomCoktail,
    getDrinkFromIngredients,
    getIngredients,
    getDrinkById
} from './services/api/coktailsAPI'

import {
    checkOrder,
    checkPossibleDrink,
    calculateMissingIngrediants,
    checkIngredient
} from './services/api/game'

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
            selectedIngredients: [], //tableau des ingrédients sélectionnées
            guessedDrink: '',
            possibleDrinks: [],
            isClose: '',
            victory: '',
            nbMissingIngredients: '',
            goodIngredient: '',

        };
    },
    mounted() {
        randomCoktail.then(resultDrink => {
            this.randomDrink = resultDrink.drinks[0];
            console.log(this.randomDrink);
            this.nbMissingIngredients = calculateMissingIngrediants(this.randomDrink, this.selectedIngredients);
        });
        ingredients.then(resultIngredient => {
            this.ingredients = resultIngredient;
        });
    },
    methods: {
        onOrderSubmited() {
            this.nbMissingIngredients = calculateMissingIngrediants(this.randomDrink, this.selectedIngredients);

            if (this.randomDrink == this.guessedDrink) {
                this.isClose = true;
                this.guessedDrink = this.randomDrink

            }
            if (checkOrder(this.randomDrink, this.selectedIngredients)) {
                console.log("good job!")
                this.guessedDrink = this.randomDrink
                this.isClose = true;
                this.victory = true;
            }
            console.log(this.isClose)

        },
        nextOrder() {
            console.log("next-order")
        },
        onIngredientAdded(ingredient) {
            if (checkIngredient(this.randomDrink, ingredient)) {
                ingredient.good = true
            }else{
                ingredient.good = false
            }
            console.log("very "+ingredient.good)
            this.selectedIngredients.push(ingredient);
            this.onOrderSubmited();
            const possibleDrinks = getDrinkFromIngredients(ingredient.ingredients[0].strIngredient.toLowerCase())
            this.addPossibledrink(possibleDrinks)

        },
        removeIngedient(ingredient) {
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
            console.log(this.possibleDrinks);
            this.selectedIngredients.splice(index, 1);
            this.possibleDrinks.splice(index, 1)
            this.isClose = false;
            this.victory = false;
            this.updateGuessedDrink(checkPossibleDrink(this.possibleDrinks, this.selectedIngredients))
            this.nbMissingIngredients = calculateMissingIngrediants(this.randomDrink, this.selectedIngredients);
            this.onOrderSubmited();

        },
        addPossibledrink(possibleDrinks) {
            if (!this.isClose) {
                possibleDrinks.then(resultPossibleDrinks => {
                    this.possibleDrinks.push(resultPossibleDrinks);
                    //console.log(this.possibleDrinks);
                    //console.log(checkPossibleDrink(this.possibleDrinks, this.selectedIngredients))
                    this.updateGuessedDrink(checkPossibleDrink(this.possibleDrinks, this.selectedIngredients))
                });
            }
        },
        updateGuessedDrink(idDrink) {
            if (!this.isClose) {
                if (idDrink != 0) {
                    const aPossibleDrink = getDrinkById(idDrink)
                    aPossibleDrink.then(resultDrink => {
                        this.guessedDrink = resultDrink.drinks[0];
                        console.log(this.guessedDrink)
                    });
                } else {
                    this.guessedDrink = null;
                }
            }
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
    margin: 0;
    padding: 0;
}

html,
body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

h1 {
    margin: 5px;
}
</style>
