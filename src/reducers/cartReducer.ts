import { orderSumaryType } from '../contexts';
import { ICartProduct } from '../interfaces';
import { ShippingAddressType } from '../interfaces';

type CartStateType = {
  cart: ICartProduct[];
  orderSumary: orderSumaryType;
  shippingAddress?: ShippingAddressType;
};
type CartActionType =
  | {
      type: 'LOAD_CART_FROM_COOKIES';
      payload: ICartProduct[];
    }
  | {
      type: 'ADD_UPDATE_PRODUCT_TO_CART';
      payload: ICartProduct[];
    }
  | {
      type: 'UPDATE_QUANTITY_PRODUCT_IN_CART' | 'REMOVE_PRODUCT_FROM_CART';
      payload: ICartProduct;
    }
  | {
      type: 'UPDATE_ORDER_SUMARY';
      payload: orderSumaryType;
    }
  | {
      type: 'SET_SHIPPING_ADDRESS';
      payload: ShippingAddressType;
    };

export const cartReducer = (cartState: CartStateType, action: CartActionType): CartStateType => {
  switch (action.type) {
    case 'LOAD_CART_FROM_COOKIES':
      return {
        ...cartState,
        cart: action.payload,
      };

    case 'ADD_UPDATE_PRODUCT_TO_CART':
      return {
        ...cartState,
        cart: [...action.payload],
      };

    case 'UPDATE_QUANTITY_PRODUCT_IN_CART':
      return {
        ...cartState,
        cart: cartState.cart.map((product) => (product._id === action.payload._id && product.size === action.payload.size ? action.payload : product)),
      };

    case 'REMOVE_PRODUCT_FROM_CART':
      return {
        ...cartState,
        cart: cartState.cart.filter((product) => !(product._id === action.payload._id && product.size === action.payload.size)),
      };

    case 'UPDATE_ORDER_SUMARY':
      return {
        ...cartState,
        orderSumary: action.payload,
      };
    case 'SET_SHIPPING_ADDRESS':
      return {
        ...cartState,
        shippingAddress: action.payload,
      };

    default:
      return cartState;
  }
};
