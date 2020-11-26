import { sellerConstants } from '../actions/constants';

const initialState = {
    sellers: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case sellerConstants.GET_ALL_SELLER_SUCCESS:
            state = {
                ...state,
                sellers: action.payload.sellers
            }
            break;
    }
    return state;
}