import axios from 'axios';
const BASE_URL = "https://api.proshop.com";

export function signup(data){
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




