import * as React from 'react';
import styles from './CompanyInfo.module.scss';
import { ICompanyInfoProps } from './ICompanyInfoProps';
import { ICompanyItem } from './ICompanyItem';
import CompanyInfoService from './CompanyInfoService';

export default class CompanyInfo extends React.Component<ICompanyInfoProps, {}> {
  private dataProvider : CompanyInfoService;
  public state : any;

  constructor(props) {
    super(props);

    this.state = {
      data : []
    };

    this.dataProvider = new CompanyInfoService(this.context,this.props.listname);
  }

  public render(): React.ReactElement<ICompanyInfoProps> {
    this.dataProvider.getCompanyItems()
      .then((items : ICompanyItem[]) => {
        this.setState({
          data : items
        });
      });

    return (
      // TBD: RENDERING USING SOME KIND OF CONTROLS
      <>
      </>
    );
  }
}
