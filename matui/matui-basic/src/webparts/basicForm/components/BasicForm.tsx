import * as React from 'react';
import styles from './BasicForm.module.scss';
import { IBasicFormProps } from './IBasicFormProps';

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";

export default class BasicForm extends React.Component<IBasicFormProps, {}> {
  public state : any = {};

  constructor(props: IBasicFormProps) {
    super(props);

    this.state = {
      username : "vijay",
      password : "dsd434geg23e",
      server: 1
    };
  }
  public render(): React.ReactElement<IBasicFormProps> {
    return (
      <>
        <Container >
          <FormControl>
            <Typography component="div" style={{ fontWeight: "bold" }} >Login Form</Typography><br />

            <TextField id="userid" label="Username" value={ this.state.username } /><br /><br />
            <TextField id="password" label="Password" type="password" value={ this.state.password } /> <br /> <br />

            <Select placeholder="Server">
              <MenuItem value={1} selected>India</MenuItem>
              <MenuItem value={2}>USA</MenuItem>
              <MenuItem value={3}>UK</MenuItem>
              <MenuItem value={4}>France</MenuItem>
            </Select><br /><br />
            <Button variant="contained" color="primary">SUBMIT</Button>
          </FormControl>
        </Container>
      </>
    );
  }
}