interface MenuItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  isVeg: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceForTwo: number;
  distance: string;
  isVeg: boolean;
  description: string;
  menu: MenuItem[];
}

interface CartItem {
  item: MenuItem;
  qty: number;
  restaurant: Restaurant;
}

export type { Restaurant, MenuItem, CartItem };
