import qrcode from 'qrcode-generator';
import Cookies from 'js-cookie';
import {COOKIE_KEY, DEFAULT_LOCALE, HOST} from "../constants";
import axios from 'axios';

export function getDataAttributes(node) {
    const attributes = [...node.attributes];
    let result = {};

    attributes.forEach(attr => {

       if(attr.name.startsWith('data-')) {
           let value, name = attr.name.replace('data-', '');
           try {
               value = JSON.parse(attr.value);
           } catch (e) {
               value = attr.value;
           }
           result[name] = value;
       }
    });

    return result;
}

function getLang() {
    return Cookies.get(COOKIE_KEY) || DEFAULT_LOCALE;
}


export function formatDate(string) {
    const options = {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        day: 'numeric', month: 'numeric', year: 'numeric', hour12: false
    }, lang = getLang();
    return new Intl.DateTimeFormat(lang, options).format(new Date(string)).replace(',', '');
}

export function alertErrors(Alert, t) {
        return function (errors) {
            if(errors) {
                errors.forEach(error => {
                    Alert.error(t(error));
                });
            }
        };
}


export function getErrors(e) {
    let errors = [],
        fields = [],
        canceled = false;
    if(axios.isCancel(e)) return {errors, fields, canceled: true};
    if(e.response.data.errors.main[0]) {
        errors.push(e.response.data.errors.main[0]);
    }
    if(e.response.data.errors.validation[0]) {
        e.response.data.errors.validation[0].forEach(error => {
            errors.push(`${error.field}.${error.msg}`);
            fields.push(error.field);
        });
    }
    return { errors, fields, canceled };
}



export function getQrCode(string) {
    const typeNumber = 0,
        errorCorrectionLevel = 'H',
        qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(string);
    qr.make();
    return qr.createSvgTag();
}

export function copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}


export function setDocumentTitle(page) {
 document.title = `${page} | ${HOST}`;
}


export function downloadFile(file_path) {
    let a = document.createElement('A');
    a.href = file_path;
    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
