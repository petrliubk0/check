import { observable, action, decorate, computed,autorun } from 'mobx';
import CounterStore from "./CounterStore";
import NotificationsStore from './NotificationsStore';
import {observer} from "mobx-react";


class RootStore {
    constructor(user) {
        this.counter = new CounterStore(this, user);
        this.notifications = new NotificationsStore(this, user);
        this.isOpen = false;
        this.loadAll = false;
        this.loadTop = false;
    }

    get disabled() {
        return this.loadAll || this.loadTop || !this.notifications.stack.length
    }

    setOpen(value) {
        this.isOpen = value;
    }


    setLoadAll(value) {
        this.loadAll = value;
    }
    setLoadTop(value) {
        this.loadTop = value;
    }

    get count() {
        return this.counter.count;
    }

    get stack() {
        return this.notifications.stack;
    }

}

decorate(RootStore, {
    isOpen: observable,
    loadAll: observable,
    loadTop: observable,
    disabled: computed,
    count: computed,
    stack: computed
});


export default RootStore;