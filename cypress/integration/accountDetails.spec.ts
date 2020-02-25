/// <reference types="cypress" />

const mockAccountDetailsSuccessResponse = () =>
  cy
    .route({
      method: "GET",
      url: "**/accounts/1",
      status: 200,
      response: "fixture:accountDetails.json",
    })
    .as("accountFetch");

context("Account details", () => {
  describe("mocking requests", () => {
    describe("success", () => {
      beforeEach(() => {
        cy.visit("http://localhost:3000/accountDetails/1");
      });

      it("renders account transactions and account header", () => {
        cy.get("table")
          .find("[data-testid^=transaction-]")
          .should("have.length.gte", 10);

        cy.get("[data-testid=account-name]").should(
          "contain",
          "Investment Account",
        );
      });
    });

    describe("error", () => {
      beforeEach(() => {
        cy.server();

        cy.route({
          method: "GET",
          url: "**/accounts/1",
          status: 400,
          response: {},
        }).as("accountFetchError");

        cy.visit("http://localhost:3000/accountDetails/1");
      });

      it("shows error and retry button works", () => {
        cy.wait("@accountFetchError");

        mockAccountDetailsSuccessResponse();

        cy.get("button")
          .should("exist")
          .click();

        cy.wait("@accountFetch");

        cy.get("table")
          .find("[data-testid^=transaction-]")
          .should("exist");
      });
    });
  });

  describe("without mocking requests", () => {
    it("renders account transactions", () => {
      cy.visit("http://localhost:3000/accountDetails/1");

      cy.get("table")
        .find("[data-testid^=transaction-]")
        .should("have.length.gte", 10);
    });

    it("renders error because of invalid accountId", () => {
      cy.visit("http://localhost:3000/accountDetails/{}");

      cy.get("[data-testid=error-message]").should(
        "contain",
        "Error: ajax error 400",
      );
    });
  });
});
