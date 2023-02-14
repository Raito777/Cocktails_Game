<template>
    <div class="quote">
        <p>"Ceci est une citation super géniale"</p>
    </div>
</template>

<script>
    export default {
    name: 'QuoteDiv',
    props: {
        msg: String
    }
    }
</script>

<style scoped>
    .quote{
        border:1px solid black;
        background-color: aquamarine;
        border-radius: 15px;
        margin:10px;
        padding:15px;
    }
    
</style>