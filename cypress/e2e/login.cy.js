describe('Login Funcionality', () => {
  it('Login as Admin', () => {
    cy.visit('/')
    cy.login('admin@gmail.com','unet')
    cy.location('pathname').should('eq','/dashboard-control')
  })


  it('Login as Profesor', () => {
    cy.visit('/')
    cy.login('profe@gmail.com','profeunet')
    cy.location('pathname').should('eq','/dashboard-profesor')

  })

  it('Failed login attempt', () => {
    cy.visit('/')
    cy.login('noexist@gmail.com','invalid')
    cy.location('pathname').should('eq','/login')
    cy.get('[data-cy="login-invalid-credentials-message"').should("be.visible")
  })

})