const searchBtn =document.getElementById('search-btn');
const meallist=document.getElementById('meal');
const mealDetailsContent=document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//for function of recipeclosebtn
recipeCloseBtn.addEventListener('click' ,() =>{
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

//event listener
searchBtn.addEventListener('click',getMealList);
meallist.addEventListener('click', getMealRecipe);
//get meal list that matches with the ingredients
function getMealList()
{
    let SearchInputTxt=document.getElementById
    ('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${SearchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let html="";
        if(data.meals){
            data.meals.forEach(meal=> {
               html += `
             <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                  <img src="${meal.strMealThumb}" alt="food"/>
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div>  
             </div>
             `;
            });
           meallist.classList.remove('notFound');
        }
        else
        {
            html= "Sorry, we didn't find any meal!"; 
            meallist.classList.add('notFound')
        }
         meallist.innerHTML=html;
    });
}


//getting recipe of meal
function getMealRecipe(e)
{
    e.preventDefault();
    if(e.target.classList.contains(`recipe-btn`))
    {
        let mealItem=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=> response.json())
        .then(data=> mealRecipeModal(data.meals));
    }
}


//create a model
function mealRecipeModal(meal){
    meal=meal[0];
    let html= `
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
    mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

