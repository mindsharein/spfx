import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CompanyInfoWebPartStrings';
import CompanyInfo from './components/CompanyInfo';
import { ICompanyInfoProps } from './components/ICompanyInfoProps';

import { ICompanyInfoWebPartProps} from  './ICompanyInfoWebPartProps';

export default class CompanyInfoWebPart extends BaseClientSideWebPart<ICompanyInfoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICompanyInfoProps> = React.createElement(
      CompanyInfo,
      {
        listname : this.properties.listname
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listname', {
                  label: "List Name"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
