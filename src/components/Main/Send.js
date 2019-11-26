import React from 'react';
import {observer, inject} from 'mobx-react';
import { withTranslation } from 'react-i18next';
import Alert from '../Alert';
import { alertErrors } from "../../utils/utils";

import cn from 'classnames';

class Send extends React.Component {
    constructor(props) {
        super(props);
    }

    send() {
        const { MainStore, t } = this.props;
        MainStore.send(alertErrors(Alert, t));
    }

    render() {
        const {t, MainStore} = this.props;
        return (
            <div className="success d-flex justify-content-center">
                <button disabled={MainStore.disabled} onClick={this.send.bind(this)} className={cn('btn btn-outline-info  btn-blue', {disabled: MainStore.disabled})}>
                    {t("send")} / {MainStore.price}$
                </button>
                <Alert effect="stackslide" stack={true} />
            </div>);
    }
}

export default withTranslation("root")(inject('MainStore')(observer(Send)));