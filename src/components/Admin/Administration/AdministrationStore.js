import {observable, computed, action, decorate} from 'mobx';
import {statsAdmin, paymentsAdmin, createRefillToken, createPaymentsCsv, createReportsCsv } from "../../../utils/request.api";
import {FLOAT_REGEXP} from "../../../constants";
import {getErrors} from "../../../utils/utils";
import {downloadFile} from "../../../utils/utils";
import axios from 'axios';

class AdministrationStore {
    constructor() {
        this.stats = {
            data: {},
            load: true
        };
        this.payments = {
            data: [],
            total: 0,
            load: true
        };
        this.detailsModal = {
            data: {},
            isOpen: false
        };
        this.refillTokenModal = {
          amount_usd: {
              value: '',
              valid: true
          },
          tokenObj: false,
          load: false,
          isOpen: false
        };
        this.updateStats();
        this.getPayments();
        // this.closeDetails.bind(this);
    }

    refillTokenModalOpen() {
        this.refillTokenModal.isOpen = true;
    }

    refillTokenModalClose() {
        this.refillTokenModal.isOpen = false;
        this.refillTokenModal.tokenObj = false;
        this.refillTokenModal.amount_usd.value = '';
        this.refillTokenModal.amount_usd.valid = true;
    }
    uploadToExcelPayments() {
        createPaymentsCsv().then(resp => {
            downloadFile(`/static/${resp.data.result.url}`);
        });
    }

    uploadToExcelReports() {
        createReportsCsv().then(resp => {
            downloadFile(`/static/${resp.data.result.url}`);
        });
    }

    createToken(call) {
        this.refillTokenModal.load = true;
        createRefillToken(this.refillTokenModal.amount_usd.value).then(resp => {
            this.refillTokenModal.tokenObj = resp.data.result;
            this.refillTokenModal.load = false;
        }).catch(e => {
            const { errors, fields } = getErrors(e);
            if(fields.length) this.refillTokenModal.amount_usd.valid = false;
            this.refillTokenModal.load = false;
            call(errors);
        })
    }

    updateAmountUsd(value) {
        if(FLOAT_REGEXP.test(value)) {
            this.refillTokenModal.amount_usd.value = value;
            this.refillTokenModal.amount_usd.valid = true;
        }

    }

    getPayments() {
        this.payments.load = true;
        paymentsAdmin().then(resp => {
            let {items, total} = resp.data.result;
           this.payments.data = this.payments.data.concat(items);
           this.payments.total = total;
           this.payments.load = false;
        });
    }

    updatePayments() {
        // this.payments.load = true;
        paymentsAdmin(this.offset).then(resp => {
            let {items, total} = resp.data.result;
           this.payments.data = this.payments.data.concat(items);
           this.payments.total = total;
            // this.payments.load = false;
        });
    }

    get offset() {
        return this.payments.data.length;
    }

    openDetails(payment) {
        this.detailsModal.data = payment;
        this.detailsModal.isOpen = true;
    }

    closeDetails() {
        this.detailsModal.isOpen = false;
    }

    updateStats() {
        this.stats.load = true;
        statsAdmin().then(resp => {
            this.stats.data = resp.data.result;
            this.stats.load = false;
        }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
            } else {
                // handle error
            }
        });
    }
}

decorate(AdministrationStore, {
    stats: observable,
    payments: observable,
    offset: computed,
    detailsModal: observable,
    refillTokenModal: observable,
    updateStats: action,
    updatePayments: action,
    updateAmountUsd: action
});


export default new AdministrationStore();