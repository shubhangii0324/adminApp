import React, {useState, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../actions';
import {
  IoIosAdd,
  IoIosTrash
} from 'react-icons/io';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';

/**
* @author
* @function Tabset_user
**/

const Tabset_user = (props) => {

    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);
  const createUser = useSelector(state => state.createUser);
  const dispatch = useDispatch();


  const handleClose = () => {

    const form = new FormData();
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('email', email);

    dispatch(addUser(form));
  }

  return (
    <Fragment>
        <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link">Account</Tab>
                    </TabList>
                    <TabPanel>
                        <form className="needs-validation user-add" noValidate="" onSubmit={handleClose}>
                            <h4>Account Details</h4>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> First Name</label>
                                <input className="form-control col-xl-8 col-md-7" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="validationCustom0" type="text" required="" />
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Last Name</label>
                                <input className="form-control col-xl-8 col-md-7" value={lastName} onChange={(e) => setLastName(e.target.value)} id="validationCustom1" type="text" required="" />
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Email</label>
                                <input className="form-control col-xl-8 col-md-7" value={email} onChange={(e) => setEmail(e.target.value)} id="validationCustom2" type="text" required="" />
                            </div>
                        </form>
                    </TabPanel>
                </Tabs>
                <div className="pull-right">
                    <button type="button" className="btn btn-primary" onClick={handleClose}>Save</button>
                </div>
      </Fragment>
  )

 }

export default Tabset_user