import { ICustomer } from "./DetailsListDemo";

export class DataProvider {
    public static getCustomers() : Promise<ICustomer[]> {

        return Promise.resolve([
            {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('ALFKI')", "type": "SampleModel.Customer"
                }, "CustomerID": "ALFK1", "CompanyName": "Alfreds Futterkiste", "ContactName": "Maria Anders", "City": "Berlin", "Country": "Germany"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('ANATR')", "type": "SampleModel.Customer"
                }, "CustomerID": "ANATR", "CompanyName": "Ana Trujillo Emparedados y helados", "ContactName": "Ana Trujillo", "City": "M\u00e9xico D.F.", "Country": "Mexico"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('ANTON')", "type": "SampleModel.Customer"
                }, "CustomerID": "ANTON", "CompanyName": "Antonio Moreno Taquer\u00eda", "ContactName": "Antonio Moreno", "City": "M\u00e9xico D.F.", "Country": "Mexico"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('AROUT')", "type": "SampleModel.Customer"
                }, "CustomerID": "AROUT", "CompanyName": "Around the Horn", "ContactName": "Thomas Hardy", "City": "London", "Country": "UK"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('BERGS')", "type": "SampleModel.Customer"
                }, "CustomerID": "BERGS", "CompanyName": "Berglunds snabbk\u00f6p", "ContactName": "Christina Berglund", "City": "Lule\u00e5", "Country": "Sweden"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('BLAUS')", "type": "SampleModel.Customer"
                }, "CustomerID": "BLAUS", "CompanyName": "Blauer See Delikatessen", "ContactName": "Hanna Moos", "City": "Mannheim", "Country": "Germany"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('BLONP')", "type": "SampleModel.Customer"
                }, "CustomerID": "BLONP", "CompanyName": "Blondel p\u00e8re et fils", "ContactName": "Fr\u00e9d\u00e9rique Citeaux", "City": "Strasbourg", "Country": "France"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('BOLID')", "type": "SampleModel.Customer"
                }, "CustomerID": "BOLID", "CompanyName": "B\u00f3lido Comidas preparadas", "ContactName": "Mart\u00edn Sommer", "City": "Madrid", "Country": "Spain"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('BONAP')", "type": "SampleModel.Customer"
                }, "CustomerID": "BONAP", "CompanyName": "Bon app'", "ContactName": "Laurence Lebihan", "City": "Marseille", "Country": "France"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('BOTTM')", "type": "SampleModel.Customer"
                }, "CustomerID": "BOTTM", "CompanyName": "Bottom-Dollar Markets", "ContactName": "Elizabeth Lincoln", "City": "Tsawassen", "Country": "Canada"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('BSBEV')", "type": "SampleModel.Customer"
                }, "CustomerID": "BSBEV", "CompanyName": "B's Beverages", "ContactName": "Victoria Ashworth", "City": "London", "Country": "UK"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('CACTU')", "type": "SampleModel.Customer"
                }, "CustomerID": "CACTU", "CompanyName": "Cactus Comidas para llevar", "ContactName": "Patricio Simpson", "City": "Buenos Aires", "Country": "Argentina"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('CENTC')", "type": "SampleModel.Customer"
                }, "CustomerID": "CENTC", "CompanyName": "Centro comercial Moctezuma", "ContactName": "Francisco Chang", "City": "M\u00e9xico D.F.", "Country": "Mexico"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('CHOPS')", "type": "SampleModel.Customer"
                }, "CustomerID": "CHOPS", "CompanyName": "Chop-suey Chinese", "ContactName": "Yang Wang", "City": "Bern", "Country": "Switzerland"
            }, {
                "__metadata": {
                    "uri": "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers('COMMI')", "type": "SampleModel.Customer"
                }, "CustomerID": "COMMI", "CompanyName": "Com\u00e9rcio Mineiro", "ContactName": "Pedro Afonso", "City": "Sao Paulo", "Country": "Brazil"
            }
        ]);

    }
}