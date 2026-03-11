import pizzaImg from "@/assets/menu/pizza.jpg";
import burgerImg from "@/assets/menu/burger.jpg";
import sandwichImg from "@/assets/menu/sandwich.jpg";
import coffeeImg from "@/assets/menu/coffee-latte.jpg";
import dessertImg from "@/assets/menu/dessert.jpg";

import cappuccinoImg from "@/assets/menu/cappuccino.png";
import latteImg from "@/assets/menu/coffee-latte.jpg";
import mochaImg from "@/assets/menu/coffee-latte.jpg";
import americanoImg from "@/assets/menu/coffee-latte.jpg";
import coldCoffeeImg from "@/assets/menu/coffee-latte.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  isAvailable?: boolean;
};

export const categories = [
  "All",
  "Desserts & Drinks",
  "Coffee",
  "Desserts",
  "South Special",
  "Pizza",
  "Burgers",
  "Munches",
  "Crunchy LA Fried Chicken",
  "Combo Meals",
  "Extras"
];

export const menuItems: MenuItem[] = [
  // Desserts & Drinks
  { id: "dd1", name: "Cold Coffee", price: 129, image: coldCoffeeImg, category: "Desserts & Drinks" },
  { id: "dd2", name: "Green Apple Delight", price: 79, image: dessertImg, category: "Desserts & Drinks" },
  { id: "dd3", name: "Mango Delight", price: 115, image: dessertImg, category: "Desserts & Drinks" },
  { id: "dd4", name: "Strawberry Delight", price: 95, image: dessertImg, category: "Desserts & Drinks" },
  { id: "dd5", name: "Choco Delight", price: 125, image: dessertImg, category: "Desserts & Drinks", tags: ["popular"] },
  { id: "dd6", name: "Masala Cold Drinks", price: 60, image: dessertImg, category: "Desserts & Drinks" },
  { id: "dd7", name: "Soft Drinks", price: 39, image: dessertImg, category: "Desserts & Drinks" },
  { id: "dd8", name: "Lemon Tea", price: 20, image: coffeeImg, category: "Desserts & Drinks" },

  // Coffee
  { id: "c1", name: "Cappuccino", price: 60, image: cappuccinoImg, category: "Coffee", tags: ["popular"] },
  { id: "c2", name: "Espresso", price: 80, image: coffeeImg, category: "Coffee" },
  { id: "c3", name: "Latte", price: 80, image: latteImg, category: "Coffee" },
  { id: "c4", name: "Café Mocha", price: 80, image: mochaImg, category: "Coffee", tags: ["signature"] },
  { id: "c5", name: "Hot Chocolate", price: 90, image: coffeeImg, category: "Coffee" },
  { id: "c6", name: "Americano", price: 70, image: americanoImg, category: "Coffee" },

  // Desserts
  { id: "d1", name: "Chocolate Ice Cake", price: 130, image: dessertImg, category: "Desserts", tags: ["signature"] },
  { id: "d2", name: "Choco Lava", price: 130, image: dessertImg, category: "Desserts", tags: ["popular"] },

  // South Special
  { id: "ss1", name: "Bangalore Buns", price: 75, image: sandwichImg, category: "South Special" },

  // Pizza
  { id: "p1_8", name: "Margherita Pizza - 8\"", price: 200, image: pizzaImg, category: "Pizza" },
  { id: "p1_10", name: "Margherita Pizza - 10\"", price: 235, image: pizzaImg, category: "Pizza" },
  { id: "p2_8", name: "Veg Delight Pizza - 8\"", price: 220, image: pizzaImg, category: "Pizza" },
  { id: "p2_10", name: "Veg Delight Pizza - 10\"", price: 290, image: pizzaImg, category: "Pizza", tags: ["popular"] },
  { id: "p3_8", name: "Veg Cheese Burst Pizza - 8\"", price: 260, image: pizzaImg, category: "Pizza" },
  { id: "p3_10", name: "Veg Cheese Burst Pizza - 10\"", price: 325, image: pizzaImg, category: "Pizza" },
  { id: "p4_8", name: "LA Paneer Pizza - 8\"", price: 260, image: pizzaImg, category: "Pizza" },
  { id: "p4_10", name: "LA Paneer Pizza - 10\"", price: 325, image: pizzaImg, category: "Pizza", tags: ["signature"] },
  { id: "p5_8", name: "Crispy Chicken Pizza - 8\"", price: 290, image: pizzaImg, category: "Pizza" },
  { id: "p5_10", name: "Crispy Chicken Pizza - 10\"", price: 365, image: pizzaImg, category: "Pizza" },
  { id: "p6_8", name: "Crunchy Chicken Cheese Burst Pizza - 8\"", price: 325, image: pizzaImg, category: "Pizza" },
  { id: "p6_10", name: "Crunchy Chicken Cheese Burst Pizza - 10\"", price: 390, image: pizzaImg, category: "Pizza" },
  { id: "p7_8", name: "LA Special Pizza - 8\"", price: 390, image: pizzaImg, category: "Pizza", tags: ["signature"] },
  { id: "p7_10", name: "LA Special Pizza - 10\"", price: 390, image: pizzaImg, category: "Pizza", tags: ["signature"] },

  // Burgers
  { id: "b1", name: "Old School Burger", price: 115, image: burgerImg, category: "Burgers" },
  { id: "b2", name: "LA Chicken Fillet Burger", price: 129, image: burgerImg, category: "Burgers", tags: ["popular"] },
  { id: "b3", name: "Chicken Fillet with Cheese Burger", price: 169, image: burgerImg, category: "Burgers" },
  { id: "b4", name: "LA Special Chicken Fillet Burger", price: 259, image: burgerImg, category: "Burgers", tags: ["signature"] },
  { id: "b5", name: "Egg Burger", price: 89, image: burgerImg, category: "Burgers" },
  { id: "b6", name: "Aloo Tikki Burger", price: 89, image: burgerImg, category: "Burgers" },
  { id: "b7", name: "Special LA Veg Burger", price: 195, image: burgerImg, category: "Burgers" },

  // Munches
  { id: "m1", name: "French Fries", price: 115, image: sandwichImg, category: "Munches", tags: ["popular"] },
  { id: "m2", name: "Peri Peri French Fries", price: 129, image: sandwichImg, category: "Munches" },
  { id: "m3", name: "Chicken Popcorn", price: 155, image: sandwichImg, category: "Munches" },
  { id: "m4", name: "Veg Nuggets", price: 99, image: sandwichImg, category: "Munches" },
  { id: "m5", name: "Fish Popcorn", price: 195, image: sandwichImg, category: "Munches" },
  { id: "m6", name: "Chicken Fillet Strips", price: 129, image: sandwichImg, category: "Munches", tags: ["signature"] },
  { id: "m7", name: "Fish Fillet Strips", price: 299, image: sandwichImg, category: "Munches" },
  { id: "m8", name: "Crunchy Fried Baby Corn", price: 129, image: sandwichImg, category: "Munches" },

  // Crunchy LA Fried Chicken
  { id: "fc1", name: "Fried Chicken 1pc", price: 105, image: burgerImg, category: "Crunchy LA Fried Chicken" },
  { id: "fc2", name: "Small Bucket 2pc", price: 190, image: burgerImg, category: "Crunchy LA Fried Chicken", tags: ["popular"] },
  { id: "fc3", name: "Medium Bucket 4pc", price: 389, image: burgerImg, category: "Crunchy LA Fried Chicken" },
  { id: "fc4", name: "Large Bucket 6pc", price: 519, image: burgerImg, category: "Crunchy LA Fried Chicken", tags: ["signature"] },
  { id: "fc5", name: "Family Bucket 8pc", price: 689, image: burgerImg, category: "Crunchy LA Fried Chicken" },

  // Combo Meals
  { id: "cm1", name: "Chicken Fillet Burger Combo", price: 259, image: burgerImg, category: "Combo Meals", tags: ["popular"] },
  { id: "cm2", name: "Fried Chicken Combo", price: 259, image: burgerImg, category: "Combo Meals" },
  { id: "cm3", name: "Chicken Wings Combo", price: 259, image: burgerImg, category: "Combo Meals" },
  { id: "cm4", name: "Veg Burger Combo", price: 259, image: burgerImg, category: "Combo Meals" },
  { id: "cm5", name: "Chicken Fillet Burger Meal", price: 259, image: burgerImg, category: "Combo Meals" },
  { id: "cm6", name: "Fried Chicken Fillet Meal", price: 259, image: burgerImg, category: "Combo Meals" },
  { id: "cm7", name: "Chicken Wings Meal", price: 259, image: burgerImg, category: "Combo Meals" },
  { id: "cm8", name: "Veg Burger Meal", price: 259, image: burgerImg, category: "Combo Meals" },

  // Extras
  { id: "e1", name: "LA Special Dips", price: 20, image: sandwichImg, category: "Extras" },
  { id: "e2", name: "Extra Cheese", price: 25, image: pizzaImg, category: "Extras" }
];

