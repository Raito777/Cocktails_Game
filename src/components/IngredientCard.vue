<template>
<div :class="['ingredientCard', `card--${size}`, `card--${hidden}`, `card--${index}`]">
    <div :class="['ingredientDivImg', `card--${size}`, `card--${hidden}`]">
        <svg v-if="checked == 'false'" width="100%" height="100%" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <g transform="matrix(0.780956,-0.780956,1.17148,1.17148,-143.904,81.6532)">
                <path
                    d="M201.792,84.754C201.792,63.642 176.08,46.502 144.411,46.502C112.742,46.502 87.031,63.642 87.031,84.754L87.031,395.195C87.031,416.307 112.742,433.447 144.411,433.447C176.08,433.447 201.792,416.307 201.792,395.195L201.792,84.754Z"
                    style="fill:white;" />
            </g>
            <g transform="matrix(-0.780956,-0.780956,-1.17148,1.17148,643.904,81.6532)">
                <path
                    d="M201.792,84.754C201.792,63.642 176.08,46.502 144.411,46.502C112.742,46.502 87.031,63.642 87.031,84.754L87.031,395.195C87.031,416.307 112.742,433.447 144.411,433.447C176.08,433.447 201.792,416.307 201.792,395.195L201.792,84.754Z"
                    style="fill:white;" />
            </g>
        </svg>
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
        checked: {
            type: String,
            default: "true"
        },
        index:{
            default: 0
        }
    }
}
</script>

<style scoped>
@import '../assets/styles/style.css';
.ingredientDivImg svg{
    position:absolute;
    z-index:1;
    width:50%;
    -webkit-animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
    animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.ingredientCard {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5px;
    transition: flex-basis 0.2s ease-in-out;
}

.card--0{
    -webkit-animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
    animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.card--1{
    -webkit-animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.2s;
    animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.2s;
}
.card--2{
    -webkit-animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.4s;
    animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.4s;
}
.card--3{
    -webkit-animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.6s;
    animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.6s;
}
.card--true {
    border: 1px solid #2F323C;
    background: linear-gradient(#202531, #202531) padding-box,
        linear-gradient(to bottom, #2F323C, rgb(0, 255, 26)) border-box;
    border-radius: 50em;
    border: 1px solid transparent;
    color: white;
    color: white;
}

.card--false {
    border: 1px solid #2F323C;
    background: linear-gradient(#202531, #202531) padding-box,
        linear-gradient(to bottom, #2F323C, rgb(255, 0, 0)) border-box;
    border-radius: 50em;
    border: 1px solid transparent;
    color: white
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
    font-size: 0.6rem;
    width: 100%;
}

.card--large {
    width:100%;
    height:100%;}

.card--normal {
    width: 70px;
}

.card--normal .ingredientDivImg {
    width: 80px;
    height: 80px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 5px;

}

.card--large .ingredientDivImg span {
    display: none;
}

.card--large .ingredientDivImg {
    border: 1px solid #2F323C;
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    position: relative;
    border-radius:0;
}

.card--large .ingredientDivImg span {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 1 rem;
}

.card--large span {
    display: none;
}

.card--large .ingredientDivImg img {
    width: 60%;
    filter: drop-shadow(0px 6px 9px #000);
    -webkit-animation: swing-in-bottom-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.1s;
    animation: swing-in-bottom-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both 0.1s;
}

.ingredientDivImg {
    background-color: #202531;
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
