import React from 'react';
import Modal from 'react-modal';
import {formatDate, getQrCode} from "../../../utils/utils";
import {observer} from "mobx-react";


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

class DetailsModal extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { isOpen, close, t, data} = this.props,
            {id, date, status, user, pay_details, amount_usd} = data;
        if(!Object.keys(data).length) return (<div></div>);
        return (
            <div className="m-0 p-0">
                <Modal
                    isOpen={isOpen}
                    style={customStyles}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={close}
                >
                    <div className="admin-modal details">
                            <div onClick={close} className="cancel-icon"></div>
                            <span>{`${t('payment')} #${id}`}</span>
                            <p><span>{t('date')}:</span> {formatDate(date)}</p>
                            <p><span>{t('amount')}:</span> {amount_usd}$</p>
                            <p><span>{t('amount_btc')}:</span> {pay_details.amount_btc}</p>
                            <p><span>{t('user')}:</span> {user}</p>
                            <p><span>{t('address')}:</span> {pay_details.address}</p>
                            <button onClick={close} className="btn btn-outline-info  btn-blue">ok</button>
                    </div>

                </Modal>
            </div>
        )
    }

}


export default observer(DetailsModal);