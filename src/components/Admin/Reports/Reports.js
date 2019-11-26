import React from 'react';
import Reports from "../../UserArea/Reports/Reports";
import {withTranslation} from "react-i18next";
import {inject, observer} from "mobx-react";


class AdminReports extends React.Component{
    render() {
        const {ReportsStore, AdministrationStore, t} = this.props;
        return(<div className="admin-reports">
            <div className="upload-to-excel">
                <span>{t('all-reports')}</span> <button onClick={() => {AdministrationStore.uploadToExcelReports()}} className="btn btn-outline-info  btn-blue">{t('upload-to-excel')}</button>
            </div>
            <Reports t={t} ReportsStore={ReportsStore}/>
        </div>)
    }
}


export default withTranslation("admin")(inject('ReportsStore', 'AdministrationStore')(observer(AdminReports)));