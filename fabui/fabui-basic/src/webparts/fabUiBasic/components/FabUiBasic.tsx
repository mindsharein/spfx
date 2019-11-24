import * as React from 'react';
import styles from './FabUiBasic.module.scss';
import { IFabUiBasicProps } from './IFabUiBasicProps';
import { IFabUIBasicState } from './IFabUIBasicState';

import { Label, TextField, PrimaryButton } from '@microsoft/office-ui-fabric-react-bundle';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export default class FabUiBasic extends React.Component<IFabUiBasicProps, IFabUIBasicState> {
  public state : IFabUIBasicState = null;

  constructor(props: IFabUiBasicProps) {
    super(props);

    this.state = {
      amount : 0,
      tax : 0,
      rate : 0,
      total : 0,
      Message : "",
      hideTotal: false
    };
  }

  public render(): React.ReactElement<IFabUiBasicProps> {
    return (
      <div>
        <Label className={ styles.taxHeading }>GST Calculator</Label>
        <Label>{ this.state.Message }</Label>
        <Label>Amount :</Label>
        <TextField placeholder="Amount " width={ 200 } name="amount" defaultValue={ this.state.amount.toString() } 
          onChange={ this.handleAmountChange }></TextField>
        <Label>Tax Rate : </Label>
        <TextField name="rate" onChange={ this.handleTaxRateChange }></TextField>
        <Label>Tax Amount :</Label>
        <TextField name="tax" value={ this.state.tax.toString() }></TextField>
        <Label>Total Amount :</Label>
        <TextField name="total" value={ this.state.total.toString() } hidden={ this.state.hideTotal }></TextField>
        <Toggle label="Show Total Amount" onText="Yes" offText="No" onChange={ this.toggleAmount }></Toggle>
        <PrimaryButton name="calc" onClick={ this.calculateTax } text="Calculate"></PrimaryButton>
      </div>
    );
  }

  private toggleAmount = (event: React.MouseEvent<HTMLElement>,checked: boolean) => {
    console.log("Toggle is : " + checked ? "CHECKED" : "NOT CHECKED");
    
    this.setState({ hideTotal: !checked });
  }

  private handleAmountChange = (event: React.FormEvent<HTMLInputElement>, newValue? : string) => {
    console.log("Amount Changed : " + newValue);
    this.setState({ amount: parseFloat(newValue)});
  }

  private handleTaxRateChange = (event: React.FormEvent<HTMLInputElement>, newValue? : string) => {
    console.log("Tax Rate changed : " + newValue);
    this.setState({ rate: parseFloat(newValue)});
  }

  private calculateTax = () => {
    let t = Math.round(this.state.amount * (this.state.rate/100));
    console.log("Tax Recalculated : " + t);
    this.setState({ tax : t, total : (this.state.amount + t) });
  }
}
