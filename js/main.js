// jquery-----------------------
$(".open-icon").click(function(){
    $(".open").css("left", "0")
})

$(".Close").click(function(){
    $(".open").css("left", "-270px")
})
//---------------------------------
let allFood=document.getElementById('all-food')
let searchContainer = document.getElementById("searchContainer");
let food=[]

// getCategories

async function getCategories (){
    let req=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    req=await req.json()
    console.log(req);
    food=req
    disblayCategories(req.categories)
}

function disblayCategories(food){
    let cartona=''
    for(var i=0 ; i<food.length ;i++ ){
        cartona+=`<div class="col-lg-3 col-md-4 " >
        <div class=" position-relative type-of-food overflow-hidden">
          <img src="${food[i].strCategoryThumb}" class="w-75 rounded-3" alt="">
          <div class="food-layer d-flex text-black text-center p-2  align-items-center  ">
           <div class=" ">
            <h3 class="fw-bold ms-3">${food[i].strCategory}</h3> 
           </div>
          </div>
  
        </div>
      </div> `
    }
    document.getElementById('all-food').innerHTML=cartona
}

// Ingredients
async function getIngredients (){
    let req=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    req=await req.json()
    console.log(req);
    food=req
    disblayIngredients(req.meals)
}

function disblayIngredients(food){
    let cartona=''
    for(var i=0 ; i<food.length ;i++ ){
        cartona+=`<div class="col-lg-3 col-md-4 " >
        <div class=" position-relative type-of-food overflow-hidden text-cemter">
        <i class="fa-solid fa-drumstick-bite fa-4x icon-Chicken"></i>
        <h3 class="fw-bold ms-3">${food[i].strIngredient}</h3>
        <h4>${food[i].strDescription}</h4> 
        </div>
    </div> ` // حاولت ااقلل h4 => .split(' ').slice(0,5).join(' ') ومش نفع
    }
    document.getElementById('all-food').innerHTML=cartona
}

// Area
async function getArea(){
    document.getElementById('all-food').innerHTML = ""
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    res = await res.json()   
    displayArea(res.meals)
}

function displayArea(food){
    let cartona=''
    for(var i=0 ; i<food.length ;i++ ){
        cartona+=`<div class="col-lg-3 col-md-4 " >
        <div class=" position-relative type-of-food overflow-hidden">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3 class="fw-bold ms-3">${food[i].strArea}</h3>
        </div>
      </div> `
    }

    document.getElementById('all-food').innerHTML=cartona
}

// Search
function showSearchInputs(){
    searchContainer.classList.remove("d-none");
    allFood.innerHTML ="";
}

async function searchByName(term) {
    allFood.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
   displayMeals(response.meals);
}

function displayMeals(arr){
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    allFood.innerHTML = cartoona;
}
searchByName("");

//  category Meals
async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

// Area Meals
async function getAreaMeals(area) {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()

}

//Ingredients Meal
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
}

// contant us

async function contantUs(food){
    searchContainer.classList.remove("d-none");
    allFood.innerHTML ="";
    
}
    
