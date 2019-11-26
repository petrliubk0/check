import React from 'react';
import ReactTable from "react-table";

import PayStore from "./PayStore";
import { observer } from "mobx-react"
import { formatDate } from "../../../utils/utils";
import Table from "../../Table/Table";
import Loader from "../../loaders/Loader";

class PayTable extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;


    }
    
    render() {
        const { store, t } = this.props,
            { payments, paymentsLoad } = store;
        this.columns = [{
            Header: t('id'),
            accessor: 'id',
            Cell: row => `#${row.value}`
        }, {
            Header: t('status'),
            accessor: 'status',
            Cell: row => t(`table:${row.value}`)
        },
            {
                Header: t('date'),
                accessor: 'date',
                Cell: row => formatDate(row.value)
            }, {
                Header: t('amount'),
                accessor: 'amount_usd'
            },
            {
                Header: "",
                Cell: row => {
                    if(row.original.status !== 'pending') return (<div></div>);
                    return (<button onClick={() => {
                        PayStore.showPayOrder(row.original);
                    }} style={{minWidth: '120px'}} className="btn btn-success btn-green">
                        {t('pay')}
                    </button>);
                }
            }];
        return (
            payments.length &&
            <div className="payments-table">
                <Table  updateData={() => {store.updatePayments()}} columns={this.columns} data={payments} of={store.total}/></div> ||
            <p className="bg-semi-black d-inline p-2 m-5">{paymentsLoad && <Loader/> || t('you_dont_have_payments_yet')}</p>
        )
    }
}

export default observer(PayTable);

