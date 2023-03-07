<template>
<div class="top-div">
    <div class="infoDiv">
        <span>Order : <b>{{randomDrink.strDrink}}</b></span>
        <span>Total score : <b>6</b></span>
    </div>
    <div class="coktailInfoDiv">
        <div class="compositionDiv">
            <IngredientCard @click="removeIngredient(ingredient)" v-for="ingredient in selectedIngredients" :key="ingredient.idIngredient" :name="ingredient.ingredients[0].strIngredient" :good="ingredient.good"></IngredientCard>
        </div>
        <div class="resultDiv">
            <span>Missing ingredients : <b>{{nbMissingIngredients}}</b></span>
            <img v-if="guessedDrink" v-bind:src="guessedDrink.strDrinkThumb" v-bind:alt="guessedDrink.strDrink" :class="[`victory--${victory}`]">
            <img v-else src="../assets/guess.png" alt="Question mark">
            <span>Result :
                <b v-if="guessedDrink"> {{ guessedDrink.strDrink }} </b>
                <b v-else> ? </b>
                <span v-if="victory">, good job !</span>
            </span>
            <button @click="nextOrder()">Next</button>
        </div>
    </div>
</div>
</template>

<script>
import IngredientCard from './IngredientCard.vue';

export default {
    name: 'CompositionSection',
    components: {
        IngredientCard
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
        victory:{
            required: true,
            default: false,
        },
        nbMissingIngredients:{
            required:true,
            default:0,
        }
    },
    methods: {
        nextOrder() {
            this.$emit('next-order');
        },
        removeIngredient(ingredient) {
            this.$emit('ingredient-removed', ingredient);
        }
    }
}
</script>

<style scoped>
.resultDiv button {
    background: white;
    border-radius: 50px;
    padding: 5px;
    width: 150px;
    border: none;
    ;
}
.victory--false{
    border:3px solid red;
    transition: 0.2s;
}
.victory--true{
    border:3px solid rgb(0, 255, 0);
    transition: 0.2s;

}
.resultDiv span {
    margin-top: 5px;
    margin-bottom: 10px;
}

.resultDiv img {
    width: 70%;
    height: auto;
    transition: 0.2s;
    border-radius: 15px;
}

.resultDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 90%;
}

.top-div {
    background-color: rgb(28, 28, 28);
    border-color: 1px solid black;
    color: white;
    height: 400px;
    padding: 20px 10px;
}

.infoDiv {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
}
</style>
