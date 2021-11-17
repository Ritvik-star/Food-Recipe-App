const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listeners to actions
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', ()=>{
    mealDetailContent.parentElement.classList.remove('showRecipe');
})


//get meal list that matches with the ingredients
function getMealList(){
    let searchInputData = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputData}`)    //fetching meal data through api
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){     //creating cards according to search meal
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
                `;
            });
            mealList.classList.remove(`notFound`);
        }else{
            html = "Sorry, we didn't find any meal according to your search,please try again!";
            mealList.classList.add(`notFound`);
        }

        mealList.innerHTML = html;
    });
}

//get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealitem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealitem.dataset.id}`)    //fetching meal item details through api
        .then(response => response.json())
        .then(data => {
            mealRecipeModal(data.meals)
        })
    }
}

//create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `        //modal according to selected recipe of meal
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailContent.innerHTML = html;
    mealDetailContent.parentElement.classList.add('showRecipe');
}
