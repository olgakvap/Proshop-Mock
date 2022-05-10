import {deleteUser, signUp, signIn} from '../Utilities/request.js';
import { validUser, adminData }  from '../data/auth.data.js';
// import { expected } from '../data/expected.js';
import { expect } from 'chai';


describe('AUTH signup', function() {
    describe('SMOKE', function() {
        let regResult = null;

        before(async() => {
            regResult = await signUp(validUser);
            //console.log(regResult.data);
        });

        it('Should return status code 201',() => {
            expect(regResult.status).to.eq(201);
        });

        after(async function cleanUp() {
            const loginResult = await signIn({
                email: adminData.adminEmail,
                password :adminData.adminPassword
            });
            await deleteUser(regResult.data.user.id,loginResult.data.token);
        });
    });
});