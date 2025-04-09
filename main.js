const apiKey1 = "e0f6e22e1f944acaaec181c9e011de7b";
const apiKey2 = "be23559293b949038f63824e1733c6b0";
//const searchQuery = "sushi";

async function searchRecipes() {
    const searchQuery = document.getElementById("search_bar").value;          
    console.log(searchQuery);
  
  try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey2}&query=${searchQuery}&number=5`);
        const data = await response.json();
        const recipeList = document.querySelector(".search_result_list");
        recipeList.innerHTML = ""; // Limpia los resultados previos
        
            if (data.results.length === 0) {
                recipeList.innerHTML = "<p>Sorry, we don't have it for you. You have to pay</p>";
            } else {
                data.results.forEach(recipe => {
                    // Crear los elementos
                    const recipeItem = document.createElement("a");
                    recipeItem.className = "search_result_element";
                    recipeItem.href = "#"; // Añadir un enlace temporal
    
                    const search_result_title = document.createElement("div");
                    search_result_title.className = "search_result_title";
                    search_result_title.textContent = recipe.title;
    
                    //const search_result_detail = document.createElement("p");
                    //search_result_detail.className = "search_result_detail";
                    //search_result_detail.textContent = "Calories: N/A, Carbs: N/A, Fat: N/A"; // Placeholder
    
                    const search_result_photo = document.createElement("img");
                    search_result_photo.className = "search_result_photo";
                    search_result_photo.src = recipe.image;
                    search_result_photo.alt = recipe.title;
                     const recipeLink = document.createElement('a');
                recipeLink.href = '#';
                recipeLink.textContent = 'View Recipe';
              
             
                recipeItem.appendChild(recipeLink);
              
    
                    // Añadir eventos
                    recipeLink.onclick = async function() {
                        await showRecipeDetails(recipe.id);
                    };
    
                    // Ensamblar los elementos
                    recipeItem.appendChild(search_result_title);
                    //recipeItem.appendChild(search_result_detail);
                    recipeItem.appendChild(search_result_photo);
                    
                    recipeItem.appendChild(recipeLink);
    
                    // Añadir al contenedor
                    recipeList.appendChild(recipeItem);
                });
            }}


catch (error) {
    console.error("Houston tenemos un problema con el Fetch", error);
}}
async function showRecipeDetails(recipeId) {
    const recipeDetailsDiv = document.getElementById("recipe-details");
    const recipeContentDiv = document.getElementById("recipe-content");
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey2}`);
        const recipeData = await response.json();
        recipeContentDiv.innerHTML =`
            <h2>${recipeData.title}</h2>
            <img src="${recipeData.image}" alt="${recipeData.title}">
            <p><strong>Ingredients:</strong> ${recipeData.extendedIngredients.map(ingredient=>ingredient.original).join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipeData.instructions}</p>
        `;
        recipeDetailsDiv.style.display = "flex";
    } catch (error) {
        console.error("Error fetching recipe details:", error);
    }
}

function closeRecipeDetails() {
    const recipeDetailsDiv = document.getElementById("recipe-details");
    recipeDetailsDiv.style.display = "none";
}