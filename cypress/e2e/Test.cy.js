import { OfferButtonId, GenderButtonId } from '../support/selectors';

import { generateUniqueEmail } from '../support/utils'


describe('Papernest QA Automation Test', () => {

  let email ;

  beforeEach(() => {
    // Generate a unique email address before each test
    email = generateUniqueEmail('papernest.com'); 
     
   });

  it('Navigates the application flow', () => {

    // Navigate to the first page
    cy.visit('https://app.papernest.com/onboarding?anonymous&anonymousId=test&id_text=1&destination=newspaper');

    // Click on the "Commencer" button
    cy.contains('Commencer').click();
  

//-- PAGE 1 --
 
    // Assert navigation to the first page
    cy.url().should('include','/app.papernest.com/account/mail/1?ch');
      
    // Fill in the arrival date field with a random date
         cy.get('[id="poste-subscription.begin_date"]').click(); 

         cy.xpath('//*[@id="mat-datepicker-0"]/mat-calendar-header/div/div/button[3]').click();

         cy.xpath('//*[@id="mat-datepicker-0"]/div/mat-month-view/table/tbody/tr[3]/td[4]/button/span[1]').click();
         
      
//-- PAGE 2 --
 
    // Assert the navigation to the second page   
       cy.url().should('include','/app.papernest.com/account/mail/2');
    
    //Type the old adress
       cy.get('[id="old_housing.address"]').type('48 Avenue de Tunis');
  
    // Wait for the suggestion list to appear
       cy.wait(100);
  
    // Select the desired suggestion from the list
       cy.xpath('//*[@id="animation-container"]/div[2]/div/ppn-question-layout/div[2]/ppn-autocomplete-adapter/ds-address-v2/div/ds-autocomplete-address/div/ul/li').contains('Saint-Maur-des-Fossés').click();

    // Assert that the value is correctly selected in the input box
       cy.get('[id="old_housing.address"]').should('have.value', '48 Avenue de Tunis 94100 Saint-Maur-des-Fossés');

    // Type the New adress
       cy.get('[id="housing.address"]').type('5 Rue Mars');

    // Wait for the suggestion list to appear
       cy.wait(100);

    // Select the desired suggestion from the list
       cy.xpath('//*[@id="animation-container"]/div[3]/div/ppn-question-layout/div[2]/ppn-autocomplete-adapter/ds-address-v2/div/ds-autocomplete-address/div/ul/li[1]').click();
    
    // Type in the housing number, street and city
       cy.xpath('//*[@id="housing.address.street_number"]').type('5');
       cy.xpath('//*[@id="housing.address.street"]').type('Rue Mars');
       cy.wait(100);
       cy.xpath('//*[@id="housing.address.city"]').type('94700');
       cy.xpath('//*[@id="animation-container"]/div[5]/div/ppn-question-layout/div[2]/ppn-autocomplete-adapter/ds-address-v2/div/ds-autocomplete-city/div/ul/li[1]/p').contains('94700').click();
       
    //Assert that the value is correctly selected in the input box
       cy.get('[id="housing.address.city"]').should('have.value', 'MAISONS ALFORT');

    //Click Suivant Button to navigate to the next page 
       cy.contains('Suivant').click();
  
     
//-- PAGE 3 --


    // Assert the navigation to the third page
       cy.url().should('include','/app.papernest.com/account/mail/3');
 
    // Select one of the suggested offers (Offer1: La Poste 6 mois or Offer2: La Poste 12 mois )
      cy.get(OfferButtonId.Offer1).click();
       
      
//-- PAGE 4 --

    // Assert the navigation to the fourth page
       cy.url().should('include','/app.papernest.com/account/mail/4');

    //Validate email
    // Intercept the POST request to /api/utils/email/
       cy.intercept('POST', '/api/utils/email/').as('validateEmail');
    
    // Trigger the email validation by typing into the email input field
       cy.xpath('//*[@id="user.email"]').type(email);
    
    // Wait for the intercepted request to complete and validate the response
       cy.wait('@validateEmail').its('response').then((response) => {

        // Assert the status code
          expect(response.statusCode).to.eq(200);
          
        // Assert the response body
          expect(response.body).to.deep.equal({ response: false });

        });
    
    // Enter the phone number
       cy.xpath('//*[@id="user.phone_number"]').type('700000005');

    // Select the customer gender  
       //cy.contains('Mme').click();
       cy.get(GenderButtonId.Gender1).click();

    // Enter First and Last name 
       cy.xpath('//*[@id="user.first_name"]').type('Sandra');
       cy.get('[id="user.last_name"]').type('Dupont');
       cy.wait(300);

      
       cy.scrollTo(0, 500);
      

    //Click the Button "Suivant" to navigate to the next page
        cy.xpath('//*[@id="button_next"]').click({ force: true });

        cy.wait(100);
//-- PAGE 5 --

    // Assert the navigation to the fifth page
    cy.url().should('include','/app.papernest.com/account/mail/5');

    // Choose the optin "Je reçois le code par mail"
    cy.xpath('//*[@id="text_post_office"]').click();
    cy.wait(200);

    cy.scrollTo(0, 500);

    //Click the Suivant button to navigate to the next page 
    cy.xpath('//*[@id="button_next"]/div').click();

    cy.wait(100);

  
//-- Page 6 --

    // Assert the navigation to the last page
    cy.url().should('include','/app.papernest.com/account/mail/6');

    //Check the Info summary and click the Suivant Button to navigate to the next page 
    cy.xpath('//*[@id="button_next_summary"]/div/span/span').click();

 
    
})

})

