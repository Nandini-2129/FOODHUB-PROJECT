// const foodContainer=document.getElementById("foodContainer");
// const favContainer=document.getElementById("favContainer");

// const searchInput=document.getElementById("searchInput");
// const searchBtn=document.getElementById("searchBtn");

// const detailPage=document.getElementById("detailsPage");
// const detailImg=document.getElementById("detailImg");
// const detailName=document.getElementById("detailName");
// const ingredients=document.getElementById("ingredients");
// const instructions=document.getElementById("instructions");

// const SEARCH_API="https://www.themealdb.com/api/json/v1/1/search.php?s=";
// const DETAILS_API="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";


// let foods=[];


// let prices={
// Chicken:250,
// Pizza:300,
// Burger:180,
// Pasta:220,
// Rice:150,
// Fish:280,
// Beef:350,
// Soup:150,
// Egg:100,
// Salad:120,
// Noodles:180,
// Dosa:120,
// Coffee:80,
// Tea:50
// };



// // get foods

// async function getFoods(name=""){

// let res=await fetch(SEARCH_API+name);

// let data=await res.json();

// foods=data.meals || [];

// displayFoods(foods);

// showFavourite();

// }



// // display

// function displayFoods(items){

// foodContainer.innerHTML="";


// items.forEach(food=>{


// let heart=localStorage.getItem(food.idMeal)?"❤️":"🤍";


// foodContainer.innerHTML+=`

// <div class="card">


// <img src="${food.strMealThumb}"
// onclick="showDetails('${food.idMeal}')">


// <div class="heart"
// onclick="favourite(event,'${food.idMeal}')">

// ${heart}

// </div>


// <h3>${food.strMeal}</h3>


// </div>

// `;

// });

// }




// // details

// async function showDetails(id){


// let res=await fetch(DETAILS_API+id);

// let data=await res.json();

// let food=data.meals[0];



// document.querySelector("header").style.display="none";


// document.getElementById("homeSection").style.display="none";
// document.getElementById("aboutPage").style.display="none";
// document.getElementById("foodSection").style.display="none";
// document.getElementById("favouritePage").style.display="none";
// document.getElementById("contactPage").style.display="none";


// detailPage.style.display="block";


// detailImg.src=food.strMealThumb;



// detailName.innerHTML=
// food.strMeal+
// "<br>💰 Price : ₹"+getPrice(food.strMeal);



// ingredients.innerHTML="";


// for(let i=1;i<=20;i++){


// let item=food["strIngredient"+i];
// let measure=food["strMeasure"+i];


// if(item){


// ingredients.innerHTML+=`

// <li>${item} - ${measure}</li>

// `;

// }

// }


// instructions.innerText=food.strInstructions;


// window.scrollTo(0,0);


// }





// function getPrice(name){


// for(let key in prices){


// if(name.includes(key)){


// return prices[key];

// }

// }


// return 150;

// }







// // favourite


// function favourite(e,id){


// e.stopPropagation();



// if(localStorage.getItem(id)){


// localStorage.removeItem(id);


// e.target.innerText="🤍";


// }else{


// localStorage.setItem(id,true);


// e.target.innerText="❤️";


// }


// showFavourite();


// }




// function showFavourite(){


// favContainer.innerHTML="";



// foods.forEach(food=>{


// if(localStorage.getItem(food.idMeal)){


// favContainer.innerHTML+=`

// <div class="card">


// <img src="${food.strMealThumb}"
// onclick="showDetails('${food.idMeal}')">


// <div class="heart"
// onclick="favourite(event,'${food.idMeal}')">

// ❤️

// </div>


// <h3>${food.strMeal}</h3>


// </div>


// `;

// }


// });


// }






// function homeScroll(){

// document.getElementById("homeSection")
// .scrollIntoView({behavior:"smooth"});

// }


// function aboutScroll(){

// document.getElementById("aboutPage")
// .scrollIntoView({behavior:"smooth"});

// }


// function favScroll(){

// showFavourite();

// document.getElementById("favouritePage")
// .scrollIntoView({behavior:"smooth"});

// }



// function recipeScroll(){

// document.getElementById("foodSection")
// .scrollIntoView({behavior:"smooth"});

// }



// function contactScroll(){

// document.getElementById("contactPage")
// .scrollIntoView({behavior:"smooth"});

// }







// function goBack(){


// document.querySelector("header").style.display="flex";


// detailPage.style.display="none";


// document.getElementById("homeSection").style.display="block";
// document.getElementById("aboutPage").style.display="block";
// document.getElementById("foodSection").style.display="block";
// document.getElementById("favouritePage").style.display="block";
// document.getElementById("contactPage").style.display="block";


// window.scrollTo(0,0);

// }







// // search


// searchBtn.onclick=()=>{


// let value=searchInput.value.trim();



// if(value){


// getFoods(value);


// recipeScroll();


// }


// };




// // page load


// window.onload=()=>{


// document.querySelector("header").style.display="flex";


// detailPage.style.display="none";


// window.scrollTo(0,0);


// };



// // first load

// getFoods();




// // ⭐ name remove chesthe refresh

// searchInput.addEventListener("input",()=>{


// if(searchInput.value.trim()===""){


// window.location.reload();


// }


// });

