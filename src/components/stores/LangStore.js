import { observable, action, computed, decorate } from "mobx";
import Cookies from 'js-cookie';
import {COOKIE_KEY, DEFAULT_LOCALE, LOCALES } from "../../constants";
import i18n from "../../i18n/i18n";

class LangStore { // mobx store for choose language

    constructor() {
        this.lang =  this._getFromCookies();
        i18n.changeLanguage(this.lang);
    }

    _validation(value) {
        if(LOCALES.includes(value)) return value;
        console.warn(`Locale ${value} not allowed`);
        return DEFAULT_LOCALE;
    }

    _getFromCookies() {
        return Cookies.get(COOKIE_KEY) || DEFAULT_LOCALE;
    }

    _setToCookies(value) {
        Cookies.set(COOKIE_KEY, value);
    }

    setLang(value) {
        let lang = this._validation(value);
        this._setToCookies(lang);
        this.lang = lang;
        i18n.changeLanguage(this.lang);
    }

}
decorate(LangStore, {
    lang: observable,
    setLang: action
})


export default new LangStore();