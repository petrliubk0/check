import {observable, computed, action, decorate } from 'mobx';

import { userInfo, balance, resetApiToken } from "../../../utils/request.api";

class DashboardStore {
    constructor() {

        this.modalIsOpen = false;

        this.balance = {
            value: 0,
            load: true
        };

        this.api_token = {
            value: '',
            load: true
        };
        this.count = 0;
        this.current_month_count = 0;
        this.countLoad = true;
        userInfo().then(res => {
            const result = res.data.result;
            this.api_token.value = result.api_token;
            this.api_token.load = false;
            this.count = result.file_stats.count;
            this.current_month_count = result.file_stats.current_month_count;
            this.countLoad = false;
        }).catch(e => {

        });
        this.updateBalance();

    }

    updateBalance() {
        this.balance.load = true;
        balance().then(res => {
            this.balance.load = false;
            const result = res.data.result;
            this.balance.value = result.balance_usd;
        }).catch(e => {
            this.balance.load = false;
        })
    }

    openModal() {
        this.modalIsOpen = true;
    }

    closeModal() {
        this.modalIsOpen = false;
    }


    resetApiToken() {
        this.api_token.load = true;
        resetApiToken().then(res => {
            const result = res.data.result;
            this.api_token.value = result.api_token;
            this.api_token.load = false;
        }).catch(e => {
            this.api_token.load = false;
        })
    }
}

decorate(DashboardStore, {
    balance: observable,
    api_token: observable,
    count: observable,
    current_month_count: observable,
    modalIsOpen: observable,
    countLoad: observable,
    updateBalance: action,
    openModal: action,
    closeModal: action,
    resetApiToken: action
});

export default new DashboardStore();