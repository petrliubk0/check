import React from 'react';
import Modal from 'react-modal';

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
        backgroundColor: '#272727',
    },
    color: 'black!important'
};

export default (props) => {
    return (
        <Modal
            style={customStyles}
            onRequestClose={props.no}
            shouldCloseOnOverlayClick={true}
            {...props}
        >
            <div className="use-token">
                <div onClick={props.no} className="cancel-icon"></div>
                <p className="question-change-token">{props.t('token.change')}</p>
                <div className="btns">
                    <button onClick={props.yes} className="btn btn-blue">
                        {props.t('yes')}
                    </button>
                    <button onClick={props.no} className="btn btn-danger">
                        {props.t('no')}
                    </button>
                </div>
            </div>
        </Modal>
    )
}