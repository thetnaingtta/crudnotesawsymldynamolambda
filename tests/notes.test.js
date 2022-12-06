"use strict";

let init = require("./steps/init");
let { an_authenticated_user } = require("./steps/given");
let { we_invoke_createNote } = require("./steps/when");
let idToken;

describe(`Given an authenticated user`, () => {
  beforeAll(async () => {
    init();
    let user = await an_authenticated_user();
    idToken = user.AuthenticationResult.IdToken;
    console.log(idToken);
  });

  describe(`When we invoke POST/notes endpoint`, () => {
    it("Should create a new note", async () => {
      const body = {
        id: "1",
        title: "My test note",
        body: "Hello this is the note body",
      };
      let result = await we_invoke_createNote({ idToken, body });
      expect(result.statusCode).toEqual(201);
      expect(result.body).not.toBeNull();
    });
  });
});
