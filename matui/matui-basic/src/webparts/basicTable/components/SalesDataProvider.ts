import {sp, Web } from "@pnp/sp";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { ISalesDataItem } from "./ISalesDataItem";

export class SalesDataProvider {

    private listName : string = "";

    private mockData : ISalesDataItem[] = [
        { Region: "North", Year: 2019, Month: "Jan", Segment: "Auto", Sales: 312432 },
        { Region: "East", Year: 2019, Month: "Feb", Segment: "Auto", Sales: 30452 },
        { Region: "South", Year: 2019, Month: "Mar", Segment: "Auto", Sales: 33966 },
        { Region: "West", Year: 2019, Month: "Apr", Segment: "Auto", Sales: 39854 },
        { Region: "North", Year: 2019, Month: "May", Segment: "Auto", Sales: 40125 },
        { Region: "North", Year: 2019, Month: "Jun", Segment: "Auto", Sales: 42874 }
    ];

    constructor(context: any, listName: string) {

        // If Live SP / SPO initialize sp with WebPart context
        if(Environment.type == EnvironmentType.SharePoint 
            || Environment.type == EnvironmentType.ClassicSharePoint) {
            sp.setup({
                spfxContext : context 
            });
        }
    }

    // Gets all the items from the SalesData List
    public getItems() : Promise<ISalesDataItem[]> {
        // If it's local Workbench or Test Script, return Mock Data
        if(Environment.type == EnvironmentType.Local || Environment.type == EnvironmentType.Test) {
            return Promise.resolve(this.mockData);
        }

        // Else return Live Data from SharePoint List
        return sp.web.lists.getByTitle(this.listName).items.getAll();
    }
}