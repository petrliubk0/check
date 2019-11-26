import { observable, action, computed, decorate, configure } from 'mobx';
import {getErrors} from "../../../utils/utils";
import { checkFile } from '../../../utils/request.api';

class MainStore {

    constructor(CheckedListStore, AutoReportStore, DropFileStore, userLogin) {
        this.CheckedListStore = CheckedListStore;
        this.AutoReportStore = AutoReportStore;
        this.DropFileStore = DropFileStore;
        this.userLogin = userLogin;
        this.load = false;
    }

    startLoad() {
        this.load = true;
    }

    endLoad() {
        this.load = false;
    }


    send(call) {
        let form = new FormData();
        const { file } = this.DropFileStore,
            { periodUpdate, firstOperation } = this.AutoReportStore,
            { checkedItems } = this.CheckedListStore;
        this.load = true;
        checkFile(file, checkedItems, periodUpdate, firstOperation).then(resp => {
                this.load = false;
                window.location.replace('/report/' + resp.data.result.id);

            }).catch(e => {
                this.load = false;
            const { errors, fields } = getErrors(e);
                call(errors);
        });
    }

    get price() {
        return this.CheckedListStore.checkedCount * 0.01;
    }
    get avValid() {
        return this.CheckedListStore.checkedCount > 0;
    }

    get disabled() {
        return !this.avValid || !this.userLogin;
    }
}

decorate(MainStore, {
    load: observable,
    price: computed,
    send: action,
    avValid: computed,
    startLoad: action,
    endLoad: action
});

export default MainStore;