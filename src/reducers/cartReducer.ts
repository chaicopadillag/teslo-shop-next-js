import { ICartProduct } from '../interfaces';

type CartStateType = {
  cart: ICartProduct[];
};
type CartActionType = {
  type: 'LOAD_CART_FROM_COOKIES' | 'ADD_UPDATE_PRODUCT_TO_CART';
  payload: ICartProduct[];
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

    default:
      return cartState;
  }
};
