import {expect} from 'chai';
import {deleteUser, signIn, signUp} from '../Utilities/request.js';
import {adminData, validUser, invalidPasswords} from "../data/auth.data.js";
import { expected } from '../data/expected.js';

describe('AUTH signIn', function() {
    describe('SMOKE',function() {
        let logInResult = null;

    before(async () => {
        await signUp(validUser);
        logInResult = await signIn({
            email: validUser.email,
            password :validUser.password
        });
        //console.log(logInResult.data);
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



    describe('Negative test for sign in user',function() {

        it('Should return error for non-existing user', async () => {
           try {
               await signIn({
                   email: validUser.email,
                   password: validUser.password
               });
               expect.fail('Test failed')
           } catch(error) {
               if(error.name == 'AssertionError'){
                   throw error;
               }else{
                   const{response: { status,data},} = error;
                   expect(status).to.equal(400);
                   expect(data).to.haveOwnProperty('message');
                   expect(data.message).to.equal(expected.auth.msgFailedSignIn);
               }
           }

        });

        invalidPasswords.forEach((invalidPassword) =>
            it('should return error for valid user with valid email and invalid password', async () => {
                try {
                    await signIn({
                        email: validUser.email,
                        password: invalidPassword
                    });
                    expect.fail('Test failed');

                } catch (error) {
                    if (error.name == 'AssertionError') {
                        throw error;
                    } else {
                        const {response: {status, data},} = error;
                        expect(status).to.equal(400);
                        expect(data).to.haveOwnProperty('message');
                        expect(data.message).to.equal(expected.auth.msgFailedSignIn);
                    }
                }
            }));
    });
});