import React from 'react';
import {inject, observer} from 'mobx-react';
import Alert from "../../components/Alert";
import {withTranslation} from "react-i18next";
import i18n from "../../i18n/i18n";
import {alertErrors} from "../../utils/utils";
import cn from 'classnames';
import Loader from "../loaders/Loader";
import {formatDate} from "../../utils/utils";
import {copyToClipboard} from "../../utils/utils";
import {setDocumentTitle} from "../../utils/utils";

class Report extends React.Component {

    setDocumentTitle(file) {
        const { t } = this.props;
        if(file) {
            setDocumentTitle(t('report', {file}))
        }
    }


    render() {
        const {t} = this.props;
        const {report, file, created, sha1, md5, checked, updated, avResult, signatureIsEmpty, link} = this.props.ReportStore;
        this.setDocumentTitle(file);
        if (!report)
            return (<div className="report">
                <Loader/>
            </div>);
        return (

            <div>
                <div className="app-title">
                    <h1 className="text-center">
                        {t('report', {file})}
                        <div onClick={() => copyToClipboard(link)} className="link"></div>
                    </h1>
                </div>
                <div className="report">
                    {/*<div className="file">*/}
                        {/*<span>{t('file')}: </span> <span>{file}</span>*/}
                    {/*</div>*/}
                    {created &&
                    <div className="uploaded">
                        <span className="uploaded">{t('uploaded')}</span> <span>{formatDate(created)}</span>
                    </div>}
                    <div className="hash">
                        <span className="sha">SHA1:</span> {sha1 && <span>{sha1}</span> ||
                    <span>{t('calculating')}..</span>}
                    </div>
                    <div className="md5">
                        <span className="md5">MD5:</span> {md5 && <span>{md5}</span> ||
                    <span>{t('calculating')}..</span>}
                    </div>
                    {checked &&
                    <div className="checked">
                        <span>{t('checked')}:</span> <span>{checked.check} / {checked.all}</span>
                    </div>}
                    {updated &&
                    <div className="updated">
                        <span>{t('last_updated')}:</span> <span>{updated}</span>
                    </div>}
                    {avResult &&
                    <div className="av_list">
                        <table>
                            <thead>
                            <tr>
                                <td>{t('av_name')}</td>
                                <td> {t('av_status')}</td>
                                {!signatureIsEmpty && <td> {t('av_signature')}</td>}
                            </tr>
                            </thead>
                            <tbody>
                            {avResult.map(av => (
                                <tr key={av.av_id}>
                                    <td>{av.av_name}</td>
                                    <td>{t(`table:${av.status}`)}</td>
                                    {!signatureIsEmpty && <td className="signature">{av.signature}</td>}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>}
                </div>

            </div>
        );
    }
}


export default withTranslation(["report", "table"])(observer(Report));