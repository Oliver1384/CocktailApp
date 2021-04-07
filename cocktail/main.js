//Ejecuta los elementos contenidos en el init una vez cargada la página
document.addEventListener("DOMContentLoaded", init);


//Busca un cocktail por nombre y devuelve su imagen
function init() {
 fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then(response => response.json())
  .then(data => {
      var img = document.getElementById("example");
      img.src= data.drinks[0].strDrinkThumb;
  });
}




  