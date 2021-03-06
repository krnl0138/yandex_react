import {
  ADD_CART_INGREDIENT,
  DELETE_CART_INGREDIENT,
  ADD_CART_INGREDIENT_BUN,
  MOVE_CART_INGREDIENT,
  CLEAR_CART_INGREDIENT,
  TCartActions,
} from '../actions/cart';
import update from 'immutability-helper';
import type { TIngredient } from '../../types/types';

interface IState {
  readonly cartIngredients: ReadonlyArray<TIngredient>;
  readonly bunIngredients: ReadonlyArray<TIngredient>;
}

const initialState: IState = {
  cartIngredients: [],
  bunIngredients: [],
};

export const cartReducer = (state = initialState, action: TCartActions): IState => {
  switch (action.type) {
    case ADD_CART_INGREDIENT: {
      return {
        ...state,
        cartIngredients: [...state.cartIngredients, action.ingredient],
      };
    }
    case ADD_CART_INGREDIENT_BUN: {
      return {
        ...state,
        bunIngredients: [action.ingredient],
      };
    }
    case MOVE_CART_INGREDIENT: {
      // ingredient: {item: TIngredient, index: number}
      return {
        ...state,
        cartIngredients: update(state.cartIngredients, {
          $splice: [
            [action.ingredient.index, 1],
            [action.dropIndex, 0, action.ingredient.item],
          ] as never,
        }),
      };
    }
    case DELETE_CART_INGREDIENT: {
      // ingredient: number (of el in a cart)
      return {
        ...state,
        cartIngredients: state.cartIngredients.filter(
          (_, index) => index !== action.ingredientIndex
        ),
      };
    }
    case CLEAR_CART_INGREDIENT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
