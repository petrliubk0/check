import React from 'react';
import {observer, inject} from 'mobx-react';
import { withTranslation } from 'react-i18next';
import cn from "classnames";


class AutoReport extends React.Component {
    constructor() {
        super();
    }

    toggle(event) {
        const { AutoReportStore } = this.props;
        AutoReportStore.setActive(event.target.checked);
    }
    firstOperationToggle(event) {
        const { AutoReportStore } = this.props;
        AutoReportStore.setFirstOperation(event.target.checked);
    }

    valueChange(event) {
        const { AutoReportStore } = this.props;
        AutoReportStore.setValue(event.target.value);
    }
    render() {
        const { active, min, max, value, defaultValue, firstOperation } = this.props.AutoReportStore;
        const {t, MainStore} = this.props;
        let rangeClassName = "hour-range" + (active? "": "  d-none");
        return(<div>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" onChange={this.toggle.bind(this)}  checked={active} className="custom-control-input" id="auto-report"/>
                <label className="custom-control-label" htmlFor="auto-report">{t('auto-update-report')}</label>
            </div>
            <div className={cn('auto-report-info', {"d-none": !active})}>
                <p>{t('auto-report-info')}</p>
            </div>
            <div className={rangeClassName}>
                <label htmlFor="customRange2">{t('period-update', {value})}</label>
                <input type="range" onChange={this.valueChange.bind(this)} defaultValue={defaultValue} className="custom-range" min={min} max={max} id="customRange2"/>
                <span className="start">{min} {t('hour')}</span>
                <span className="end">{max} {t('hours')}</span>
            </div>
            <div className={cn('custom-control', 'custom-checkbox', 'first-operation', rangeClassName)}>
                <input type="checkbox" onChange={this.firstOperationToggle.bind(this)}  checked={firstOperation} className="custom-control-input" id="first-operation"/>
                <label className="custom-control-label" htmlFor="first-operation">{t('first-operation')}</label>
            </div>
            <div  className={cn("notLogin", {show: !MainStore.userLogin})}>
                <p>{t('function-disabled')}</p>
                <div className="links">
                    <a href="/login">{t('main:login')}</a> / <a href="/registration">{t('main:registration')}</a>
                </div>
            </div>
        </div>);
    }
}

export default withTranslation(["root", "main"])(inject('AutoReportStore', 'MainStore')(observer(AutoReport)));