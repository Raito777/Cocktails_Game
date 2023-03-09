<template>
<div :class="['ingredientCard', `card--${size}`, `card--${hidden}`]">
    <div :class="['ingredientDivImg', `card--${good}`]">
        <img :src="'https://www.thecocktaildb.com/images/ingredients/'+ name +'-Medium.png'">
        <span>{{ name }}</span>
    </div>
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
	-webkit-animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
    animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}

.card--true {
    border: 1px solid #2F323C;
    background: linear-gradient(#202531, #202531) padding-box,
              linear-gradient(to bottom, #2F323C, rgb(0, 255, 26)) border-box;
    border-radius: 50em;
    border: 1px solid transparent;
    color :white;
    color: white;
}

.card--false {
    border: 1px solid #2F323C;
    background: linear-gradient(#202531, #202531) padding-box,
              linear-gradient(to bottom, #2F323C, rgb(255, 0, 0)) border-box;
    border-radius: 50em;
    border: 1px solid transparent;
    color :white 
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

.card--normal .ingredientDivImg {
    width: 60px;
    height: 60px;
    position:relative;
    display:flex;
    flex-direction: column;
    padding:5px;

}

.card--large .ingredientDivImg span{
    display: none;
}
.card--large .ingredientDivImg {
    border:1px solid #2F323C;
    margin-top:20px;
    width: 110px;
    height: 110px;
    display:flex;
    justify-content: center;
    align-items: flex-end;
    position:relative;
}
.card--large .ingredientDivImg span{
    display:block;
    margin-bottom:5px;
    font-weight: bold;
    font-size:0.6rem;
}
.card--large span{
    display:none;
}
.card--large .ingredientDivImg img{
    position:absolute;
    top:-20px;
    width: 90%;
    filter: drop-shadow(0px 6px 9px #000);
	-webkit-animation: swing-in-bottom-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.1s;
    animation: swing-in-bottom-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.1s;
}
.ingredientDivImg {
    background-color:#202531;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}

.ingredientDivImg img {
    width: 60%;
    height: auto;
}

</style>
