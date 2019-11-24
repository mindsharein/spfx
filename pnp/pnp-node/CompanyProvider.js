"use strict";
exports.__esModule = true;
var sp_1 = require("@pnp/sp");
var nodejs_1 = require("@pnp/nodejs");
var CompanyProvider = /** @class */ (function () {
    /*constructor(context: any, public listName : string) {
        sp.setup({
            spfxContext: context
        });
    }*/
    function CompanyProvider(listName) {
        this.listName = listName;
        this._data = [];
        sp_1.sp.setup({
            sp: {
                fetchClientFactory: function () {
                    return new nodejs_1.SPFetchClient("https://mindsharein.sharepoint.com", "0aa0bfb3-26ae-41ef-b2f2-4259a5a1db60", "23sHyTSSXWfVjAWFgVGzVt3DwnYyfLm3r9S3O0rHzF0=", nodejs_1.SPOAuthEnv.SPO, "440d9f7e-6aa3-4124-a19a-a902b38a7a5f");
                }
            }
        });
    }
    // Get Item by ID
    CompanyProvider.prototype.getItemById = function (id) {
        return sp_1.sp.web.lists.getByTitle(this.listName)
            .items.getById(id).select("ID", "Title", "Location", "HeadCount").get();
    };
    // Get all Items
    CompanyProvider.prototype.getAllItems = function () {
        return sp_1.sp.web.lists.getByTitle("Company").items.getAll();
    };
    // Add New Item
    CompanyProvider.prototype.addItem = function (item) {
        //let retVal : any = null;
        var _this = this;
        return new Promise(function (resolve, reject) {
            sp_1.sp.web.lists.getByTitle(_this.listName)
                .items.add(item)
                .then(function (result) {
                var newItem = result.data;
                resolve(newItem);
            })["catch"](function (err) {
                console.log("Error during AddItem!");
                reject(null);
            });
        });
        /*sp.web.lists.getByTitle(this.listName).items
          .add(item).then((result: ItemAddResult) : Promise<ICompanyItem> => {
            const newItem: ICompanyItem = result.data as ICompanyItem;

            console.log("Added New item successfully! : " + newItem.Title);
            retVal = newItem;

            return Promise.resolve(retVal);

        },(error: any) : (Promise<any>) => {
            console.log("Error adding new Item");
            return Promise.reject("ERROR - Unable to Add new item : " + error);
        });

        return Promise.resolve(retVal); */
    };
    // Update Item
    CompanyProvider.prototype.updateItem = function (item) {
        sp_1.sp.web.lists.getByTitle(this.listName).items.getById(item.ID)
            .update(item).then(function (result) {
            console.log("Item Updated Successfully");
        }, function (error) {
            console.log("Error - Unable to update record : " + error);
            throw new Error("ERROR - Unable to Update item : " + error);
        });
    };
    // Delete Item
    CompanyProvider.prototype.deleteItem = function (item) {
        return sp_1.sp.web.lists.getByTitle(this.listName).items.getById(item.ID)["delete"]();
    };
    return CompanyProvider;
}());
exports["default"] = CompanyProvider;
