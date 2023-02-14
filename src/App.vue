<template>
  <div>
    <h1>
      Galery
    </h1>
  </div>
  <GalleryDiv msg="1er test"></GalleryDiv>
  <div class="message">
    <h2>Ceci est un message</h2>
    <div class="quoteDiv">
      <QuoteDiv msg="quote"></QuoteDiv>
      <QuoteDiv msg="quote"></QuoteDiv>
    </div>
  </div>
</template>

<script>
import GalleryDiv from './components/GalleryDiv';
import QuoteDiv from './components/QuoteDiv';

export default {
  name: 'App',
  components: {
    GalleryDiv,
    QuoteDiv
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  padding:0;
}
html {
  margin:0;
  padding:0;
}
body{
  margin:0;
  padding:0;
}
.message{
  background-color:rgb(255, 196, 196);
  padding:50px;
}
.quoteDiv{
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
