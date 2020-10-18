// Materialize Init
$(document).ready(function () {
    $('.sidenav').sidenav();
});

// Constants
const KEY = CONFIG.recipeAPIKey;
const ID = '4be09ebb'
const BASE_URL = 'https://api.edamam.com/search';
const lookUp = {
    '0': 'chicken',
    '1': 'shrimp',
    '2': 'beef',
    '3': 'pork',
    '4': 'lamb',
    '5': 'fish',
    '6': 'grill',
};
// Variables
let recipeData, userInput;
userInput = lookUp[new Date().getDay()];
// var instance = M.Sidenav.getInstance(elem);

// Cached Element Refernces
const $recipeEl = $('#recipe');
const $featuredRecipeEl = $('#featured-recipe');
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
// $form.on('submit', handleGetData);

// Functions
init();
function init() {
    handleGetData();
}


function handleGetData() {
    $.ajax(BASE_URL + '?q=' + userInput + '&app_id=' + ID + '&app_key=' + KEY)
    .then(function (data) {
        recipeData = data;
        // generateRecipies();
        // generateImage();
        // generateLink();
        render();
    }, function (error) {
        console.log('Bad Request ', error, lookUp.value);
    })
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
            </div`;
};

// function generateImage() {
//     return `<img id="image" src="${recipeData.hits[0].recipe.image}" alt="${recipeData.hits[0].recipe.image}">`;
// };

// function generateLink() {
//     return `<a id="url" href="${recipeData.hits[0].recipe.url}">Get Cookin'</a>`
// };

function render() {
    // $imageBox.html(generateImage());
    // $label.text(recipeData.hits[0].recipe.label);
    // $yield.text(recipeData.hits[0].recipe.yield);
    // $dietLabels.text(recipeData.hits[0].recipe.dietLabels);
    // $ingredientLines.text(recipeData.hits[0].recipe.ingredientLines);
    // $urlLink.html(generateLink());
    $recipeEl.html(generateRecipe());
};

