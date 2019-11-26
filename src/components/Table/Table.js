import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import "./Table.scss";
import PropTypes from "prop-types";
import cn from 'classnames';
import {withTranslation} from "react-i18next";


class Table extends React.Component {

    render() {
        const { data, columns, t, updateData, of} = this.props;
        return (
            <div className="react-table">
                <ReactTable sortable={false}
                            showPageSizeOptions={false}
                            showPagination={false}
                            defaultPageSize={-1}
                            pageSize={data.length}
                            showPageJump={false}
                            columns={columns}
                            data={data}/>
                {updateData && <div className="show-more">
                    <span>{t('show-of', {count: data.length, of})}</span>
                    <button
                        onClick={() => {
                            updateData();
                        }}
                        className={cn("btn btn btn-outline-info  btn-blue")}>
                        {t('show-more')}
                    </button>
                </div>}

            </div>)

    }
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
};


export default withTranslation()(Table);