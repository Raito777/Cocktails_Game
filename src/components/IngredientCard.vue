<template>
<div :class="['ingredientCard', `card--${size}`, `card--${hidden}`]">
    <div :class="['ingredientDivImg', `card--${good}`]">
        <img :src="'https://www.thecocktaildb.com/images/ingredients/'+ name +'-Small.png'">
        <span>{{ name }}</span>
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
            validator: (value) => ['normal', 'large'].includes(value),
        },
        name: {
            type: String,
            default: 'not found'
        },
        hidden: {
            type: String,
            default: 'visible'
        },
        good: {
            type: String,
            default: 'default'
        }
    }
}
</script>



<style scoped>
  @import '../assets/styles/style.css';


.ingredientCard {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5px;
    width: 70px;
    transition: flex-basis 0.2s ease-in-out;
	-webkit-animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
    animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}

.card--true {
    border: 2px solid rgb(0, 255, 0)
}

.card--false {
    border: 2px solid rgb(255, 0, 0)
}

.card--default {
    border: none;

}

.card--visible {}

.card--hidden {
    display: none;
}

.ingredientCard span {
    margin-top: 5px;
    font-size: 0.7rem;
    width: 100%;
}

.card--large {
    width: 110px;
}
.card--normal {
    width: 70px;
}

.card--large .ingredientDivImg {
    width: 110px;
    height: 110px;
    position:relative;
}

.card--large .ingredientDivImg span{
    display: none;
}
.card--normal .ingredientDivImg {
    margin-top:20px;
    width: 70px;
    height: 70px;
    display:flex;
    justify-content: center;
    align-items: flex-end;
    position:relative;
}
.card--normal .ingredientDivImg span{
    display:block;
    margin-bottom:5px;
    font-weight: bold;
    font-size:0.6rem;
}
.card--normal span{
    display:none;
}
.card--normal .ingredientDivImg img{
    position:absolute;
    top:-20px;
    width: 90%;
}
.ingredientDivImg {
    background-color: rgb(105, 105, 105);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}

.ingredientDivImg img {
    width: 75%;
    height: auto;
}

</style>
