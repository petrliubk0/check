import {observable, action, decorate } from 'mobx';
import {notifications, markReadNotifications } from "../../../utils/request.api";
import requestIfNotLoad from "../../../utils/requestIfNotLoad";
const TIMEOUT = 10 * 1000;
const notificationsWrapped = requestIfNotLoad(notifications);

class NotificationsStore {
   constructor(rootStore, user) {
       this.rootStore = rootStore;
       this._stack = [];
       this.lastTimestamp = null;
       if(user) {
           notificationsWrapped().then(this.pushToStack.bind(this)).catch(err => {
               this.rootStore.setLoadAll(false);
               this.rootStore.setLoadTop(false);
           });
           this.checkNotificationsInterval = setInterval(this.checkNotifications.bind(this), TIMEOUT);
       }
   }

   get stack() {
       return this._stack;
   }

   disableNewClass() {
       setTimeout(() => {this._stack.forEach(i => i.className = false);}, 5000);
   }

    checkNotifications() {
       const { count } = this.rootStore.counter;
       if(count && !this._stack.length) this.updateStack();
    }

   pushToStack(response) {
       let items = response.data.result;
       if(this.rootStore.loadTop) {
           items.forEach(i => i.className = 'new');
           this._stack.forEach(i => i.className = false);
       }

       this.rootStore.setLoadAll(false);
       this.rootStore.setLoadTop(false);
       this._stack = items.concat(this._stack);
       this.lastTimestamp = this._stack[0]? this._stack[0].timestamp: null;
   }

    markReadAll() {
        this.rootStore.setLoadAll(true);
        markReadNotifications().then(resp => {
            this.clearStack();
            this.updateStack();
            this.rootStore.counter.update();
        })
    }

    clearStack() {
       this._stack = [];
       this.lastTimestamp = null;
    }

    markReadView() {
       const to = this._stack[0].timestamp, from = this._stack[this._stack.length - 1].timestamp;
       this.rootStore.setLoadAll(true);
       markReadNotifications(from, to).then(resp => {
           this.clearStack();
           this.updateStack();
           this.rootStore.counter.update();
       })
    }

   moreNotifications() {
       this.rootStore.setLoadTop(true);
       this.updateStack();
   }

   updateStack() {
       const promise = notificationsWrapped(this.lastTimestamp);
       if(promise)
           promise
               .then(this.pushToStack.bind(this))
               .catch(err => {
                   this.rootStore.setLoadAll(false);
                   this.rootStore.setLoadTop(false);
                })
   }

}


decorate(NotificationsStore, {
    _stack: observable,
    updateStack: action,
    clearStack: action,
    markReadAll: action,
    markReadView: action
});


export default  NotificationsStore;