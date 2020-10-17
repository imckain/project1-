// Materialize Init
$(document).ready(function () {
    $('.sidenav').sidenav();
});

// Constants
const KEY = CONFIG.recipeAPIKey;
const ID = '4be09ebb'
const BASE_URL = 'https://api.edamam.com/search';

// Variables
let recipeData, userInput;
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
$form.on('submit', handleGetData);

// Functions

function handleGetData(event) {
    event.preventDefault();
    userInput = $input.val();
    if(!userInput) return;
    $.ajax(BASE_URL + '?q='+ userInput + '&app_id=' + ID + '&app_key=' + KEY)
    .then(function (data) {
        recipeData = data;
        // generateRecipies();
        // generateImage();
        // generateLink();
        render();
    }, function (error) {
        console.log('Bad Request ', error);
    })
    $input.val('');
};

function generateRecipies() {
    return recipeData.hits.map(function(recipeData) {
        console.log(recipeData)
        return `<div id="recipe-interior">
                    <div id="image-box">
                        <img id="image" src="${recipeData.recipe.image}" alt="${recipeData.recipe.label}">
                    </div>
                    <div id="info-box">
                        <div id="info">
                            <p id="label">${recipeData.recipe.label}</p>
                            <p id="yield">${recipeData.recipe.yield}</p>
                            <p id="diet-labels">${recipeData.recipe.dietLabels}</p>
                            <ul id="ingredient-lines">${recipeData.recipe.ingredientLines}</ul>
                            <div id="urlLink"><a id="url" href="${recipeData.recipe.url}">Get Cookin'</a></div>
                        </div>
                    </div>
                </div`;
    })
};

function generateImage() {
    return `<img id="image" src="${recipeData.hits[0].recipe.image}" alt="${recipeData.hits[0].recipe.image}">`;
};

function generateLink() {
    return `<a id="url" href="${recipeData.hits[0].recipe.url}">Get Cookin'</a>`
};

function render() {
    // $imageBox.html(generateImage());
    // $label.text(recipeData.hits[0].recipe.label);
    // $yield.text(recipeData.hits[0].recipe.yield);
    // $dietLabels.text(recipeData.hits[0].recipe.dietLabels);
    // $ingredientLines.text(recipeData.hits[0].recipe.ingredientLines);
    // $urlLink.html(generateLink());
    $recipeEl.html(generateRecipies());
};
