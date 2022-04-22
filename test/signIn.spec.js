import {expect} from 'chai';
import nock from 'nock';
import{signIn} from '../Utilities/request.js';

describe('AUTH signIn', function() {
    beforeEach(function() {
        const signInResponse = {
            "msg": "Login successfull!",
            "success": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzllNmY5ZDcxMWQwZDExMzFhMTY5MCIsImlhdCI6MTY0ODU4MzY4MywiZXhwIjoxNjQ4NjcwMDgzfQ.yf6sipECTxuFY7_6dQX86xU0Fzqh5BBZrGQMLngxQ0A",
            "user": {
                "id": "6239e6f9d711d0d1131a1690",
                "name": "Zoe Smith",
                "email": "zoe.smith@gmail.com",
                "isAdmin": false
            }
        };

        // Mock the TMDB configuration request response
        nock('https://api.proshop.com')
            .post('/api/users/login')
            .reply(200, signInResponse);
    });

    it('should sign in with valid data', async function() {
        const data = {
            "email": "Delta_Labadie1@hotmail.com",
            "password": "Pa33word!"
        };

        await signIn(data).then(function (response) {
            console.log(JSON.stringify(response.data));
        })
            .catch(function (error) {
                console.log(error);
        });

    });
});