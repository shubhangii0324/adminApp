import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import { Table, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Modal from '../UI/Modal';

/**
* @author
* @function ListUser
**/

const ListUser = (props) => {

    const createUser = useSelector(state => state.createUser);
    const [show, setShow] = useState(false);
    const [userDetailModal, setUserDetailModal] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const handleCloseUserDetailsModal = () => {
        setUserDetailModal(false);
      }
      
      const showUserDetailsModal = (user) => {
        setUserDetails(user);
        setUserDetailModal(true);
      }
    
      const renderUserDetailsModal = () => {
    
        if(!userDetails){
          return null;
        }
    
        return (
          <Modal
            show={userDetailModal}
            handleClose={handleCloseUserDetailsModal}
            modalTitle={'User Details'}
            size="lg"
          >
    
            <Row>
              <Col md="6">
                <label className="key">First Name</label>
                <p className="value">{userDetails.firstName}</p>
              </Col>
              <Col md="6">
                <label className="key">Last Name</label>
                <p className="value">{userDetails.lastName}</p>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <label className="key">email</label>
                <p className="value">{userDetails.email}</p>
              </Col>
            </Row>
    
          </Modal>
        );
      }
    const renderUsers = () => {
        return (
          <Table style={{ fontSize: 12 }} responsive="sm">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {
                createUser.users.length > 0 ?
                  createUser.users.map(user =>
                    <tr onClick={() => showUserDetailsModal(user)} key={user._id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                    </tr>
                  ) : null
              }
    
            </tbody>
          </Table>
        );
      }
        return (
            <Fragment>
                <Breadcrumb title="User List" parent="Users" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h5>User Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/create-user" className="btn btn-secondary">Create User</Link>
                            </div>
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                {renderUsers()}
                                {renderUserDetailsModal()}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

export default ListUser
