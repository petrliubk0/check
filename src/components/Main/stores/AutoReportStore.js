import {observable, action, decorate } from 'mobx';


class AutoReportStore {
    constructor() {
        this.active = false;
        this.min = 1;
        this.max = 12;
        this.value = Math.ceil((this.max - this.min) / 2);
        this.defaultValue = Math.ceil((this.max - this.min) / 2);
        this.firstOperation = false;
    }

    setActive(value) {
        this.active = value;
    }

    setValue(value) {
        this.value = value;
    }

    setFirstOperation(value) {
        this.firstOperation = value;
    }

    get periodUpdate() {
        return this.active ? this.value : 0;
    }

}


decorate(AutoReportStore, {
    active: observable,
    value: observable,
    firstOperation: observable,
    setValue: action,
    setActive: action,
    setFirstOperation: action
});

export default new AutoReportStore();