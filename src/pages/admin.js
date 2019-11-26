import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/main.scss';
import "../styles/header.scss";
import "../styles/admin.scss";
import Admin from "../components/Admin/Admin";
import $ from 'jquery';
import boostrap from 'bootstrap'

ReactDOM.render(<Admin/>, document.getElementById('admin'));