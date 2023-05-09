<template>
<div class="top-div">

    <!-- Score section -->
    <div class="infoDiv">
        <span>Order : <b>{{randomDrink.strDrink}}</b></span>
        <div class="scoreDiv">
            <span>Total score : <b>{{score}}</b></span>
            <span class="combo">Combo : <b>{{scoreCombo}}x</b></span>
        </div>
    </div>
    
    <!--Main component containing the card for ingredient and missingIngredient-->
    <div class="coktailInfoDiv float" id="cocktailDiv">
        <!--The selected ingredients cards-->
        <IngredientCard
            @click="removeIngredient(ingredient)"
            v-for="ingredient in selectedIngredients"
            :key="ingredient.idIngredient"
            :name="ingredient.strIngredient"
            :good="ingredient.good"></IngredientCard>

        <!-- The missing ingredients cards with their types-->
        <MissingIngredientCard
            v-for="missingIngredient in defaultIngredients"
            :key="missingIngredient.idIngredient"
            :type="missingIngredient.strType"
            :name="missingIngredient.strIngredient">
        </MissingIngredientCard>
        
        <!--The center div with a possible drink-->
        <div class="resultDiv">
            <!-- <span>Missing ingredients : <b>{{missingIngredients.length}}</b></span> -->
            <img v-if="guessedDrink" v-bind:src="guessedDrink.strDrinkThumb" v-bind:alt="guessedDrink.strDrink" :class="[`victory--${victory}`]">
            <!-- <img v-else src="../assets/guess.png" alt="Question mark"> -->
            <!--Waiting animation-->
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
            <!--Next order button-->
            <button class="pushable" @click="nextOrder()">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front">
                    Next
                </span>
            </button>
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
        scoreCombo: {
            required:true,
            default: 1
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
            //console.log("LES MISSINGS")
            const missingCount = 16 - selected.length - missing.length;
            let newMissingIngredient = [];
            newMissingIngredient = missing || [];
            for (let i = 0; i < missingCount; i++) {
                //const defaultIngredient = { strType: 'default', strIngredient: 'default' };
                newMissingIngredient.push({
                    strType: 'default',
                    strIngredient: 'default'
                })
            }

            this.defaultIngredients = newMissingIngredient
            //console.log(this.defaultIngredients)
        }
    },
}
</script>

<style scoped>
.guessed-drink {
    -webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.victory--false {
    border: 1px solid #AD2831;
    ;
    transition: 0.2s;
}

.victory--true {
    border: 1px solid #B2E364;
    transition: 0.2s;

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
    max-width: 360px;
    max-height: 360px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    justify-items: center;
    /* centrer horizontalement */
    align-items: center;
    /* centrer verticalement */
    grid-gap: 0;
    overflow: hidden;
    -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.top-div {
    border-color: 1px solid black;
    color: white;
    padding: 20px 10px;
    overflow: visible;
    background-color: #0F0F0F;
    color: white;
}

.infoDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.resultDiv .pushable{
    margin:10px 0;
}
.scoreDiv{
    display:flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
}
.scoreDiv .combo{
    font-size: 1em;
}
@media (min-width: 1000px) {
    .top-div {
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: transparent;
    }

    .lottie-animation-container {
        min-width: 200px;
        min-height: 200px;
    }

    .resultDiv img {
        width: 180px;
        height: 180px;
    }

    .resultDiv span {
        font-size: 1.5rem;
    }

    .top-div span {
        font-size: 1.5rem;
    }

    .infoDiv {
        background: #0F0F0F;
        border: 1px solid #F88E81;
        border-left: 0px;
        padding: 1rem 1.5rem;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        position: absolute;
        width: 100%;
        left: 0;
        color: white;
        box-shadow: 0 0 20px #7c6c56,
            -5 -5 20px #d3b590;
        -webkit-box-shadow: 0px 0px 34px 5px #000000;
        box-shadow: 0px 0px 34px 5px #000000;

    }

    .coktailInfoDiv {
        background: #0F0F0F;
        border: 1px solid #F88E81;
        border-radius: 3em;
        padding: 1.5em;
        min-width: 550px;
        min-height: 550px;
        color: white;
        margin-top: 175px;
        border-radius: 50px;
        border-radius: 50px;
        transition:0.2s;
        -webkit-box-shadow: 0px 0px 34px 19px #000000;
        box-shadow: 0px 0px 34px 19px #000000;
        
    }
    .float{
        animation: float 6s ease-in-out infinite;
    }
    .impact{
        animation: impact 0.3s cubic-bezier(.49,.49,.21,.92);
    }
}
</style>
