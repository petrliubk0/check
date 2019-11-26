import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import Cookies from 'js-cookie';



import mainEn from "./main/en";
import mainRu from "./main/ru";

import apidocEn from "./apidoc/en";
import apidocRu from "./apidoc/ru";

import authEn from "./auth/en";
import authRu from "./auth/ru";

import rootEn from "./root/en";
import rootRu from "./root/ru";

import reportEn from "./report/en";
import reportRu from "./report/ru";

import userAreaEn from "./user_area/en";
import userAreaRu from "./user_area/ru";

import adminEn from "./admin/en";
import adminRu from "./admin/ru";

import tableEn from "./table/en";
import tableRu from "./table/ru";

import {COOKIE_KEY, DEFAULT_LOCALE} from "../constants";

const resources = {
    en: {
        main: mainEn,
        apidoc: apidocEn,
        auth: authEn,
        root: rootEn,
        report: reportEn,
        userArea: userAreaEn,
        admin: adminEn,
        table: tableEn
    },
    ru: {
        main: mainRu,
        apidoc: apidocRu,
        auth: authRu,
        root: rootRu,
        report: reportRu,
        userArea: userAreaRu,
        admin: adminRu,
        table: tableRu
    }
};


let locale = Cookies.get(COOKIE_KEY) || DEFAULT_LOCALE;
i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: locale,
        defaultNS: "main",

        // keySeparator: false, // we do not use keys in form messages.welcome  -- почаклуй

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });


export default i18next;
