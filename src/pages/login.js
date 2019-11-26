import '../styles/main.scss';
import "../styles/login.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import $ from 'jquery';
import "../i18n/i18n";
import { withTranslation } from 'react-i18next';
import boostrap from 'bootstrap';
import Login from '../components/Login/Login';

ReactDOM.render(<Login/>, document.getElementById('login'));