import {expect} from 'chai';
import {deleteUser, signIn, signUp} from '../Utilities/request.js';
import {adminData, validUser} from "../data/auth.data.js";
import { expected } from '../data/expected.js';

describe('AUTH signIn', function() {
    describe('SMOKE',function() {
        let logInResult = null;

    before(async () => {
        await signUp(validUser);
        logInResult = await signIn(validUser);
        console.log(logInResult.data);
    });

     it('should return status code 200',   () => {
         expect(logInResult.status).to.eq(200);
     });

    it('should return correct message',   () => {
        expect(logInResult.data.msg).to.equal(expected.auth.msgSuccessfulSignIn);
    });

    it('Should return user token',() => {
        expect(logInResult.data).to.haveOwnProperty("token");
        expect(logInResult.data.token).not.to.be.empty;
    });

    it('Should return user with valid data',() => {
        expect(logInResult.data).to.haveOwnProperty("user");
        expect(logInResult.data.user).to.haveOwnProperty("id").not.to.be.empty;
        expect(logInResult.data.user).to.haveOwnProperty("username").not.to.be.empty;
        expect(logInResult.data.user).to.haveOwnProperty("email").not.to.be.empty;
        expect(logInResult.data.user).to.haveOwnProperty("isAdmin").to.be.false;
    });

    after(async function cleanUp() {
        const loginResult = await signIn({
            email: adminData.adminEmail,
            password :adminData.adminPassword
        });
        let deleteResult = await deleteUser(logInResult.data.user.id,loginResult.data.token);
        expect(deleteResult.status).to.eq(200);
       });
     });
});