<template>
<header class="header">
    <h1>
        Mixology Quest
    </h1>
</header>
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
<IngredientsList
    :ingredients="quizzIngredients"
    :sortedIngredients="sortedIngredients"
    @ingredient-added="onIngredientAdded"
    :randomDrink="randomDrink"
    :barManSentence="this.barmanPhrase"
    :drinksHistory="this.drinksHistory"></IngredientsList>
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

import fireworksJSON from './assets/98352-fireworks-shine.json'
import drinkJSON from './assets/947-drink.json'

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
    sortIngredientsByType,
    get4RandomIngredientsFromType
} from './services/api/game'

import {
    Vue3Lottie
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
            randomDrink: '',
            ingredients: [], //tableau des tous les ingrédients
            sortedIngredients: [],
            selectedIngredients: [],
            quizzIngredients: [], //tableau des ingrédients sélectionnées
            guessedDrink: '',
            possibleDrinks: [],
            drinksHistory: [],
            isClose: false,
            victory: false,
            missingIngredients: '',
            barmanPhrase: '',
            score: 0,
            scoreCombo: 1,
            madeMistake: false,
            scTimer: 0,
            scY: 0,
            fireworksJSON,
            drinkJSON,
        };
    },
    mounted() {
        this.getSessionData();
        randomCoktail.then(resultDrink => {
            this.randomDrink = resultDrink.drinks[0];
            console.log(this.randomDrink);
            this.missingIngredients = getMissingIngredients(this.randomDrink, this.selectedIngredients)
            ingredients.then(resultIngredient => {
                this.ingredients = resultIngredient;
                this.sortedIngredients = sortIngredientsByType(this.ingredients)
                this.updateQuizzIngredients()
                this.updateBarmanPhrase(true)
                this.$refs.compositionSection.missingIngredientsWithDefaults(this.selectedIngredients, this.missingIngredients);
            });
        });

        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        onOrderSubmited() {

            this.missingIngredients = getMissingIngredients(this.randomDrink, this.selectedIngredients)

            if (this.randomDrink == this.guessedDrink) {
                this.isClose = true;
                this.guessedDrink = this.randomDrink
            }
            if (checkOrder(this.randomDrink, this.selectedIngredients) && this.victory == false) {
                console.log("good job!")
                this.drinksHistory.push(this.randomDrink);
                this.score += this.selectedIngredients.length * this.scoreCombo;
                this.guessedDrink = this.randomDrink;
                this.isClose = true;
                this.victory = true;
                this.updateBarmanPhrase(true);
                this.victoryAnimation();
            }
            this.$refs.compositionSection.missingIngredientsWithDefaults(this.selectedIngredients, this.missingIngredients);

        },
        updateQuizzIngredients() {
            console.log("Missing")
            this.quizzIngredients = get4RandomIngredientsFromType(this.ingredients, this.missingIngredients[0], this.selectedIngredients)
            console.log(this.quizzIngredients)
            console.log(this.missingIngredients[0])
            if (!this.quizzIngredients.some(ing => ing.idIngredient === this.missingIngredients[0].idIngredient)) {
                console.log("PUSHING TO THE LIMIT")
                const randomIndex = Math.floor(Math.random() * this.quizzIngredients.length);
                this.quizzIngredients[randomIndex] = this.missingIngredients[0]
            }
            for (let i = 0; i < this.quizzIngredients.length; i++) {
                this.quizzIngredients[i].index = i;
            }
            this.$refs.compositionSection.missingIngredientsWithDefaults(this.selectedIngredients, this.missingIngredients);
        },
        updateBarmanPhrase(good) {
            const barManSentence = document.getElementById('barManSentence');

            const randomIndex = Math.floor(Math.random() * this.quizzIngredients.length);
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

            barManSentence.classList.add('animateSentence');
            setTimeout(() => {
                barManSentence.classList.remove('animateSentence');
            }, 700);
        },
        nextOrder() {
            console.log("next-order")
            const randomCoktail = getRandomCoktail();
            randomCoktail.then(resultDrink => {
                this.randomDrink = resultDrink.drinks[0];
                console.log(this.randomDrink);
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
        onIngredientAdded(ingredient) {

            const popUpDiv = document.getElementById('popUpAnimation');

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
                setTimeout(() => {
                    popUpDiv.classList.add('display-none');
                }, 1000);
            } else {
                const index = this.quizzIngredients.findIndex(ingredientObj => ingredientObj.idIngredient === ingredient.idIngredient);
                this.quizzIngredients[index].good = false
                console.log(this.quizzIngredients)
                ingredient.good = 'false'
                this.scoreCombo = 1;
                this.madeMistake = true;
                this.updateBarmanPhrase(false)
            }
            this.$refs.compositionSection.missingIngredientsWithDefaults(this.selectedIngredients, this.missingIngredients);

        },
        removeIngedient(ingredient) {
            console.log("removing")
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
        saveData(){
            sessionStorage.setItem("score", this.score);
            //sessionStorage.setItem("drinksHistory", this.drinksHistory);
        },
        getSessionData(){
            if(sessionStorage.getItem("score")){
                this.score = sessionStorage.getItem("score");
            }
            if(sessionStorage.getItem("drinksHistory")){
                this.drinksHistory = sessionStorage.getItem("drinksHistory")
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

const startingSentencesFirstIngredient = ["First, ", "Begin with ", "First we need ", "Start with "]
const startingSentencesRandomIngredient = ["Now put some ", "Keep up we need ", "Don't forget ", "Focus and add ", "Now we need "]
const badIngredientSentence = ["You want to make sock juice ?", "Focus !", "Wrong !", "Please, focus", "It's obvious !", "You look like an amateur", "Did you really think it was that?", "Are you trying to kill me ?!"]
const startingSentencesLastIngredient = ["Finally, all we need is ", "And end with ", "Wow, now we just need ", "Finish with some ", "Impressive, we are just missing "]
const endingSentence = ["Nice job boy.", "Nice.", "We're good.", "Not bad !", "Well done."]

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
