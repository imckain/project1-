// Materialize Init
$(document).ready(function(){
    $('.sidenav').sidenav();
  });

// Constants
const key = CONFIG.recipeAPIKey;
const id = CONFIG.recipeID
const url = 'https://api.edamam.com/search'

// Variables
let recipeData, recipeDetail;
var instance = M.Sidenav.getInstance(elem);

// Cached Element Refernces
const $recipes = $('');
const $featuredRecipes = $('#featured-recipe');


// Event Listeners
// Functions

function handleGetData(event) {
    event.preventDefault();
    $.ajax(url + '?q=chicken&app_id=' + id + '&app_key=' + key)
    .then(function (data) {
        recipeData = data
        render()
    }, function(error) {
        console.log('Bad Request ', error);
    })
};

function render() {
    $featuredRecipes.text()
}
