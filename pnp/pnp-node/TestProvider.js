"use strict";
exports.__esModule = true;
var CompanyProvider_1 = require("./CompanyProvider");
// Test Company Provider
var provider = new CompanyProvider_1["default"]("Company");
console.log("Adding new Record...");
provider.addItem({
    ID: 0,
    Title: "Flipkart",
    HeadCount: 450,
    Location: "Gurgaon"
}).then(function (item) {
    console.log("Added new item : ID : " + item.ID + "\t" + item.Title);
})["catch"](function (err) {
    console.log("Error adding item");
});
/*
console.log("Deleting Item with ID: 4...");
provider.getItemById(4).then( item => {
    console.log("Deleting Item - Title : " + item.Title + ".....");
    provider.deleteItem(item).then( res => {
        console.log("Deleted Item with ID 4! (Title: " + item.Title + ")");
    });
});
*/
console.log("Fetching All Company records...");
provider.getAllItems().then(function (items) {
    items.forEach(function (comp) {
        console.log(comp.ID + "\t" + comp.Title + "\t" + comp.Location + "\t" + comp.HeadCount);
    });
});
/*
console.log("Fetching item by id...");
provider.getItemById(3).then( item => {
    console.log(`
        Item Feteched by ID : ${item.ID}
        Title : ${ item.Title}
        Location : ${ item.Location }
        Head Count: ${ item.HeadCount }
    `);

    // Change the item and update
    console.log("Changing item...");
    item.HeadCount = 35685;
    item.Location = "Mumbai";

    console.log("Updating Item....");
    provider.updateItem(item);
});

*/ 
