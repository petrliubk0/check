import {observable, action, decorate}  from 'mobx';
import {login} from "../../utils/request.api";
import {getErrors} from "../../utils/utils";

class LoginStore {
    constructor() {
        this.token = {
            value: '',
            valid: true
        };
        this.captcha = {
            value: '',
            valid: true,
        };
        this.captchaKey = {
          value: ''
        };
        this.load = false;
    }

    changeAttr(attr, value) {
        this[attr].value = value;
        this[attr].valid = true;
    }

    login(call) {
        this.load = true;
        login(this.token.value, this.captcha.value, this.captchaKey.value).then(resp => {
            window.location.replace('/');
        }).catch(e => {
            const {errors, fields} = getErrors(e);
            this.load = false;
            fields.forEach(field => {
                this[field].valid = false;
            });
            call(errors);
        })
    }



}

decorate(LoginStore, {
    token: observable,
    captcha: observable,
    load: observable,
    changeAttr: action
});

export default new LoginStore();