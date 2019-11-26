import React from 'react';
import {inject, observer} from 'mobx-react';
import Alert from "../../components/Alert";
import {withTranslation} from "react-i18next";
import i18n from "../../i18n/i18n";
import {alertErrors} from "../../utils/utils";
import cn from 'classnames';
import Select from "./Select";
import Loader from "../loaders/Loader";
import Captcha from "../Captcha";

class Registration extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            email: ""
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const {t} = this.props;
        this.props.RegistrationStore.registration(alertErrors(Alert, t));
        return;
    }

    change(item) {
        const {RegistrationStore} = this.props;
        return function (event) {
            RegistrationStore.change(item, event.target.value);
        }

    }

    changeCaptchaKey(key) {
        const {RegistrationStore} = this.props;
        RegistrationStore.changeCaptchaKey(key);
    }

    changeType(event) {
        const {RegistrationStore} = this.props;
        RegistrationStore.changeType(event.target.value);
    }

    translateOptions(options) {
        const {t} = this.props;
        return options.map(i => {i.view = t(i.content + '.'); return i});
    }

    render() {
        const {username, contact, captcha, contact_type, contactTypeOptions, disabled, load} = this.props.RegistrationStore;

        const {t} = this.props;
        return (
            <div className="position-relative">
                {load && <Loader/>}
                <div className={cn("form", {load})}>
                    <form className="d-flex flex-column" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="username">{t('username.')}</label>
                            <input value={username.value} onChange={this.change('username').bind(this)} type="text"
                                   className={cn("form-control", {"is-invalid": !username.valid})} id="username"
                                   placeholder={t('signup.username-placeholder')}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="captcha">{t('captcha.')}</label>
                            <Captcha onLoading={() => {}}  onRefresh={this.changeCaptchaKey.bind(this)} />
                        </div>
                        <div className={cn("form-group")}>
                            <label htmlFor="enter-captcha">{t('captcha.enter-captcha')}</label>
                            <input value={captcha.value} onChange={this.change('captcha').bind(this)} type="text"
                                   className={cn("form-control", {"is-invalid": !captcha.valid})} id="enter-captcha"
                                   placeholder={t('captcha.enter-captcha-placeholder')}/>
                        </div>


                        <div className="form-group">
                            <label htmlFor="identifier-type">{t('identifier-type')}</label>
                            <Select onChange={this.changeType.bind(this)} value={contact_type.value}
                                    className="custom-select" options={this.translateOptions(contactTypeOptions)} name="identifier-type"/>
                        </div>
                        <div className={cn("form-group", {"d-none": !contact.visible})}>
                            <label htmlFor="contact">{t(contact_type.value + ".")}</label>
                            <input value={contact.value} onChange={this.change('contact').bind(this)} type="text"
                                   className={cn("form-control", {"is-invalid": !contact.valid})} id="contact"
                                   placeholder={t('signup.email-placeholder')}/>
                        </div>
                        <button disabled={disabled} type="submit"
                                className={cn("btn btn-outline-info  btn-blue mt-4")}>{t('signup.register-button')}</button>
                    </form>
                    <Alert stack={true}/>
                </div>
            </div>
        );
    }

    register() {

    }
}

export default withTranslation("auth")(observer(Registration));