import * as React from 'react';
import { IDetailsListDemoProps } from './IDetailsListDemoProps';
import { escape, times } from '@microsoft/sp-lodash-subset';

import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } 
 from '@microsoft/sp-http';

import { DetailsList, IColumn, Fabric, Selection, MarqueeSelection, Panel,
          Label, TextField, DefaultButton, Button } from "office-ui-fabric-react";

import { DataProvider } from "./DataProvider";

export interface IState {
  data: ICustomer[];
  selectionDetails: string;
  isOpen: boolean;
  selCustomer: ICustomer;
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
      selectionDetails: this.getSelectionDetails(),
      isOpen: false,
      selCustomer: { CustomerID: "", Country: "", ContactName: "", City: "", CompanyName: "" }
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
            selection={ this._selection }
            onItemInvoked= { this.handleItemInvoked }
            />
        </MarqueeSelection>
        <Panel
          headerText="Customer Details"
          isOpen={ this.state.isOpen } 
          closeButtonAriaLabel="Close"
          onDismissed={ () => this.setState({ isOpen: false })}
          >
            <Label>Customer Id</Label>
            <TextField value={ this.state.selCustomer.CustomerID } />
            <Label>Company Name</Label>
            <TextField value={ this.state.selCustomer.CompanyName} />
            <Label>Contact Name</Label>
            <TextField value={ this.state.selCustomer.ContactName } />
            <Label>City</Label>
            <TextField value={ this.state.selCustomer.City } />
            <Label>Country</Label>
            <TextField value={ this.state.selCustomer.Country } /><br/>
            <Label>&nbsp;</Label>
            <Button text=" Save " onClick={ () => alert('Not Implemented yet!') } />&nbsp;&nbsp;
            <Button text=" Cancel " onClick={() => this.setState({ isOpen: false }) }/>
        </Panel>
      </Fabric>
    );
  }

  public componentDidMount() {
    // Load Customers into State
    (async () => {
      try {
        let results: ICustomer[] = await this.getData();
        console.log("Data Fetched : " + JSON.stringify(results));

        this.setState({
          data: results
        });
      } catch(e) {
        console.log("Error fetching data! Getting Stsatic Data" + e);
        // Get Mock Static Data
        this.setState({
          data: await DataProvider.getCustomers()
        });
      }
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
        this.setState({ 
          isOpen: true
        });

        let selItem  = this._selection.getSelection()[0] as ICustomer;
        this.setState({ selCustomer: selItem});

        console.log("Selected Item : " + JSON.stringify(selItem));
        
        return "1 Item selected";
        break;
      default:
        console.log("Selected Items : " + JSON.stringify(this._selection.getSelection()));
        return "More than 1 item selected";
        break;
    }
  }

  // Handle Item Invoked - Item Invoked is when user selects a row
  // and presses the ENTER key
  private handleItemInvoked = (item : ICustomer) : void => {
    this.setState({ selCustomer: item });
  }

}
