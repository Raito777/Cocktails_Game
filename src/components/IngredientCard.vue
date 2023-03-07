<template>
    <div :class="['ingredientCard', `card--${size}`, `card--${hidden}`]">
        <div :class="['ingredientDivImg', `card--${good}`]">
            <img :src="'https://www.thecocktaildb.com/images/ingredients/'+ name +'-Small.png'">
        </div>
        <span>{{ name }}</span>
    </div>
</template>

<script>
    export default {
    name: 'IngredientCard',
    components: {

    },
    props: {
        msg: String,
        size: {
            type: String,
            default: 'normal',
            validator:(value) => ['normal', 'large'].includes(value),
        },
        name: {
            type: String,
            default: 'not found'
        },
        hidden:{
            type: String,
            default: 'visible'
        },
        good:{
            type: String,
            default: 'default'
        }
    }
    }

</script>

<style scoped>

   .ingredientCard{
        display:flex;
        flex-direction: column;
        align-items: flex-start;
        margin:5px;
        width:70px;
        transition:flex-basis 0.2s ease-in-out;
        
    }

    .card--true{
        border: 2px solid rgb(0, 255, 0)
    }
    .card--false{
        border: 2px solid rgb(255, 0, 0)
    }
    .card--default{
        border: none;

    }
    .card--visible{
        
    }
    .card--hidden{
        display:none;
    }
    .ingredientCard span{
        margin-top:5px;
        font-size:0.7rem;
        width:100%;
    }

    .card--large {
        width:110px;

    }
    .card--normal{
        width:70px;
    }
    .card--large .ingredientDivImg{
        width:110px;
        height:110px;
    }
    .card--normal .ingredientDivImg{
        width:70px;
        height:70px;
    }

    .ingredientDivImg{

        background-color: rgb(105, 105, 105);
        display:flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
    }
    .ingredientDivImg img{
        width:75%;
        height:auto;
    }
</style>