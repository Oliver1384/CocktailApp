//Ejecuta los elementos contenidos en el init una vez cargada la página
document.addEventListener("DOMContentLoaded", init);


//Se ejecuta cuando carga el codumento (Disparadores)
function init() {
  var htmlButton = document.getElementById("buscar");
  htmlButton.addEventListener("click",searchCocktail);

  var htmlButton2 = document.getElementById("mostrarTodo");
  htmlButton2.addEventListener("click",showAllCocktails);

  var htmlButton3 = document.getElementById("ocultarTodo");
  htmlButton3.addEventListener("click",hideGallery);


  var htmlButton4 = document.getElementById("desplegarLista");
  htmlButton4.addEventListener("click",showAllNames);


  var htmlButton5 = document.getElementById("ocultarLista");
  htmlButton5.addEventListener("click", deleteList);

  var htmlButton6 = document.getElementById("conAlcohol");
  htmlButton6.addEventListener("click", showDrinks('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'));

  var htmlButton7 = document.getElementById("sinAlcohol");
  htmlButton7.addEventListener("click", showDrinks('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'));
  

}


/**
 * limplia los elemento de la lista
 */
function deleteList(event){
  event.preventDefault();
  var listCocktail = document.getElementById("listCocktail");
  removeAllChilds(listCocktail);
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
function hideGallery(event){
  event.preventDefault();
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
  var actual = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='+actualLetter();
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


/**showNoAlcoholicDrinks
 * muestra todos los cócteles con la letra a
 */
function showAllNames(event){
  event.preventDefault();
  var actual = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='+actualLetter();
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
    data.drinks.forEach(value => {
      let htmlImg = document.createElement("img");
      let htmlNombre = document.createElement("p");
      let htmlDiv = document.createElement("div");
      htmlNombre.append(value.strDrink);
      htmlImg.src= value.strDrinkThumb;
      htmlDiv.appendChild(htmlNombre);
      htmlDiv.appendChild(htmlImg);
      galeria.appendChild(htmlDiv); 
    });
  });
}


/**
 * Carga en la página las imágenes de bebidas con o sin alcohol dependiendo de la 
 * url pasada por parámetro
 * @param {*} url 
 */
function showDrinks(url){
  return event => {
  event.preventDefault();
  var actual = url;
  var listCocktail = document.getElementById("gallery");
  removeAllChilds(listCocktail);
  fetch(actual)
  .then(response => response.json())
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
}






