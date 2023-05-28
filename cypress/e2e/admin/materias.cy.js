describe("Test Materias Management features", () => {
  const materiaBasePath = "/dashboard-control/admin/materias";

  beforeEach(() => {
    cy.task("db:clear");
    cy.task("db:seed");
    cy.visit("/");
    cy.login("admin@gmail.com", "admin-ps");
    cy.get('[data-cy="admin-link-materias"]').click();
  });

  it("should see materias of primero", () => {
    cy.location("pathname").should("eq", materiaBasePath);
    cy.get('[data-cy="link-materias-primero"]').click();
    cy.location("pathname").should("eq", `${materiaBasePath}/primero`);

    cy.contains("td", "Castellano");
    cy.contains("tr", "Formación para la soberanía nacional")
      .invoke("data", "row-id")
      .then((rowId) => {
        cy.contains("tr", "Soberania Practica").contains("td", rowId);
        cy.contains("tr", "Soberania Teorica").contains("td", rowId);
      });
  });

  it.only("should see be able to create a new materia", () => {
    cy.location("pathname").should("eq", materiaBasePath);
    cy.get('[data-cy="link-materias-primero"]').click();
    cy.location("pathname").should("eq", `${materiaBasePath}/primero`);
    cy.get('[data-cy="link-create-materia"]').click();
    cy.location("pathname").should("eq", `${materiaBasePath}/primero/crear`);
    cy.get('[data-cy="materia-nombre-input"]').type("Nueva Materia");
    cy.get('[data-cy="create-materia"]').click();
    cy.location("pathname").should("eq", `${materiaBasePath}/primero`);


    cy.get('[data-cy="snackbar-alert"]').contains(
      "Materia creada con exito"
    );


    
    cy.contains("td", "Nueva Materia");
  });

  it("should see be able to edit a materia", () => {
    cy.location("pathname").should("eq", materiaBasePath);
    cy.get('[data-cy="link-materias-primero"]').click();
    cy.location("pathname").should("eq", `${materiaBasePath}/primero`);

    cy.contains("tr", "Castellano")
      .invoke("data", "row-id")
      .then((rowId) => {
        cy.contains("tr", "Castellano")
          .find('[data-cy="link-edit-materia"]')
          .click();

        cy.location("pathname").should(
          "eq",
          `${materiaBasePath}/primero/${rowId}/editar`
        );

        cy.get('[data-cy="materia-nombre-input"] input')
          .invoke("val")
          .should("eq", "Castellano");
        cy.get('[data-cy="materia-padre-select"] input')
          .invoke("val")
          .should("eq", "Ninguna");

        cy.get('[data-cy="materia-nombre-input"] input').clear();

        cy.get('[data-cy="materia-nombre-input"] input').type("Edited Name");

        cy.get('[data-cy="submit-edit-materia"]').click();

        cy.location('pathname').should('eq',`${materiaBasePath}/primero`)
        
        cy.get('[data-cy="snackbar-alert"]').contains(
          "Materia editada con exito"
        );

        cy.get(`tr[data-row-id="${rowId}"]`).contains('Edited Name')

        

      });
  });
});
