import { Version, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PnpCrudWebPart.module.scss';
import * as strings from 'PnpCrudWebPartStrings';

import ICompanyItem from './ICompanyItem';
import CompanyProvider from './CompanyProvider';

export interface IPnpCrudWebPartProps {
  description: string;
}

export default class PnpCrudWebPart extends BaseClientSideWebPart<IPnpCrudWebPartProps> {
  private dataProvider : CompanyProvider;

  constructor() {
    super();
  }

  public onInit() : Promise<void> {
    return super.onInit().then( _item => {
      this.dataProvider = new CompanyProvider(this.context, "Company", Environment.type);
    });
    
  }

  public render(): void {

    // Add Sample Item
    this.addItem();

    // Fetch Data and Render
      this.dataProvider.getAllItems()
        .then((items : ICompanyItem[]) => {
          let html = `<div class="${ styles.pnpCrud }">
          <div class="${ styles.container }"> 
            <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
              <div class="${ styles.column }">
                <span class="${ styles.title }">PnP CRUD Demo!</span>
                <p class="${ styles.subTitle }">CRUD Operations using @pnp/sp - Company List.</p>
                <span class="${ styles.subTitle }">Company Information</span>
                <table class="ms-Table">
                  <tr class="ms-Table-row">
                    <td class="ms-Table-cell">Company</td>
                    <td class="ms-Table-cell">Location</td>
                    <td class="ms-Table-cell">Headcount</td>
                  </tr>
                `;

                items.forEach(item => {
                  html += `<tr class="ms-Table-row">
                            <td class="ms-Table-cell">${ item.Title }</td>
                            <td class="ms-Table-cell">${ item.Location }</td>
                            <td class="ms-Table-cell">${ item.HeadCount }</td> 
                          </tr>`;
                });

                html+= ` </table></div>
                        </div>
                        <!-- Buttons Row -->
                        <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
                          <div class="ms-Grid-col">
                            <button class="${ styles.button } add-Button">
                              Add Item
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>`;

              this.domElement.innerHTML = html;

          // Set Button Event Handlers

      });
  }

  private addButtonHandlers() : void {
    const wp : PnpCrudWebPart = this;

    this.domElement.querySelector("button.addButton")
      .addEventListener('click', () => {
        wp.addItem();
      });
  }

  // Add a new Item
  private addItem() : void {
    let newItem : ICompanyItem = {
      ID : 0,
      Title : "Bank of America",
      Location : " Chennai",
      HeadCount : 20000
    };

    this.dataProvider.addItem(newItem);
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
