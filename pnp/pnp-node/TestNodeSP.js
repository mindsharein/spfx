"use strict";
exports.__esModule = true;
var sp_1 = require("@pnp/sp");
var nodejs_1 = require("@pnp/nodejs");
sp_1.sp.setup({
    sp: {
        fetchClientFactory: function () {
            return new nodejs_1.SPFetchClient("https://mindsharein.sharepoint.com", "0aa0bfb3-26ae-41ef-b2f2-4259a5a1db60", "23sHyTSSXWfVjAWFgVGzVt3DwnYyfLm3r9S3O0rHzF0=", nodejs_1.SPOAuthEnv.SPO, "440d9f7e-6aa3-4124-a19a-a902b38a7a5f");
        }
    }
});
sp_1.sp.web.get().then(function (w) {
    console.log("Url : " + w.Url);
    console.log("Title : " + w.Title + "\nDesc: " + w.Description);
    console.log(JSON.stringify(w));
});
