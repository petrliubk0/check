import React from 'react';
import {inject, observer} from 'mobx-react';
import {withTranslation} from "react-i18next";
import Statistic from "./Statistic";
import Table from "../../Table/Table";
import Loader from "../../loaders/Loader";
import {formatDate} from "../../../utils/utils";
import DetailsModal from "./DetailsModal";
import RefillTokenModal from "./RefillTokenModal";

class Administration extends React.Component {

    render() {
        const {t, AdministrationStore} = this.props;
        const {stats, payments, detailsModal, refillTokenModal} = AdministrationStore,
            columns = [{
                Header: t('id'),
                accessor: 'id',
                Cell: row => `#${row.value}`
            },
                {
                    Header: t('date'),
                    accessor: 'date',
                    Cell: row => formatDate(row.value)
                },

                {
                    Header: t('user'),
                    accessor: 'user'
                },
                {
                    Header: t('amount_usd'),
                    accessor: 'amount_usd'
                },
                {
                    Header: t('amount_btc'),
                    accessor: 'pay_details.amount_btc'
                },

                {
                    Header: t('status'),
                    accessor: 'status',
                    Cell: row => t(`table:${row.value}`)
                },
                {
                    Header: "",
                    Cell: row => {
                        return (<button onClick={() => {
                            AdministrationStore.openDetails(row.original);
                        }} style={{minWidth: '120px'}} className="btn btn-success btn-green">
                            {t('details')}
                        </button>);
                    }
                }];
        return (<div className="administration">
            <Statistic t={t} {...stats}/>
            <div>
                <RefillTokenModal t={t} store={AdministrationStore} {...refillTokenModal}  />
            </div>
            <div className="payments">
                {payments.load && <Loader/> ||

                <div>
                    <div className="upload-to-excel">
                        <span>{t('all-payments')}</span> <button onClick={() => {AdministrationStore.uploadToExcelPayments()}} className="btn btn-outline-info  btn-blue">{t('upload-to-excel')}</button>
                    </div>
                    <Table updateData={() => {AdministrationStore.updatePayments()}} columns={columns} data={payments.data} of={payments.total}/>
                </div>}
            </div>
            <DetailsModal t={t} {...detailsModal} close={() => {AdministrationStore.closeDetails()}}/>
        </div>)
    }
}


export default withTranslation(["admin", 'table'])(inject('AdministrationStore')(observer(Administration)));