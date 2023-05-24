describe('Login Funcionality', () => {
  beforeEach(() => {
    cy.task("db:clear");
    cy.task("db:seed");
    cy.visit("/");
  });



  it('Login as Admin', () => {
    cy.login('admin@gmail.com','admin-ps')
    cy.location('pathname').should('eq','/dashboard-control')
  })


  it('Login as Profesor', () => {
    cy.login('profe@gmail.com','profe-ps')
    cy.location('pathname').should('eq','/dashboard-profesor')

  })

  it('Failed login attempt', () => {
    cy.login('camt@gmail.com','cant-ps')
    cy.location('pathname').should('eq','/login')
    cy.get('[data-cy="login-invalid-credentials-message"').should("be.visible")
  })

})