describe('template spec', () => {
  beforeEach(() => {
    cy.fixture('flashCardData').then((data) => {
      cy.wrap(data).as('flashcardsData');
    })
    cy.intercept('GET', 'http://localhost:8080/decks?_embed=cards', { fixture: 'flashCardData.json'}).as('getData');
    cy.visit('http://localhost:3000/');
  })

  it('passes', () => {
  cy.wait('@getData').then((data) => {
      cy.log(data);
    })
  })
})