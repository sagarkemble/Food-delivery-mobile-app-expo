import { CartItem, MenuItem } from "./Restraunt.types";

interface UserContextType {
  isLoggedIn: boolean;
  name: string;
  email: string;
  password: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  orders: CartItem[];
  setOrders: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export type { UserContextType };
