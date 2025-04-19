"use strict";

let recipeList = []
let propertyNames = [`dishName`, `ingredients`, `servings`, `instructions`, `imageUrl`]

const dishNameInput = document.getElementById("dishNameInput")
const ingredientsTB = document.getElementById("ingredientsTB")
const servingsInput = document.getElementById("servingsInput")
const instructionsInput = document.getElementById("instructionsInput")
const dishImageInput = document.getElementById("dishImageInput")
const editingContainer = document.getElementById("editingContainer")
const editOptionDiv = document.getElementById("editOptionDiv")
const editTextAreaDiv = document.getElementById("editTextAreaDiv")


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
        dishName, ingredients, servings, instructions, imageUrl, isEditable: false
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

function editRecipe(index) {
    let recipe = recipeList[index]
    recipe.isEditable = !recipe.isEditable
    if (recipe.isEditable) {
        editingContainer.style.display = "flex"

        editOptionDiv.innerHTML = `
            <div>
                <p><strong>Edit ${recipe.dishName} properties</strong></p>
                <p onclick="editProperty('${propertyNames[0]}', ${index})"> ${propertyNames[0]}</p><hr>
                <p onclick="editProperty('${propertyNames[1]}', ${index})"> ${propertyNames[1]}</p><hr>
                <p onclick="editProperty('${propertyNames[2]}', ${index})"> ${propertyNames[2]}</p><hr>
                <p onclick="editProperty('${propertyNames[3]}', ${index})"> ${propertyNames[3]}</p><hr>
                <p onclick="editProperty('${propertyNames[4]}', ${index})"> ${propertyNames[4]}</p>
            </div>`
    } else {
        editOptionDiv.innerHTML = ""
        editTextAreaDiv.innerHTML = ""
        editingContainer.style.display = "none"
    }
}

function editProperty(propertyName, index) {
    const recipe = recipeList[index]

    editTextAreaDiv.innerHTML =
        `
        <div>
            <textarea id="editPropertyTB" placeholder="Edit ${propertyName}"></textarea>
            <button onclick="updateRecipe(${recipe})">Update recipe</button>
        </div>
    `
}

function updateRecipe(recipe) {
    console.log(recipe)
//let newRecipe
}