import React from 'react';
import {formatDate} from "../../utils/utils";
import Payload from "./Payload";
import cn from 'classnames';

const typeIcons = {
  report: 'report-icon',
  balance: "coin"
};

class Message extends React.Component{

    render() {
        const {timestamp, message, payload, type, className, t} = this.props;
        return (<div className={cn("message",className)}>
            <div className="head">
                <span className="type"><div className={cn('icon', typeIcons[type])}></div>{t(`notifications.types.${type}`)}</span>
                <span className="time" >{formatDate(timestamp)}</span>
            </div>
            <p>{message}</p>
            <Payload t={t} type={type} payload={payload} />
        </div>)
    }

}

export default Message;