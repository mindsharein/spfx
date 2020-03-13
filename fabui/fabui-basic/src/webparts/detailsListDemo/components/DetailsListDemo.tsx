import * as React from 'react';
import { IDetailsListDemoProps } from './IDetailsListDemoProps';
import { escape, times } from '@microsoft/sp-lodash-subset';

import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

import { DetailsList, IColumn, Fabric, Selection, MarqueeSelection } from "office-ui-fabric-react";

export interface IState {
  data: ICustomer[];
  selectionDetails: string;
}

export interface ICustomer {
  CustomerID : string;
  CompanyName: string;
  ContactName: string;
  City: string;
  Country: string;
}

export default class DetailsListDemo extends React.Component<IDetailsListDemoProps, IState> {
  private columns : IColumn[];
  private _selection : Selection;

  constructor(props : IDetailsListDemoProps) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this.getSelectionDetails() })
    });

    this.state = {
      data: [],
      selectionDetails: this.getSelectionDetails()
    };

    // Column Defs
    this.columns = [
      { 
        key: 'CustomerID', 
        name: 'CustomerID', 
        fieldName: 'CustomerID', 
        minWidth: 100, 
        maxWidth: 200, 
        isResizable: true 
      },
      {
        key: 'CompanyName',
        name: 'CompanyName',
        fieldName: 'CompanyName',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: 'ContactName',
        name: 'ContactName',
        fieldName: 'ContactName',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: 'City',
        name: 'City',
        fieldName: 'City',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: 'Country',
        name: 'Country',
        fieldName: 'Country',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      }
    ]; 
  }

  public render(): React.ReactElement<IDetailsListDemoProps> {
    return (
      <Fabric>
        <div>{ this.state.selectionDetails }</div>
        <MarqueeSelection selection={ this._selection } >
          <DetailsList 
            columns={ this.columns } 
            items={ this.state.data } 
            selection={ this._selection } />
        </MarqueeSelection>
      </Fabric>
      
    );
  }

  public componentDidMount() {
    // Load Customers into State
    (async () => {
      let results: ICustomer[] = await this.getData();

      // console.log("Data Fetched : " + JSON.stringify(results));

      this.setState({ 
        data: results
      });

    })();
  }

  // Gets the Customers from Odata.org
  private async getData(): Promise<ICustomer[]> {
    const serviceURL: string = "https://cors-anywhere.herokuapp.com/https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers?$select=CustomerID,CompanyName,ContactName,City,Country&$top=15";

    const options : ISPHttpClientOptions = {
      headers : new Headers({ 
        'Accept': 'application/json'
      }),
      method: 'GET',
      mode: 'cors'
    };

    let results: SPHttpClientResponse = await this.props.context.spHttpClient.get(serviceURL, SPHttpClient.configurations.v1, options);

    let cust = await results.json();

    return Promise.resolve(cust.d as ICustomer[]);
  }

  // Gets the Selection Details
  private getSelectionDetails() : string {
    switch(this._selection.getSelectedCount()) {
      case 0:
        return "0 Items Selected";
        break;
      case 1:
        let selItem  = this._selection.getSelection()[0] as ICustomer;
        console.log("Selected Item : " + JSON.stringify(selItem));
        return "1 Item selected";
        break;
      default:
        console.log("Selected Items : " + JSON.stringify(this._selection.getSelection()));
        return "More than 1 item selected";
        break;
    }
  }

}
