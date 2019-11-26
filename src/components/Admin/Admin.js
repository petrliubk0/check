import React from 'react';
import {observer, Provider} from "mobx-react";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import RouterStore from "../../components/routes/RouterStore";
import DefaultStore from "../stores/DefaultStore";
import AdministrationStore from "./Administration/AdministrationStore";

import WithRouterStore from "../../components/routes/withRouterStore";

import Administration from "./Administration/Administration";
import Reports from "./Reports/Reports";
import ReportsStore from "./Reports/ReportsStore";
import "../../i18n/i18n";
import Menu from "./Menu";


import {ADMIN_URL, REPORTS_ADMIN_URL} from "../../constants";

const stores = {RouterStore, AdministrationStore, ReportsStore};

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider {...stores}>
                <div className='admin'>
                    <Router>
                        <Menu/>
                        <Switch>
                            <Route exact path={ADMIN_URL} component={WithRouterStore(RouterStore)(Administration)}/>
                            <Route path={REPORTS_ADMIN_URL} component={WithRouterStore(RouterStore)(Reports)}/>
                            <Redirect to={ADMIN_URL} />
                        </Switch>
                    </Router>
                </div>
            </Provider>)
    }
}

export default Admin;