import {expect} from 'chai';
import {deleteUser, signIn} from '../Utilities/request.js';
import {adminData, validUser} from "../data/auth.data.js";
import { expected } from '../data/expected.js';

describe('AUTH signIn', function() {
    describe('SMOKE',function() {
        let regSignIn = null;

    before(async () => {
        regSignIn = await signIn(validUser);
    });

    it('should return status code 200',   () => {
        expect(regSignIn.status).to.eq(200);
    });

    it('should return correct message',   () => {
        expect(regSignIn.data.msg).to.equal(expected.auth.msgSuccessfulSignIn);
    });

    it('Should return user token',() => {
        expect(regSignIn.data).to.haveOwnProperty("token");
        expect(regSignIn.data.token).not.to.be.empty;
    });

    it('Should return user with valid data',() => {
        expect(regSignIn.data).to.haveOwnProperty("user");
        expect(regSignIn.data.user).to.haveOwnProperty("id").not.to.be.empty;
        expect(regSignIn.data.user).to.haveOwnProperty("username").not.to.be.empty;
        expect(regSignIn.data.user).to.haveOwnProperty("email").not.to.be.empty;
        expect(regSignIn.data.user).to.haveOwnProperty("isAdmin").to.be.false;
    });

    after(async function cleanUp() {
        const loginResult = await signIn({
            email: adminData.adminEmail,
            password :adminData.adminPassword
        });
        let deleteResult = await deleteUser(regSignIn.data.user.id,loginResult.data.token);
        expect(deleteResult.status).to.eq(200);
       });
    });
});