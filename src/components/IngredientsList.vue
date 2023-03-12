<template>
<div class="ingredientsList">
    <div class="orderBar">
        <div class="barOrder">
            <span>Boy, a <b>{{randomDrink.strDrink}} !</b></span>
            <span class="sentence" id="barManSentence"></span>

            <!-- <input type="text" v-model="search" placeholder="Search for ingredients or types"> -->
        </div>
        <img src="../assets/crew0.png">
    </div>
    <div class="ingredientsDiv">
        <IngredientCard
            size="large"
            @click="addIngredient(ingredient)"
            v-for="ingredient in ingredients"
            :key="ingredient.idIngredient"
            :name="ingredient.strIngredient"
            :hidden="ingredient.hidden"
            :checked="ingredient.good"
            :index="ingredient.index">
        </IngredientCard>

    </div>
</div>
</template>

<script>
import IngredientCard from './IngredientCard.vue';

export default {
    name: 'IngredientsList',
    components: {
        IngredientCard
    },
    data() {
        return {
            search: "",
        }
    },
    props: {
        msg: String,
        ingredients: {
            required: true,
        },
        randomDrink: {
            required: true,
        },
        sortedIngredients: {
            required: true,
        },
        barManSentence:{
            type: String,
            required: true
        },

    },
    computed: {
        // filteredIngredients() {
        //     let defaultMisc = "misc."
        //     return this.ingredients.filter((ingredient) => {
        //         if (ingredient.strIngredient.toLowerCase().includes(this.search.toLowerCase()) ||
        //             ingredient.strType != null && ingredient.strType.toLowerCase().includes(this.search.toLowerCase())) {
        //             ingredient.hidden = "visible";
        //         } else if (ingredient.strType == null && defaultMisc.includes(this.search.toLowerCase())) {
        //             ingredient.hidden = "visible";
        //         } else {
        //             ingredient.hidden = "hidden";
        //         }
        //         return ingredient;
        //     });
        // }
    },
    methods: {
        addIngredient(ingredient) {
            this.$emit('ingredient-added', ingredient);
        }
    }
}
</script>

<style scoped>
.ingredientsList{
    display:grid;
    grid-template-rows: 0.2fr 1fr;
}
.ingredientsDiv {
    overflow-y: scroll;
    overflow-x:hidden;
    background-color: rgb(28, 28, 28);
    color: white;
    height:100%;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    justify-items: center;
}
.orderBar div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.orderBar {
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: space-between;
    position: relative;
}

.orderBar input {
    background-color: rgb(42, 42, 42);
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    padding: 10px 15px;
    color: white;
    width:55vw;
    outline:none;
}

.orderBar span {
    margin: 0 5px 10px 5px;
    font-size:1.2rem;

}
.orderBar .sentence{
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    letter-spacing: .0em; /* Adjust as needed */
    font-size:1.1rem;

}

.animateSentence{
    animation: 
    typing 0.7s steps(20, end)
}
.orderBar img {
    position: absolute;
    width: 150px;
    height: auto;
    bottom: 0;
    right: 10px;
}
</style>
