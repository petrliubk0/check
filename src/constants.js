export const RU_NAME = 'ru',
             EN_NAME = 'en',
             COOKIE_KEY = 'lang',
             DEFAULT_LOCALE = EN_NAME,
             LOCALES = [RU_NAME, EN_NAME];

export const USER_AREA_URL = '/user-area',
    DASHBOARD_URL = USER_AREA_URL + '/dashboard',
    PAYMENTS_URL = USER_AREA_URL + '/payments',
    PAIMENTS_PAY_URL = PAYMENTS_URL + '/pay',
    REPOPRTS_URL = USER_AREA_URL + '/reports';

export const ADMIN_URL = '/admin',
    REPORTS_ADMIN_URL = ADMIN_URL + '/reports';


export const
    API_URL = '/api/v1',
    LOGIN_URL = '/auth/login',
    CHECK_FILE_URL = API_URL + '/reports/',
    REGISTRATION_URL = '/auth/register',
    USER_INFO_URL =  API_URL + '/user/info',
    PAID_TRIGGER = API_URL + '/payments/paid_trigger/',
    BALANCE_URL = API_URL + '/balance',
    RESET_API_TOKEN_URL = API_URL + '/user/reset_api_token',
    ALL_PAYMENTS_URL = API_URL + '/payments/?status=all',
    PAYMENT_URL = API_URL + '/payments/',
    REFILL_TOKEN_URL = API_URL + '/payments/refill_token',
    CAPTCHA = '/auth/captcha';

export const
    API_ADMIN_URL = API_URL + '/admin',
    API_ADMIN_PAYMENTS_URL = API_ADMIN_URL + '/payments',
    API_ADMIN_REPORTS_URL = API_ADMIN_URL + '/reports',

    API_ADMIN_STATS_URL = API_ADMIN_URL + '/stats',

    API_ADMIN_CREATE_REFILL_TOKEN_URL = API_ADMIN_URL + '/refill_token',

    API_ADMIN_CREATE_PAYMENT_CSV_URL = API_ADMIN_URL + '/payments-csv',
    API_ADMIN_CREATE_REPORTS_CSV_URL = API_ADMIN_URL + '/reports-csv';

export const
    API_NOTIFICATIONS = API_URL + '/notifications',
    API_NOTIFICATIONS_COUNTER = API_NOTIFICATIONS + '/counter',
    API_NOTIFICATIONS_MARK_READ = API_NOTIFICATIONS + '/mark_read';

export const
    HOST = 'Av-check';

export const
    REPORT_URL = '/report/';


export const DEFAULT_LIMIT_TABLE_OFFSET = 10;

export const FLOAT_REGEXP = new RegExp('^[+-]?([0-9]+([.][0-9]{0,2})?)$');