//Ejecuta los elementos contenidos en el init una vez cargada la página
document.addEventListener("DOMContentLoaded", init);




//Se ejecuta cuando carga el codumento
function init() {
  var htmlButton = document.getElementById("buscar");
  htmlButton.addEventListener("click",searchCocktail);

  var htmlButton2 = document.getElementById("mostrarTodo");
  htmlButton2.addEventListener("click",showAllCocktailsByLetter);

  var htmlButton3 = document.getElementById("ocultarTodo");
  htmlButton3.addEventListener("click",hideGallery);


  var htmlButton4 = document.getElementById("desplegarLista");
  htmlButton4.addEventListener("click",showAllNames);


  var htmlButton5 = document.getElementById("ocultarLista");
  htmlButton5.addEventListener("click", deleteList);

  var htmlButton6 = document.getElementById("mostrarTodosG");
  htmlButton6.addEventListener("click", showAllCocktailsInGallery);

  var htmlButton7 = document.getElementById("mostrarTodosL");
  htmlButton7.addEventListener("click", showAllCocktailsInList);
}


/**
 * muestra todos los cócteles en galería
 */
 function showAllCocktailsInGallery(event){
  event.preventDefault();
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','v','w','x','y','z'];
  var gallery = document.getElementById("gallery");
  removeAllChilds(gallery);
  alphabet.forEach(value => {
    event.preventDefault();
    var actual = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='+value;
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
  });
}


/**
 * muestra todos los cócteles en la lista
 */
 function showAllCocktailsInList(event){
  event.preventDefault();
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','v','w','x','y','z'];
  var listCocktail = document.getElementById("listCocktail");
  removeAllChilds(listCocktail);
  alphabet.forEach(value =>{
    var actual = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='+value;
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
  });
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
function showAllCocktailsByLetter(event){
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


/**
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
  if (actualCocktail()!=""){
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
  } else {  
    var galeria = document.getElementById("gallery");
    removeAllChilds(galeria);
    let htmlP = document.createElement("p");
    htmlP.textContent="Indique un nombre";
    galeria.appendChild(htmlP); 
  }
}





