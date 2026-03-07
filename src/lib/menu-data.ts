import pizzaImg from "@/assets/pizza.jpg";
import burgerImg from "@/assets/burger.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import coffeeImg from "@/assets/coffee-latte.jpg";
import dessertImg from "@/assets/dessert.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
};

export const categories = ["All", "Pizza", "Burgers", "Sandwiches", "Coffee", "Desserts"];

export const menuItems: MenuItem[] = [
  { id: "p1", name: "Margherita Classic", description: "San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil", price: 14.99, image: pizzaImg, category: "Pizza", tags: ["popular"] },
  { id: "p2", name: "Truffle Mushroom", description: "Wild mushrooms, truffle oil, fontina cheese, and fresh thyme", price: 18.99, image: pizzaImg, category: "Pizza", tags: ["signature"] },
  { id: "p3", name: "Pepperoni Feast", description: "Double pepperoni, mozzarella, and our signature tomato sauce", price: 16.99, image: pizzaImg, category: "Pizza" },
  { id: "b1", name: "Classic Smash Burger", description: "Double smashed patty, American cheese, pickles, and special sauce", price: 13.99, image: burgerImg, category: "Burgers", tags: ["popular"] },
  { id: "b2", name: "Truffle Burger", description: "Wagyu beef, truffle aioli, gruyère, caramelized onions", price: 19.99, image: burgerImg, category: "Burgers", tags: ["signature"] },
  { id: "b3", name: "Veggie Deluxe", description: "Plant-based patty, avocado, roasted peppers, vegan aioli", price: 14.99, image: burgerImg, category: "Burgers" },
  { id: "s1", name: "Club Royale", description: "Triple-decker with turkey, bacon, lettuce, tomato, and herb mayo", price: 12.99, image: sandwichImg, category: "Sandwiches", tags: ["popular"] },
  { id: "s2", name: "Grilled Caprese", description: "Fresh mozzarella, tomato, basil pesto on sourdough", price: 11.99, image: sandwichImg, category: "Sandwiches" },
  { id: "c1", name: "Signature Latte", description: "Double-shot espresso with velvety steamed milk and latte art", price: 5.99, image: coffeeImg, category: "Coffee", tags: ["signature"] },
  { id: "c2", name: "Caramel Macchiato", description: "Espresso with vanilla syrup, steamed milk, and caramel drizzle", price: 6.49, image: coffeeImg, category: "Coffee", tags: ["popular"] },
  { id: "c3", name: "Cold Brew", description: "24-hour steeped cold brew, smooth and rich, served over ice", price: 4.99, image: coffeeImg, category: "Coffee" },
  { id: "d1", name: "Chocolate Lava Cake", description: "Warm chocolate fondant with vanilla gelato and berry coulis", price: 9.99, image: dessertImg, category: "Desserts", tags: ["signature"] },
  { id: "d2", name: "Tiramisu", description: "Classic Italian layers of espresso-soaked ladyfingers and mascarpone", price: 8.99, image: dessertImg, category: "Desserts", tags: ["popular"] },
];
