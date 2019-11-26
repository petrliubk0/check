import {observable, computed, action, decorate } from 'mobx';
import { reports } from "../../../utils/request.api";
import {formatDate} from "../../../utils/utils";
import React from "react";



class ReportsStore {

    constructor() {
        this.reports = [];
        this.total = 0;
        this.load = true;
        this.updateReports();
    }

    generateColumns(t) {
        return [{
            Header: t('name'),
            accessor: 'file.name'
        }, {
            Header: t('size'),
            accessor: 'file.size'
        },
            {
                Header: t('md5'),
                accessor: 'file.md5sum'
            }, {
                Header: t('upload_date'),
                accessor: 'created',
                Cell: row => formatDate(row.value)
            }, {
                Header: t('report'),
                accessor: 'id',
                Cell: row => {
                    return(
                        <a target="_blank" href={'/report/' + row.value}>{t('watch_report')}</a>
                    )
                }
            }];
    }

    get offset() {
        return this.reports.length;
    }

    updateReports() {
        reports(this.offset).then(res => {
            let {items, total} = res.data.result;
            this.reports = this.reports.concat(items);
            this.total = total;
            this.load = false;
        }).catch(e => {
            this.load = false;
        })
    }
}


decorate(ReportsStore, {
    reports: observable,
    total: observable,
    offset: computed,
    generateColumns: action
});

export default new ReportsStore();