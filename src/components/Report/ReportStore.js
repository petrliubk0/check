import {observable, computed, decorate} from 'mobx';
import { report } from "../../utils/request.api";
import {HOST} from "../../constants";

class ReportStore {
    constructor(token) {
        this.token = token;
        this.report = null;
        report(this.token).then(resp => {
            this.setReport(resp);
            this.run();
        });
    }

    getReport() {
        report(this.token).then(this.setReport.bind(this));
    }

    setReport(resp) {
        const result = resp.data.result;
        this.link = `${HOST}/report/${result.id}`;
        this.report = result;
        this.file = result.file.name;
        this.md5 = this.report.file.md5sum;
        this.sha1 = this.report.file.sha1sum;
        this.created = this.report.created;
        this.updated = this.report.updated;
        this.avResult = this.report.results.sort((i, j) => i.av_name.localeCompare(j.av_name));
        this.checked = { check: this.avResult.filter(i => i.status !== "pending").length, all: this.avResult.length };
        if(this.checked.check === this.checked.all) this.stop();
    }

    get signatureIsEmpty() {
        return this.avResult && !this.avResult.filter(av => av.signature).length;
    }

    run() {
        this.interval = setInterval(() => {
            this.getReport();
        }, 3000);
    }

    stop() {
        clearInterval(this.interval);
    }

}



decorate(ReportStore, {
    report: observable,
    file: observable,
    sha1: observable,
    avResult: observable,
    checked: observable,
    link: observable,
    signatureIsEmpty: computed
});

export default ReportStore;