/// <reference types="cypress" />

context("Account details", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/accountDetails/1");
  });

  it("renders account transactions", () => {
    cy.get("table")
      .find("[data-testid^=transaction-]")
      .should("have.length.gte", 10);
  });
});
