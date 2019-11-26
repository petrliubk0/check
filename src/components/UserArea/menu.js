import React from 'react';
import {Link} from "react-router-dom";
import cn from 'classnames';
import {observer, inject} from 'mobx-react'
import {DASHBOARD_URL, PAYMENTS_URL, REPOPRTS_URL} from "../../constants";
import RouterStore from "../routes/RouterStore";
import { withTranslation } from 'react-i18next';
import {setDocumentTitle} from "../../utils/utils";

const ITEMS_MENU = [{label: 'dashboard', url: DASHBOARD_URL, icon:'dashboard-icon'},
                    {label: 'payments', url: PAYMENTS_URL, icon: 'coin'},
                    {label: 'reports', url: REPOPRTS_URL, icon: 'history-icon'}];

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    setDocumentTitle() {
        const {t} = this.props;
        const {url} = this.props.RouterStore.match;
        let activeRoute = ITEMS_MENU.filter(i =>   url && url.startsWith(i.url))[0];
        if(activeRoute) setDocumentTitle(t(activeRoute.label));
    }

    render() {
        const {t} = this.props;
        const {url} = this.props.RouterStore.match;
        this.setDocumentTitle();
        return (<div className="menu">
            <div className="list-group">
                {ITEMS_MENU.map(item => {
                    return <Link key={item.label}
                                 to={item.url}
                                 className={cn('list-group-item list-group-item-action', {active: url && url.startsWith(item.url)})}>
                        <div className={cn('icon', item.icon)}></div>
                        {t(item.label)}
                    </Link>
                })}
            </div>
                <a className="upload-file" href="/"><button className="btn btn-success btn-green">{t('upload_file')}</button></a>
        </div>)
    }
}


export default withTranslation("userArea")(inject('RouterStore')(observer(Menu)));