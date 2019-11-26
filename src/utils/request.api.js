import axios from "./axios";
import { LOGIN_URL, CHECK_FILE_URL, REGISTRATION_URL, USER_INFO_URL, BALANCE_URL, RESET_API_TOKEN_URL,
    ALL_PAYMENTS_URL, PAYMENT_URL, REFILL_TOKEN_URL, CAPTCHA, API_ADMIN_REPORTS_URL, API_ADMIN_PAYMENTS_URL,
    API_ADMIN_STATS_URL, API_ADMIN_CREATE_REFILL_TOKEN_URL, API_ADMIN_CREATE_PAYMENT_CSV_URL,
    API_ADMIN_CREATE_REPORTS_CSV_URL, API_NOTIFICATIONS, API_NOTIFICATIONS_COUNTER, API_NOTIFICATIONS_MARK_READ, PAID_TRIGGER, DEFAULT_LIMIT_TABLE_OFFSET} from "../constants";


export function registration(username, contact, contact_type, captchaKey, captcha) {
    return  axios.post(REGISTRATION_URL, { username, contact, contact_type, captchaKey, captcha});
}

export function login(token, captcha, captchaKey) {
    return axios.post(LOGIN_URL, { token, captcha, captchaKey });
}

export function userInfo() {
    return axios.get(USER_INFO_URL);
}

export function balance() {
    return axios.get(BALANCE_URL);
}

export function allPayments(offset=0, limit=DEFAULT_LIMIT_TABLE_OFFSET) {
    return axios.get(ALL_PAYMENTS_URL + `&limit=${limit}&offset=${offset}`);
}

export function getPayment(id) {
    return axios.get(PAYMENT_URL + id);
}

export function createPayment(amount_usd) {
    return axios.post(PAYMENT_URL, {amount_usd});
}

export function useRefillToken(token) {
    return axios.post(REFILL_TOKEN_URL, {token})
}

export function resetApiToken() {
    return axios.post(RESET_API_TOKEN_URL);
}

export function report(token) {
    return axios.get(CHECK_FILE_URL + token);
}

export function reports(offset=0, limit=DEFAULT_LIMIT_TABLE_OFFSET) {
    return axios.get(`${CHECK_FILE_URL}?limit=${limit}&offset=${offset}`);
}

export function checkFile(file, avList, periodUpdate, firstOperation) {
    let form = new FormData();
    form.append('file', file);
    form.append('av_list', avList.join(','));
    form.append('period_update', periodUpdate);
    form.append('first_operation', firstOperation);
    return axios.post(CHECK_FILE_URL, form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export function getCaptcha() {
    return axios.get(CAPTCHA);
}

export function reportsAdmin(offset=0, limit=DEFAULT_LIMIT_TABLE_OFFSET) {
    return axios.get(`${API_ADMIN_REPORTS_URL}?limit=${limit}&offset=${offset}`);
}

export function paymentsAdmin(offset=0, limit=DEFAULT_LIMIT_TABLE_OFFSET) {
    return axios.get(`${API_ADMIN_PAYMENTS_URL}?limit=${limit}&offset=${offset}`);
}

export function statsAdmin() {
    return axios.get(API_ADMIN_STATS_URL);
}

export function createRefillToken(amount_usd) {
    return axios.post(API_ADMIN_CREATE_REFILL_TOKEN_URL, {amount_usd});
}

export function createPaymentsCsv() {
    return axios.post(API_ADMIN_CREATE_PAYMENT_CSV_URL, {});
}

export function createReportsCsv() {
    return axios.post(API_ADMIN_CREATE_REPORTS_CSV_URL, {});
}

export function notifications(from) {
    const url = from ? `${API_NOTIFICATIONS}/?from=${from}` : API_NOTIFICATIONS;
    return axios.get(url);
}

export function notificationsCounter() {
    return axios.get(API_NOTIFICATIONS_COUNTER);
}

export function markReadNotifications(from, to) {
    if(from && from === to) {
        to++;
    }
    return axios.post(API_NOTIFICATIONS_MARK_READ, {from, to});
}

export function paidTrigger(id) {
    return axios.post(`${PAID_TRIGGER}${id}`);
}