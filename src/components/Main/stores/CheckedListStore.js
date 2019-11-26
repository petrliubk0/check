import { observable, action, computed, decorate } from 'mobx';


class CheckedListStore {

    constructor(list) {
        this.checkedAll = true;
        this.list = list.map(i => {
            i.checked = true;
            return i;
        }).sort((i, j) => i.name.localeCompare(j.name));
    }

    toggleAll() {
        this.checkedAll = !this.checkedAll;
        this.list.forEach(item => {
            item.checked = this.checkedAll;
        })
    }

    toggle(item) {
        item.checked = !item.checked;
        this.testCheckedAll();
    }

    testCheckedAll() {
        this.checkedAll = this.list.length === this.checkedCount;
    }

    get checkedItems() {
        return this.list.filter(i => i.checked).map(i => i.id);
    }

    get checkedCount() {
        return this.list.filter(i => i.checked).length;
    }

}
decorate(CheckedListStore, {
    list: observable,
    checkedAll: observable,
    checkedCount: computed,
    checkedItems: computed,
    toggleAll: action,
    setAntivirus: action
});
export default CheckedListStore;