const sql = require("better-sqlite3");
const db = sql("recipes.db");

const dummyRecipes = [
  {
    title: "Strawberry Cheesecake Tiramisu",
    description: "A delightful fusion of strawberry, cheesecake, and tiramisu.",
    ingredients: [
      "1 package ladyfingers",
      "2 cups mascarpone cheese",
      "1 cup heavy cream",
      "1 cup strawberries, sliced",
      "1/2 cup sugar",
      "1/2 cup coffee, cooled",
      "1 teaspoon vanilla extract",
      "Cocoa powder for dusting",
    ],
    instructions: [
      "Dip ladyfingers in coffee and layer them in a dish.",
      "Mix mascarpone cheese, heavy cream, sugar, and vanilla extract until smooth.",
    ],
    imageUrl: "/images/strawberry_cheesecake_tiramisu.png",
    category: "Dessert",
    access: "private",
    slug: "strawberry-cheesecake-tiramisu",
  },
  {
    title: "Greek Pasta Salad",
    description:
      "A family favorite recipe that my mom has been making for years.",
    ingredients: [
      "1 pound pasta (fusilli or penne)",
      "1 cup cherry tomatoes, halved",
      "1 cucumber, diced",
      "1/2 red onion, thinly sliced",
      "1/2 cup Kalamata olives, pitted and halved",
    ],
    instructions: [
      "Cook pasta according to package instructions, drain and cool.",
      "In a large bowl, combine pasta, tomatoes, cucumber, onion, and olives.",
      "Drizzle with olive oil and lemon juice, season with salt and pepper, and toss to combine.",
    ],
    imageUrl: "",
    category: "Sides",
    access: "public",
    slug: "greek-pasta-salad",
  },
  {
    title: "Chicken Tikka Masala Enchiladas",
    description: "Amazingly delicious fusion of Indian and Mexican cuisine.",
    ingredients: [
      "2 cups cooked chicken, shredded",
      "1 cup tikka masala sauce",
      "8 flour tortillas",
      "1 cup shredded cheese (cheddar or Mexican blend)",
      "1/2 cup sour cream",
      "1/4 cup chopped cilantro",
    ],
    instructions: [
      "Preheat oven to 350°F (175°C).",
      "In a bowl, mix shredded chicken with tikka masala sauce.",
      "Fill each tortilla with the chicken mixture, roll up, and place in a baking dish.",
      "Top with shredded cheese and bake for 20-25 minutes until cheese is melted and bubbly.",
    ],
    imageUrl: "",
    category: "Mains",
    access: "private",
    slug: "chicken-tikka-masala-enchiladas",
  },
  {
    title: "Strawberry Shortcake Bar Ice Cream Cake",
    description: "A delicious and refreshing dessert perfect for summer.",
    ingredients: [
      "1 box strawberry shortcake bars",
      "2 cups vanilla ice cream",
      "1 cup whipped cream",
      "1/2 cup fresh strawberries, sliced",
      "Chocolate sauce for drizzling",
    ],
    instructions: [
      "Layer strawberry shortcake bars in a springform pan.",
      "Spread a layer of vanilla ice cream over the bars.",
      "Top with whipped cream and sliced strawberries.",
      "Drizzle with chocolate sauce and freeze for at least 4 hours before serving.",
    ],
    imageUrl: "",
    category: "Desserts",
    access: "public",
    slug: "strawberry-shortcake-bar-ice-cream-cake",
  },
];

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    imageUrl TEXT,
    category TEXT NOT NULL,
    access TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
 ) `
).run();

async function initData() {
  const insert = db.prepare(
    `
    INSERT INTO recipes (title, description, ingredients, instructions, imageUrl, category, access, slug)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
  );

  for (const recipe of dummyRecipes) {
    try {
      insert.run(
        recipe.title,
        recipe.description,
        JSON.stringify(recipe.ingredients),
        JSON.stringify(recipe.instructions),
        recipe.imageUrl,
        recipe.category,
        recipe.access,
        recipe.slug
      );
    } catch (error) {
      console.error(`Error inserting recipe ${recipe.title}:`, error);
    }
  }

  console.log("Database initialized with dummy recipes.");
}

initData();
