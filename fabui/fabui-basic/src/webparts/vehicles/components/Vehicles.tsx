import * as React from 'react';
import styles from './Vehicles.module.scss';
import { IVehiclesProps } from './IVehiclesProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { sp } from "@pnp/sp";
import "@pnp/sp/presets/all";

export interface IVehicle {
  // All The fields

}
export default class Vehicles extends React.Component<IVehiclesProps, {}> {
  public state : any = { vehicleData : []};

  constructor(props : IVehiclesProps) {
    super(props);

    sp.setup({
      spfxContext: this.props.context
    });
  }

  public componentDidMount() {
    this.getData().then(data => {
      this.setState({ 
        vehicleData : data
      });
    });
  }

  public getData() : Promise<IVehicle[]> {
    return sp.web.lists.getByTitle("Vehicles").items.getAll();
  }

  public render(): React.ReactElement<IVehiclesProps> {
    return (
      <>
        <div>
          { this.state.vehicleData.map(v => <div>{v.Title} : {v.Make} : {v.Model}</div>) }
        </div>
        <button onClick={ this.handleClick } >Remove</button>
      </>
    );
  }

  public handleClick = (e) => {
    this.state.vehicleData.pop();
  }
}
