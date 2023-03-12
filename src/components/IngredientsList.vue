<template>
<div class="ingredientsList">
    <div class="orderBar">
        <div class="barOrder speech-bubble">
            <span>Boy, a <b>{{randomDrink.strDrink}} !</b></span>
            <span class="sentence" id="barManSentence"></span>

            <!-- <input type="text" v-model="search" placeholder="Search for ingredients or types"> -->
        </div>
        <img src="../assets/crew0.png">
        <hr>
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
        barManSentence: {
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
hr{
    display:none;
}
.ingredientsList {
    display: grid;
    grid-template-rows: 0.2fr 1fr;
    grid-template-areas:
        "orderBar"
        "ingredientsDiv";
}

.ingredientsDiv {
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: rgb(28, 28, 28);
    color: white;
    height: 100%;
    grid-area: ingredientsDiv;
    display: grid;
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
    grid-area: orderBar;
    background-color: white;

}

.orderBar input {
    background-color: rgb(42, 42, 42);
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    padding: 10px 15px;
    color: white;
    width: 55vw;
    outline: none;
}

.orderBar span {
    margin: 0 5px 10px 5px;
    font-size: 1.2rem;

}

.orderBar .sentence {
    overflow: hidden;
    /* Ensures the content is not revealed until the animation */
    white-space: nowrap;
    /* Keeps the content on a single line */
    margin: 0 auto;
    /* Gives that scrolling effect as the typing happens */
    letter-spacing: .0em;
    /* Adjust as needed */
    font-size: 1.1rem;

}

.animateSentence {
    animation:
        typing 0.7s steps(20, end)
}

.orderBar img {
    position: absolute;
    width: 100px;
    height: auto;
    bottom: 0;
    right: 10px;
}

@media (min-width: 1000px) {
    .ingredientsList {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
            "orderBar"
            "ingredientsDiv";
    }

    .orderBar img {
        width: 250px;
        max-width:250px;
        z-index: 1
    }

    .orderBar {
        background-color: #13161E;
    }

    .orderBar .barOrder {
        padding: 10px;
        position: absolute;
        top:2em;
        right:13em;
    }
    .orderBar span{
        margin:5px 10px;
    }
    .speech-bubble {
        position: relative;
        margin: .5em auto;
        padding: 1em;
        width: 20em;
        height: 6.2em;
        border-radius: .25em;
        transform: rotate(-4deg) rotateY(15deg);
        background: #629bdd;
        font: Century Gothic, Verdana, sans-serif;
        text-align: center;
    }

    .speech-bubble:before,
    .speech-bubble:after {
        position: absolute;
        z-index: -1;
        content: '';
    }

    .speech-bubble:after {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: inherit;
        transform: rotate(2deg) translate(.35em, -.15em) scale(1.02);
        background: #f4fbfe;
    }

    .speech-bubble:before {
        border: solid 0 transparent;
        border-right: solid 3.5em #f4fbfe;
        border-bottom: solid .25em #629bdd;
        bottom: .25em;
        right: 1.25em;
        width: 0;
        height: 1em;
        transform: rotate(45deg) skewX(75deg);
    }

    .ingredientsDiv{
        background-color: #13161E;
        overflow:hidden;
        padding-top:4em;
    }
    hr{
        display: block;
        width:100%;
        height:1em;
        position:absolute;
        z-index: 2;
        bottom: -1em;
        right:-8em;
        margin:0;
        border-radius: 5em;
        border:none;
        background-color: white;
    }


}
</style>
