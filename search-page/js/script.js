// Materialize Init
$(document).ready(function () {
    $('.sidenav').sidenav();
});

// Constants
// const KEY = CONFIG.recipeAPIKey;
// const ID = '4be09ebb'
const BASE_URL = 'https://proxify-food-finder.herokuapp.com/api';

// Variables
let recipeData, userInput;

// Cached Element Refernces
const $recipeEl = $('#recipe');
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
$form.on('click', 'button', handleGetData);
$form.on('keydown', '13', handleGetData);

// Functions
function handleGetData(event) {
    event.preventDefault();
    userInput = $input.val();
    if(!userInput) return;
    $.ajax(BASE_URL + '?input=' + userInput)
    .then(function (data) {
        recipeData = data;
        render();
    }, function (error) {
        console.log('Bad Request ', error);
    })
    $input.val('');
};

function generateRecipes() {
    return recipeData.hits.map(function(recipeData) {
        console.log(recipeData)
        return `<div id="recipe-interior">
                    <div id="image-box">
                        <img id="image" src="${recipeData.recipe.image}" alt="${recipeData.recipe.label}">
                    </div>
                    <div id="info-box">
                        <div id="info">
                            <p id="label">${recipeData.recipe.label}</p><br>
                            <p id="yield">Serves: ${recipeData.recipe.yield}</p><br>
                            <p id="diet-labels">${recipeData.recipe.dietLabels}</p><br>
                            <p id="label">Ingredients</p><br>
                            <ul id="ingredient-lines">${recipeData.recipe.ingredientLines.join('<br>')}</ul><br>
                            <div id="urlLink"><a id="url" href="${recipeData.recipe.url}">Get Cookin'</a></div><br><br>
                        </div>
                    </div>
                </div`;
    })
};

function render() {
    $recipeEl.html(generateRecipes());
};
