import { couponConstants } from '../actions/constants';

const initialState = {
    coupons: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case couponConstants.GET_ALL_COUPONS_SUCCESS:
            state = {
                ...state,
                coupons: action.payload.coupons
            }
            break;
    }
    return state;
}