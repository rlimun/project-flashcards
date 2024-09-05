describe('template spec', () => {
  beforeEach(() => {
    cy.loadFlashCardsData();
    cy.intercept('GET', 'http://localhost:8080/decks?_embed=cards', { fixture: 'flashCardData.json'}).as('getData');
    cy.visit('http://localhost:3000/');
  })

  it('should render the home page', () => {
    cy.get('.home-body').should('be.visible');
  });
})