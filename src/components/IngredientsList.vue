<template>
<div class="ingredientsList">
    <div class="orderBar">
        <div>
            <span>Boy, a <b>{{randomDrink.strDrink}} !</b></span>
            <input type="text" v-model="search" placeholder="Search for ingredients or types">
        </div>
        <img src="../assets/crew0.png">
    </div>
    <div class="ingredientsDiv">
        <IngredientCard
            size="large"
            @click="addIngredient(ingredient)"
            v-for="ingredient in filteredIngredients"
            :key="ingredient.idIngredient"
            :name="ingredient.ingredients[0].strIngredient"
            :hidden="ingredient.hidden">
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
        }
    },
    computed: {
        filteredIngredients() {
            let defaultMisc = "misc."
            return this.ingredients.filter((ingredient) => {
                if (ingredient.ingredients[0].strIngredient.toLowerCase().includes(this.search.toLowerCase()) ||
                    ingredient.ingredients[0].strType != null && ingredient.ingredients[0].strType.toLowerCase().includes(this.search.toLowerCase())) {
                    ingredient.hidden = "visible";
                } else if (ingredient.ingredients[0].strType == null && defaultMisc.includes(this.search.toLowerCase())) {
                    ingredient.hidden = "visible";
                } else {
                    ingredient.hidden = "hidden";
                }
                return ingredient;
            });
        }
    },
    methods: {
        addIngredient(ingredient) {
            this.$emit('ingredient-added', ingredient);
        }
    }
}
</script>

<style scoped>
.ingredientsDiv {
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    background-color: rgb(28, 28, 28);
    color: white;
    padding: 20px 10px;
    justify-content: space-around;
    height:100%;
    min-height:300px;
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
}

.orderBar img {
    position: absolute;
    width: 150px;
    height: auto;
    bottom: 0;
    right: 10px;
}
</style>
