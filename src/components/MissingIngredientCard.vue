<template>
<div class="missingCardDiv">
    <div class="missingCard">
        <span>{{type ? type : 'Misc.'}}</span>
    </div>
    <span class="name">{{type ? type : 'Misc.'}}</span>
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
    width: 70px;
    height: 70px;
    background-color: rgb(105, 105, 105);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    -webkit-animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
    animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
.missingCardDiv {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5px;
    width: 70px;
    transition: flex-basis 0.2s ease-in-out;

}
.missingCard span{
    color: rgb(37, 37, 37);
    font-weight:bold;
}
.name{
    margin-top: 5px;
    font-size: 0.7rem;
    width: 100%;
    visibility: hidden;
}
</style>
