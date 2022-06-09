import { expect } from 'chai';
import { deleteUser, signUp, signIn } from '../utilities/request.js';
import { validUser, adminData, validEmails} from '../data/auth.data.js';
import { expected } from '../data/expected.js';
import {faker} from '@faker-js/faker';
import {getRandomPassword, getRandomUsername} from '../utilities/randomizer.js';

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

    describe('Username field', function() {

        describe('Positive tests', function() {
            it('should allow to sign up with valid username ', async () => {
                const newValidUser = {
                    ...validUser,
                    email: faker.internet.email(),
                    username: getRandomUsername(),
                };
                let regResult = await signUp(newValidUser);
                let userNameForConsole = regResult.data.user.username;
                console.log('userName = ' + userNameForConsole);
                console.log('length = ' + userNameForConsole.length);
                expect(regResult.status).to.eq(201);
                expect(regResult.data).to.haveOwnProperty('token');
                expect(regResult.data.token).not.to.be.empty;
                expect(regResult.data).to.haveOwnProperty('user');

                const loginResult = await signIn({
                    email: adminData.adminEmail,
                    password: adminData.adminPassword
                });

                let deleteResult = await deleteUser(regResult.data.user.id, loginResult.data.token);
                expect(deleteResult.status).to.eq(200);
            });
        });

        describe('Negative tests',function(){
            it('Should return error when Signup with empty username', async () => {
                try {
                    await signUp({
                        ...validUser,
                        email: faker.internet.email(),
                        username: '',
                    });
                    expect.fail('Test failed')
                } catch(error) {
                    if(error.name == 'AssertionError'){
                        throw error;
                    }else{
                        const{response: { status,data},} = error;
                        expect(status).to.equal(400);
                        expect(data).to.haveOwnProperty('message');
                        expect(data.message).to.equal(expected.auth.msgFailedSignUp);
                    }
                }
            });

            it('Should return error when Signup with duplicated username', async () => {
                let regResult = null;
                regResult = await signUp(validUser);
                    //console.log(regResult.data);

                try {
                    await signUp({
                        ...validUser,
                        email: faker.internet.email(),
                    });
                    expect.fail('Test failed')

                } catch(error) {
                    if(error.name == 'AssertionError'){
                        throw error;
                    }else{
                        const{response: { status,data},} = error;
                        expect(status).to.equal(400);
                        expect(data).to.haveOwnProperty('message');
                        expect(data.message).to.equal(expected.auth.msgFailedDuplicatedUsername);
                    }
                }
                const loginResult = await signIn({
                    email: adminData.adminEmail,
                    password :adminData.adminPassword
                });
                let deleteResult = await deleteUser(regResult.data.user.id,loginResult.data.token);
                expect(deleteResult.status).to.eq(200);
            });
        })
    });

    describe('Password field', function() {

        describe('Positive tests', function() {
            it('should allow to sign up with valid password ', async () => {
                const validPasswordRandom = getRandomPassword();
                console.log('password = ' + validPasswordRandom);
                console.log('length = ' + validPasswordRandom.length);
                const newValidUser = {
                    ...validUser,
                    email: faker.internet.email(),
                    password: validPasswordRandom,
                    password2: validPasswordRandom
                };
                let regResult = await signUp(newValidUser);
                expect(regResult.status).to.eq(201);
                expect(regResult.data).to.haveOwnProperty('token');
                expect(regResult.data.token).not.to.be.empty;
                expect(regResult.data).to.haveOwnProperty('user');

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

