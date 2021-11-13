import React from 'react';
import classNames from 'classnames';
import AppBreadcrumb from './AppBreadcrumb';
import Login from '../src/pages/Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
const AppTopbar = (props) => {

    const notificationsItemClassName = classNames('notifications-item', { 'active-menuitem': props.topbarNotificationMenuActive });
    const profileItemClassName = classNames('profile-item', { 'active-menuitem fadeInDown': props.topbarUserMenuActive });

    return (
        <div className="layout-topbar">
            <div className="topbar-left">
                <button type="button" className="menu-button p-link" onClick={props.onMenuButtonClick}>
                    <i className="pi pi-chevron-left"></i>
                </button>
                <span className="topbar-separator"></span>

                <div className="layout-breadcrumb viewname" style={{ textTransform: 'uppercase' }}>
                    <AppBreadcrumb routers={props.routers} />
                </div>
               
            </div>

            <div className="topbar-right">
                <ul className="topbar-menu">
                    


                 
                 <li className={profileItemClassName}>
                        <button type="button" className="p-link" onClick={props.onTopbarUserMenu}>
                        <img src="https://img.icons8.com/office/30/000000/user.png"/>                            <span className="profile-name">NombreUser01</span>
                        </button>
                        <ul className="profile-menu fade-in-up">
                            
                            <li>
                                <button type="button" className="p-link">
                                    <i className="pi pi-power-off"></i>
                                    <Link to="/login">
                                    <span>Cerrar sesión</span>
                                    </Link>
                                </button>
                            </li>
                        </ul>
                    </li>
                 
                 
               
                </ul>
            </div>
        </div>
    );
}

export default AppTopbar;
