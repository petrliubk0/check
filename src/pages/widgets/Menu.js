import React from "react";
import i18n from "../../i18n/i18n";
import {withTranslation} from "react-i18next";
import cn from 'classnames';
const items = [{url: '/', label: 'root'}, {url: '/api', label: 'api'}, {url: '/contacts', label: 'contacts'}];

class Menu extends React.Component {

    render() {
         const { t, active } = this.props;
        return(
            <div>
                <ul className="navbar-nav">
                    {items.map(item => (
                        <li className="nav-item">
                            <a href={item.url} className={cn("nav-link", {active: active === item.label})}>{t(item.label)}</a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default withTranslation()(Menu);