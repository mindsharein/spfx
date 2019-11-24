import { sp } from "@pnp/sp";
import { SPFetchClient, SPOAuthEnv } from "@pnp/nodejs";

sp.setup({
    sp : {
        fetchClientFactory : () => {
            return new SPFetchClient("https://mindsharein.sharepoint.com", 
                "0aa0bfb3-26ae-41ef-b2f2-4259a5a1db60", 
                "23sHyTSSXWfVjAWFgVGzVt3DwnYyfLm3r9S3O0rHzF0=",
                SPOAuthEnv.SPO,
                "440d9f7e-6aa3-4124-a19a-a902b38a7a5f");
        }
    }
});

sp.web.get().then( w=> {
    console.log("Url : " + w.Url);
    console.log("Title : " + w.Title +"\nDesc: " + w.Description);
    console.log(JSON.stringify(w));
});

