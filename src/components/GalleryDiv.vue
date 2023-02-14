<template>
    <div>
        <CardDiv></CardDiv>
        <CardDiv></CardDiv>
        <CardDiv></CardDiv>
        <CardDiv></CardDiv>
    </div>
</template>

<script>
    import CardDiv from './CardDiv.vue';
    export default {
    name: 'GalleryDiv',
    components: {
    CardDiv
    },
    props: {
        msg: String
    }
    }
</script>

<style scoped>
    div{
        display:flex;
        justify-content: center;
        flex-wrap: wrap;
        background-color: antiquewhite;
        border-color: 1px solid black;
        padding:25px;
    }
</style>