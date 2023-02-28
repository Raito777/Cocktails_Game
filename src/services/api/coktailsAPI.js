const getRandomCoktail = async function() {

    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    if(response.status == 200){
      return response.json()    
    }else{
      new Error(response.statusText)
    }

}

export { getRandomCoktail }