import React from 'react';
import {observer, inject} from 'mobx-react';
import ReactTable from "react-table";
import {formatDate} from "../../../utils/utils";
import {withTranslation} from "react-i18next";
import Table from "../../Table/Table";
import Loader from "../../loaders/Loader";


class Reports extends React.Component {
    constructor(props) {
        super(props);

        const { t } = this.props;

    }


    render() {
        const { t, ReportsStore } = this.props;
        const { reports, total, load } = this.props.ReportsStore,
            columns = ReportsStore.generateColumns(t);

        return (<div className="reports">
            {reports.length && <div className="reports-table"><Table updateData={() => {ReportsStore.updateReports()}} columns={columns} data={reports} of={total}/></div>
            || <p className="bg-semi-black d-inline-block p-2 m-5 mt-4">{load && <Loader/> || t('you_dont_have_reports_yet')}</p>}
        </div>);
    }
}


export default withTranslation("userArea")(inject('ReportsStore')(observer(Reports)));