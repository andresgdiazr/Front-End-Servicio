describe("Test Profesor Management Features", () => {
  beforeEach(() => {
    cy.task("db:clear");
    cy.task("db:seed");
    cy.visit("/");
  });

  it("List Profesores And Check for Profesor Existence", () => {
    
    cy.login("admin@gmail.com", "admin-ps");
    cy.location("pathname").should("eq", "/dashboard-control");
    cy.get('[data-cy="admin-link-profesores"]').click();
    cy.location("pathname").should("eq", "/dashboard-control/admin/profesores");

    // this may be the wrong way of doing it
    cy.contains("tr", "profe@gmail.com").contains("td", "Carlos");
    cy.contains("tr", "profe@gmail.com").contains("td", "Duran");
    cy.contains("tr", "profe@gmail.com").contains("td", "222");
  });

  it("Create Profesor", () => {
    cy.login("admin@gmail.com", "admin-ps");
    cy.location("pathname").should("eq", "/dashboard-control");
    cy.get('[data-cy="admin-link-profesores"]').click();
    cy.location("pathname").should("eq", "/dashboard-control/admin/profesores");
    cy.get('[data-cy="link-create-profesor"]').click();
    cy.location("pathname").should(
      "eq",
      "/dashboard-control/admin/profesores/crear"
    );

    cy.get('[data-cy="cuenta-input-nombre"]').type("New Name");
    cy.get('[data-cy="cuenta-input-apellido"]').type("New Lastname");
    cy.get('[data-cy="cuenta-input-email"]').type("user@test.com");
    cy.get('[data-cy="cuenta-input-cedula"]').type("11555666");
    cy.get('[data-cy="cuenta-submit"]').click();

    cy.location("pathname").should("eq", "/dashboard-control/admin/profesores");
    cy.get('[data-cy="snackbar-alert"]').contains("Profesor creado satisfactoriamente")

    // this may be the wrong way of doing it
    cy.contains("tr", "user@test.com").contains("td", "New Name");
    cy.contains("tr", "user@test.com").contains("td", "New Lastname");
    cy.contains("tr", "user@test.com").contains("td", "11555666");


  });
});
