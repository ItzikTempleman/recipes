"use strict";

let recipeList = []

const dishNameInput = document.getElementById("dishNameInput")
const ingredientsTB = document.getElementById("ingredientsTB")
const servingsInput = document.getElementById("servingsInput")
const instructionsInput = document.getElementById("instructionsInput")
const dishImageInput = document.getElementById("dishImageInput")

function addRecipe() {
    pushRecipe()
    displayRecipe()
}

loadRecipes()

function pushRecipe() {
    const dishName = dishNameInput.value
    const servings = servingsInput.value
    const ingredients = ingredientsTB.value
    const instructions = instructionsInput.value
    const imageUrl = dishImageInput.value


    const recipe = {
        dishName,
        ingredients,
        servings,
        instructions,
        imageUrl
    }

    if (isValidFields(recipe)) {
        recipeList.push(recipe)
    }

    saveAndUpdateRecipe()
}

function displayRecipe() {
    const containerDiv = document.getElementById("containerDiv")
    let dynamicRecipeCardDiv = ""

    let index = 0
    for (const recipeItem of recipeList) {

        let recipeCrd = `
            <div class="recipeCard">
                       <div id="recipeImage">
                    <img src="${recipeItem.imageUrl}">
                    <span class="bi bi-trash" onclick="deleteRecipe(${index})"></span>
                </div>
                <p id="name">${recipeItem.dishName}</p>
                <p id="servings"><strong>Servings</strong><br> ${recipeItem.servings}</p>
                <p id="ingredients"><strong>Ingredients</strong><br>${recipeItem.ingredients}</p>
                <p id="instructions"><strong>Instructions</strong><br> ${recipeItem.instructions}</p>
            </div>
        `
        dynamicRecipeCardDiv += recipeCrd
        index++
    }

    containerDiv.innerHTML = dynamicRecipeCardDiv
}

function isValidFields(recipe) {


    if (recipe.dishName === "" || recipe.instructions === "" || recipe.imageUrl === "") {
        alertMissingData(`Please fill in all fields`)
        return false
    }

    if (recipe.servings < 1) {
        alertMissingData(`Please enter a valid quantity`)
        return false
    }
    return true
}


function saveAndUpdateRecipe() {
    const json = JSON.stringify(recipeList)
    localStorage.setItem(`recipes`, json)
}

function loadRecipes() {
    const json = localStorage.getItem(`recipes`)
    if (json) {
        recipeList = JSON.parse(json)
    }
    displayRecipe()
}


function alertMissingData(message) {
    alert(`${message}`)
}


function deleteRecipe(recipe) {
    recipeList.splice(recipe)
    saveAndUpdateRecipe()
    displayRecipe()
}