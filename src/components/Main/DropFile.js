import React from 'react';
import {observer, inject} from 'mobx-react';
import { withTranslation } from 'react-i18next';


class DropFile extends React.Component {
    constructor()  {
        super();
    }

    readFile(event) {
        const {DropFileStore} = this.props;
        DropFileStore.addFile(event.target.files[0]);
    }

    renderPlus() {
        const {t} = this.props;
        const { fileName } = this.props.DropFileStore;
        return (
            fileName?
                <div className="file-name">
                    <span>{t('file-name')}</span>
                    <span>{fileName}</span>
                </div>:
            <div className="plus"></div>
        );
    }

    renderLabel() {
        const {t} = this.props;
        const { fileName } = this.props.DropFileStore;
        return (fileName?<button className="btn  btn-green">{t('choose-another-file')}</button>: <p>{t('drag-file')}</p>);
    }


    render() {
        return(<div>
            <div className="drop-file">
                {this.renderPlus()}
                <input onChange={this.readFile.bind(this)} className="inputfile" type="file" id="check-file" name="check-file"/>
                {this.renderLabel()}
            </div>

        </div>);
    }
}

export default withTranslation("root")(inject('DropFileStore')(observer(DropFile)));