import {expect} from 'chai';
import nock from 'nock';
import{signup} from '../Utilities/request.js';

describe('AUTH signup', function() {
    beforeEach(function() {
        const signupResponse = {
            "msg": "Register successful!",
            "success": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzhiYjZmNmFkNTdjYTlmNmJkMTY0ZiIsImlhdCI6MTY0Nzg4NTE2NywiZXhwIjoxNjQ3OTcxNTY3fQ.v66KjR_Ch-LKFeTLerAL0nCaw5qMBJTnu7QLtsom5uc",
            "user": {
                "id": "6238bb6f6ad57ca9f6bd164f",
                "username": "Claud.Hahn3",
                "firstname": "Adam",
                "lastname": "McCullough",
                "name": "undefined undefined",
                "email": "Wilfredo.Marquardt87@hotmail.com",
                "isAdmin": false
            }
        };

        // Mock the TMDB configuration request response
        nock('https://api.proshop.com')
            .post('/api/users')
            .reply(201, signupResponse);
    });

    it('should sign up with valid data', async function() {
        const data = {
            "username": "Claud.Hahn3",
            "email": "Wilfredo.Marquardt87@hotmail.com",
            "password": "Pa33word!",
            "password2": "Pa33word!",
            "firstname": "Adam",
            "lastname": "McCullough",
        };

        await signup(data).then(function (response) {
            console.log(JSON.stringify(response.data));
        })
            .catch(function (error) {
                console.log(error);
        });

    });
});