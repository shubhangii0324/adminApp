import axios from '../helpers/axios';

export const addTaxes = form => {
    return async dispatch => {
        const res = await axios.post('/taxes/create', form);
        console.log(res);
    }
}