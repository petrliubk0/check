import React from 'react';
import {observer} from 'mobx-react';
import LoaderSecond from "../loaders/LoaderSecond";


class Bell extends React.Component {
    render() {
        const {store} = this.props,
            {count, counter} = store;
        return (
            <div onClick={() => {store.setOpen(!store.isOpen)}} className="bell-container">
                <div className="count">
                    {counter.load || ( count > 100 ? '100+': count)}
                    {counter.load && <LoaderSecond/>}
                </div>
                <div className="bell">
                </div>
            </div>
        )
    }
}

export default observer(Bell);