import '../styles/main.scss';
import "../styles/success_registration.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import boostrap from 'bootstrap';
import "../i18n/i18n";
import { withTranslation } from 'react-i18next';
import { getDataAttributes } from "../utils/utils";
import { copyToClipboard } from "../utils/utils";


class CopyBtn extends React.Component {
    constructor() {
        super();
    }
    copy() {
        const {token} = this.props;
        copyToClipboard(token);
    }

    render () {
        const { t } = this.props;
        return (
            <div>
                <a  href="#" onClick={this.copy.bind(this)}>{t('copy')}</a>
            </div>
        );
    }
}

const element = document.getElementById('copy-token'),
    props = getDataAttributes(element);

CopyBtn = withTranslation()(CopyBtn);


ReactDOM.render(<CopyBtn {...props} />, element);
