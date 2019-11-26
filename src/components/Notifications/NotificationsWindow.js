import React, { useEffect, useRef } from "react";
import {observer} from 'mobx-react';
import Messages from "./Messages";
import cn from 'classnames';
import {withTranslation} from "react-i18next";

class NotificationsWindow extends React.Component{

    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const { store } = this.props;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && event.target.className !== 'bell-container') {
            store.setOpen(false);
        }
    }

    render() {
        const { store, t } = this.props;
        const {notifications, disabled } = store;
        const {stack} = notifications;
        return (<div ref={this.setWrapperRef}>
            <div className="notifications-window">
                <div className="more-notifications">
                    <button onClick={() => {notifications.moreNotifications()}} className={cn("btn btn-outline-info  btn-blue", {disabled})}>
                        {t('notifications.more')}
                    </button>
                </div>
                <Messages t={t} store={store} stack={stack} />
                <div className='clear-notifications'>
                    <a className={cn({disabled})} onClick={() => {notifications.markReadView()}}>
                        {t('notifications.mark_view')}
                    </a>
                    <a className={cn({disabled})} onClick={() => {notifications.markReadAll()}}>
                        {t('notifications.mark_all')}
                    </a>
                </div>
            </div>
        </div>)
    }
}


export default withTranslation()(observer(NotificationsWindow));