import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import { Table, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Modal from '../UI/Modal';
import CreateTaxes from './create-taxes';

/**
* @author
* @function ListTaxes
**/

const ListTaxes = (props) => {

    const [show, setShow] = useState(false);
    const [taxDetailsModal, setTaxDetailsModal] = useState(false);
    const [taxDetails, setTaxDetails] = useState(null);
    // const category = useSelector(state => state.category);
    const tax = useSelector(state => state.tax);
    
    const handleCloseTaxDetailsModal = () => {
        setTaxDetailsModal(false);
      }
      
      const showTaxDetailsModal = (taxes) => {
        setTaxDetails(taxes)
        setTaxDetailsModal(true)
      }

      const renderTaxDetailsModal = () => {

        if(!taxDetails){
          return null;
        }
    
        return (
          <Modal
            show={taxDetailsModal}
            handleClose={handleCloseTaxDetailsModal}
            modalTitle={'Tax Details'}
            size="lg"
          >
    
            <Row>
              <Col md="6">
                <label className="key">Name</label>
                <p className="value">{taxDetails.name}</p>
              </Col>
              <Col md="6">
                <label className="key">Rate</label>
                <p className="value">{taxDetails.rate}</p>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <label className="key">Price</label>
                <p className="value">{taxDetails.price}</p>
              </Col>
            </Row>
    
          </Modal>
        );
      }

      const renderTaxes = () => {
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
                tax.taxes.length > 0 ?
                  tax.taxes.map(tax =>
                    <tr onClick={() => showTaxDetailsModal(tax)} key={tax._id}>
                      <td>{tax.name}</td>
                      <td>{tax.rate}</td>
                      <td>{tax.price}</td>
                    </tr>
                  ) : null
              }
    
            </tbody>
          </Table>
        );
      }

        return (
            <Fragment>
                <Breadcrumb title="Tax List" parent="Taxes" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h5>Tax Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/create-taxes" className="btn btn-secondary">Add Tax</Link>
                            </div>
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                {renderTaxes()}
                                {renderTaxDetailsModal()}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

export default ListTaxes
