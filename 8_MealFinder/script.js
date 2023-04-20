const search = document.querySelector('#search'),
  submit = document.querySelector('#submit'),
  random = document.querySelector('#random'),
  mealsEl = document.querySelector('#meals'),
  resultHeading = document.querySelector('#result-heading'),
  single_mealEl = document.querySelector('#single-meal');

// Search meal and fetch from API
const searchMeal = (e) => {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerText = `Search results for term: '${term}'`;

        if (data.meals === null) {
          resultHeading.innerText = `There are no search results for term: '${term}'`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="meal-info" data-mealId="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
              </div>
          `
            )
            .join('');
        }
      });

    // Clear search term
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
};

// Add meal to DOM
const addMealToDOM = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  single_mealEl.scrollIntoView({ behavior: 'smooth' });
};

// Fetch meal by ID from API
const getMealById = (mealId) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
};

// Event listeners

submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    }
    return false;
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute('data-mealId');
    getMealById(mealId);
  }
});
