// Materialize / Bootstrap Init
$(document).ready(function () {
    $('.sidenav').sidenav();
});

$(document).ready(function(){
    $('.carousel').carousel({
        interval: 2000
    })
});

// Constants
const KEY = CONFIG.recipeAPIKey;
const ID = '4be09ebb'
const BASE_URL = 'https://api.edamam.com/search';
const lookUp = {
    '0': 'chicken',
    '1': 'shrimp',
    '2': 'tacos',
    '3': 'pork',
    '4': 'lamb',
    '5': 'fish',
    '6': 'beef',
};

// Variables
let recipeData, userInput;
userInput = lookUp[new Date().getDay()];

// Cached Element Refernces
const $recipeEl = $('#recipe');
const $featuredRecipeEl = $('#featured-recipe');
// const $randomRecipeEl = $('#recipe-select');
const $randomRecipeEl = $('#carousel-inner');
const $imageBox = $('#image-box');
const $image = $('#image');
const $label = $('#label');
const $yield = $('#yield');
const $dietLabels = $('#diet-labels');
const $ingredientLines = $('#ingredient-lines');
const $urlLink = $('#urlLink');
const $input = $('input[type="text"]');
const $form = $('form');
const $info = $('#info');

// Event Listeners

// Functions
init();
function init() {
    handleGetData();
    handleGetRandomData();
};

function handleGetData() {
    $.ajax(BASE_URL + '?q=' + userInput + '&app_id=' + ID + '&app_key=' + KEY)
    .then(function (data) {
        recipeData = data;
        render();
        renderRandom();
    }, function (error) {
        console.log('Bad Request ', error, lookUp.value);
    });
};

function handleGetRandomData() {
    $.ajax(BASE_URL + '?q=' + userInput + '&app_id=' + ID + '&app_key=' + KEY)
    .then(function (data) {
        recipeData = data;
        renderRandom();
    }, function (error) {
        console.log('Bad Request ', error, lookUp.value);
    });
};

function generateRecipe() {
    let randomNumber = Math.floor(Math.random()*recipeData.hits.length)
    let featuredRecipe = recipeData.hits[randomNumber];
    console.log(featuredRecipe);
    return `<div id="recipe-interior">
                <div id="image-box">
                    <img id="image" src="${featuredRecipe.recipe.image}" alt="${featuredRecipe.recipe.label}">
                </div>
                <div id="info-box">
                    <div id="info">
                        <p id="label">${featuredRecipe.recipe.label}</p><br>
                        <p id="yield">Serves: ${featuredRecipe.recipe.yield}</p><br>
                        <p id="diet-labels">${featuredRecipe.recipe.dietLabels}</p><br>
                        <p id="label">Ingredients</p><br>
                        <ul id="ingredient-lines">${featuredRecipe.recipe.ingredientLines.join('<br>')}</ul><br>
                        <div id="urlLink"><a id="url" href="${featuredRecipe.recipe.url}">Get Cookin'</a></div><br><br>
                    </div>
                </div>
            </div>`;
};

function generateRandomRecipe() {
    return recipeData.hits.map(function(recipeData) {
        console.log(recipeData);
        return `<div class="carousel-item">
                    <img class="d-block w-100" src="${recipeData.recipe.image}" alt="${recipeData.recipe.label}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${recipeData.recipe.label}</h5>
                    </div>
                </div>`;
        // return `<p>${recipeData.recipe.label}</p>`;
      
    })
};

function render() {
    $recipeEl.html(generateRecipe());
};

function renderRandom() {
    $randomRecipeEl.html(generateRandomRecipe());
};

// `<div class="carousel-item">
//                     <div>
//                         <img class="d-block w-100" src="${recipeData.recipe.image}" alt="First slide">
//                     </div>
//                 </div>`

  