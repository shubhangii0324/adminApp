import axios from '../helpers/axios';

export const addSeller = form => {
    return async dispatch => {
    const res = await axios.post('/seller/create', form);
    console.log(res);
    }
}