import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from './actions';

const initialState = {
    shoppingList: [],
};

const shoppingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return { ...state, shoppingList: [...state.shoppingList, action.payload] };
        case EDIT_ITEM:
            return {
                ...state,
                shoppingList: state.shoppingList.map((item) =>
                    item.id === action.payload.id ? action.payload.updatedItem : item
                ),
            };
        case DELETE_ITEM:
            return {
                ...state,
                shoppingList: state.shoppingList.filter((item) => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default shoppingReducer;