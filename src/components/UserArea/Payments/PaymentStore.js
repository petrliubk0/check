import {observable, computed, action, decorate } from 'mobx';

import { allPayments, getPayment, createPayment, useRefillToken, paidTrigger } from "../../../utils/request.api";

const TIMEOUT = 30 * 1000;

class PaymentStore {
    constructor() {
        this.payments = [];
        this.paymentsLoad = true;
        this.total = 0;
        allPayments(this.offset).then(res => this.appendToStore(res.data.result)).catch(e => {});
        setInterval(this.intervalPpdatePayments.bind(this), TIMEOUT);
    }

    updateStore(data) {
        let {items, total} = data;
        this.payments = items;
        this.total = total;
    }

    appendToStore(data) {
        let {items, total} = data;
        this.payments = this.payments.concat(items);
        this.total = total;
        this.paymentsLoad = false;
    }

    intervalPpdatePayments() {
        allPayments(0, this.payments.length).then(res => this.updateStore(res.data.result)).catch(e => {});
    }

    get offset() {
        return this.payments.length;
    }
    paidTrigger(id, call, error) {
        paidTrigger(id).then(call).catch(error);
    }

    getPayment(id) {
        getPayment(id).then(res => {
            const result = res.data.result;
        });
    }

    createPayment(amount_usd, call, error) {
        createPayment(amount_usd).then(res => {
            const result = res.data.result;
            call(result);
        }).catch(e => {
            error(e);
        });
    }
    updatePayments() {
        allPayments(this.offset).then(res => this.appendToStore(res.data.result)).catch(e => {});
    }

    useRefillToken(token, call, error) {
        useRefillToken(token).then(call).catch(error)
    }
}

decorate(PaymentStore, {
    payments: observable,
    paymentsLoad: observable,
    total: observable,
    offset: computed,
    getPayment: action,
    createPayment: action,
    useRefillToken: action,
    resetApiToken: action
});

export default new PaymentStore();