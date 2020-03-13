import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PlainCompDemoWebPart.module.scss';
import * as strings from 'PlainCompDemoWebPartStrings';

import { WeatherBox } from './WeatherBox';

export interface IPlainCompDemoWebPartProps {
  description: string;
}

export default class PlainCompDemoWebPart extends BaseClientSideWebPart<IPlainCompDemoWebPartProps> {
  private wb : WeatherBox;
  constructor() {
    super();

    this.wb = new WeatherBox("Chennai", 34.5, 89.5);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.plainCompDemo }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Plain Component Demo!</span>
              <p class="${ styles.subTitle }">Instantiates a Plain Class Component and Renders.</p>
              ${ this.wb.render() }
              <input type="button" onclick="javascript:increase()" value="INCR" />
            </div>
          </div>
        </div>
      </div>
      <script type="text/javascript">
          function increase(event) {
            console.log("Increase event fired!")
            this.wb.temp++;
            alert("Increase Button Clicked!");
          }
      </script>
      `;
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
