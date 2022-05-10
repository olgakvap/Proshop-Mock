import {deleteUser, signUp, signIn} from '../Utilities/request.js';
import { validUser }  from '../data/auth.data.js';
// import { expected } from '../data/expected.js';
import { adminData }  from '../data/auth.data.js';


describe('AUTH signup', function() {
    describe('SMOKE', function() {
        let regResult = null;
        before(async() => {
            regResult = await signUp(validUser);
            console.log(regResult);
        });

        it('Should return status code 201',() => {
            expect(regResult.status).to.eq(201);
        });
        after(async function cleanUp() {
            const loginResult = await signIn({
                email: adminData.adminEmail,
                password :adminData.adminPassword
            })
            await deleteUser(regResult.data.user.id,loginResult.data.token)
        });

        // it('Should return correct message',() => {
        //     expect(result.status).to.eq(201);
        // });
    });
    // beforeEach(function() {
    //     const signupResponse = {
    //         "msg": "Register successful!",
    //         "success": true,
    //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzhiYjZmNmFkNTdjYTlmNmJkMTY0ZiIsImlhdCI6MTY0Nzg4NTE2NywiZXhwIjoxNjQ3OTcxNTY3fQ.v66KjR_Ch-LKFeTLerAL0nCaw5qMBJTnu7QLtsom5uc",
    //         "user": {
    //             "id": "6238bb6f6ad57ca9f6bd164f",
    //             "username": "Claud.Hahn3",
    //             "firstname": "Adam",
    //             "lastname": "McCullough",
    //             "name": "undefined undefined",
    //             "email": "Wilfredo.Marquardt87@hotmail.com",
    //             "isAdmin": false
    //         }
    //     };
    // });

    // it('should sign up with valid data', async function() {
    //     const data = {
    //         "username": "Claud.Hahn3",
    //         "email": "Wilfredo.Marquardt87@hotmail.com",
    //         "password": "Pa33word!",
    //         "password2": "Pa33word!",
    //         "firstname": "Adam",
    //         "lastname": "McCullough",
    //     };
    //
    //     await signUp(data).then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //     })
    //         .catch(function (error) {
    //             console.log(error);
    //     });
    //
    // });
});