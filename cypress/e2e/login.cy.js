describe('Login Funcionality', () => {
  it('Login as Admin', () => {
    cy.visit('http://localhost:5170')
    cy.login('admin@gmail.com','unet')
    cy.location('pathname').should('eq','/dashboard-control')
  })


  it('Login as Profesor', () => {
    cy.visit('http://localhost:5170')
    cy.login('profe@gmail.com','profeunet')
    cy.location('pathname').should('eq','/dashboard-profesor')

  })

  it('Failed login attempt', () => {
    cy.visit('http://localhost:5170')
    cy.login('noexist@gmail.com','invalid')
    cy.location('pathname').should('eq','/login')
    cy.get('[data-cy="login-invalid-credentials-message"').should("be.visible")




      
  })

})