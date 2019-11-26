import React from 'react';
import { REPORT_URL,  PAIMENTS_PAY_URL} from "../../constants";
const
    TYPE_LINK = 'link',
    links = {
  report: REPORT_URL,
  'refill-balance': PAIMENTS_PAY_URL
};


class Payload extends React.Component{
    generateUrl(to, args) {
        return `${links[to]}${args.id? args.id: ''}`;
    }

    link(item, args) {
        const {t} = this.props;
        return (<a href={this.generateUrl(item.to, args)} target="_blank">{t(`notifications.links.${item.to}`)}</a>)
    }

    renderPayload() {
        const
            { payload } = this.props;

        let result = [];
        payload.forEach(item => {
            const {type, args} = item;
            switch (type) {
                case TYPE_LINK: {
                    result.push(this.link(item, args));
                    break;
                }
            }
        });

        return result;
    }

    render() {
        return (
            <div>
                {this.renderPayload()}
            </div>
        )
    }
}




export default Payload;