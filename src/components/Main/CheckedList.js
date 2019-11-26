import React from 'react';
import {observer, inject } from 'mobx-react';
import { withTranslation } from 'react-i18next';


class CheckedList extends React.Component {
    constructor(props)  {
        super(props);
    }


    toggleAll() {
        const { CheckedListStore } =  this.props;
        CheckedListStore.toggleAll();


    }
    toggle(item) {
        const { CheckedListStore } = this.props;
        return function () {
            CheckedListStore.toggle(item);
        }
    }

    render() {
        const {t } = this.props,
             { list, checkedAll } = this.props.CheckedListStore;
        return(
            <div className="antivirus">
                <ul>
                    <li onClick={this.toggleAll.bind(this)}>
                        <div  className="custom-control custom-checkbox">
                            <input readOnly type="checkbox" checked={checkedAll} className="custom-control-input" id="customCheck-all"/>
                            <label className="custom-control-label" htmlFor="customCheck-all">{t("all")}</label>
                        </div>
                    </li>
                    {list.map(item => <li onClick={this.toggle(item).bind(this)}  key={item.id}>
                        <div className="custom-control custom-checkbox">
                            <input readOnly type="checkbox" className="custom-control-input" checked={item.checked} id={"customCheck-" + item.name}/>
                            <label className="custom-control-label" htmlFor={"customCheck-" + item.name}>{item.name}</label>
                        </div>

                    </li>)}

                </ul>
            </div>);
    }
}

export default withTranslation("root")(inject('CheckedListStore')(observer(CheckedList)));