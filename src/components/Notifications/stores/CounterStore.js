import {observable, action, computed, decorate} from 'mobx';
import { notificationsCounter } from "../../../utils/request.api";
import requestIfNotLoad from "../../../utils/requestIfNotLoad";
const notificationsCounterWrapped = requestIfNotLoad(notificationsCounter);
const TIMEOUT = 5 * 1000;


class CounterStore {
    constructor(rootStore, user) {
        this.rootStore = rootStore;
        this.count = 0;
        this.load = true;
        if(user) this.interval = setInterval(this.update.bind(this), TIMEOUT);
    }

    update() {
        let promise = notificationsCounterWrapped();
        if(promise)
            promise
                .then(resp => {
                    this.load = false;
                    this.count = resp.data.result.count;
                })
                .catch(err => {
                    this.load = false;
                })
    }
}

decorate(CounterStore, {
    count: observable
});



export default CounterStore;