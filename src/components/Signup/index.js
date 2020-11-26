import React, { useState, Component, Fragment } from 'react';
import { Container, Form, Row, Col, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../actions/user.actions';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter, Link } from 'react-router-dom';

/**
* @author
* @function Signup 
**/

const Signup = (props) => {
    const [activeShow, setActiveShow] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const clickActive = (e) => {
        document.querySelector(".nav-link").classList.remove('show');
        e.target.classList.add('show');
        setActiveShow(true);
    }

    const userSignup = (e) => {

        e.preventDefault();
        
        const user = {
            firstName, lastName, email, password
        }

        dispatch(signup(user));
    }

    if(auth.authenticate) {
        return <Redirect to={`/dashboard`}/>
    } 

    if(user.loading) {
        return <p>Loading...</p>
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
        <Link to="/signup" className="nav-link" onClick={(e) => clickActive(e)}>
                <Tab>
                    <Unlock />
                    Register
                </Tab>
            </Link>
        </TabList>

        <TabPanel>
            <form className="form-horizontal auth-form" onSubmit={userSignup}>
                <div className="form-group">
                    <input required="" name="login[username]" value={firstName}  onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" placeholder="FirstName" id="exampleInputEmail1" />
                </div>
                <div className="form-group">
                    <input required="" name="login[username]" value={lastName}  onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" placeholder="LastName" id="exampleInputEmail1" />
                </div>
                <div className="form-group">
                    <input required="" name="login[username]" value={email}  onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="email" id="exampleInputEmail1" />
                </div>
                <div className="form-group">
                    <input required="" name="login[password]" value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                </div>
                <div className="form-terms">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                        <label className="d-block">
                                            <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                            I agree to all the <span><a href="">Terms &amp; Conditions</a></span>
                                        </label>
                                    </div>
                                </div>
                <div className="form-button">
                        <button className="btn btn-primary" type="submit">Register</button>
                </div>
            </form>
        </TabPanel>
    </Tabs>
</Fragment>
      </div>
   )

 }

export default Signup