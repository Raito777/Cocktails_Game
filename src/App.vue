<template>
<div>
    <h1>
        Mixology Quest
    </h1>
</div>
<CompositionSection
    @ingredient-removed="removeIngedient"
    @next-order="nextOrder"
    @order-submited="onOrderSubmited"
    :victory="victory"
    :missingIngredients="missingIngredients"
    :randomDrink="randomDrink"
    :guessedDrink="guessedDrink"
    :selectedIngredients="selectedIngredients"
    :score="score"></CompositionSection>
<IngredientsList
    :ingredients="ingredients"
    :sortedIngredients="sortedIngredients"
    @ingredient-added="onIngredientAdded"
    :randomDrink="randomDrink"></IngredientsList>

<div
    id="pagetop"
    class="fixed right-0 bottom-0"
    v-show="scY > 300"
    @click="toTop">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4a5568" stroke-width="1" stroke-linecap="square" stroke-linejoin="arcs">
        <path d="M18 15l-6-6-6 6" />
    </svg>
</div>
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
    getMissingIngredients,
    checkIngredient,
    sortIngredientsByType
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
            ingredients: [],
            sortedIngredients: [], //tableau des tous les ingrédients
            selectedIngredients: [], //tableau des ingrédients sélectionnées
            guessedDrink: '',
            possibleDrinks: [],
            isClose: false,
            victory: false,
            missingIngredients: '',
            score: 0,
            scTimer: 0,
            scY: 0,
        };
    },
    mounted() {
        randomCoktail.then(resultDrink => {
            this.randomDrink = resultDrink.drinks[0];
            console.log(this.randomDrink);
            getMissingIngredients(this.randomDrink, this.selectedIngredients).then(resultMissing => {
                this.missingIngredients = resultMissing
            });
        });
        ingredients.then(resultIngredient => {
            this.ingredients = resultIngredient;
            this.sortedIngredients = sortIngredientsByType(this.ingredients)
        });
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        onOrderSubmited() {

            getMissingIngredients(this.randomDrink, this.selectedIngredients).then(resultMissing => {
                this.missingIngredients = resultMissing
                console.log(this.missingIngredients)
            });

            if (this.randomDrink == this.guessedDrink) {
                this.isClose = true;
                this.guessedDrink = this.randomDrink

            }
            if (checkOrder(this.randomDrink, this.selectedIngredients) && this.victory == false) {
                console.log("good job!")
                this.score += this.selectedIngredients.length
                this.guessedDrink = this.randomDrink
                this.isClose = true;
                this.victory = true;
            }

        },
        nextOrder() {
            console.log("next-order")
            const randomCoktail = getRandomCoktail();
            randomCoktail.then(resultDrink => {
                this.randomDrink = resultDrink.drinks[0];
                console.log(this.randomDrink);
                getMissingIngredients(this.randomDrink, this.selectedIngredients).then(resultMissing => {
                    this.missingIngredients = resultMissing
                });
                this.victory = false;
                this.isClose = false;
                this.selectedIngredients = [];
            });
        },
        onIngredientAdded(ingredient) {
            if (checkIngredient(this.randomDrink, ingredient)) {
                ingredient.good = 'true'
            } else {
                ingredient.good = 'false'
            }
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
            this.selectedIngredients.splice(index, 1);
            this.possibleDrinks.splice(index, 1)
            this.isClose = false;
            this.victory = false;
            this.updateGuessedDrink(checkPossibleDrink(this.possibleDrinks, this.selectedIngredients))
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
                    });
                } else {
                    this.guessedDrink = null;
                }
            }
        },
        handleScroll: function () {
            if (this.scTimer) return;
            this.scTimer = setTimeout(() => {
                this.scY = window.scrollY;
                clearTimeout(this.scTimer);
                this.scTimer = 0;
            }, 100);
        },
        toTop: function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
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
