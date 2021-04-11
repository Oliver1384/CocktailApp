//Ejecuta los elementos contenidos en el init una vez cargada la página
document.addEventListener("DOMContentLoaded", init);


//Busca un cocktail por nombre y devuelve su imagen
function init() {
  var htmlButton = document.getElementById("buscar");
  htmlButton.addEventListener("click",searchCocktail);

  var htmlButton2 = document.getElementById("mostrarTodo");
  htmlButton2.addEventListener("click",showAllCocktails);

  var htmlButton2 = document.getElementById("ocultarTodo");
  htmlButton2.addEventListener("click",hideGallery);

}




/**
 * elimina todos los hijos del elemento pasado por parámetro
 * @param {Object}
 */
function removeAllChilds(element) {
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }
}

/**
 * vacía la galería
 */
function hideGallery(){
  var gallery =document.getElementById("gallery");
  removeAllChilds(gallery);
}


/**
 * muestra todos los cocktails
 */
function showAllCocktails(){
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
  .then(response => response.json())//convierte objeto json a objeto javascript
  .then(data => {
      data.drinks.forEach(element => {
        var img = document.getElementById("gallery");
        let htmlImg = document.createElement("img");
        htmlImg.src= element.strDrinkThumb;
        img.appendChild(htmlImg); 
      });
  });
}


/**
 * Optiene el valor de busqueda del html
 * @return  {String}
 */
 function actualCocktail(){
  let htmlInput = document.getElementById("busquedaCocktail");
  return htmlInput.value;
}



/**
 * busca y devuelve el objeto 
 * @return  {Object}
 */
function searchCocktail(event){
  event.preventDefault();
  var actual = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+actualCocktail();
  fetch(actual)
  .then(response => response.json())//convierte objeto json a objeto javascript
  .then(data => {//añade la imagen al documento
    var galeria = document.getElementById("gallery");
    removeAllChilds(galeria);
    let htmlImg = document.createElement("img");
    htmlImg.src= data.drinks[0].strDrinkThumb;
    galeria.appendChild(htmlImg); 
  });
}





