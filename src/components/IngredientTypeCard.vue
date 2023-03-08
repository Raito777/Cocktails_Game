<template>
<div class="missingCardDiv">
    <div class="missingCard">
        <span>name</span>
    </div>
</div>
</template>

    
<script>
export default {
    name: 'IngredientTypeCard',
    components: {

    },
    props: {
        msg: String,
        ingredients: {
            required: true,
        },
    }
}
</script>

    
<style scoped>
.missingCard {
    width: 70px;
    height: 70px;
    background-color: rgb(105, 105, 105);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}

.missingCardDiv {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5px;
    width: 70px;
    transition: flex-basis 0.2s ease-in-out;
}

.missingCard span {
    color: rgb(37, 37, 37);
    font-weight: bold;
}

.name {
    margin-top: 5px;
    font-size: 0.7rem;
    width: 100%;
    visibility: hidden;
}
</style>
