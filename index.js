const foodContainer = document.getElementById("foodContainer");
const favContainer = document.getElementById("favContainer");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const detailPage = document.getElementById("detailsPage");
const detailImg = document.getElementById("detailImg");
const detailName = document.getElementById("detailName");
const ingredients = document.getElementById("ingredients");
const instructions = document.getElementById("instructions");

// Toggle
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

// ===============================
// MENU TOGGLE
// ===============================

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuBtn.innerHTML = "✖";
    } else {
        menuBtn.innerHTML = "☰";
    }

});

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");
        menuBtn.innerHTML = "☰";

    });

});

// ===============================
// API
// ===============================

const SEARCH_API =
"https://www.themealdb.com/api/json/v1/1/search.php?s=";

const DETAILS_API =
"https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

// ===============================
// DATA
// ===============================

let foods = [];

const prices = {

Chicken:250,
Pizza:300,
Burger:180,
Pasta:220,
Rice:150,
Fish:280,
Beef:350,
Soup:150,
Egg:100,
Salad:120,
Noodles:180,
Dosa:120,
Coffee:80,
Tea:50

};

// ===============================
// GET RECIPES
// ===============================

async function getFoods(name=""){

    try{

        let response = await fetch(SEARCH_API + name);

        let data = await response.json();

        foods = data.meals || [];

        displayFoods(foods);

        showFavourite();

    }

    catch(error){

        foodContainer.innerHTML =
        "<h2>Unable to load recipes.</h2>";

    }

}

// ===============================
// DISPLAY RECIPES
// ===============================

function displayFoods(items){

    foodContainer.innerHTML="";

    if(items.length===0){

        foodContainer.innerHTML="<h2>No Recipes Found</h2>";

        return;

    }

    items.forEach(food=>{

        let heart =
        localStorage.getItem(food.idMeal)
        ? "❤️"
        : "🤍";

        foodContainer.innerHTML += `

        <div class="card">

            <img
            src="${food.strMealThumb}"
            onclick="showDetails('${food.idMeal}')">

            <div
            class="heart"
            onclick="favourite(event,'${food.idMeal}')">

            ${heart}

            </div>

            <h3>${food.strMeal}</h3>

        </div>

        `;

    });

}

// ===============================
// PRICE
// ===============================

function getPrice(name){

    for(let key in prices){

        if(name.includes(key)){

            return prices[key];

        }

    }

    return 150;

}

// ===============================
// DETAILS
// ===============================

async function showDetails(id){

    let response =
    await fetch(DETAILS_API + id);

    let data =
    await response.json();

    let food =
    data.meals[0];

    document.querySelector("header").style.display="none";

    document.getElementById("homeSection").style.display="none";
    document.getElementById("aboutPage").style.display="none";
    document.getElementById("foodSection").style.display="none";
    document.getElementById("favouritePage").style.display="none";
    document.getElementById("contactPage").style.display="none";

    detailPage.style.display="block";

    detailImg.src = food.strMealThumb;

    detailName.innerHTML =
    `
    ${food.strMeal}
    <br><br>
    💰 Price : ₹${getPrice(food.strMeal)}
    `;

    ingredients.innerHTML="";

    for(let i=1;i<=20;i++){

        let item =
        food["strIngredient"+i];

        let measure =
        food["strMeasure"+i];

        if(item && item.trim()!==""){

            ingredients.innerHTML +=
            `<li>${item} - ${measure}</li>`;

        }

    }

    instructions.innerText =
    food.strInstructions;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
// =====================================
// FAVOURITE
// =====================================

function favourite(e, id){

    e.stopPropagation();

    if(localStorage.getItem(id)){

        localStorage.removeItem(id);
        e.target.innerHTML = "🤍";

    }else{

        localStorage.setItem(id, "true");
        e.target.innerHTML = "❤️";

    }

    showFavourite();

}

// =====================================
// SHOW FAVOURITES
// =====================================

function showFavourite(){

    favContainer.innerHTML = "";

    let favFoods = foods.filter(food =>
        localStorage.getItem(food.idMeal)
    );

    if(favFoods.length === 0){

        favContainer.innerHTML = `
        <h2 style="text-align:center;width:100%;">
            ❤️ No Favourite Recipes
        </h2>
        `;

        return;
    }

    favFoods.forEach(food => {

        favContainer.innerHTML += `

        <div class="card">

            <img
            src="${food.strMealThumb}"
            onclick="showDetails('${food.idMeal}')">

            <div
            class="heart"
            onclick="favourite(event,'${food.idMeal}')">

            ❤️

            </div>

            <h3>${food.strMeal}</h3>

        </div>

        `;

    });

}

// =====================================
// SMOOTH SCROLL
// =====================================

function homeScroll(){

    document.getElementById("homeSection")
    .scrollIntoView({
        behavior:"smooth"
    });

}

function aboutScroll(){

    document.getElementById("aboutPage")
    .scrollIntoView({
        behavior:"smooth"
    });

}

function recipeScroll(){

    document.getElementById("foodSection")
    .scrollIntoView({
        behavior:"smooth"
    });

}

function favScroll(){

    showFavourite();

    document.getElementById("favouritePage")
    .scrollIntoView({
        behavior:"smooth"
    });

}

function contactScroll(){

    document.getElementById("contactPage")
    .scrollIntoView({
        behavior:"smooth"
    });

}

// =====================================
// GO BACK
// =====================================

function goBack(){

    detailPage.style.display = "none";

    document.querySelector("header").style.display = "flex";

    document.getElementById("homeSection").style.display = "block";
    document.getElementById("aboutPage").style.display = "block";
    document.getElementById("foodSection").style.display = "block";
    document.getElementById("favouritePage").style.display = "block";
    document.getElementById("contactPage").style.display = "block";

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// =====================================
// SEARCH
// =====================================

searchBtn.addEventListener("click", () => {

    let value = searchInput.value.trim();

    getFoods(value);

    if(value !== ""){

        recipeScroll();

    }

});

searchInput.addEventListener("keypress", e => {

    if(e.key === "Enter"){

        searchBtn.click();

    }

});

// =====================================
// AUTO LOAD WHEN SEARCH CLEARED
// =====================================

searchInput.addEventListener("input", () => {

    if(searchInput.value.trim() === ""){

        getFoods();

    }

});

// =====================================
// PAGE LOAD
// =====================================

window.onload = () => {

    detailPage.style.display = "none";

    document.querySelector("header").style.display = "flex";

    getFoods();

};

// =====================================
// END OF FILE
// =====================================