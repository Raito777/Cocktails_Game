<template>
<div class="missingCardDiv">
    <div class="missingCard">
        <span v-if="type != 'default'">{{type ? type : 'Misc.'}}</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'MissingIngredientCard',
    components: {

    },
    props: {
        msg: String,
        type: {
            type: String,
            default: 'Misc.'
        },
        name: {
            type: String,
            default: 'Misc.'
        },
    }
}
</script>

<style scoped>
.missingCard {
    width: 60px;
    height: 60px;
    background: #034167;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border:0px solid #D95A4E;
    -webkit-animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
    animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
    padding:5px;
}
.missingCardDiv {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: flex-basis 0.2s ease-in-out;

}
.missingCard span{
    font-weight:bold;
    font-size: 0.7rem;
}
.name{
    margin-top: 5px;
    font-size: 0.7rem;
    width: 100%;
    visibility: hidden;
}

@media (min-width: 1000px){
    .missingCard span{
        font-size:1em;
    }
}
@media (max-width: 420px){
    .missingCard span{
        font-size:0.5em;
    }
}
</style>
