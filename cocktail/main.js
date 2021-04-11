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


  var htmlButton3 = document.getElementById("buscar2");
  htmlButton3.addEventListener("click",showAllNames);

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
 * Optiene el valor de busqueda del html
 * @return  {String}
 */
 function actualLetter(){
  let htmlInput = document.getElementById("busquedaPorLetra");
  return htmlInput.value;
}


/**
 * muestra todos los cocktails
 */
function showAllCocktails(event){
  event.preventDefault();
  var actual = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+actualLetter();
  var gallery = document.getElementById("gallery");
  removeAllChilds(gallery);
  fetch(actual)
  .then(response => response.json())//convierte objeto json a objeto javascript
  .then(data => {
      data.drinks.forEach(element => {
        var gallery = document.getElementById("gallery");
        let htmlActual = document.createElement("div");
        let htmlNombre = document.createElement("p");
        let htmlImg = document.createElement("img");
        htmlImg.src= element.strDrinkThumb;
        htmlNombre.append(element.strDrink);
        htmlActual.appendChild(htmlNombre)
        htmlActual.appendChild(htmlImg)
        gallery.appendChild(htmlActual); 
      });
  });
}


/**
 * muestra todos los cócteles con la letra a
 */
function showAllNames(event){
  event.preventDefault();
  var actual = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+actualLetter();
  var listCocktail = document.getElementById("listCocktail");
  removeAllChilds(listCocktail);
  fetch(actual)
  .then(response => response.json())//convierte objeto json a objeto javascript
  .then(data => {
      data.drinks.forEach(element => {
        var listCocktail = document.getElementById("listCocktail");
        let htmlLi = document.createElement("li");
        htmlLi.append(element.strDrink);
        listCocktail.appendChild(htmlLi);
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





