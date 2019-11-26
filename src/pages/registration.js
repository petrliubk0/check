import '../styles/main.scss';
import "../styles/registration.scss";
import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import boostrap from 'bootstrap';

import RegistrationStore from "../components/Registration/RegistrationStore";
import Registration from "../components/Registration/Registration";

ReactDOM.render(<Registration RegistrationStore={RegistrationStore} />, document.getElementById('registration'));