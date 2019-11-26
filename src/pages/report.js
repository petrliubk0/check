import ReactDOM from 'react-dom';
import React from 'react';
import "../styles/main.scss";
import "../styles/report.scss";
import Report from "../components/Report/Report";
import ReportStore from  "../components/Report/ReportStore";
import {getDataAttributes} from "../utils/utils";
import $ from 'jquery';
import boostrap from 'bootstrap';

const element = document.getElementById("report"),
    props = getDataAttributes(element);
let store = new ReportStore(props.token);

ReactDOM.render(<Report ReportStore={store}/>, element);
