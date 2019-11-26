import React from 'react';
import { observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import Modal from "./Modal";
import LoaderSecond from "../../loaders/LoaderSecond";

class Dashboard extends React.Component {
    render() {
        const {t, DashboardStore} = this.props;
        const { balance, api_token, count, current_month_count, modalIsOpen, countLoad } = DashboardStore;
        return (<div className="dashboard">
            {/*<h1>{t('dashboard')}</h1>*/}
            <Modal
                t={t}
                isOpen={modalIsOpen}

                yes={() => {
                    DashboardStore.resetApiToken();
                    DashboardStore.closeModal();
                }
                }
                no={() => { DashboardStore.closeModal()}}
            />
            <div className="balance">
                <p><div className="coin"></div>{t('balance')}:{balance.load && <LoaderSecond/> || <span>{ balance.value }$</span>}</p>
            </div>
            <div className="api">
                <span>
                    <div className="api-icon"></div>
                    {t('api')}
                </span>
                <p>
                    {t('token.')}: {api_token.load && <LoaderSecond/>} <input type="text" value={api_token.load? '': api_token.value} readOnly/></p>
                <a className="reset-token" onClick={()=> {DashboardStore.openModal()}}>{t('token.reset')}</a>
            </div>
            <div className="static-using">
                <span>
                    <div className="statistic-icon"></div>
                    {t('usage_statistics')}
                </span>
                <p>{t('count_files')}: {countLoad && <LoaderSecond/> || <span>{ count }</span>}</p>
                <p>{t('month_count_files')}: {countLoad && <LoaderSecond/> || <span>{ current_month_count }</span>}</p>
            </div>

        </div>)
    }
}


export default withTranslation("userArea")(inject('DefaultStore', 'DashboardStore')(observer(Dashboard)));