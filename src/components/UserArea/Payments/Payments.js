import React from 'react';
import {observer, inject} from 'mobx-react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import Alert from "../../Alert";
import { withTranslation } from 'react-i18next';
import PayModal from "./PayModal";
import PayStore from "./PayStore";
import PayTable from "./PayTable";
import {getErrors} from "../../../utils/utils";
import Loader from "../../loaders/Loader";


class Payments extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        switch (params.open) {
            case 'pay': {
                PayStore.showOrderModal();
            }
        }
    }


        handleUseToken() {
        const {PaymentStore, DashboardStore, t} = this.props,
            {tokenModal} = PayStore;
        tokenModal.pending = true;
        PaymentStore.useRefillToken(tokenModal.token, (response) => {
            tokenModal.pending = false;
            tokenModal.show = false;
            DashboardStore.updateBalance();
            const amount = response.data.result.amount;
            Alert.info(t('balance-update', {amount}));

        }, e => {
            const { errors, fields } = getErrors(e);
            tokenModal.pending = false;
            PayStore.invalidFields(fields);
            errors.forEach(error => {
                Alert.error(t(error));
            });
        });

    }

    handleIPaid(id) {
        const { PaymentStore, t } = this.props;
        PaymentStore.paidTrigger(id, (resp) => {
            PayStore.closeOrderModal();
        }, e => {
            const { errors, fields } = getErrors(e);
            errors.forEach(error => {
                Alert.error(t(error));
            });
        });
    }

    handleSendMoney() {
        const { PaymentStore, DashboardStore, t } = this.props,
            { orderModal } = PayStore;
        orderModal.pending = true;
        PaymentStore.createPayment(orderModal.amount_usd, (response) => {
            orderModal.payObj = response;
            orderModal.pending = false;
            PaymentStore.updatePayments();
            DashboardStore.updateBalance();

        }, e => {
            const { errors, fields } = getErrors(e);
            orderModal.pending = false;
            PayStore.invalidFields(fields);
            errors.forEach(error => {
                Alert.error(t(error));
            });
        });

    }

    renderPayButtons() {
        const { t } = this.props;
        return (
            <div className="buttons">
                <button className="btn btn-outline-info  btn-blue d-flex"
                        onClick={() => PayStore.showOrderModal()}>
                    {t('add')} <div className="coin"></div>
                </button>
                <a onClick={() => PayStore.showTokenModal()}>{t('use-code')}</a>
            </div>);
    }

    render() {
        const {t, PaymentStore} = this.props;
        return (<div className="payments">
            {this.renderPayButtons()}
            <PayModal
                t={t}
                store={PayStore}
                handleIPaid={this.handleIPaid.bind(this)}
                handleSendMoney={this.handleSendMoney.bind(this)}
                handleUseToken={this.handleUseToken.bind(this)}
            />
            <PayTable t={t} store={PaymentStore}/>
            <Alert stack />
        </div>);
    }
}


export default withTranslation(["userArea", "table"])(inject('DefaultStore', 'PaymentStore', 'DashboardStore')(observer(Payments)));