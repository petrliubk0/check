import '../styles/main.scss';
import '../styles/api-doc.scss';
import React from 'react';
import $ from 'jquery';
import boostrap from 'bootstrap';
import ReactDOM from 'react-dom';
import ApiResource from '../components/ApiDocItem/ApiResouce';
import {
    GET_PAYMENTS_DOC_ITEM,
    GET_PAYMENT_DOC_ITEM,
    CREATE_PAYMENT_DOC_ITEM,
    GET_REPORTS_DOC_ITEM,
    GET_REPORT_DOC_ITEM,
    CREATE_REPORT_DOC_ITEM,
    GET_CURRENT_PRICES_DOC_ITEM,
    GET_BALANCE_DOC_ITEM

} from "../components/ApiDocItem/Route";

let element = document.getElementById("apidoc-items-app-container");


const App = () => {
    return (
        <React.Fragment>
            <ApiResource id="reports-resource" title="Reports resource" items={[
                GET_REPORTS_DOC_ITEM,
                GET_REPORT_DOC_ITEM,
                CREATE_REPORT_DOC_ITEM
            ]} />
            <ApiResource id="payments-resource" title="Ресурс Payments" items={[
                GET_PAYMENTS_DOC_ITEM,
                GET_PAYMENT_DOC_ITEM,
                CREATE_PAYMENT_DOC_ITEM]} 
            />
            <ApiResource id="other-resource" title="Другие ресурсы" items={[
                GET_BALANCE_DOC_ITEM,
                GET_CURRENT_PRICES_DOC_ITEM
            ]} />
        </React.Fragment>
    );
};

ReactDOM.render(<App/>, element);