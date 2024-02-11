const SearchBox = document.querySelector(".searchbox");
const SearchBtn = document.querySelector(".searchbtn");
const RecipeContainer = document.querySelector(".recipe-container");
const RecipeCloseBtn = document.querySelector(".recipe-closeBtn");
const RecipeDetailsContent = document.querySelector(".recipe-details-content");

// FUnction TO GET RECIPES 

const fetchrecipe = async (query) => {
  RecipeContainer.innerHTML = "<h1>Fetching Recipes...</h1>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();
    RecipeContainer.innerHTML = "";
    response.meals.forEach((meal) => {
      const recipediv = document.createElement("div");
      recipediv.classList.add("recipe");
      recipediv.innerHTML = `
          <img src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
          <p><span>${meal.strArea}</span> Dish</p>
          <p>Belongs to <span>${meal.strCategory}</span> Category</p>
          `;
      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipediv.appendChild(button);
  
      button.addEventListener("click", () => {
        openRecipePopup(meal);
      });
  
      RecipeContainer.appendChild(recipediv);
    });
  } 
  catch (error) {
    RecipeContainer.innerHTML = "<h1>Error In Fetching Recipes!!! Please Enetr The Correct Meal...</h1>";
  }
};


// FETCHING INGREDIENTS AND MEASUREMENTS

const fetchingIngredient = (meal) => {
  let ingredientslist = "";
  for (let i = 1; i <= 20; i++) {
    const Ingredient = meal[`strIngredient${i}`];
    if (Ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientslist += `<li>${measure} ${Ingredient}</li>`
    } else {
      break;
    }
  }
  return ingredientslist;
};

const openRecipePopup = (meal) => {
  RecipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="H3">Ingredients:</h3>
    <ul class="ingredientList">${fetchingIngredient(meal)}</ul>
    <div class="recipeInstructions">
    <h3 class="H3" >Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `;
  RecipeDetailsContent.parentElement.style.display = "block";
};

// RECIPE CLOSE JAVASCRIPT

RecipeCloseBtn.addEventListener('click', ()=>{
   RecipeDetailsContent.parentElement.style.display="none";
});

SearchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const SearchInpt = SearchBox.value.trim();
  if(!SearchInpt){
    RecipeContainer.innerHTML=`<h1>Type The Meal First & Search Again.</h1>`
    return;
  }
  
  fetchrecipe(SearchInpt);
  SearchBox.value="";
});
