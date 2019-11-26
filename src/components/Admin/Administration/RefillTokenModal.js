import React from 'react';
import Modal from 'react-modal';
import {formatDate, getQrCode} from "../../../utils/utils";
import {observer} from "mobx-react";
import cn from "classnames";
import Loader from "../../loaders/Loader";
import Alert from "../../Alert";
import OptionsPay from "../../UserArea/Payments/OptionsPay";

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

class RefillTokenModal extends React.Component {
    constructor() {
        super();
    }

    setAmountUsd(event) {
        const {store} = this.props;
        store.updateAmountUsd(event.target.value);
    }

    createToken() {
        const {store, t} = this.props;
        store.createToken((errors) => {
            errors.forEach(error => {
                Alert.error(t(error));
            })
        });
    }



    close() {
        const {store} = this.props;
        store.refillTokenModalClose();
    }

    renderResultToken() {
        const { tokenObj, t } = this.props;

        return (
            <div className="result-token">
                <span>{t('token-was-created', {amount: tokenObj.amount_usd})}</span>
                <span className="token highlight highlight-inverted">{tokenObj.token}</span>
                <p>{t('token-was-created-info')}</p>
            </div>
        )
    }


    render() {
        const { isOpen, t, store, load, amount_usd, tokenObj} = this.props;
            // {id, amount_usd} = data;
        // if(!Object.keys(data).length) return (<div></div>);

        return (
            <div className="create-token">
                <button onClick={store.refillTokenModalOpen.bind(store)} className="btn btn-outline-info  btn-blue">{t('create-new-code-pay')}</button>
                <Modal
                    isOpen={isOpen}
                    style={customStyles}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.close.bind(this)}
                >
                    <div className="admin-modal details">
                        {(load && <Loader/>) ||
                        <div>
                            <div onClick={this.close.bind(this)} className="cancel-icon"></div>
                            {tokenObj && this.renderResultToken() ||
                                <div className="token-form">
                                    <span>{t('input-code-payment')}</span>
                                    <div className="form-group">
                                        <label htmlFor="amount">{t('amount_usd')}</label>
                                        <input id="amount" className={cn("form-control", {"is-invalid": !amount_usd.valid})} value={amount_usd.value}
                                               onChange={this.setAmountUsd.bind(this)} type="text"/>
                                    </div>
                                    <OptionsPay check={this.setAmountUsd.bind(this)} />

                                    <button className="btn btn-outline-info  btn-blue"
                                            onClick={this.createToken.bind(this)}>{t('create-token')}</button>
                                </div>}

                        </div>
                        }
                    </div>

                </Modal>
            <Alert stack/>
            </div>
        )
    }

}


export default observer(RefillTokenModal);