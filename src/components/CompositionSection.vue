<template>
    <div class="top-div">
        <div class="infoDiv">
            <span>Order : <b>Pina-colada</b></span>
            <span>Total score : <b>6</b></span>
        </div>
        <div class="coktailInfoDiv">
            <div class="compositionDiv">
                <IngredientCard :name="'Vodka'"></IngredientCard>

            </div>
            <div class="resultDiv">
                <img :src="drink.drinkUrl">
                <span>Result : <b>{{drink.drinkName}}</b></span>
                <button>Send</button>
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
        drink: {
            type: Object,
            required: true,
        },
    }
    }
</script>

<style scoped>
    .resultDiv button{
        background: white;
        border-radius:50px;
        padding:5px;
        width:150px;
        border:none;;
    }
    .resultDiv span{
        margin-top:5px;
        margin-bottom:10px;
    }
    .resultDiv img{
        width:70%;
        height:auto;
        transition:0.2s;
    }
    .resultDiv{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding:10px;
    }
    .compositionDiv{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        overflow-y:scroll;
        overflow-x:hidden;
    }
    .coktailInfoDiv{
        width:100%;
        display:grid;
        grid-template-columns: 1fr 1fr;
        height:90%;
    }
    .top-div{
        background-color: rgb(28, 28, 28);
        border-color: 1px solid black;
        color:white;
        height:500px;
        padding:20px 10px;
    }
    .infoDiv{
        display:flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom:10px;
    }

</style>