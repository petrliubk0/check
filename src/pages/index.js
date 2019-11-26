import '../styles/main.scss';
import "../styles/index.scss";
import React from 'react';
import $ from 'jquery';
import boostrap from 'bootstrap'
import "../i18n/i18n";
import { getDataAttributes } from "../utils/utils";
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import DropFileStore from "../components/Main/stores/DropFIleStore";
import CheckedListStore from "../components/Main/stores/CheckedListStore";
import AutoReportStore from "../components/Main/stores/AutoReportStore";
import MainStore from "../components/Main/stores/MainStore";
import DropFile from "../components/Main/DropFile";
import AutoReport from "../components/Main/AutoReport";
import CheckedList from "../components/Main/CheckedList";
import Send from "../components/Main/Send";
import cn from "classnames";
import { observer } from 'mobx-react';
import Loader from "../components/loaders/Loader";

const element = document.getElementById("main"),
    props = getDataAttributes(element),
    checkedListStore = new CheckedListStore(props.antivirus),
    mainStore = new MainStore(checkedListStore, AutoReportStore, DropFileStore, props.user),
    stores = {MainStore: mainStore, CheckedListStore: checkedListStore, DropFileStore, AutoReportStore};


class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider {...stores}>
                <div>
                    {mainStore.load && <Loader width="200" hright="200" className="root-loader" />}
                    <div  className={cn({load: mainStore.load})}>
                        <DropFile/>
                        <CheckedList/>
                        <AutoReport/>
                        <Send/>
                    </div>
                </div>
            </Provider>
        )
    }
}
App = observer(App);

ReactDOM.render(<App/>, element);


