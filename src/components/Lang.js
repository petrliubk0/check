import {observer} from "mobx-react";
import React from "react";
import {LOCALES} from "../constants";
import cn from 'classnames';

class Lang extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    changeLang(lang) {
        const self = this;
        return function () {
            const {LangStore, reload} = self.props;
            if (LangStore.lang === lang) return;
            LangStore.setLang(lang);
            if (reload) setTimeout(() => {
                location.reload();
            }, 1000);
        }

    }

    render() {
        const {LangStore} = this.props;
        return (
            <div className="switchToggle">
                    <div className="dropdown">
                        <button className="btn btn-outline-info  btn-blue dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {LangStore.lang}
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">

                            {LOCALES.map(i => <span key={i} onClick={this.changeLang.bind(this)(i)} className={cn("dropdown-item", {active: LangStore.lang === i})}>{i}</span>)}
                        </div>
                    </div>
            </div>
        );
    }
}

export default observer(Lang);
