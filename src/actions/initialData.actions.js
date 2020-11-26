import { initialDataConstants, categoryConstants, productConstants, taxConstants, createUserConstants, sellerConstants, couponConstants } from './constants';
import axios from '../helpers/axios';

export const getInitialData = () =>  {
    return async dispatch => {
        const res = await axios.post('/initialdata');
        if(res.status === 200){
            const { categories, products, taxes, users, sellers, coupons } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {categories}
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: {products}
            });
            dispatch({
                type: taxConstants.GET_ALL_TAXES_SUCCESS,
                payload: {taxes}
            });
            dispatch({
                type: createUserConstants.GET_ALL_USER_SUCCESS,
                payload: {users}
            });
            dispatch({
                type: sellerConstants.GET_ALL_SELLER_SUCCESS,
                payload: {sellers}
            });
            dispatch({
                type: couponConstants.GET_ALL_COUPONS_SUCCESS,
                payload: {coupons}
            });
        }
        console.log(res)
    }
}