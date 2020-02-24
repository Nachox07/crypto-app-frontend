/// <reference types="cypress" />

context("Account list", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("renders at least 15 accounts", () => {
    cy.get("table")
      .find("[data-testid^=account-]")
      .should("have.length.gte", 15);
  });

  it("navigates to account details page when an account is clicked", () => {
    cy.get("table")
      .find("[data-testid^=account-]")
      .first()
      .click();

    cy.location("pathname").should("include", "/accountDetails/");

    cy.get("table")
      .find("[data-testid^=transaction-]")
      .should("exist");
  });
});
