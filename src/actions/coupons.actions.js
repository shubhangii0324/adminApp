import axios from '../helpers/axios';

export const addCoupons = form => {
    return async dispatch => {
        const res = await axios.post('/coupons/create', form);
        console.log(res);
    }
}