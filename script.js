const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    category: "pasta",
    emoji: "🍝",
    time: "25 min",
    servings: 2,
    difficulty: "medium",
    description: "A classic Roman pasta dish with eggs, cheese, pancetta, and pepper.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta or guanciale",
      "2 large eggs + 2 yolks",
      "80g Pecorino Romano, grated",
      "Freshly ground black pepper",
      "Salt for pasta water"
    ],
    steps: [
      "Bring a large pot of salted water to boil and cook spaghetti until al dente.",
      "Meanwhile, sauté pancetta in a pan over medium heat until crispy. Set aside and keep the fat.",
      "Whisk eggs, yolks, and most of the cheese together. Season with plenty of black pepper.",
      "Reserve 1 cup of pasta cooking water, then drain the pasta.",
      "Working off heat, add pasta to the pan with pancetta. Add egg mixture and splash of pasta water, tossing constantly to create a creamy sauce.",
      "Serve immediately topped with remaining cheese and more black pepper."
    ]
  },
  {
    id: 2,
    title: "Avocado Toast",
    category: "breakfast",
    emoji: "🥑",
    time: "10 min",
    servings: 2,
    difficulty: "easy",
    description: "Creamy avocado on toasted sourdough with a perfectly poached egg.",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "2 eggs",
      "Lemon juice",
      "Red pepper flakes",
      "Salt and pepper",
      "Fresh herbs (optional)"
    ],
    steps: [
      "Toast the sourdough bread until golden and crispy.",
      "Halve the avocado, remove the pit, and scoop the flesh into a bowl.",
      "Mash the avocado with a fork, add lemon juice, salt and pepper to taste.",
      "Bring a pot of water to a gentle simmer. Add a splash of vinegar and carefully poach the eggs for 3 minutes.",
      "Spread the avocado mixture on the toasted bread.",
      "Top each slice with a poached egg, red pepper flakes, and fresh herbs."
    ]
  },
  {
    id: 3,
    title: "Chicken Tikka Masala",
    category: "dinner",
    emoji: "🍛",
    time: "45 min",
    servings: 4,
    difficulty: "medium",
    description: "Tender chicken in a rich, spiced tomato-cream sauce — a true crowd-pleaser.",
    ingredients: [
      "600g chicken breast, cubed",
      "1 cup plain yogurt",
      "2 tbsp tikka masala spice blend",
      "1 can (400ml) crushed tomatoes",
      "1 cup heavy cream",
      "1 onion, diced",
      "4 garlic cloves, minced",
      "1 tbsp fresh ginger",
      "2 tbsp oil",
      "Fresh cilantro to serve"
    ],
    steps: [
      "Mix chicken with yogurt and 1 tbsp spice blend. Marinate for at least 30 minutes.",
      "Grill or pan-fry the chicken until charred. Set aside.",
      "Sauté onion in oil until golden. Add garlic and ginger, cook 1 minute.",
      "Add remaining spice blend and cook 30 seconds until fragrant.",
      "Pour in crushed tomatoes and simmer for 15 minutes.",
      "Blend the sauce until smooth (optional). Add cream and simmer 5 minutes.",
      "Add chicken to sauce and heat through. Garnish with cilantro and serve with naan or rice."
    ]
  },
  {
    id: 4,
    title: "Classic Beef Burger",
    category: "grill",
    emoji: "🍔",
    time: "20 min",
    servings: 4,
    difficulty: "easy",
    description: "Juicy homemade beef patties with all the classic toppings.",
    ingredients: [
      "500g ground beef (80/20)",
      "4 brioche buns",
      "4 slices cheddar cheese",
      "Lettuce, tomato, onion",
      "Pickles",
      "Ketchup, mustard, mayo",
      "Salt and pepper"
    ],
    steps: [
      "Divide beef into 4 equal portions and form into patties, slightly wider than the buns.",
      "Season both sides generously with salt and pepper.",
      "Heat a cast iron pan or grill over high heat. Cook patties 3-4 minutes per side.",
      "Add cheese in the last minute of cooking, cover to melt.",
      "Toast the buns until golden.",
      "Assemble with your preferred sauces and toppings. Serve immediately."
    ]
  },
  {
    id: 5,
    title: "Vegetable Stir Fry",
    category: "vegetarian",
    emoji: "🥦",
    time: "15 min",
    servings: 2,
    difficulty: "easy",
    description: "A quick and colorful veggie stir fry with a savory ginger-soy glaze.",
    ingredients: [
      "1 head broccoli, florets",
      "1 bell pepper, sliced",
      "1 carrot, julienned",
      "1 cup snap peas",
      "3 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 tsp fresh ginger, grated",
      "2 garlic cloves",
      "1 tbsp cornstarch",
      "Sesame seeds to garnish"
    ],
    steps: [
      "Mix soy sauce, sesame oil, ginger, garlic, and cornstarch with 2 tbsp water in a bowl.",
      "Heat a wok or large pan over very high heat until smoking.",
      "Add vegetables in order of cooking time — carrots first, then broccoli, then pepper and snap peas.",
      "Stir fry for 3-4 minutes keeping vegetables moving.",
      "Pour the sauce over and toss to coat everything evenly.",
      "Cook 1 minute more until sauce thickens. Garnish with sesame seeds and serve over rice."
    ]
  },
  {
    id: 6,
    title: "Chocolate Lava Cake",
    category: "dessert",
    emoji: "🍫",
    time: "30 min",
    servings: 4,
    difficulty: "hard",
    description: "Decadent individual chocolate cakes with a warm, gooey molten center.",
    ingredients: [
      "200g dark chocolate (70%)",
      "150g butter",
      "4 eggs + 4 yolks",
      "150g sugar",
      "60g plain flour",
      "Pinch of salt",
      "Butter and cocoa for ramekins"
    ],
    steps: [
      "Preheat oven to 220°C (425°F). Butter 4 ramekins and dust with cocoa powder.",
      "Melt chocolate and butter together in a double boiler. Let cool slightly.",
      "Beat eggs, yolks, and sugar until pale and thick, about 3 minutes.",
      "Fold the chocolate mixture into the egg mixture.",
      "Sift in flour and salt and fold gently until just combined.",
      "Divide between ramekins and refrigerate up to 24 hours, or bake immediately for 10-12 minutes.",
      "The edges should be set but center should jiggle. Unmold onto plates and serve with ice cream."
    ]
  }
];

const categories = [
  { id: "all", label: "All Recipes", emoji: "🍽️" },
  { id: "breakfast", label: "Breakfast", emoji: "🍳" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
  { id: "dinner", label: "Dinner", emoji: "🍛" },
  { id: "grill", label: "Grill", emoji: "🔥" },
  { id: "vegetarian", label: "Vegetarian", emoji: "🥗" },
  { id: "dessert", label: "Dessert", emoji: "🍰" }
];

let currentCategory = "all";
let currentSearch = "";
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function getFilteredRecipes() {
  return recipes.filter(r => {
    const matchesCategory = currentCategory === "all" || r.category === currentCategory;
    const search = currentSearch.toLowerCase();
    const matchesSearch =
      !search ||
      r.title.toLowerCase().includes(search) ||
      r.description.toLowerCase().includes(search) ||
      r.category.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });
}

function renderCategories() {
  const container = document.getElementById("category-grid");
  container.innerHTML = categories.map(cat => `
    <div class="category-card ${currentCategory === cat.id ? "active" : ""}"
         onclick="selectCategory('${cat.id}')">
      <span class="emoji">${cat.emoji}</span>
      <span>${cat.label}</span>
    </div>
  `).join("");
}

function renderRecipes() {
  const container = document.getElementById("recipe-grid");
  const filtered = getFilteredRecipes();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results" style="grid-column: 1/-1">
        <span class="emoji">🔍</span>
        <p>No recipes found. Try a different search or category!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(recipe => `
    <div class="recipe-card" onclick="openModal(${recipe.id})">
      <div class="recipe-img">${recipe.emoji}</div>
      <div class="recipe-body">
        <div class="recipe-meta">
          <span>⏱️ ${recipe.time}</span>
          <span>👥 ${recipe.servings} servings</span>
          <span class="recipe-tag">${categories.find(c => c.id === recipe.category)?.label || recipe.category}</span>
        </div>
        <h3 class="recipe-title">${recipe.title}</h3>
        <p class="recipe-desc">${recipe.description}</p>
        <div class="recipe-footer">
          <span class="difficulty ${recipe.difficulty}">${recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}</span>
          <button class="favorite-btn" onclick="toggleFavorite(event, ${recipe.id})"
            aria-label="Toggle favorite">
            ${favorites.includes(recipe.id) ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function selectCategory(id) {
  currentCategory = id;
  renderCategories();
  renderRecipes();
}

function toggleFavorite(event, id) {
  event.stopPropagation();
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderRecipes();
}

function openModal(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  document.getElementById("modal-emoji").textContent = recipe.emoji;
  document.getElementById("modal-title").textContent = recipe.title;
  document.getElementById("modal-time").textContent = recipe.time;
  document.getElementById("modal-servings").textContent = recipe.servings + " servings";
  document.getElementById("modal-difficulty").textContent =
    recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1);

  document.getElementById("modal-ingredients").innerHTML =
    recipe.ingredients.map(i => `<li>${i}</li>`).join("");

  document.getElementById("modal-steps").innerHTML =
    recipe.steps.map(s => `<li>${s}</li>`).join("");

  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function handleSearch(query) {
  currentSearch = query;
  renderRecipes();
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderRecipes();

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  searchInput.addEventListener("input", e => handleSearch(e.target.value));
  searchBtn.addEventListener("click", () => handleSearch(searchInput.value));

  document.getElementById("modal-overlay").addEventListener("click", e => {
    if (e.target === document.getElementById("modal-overlay")) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
});
