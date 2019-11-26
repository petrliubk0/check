import {observable, action, computed, decorate} from 'mobx';
import { registration, getCaptcha } from "../../utils/request.api";
import {getErrors} from "../../utils/utils";

function setAttrsValid(attrs, value) {
    attrs.forEach(attr => this[attr].valid = value);
}



class RegistrationStore {
    constructor() {
        this.username = {
            valid: true,
            value: ''
        };
        this.contact = {
            visible: false,
            valid: true,
            value: ''
        };
        this.contact_type = {
            valid: true,
            value: ''
        };
        this.contactTypeOptions = [
            {value: '', content: 'none'},
            {value: 'email', content: 'email'},
            {value: 'jabber', content: 'jabber'}
            ];
        this.load = false;
        this.captcha = {
            value: '',
            key: '',
            valid: true,
            ready: true
        };
        // this.disabledBtn = false;
    }

    changeCaptchaKey(key) {
        this.captcha.key = key;
    }

    change(item, value) {
        this[item].value = value;
        this[item].valid = true;
        // this.disabledBtn = false;
    }

    changeType(value) {
        this.contact_type.value = this.contactTypeOptions.map(i => i.value).indexOf(value) !== -1?
            value: this.contactTypeOptions[0].value;
        this.contact.visible = this.contact_type.value !== this.contactTypeOptions[0].value;
    }

    get disabled() {
        return this.contact_type.value === this.contactTypeOptions[0].value || !this.captcha.ready;
    }

    registration(call) {
        this.load = true;
        registration(this.username.value, this.contact.value, this.contact_type.value, this.captcha.key, this.captcha.value)
            .then(resp => {
                window.location.replace('/success-registration');
            }).catch(e => {
                const { errors, fields } = getErrors(e);
                call(errors);
                this.load = false;
                // this.disabledBtn = true;
                setAttrsValid.bind(this)(fields, false);
        });
    }

}


decorate(RegistrationStore, {
    username: observable,
    contact: observable,
    errors: observable,
    contact_type: observable,
    // disabledBtn: observable,
    captcha: observable,
    load: observable,
    disabled: computed,
    registration: action,
    clearErrors: action,
    changeType: action
});

export default new RegistrationStore();