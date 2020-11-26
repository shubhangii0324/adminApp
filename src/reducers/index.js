import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import userReducer from './user.reducer';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import taxReducer from './tax.reducers';
import createUserReducer from './user';
import sellerReducer from './seller.reducer';
import couponReducer from './coupons.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    order: orderReducer,
    product: productReducer,
    tax: taxReducer,
    createUser: createUserReducer,
    seller: sellerReducer,
    coupons: couponReducer
});

export default rootReducer;