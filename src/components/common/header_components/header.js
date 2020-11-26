import React, { Component,Fragment, useState } from 'react';
import Notification from './notification';
import Login from '../../Login/Login'
import User_menu from './user-menu';
import { useSelector, useDispatch } from 'react-redux';
import { AlignLeft, Maximize2, Bell, MoreHorizontal } from 'react-feather';
import { signout } from '../../../actions';
import { NavLink, Link } from 'react-router-dom';
//images

/**
* @author
* @function Header
**/

const Header = (props) => {
    const auth = useSelector(state => state.auth);
    const [sidebar, setSidebar] = useState(true);
    const [rightSidebar, setRightSidebar] = useState(true);
    const [navMenus, setNavMenus] = useState(false);
    const dispatch = useDispatch();

    const toggle = () => {
        setNavMenus(navMenus => ({
            navMenus: !navMenus
        }));
    }

    const showRightSidebar = () => {
        if (setRightSidebar) {
            setRightSidebar({ rightSidebar: false })
            document.querySelector(".right-sidebar").classList.add('show');
        } else {
            setRightSidebar({ rightSidebar: true })
            document.querySelector(".right-sidebar").classList.remove('show');
        }
    }

    const goFull = () => {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    const openCloseSidebar = () => {
        if (sidebar) {
            setSidebar({ sidebar: false })
            document.querySelector(".page-main-header").classList.add('open');
            document.querySelector(".page-sidebar").classList.add('open');
        } else {
            setSidebar({ sidebar: true })
            document.querySelector(".page-main-header").classList.remove('open');
            document.querySelector(".page-sidebar").classList.remove('open');
        }
    }

    const logout = () => {
        dispatch(signout());
    }

    const renderLoggedInLinks = () => {
        return (
            <div className="nav-right col">
            <ul className={"nav-menus " + (navMenus ? 'open' : '')}>
                <li><a onClick={goFull} className="text-dark" href="#!"><Maximize2 /></a></li>

                <li className="onhover-dropdown"><Bell /><span className="badge badge-pill badge-primary pull-right notification-badge">3</span><span className="dot"></span>
                    <Notification />
                </li>
                <User_menu />
                <li className="nav-item">
                    <NavLink to="signin" className="nav-link" onClick={logout} >Signout</NavLink>
                </li>
            </ul>
            <div className="d-lg-none mobile-toggle pull-right" onClick={() => toggle}><MoreHorizontal /></div>
        </div>
        );
    }

    const renderNonLoggedInLinks = () => {
        return (
            
            <div className="nav-right col">
            <ul className={"nav-menus " + (navMenus ? 'open' : '')}>
                <li><a onClick={goFull} className="text-dark" href="#!"><Maximize2 /></a></li>

                <li className="onhover-dropdown"><Bell /><span className="badge badge-pill badge-primary pull-right notification-badge">3</span><span className="dot"></span>
                    <Notification />
                </li>
                <User_menu />
                <li className="nav-item">
                    <NavLink to="signin" className="nav-link" >Login</NavLink>
                </li>
            </ul>
            <div className="d-lg-none mobile-toggle pull-right" onClick={() => toggle}><MoreHorizontal /></div>
        </div>

        );
    }


  return(
    <Fragment>
    {/* open */}
    <div className="page-main-header ">
        <div className="main-header-right row">
            <div className="main-header-left d-lg-none" >
                <div className="logo-wrapper">
                    <a href="index.html">
                        <img className="blur-up lazyloaded" src="" alt="" />
                    </a>
                </div>
            </div>
            <div className="mobile-sidebar">
                <div className="media-body text-right switch-sm">
                    <label className="switch"><a onClick={openCloseSidebar}><AlignLeft /></a></label>
                </div>
            </div>
            {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </div>
    </div>
</Fragment>
   )

 }

export default Header
    

