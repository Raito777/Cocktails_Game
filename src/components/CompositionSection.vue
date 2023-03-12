<template>
<div class="top-div">
    <div class="infoDiv">
        <span>Order : <b>{{randomDrink.strDrink}}</b></span>
        <span>Total score : <b>{{score}}</b></span>
    </div>
    <div class="coktailInfoDiv">
        <IngredientCard
            @click="removeIngredient(ingredient)"
            v-for="ingredient in selectedIngredients"
            :key="ingredient.idIngredient"
            :name="ingredient.strIngredient"
            :good="ingredient.good"></IngredientCard>
        <MissingIngredientCard
            v-for="missingIngredient in defaultIngredients"
            :key="missingIngredient.idIngredient"
            :type="missingIngredient.strType"
            :name="missingIngredient.strIngredient">
        </MissingIngredientCard>
        <div class="resultDiv">
            <!-- <span>Missing ingredients : <b>{{missingIngredients.length}}</b></span> -->
            <img v-if="guessedDrink" v-bind:src="guessedDrink.strDrinkThumb" v-bind:alt="guessedDrink.strDrink" :class="[`victory--${victory}`]">
            <!-- <img v-else src="../assets/guess.png" alt="Question mark"> -->
            <Vue3Lottie
                v-else
                :animationData="drinkJSON"
                :height="125"
                :width="125"></Vue3Lottie>
            <span>Result :
                <b v-if="guessedDrink" class="guessed-drink"> {{ guessedDrink.strDrink }} </b>
                <b v-else class="guessed-drink"> ? </b>
                <span v-if="victory" class="guessed-drink">, good job !</span>
            </span>
            <button @click="nextOrder()">Next</button>
        </div>
    </div>
</div>
</template>

<script>
import IngredientCard from './IngredientCard.vue';
import MissingIngredientCard from './MissingIngredientCard.vue';
import {
    Vue3Lottie
} from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import drinkJSON from '../assets/86401-cocktail-mix.json'

export default {
    name: 'CompositionSection',
    components: {
        IngredientCard,
        MissingIngredientCard,
        Vue3Lottie
    },
    data() {
        return {
            drinkJSON,
            defaultIngredients: [ /* Vos ingrédients par défaut ici */ ],
        }
    },
    props: {
        msg: String,
        randomDrink: {
            required: true,
        },
        selectedIngredients: {
            required: true,
        },
        guessedDrink: {
            required: true,
        },
        victory: {
            required: true,
            default: false,
        },
        missingIngredients: {
            required: true,
            default: 0,
        },
        score: {
            required: true,
            default: 0
        },
    },
    computed: {

    },
    methods: {
        nextOrder() {
            this.$emit('next-order');
        },
        removeIngredient(ingredient) {
            this.$emit('ingredient-removed', ingredient);
        },
        missingIngredientsWithDefaults(selected, missing) {
            console.log("LES MISSINGS")
            const missingCount = 16 - selected.length - missing.length;
            let newMissingIngredient = [];
            newMissingIngredient = missing || [];
            for(let i = 0; i < missingCount; i++){
                //const defaultIngredient = { strType: 'default', strIngredient: 'default' };
                newMissingIngredient.push({ strType: 'default', strIngredient: 'default' })
            }
            
            this.defaultIngredients = newMissingIngredient
            console.log(this.defaultIngredients)
        }
    },
}
</script>

<style scoped>
.guessed-drink {
    -webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.resultDiv button {
    background: white;
    border-radius: 50px;
    padding: 5px;
    width: 150px;
    border: none;
}

.victory--false {
    border: 3px solid red;
    transition: 0.2s;
}

.victory--true {
    border: 3px solid rgb(0, 255, 0);
    transition: 0.2s;

}

.resultDiv span {
    margin-top: 5px;
    margin-bottom: 10px;
}

.resultDiv img {
    width: 125px;
    height: auto;
    transition: 0.2s;
    border-radius: 15px;
    -webkit-animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.3s;
    animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.3s;
}

.resultDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-column: 2 / 5;
    grid-row: 2 / 5;
}

.compositionDiv {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
}

.coktailInfoDiv {
    width: 100%;
    height: 90%;
    max-width:360px;
    max-height: 360px;
    margin:auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    justify-items: center; /* centrer horizontalement */
    align-items: center; /* centrer verticalement */
    grid-gap:0;
    overflow: hidden;
}

.top-div {
    background-color: #13161E;
    border-color: 1px solid black;
    color: white;
    padding: 20px 10px;
    overflow: hidden;
}

.infoDiv {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
}

@media (min-width: 1000px){
    .top-div {
        display: flex;
        flex-direction: column;
    }
    .lottie-animation-container{
        min-width:200px;
        min-height:200px;
    }
    .resultDiv img{
        width:180px;
        height:180px;
    }
    .resultDiv span{
        font-size:1.5rem;
    }
    .top-div span{
        font-size: 1.5rem;
    }
}
</style>
