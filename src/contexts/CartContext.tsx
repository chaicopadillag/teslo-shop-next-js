import { createContext, FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import { cartReducer } from '../reducers';
import { ICartProduct, IOrder, ShippingAddressType } from '../interfaces';
import { tesloApi } from '../services';

export type OrderSumaryType = {
  quantityItems: number;
  subTotal: number;
  tax: number;
  total: number;
};

type cartContextState = {
  cart: ICartProduct[];
  addProductToCart: (product: ICartProduct) => void;
  updateProductQuantityInCart: (product: ICartProduct) => void;
  removeProductCart: (product: ICartProduct) => void;
  orderSumary: OrderSumaryType;
  shippingAddress?: ShippingAddressType;
  setShippingAddress: (address: ShippingAddressType) => void;
  processOrder: () => Promise<{ hasError: boolean; message: string; data: IOrder }>;
};

const cartInitialState: cartContextState = {
  cart: [],
  addProductToCart: (p) => {},
  updateProductQuantityInCart: (p) => {},
  removeProductCart: (p) => {},
  orderSumary: {
    quantityItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
  },
  setShippingAddress: (address) => {},
  processOrder: () => ({} as Promise<{ hasError: boolean; message: string; data: IOrder }>),
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
    Cookie.set('cart', JSON.stringify(state.cart), { sameSite: 'strict' });
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

  const updateProductQuantityInCart = (product: ICartProduct) => {
    dispatch({ type: 'UPDATE_QUANTITY_PRODUCT_IN_CART', payload: product });
  };

  const removeProductCart = (product: ICartProduct) => {
    dispatch({ type: 'REMOVE_PRODUCT_FROM_CART', payload: product });
  };

  const setShippingAddress = (address: ShippingAddressType) => {
    dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: address });
  };

  const processOrder = async () => {
    try {
      if (!state.shippingAddress) throw new Error('No tienes dirección de envío');

      const order: IOrder = {
        orderItems: state.cart.map((item) => ({ ...item, size: item.size! })),
        shippingAddress: state.shippingAddress,
        numberOfItems: state.orderSumary.quantityItems,
        subTotal: state.orderSumary.subTotal,
        tax: state.orderSumary.tax,
        total: state.orderSumary.total,
        isPaid: false,
      };

      const { data } = await tesloApi.post('/order', order);

      dispatch({ type: 'CLEAR_CART' });

      return { hasError: false, message: 'Orden procesada', data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { hasError: true, message: error.response?.data.message, data: {} as IOrder };
      }
      return { hasError: true, message: 'Error al procesar orden', data: {} as IOrder };
    }
  };

  useEffect(() => {
    const shippingAddress: ShippingAddressType = JSON.parse(Cookie.get('address') || '{}');
    if (Object.keys(shippingAddress).length === 8) {
      dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: shippingAddress });
    }
  }, []);

  useEffect(() => {
    const quantityItems = state.cart.reduce((prev, current) => prev + current.quantity, 0);
    const subTotal = state.cart.reduce((prev, current) => prev + current.price * current.quantity, 0);
    const tax = subTotal * Number(process.env.NEXT_PUBLIC_TAX_PERCENTAGE || 0.18);
    const total = subTotal + tax;

    const orderSumary = {
      quantityItems,
      subTotal,
      tax,
      total,
    };
    dispatch({ type: 'UPDATE_ORDER_SUMARY', payload: orderSumary });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateProductQuantityInCart,
        removeProductCart,
        setShippingAddress,
        processOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
