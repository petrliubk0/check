import {observable, action, computed, decorate} from 'mobx';


class DefaultStore {
    constructor() {
        this.value = false;
    }

    changeValue(value) {
        this.value = value;
    }

    get isFalse() {
        if(!this.value) return false;
        return true;
    }
}

decorate(DefaultStore, {
    value: observable,
    changeValue: action,
    isFalse: computed
})


export default new DefaultStore();