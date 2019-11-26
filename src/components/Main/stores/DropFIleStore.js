import { observable, action, computed, decorate } from 'mobx';


class DropFIleStore {
    constructor() {
        this.file = null;
    }

    addFile(file) {
        this.file = file;
    }

    get fileName() {
        return this.file ? this.file.name: false;
    }
}

decorate(DropFIleStore, {
    file: observable,
    addFile: action,
    fileName: computed

});


export default new DropFIleStore();