import React, { useState, Component, Fragment } from 'react';
import { login } from '../../actions/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';



/**
* @author
* @function Signin
**/

const Signin = (props) => {

    const [activeShow, setActiveShow] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();


    const clickActive = (e) => {
        document.querySelector(".nav-link").classList.remove('show');
        e.target.classList.add('show');
        setActiveShow(false);

    }

    const userLogin = (e) => {
        e.preventDefault();
        
        const user = {
            email, password
        }
        dispatch(login(user));
    }

    if(auth.authenticate) {
        return <Redirect to={`/dashboard`}/>
    }

  return(
    <div>
    <Fragment>
    <Tabs>
        <TabList className="nav nav-tabs tab-coupon" >
            <Link to="/signin" className="nav-link" onClick={(e) => clickActive(e)}>
                <Tab>
                    <User />
                    Login
                </Tab>
            </Link>
            <Link to="/signup" className="nav-link"  onClick={(e) => clickActive(e)}>
                <Tab>
                    <Unlock />
                    Register
                </Tab>
            </Link>
        </TabList>

        <TabPanel>
            <form className="form-horizontal auth-form" onSubmit={userLogin}>
                <div className="form-group">
                    <input required="" name="login[username]" value={email}  onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Username" id="exampleInputEmail1" />
                </div>
                <div className="form-group">
                    <input required="" name="login[password]" value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                </div>
                <div className="form-terms">
                    <div className="custom-control custom-checkbox mr-sm-2">
                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                        <label className="d-block">
                                    <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                        Remember Me <span className="pull-right"> <a href="/reset-password" className="btn btn-default forgot-pass p-0">Forgot your password</a></span>
                                </label>
                    </div>
                </div>
                <div className="form-button">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
        </TabPanel>
    </Tabs>
</Fragment>
</div>
)
}

export default Signin