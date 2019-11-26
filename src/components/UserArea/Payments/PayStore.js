import { observable, action, computed, decorate } from 'mobx';
import {FLOAT_REGEXP} from "../../../constants";


class PayStore {
    constructor() {
        this.orderModal = {
            show: false,
            pending: false,
            amount_usd: '',
            payObj: {}
        };
        this.tokenModal = {
            show: false,
            pending: false,
            token: ''
        };
        this.valid = {
            amount_usd: true,
            token: true
        };
    }
    showOrderModal() {
        this.orderModal = {
            show: true,
            amount_usd: '',
            payObj: {}
        };
        this.valid.amount_usd = true;
    }

    showTokenModal() {
        this.tokenModal = {
            show: true,
            token: ''
        };
        this.valid.token = true;
    }
    invalidFields(fields) {
        fields.forEach(i => {
            this.valid[i] = false;
        })
    }


    setOrderAmount(value) {
        if(FLOAT_REGEXP.test(value)) {
            this.orderModal.amount_usd = value;
            this.valid.amount_usd = true;
        }
    }

    setToken(value) {
        this.tokenModal.token = value;
        this.valid.token = true;
    }

    showPayOrder(payObj) {
        this.orderModal = {
            show: true,
            amount_usd: '',
            payObj: payObj
        };
        this.valid.amount_usd = true;
    }

    closeOrderModal() {
        this.orderModal.show = false;
    }

    closeTokenModal() {
        this.tokenModal.show = false;
    }
}


decorate(PayStore, {
    orderModal: observable,
    tokenModal: observable,
    valid: observable,
    showOrderModal: action,
    showPayOrder: action,
    invalidFields: action
});


export default new PayStore();