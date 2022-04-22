import axios from 'axios';
const BASE_URL = "https://api.proshop.com";

export function signUp(data){
    const config = {
        method: 'post',
        url: BASE_URL + '/api/users',
        headers: {
            'Contrnt-Type': 'application/json'
        },
        data : data
    };

    return axios(config);
}
export function signIn(data){
    const config = {
        method: 'post',
        url: BASE_URL + '/api/users/login',
        headers: {
            'Contrnt-Type': 'application/json'
        },
        data : data
    };

    return axios(config);
}



