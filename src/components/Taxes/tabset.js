import React, {useState, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaxes } from '../../actions';
import {
  IoIosAdd,
  IoIosTrash
} from 'react-icons/io';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';

/**
* @author
* @function Tabset
**/

const Tabset = (props) => {

  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [show, setShow] = useState(false);
  const [couponDetailsModal, setCouponDetailsModal] = useState(false);
  const [couponDetails, setCouponDetails] = useState(null);
  const category = useSelector(state => state.category);
  const tax = useSelector(state => state.tax);
  const dispatch = useDispatch();

  const handleClose = () => {

    const form = new FormData();
    form.append('name', name);
    form.append('rate', rate);
    form.append('price', price);
    form.append('categoryId', categoryId);

    dispatch(addTaxes(form))


  }

  const createCategoryList = (categories, options = []) => {

    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }

    return options;
  }



  return (
    <Fragment>
        <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link">Account</Tab>
                    </TabList>
                    <TabPanel>
                        <form className="needs-validation user-add" noValidate="">
                            <h4>Tax Details</h4>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Name</label>
                                <input className="form-control col-xl-8 col-md-7" value={name} onChange={(e) => setName(e.target.value)} id="validationCustom0" type="text" required="" />
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Rate</label>
                                <input className="form-control col-xl-8 col-md-7" value={rate} onChange={(e) => setRate(e.target.value)} id="validationCustom1" type="text" required="" />
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4"><span>*</span> Price</label>
                                <input className="form-control col-xl-8 col-md-7" value={price} onChange={(e) => setPrice(e.target.value)} id="validationCustom2" type="text" required="" />
                            </div>
                            <div className="form-group row">
                                                    <label className="col-xl-3 col-md-4">Category :</label>
                                                    <div className="col-xl-8 col-sm-7">
                                                    <select
                                                        className="form-control"
                                                        value={categoryId}
                                                        onChange={(e) => setCategoryId(e.target.value)}>
                                                        <option>select category</option>
                                                        {
                                                            createCategoryList(category.categories).map(option =>
                                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                                        }
                                                    </select>
                                                    </div>
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

export default Tabset