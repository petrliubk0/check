import "../../styles/header.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import Lang from '../../components/Lang';
import LangStore from "../../components/stores/LangStore";
import "../../styles/notifications/main.scss";
import Notifications from "../../components/Notifications/Notifications";
import {getDataAttributes} from "../../utils/utils";

const notificationsNode = document.getElementById('notifications'),
    notificationsProps = getDataAttributes(notificationsNode);

ReactDOM.render(<Notifications {...notificationsProps} />, notificationsNode);
ReactDOM.render(<Lang reload LangStore={LangStore}/>, document.getElementById("lang"));