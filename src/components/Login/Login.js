import React from 'react';
import "../../i18n/i18n";
import {withTranslation} from 'react-i18next'
import Alert from "../Alert";
import cn from "classnames";
import Loader from "../loaders/Loader";
import Captcha from "../Captcha";
import {observer} from 'mobx-react';
import store from "./LoginStore";

class Login extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        const { t } = this.props;
        store.login((errors) => {
            errors.forEach(error => {
                Alert.error(t(error));
            });
        });
    }

    change(item) {
        return function (event) {
            store.changeAttr(item, event.target.value);
        };
    }

    render() {
        const {token, captcha, load} = store;
        const {t} = this.props;
        return (
            <div className="position-relative">
                {load && <Loader/>}
                <div className={cn("form", {load})}>
                    <form className="d-flex flex-column" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <input value={token.value} onChange={this.change('token').bind(this)} type="text"
                                   className={cn("form-control", {"is-invalid": !token.valid})} id="token"
                                   aria-describedby="emailHelp"
                                   placeholder=""/>
                        </div>

                        <a className="forgot-token mb-3 mt-3" href="/reset-token">{t('forgot-token')}</a>
                        <div className="form-group">
                            <label htmlFor="captcha">{t('captcha.')}</label>
                            <Captcha onLoading={() => {}}  onRefresh={(value) => this.change('captchaKey').bind(this)({target: {value}})} />
                        </div>
                        <div className={cn("form-group")}>
                            <label htmlFor="enter-captcha">{t('captcha.enter-captcha')}</label>
                            <input value={captcha.value} onChange={this.change('captcha').bind(this)} type="text"
                                   className={cn("form-control", {"is-invalid": !captcha.valid})} id="enter-captcha"
                                   placeholder={t('captcha.enter-captcha-placeholder')}/>
                        </div>
                        <button type="submit"
                                className={cn("btn btn-outline-info  btn-blue")}>{t('signin.login-button')}</button>
                    </form>
                    <Alert stack={true}/>
                </div>
            </div>
        );
    }
}


export default withTranslation("auth")(observer(Login));