import React from 'react';
import Menu from './menu';
import {observer, Provider} from "mobx-react";
import RouterStore from "../../components/routes/RouterStore";
import DefaultStore from "../stores/DefaultStore";
import WithRouterStore from "../../components/routes/withRouterStore";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import "../../i18n/i18n";
import Dashboard from "./Dashboard/Dashboard";
import Payments from "./Payments/Payments";
import Reports from "./Reports/Reports";
import {DASHBOARD_URL, PAYMENTS_URL, REPOPRTS_URL} from "../../constants";
import LangStore from "../stores/LangStore";
import "../../styles/header.scss";
import LangRoot from "../Lang";
import DashboardStore from "./Dashboard/DashboardStore";
import PaymentStore from "./Payments/PaymentStore";
import ReportsStore from "./Reports/ReportsStore";
import $ from 'jquery';
import boostrap from 'bootstrap'

const stores = {RouterStore, DefaultStore, LangStore, DashboardStore, PaymentStore, ReportsStore};

class UserArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider {...stores}>
                <div className='user-area'>
                    <Router>
                        <Menu/>
                        <Switch>
                        <Route exact path={DASHBOARD_URL} component={WithRouterStore(RouterStore)(Dashboard)}/>
                        <Route path={PAYMENTS_URL + '/:open*'} component={WithRouterStore(RouterStore)(Payments)}/>
                        <Route path={REPOPRTS_URL} component={WithRouterStore(RouterStore)(Reports)}/>
                            <Redirect to={DASHBOARD_URL} />
                        </Switch>
                    </Router>
                </div>
            </Provider>)
    }
}

export default  UserArea;