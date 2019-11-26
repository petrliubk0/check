import React from 'react';
import Bell from "./Bell";
import NotificationsWindow from "./NotificationsWindow";
import RootStore from "./stores/RootStore";
import {observer} from 'mobx-react';

class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.store = new RootStore(props.user);
    }

    render() {
        const {user} = this.props;
        const {isOpen} = this.store;
        return(
            <div>
                {user && <Bell store={this.store} />}
                {isOpen && <NotificationsWindow store={this.store} /> }
            </div>
        )
    }
}

export default observer(Notifications);