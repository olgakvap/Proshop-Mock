import {validUser} from "../../data/auth.data";

describe('Signup user with valid data',() =>{

    before('Open Signup page', () => {
        cy.visit('https://qa-proshop.herokuapp.com/');
        cy.get('a[href="/login"]').click();
        cy.get('a[href="/register?redirect=/"]').click();
    });

    it('Should sing up a new user', () => {
        cy.get('#firstname').type(validUser.firstname);
        cy.get('#lastname').type(validUser.lastname);
        cy.get('#username').type(validUser.username);
        cy.get('#email').type(validUser.email);
        cy.get('#password').type(validUser.password);
        cy.get('#password2').type(validUser.password2);
        cy.get('.btn-primary').click();
    });

    after('Cleanup', () => {
        cy.Cleanup();
    })
})