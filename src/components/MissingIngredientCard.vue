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
    background-color: #202531;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border:1px solid #2F323C;
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
    color: #4f5f80;
    font-weight:bold;
    font-size: 0.8rem;

}
.name{
    margin-top: 5px;
    font-size: 0.7rem;
    width: 100%;
    visibility: hidden;
}
</style>
