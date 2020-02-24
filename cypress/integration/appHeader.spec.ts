/// <reference types="cypress" />

context("App header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/accountDetails/1");
  });

  it("navigates back to home when app header is clicked", () => {
    cy.get("header").click();

    cy.location("pathname").should("eq", "/");
  });
});
