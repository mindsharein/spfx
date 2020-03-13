import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import { Dialog } from '@microsoft/sp-dialog';
import styles from './AppCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';


import * as strings from 'HelloWorldApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HelloWorldApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top : string;
  Bottom : string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {

    private _topPlaceHolder: PlaceholderContent | undefined;
    private _bottomPlaceHolder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve<void>();   
  }

  @override
  private _renderPlaceHolders(): void {
    console.log("HelloWorld App Customizer - renderPlaceholders() called");
    console.log("Available placeholders",
      this.context.placeholderProvider.placeholderNames
        .map(name => PlaceholderName[name])
          .join(", ")
      );

      if(!this._topPlaceHolder) {
        this._topPlaceHolder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose }
        );

        // The extension should not assume that the expected placeholder is available.
        if (!this._topPlaceHolder) {
          console.error("The expected placeholder (Top) was not found.");
          return;
        }

        if (this.properties) {
          let topString: string = this.properties.Top;
          if (!topString) {
            topString = "(Top property was not defined.)";
          }

          if (this._topPlaceHolder.domElement) {
            this._topPlaceHolder.domElement.innerHTML = `
            <div class="${styles.app}">
              <div class="${styles.top}">
                <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
                  topString
                )}
              </div>
            </div>`;
          }
        }
      }

      // Handling the bottom placeholder
 		  if (!this._bottomPlaceHolder) {
        this._bottomPlaceHolder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose }
        );

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceHolder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }

      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = "(Bottom property was not defined.)";
        }

        if (this._bottomPlaceHolder.domElement) {
          this._bottomPlaceHolder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="${styles.bottom}">
              <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
                bottomString
              )}
            </div>
          </div>`;
        }
      }
    }
  }

  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
