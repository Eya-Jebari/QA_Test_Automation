// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



  
  // Create a custom command to click a button by its ID
  export const buttonIds = {
    button1: '[id="offer_poste_6"]', 
    button2: '[id="offer_poste_12"]'  
  };


  Cypress.Commands.add('clickButtonById', (buttonName) => {
    const buttonId = buttonIds[buttonName];
  
    cy.get(buttonId).click();
  });


 