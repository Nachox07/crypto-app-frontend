/// <reference types="cypress" />

const mockSuccessAccountsResponse = () =>
  cy
    .route({
      method: "GET",
      url: "**/accounts",
      status: 200,
      response: "fixture:accounts.json",
    })
    .as("accountFetch");

context("Account list", () => {
  describe("success", () => {
    beforeEach(() => {
      cy.server();

      mockSuccessAccountsResponse();

      cy.visit("http://localhost:3000");
    });

    it("renders at least 15 accounts", () => {
      cy.wait("@accountFetch");

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

  describe("error", () => {
    beforeEach(() => {
      cy.server();

      cy.route({
        method: "GET",
        url: "**/accounts",
        status: 400,
        response: {},
      }).as("accountFetchError");

      cy.visit("http://localhost:3000");
    });

    it("shows error and retry button works", () => {
      cy.wait("@accountFetchError");

      mockSuccessAccountsResponse();

      cy.get("button")
        .should("exist")
        .click();

      cy.wait("@accountFetch");

      cy.get("table")
        .find("[data-testid^=account-]")
        .should("exist");
    });
  });
});
