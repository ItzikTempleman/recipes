"use strict";

let recipeList = []

const dishNameInput = document.getElementById("dishNameInput")
const ingredientsTB = document.getElementById("ingredientsTB")
const servingsInput = document.getElementById("servingsInput")
const instructionsInput = document.getElementById("instructionsInput")
const dishImageInput = document.getElementById("dishImageInput")



function addRecipe() {
    createRecipe()
    displayRecipe()
}

loadRecipes()

function createRecipe() {
    let dishName = dishNameInput.value
    let servings = servingsInput.value
    let ingredients = ingredientsTB.value
    let instructions = instructionsInput.value
    let imageUrl = dishImageInput.value

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
                    <span class="bi bi-pencil" onclick="editRecipe(${index})"></span>
                </div>
                <br>
             
                <strong><p id="name">${recipeItem.dishName}</p></strong>
           
                <p id="servings"><strong>Servings:</strong> ${recipeItem.servings}</p>
                <p id="ingredients"><strong>Ingredients</strong><br>
                 <span class="ingredient-info">${recipeItem.ingredients}</span>
                </p>
                <p id="instructions"><strong>Instructions</strong><br> 
                <span class="instructions-info">${recipeItem.instructions}</span>
                </p>
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
    clearForm()
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

function clearForm() {
    dishNameInput.value = ""
    servingsInput.value = ""
    ingredientsTB.value = ""
    instructionsInput.value = ""
    dishImageInput.value = ""
}

function editRecipe(recipe){

}