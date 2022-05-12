import {deleteUser, signUp, signIn} from '../Utilities/request.js';
import {validUser, adminData, validEmails, validPassword, validUsername} from '../data/auth.data.js';
import { expected } from '../data/expected.js';
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

        it('Should return correct message',() => {
            expect(regResult.data.msg).to.equal(expected.auth.msgSuccessfulSignUp);
        });

        it('Should return user token',() => {
            expect(regResult.data).to.haveOwnProperty("token");
            expect(regResult.data.token).not.to.be.empty;
        });

        it('Should return user with valid data',() => {
            expect(regResult.data).to.haveOwnProperty("user");
            expect(regResult.data.user).to.haveOwnProperty("id").not.to.be.empty;
            expect(regResult.data.user).to.haveOwnProperty("username").not.to.be.empty;
            expect(regResult.data.user).to.haveOwnProperty("email").not.to.be.empty;
            expect(regResult.data.user).to.haveOwnProperty("isAdmin").to.be.false;
        });

        after(async function cleanUp() {
            const loginResult = await signIn({
                email: adminData.adminEmail,
                password :adminData.adminPassword
            });
            let deleteResult = await deleteUser(regResult.data.user.id,loginResult.data.token);
            expect(deleteResult.status).to.eq(200);
        });
    });
});

describe('Email field',function() {

    describe('Positive tests', function () {

        validEmails.forEach((validEmail) => {
            it('should validate email field', async () => {
                let regResult = await signUp({
                    ...validUser,
                    email: validEmail,
                });
                expect(regResult.status).to.equal(201);
                expect(regResult.data).to.haveOwnProperty("token");
                expect(regResult.data.token).not.to.be.empty;
                expect(regResult.data).to.haveOwnProperty("user");

                const loginResult = await signIn({
                    email: adminData.adminEmail,
                    password: adminData.adminPassword
                });
                let deleteResult = await deleteUser(regResult.data.user.id, loginResult.data.token);
                expect(deleteResult.status).to.eq(200);
            });
        });
    });

    describe('Username field',function() {

        describe('Positive tests', function () {

            validUsername.forEach(validUsername => {
                it('should validate username field', async () => {
                    let regResult = await signUp({
                        ...validUser,
                        username: validUsername,
                    });

                    expect(regResult.status).to.eq(201);
                    expect(regResult.data).to.haveOwnProperty("token");
                    expect(regResult.data.token).not.to.be.empty;
                    expect(regResult.data).to.haveOwnProperty("user");

                    const loginResult = await signIn({
                        email: adminData.adminEmail,
                        password: adminData.adminPassword
                    });
                    let deleteResult = await deleteUser(regResult.data.user.id, loginResult.data.token);
                    expect(deleteResult.status).to.eq(200);
                });
            });
        });


    });

});
