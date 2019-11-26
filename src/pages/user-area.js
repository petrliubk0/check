import '../styles/main.scss';
import "../styles/user-area/main.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import UserArea from '../components/UserArea/UserArea';
import Menu from "./widgets/Menu";

ReactDOM.render(<UserArea/>, document.getElementById('user-area'));