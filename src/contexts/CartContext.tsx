import { createContext, FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { cartReducer } from '../reducers';
import { ICartProduct } from '../interfaces';

type cartContextState = {
  cart: ICartProduct[];
  addProductToCart: (product: ICartProduct) => void;
};

const cartInitialState: cartContextState = {
  cart: [],
  addProductToCart: (p) => {},
};

export const CartContext = createContext<cartContextState>({} as cartContextState);

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  useEffect(() => {
    try {
      const cart: [] = JSON.parse(Cookie.get('cart') || '[]');
      if (cart.length > 0) {
        dispatch({ type: 'LOAD_CART_FROM_COOKIES', payload: cart });
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((prod) => prod._id === product._id && prod.size === product.size);

    if (!productInCart) return dispatch({ type: 'ADD_UPDATE_PRODUCT_TO_CART', payload: [...state.cart, product] });

    const updatedProd = state.cart.map((prod) => {
      if (prod._id !== product._id) return prod;

      if (prod.size !== product.size) return prod;

      return { ...prod, quantity: prod.quantity + product.quantity };
    });

    dispatch({ type: 'ADD_UPDATE_PRODUCT_TO_CART', payload: updatedProd });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
