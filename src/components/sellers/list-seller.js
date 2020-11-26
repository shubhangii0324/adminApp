import React, { Component, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listVendor';
import Datatable from '../common/datatable'

export class ListSeller extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Seller List" parent="Sellers" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h5>Seller Details</h5>
                        </div>
                        <div className="card-body vendor-table coupon-list-delete">
                            <Datatable
                                multiSelectOption={true}
                                myData={data}
                                pageSize={10}
                                pagination={true}
                                class="-striped -highlight"
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ListSeller
