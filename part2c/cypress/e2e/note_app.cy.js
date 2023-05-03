describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Jared Gentry",
      username: "jaredg",
      password: "supersecret",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();
  });

  it("user can login", function () {
    cy.contains("log in").click();
    cy.get("#username").type("jaredg");
    cy.get("#password").type("supersecret");
    cy.get("#login-btn").click();

    cy.contains("Jared Gentry logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("log in").click();
    cy.get("#username").type("jaredg");
    cy.get("#password").type("wrong");
    cy.get("#login-btn").click();

    cy.get(".error")
      .contains("Wrong username or password")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Jared Gentry logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "jaredg", password: "supersecret" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#newNoteInput").type("a note created by cypress");
      cy.contains("Add").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({ content: "another note cypress", important: true });
      });

      it("it can be made important", function () {
        cy.contains("another note cypress")
          .parent()
          .find("button")
          .first()
          .click();
        cy.contains("another note cypress")
          .parent()
          .find("button")
          .contains("make important");
      });
    });

    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", function () {
        cy.contains("second note")
          .parent()
          .find("button")
          .first()
          .as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make not important");
      });

      // it("then example", function () {
      //   cy.get("button").then((buttons) => {
      //     console.log("number of buttons", buttons.length);
      //     cy.wrap(buttons[0]).click();
      //   });
      // });
    });
  });
});
