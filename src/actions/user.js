import axios from '../helpers/axios';

export const addUser = form => {
    return async dispatch => {
        const res = await axios.post('/user/create', form);
        console.log(res);
    }
}