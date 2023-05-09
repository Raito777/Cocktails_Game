<template>

<!--Basic header for now -->
<header class="header">
    <h1>
        Mixology Quest
    </h1>
</header>

<!-- 
    Left side (or top side on phone) 
    This componenent contains de section of the selected ingredient.
-->
<CompositionSection
    @ingredient-removed="removeIngedient"
    @next-order="nextOrder"
    @order-submited="onOrderSubmited"
    :victory="victory"
    :missingIngredients="missingIngredients"
    :randomDrink="randomDrink"
    :guessedDrink="guessedDrink"
    :selectedIngredients="selectedIngredients"
    :score="score"
    :scoreCombo="scoreCombo"
    ref="compositionSection"></CompositionSection>

<!--
    Right side (or bottom side one phone)
    This componenent contain the order and the "quizz" to guess the ingredients    
-->    
<IngredientsList
    :ingredients="quizzIngredients"
    :sortedIngredients="sortedIngredients"
    @ingredient-added="onIngredientAdded"
    :randomDrink="randomDrink"
    :barManSentence="this.barmanPhrase"
    :drinksHistory="this.drinksHistory"></IngredientsList>

<!-- Pop ups -->

<!-- Little pop up animation for a good answer (green checkmark) -->
<div
    id="popUpAnimation"
    class="display-none">
    <svg width="100%" height="100%" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <g transform="matrix(0.38084,-0.381137,0.480943,0.481318,-68.3166,266.544)">
            <path
                d="M201.792,91.939C201.792,66.862 176.08,46.502 144.411,46.502C112.742,46.502 87.031,66.862 87.031,91.939L87.031,388.01C87.031,413.087 112.742,433.447 144.411,433.447C176.08,433.447 201.792,413.087 201.792,388.01L201.792,91.939Z"
                style="fill:#B2E364;" />
        </g>
        <g transform="matrix(-0.38084,-0.381137,-0.87866,0.879346,587.31,94.0201)">
            <path
                d="M201.792,71.372C201.792,57.646 176.08,46.502 144.411,46.502C112.742,46.502 87.031,57.646 87.031,71.372L87.031,408.576C87.031,422.303 112.742,433.447 144.411,433.447C176.08,433.447 201.792,422.303 201.792,408.576L201.792,71.372Z"
                style="fill:#B2E364;" />
        </g>
    </svg>
</div>

<!-- Pop up animation for when a cocktail is entirely guessed -->
<div
    id="popWinAnimation"
    class="display-none">
    <img id="imgWin" class="display-none" v-bind:src="randomDrink.strDrinkThumb">

    <Vue3Lottie
        :animationData="fireworksJSON"
        :loop="false"
        :speed="1"
        :autoPlay="false"
        :height="600"
        :width="600"
        ref="fireworks"></Vue3Lottie>
    <Vue3Lottie
        :animationData="drinkJSON"
        :loop="false"
        :speed="1"
        :autoPlay="false"
        :height="400"
        :width="400"
        ref="drink"></Vue3Lottie>

</div>

</template>

<script>

import CompositionSection from './components/CompositionSection';
import IngredientsList from './components/IngredientsList';

import fireworksJSON from './assets/98352-fireworks-shine.json'
import drinkJSON from './assets/947-drink.json'

import {
    getRandomCoktail, //get a random Cocktail form the api
    getDrinkFromIngredients, //get a list of drinks form the api, made of an ingredient
    getIngredients, //get ingredients of a cocktail
    getDrinkById //get a drink with it's id
} from './services/api/coktailsAPI'

import {
    checkOrder, //check if the order have been completed
    checkPossibleDrink, //get a drink wich can be made with the selected ingredients
    getMissingIngredients, //get all the missing ingredient of the cocktail order's
    checkIngredient, //check if the ingredient is in the cocktail
    sortIngredientsByType, //sort the ingredients by their type
    get4RandomIngredientsFromType
} from './services/api/game'

import {
    Vue3Lottie //Vu3Lottie is for the svg animations (win pop-up and the waiting cocktail)
} from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

export default {
    name: 'App',
    components: {
        CompositionSection,
        IngredientsList,
        Vue3Lottie
    },
    data() {
        return {
            randomDrink: '', //the drink to guessed
            ingredients: [], //all of the ingredients
            sortedIngredients: [], //sorted ingredients
            selectedIngredients: [], //selected ingredients by the user
            quizzIngredients: [], //the 4 ingredients of the quizz
            guessedDrink: '', //drink wich can be made with the selected ingredients
            possibleDrinks: [], //list of drinks wich can be made with one ingredient
            drinksHistory: [], //list of the cocktails that have been guessed
            isClose: false, //if the drink wich can be made with the selected ingredients is the drink to guessed
            victory: false, //if the cocktail have been guessed
            missingIngredients: '', //list of the missing ingredients (ingredients to guess)
            barmanPhrase: '', //phrase of the barman
            score: 0, //total score, is 0 if no score have been stored
            scoreCombo: 1, //combo of the player, increase when no error have been made in row
            madeMistake: false, //if the player made a mistake during the round
            scTimer: 0, //for the animation of the pop-up
            scY: 0,
            fireworksJSON, //guessed svg animation
            drinkJSON, //waiting svg animation
        };
    },
    mounted() {
        //first we get the session data (if there is any)
        this.getSessionData();
        //the first request is to get a random drink
        randomCoktail.then(resultDrink => {
            //we init all of the game variables
            this.randomDrink = resultDrink.drinks[0];
            this.missingIngredients = getMissingIngredients(this.randomDrink, this.selectedIngredients)
            ingredients.then(resultIngredient => {
                this.ingredients = resultIngredient;
                this.sortedIngredients = sortIngredientsByType(this.ingredients)
                this.updateQuizzIngredients()
                this.updateBarmanPhrase(true)
                this.$refs.compositionSection.missingIngredientsWithDefaults(this.selectedIngredients, this.missingIngredients);
            });
        });
    },

    methods: {
        //this function is called every time we select an ingredient
        onOrderSubmited() {
            //we update the list of the missing ingredients
            this.missingIngredients = getMissingIngredients(this.randomDrink, this.selectedIngredients)

            if (this.randomDrink == this.guessedDrink) {
                this.isClose = true;
            }
            //if the order has been completed
            if (checkOrder(this.randomDrink, this.selectedIngredients) && this.victory == false) {
                //we reset all the variables
                this.randomDrink.ingredients = this.selectedIngredients;
                this.drinksHistory.push(this.randomDrink);
                this.score = +this.score + +this.selectedIngredients.length * +this.scoreCombo;
                this.guessedDrink = this.randomDrink;
                this.isClose = true;
                this.victory = true;
                this.updateBarmanPhrase(true);
                this.victoryAnimation();
                console.log(this.drinksHistory);
            }
            //we update the child component with the missing ingredients
            this.$refs.compositionSection.missingIngredientsWithDefaults(this.selectedIngredients, this.missingIngredients);
        },
        //update the 4 ingredients proposed to the player
        updateQuizzIngredients() {
            //we get the list of 4 from the type of the ingredient to guessed
            this.quizzIngredients = get4RandomIngredientsFromType(this.ingredients, this.missingIngredients[0], this.selectedIngredients)
            //we positionate the good ingredient to guess
            if (!this.quizzIngredients.some(ing => ing.idIngredient === this.missingIngredients[0].idIngredient)) {
                const randomIndex = Math.floor(Math.random() * this.quizzIngredients.length);
                this.quizzIngredients[randomIndex] = this.missingIngredients[0]
            }
            for (let i = 0; i < this.quizzIngredients.length; i++) {
                this.quizzIngredients[i].index = i;
            }
            //we update the child component with the missing ingredients
            this.$refs.compositionSection.missingIngredientsWithDefaults(this.selectedIngredients, this.missingIngredients);
        },
        //update the barman phrase, good is for the mood of the barman : true, good ingredient, false, made a mistake
        updateBarmanPhrase(good) {
            const barManSentence = document.getElementById('barManSentence');

            const randomIndex = Math.floor(Math.random() * 8);
            if (good) {
                if (this.selectedIngredients.length == 0) {
                    this.barmanPhrase = startingSentencesFirstIngredient[randomIndex] + '<b>' + this.missingIngredients[0].strType.toLowerCase() + '</b>';
                } else if (this.missingIngredients.length == 1) {
                    this.barmanPhrase = startingSentencesLastIngredient[randomIndex] + '<b>' + this.missingIngredients[0].strType.toLowerCase() + '</b>';
                } else if (this.missingIngredients.length == 0) {
                    this.barmanPhrase = endingSentence[randomIndex];
                } else {
                    this.barmanPhrase = startingSentencesRandomIngredient[randomIndex] + '<b>' + this.missingIngredients[0].strType.toLowerCase() + '</b>';
                }
            } else {
                this.barmanPhrase = badIngredientSentence[randomIndex]
            }
            barManSentence.innerHTML = this.barmanPhrase;

            //typing animation for the phrase
            barManSentence.classList.add('animateSentence');
            setTimeout(() => {
                barManSentence.classList.remove('animateSentence');
            }, 700);
        },
        //change the cocktail to guess
        nextOrder() {
            //reseting every variables
            const randomCoktail = getRandomCoktail();
            randomCoktail.then(resultDrink => {
                this.randomDrink = resultDrink.drinks[0];
                this.missingIngredients = getMissingIngredients(this.randomDrink, this.selectedIngredients)
                this.victory = false;
                this.isClose = false;
                this.madeMistake = false;
                this.selectedIngredients = [];
                this.guessedDrink = '';
                this.updateQuizzIngredients();
                this.updateBarmanPhrase(true)
                this.$refs.compositionSection.missingIngredientsWithDefaults(this.selectedIngredients, this.missingIngredients);
                this.saveData();
            });
        },
        //add an ingredient to the selected ingredients
        onIngredientAdded(ingredient) {

            const popUpDiv = document.getElementById('popUpAnimation');
            const cocktailDiv = document.getElementById('cocktailDiv');

            //if the ingredient is a good one, push it and update variables
            if (checkIngredient(this.randomDrink, ingredient)) {
                ingredient.good = 'true'
                this.selectedIngredients.push(ingredient)
                const possibleDrinks = getDrinkFromIngredients(ingredient.strIngredient.toLowerCase())
                this.onOrderSubmited();
                this.addPossibledrink(possibleDrinks)
                this.updateQuizzIngredients()
                this.updateBarmanPhrase(true)
                if(!this.madeMistake){
                    this.scoreCombo++;
                }
                this.madeMistake = false;
                popUpDiv.classList.remove('display-none')
                cocktailDiv.classList.remove('float')
                cocktailDiv.classList.add('impact')

                //checkmark animation
                setTimeout(() => {
                    cocktailDiv.classList.remove('impact')
                    cocktailDiv.classList.add('float')
                }, 301);
                setTimeout(() => {
                    popUpDiv.classList.add('display-none')
                }, 1000);

            } else {
                const index = this.quizzIngredients.findIndex(ingredientObj => ingredientObj.idIngredient === ingredient.idIngredient);
                this.quizzIngredients[index].good = false
                // console.log(this.quizzIngredients)
                ingredient.good = 'false'
                this.scoreCombo = 1;
                this.madeMistake = true;
                this.updateBarmanPhrase(false)
            }
            this.$refs.compositionSection.missingIngredientsWithDefaults(this.selectedIngredients, this.missingIngredients);

        },
        //remove an ingredient from the selected ingredients
        removeIngedient(ingredient) {
            let index = 0;
            for (let j = 0; j < this.selectedIngredients.length; j++) {
                const selIngredient = this.selectedIngredients[j].strIngredient;
                const strIngredient = ingredient.strIngredient;

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
            this.$refs.compositionSection.missingIngredientsWithDefaults(this.selectedIngredients, this.missingIngredients);
        },
        //list of list of the possible drink with an ingredient
        addPossibledrink(possibleDrinks) {
            if (!this.isClose) {
                possibleDrinks.then(resultPossibleDrinks => {
                    this.possibleDrinks.push(resultPossibleDrinks);
                    this.updateGuessedDrink(checkPossibleDrink(this.possibleDrinks, this.selectedIngredients))
                });
            }
        },
        //update drink wich can be made with the selected ingredients
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
        //victory animation (when an order has been completed)
        victoryAnimation() {
            const victoryPopUp = document.getElementById('popWinAnimation');
            const imgVictory = document.getElementById('imgWin');

            victoryPopUp.classList.remove('display-none');
            this.$refs['fireworks'].play()
            this.$refs['drink'].play()
            imgVictory.classList.remove('display-none');

            setTimeout(() => {
                imgVictory.classList.add('display-none');
                victoryPopUp.classList.add('display-none');
                this.$refs['fireworks'].stop();
                this.$refs['drink'].stop()

                this.nextOrder();
            }, 2500);
        },
        //save the score data in the local storage
        saveData(){
            sessionStorage.setItem("score", this.score);
        },
        //get the score data from the local storage if it exist
        getSessionData(){
            if(sessionStorage.getItem("score")){
                this.score = sessionStorage.getItem("score");
            }
        },
    }
}
//firsts async call of the api
const randomCoktail = getRandomCoktail();
const ingredients = getIngredients();

//different possible sentence for the barman
const startingSentencesFirstIngredient = ["First, ", "Begin with ", "First we need ", "Start with ", "First of all, ", "Firstly put some ", "First and foremost ", "In the first place put some "]
const startingSentencesRandomIngredient = ["Now put some ", "Keep up we need ", "Don't forget ", "Focus and add ", "Now we need ", "Let's put some ", "Then add ", "Next put some "]
const badIngredientSentence = ["You want to make sock juice ?", "Focus !", "Wrong !", "Please, focus", "It's obvious !", "You look like an amateur", "Did you really think it was that?", "Are you trying to kill me ?!"]
const startingSentencesLastIngredient = ["Finally, all we need is ", "And end with ", "Wow, now we just need ", "Finish with some ", "Impressive, we are just missing ", "Therefore add ", "In the end we need ", "At last put some "]
const endingSentence = ["Nice job boy.", "Nice.", "We're good.", "Not bad !", "Well done.", "Yeah !", "Nice one !", "Let's taste that, boy."]

</script>

<style>

/* Mobile first styling */

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    position: relative;
    display: grid;
    grid-template-rows: 50px 1fr 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
        "top"
        "middle"
        "bottom";
    grid-row-gap: 0;
    height: 100%;
    overflow: hidden;
    background-color: #0D0D0D;
    opacity: 1;
    background-image: radial-gradient(#ffffff31 0.75px, #0D0D0D 0.75px);
    background-size: 15px 15px;
}
header {
    grid-area: top;
    color:#F1FF9F;
}

.top-div {
    grid-area: middle;
}

.ingredientsList {
    grid-area: bottom;
}

* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    height: 100%
}

body {
    height: 100vh;
    width: 100vw;
}

h1 {
    margin: 5px;
}

#popUpAnimation {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.574);
    border-radius: 100%;
    -webkit-animation: slide-in-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both, fade-out 0.5s ease-out both 0.6s;
    animation: slide-in-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both, fade-out 0.5s ease-out both 0.6s;
}

#popWinAnimation {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.751);
    z-index:2;
    -webkit-animation: fade-out 1s ease-out both 1.5s;
    animation: fade-out 1s ease-out both 1.5s;
}

#popWinAnimation .lottie-animation-container {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
}

#popWinAnimation img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 250px;
    height: 250px;
    border-radius: 100%;
    -webkit-animation: bounce-in-top 1.1s both 0.2s;
    animation: bounce-in-top 1.1s both 0.2s;
    z-index: 1;
}

.display-none {
    display: none;
}

#popUpAnimation svg {
    width: 50%;
    -webkit-animation: flicker-in-1 0.6s linear both;
    animation: flicker-in-1 0.6s linear both;
}
b{
    color:#ED6D6D;
}

/*For large screens*/
@media (min-width: 1000px) {
    #app {
        display: grid;
        grid-template-rows: 60px 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "top top"
            "middle bottom";   
    }
    header{
        font-size:1em;
        position:relative;
        padding:0.5em;
        background:transparent;
        color:#78CE8A;
    }
    
    .missingCard, .card--normal .ingredientDivImg, .card--normal {
        min-width:90px;
        min-height:90px;
    }
}
@media (max-width: 420px){
    .missingCard, .card--normal .ingredientDivImg, .card--normal {
        max-width:50px;
        max-height:50px;
    }
    .resultDiv img{
        max-width:100px;
        max-height:100px;
    }
    .resultDiv .lottie-animation-container{
        max-width:100px;
        max-height:100px;
    }
}

</style>
