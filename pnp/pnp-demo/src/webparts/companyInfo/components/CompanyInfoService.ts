import { ICompanyItem } from './ICompanyItem';

import { sp, Web } from "@pnp/sp";

export default class CompanyInfoService {
    constructor(context : any, public listName: string) {
        sp : {
            
        } 
    }

    public getCompanyItems() : Promise<ICompanyItem[]> {
        
        return sp.web.lists.getByTitle(this.listName)
                .items.select("Title", "HeadCount", "Location")
                .getAll(100);
    }
}