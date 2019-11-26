import React from  'react';
export default (props) => {return (
    <select  {...props}>
        {props.options.map(option => <option key={option.value} value={option.value}>{option.view}</option>)}
    </select>
)}