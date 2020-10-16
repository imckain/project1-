// Materialize Init
$(document).ready(function () {
    $('.sidenav').sidenav();
});
// Constants
const KEY = CONFIG.recipeAPIKey;
const ID = '4be09ebb'
const BASE_URL = 'https://api.edamam.com/search';

// Variables
let recipeData, recipeDetail;
// var instance = M.Sidenav.getInstance(elem);

// Cached Element Refernces
const $recipeEl = $('#recipe');
const $featuredRecipeEl = $('#featured-recipe');
const $image = $('#image');
const $label = $('#label');
const $yield = $('#yield');
const $dietLabels = $('#diet-labels');
const $ingredientLines = $('#ingredient-lines');
const $urlLink = $('#url');

// Event Listeners
$recipeEl.on('click', '')
// Functions
init();
function init() {
    handleGetData();
}

function handleGetData() {
    $.ajax(BASE_URL + '?q=chicken&app_id=' + ID + '&app_key=' + KEY)
        .then(function (data) {
            recipeData = data;
            render()
        }, function (error) {
            console.log('Bad Request ', error);
        })
};

// function

function render() {
    $image.attr({
        src: recipeData.hits[0].recipe.image,
        alt: recipeData.hits[0].recipe.label
    });
    $label.text(recipeData.hits[0].recipe.label);
    $yield.text(recipeData.hits[0].recipe.yield);
    $dietLabels.text(recipeData.hits[0].recipe.dietLabels);
    $ingredientLines.text(recipeData.hits[0].recipe.ingredientLines);
    $urlLink.attr({
        src: recipeData.hits[0].recipe.url,
    });
};
