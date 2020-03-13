import * as React from 'react';

import { IBasicTableProps } from './IBasicTableProps';

import ISalesDataItem from './ISalesDataItem';
import SalesDataProvider from './SalesDataProvider';

// Import Material UI Components
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";

export default class BasicTable extends React.Component<IBasicTableProps, {}> {
  public state: any = {};

  private provider: SalesDataProvider;

  constructor(props : IBasicTableProps) {
    super(props);

    this.state = {
      data: []
    };

    this.provider = new SalesDataProvider(props.context,props.listName);
  }

  public render(): React.ReactElement<IBasicTableProps> {
    // Fetch the Data
    this.provider.getItems()
      .then((allItems : ISalesDataItem[]) => {
      // Assign to State object
      this.setState({ data: allItems});
    });

    return (
      <>

      </>
    );
  }
}
