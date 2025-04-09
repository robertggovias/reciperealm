const miApiKey = "e0f6e22e1f944acaaec181c9e011de7b";
const recipeId = 648506;
function pepe(){
    window.open("../pages/recipe.html")}
    

fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${miApiKey}`)
    .then(escucha => escucha.json())
    .then((creandoObjeto)=> {      
        document.getElementById("recipe-detail-photo").src = creandoObjeto.image;
        document.getElementById("recipe_title").textContent=creandoObjeto.title;
        document.getElementById("recipe_expend").textContent= creandoObjeto.pricePerServing;
        document.getElementById("tiempo").textContent= creandoObjeto.readyInMinutes;
        
        document.getElementById("calorias").textContent= creandoObjeto.healthScore;

        document.getElementById("Ingredientes").innerHTML=creandoObjeto.extendedIngredients.map(ingredient=>ingredient.original).join('</br>');
        
        document.getElementById("recipe_directions_step").textContent = creandoObjeto.instructions;
    })    
  

