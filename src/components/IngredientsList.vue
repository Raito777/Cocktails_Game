<template>
<div class="ingredientsList">
    <div class="orderBar">
        <div class="barOrder speech-bubble">
            <span>Boy, a <b>{{randomDrink.strDrink}} !</b></span>
            <span class="sentence" id="barManSentence"></span>

            <!-- <input type="text" v-model="search" placeholder="Search for ingredients or types"> -->
        </div>
        <img class="barman" src="../assets/crew0.png">
        <div class="historic-section">
            <span>Drinks served</span>
            <div class="historic-div">
                <div class="historic-content">
                    <DrinkHistoryCard
                        v-for="drink in drinksHistory"
                        :key=" drink.idIngredient"
                        :drink="drink"></DrinkHistoryCard>
                </div>
            </div>
        </div>
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
import DrinkHistoryCard from './DrinkHistoryCard.vue';

export default {
    name: 'IngredientsList',
    components: {
        IngredientCard,
        DrinkHistoryCard
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
        drinksHistory: {},

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
hr {
    display: none;
}

.ingredientsList {
    display: grid;
    grid-template-rows: 0.2fr 1fr;
    grid-template-areas:
        "orderBar"
        "ingredientsDiv";
}

.ingredientsDiv {
    overflow: hidden;
    background-color: rgb(28, 28, 28);
    color: white;
    height: 100%;
    grid-area: ingredientsDiv;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    justify-items: center;
    -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.orderBar .barOrder {
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

.orderBar .barman {
    position: absolute;
    width: 100px;
    height: auto;
    bottom: 0;
    right: 10px;
	-webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.3s both;
    animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.3s both;
}
.historic-section span{
    padding-left:50px;
}
.historic-section{
    display:none;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    color:white;
    -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both 0.1s;
    animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both 0.1s;
}
.historic-div {
    background: #0F0F0F;
    border: 1px solid #F88E81;
    width: 350px;
    height: 110px;
    display: flex;
    align-self: flex-end;
    align-items: center;

    padding: 0.6rem 0.8rem;
    margin:5px;
    margin-bottom:20px;
    overflow-y: hidden;
    border-radius: 20rem;
    -webkit-box-shadow: 0px 0px 34px 5px #000000;
    box-shadow: 0px 0px 34px 5px #000000;
}

.historic-content {
    width: 350px;
    height: 110px;
    overflow-x: scroll;
    display: flex;
    border-radius: 20rem;

}
.speech-bubble{
    -webkit-animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both 0.8s;
    animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both 0.8s;
}

@media (min-width: 1000px) {
    .ingredientsList {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
            "orderBar"
            "ingredientsDiv";
    }

    .orderBar .barman {
        width: 250px;
        max-width: 250px;
        z-index: 1
    }

    .orderBar {
        background-color: transparent;
    }

    .orderBar .barOrder {
        padding: 10px;
        position: absolute;
        top: 2em;
        right: 13em;
    }

    .orderBar span {
        margin: 5px 10px;
    }

    .speech-bubble {
        position: relative;
        margin: .5em auto;
        padding: 1em;
        width: 20em;
        height: 6.2em;
        border-radius: .25em;
        transform: rotate(-4deg) rotateY(15deg);
        background: #ED6D6D;
        font: Century Gothic, Verdana, sans-serif;
        text-align: center;
        color: #0D0D0D
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
        border-bottom: solid .25em #ED6D6D;
        bottom: .25em;
        right: 1.25em;
        width: 0;
        height: 1em;
        transform: rotate(45deg) skewX(75deg);
    }

    .ingredientsDiv {
        background: #0F0F0F;
        border: 1px solid #F88E81;
        border-bottom: 0px;
        border-right: 0px;
        overflow: hidden;
        border-top-left-radius: 5rem;
        padding: 2rem 1rem 1rem 2rem;
        -webkit-box-shadow: 0px 0px 34px 19px #000000;
        box-shadow: 0px 0px 34px 19px #000000;
        transition:0.2s;
    }
    .ingredientsDiv:hover{
        transform:scale(80%);
    }

    hr {
        display: block;
        width: 100%;
        height: 1em;
        position: absolute;
        z-index: 2;
        bottom: -1em;
        right: -8em;
        margin: 0;
        border-radius: 5em;
        border: none;
        background-color: white;
    }

    .historic-section {
        display: flex;

    }

}
</style>
