Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then((response) => {
    localStorage.setItem("loggedInNoteAppUser", JSON.stringify(response.body));
    cy.visit("");
  });
});

Cypress.Commands.add("createNote", ({ content, important }) => {
  cy.request({
    url: "http://localhost:3001/api/notes",
    method: "POST",
    body: { content, important },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedInNoteAppUser")).token
      }`,
    },
  });

  cy.visit("");
});
