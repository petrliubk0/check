import React from 'react';
import {Link} from "react-router-dom";
import cn from 'classnames';
import {observer, inject} from 'mobx-react'
import {ADMIN_URL, REPORTS_ADMIN_URL} from "../../constants";
import RouterStore from "../routes/RouterStore";
import { withTranslation } from 'react-i18next';
import {setDocumentTitle} from "../../utils/utils";

const ITEMS_MENU = [{label: 'admin', url: ADMIN_URL},
    {label: 'reports', url: REPORTS_ADMIN_URL}];

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    setDocumentTitle() {
        const {t} = this.props;
        const {url} = this.props.RouterStore.match;
        let activeRoute = ITEMS_MENU.filter(i => i.url === url)[0];
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
                                 className={cn('list-group-item list-group-item-action', {active: item.url === url})}>
                        {t(item.label)}
                    </Link>
                })}
            </div>
            {/*<a className="upload-file" href="/"><button className="btn btn-success btn-green">{t('upload_file')}</button></a>*/}
        </div>)
    }
}


export default withTranslation("admin")(inject('RouterStore')(observer(Menu)));