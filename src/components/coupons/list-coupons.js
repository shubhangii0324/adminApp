import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import { Table, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Modal from '../UI/Modal';

/**
* @author
* @function ListCoupon
**/

const ListCoupon = (props) => {

    const [show, setShow] = useState(false);
    const [couponDetailsModal, setCouponDetailsModal] = useState(false);
    const [couponDetails, setCouponDetails] = useState(null);
    // const category = useSelector(state => state.category);
    const coupons = useSelector(state => state.coupons);
    
    const handleCloseCouponDetailsModal = () => {
        setCouponDetailsModal(false);
      }
      
      const showCouponDetailsModal = (coupons) => {
        setCouponDetails(coupons)
        setCouponDetailsModal(true)
      }

      const renderCouponDetailsModal = () => {

        if(!couponDetails){
          return null;
        }
    
        return (
          <Modal
            show={couponDetailsModal}
            handleClose={handleCloseCouponDetailsModal}
            modalTitle={'Coupon Details'}
            size="lg"
          >
    
            <Row>
              <Col md="6">
                <label className="key">Name</label>
                <p className="value">{couponDetails.name}</p>
              </Col>
              <Col md="6">
                <label className="key">Rate</label>
                <p className="value">{couponDetails.rate}</p>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <label className="key">Price</label>
                <p className="value">{couponDetails.price}</p>
              </Col>
            </Row>
    
          </Modal>
        );
      }

      const renderCoupons = () => {
        return (
          <Table style={{ fontSize: 12 }} responsive="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rate</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                coupons.coupons.length > 0 ?
                  coupons.coupons.map(coupon =>
                    <tr onClick={() => showCouponDetailsModal(coupon)} key={coupon._id}>
                      <td>{coupon.name}</td>
                      <td>{coupon.rate}</td>
                      <td>{coupon.price}</td>
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
                            <h5>Coupon Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/create-user" className="btn btn-secondary">Create Coupons</Link>
                            </div>
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                {renderCoupons()}
                                {renderCouponDetailsModal()}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

export default ListCoupon
