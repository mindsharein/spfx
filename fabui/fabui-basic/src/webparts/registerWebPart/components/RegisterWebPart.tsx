import * as React from 'react';
import styles from './RegisterWebPart.module.scss';
import { IRegisterWebPartProps } from './IRegisterWebPartProps';
import { IRegisterWebPartState, IMembershipType } from './IRegisterWebPartState';

import { Label, TextField, PrimaryButton, TextFieldBase  } from "@microsoft/office-ui-fabric-react-bundle";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import { Email, validate, Type } from 'validate-typescript';

export default class RegisterWebPart extends React.Component<IRegisterWebPartProps, IRegisterWebPartState> {
  public state : any = {};

  private emailRef = React.createRef<TextFieldBase>();

  constructor(props) {
    super(props);

    this.state = {
      userid : "",
      password : "",
      name : "",
      email: "",
      phone: "",
      membership : { code: "", text: "" },
      subscribe: true
    };
  }

  public render(): React.ReactElement<IRegisterWebPartProps> {
    return (
      <div>
        <Label>USER REGISTRATION</Label>
        <TextField 
          label="User ID" 
          name="userid"
          value={ this.state.userid }
          onChange= { this.userIDChange }
          required >
        </TextField>

        <TextField label="Password" name="password" value={ this.state.password } required ></TextField>

        <TextField label="Email ID"
              componentRef={ this.emailRef }
              name="email" 
              value={ this.state.email } 
              errorMessage="Invalid Email Id"
              required >
        </TextField>

        <TextField 
              label="Phone" 
              name="phone"
              value={ this.state.phone }>
        </TextField>

        <Dropdown
          required
          onChange= { this.handleMemtypeChange }
          placeholder="Membership Type" 
          label="Membership Type" 
          options={[
            { key: 1, text: "Free Plan" },
            { key: 2, text: "Basic Plan"},
            { key: 3, text: "Premium Plan"},
            { key: 4, text: "Ultimate Plan"}
          ]}
        ></Dropdown><br/>

        <Checkbox name="subscribe" label="Subscribe to newsletter" onChange={ this.handleSubscribe }></Checkbox><br/><br/>

        <PrimaryButton name="submit" text=" Submit " onClick={ this.handleClick } ></PrimaryButton>

        <div>
          ** Debug Info ** <br/>
          User id : { this.state.userid } <br/>
          Password : { this.state.password } <br/>
          Name : { this.state.name } <br/>
          Email: { this.state.email } <br/>
          Phone: { this.state.phone } <br/>
          Membership : { this.state.membership.code } - { this.state.membership.text } <br/>
          Subscribe: { this.state.subscribe }
        </div>
      </div>
    );
  }

  // Username on Change
  private userIDChange = (event : React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ userid : newValue });
  }

  // Subscribe Checkbox Handler
  private handleSubscribe = (event : React.FormEvent<HTMLElement>, isChecked: boolean) => {
    this.setState({ subscribe: isChecked });
  }

  // Dropdown Handler
  private handleMemtypeChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption ) => {
    let selItem : IMembershipType = {
      code : parseInt(item.key.toString()),
      text: item.text
    };

    this.setState((state,props) => {
      return { membership: selItem };
    });
  }

  // Handle Button Click
  private handleClick = (event: any) => {
    // Set focus to Email
    if(!this.validateForm(this.state)) {
        alert("Form has Errors!");
        this.emailRef.current.focus();
    } else {
      alert("Form has no errors!!!");
    }
  }

  // Validate Form
  private validateForm(formData: {}): boolean {
    const schema = {
      userid : Type(String),
      password: Type(String),
      name: Type(String),
      email: Email(),
      phone: Type(Number)
    };

    try {
      const result = validate(schema, formData);
      console.log("Data is valid : " + result);
      return true;
    } 
    catch(error) {
      console.log("Form Data is invalid : " + error);
    }

    return false;
  }
}
