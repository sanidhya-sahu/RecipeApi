const appId = "1775c3a1";
const appKey = "ca74e9897f6a061cb1719d0c4c012d35";
const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const searchbar = document.querySelector("#searchbar");
const btnFind= document.querySelector(".btn");

btnFind.addEventListener("click", () => loadRecipies(searchbar.value));

searchbar.addEventListener("keyup", (e) =>{
    const input = searchbar.value;
    if(e.keyCode === 13){
        loadRecipies(input);
    }
})

const setScrollPosition = () =>{
    recipeContainer.scrollTo({top:0, behaviour: "smooth"})
}

function loadRecipies(type=""){
    const url = baseURL + `&q=${type}`;    
    fetch(url)
        .then(res => res.json())
        .then((data) => renderRecipies(data.hits))
        .catch((error) => console.log(error))
        .finally(() => setScrollPosition());
}
loadRecipies();

const getRecipeStepStr = (ingredientLines = []) => {
    let str ="";
    for(var step of ingredientLines){
        str=str+`<li>${step}</li>`;
    }
    return str;
}

const renderRecipies = (recipeList=[]) => {
    recipeContainer.innerHTML="";
    recipeList.forEach(recipeObj => {
        const {
             label:recipeTitle,
             ingredientLines,
             image:recipeImage,
            } = recipeObj.recipe;

            const RecipeStepStr= getRecipeStepStr(ingredientLines);
        const htmlStr = `<div class="recipe">
        <div class="recipe-title">${recipeTitle}</div>
        <div class="recipe-image">
            <img src="${recipeImage}" alt="recipe">
        </div>
        <div class="recipe-text">
            <ul>
                ${RecipeStepStr}
            </ul>
        </div>
    </div>`;
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
    });
}