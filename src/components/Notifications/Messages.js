import React from 'react';
import Message from "./Message";
import Loader from "../loaders/Loader";
import {observer} from 'mobx-react';

class Messages extends React.Component {
    render() {
        const { stack, store, t } = this.props;
        // const stack = [];
        store.notifications.disableNewClass();
        return (
            <div className="messages">
                {store.loadTop && <Loader/>}
                {stack.length === 0 && !store.loadAll && <span className="empty-notifications">{t('notifications.empty')}</span>}
                {store.loadAll && <Loader/>}
                {!store.loadAll && stack.map(item => <Message t={t} key={item.timestamp} {...item}/>)}
            </div>
        )
    }
}

export default observer(Messages);