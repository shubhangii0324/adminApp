import React, { useState, Fragment } from 'react';
import { login } from '../../actions/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';



/**
* @author
* @function PasswordReset
**/

const PasswordReset = (props) => {

    const [email, setEmail] = useState('');
    const auth = useSelector(state => state.auth);




    const userReset = (e) => {
        e.preventDefault();
    }
  return(
    <div>
    <Fragment>
    <Tabs>

        <TabPanel>
            <form className="form-horizontal auth-form" onSubmit={userReset} >
                <div className="form-group">
                    <input required="" name="login[username]" value={email}  onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Username" id="exampleInputEmail1" />
                </div>
                <div className="form-button">
                    <button className="btn btn-primary" type="submit">Reset Password</button>
                </div>
            </form>
        </TabPanel>
    </Tabs>
</Fragment>
</div>
)
}

export default PasswordReset