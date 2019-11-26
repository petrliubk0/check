import React from 'react';
import Modal from 'react-modal';
import {getQrCode} from "../../../utils/utils";
import {observer} from "mobx-react";
import cn from "classnames";
import Loader from "../../loaders/Loader";
import OptionsPay from "./OptionsPay";

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(25, 25, 25, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgb(53, 53, 53)',
        backgroundColor: '#272727'

    },
    color: 'black!important'
};

class PayModal extends React.Component {
    constructor() {
        super();
    }

    renderPayObj() {
        const
            {store, handleIPaid} = this.props,
            {payObj} = store.orderModal;
        const {t} = this.props;
        if (!Object.keys(payObj).length) return false;
        let img = getQrCode(payObj.pay_details.address);

        return (
            <div className="use-token">
                <div onClick={() => store.closeOrderModal()} className="cancel-icon"></div>
                <div className="payObject">
                <span>
                    {t('payment')} #{payObj.id}
                </span>
                    <div id="qrCode" className='qrCode' dangerouslySetInnerHTML={{__html: img}}>
                    </div>
                    <a href={`bitcoin:${payObj.pay_details.address}?amount=${payObj.pay_details.amount_btc}`}>
                        <button className="btn btn-outline-info  btn-blue">
                            {t('open-in-wallet')}
                        </button>
                    </a>
                    <p dangerouslySetInnerHTML={{
                        __html: t('btc-pay', {
                            amount: payObj.pay_details.amount_btc,
                            address: payObj.pay_details.address,
                        })
                    }}></p>
                    <p>{t('btc-pay-info')}</p>
                    <button onClick={() => {handleIPaid(payObj.id)}} className="btn btn-info  btn-green">
                        {t('i-paid')}
                    </button>
                </div>
            </div>
        )
    }

    handlePayMoney(e) {
        const {store} = this.props;
        store.setOrderAmount(e.target.value);
    }

    handlePaymentToken(e) {
        const {store} = this.props;
        store.setToken(e.target.value);
    }


    render() {
        const {store, t, handleSendMoney, handleUseToken} = this.props,
            {orderModal, tokenModal, valid} = store;
        return (
            <div className="m-0 p-0">
                <Modal
                    isOpen={orderModal.show}
                    style={customStyles}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={() => store.closeOrderModal()}
                >
                    {this.renderPayObj() ||
                    <div className="use-token">
                        {(orderModal.pending && <Loader/>) ||
                        <div>
                            <div onClick={() => store.closeOrderModal()} className="cancel-icon"></div>
                            <span>{t('input-count-money')}</span>
                            <input className={cn("form-control", {"is-invalid": !valid.amount_usd})}
                                   value={orderModal.amount_usd}
                                   onChange={this.handlePayMoney.bind(this)} type="text"/>
                            <OptionsPay check={this.handlePayMoney.bind(this)}/>
                            <button className="btn btn-outline-info  btn-blue"
                                    disabled={!store.valid.amount_usd}
                                    onClick={handleSendMoney}>{t('add')}</button>
                        </div>}
                    </div>}

                </Modal>

                <Modal
                    isOpen={tokenModal.show}
                    style={customStyles}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={() => store.closeTokenModal()}
                >
                    <div className="use-token">
                        {(tokenModal.pending && <Loader/>) ||
                        <div>
                            <div onClick={() => store.closeTokenModal()} className="cancel-icon"></div>
                            <span>{t('input-code-payment')}</span>
                            <input className={cn("form-control", {"is-invalid": !valid.token})} value={tokenModal.token}
                                   onChange={this.handlePaymentToken.bind(this)} type="text"/>
                            <button className="btn btn-outline-info  btn-blue"
                                    disabled={!store.valid.token}
                                    onClick={handleUseToken}>{t('use-code')}</button>
                        </div>
                        }
                    </div>
                </Modal>
            </div>
        )
    }

}


export default observer(PayModal);