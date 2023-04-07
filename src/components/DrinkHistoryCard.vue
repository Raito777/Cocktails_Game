<template>
<div class="a-drink">
    <div class="hover-info-div">
        <span v-for="ingredient in drink"
            :key="ingredient.idIngredient"></span>
    </div>

    <img v-if="drink" v-bind:src="drink.strDrinkThumb">
</div>
</template>

<script>
export default {
    name: 'DrinkHistoryCard.vue',
    components: {

    },
    props: {
        drink:{},
    }
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

.a-drink span {
    font-size: 0.6em;
}

.a-drink img {
    position: relative;
    width: 80px;
    border-radius: 100%;
}
</style>
