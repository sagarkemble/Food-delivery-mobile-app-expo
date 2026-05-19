import { createContext, useState } from "react";
import type { UserContextType } from "../types/useContext.type";
import { CartItem, MenuItem } from "../types/Restraunt.types";

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  name: "",
  email: "",
  password: "",
  setName: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setIsLoggedIn: () => {},
  cartItems: [],
  setCartItems: () => {},
  orders: [],
  setOrders: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("sagar kemble");
  const [email, setEmail] = useState("sagarkemble.sasa@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<CartItem[]>([]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        setIsLoggedIn,
        cartItems,
        setCartItems,
        orders,
        setOrders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
