import { sp, Item, ItemAddResult, ItemUpdateResult } from "@pnp/sp";

import ICompanyItem from "./ICompanyItem";
import { SPFetchClient, SPOAuthEnv } from "@pnp/nodejs";

export default class CompanyProvider {
    private _data : ICompanyItem[] = [];

    /*constructor(context: any, public listName : string) {
        sp.setup({
            spfxContext: context
        });
    }*/

    constructor(public listName : string) {
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
    }

    // Get Item by ID
    public getItemById(id: number) : Promise<ICompanyItem> {

        return sp.web.lists.getByTitle(this.listName)
            .items.getById(id).select("ID","Title","Location","HeadCount").get();
    }

    // Get all Items
    public getAllItems() : Promise<ICompanyItem[]> {
        return sp.web.lists.getByTitle("Company").items.getAll();
    }

    // Add New Item
    public addItem(item : ICompanyItem) : Promise<ICompanyItem> {
        return new Promise<ICompanyItem>((resolve, reject) => {
            sp.web.lists.getByTitle(this.listName)
                .items.add(item)
                    .then((result: ItemAddResult) => {
                        const newItem: ICompanyItem = result.data as ICompanyItem;
                        console.log("addItem()->Success!");
                        resolve(newItem);
                    })
                    .catch(err => {
                        console.log("addItem()->Error during AddItem!");
                        reject(null);
                    });
        }); 
    }

    // Update Item
    public updateItem(item : ICompanyItem) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            sp.web.lists.getByTitle(this.listName)
                .items.getById(item.ID).update(item)
                    .then(( result : ItemUpdateResult) => {
                        console.log("updateItem()->Item Updated Successfully");
                        resolve(true);
                    })
                    .catch(reason => {
                        console.log("UpdateItem()->Error - Unable to update record : " + reason);
                        reject(false);
                    });
        });
    }

    // Delete Item
    public deleteItem(item: ICompanyItem) : Promise<any> {
        return sp.web.lists.getByTitle(this.listName).items.getById(item.ID).delete();
    }
}