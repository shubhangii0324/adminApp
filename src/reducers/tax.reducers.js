import { taxConstants } from '../actions/constants';

const initialState = {
    taxes: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case taxConstants.GET_ALL_TAXES_SUCCESS:
            state = {
                ...state,
                taxes: action.payload.taxes
            }
            break;
    }
    return state;
}