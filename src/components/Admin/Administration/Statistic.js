import React from 'react';
import cn from "classnames";
import Loader from "../../loaders/Loader";

class Statistic extends React.Component {
    render() {
        const {load, data, t} = this.props;
        const {total_amount_usd, today_amount_usd, files_count, users_count} = data;

        return (
            <div className="statistic">
                {load && <Loader/> ||
                <div className="info">
                    <span>{t('statistic')}</span>
                    <p>{t('users_count')}: <span>{users_count}</span></p>
                    <p>{t('files_count')}: <span>{files_count}</span></p>
                    <p>{t('total_amount_usd')}: <span>{total_amount_usd}</span></p>
                    <p>{t('today_amount_usd')}: <span>{today_amount_usd}</span></p>
                </div>
                }
            </div>
        )
    }
}

export default Statistic;