//objeto json de ejemplo convertido a objeto de javascript
/*var myJSON = '{"name":"John", "age":31, "city":"New York"}';
var myObj = JSON.parse(myJSON);
console.log(this.myObj);*/


//Busca un cocktail por nombre y devuelve su imagen
function init() {
 fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then(response => response.json())
  .then(data => {
      console.log(data.drinks[0].strImageSource);
      // cambiar página
      var img = document.getElementById("example");
      img.src= data.drinks[0].strDrinkThumb;
  });
}

document.addEventListener("DOMContentLoaded", init);



  