import React from 'react';
export default (props) => {
        let listOptions = [10, 20, 30, 50];
        return (<div className="pay-options">
            {listOptions.map(opt => <div key={opt} onClick={() => {
                props.check({target: {value: opt}})
            }} className="option btn btn-green">{opt}$</div>)}
        </div>);
    };
