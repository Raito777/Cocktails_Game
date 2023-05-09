<template>

<!-- Simple card with the image of the order -->
<div class="a-drink" v-if="drink" v-tooltip="{ content: 'Informations sur le contenu' }">
    <!-- 
        <div class="hover-info-div" >
        <span v-for="ingredient in drink.ingredients"
            :key="ingredient.idIngredient"> {{ ingredient.strIngredient }}</span>
        </div>
    -->
    <img v-bind:src="drink.strDrinkThumb">

</div>

</template>

<script>
export default {
    name: 'DrinkHistoryCard.vue',
    components: {

    },
    props: {
        drink:{},
    },
    
}
</script>

<style scoped>
.a-drink {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px 10px;
}

* .hover-info-div{
    display:flex;
    flex-direction: column;
    position: relative;
    background-color: aquamarine;
    top: 0;
    transform: translateY(-100%);
}

.a-drink img {
    width: 80px;
    border-radius: 100%;
}
</style>
