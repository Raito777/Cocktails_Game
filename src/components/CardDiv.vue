<template>
    <div class="card">
        <p>Test div</p>
        <img src="../assets/logo.png" alt="">
    </div>
</template>


<script>
    export default {
    name: 'CardDiv',
    props: {
        msg: String
    }
    }
</script>

<style scoped>
    .card{
        border:1px solid black;
        width:200px;
        height:400px;
        background-color: aquamarine;
        border-radius: 15px;
        margin:10px;
        transition:0.2s;
    }
    .card:hover{
        transform: scale(120%);
    }
    img{
        display: block;
        max-width:230px;
        max-height:150px;
        width: auto;
        height: auto;
    }
    
</style>