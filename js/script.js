const key = CONFIG.recipeAPIKey;
const id = CONFIG.recipeID
const url = 'https://api.edamam.com/search'

$.ajax(url + '?q=chicken&app_id=' + id + '&app_key=' + key)
.then(data => console.log(data))
.then(error => console.log(error))